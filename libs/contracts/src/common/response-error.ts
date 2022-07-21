import { ResponceStatuses } from './responce-statuses'

export class ResponseError {
  status = ResponceStatuses.error
  error: {
    statusCode: number
    message: string
    errors: string[]
  }
}
