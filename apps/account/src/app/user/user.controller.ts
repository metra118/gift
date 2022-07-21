import { Controller } from '@nestjs/common'
import {
  AccountGetUserRequest,
  AccountGetUserResponse,
  accountGetUserTopic,
} from '@gift/contracts'

@Controller()
export class UserController {
  // @RMQValidate()
  // @RMQRoute(accountGetUserTopic)
  // getUser(data: AccountGetUserRequest): AccountGetUserResponse {
  //   return { name: 'test' }
  // }
}
