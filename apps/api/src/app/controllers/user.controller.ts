import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { RMQService } from 'nestjs-rmq'
import {
  UserGetUserRequest,
  UserGetUserResponse,
  userGetUserTopic,
  UserRegisterRequest,
  UserRegisterResponse,
  userRegisterTopic,
} from '@gift/contracts'

@Controller()
export class UserController {
  constructor(private readonly rmqService: RMQService) {}

  @UsePipes(ValidationPipe)
  @Post('register')
  async register(@Body() body: UserRegisterRequest) {
    try {
      return await this.rmqService.send<
        UserRegisterRequest,
        UserRegisterResponse
      >(userRegisterTopic, body)
    } catch (e) {
      console.error(e)
    }
  }

  @Get(':userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return await this.rmqService.send<
        UserGetUserRequest,
        UserGetUserResponse
      >(userGetUserTopic, { userId })
    } catch (e) {
      console.error(e)
    }
  }
}
