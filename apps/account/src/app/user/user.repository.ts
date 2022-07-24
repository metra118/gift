import { Injectable } from '@nestjs/common'
import { User } from 'prisma/client'
import { ICreateUser, IUser } from '@gift/interfaces'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: ICreateUser): Promise<User> {
    return this.prismaService.user.create({
      data: user,
    })
  }

  async update({ userId, ...rest }: IUser) {
    return this.prismaService.user.update({ where: { userId }, data: rest })
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } })
  }

  async findById(userId: string) {
    return this.prismaService.user.findUnique({ where: { userId } })
  }
}
