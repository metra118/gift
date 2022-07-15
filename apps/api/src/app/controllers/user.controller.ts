import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { RMQService } from 'nestjs-rmq'
import {
  UserGetUserRequest,
  UserGetUserResponse,
  UserGetUserTopic,
} from '@gift/contracts'

@Controller()
export class UserController {
  constructor(private readonly rmqService: RMQService) {}

  @Get(':userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    console.log(typeof userId)
    return await this.rmqService.send<UserGetUserRequest, UserGetUserResponse>(
      UserGetUserTopic,
      { userId },
    )
  }
}
