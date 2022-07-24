import { BadRequestException, Injectable } from '@nestjs/common'
import { ICreateGift, IGift } from '@gift/interfaces'
import { GiftRepository } from './gift.repository'
import { GiftEntity } from './gift.entity'
import { GiftGetGiftsRequest } from '@gift/contracts'

@Injectable()
export class GiftService {
  constructor(private readonly giftRepository: GiftRepository) {}

  async create(gift: ICreateGift): Promise<IGift> {
    return this.giftRepository.create(gift)
  }

  async get(query: GiftGetGiftsRequest): Promise<IGift[]> {
    return this.giftRepository.findMany(query)
  }

  async update(gift: IGift): Promise<IGift> {
    const giftFromDb = await this.giftRepository.findById(gift.giftId)
    if (!giftFromDb) throw new BadRequestException('Gift not found')
    return this.giftRepository.update(new GiftEntity(giftFromDb).update(gift))
  }
}
