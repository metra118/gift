import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PrismaModule } from '../prisma/prisma.module'
import { UserRepository } from './user.repository'

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserRepository, UserController],
  exports: [UserRepository],
})
export class UserModule {}
