// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { ITransports } from "../src/core/transports/types/transport.types";
import { IRoutes } from "../src/core/routes/types/route.types";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
	// create two dummy articles
	const transport1 = await prisma.transport.upsert({
		where: { licensePlate: '777' },
		update: {},
		create: {
			licensePlate: "ABC123",
			status: ITransports.Enum.Status.FREE,
			model: "Car A",
			purchaseDate: new Date("2022-01-01"),
			mileage: 10000,
			type: ITransports.Enum.Type.TRUCK,
		},
	});

	const transport2 = await prisma.transport.upsert({
		where: { licensePlate: "888" },
		update: {},
		create: {
			licensePlate: "XYZ789",
			status: ITransports.Enum.Status.BUSY,
			model: "Car B",
			purchaseDate: new Date("2021-06-15"),
			mileage: 5000,
			type: ITransports.Enum.Type.PLAN,
		},
	});

	console.log({ transport1, transport2 })

	const route1 = await prisma.route.upsert({
		where: { status: IRoutes.Enum.Status.COMPLETED },
		update: {},
		create: {
			cityStart: "City A",
			cityEnd: "City B",
			distanceBetweenCities: 200,
			sendingDate: new Date("2023-04-31"),
			deliveryDate: new Date("2023-05-31"),
			transportType: ITransports.Enum.Type.PLAN,
			revenue: 1000,
			transportId: transport2.id,
			status: IRoutes.Enum.Status.PROCESSING
		},
	});

	const route2 = await prisma.route.upsert({
		where: { status: IRoutes.Enum.Status.COMPLETED },
		update: {},
		create: {
			cityStart: "City A",
			cityEnd: "City B",
			distanceBetweenCities: 200,
			sendingDate: new Date("2023-05-31"),
			deliveryDate: new Date("2023-06-31"),
			transportType: ITransports.Enum.Type.PLAN,
			revenue: 1000,
			transportId: transport2.id,
			status: IRoutes.Enum.Status.PREPARING
		},
	});

	console.log({ route1, route2 })
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});