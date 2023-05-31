import { IRoutes } from "@/core/routes/types/route.types";

export namespace ITransports {
	export namespace Enum {

		export enum Status {
			FREE = 'FREE',
			BUSY = 'BUSY'
		}
		export enum Type {
			TRUCK = 'TRUCK',
			PLANE = 'PLANE',
			TRAIN = 'TRAIN',
			SHIP = 'SHIP',
		}
	}

	export interface Model {
		id: number
		licensePlate: string | null
		status: Enum.Status
		model: string | null
		purchaseDate: Date | null
		mileage: number | null
		type: Enum.Type;
	}

	export type RawModel = Omit<Model, 'id'>

	export type ModelWithRoutes = Model & { route: IRoutes.Model[] }
}