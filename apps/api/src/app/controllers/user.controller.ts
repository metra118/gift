import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { RMQService } from 'nestjs-rmq'
import {
  AccountGetUserRequest,
  AccountGetUserResponse,
  accountGetUserTopic,
} from '@gift/contracts'

@Controller()
export class UserController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('/:userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return await this.rmqService.send<
        AccountGetUserRequest,
        AccountGetUserResponse
      >(accountGetUserTopic, { userId })
    } catch (e) {
      console.error(e)
    }
  }
}
