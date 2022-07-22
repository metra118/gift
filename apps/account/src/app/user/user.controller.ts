import { Controller, UsePipes, ValidationPipe } from '@nestjs/common'
import {
  AccountGetUserProfileRequest,
  AccountGetUserProfileResponse,
  accountGetUserProfileTopic,
  ResponseStatuses,
} from '@gift/contracts'
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { replyErrorHandler } from '@gift/common'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: accountGetUserProfileTopic,
    queue: accountGetUserProfileTopic,
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
}
