import { Module } from '@nestjs/common';

import { PrismaHelper } from "@/helpers/prisma";

@Module({
  providers: [PrismaHelper],
  exports: [PrismaHelper],
})
export class HelpersModule {}
