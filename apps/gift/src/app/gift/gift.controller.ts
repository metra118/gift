import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common'
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import {
  giftCreateGiftKey,
  GiftCreateGiftRequest,
  GiftCreateGiftResponse,
  ResponseStatuses,
} from '@gift/contracts'
import { replyErrorHandler } from '@gift/common'
import { GiftService } from './gift.service'

@Injectable()
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: giftCreateGiftKey,
    queue: giftCreateGiftKey,
    exchange: process.env.AMQP_EXCHANGE,
    errorHandler: replyErrorHandler,
  })
  async updateUserProfile(
    @RabbitPayload() payloadReq: GiftCreateGiftRequest,
  ): Promise<GiftCreateGiftResponse> {
    const payload = await this.giftService.create(payloadReq)
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }
}
