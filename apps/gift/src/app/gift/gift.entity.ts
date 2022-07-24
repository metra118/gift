import { IGift, PartialBy } from '@gift/interfaces'
import { cloneDeep } from 'lodash'

export class GiftEntity implements IGift {
  giftId: string
  userId: string
  title: string
  text: string

  constructor(gift: IGift) {
    this.giftId = gift.giftId
    this.userId = gift.userId
    this.title = gift.title
    this.text = gift.text
  }

  update(gift: PartialBy<IGift, 'giftId' | 'userId'>): GiftEntity {
    const cpGift = cloneDeep(gift)
    delete cpGift.giftId
    delete cpGift.userId
    return new GiftEntity({ ...this, ...cpGift })
  }
}
