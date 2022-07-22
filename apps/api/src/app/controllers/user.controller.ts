import { Controller, Get, Param, ValidationPipe } from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { ConfigService } from '@nestjs/config'

@Controller()
export class UserController {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService,
  ) {}

  @Get('/:userId')
  async getUser(@Param('userId', ValidationPipe) userId: string) {
    try {
      return 232
    } catch (e) {
      console.error(e)
    }
  }
}
