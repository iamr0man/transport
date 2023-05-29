import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaHelper } from "@/helpers/prisma";
import { ITransports } from "@/core/transports/types/transport.types";

@Injectable()
export class TransportsService {
  constructor(
    // private routesService: RoutesService,
    private _PrismaHelper: PrismaHelper,
  ) {}

  async findAll(): Promise<ITransports.Model[]> {
    const transports = await this._PrismaHelper.transport.findMany();

    return transports as unknown as ITransports.Model[]
  }

  async findById(id: number): Promise<ITransports.Model> {
    const car = await this._PrismaHelper.transport.findUnique({
      where: { id }
    });

    if (!car) {
      throw new BadRequestException('Transport not found');
    }

    return car as unknown as ITransports.Model;
  }

  async create(transportBody: ITransports.RawModel): Promise<ITransports.Model> {
    const transport = await this._PrismaHelper.transport.create({
      data: transportBody
    });

    return transport as unknown as ITransports.Model
  }

  async update(id: number, updateTransport: Partial<ITransports.RawModel>): Promise<ITransports.Model> {
    console.log(updateTransport);

    const transport = await this._PrismaHelper.transport.update({
      where: { id },
      data: updateTransport
    });

    return transport as unknown as ITransports.Model;
  }

  async delete(id: number): Promise<void> {
    const transport = await this._PrismaHelper.transport.delete({
      where: { id }
    });

    // if (transport.length > 0) {
    //   throw new BadRequestException('Car cannot be deleted while it relate with routes');
    // }
    //
    // await this.carRepository.delete(id);
  }
}
