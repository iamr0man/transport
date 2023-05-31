import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaHelper } from "@/helpers/prisma";
import { ITransports } from "@/core/transports/types/transport.types";

@Injectable()
export class TransportsService {
  constructor(private _PrismaHelper: PrismaHelper) {}

  async findMany(query?: Partial<ITransports.RawModel>): Promise<ITransports.Model[]> {
    const transports = await this._PrismaHelper.transport.findMany({
      where: query,
    });

    return transports as unknown as ITransports.Model[]
  }

  async findById(id: number): Promise<ITransports.ModelWithRoutes> {
    const car = await this._PrismaHelper.transport.findUnique({
      where: { id },
      include: {
        route: true
      }
    });

    if (!car) {
      throw new BadRequestException('Transport not found');
    }

    return car as unknown as ITransports.ModelWithRoutes;
  }

  async create(transportBody: ITransports.RawModel): Promise<ITransports.Model> {
    const transport = await this._PrismaHelper.transport.create({
      data: transportBody
    });

    return transport as unknown as ITransports.Model
  }

  async update({ id, updateTransport }: { id: number,  updateTransport: Partial<ITransports.RawModel>}): Promise<ITransports.Model> {
    const transport = await this._PrismaHelper.transport.update({
      where: { id },
      data: updateTransport
    });

    return transport as unknown as ITransports.Model;
  }

  async delete(id: number): Promise<void> {
    await this._PrismaHelper.transport.delete({
      where: { id }
    });
  }
}
