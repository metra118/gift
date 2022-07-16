import { Controller } from '@nestjs/common'
import { RMQRoute, RMQValidate } from 'nestjs-rmq'
import {
  AccountGetUserRequest,
  AccountGetUserResponse,
  accountGetUserTopic,
} from '@gift/contracts'

@Controller()
export class UserController {
  @RMQValidate()
  @RMQRoute(accountGetUserTopic)
  getUser(data: AccountGetUserRequest): AccountGetUserResponse {
    return { name: 'test' }
  }
}
