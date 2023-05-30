import { ITransports } from "../../transports/types/transport.types";

export namespace IRoutes {
	export namespace Enum {
		export enum Status {
			'PREPARING' = 'PREPARING',
			'PROCESSING' = 'PROCESSING',
			'COMPLETED' = 'COMPLETED',
		}
	}

	export interface Model {
		id: number
		cityStart: string | null
		cityEnd: string | null
		distanceBetweenCities: number | null
		sendingDate: Date | null
		deliveryDate: Date | null
		status: Enum.Status;
		transportType: ITransports.Enum.Type;
		revenue: number | null
		transportId: number
	}

	export type RawModel = Omit<Model, 'id'>
}