import { Injectable } from '@nestjs/common'
import {
  ICreateGift,
  IGift,
  IPagindation,
  ISelectGiftBy,
} from '@gift/interfaces'
import { Gift, Prisma } from '../../../prisma/client'
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

  findMany(s: ISelectGiftBy = {}, p: IPagindation = {}): Promise<Gift[]> {
    const where: Prisma.GiftWhereInput = {}
    if (p.take && p.take > 50) p.take = 50
    if (s.userId) where.userId = s.userId
    if (s.giftId) where.giftId = s.giftId
    return this.prismaService.gift.findMany({
      skip: p.skip || 0,
      take: p.take || 10,
      where,
    })
  }
}
