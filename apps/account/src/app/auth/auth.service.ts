import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async findOne(){
    return this.prisma.user.findFirst({
      where: {

      },
    });
  }
}