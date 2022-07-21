import amqplib from 'amqplib'
import { HttpException } from '@nestjs/common'

export function ReplyErrorCallback(
  channel: amqplib.Channel,
  msg: amqplib.ConsumeMessage,
  error: HttpException,
) {
  const { replyTo, correlationId } = msg.properties
  if (replyTo) {
    const errorToResonce = Buffer.from(
      JSON.stringify({
        ...error,
        status: 'error',
        response: error.getResponse(),
      }),
    )

    channel.publish('', replyTo, errorToResonce, { correlationId })
    channel.ack(msg)
  }
}
