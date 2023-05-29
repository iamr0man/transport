import { ApiProperty } from '@nestjs/swagger'
import { ITransports } from "@/core/transports/types/transport.types";

export class CreateTransportDto {
	@ApiProperty()
	licensePlate: string | null

	@ApiProperty()
	status: ITransports.Enum.Status;

	@ApiProperty()
	model: string | null

	@ApiProperty()
	purchaseDate: Date | null

	@ApiProperty()
	mileage: number | null

	@ApiProperty()
	type: ITransports.Enum.Type;
}
