import { PrismaClient, Prisma } from './client'
import { dev } from '../../api/http/http-client.env.json'

const prisma = new PrismaClient()

const data: Prisma.GiftCreateInput[] = [
  {
    giftId: dev.giftId,
    text: '123',
    title: 'aw123d',
    userId: dev.userId,
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const d of data) {
    const res = await prisma.gift.create({
      data: d,
    })
    console.log(`Created user with id: ${res.giftId}`)
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
