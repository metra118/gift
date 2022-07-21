import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import {
  AccountGetUserRequest,
  AccountGetUserResponse,
  accountGetUserTopic,
} from '@gift/contracts'

@Controller()
export class UserController {
  @Get('/:userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return 232
    } catch (e) {
      console.error(e)
    }
  }
}
