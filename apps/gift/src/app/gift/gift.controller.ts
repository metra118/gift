import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common'
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import {
  giftCreateGiftKey,
  GiftCreateGiftRequest,
  GiftCreateGiftResponse,
  giftGetGiftsKey,
  GiftGetGiftsRequest,
  GiftGetGiftsResponse,
  giftUpdateGiftKey,
  GiftUpdateGiftRequest,
  GiftUpdateGiftResponse,
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
  async create(
    @RabbitPayload() payloadReq: GiftCreateGiftRequest,
  ): Promise<GiftCreateGiftResponse> {
    const payload = await this.giftService.create(payloadReq)
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: giftUpdateGiftKey,
    queue: giftUpdateGiftKey,
    exchange: process.env.AMQP_EXCHANGE,
    errorHandler: replyErrorHandler,
  })
  async update(
    @RabbitPayload() payloadReq: GiftUpdateGiftRequest,
  ): Promise<GiftUpdateGiftResponse> {
    const payload = await this.giftService.update(payloadReq)
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: giftGetGiftsKey,
    queue: giftGetGiftsKey,
    exchange: process.env.AMQP_EXCHANGE,
    errorHandler: replyErrorHandler,
  })
  async get(
    @RabbitPayload() payloadReq: GiftGetGiftsRequest,
  ): Promise<GiftGetGiftsResponse> {
    const payload = await this.giftService.get(payloadReq)
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }
}
