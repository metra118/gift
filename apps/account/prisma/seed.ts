import { PrismaClient, Prisma } from './client'
// @ts-ignore
import { dev } from '../../api/http/http-client.env.json'

const prisma = new PrismaClient()

const sessionData: Prisma.SessionCreateInput[] = [
  {
    accessToken: dev.accessToken,
    refreshToken: dev.refreshToken,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    User: {
      create: {
        userId: dev.userId,
        email: dev.email,
        passwordHash:
          '13c706596ed346af748e92c70675b21ee9979f9f0c369e69cf84997ec51ce5b56a65f0cdeedaa457277c48c0f405350c6a1cc2e045bc7ac7dc635ca1b465a783.44b4adc3c50669c03cf2d28d83e98b78',
      },
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const data of sessionData) {
    const user = await prisma.session.create({
      data,
    })
    console.log(`Created user with id: ${user.userId}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
