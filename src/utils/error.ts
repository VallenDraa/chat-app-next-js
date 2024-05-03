import { isAxiosError } from 'axios';
import z from 'zod';
import { type ApiResponse, type ErrorApiResponse } from '~/types';

export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map(issue => issue.message);
    return errors.join('\n');
  }

  if (isAxiosError<ErrorApiResponse>(err)) {
    return err.response?.data.message ?? err.message;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return 'An error occurred. Please try again.';
}

export function isErrorResponse(
  apiResponse: ApiResponse<unknown> | ErrorApiResponse,
): apiResponse is ErrorApiResponse {
  return 'error' in apiResponse;
}
