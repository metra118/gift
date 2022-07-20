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
    if (!request.cookies?.refreshToken) return false
    return this.jwtService
      .verifyAsync(request.cookies?.refreshToken, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      })
      .then(
        () => true,
        () => {
          throw new UnauthorizedException()
        },
      )
  }
}
