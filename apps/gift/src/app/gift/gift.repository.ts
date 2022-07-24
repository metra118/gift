import { Injectable } from '@nestjs/common'
import { ICreateGift, IGift, IPagindation, IGetGiftBy } from '@gift/interfaces'
import { Gift, Prisma } from 'prisma/client'
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

  findById(giftId: string) {
    return this.prismaService.gift.findUnique({ where: { giftId } })
  }

  findMany(query: IGetGiftBy & IPagindation): Promise<Gift[]> {
    const where: Prisma.GiftWhereInput = {}
    if (query.take && query.take > 50) query.take = 50
    if (query.userId) where.userId = query.userId
    if (query.giftId) where.giftId = query.giftId
    return this.prismaService.gift.findMany({
      skip: query.skip || 0,
      take: query.take || 10,
      where,
    })
  }
}
