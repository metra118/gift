import { ConfigModule, ConfigService } from '@nestjs/config'
import { MessageHandlerErrorBehavior } from '@golevelup/nestjs-rabbitmq'

export const getRMQConfig = () => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    const uri = getRMQUri(configService)
    return {
      name: configService.getOrThrow('SERVICE_NAME'),
      exchanges: [
        {
          name: configService.getOrThrow('AMQP_EXCHANGE'),
          type: 'topic',
        },
      ],
      uri,
      defaultRpcErrorBehavior: MessageHandlerErrorBehavior.ACK,
      defaultSubscribeErrorBehavior: MessageHandlerErrorBehavior.ACK,
      enableControllerDiscovery: true,
    }
  },
})

const getRMQUri = (configService: ConfigService): string => {
  return [
    'amqp://',
    configService.getOrThrow('AMQP_USER'),
    ':',
    configService.getOrThrow('AMQP_PASSWORD'),
    '@',
    configService.getOrThrow('AMQP_HOSTNAME'),
    ':',
    configService.getOrThrow('AMQP_PORT'),
  ].join('')
}
