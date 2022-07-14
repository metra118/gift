import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller('health')
export class UserController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  health() {
    throw new Error('test')
    console.log(this.configService.get('TEST'))
    return 'ok'
  }
}
