/**
 * Represents a paginated response from the API.
 *
 * @template T - The type of data items in the response.
 */
export type Pagination<T> = {
  data: T[];
  total_records: number;
  total_pages: number;
  current_page: number;
  next_page: number;
  previous_page: number;
};
