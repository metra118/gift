import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '@prisma/client'
import { UserEntity } from './user.entity'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: UserEntity): Promise<User> {
    return this.prismaService.user.create({
      data: user,
    })
  }

  async updateUser({ userId, ...rest }: UserEntity): Promise<User> {
    return this.prismaService.user.update({ where: { userId }, data: rest })
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } })
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { userId } })
  }
}
