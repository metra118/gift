import { IGetGiftBy, IGift, IPagindation } from '@gift/interfaces'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ResponseError } from '../common/response/response-error'
import { ResponseSuccess } from '../common/response/response-success'
import { Transform, Type } from 'class-transformer'

export const giftGetGiftsKey = 'gift.get-gifts.command'

export class GiftGetGiftsRequest implements IPagindation, IGetGiftBy {
  @IsOptional()
  @IsString()
  giftId?: string

  @IsOptional()
  @IsString()
  userId?: string

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  skip?: number

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  take?: number
}

class GiftGetGiftsResponseSuccess extends ResponseSuccess {
  payload: IGift[]
}

export type GiftGetGiftsResponse = GiftGetGiftsResponseSuccess | ResponseError
