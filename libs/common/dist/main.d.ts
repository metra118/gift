import { ResponseError, ResponseSuccess } from '@gift/contracts';
import amqplib from 'amqplib';
import { HttpException } from '@nestjs/common';

declare const isError: (res: ResponseError | ResponseSuccess) => res is ResponseError;

declare function replyErrorHandler(channel: amqplib.Channel, msg: amqplib.ConsumeMessage, error: HttpException): void;

export { isError, replyErrorHandler };
