import { GenericModule } from '../utils/modular';
import { APIKeyModel, APIKeyUpdateModel } from '../utils/typings/apikey';
import { GenericAPIError, GenericAPIResponse, PaginationOptions } from '../utils/typings/generic';
import { Pagination } from '../utils/typings/pagination';

type APIKeyResult = Pagination<APIKeyModel> & { error?: GenericAPIError };

export class APIKeyModule extends GenericModule {
  /**
   * Fetches a paginated list of all API keys.
   *
   * @param {PaginationOptions} [options={ page: 1, perpage: 10 }] - The pagination options.
   * @return {Promise<APIKeyResult>} The paginated list of API keys.
   */
  public async all(options: PaginationOptions = { page: 1, perpage: 10 }): Promise<APIKeyResult> {
    const result = await this.r_GET({
      version: 1,
      group: 'key',
      path: 'all',
      params: { page: options.page, perpage: options.perpage },
    });

    return (await result.json()) as APIKeyResult;
  }

  /**
   * Fetches a paginated list of API keys owned by the authenticated user.
   *
   * @param {string} token - The authentication token.
   * @param {PaginationOptions} [options={ page: 1, perpage: 10 }] - The pagination options.
   * @return {Promise<APIKeyResult>} The paginated list of API keys.
   */
  public async mine(
    token: string,
    options: PaginationOptions = { page: 1, perpage: 10 },
  ): Promise<APIKeyResult> {
    const result = await this.r_GET(
      {
        version: 1,
        group: 'key',
        path: 'mine',
        params: { page: options.page, perpage: options.perpage },
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );

    return (await result.json()) as APIKeyResult;
  }

  /**
   * Creates a new API key.
   *
   * @param {Object} [options={}] - The options for creating the API key.
   * @param {string} [options.ownerToken] - The authentication token of the API key owner.
   * @param {number} [options.maxUsage] - The maximum number of times the API key can be used.
   * @return {Promise<APIKeyModel & { error?: GenericAPIError }>} The created API key.
   */
  public async create(
    options: {
      ownerToken?: string;
      maxUsage?: number;
    } = {},
  ): Promise<APIKeyModel & { error?: GenericAPIError }> {
    const result = await this.r_POST(
      {
        version: 1,
        group: 'key',
        path: 'create',
        params: { maxUsage: options.maxUsage ?? 0 },
      },
      {},
      {
        Authorization: `Bearer ${options.ownerToken}`,
      },
    );

    return (await result.json()) as APIKeyModel & { error?: GenericAPIError };
  }

  /**
   * Fetches a specific API key.
   *
   * @param {string} key - The API key.
   * @return {Promise<APIKeyModel & { error?: GenericAPIError }>} The API key.
   */
  public async get(key: string): Promise<APIKeyModel & { error?: GenericAPIError }> {
    const result = await this.r_GET({
      version: 1,
      group: 'key',
      path: key,
    });

    return (await result.json()) as APIKeyModel & { error?: GenericAPIError };
  }

  /**
   * Updates a specific API key.
   *
   * @param {string} key - The API key.
   * @param {APIKeyUpdateModel} updateModel - The model containing the updated values.
   * @return {Promise<GenericAPIResponse>} The response of the update operation.
   */
  public async update(key: string, updateModel: APIKeyUpdateModel): Promise<GenericAPIResponse> {
    const result = await this.r_PATCH(
      {
        version: 1,
        group: 'key',
        path: key,
      },
      updateModel,
    );

    return (await result.json()) as GenericAPIResponse;
  }

  /**
   * Deletes a specific API key.
   *
   * @param {string} key - The API key.
   * @return {Promise<GenericAPIResponse>} The response of the deletion operation.
   */
  public async delete(key: string): Promise<GenericAPIResponse> {
    const result = await this.r_DELETE({
      version: 1,
      group: 'key',
      path: key,
    });

    return (await result.json()) as GenericAPIResponse;
  }
}
