import {
  Controller,
  Get,
  HttpException,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { ConfigService } from '@nestjs/config'
import {
  AccountGetUserProfileRequest,
  AccountGetUserProfileResponse,
  accountGetUserProfileTopic,
} from '@gift/contracts'
import { isError } from '@gift/common'

@Controller()
export class UserController {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService,
  ) {}

  @Get('/:userId')
  @UsePipes(ValidationPipe)
  async getUser(@Param() params: AccountGetUserProfileRequest) {
    try {
      const res =
        await this.amqpConnection.request<AccountGetUserProfileResponse>({
          exchange: this.configService.getOrThrow('AMQP_EXCHANGE'),
          routingKey: accountGetUserProfileTopic,
          payload: params,
        })

      if (isError(res)) {
        throw new HttpException(res.error, res.error.statusCode)
      }

      return res.payload
    } catch (e) {
      console.error(e)
    }
  }
}
