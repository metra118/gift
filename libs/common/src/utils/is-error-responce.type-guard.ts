import {
  ResponseError,
  ResponseSuccess,
  ResponseStatuses,
} from '@gift/contracts'

export const isError = (
  res: ResponseError | ResponseSuccess,
): res is ResponseError => {
  return res.status === ResponseStatuses.error
}
