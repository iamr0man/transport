import { BadRequestException, Injectable } from '@nestjs/common';
import { IRoutes } from "@/core/routes/types/route.types";
import { PrismaHelper } from "@/helpers/prisma";
import { ITransports } from "@/core/transports/types/transport.types";
import { TransportsService } from "@/core/transports/transports.service";

@Injectable()
export class RoutesService {

  constructor(
    private _PrismaHelper: PrismaHelper,
    private _TransportsService: TransportsService
  ) {}
  private areDeliveryDatesTheSame(newRoute: IRoutes.RawModel, oldRoute: IRoutes.RawModel): boolean {
    return (
      new Date(oldRoute.deliveryDate).setHours(0, 0, 0, 0)
      ===
      new Date(newRoute.deliveryDate).setHours(0, 0, 0, 0)
      ||
      new Date(oldRoute.sendingDate).setHours(0, 0, 0, 0)
      ===
      new Date(newRoute.sendingDate).setHours(0, 0, 0, 0)
    );
  }

  private getCarStatus(route: IRoutes.RawModel): ITransports.Enum.Status {
    const from = new Date(route.sendingDate).setHours(0, 0, 0, 0);
    const to = new Date(route.deliveryDate).setHours(0, 0, 0, 0);
    const now = new Date().setHours(0, 0, 0, 0);

    const isNowDateBetweenDeliveryDates = now >= from && now <= to;
    const isNowDateAfterDeliveryDates = now > to;

    if ((route.status === IRoutes.Enum.Status.PROCESSING || route.status === IRoutes.Enum.Status.PREPARING) && isNowDateBetweenDeliveryDates) {
      return ITransports.Enum.Status.BUSY;
    } else if (route.status === IRoutes.Enum.Status.COMPLETED && (isNowDateAfterDeliveryDates || isNowDateBetweenDeliveryDates)) {
      return ITransports.Enum.Status.FREE;
    }
  }

  private async checkCarAvailability(route: IRoutes.RawModel): Promise<void> {
    const routes = await this._PrismaHelper.route.findMany({
      where: {
        transportId: route.transportId,
        deliveryDate: {
          gte: route.deliveryDate,
        },
        sendingDate: {
          lte: route.sendingDate,
        },
      }
    });

    if (routes.length > 0) {
      throw new BadRequestException('Car don`t available in this days');
    }
  }

  async findAll(): Promise<IRoutes.Model[]> {
    const routes = await this._PrismaHelper.route.findMany();

    return routes as unknown as IRoutes.Model[]
  }

  async findRouteById(id: number): Promise<IRoutes.Model> {
    const route = await this._PrismaHelper.route.findUnique({
      where: { id },
      include: {
        transport: true
      }
    });

    if (!route) {
      throw new BadRequestException('Route not found');
    }

    return route as unknown as IRoutes.Model;
  }

  async create(routeData: IRoutes.RawModel): Promise<IRoutes.Model> {
    await this.checkCarAvailability(routeData);

    const status = await this.getCarStatus(routeData);
    await this._TransportsService.update({
      id: routeData.transportId,
      updateTransport: {
        status
      }
    })

    const route = await this._PrismaHelper.route.create({
      data: routeData
    });

    return route as unknown as IRoutes.Model
  }

  async update(id: number, newRouteData: Partial<IRoutes.RawModel>): Promise<IRoutes.Model> {
    const newRoute = await this._PrismaHelper.route.update({
      where: { id },
      data: newRouteData,
    })

    return newRoute as unknown as IRoutes.Model
  }

  async updateRelation(oldRoute: IRoutes.Model, newRoute: IRoutes.Model): Promise<void> {
    if (!this.areDeliveryDatesTheSame(newRoute, oldRoute)) {
      await this.checkCarAvailability(newRoute);
    }

    if (oldRoute.transportId !== newRoute.transportId) {
      const status = this.getCarStatus(oldRoute)
      await this._TransportsService.update({
        id: oldRoute.transportId,
        updateTransport: {
          status
        }
      })
    }

    const status = this.getCarStatus(newRoute);
    await this._TransportsService.update({
      id: newRoute.transportId,
      updateTransport: {
        status
      }
    })
  }

  async delete(id: number): Promise<IRoutes.Model> {
    const route = await this.findRouteById(id);

    const transportStatus = this.getCarStatus(route);

    const [deletedRoute] = await this._PrismaHelper.$transaction([
      this._PrismaHelper.route.delete({
        where: { id: route.id }
      }),
      this._PrismaHelper.transport.update({
        where: { id: route.transportId },
        data: {
          status: transportStatus
        }
      }),
    ]);

    return deletedRoute as unknown as IRoutes.Model;
  }
}
