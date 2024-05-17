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

export type PaginationArgs = {
  page?: number;
  limit?: number;
};
export type PaginatedResponse<T> = Required<PaginationArgs> & {
  data: T;
  lastPage: number;
};
