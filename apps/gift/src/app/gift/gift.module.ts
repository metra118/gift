import { Module } from '@nestjs/common'
import { GiftController } from './gift.controller'
import { GiftService } from './gift.service'
import { PrismaModule } from '../prisma/prisma.module'
import { GiftRepository } from './gift.repository'

@Module({
  imports: [PrismaModule],
  providers: [GiftController, GiftService, GiftRepository],
})
export class GiftModule {}
