import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { ConfigService } from '@nestjs/config'
import {
  AccountGetUserProfileResponse,
  accountGetUserProfileKey,
  AccountUpdateUserProfileRequest,
  AccountUpdateUserProfileResponse,
  accountUpdateUserProfileKey,
} from '@gift/contracts'
import { isError } from '@gift/common'
import { JwtAccessGuard } from '../guards/jwt-access.guard'
import { GetUser } from '../decorator/get-user.decorator'
import { IUserInToken } from '@gift/interfaces'

@Controller('/user')
export class UserController {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(JwtAccessGuard)
  @Get()
  async getUser(@GetUser() user: IUserInToken) {
    const res =
      await this.amqpConnection.request<AccountGetUserProfileResponse>({
        exchange: this.configService.getOrThrow('AMQP_EXCHANGE'),
        routingKey: accountGetUserProfileKey,
        payload: user,
      })

    if (isError(res)) {
      throw new HttpException(res.error, res.error.statusCode)
    }

    return res.payload
  }

  @UseGuards(JwtAccessGuard)
  @Patch()
  async updateUserProfile(
    @Body(ValidationPipe) payload: AccountUpdateUserProfileRequest,
    @GetUser() user: IUserInToken,
  ) {
    if (payload.userId !== user.userId) throw new ForbiddenException()
    const res =
      await this.amqpConnection.request<AccountUpdateUserProfileResponse>({
        exchange: this.configService.getOrThrow('AMQP_EXCHANGE'),
        routingKey: accountUpdateUserProfileKey,
        payload,
      })

    if (isError(res)) {
      throw new HttpException(res.error, res.error.statusCode)
    }

    return res.payload
  }
}
