import { Injectable } from '@nestjs/common'
import { ICreateGift, IGift } from '@gift/interfaces'
import { GiftRepository } from './gift.repository'

@Injectable()
export class GiftService {
  constructor(private readonly giftRepository: GiftRepository) {}

  async create(gift: ICreateGift): Promise<IGift> {
    return this.giftRepository.create(gift)
  }
}
