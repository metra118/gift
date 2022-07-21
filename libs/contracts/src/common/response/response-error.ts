import { ResponseStatuses } from './response-statuses'

export class ResponseError {
  status = ResponseStatuses.error
  error: {
    statusCode: number
    message: string | string[]
    error: string
  }
}
