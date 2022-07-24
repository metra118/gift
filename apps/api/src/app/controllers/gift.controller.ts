import {
  Body,
  Controller,
  ForbiddenException,
  HttpException,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { ConfigService } from '@nestjs/config'
import {
  giftCreateGiftKey,
  GiftCreateGiftRequest,
  GiftCreateGiftResponse,
} from '@gift/contracts'
import { isError } from '@gift/common'
import { JwtAccessGuard } from '../guards/jwt-access.guard'
import { GetUser } from '../decorator/get-user.decorator'
import { IUserInToken } from '@gift/interfaces'

@Controller('/gifts')
export class GiftController {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(JwtAccessGuard)
  @Post()
  async createGift(
    @Body(ValidationPipe) payload: GiftCreateGiftRequest,
    @GetUser() user: IUserInToken,
  ) {
    if (payload.userId !== user.userId) throw new ForbiddenException()
    const res = await this.amqpConnection.request<GiftCreateGiftResponse>({
      exchange: this.configService.getOrThrow('AMQP_EXCHANGE'),
      routingKey: giftCreateGiftKey,
      payload,
    })

    if (isError(res)) {
      throw new HttpException(res.error, res.error.statusCode)
    }

    return res.payload
  }
}
