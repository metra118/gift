import { Body, Controller, Get, Param } from '@nestjs/common'
import { RMQRoute, RMQValidate } from 'nestjs-rmq'
import {
  UserGetUserRequest,
  UserGetUserResponse,
  UserGetUserTopic,
} from '@gift/contracts'

@Controller()
export class UserController {
  @RMQValidate()
  @RMQRoute(UserGetUserTopic)
  getUser(@Body() t: UserGetUserRequest): UserGetUserResponse {
    return { name: 'test' }
  }
}
