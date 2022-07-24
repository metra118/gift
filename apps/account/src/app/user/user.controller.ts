import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common'
import {
  AccountGetUserProfileRequest,
  AccountGetUserProfileResponse,
  accountGetUserProfileKey,
  AccountUpdateUserProfileRequest,
  AccountUpdateUserProfileResponse,
  accountUpdateUserProfileKey,
  ResponseStatuses,
} from '@gift/contracts'
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { replyErrorHandler } from '@gift/common'
import { UserService } from './user.service'

@Injectable()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: accountGetUserProfileKey,
    queue: accountGetUserProfileKey,
    exchange: process.env.AMQP_EXCHANGE,
    errorHandler: replyErrorHandler,
  })
  async getUserProfile(
    @RabbitPayload() payloadReq: AccountGetUserProfileRequest,
  ): Promise<AccountGetUserProfileResponse> {
    const payload = await this.userService.getUserProfileById(payloadReq.userId)
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: accountUpdateUserProfileKey,
    queue: accountUpdateUserProfileKey,
    exchange: process.env.AMQP_EXCHANGE,
    errorHandler: replyErrorHandler,
  })
  async updateUserProfile(
    @RabbitPayload() payloadReq: AccountUpdateUserProfileRequest,
  ): Promise<AccountUpdateUserProfileResponse> {
    const payload = await this.userService.updateUserProfile(payloadReq)
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }
}
