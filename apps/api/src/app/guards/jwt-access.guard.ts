import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest()
    if (!request.headers.authorization) throw new UnauthorizedException()
    let user
    try {
      user = await this.jwtService.verifyAsync(
        request.headers.authorization.split(' ').at(1),
        {
          secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
        },
      )
    } catch (e) {
      throw new UnauthorizedException()
    }
    request.user = user
    return true
  }
}
