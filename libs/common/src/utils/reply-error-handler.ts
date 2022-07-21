import amqplib from 'amqplib'
import { HttpException } from '@nestjs/common'

export function replyErrorHandler(
  channel: amqplib.Channel,
  msg: amqplib.ConsumeMessage,
  error: HttpException,
) {
  const { replyTo, correlationId } = msg.properties
  if (replyTo) {
    console.log(error)
    const errorToResonce = Buffer.from(
      JSON.stringify({
        status: 'error',
        error: error.getResponse(),
      }),
    )
    channel.publish('', replyTo, errorToResonce, { correlationId })
    channel.ack(msg)
  }
}
