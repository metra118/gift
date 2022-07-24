import { Injectable } from '@nestjs/common'
import { ICreateGift, IGift } from '@gift/interfaces'
import { Gift } from '../../../prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class GiftRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(gift: ICreateGift): Promise<Gift> {
    return this.prismaService.gift.create({
      data: gift,
    })
  }

  async update({ giftId, ...rest }: IGift): Promise<Gift> {
    return this.prismaService.gift.update({ where: { giftId }, data: rest })
  }

  delete(giftId: string): Promise<Gift> {
    return this.prismaService.gift.delete({ where: { giftId } })
  }
}
