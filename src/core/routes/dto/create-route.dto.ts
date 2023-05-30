import { IsNotEmpty, IsNumber, IsString, Validate } from "class-validator";
import { IsDateConstraint, IsGreaterThanConstraint, IsLowerThanConstraint } from "@/validators";
import { IRoutes } from "@/core/routes/types/route.types";
import { ITransports } from "@/core/transports/types/transport.types";

export class CreateRouteDto {
	@IsNotEmpty()
	@IsString()
	cityStart: string;

	@IsNotEmpty()
	@IsString()
	cityEnd: string;

	@IsNotEmpty()
	@IsNumber()
	distanceBetweenCities: number;

	@IsNotEmpty()
	@IsNumber()
	revenue: number;

	@IsNotEmpty()
	@Validate(IsLowerThanConstraint, ['deliveryDate'])
	@Validate(IsDateConstraint)
	sendingDate: Date;

	@IsNumber()
	transportId: number;

	@IsNotEmpty()
	@IsNumber()
	status: IRoutes.Enum.Status;

	@IsNotEmpty()
	@Validate(IsGreaterThanConstraint, ['sendingDate'])
	@Validate(IsDateConstraint)
	deliveryDate: Date;

	@IsNotEmpty()
	@IsString()
	transportType: ITransports.Enum.Type;
}
