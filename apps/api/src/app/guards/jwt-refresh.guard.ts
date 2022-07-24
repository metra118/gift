import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest()
    if (!request.cookies.refreshToken) throw new UnauthorizedException()
    let user
    try {
      user = await this.jwtService.verifyAsync(request.cookies.refreshToken, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      })
    } catch (e) {
      throw new UnauthorizedException()
    }
    request.user = user
    return true
  }
}
