export type BaseApiResponse = {
  statusCode: number;
  message: string;
};

export type ApiResponse<T> = BaseApiResponse & {
  data: T;
};

export type ErrorApiResponse = BaseApiResponse & {
  error: string;
};
