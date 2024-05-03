import { type ApiResponse, type ErrorApiResponse } from '~/types';

export const apiResponse = <T>(response: ApiResponse<T>): ApiResponse<T> =>
  response;

export const errorApiResponse = (
  response: ErrorApiResponse,
): ErrorApiResponse => response;
