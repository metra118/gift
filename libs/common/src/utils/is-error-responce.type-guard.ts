import {
  ResponseError,
  ResponseSuccess,
  ResponceStatuses,
} from '@gift/contracts'

export const isError = (
  res: ResponseError | ResponseSuccess,
): res is ResponseError => {
  return res.status === ResponceStatuses.error
}
