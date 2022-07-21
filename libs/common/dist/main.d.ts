import { ResponseError, ResponseSuccess } from '@gift/contracts';

declare const isError: (res: ResponseError | ResponseSuccess) => res is ResponseError;

export { isError };
