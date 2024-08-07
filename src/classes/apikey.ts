import { GenericModule } from "../utils/modular";
import { APIKeyModel, APIKeyUpdateModel } from "../utils/typings/apikey";
import {
  GenericAPIError,
  GenericAPIResponse,
  PaginationOptions,
} from "../utils/typings/generic";
import { Pagination } from "../utils/typings/pagination";

type APIKeyResult = Pagination<APIKeyModel> & { error?: GenericAPIError };

export class APIKeyModule extends GenericModule {
  public async all(
    options: PaginationOptions = { page: 1, perpage: 10 },
  ): Promise<APIKeyResult> {
    const result = await this.r_GET({
      version: 1,
      group: "key",
      path: "all",
      params: { page: options.page, perpage: options.perpage },
    });

    return (await result.json()) as APIKeyResult;
  }

  public async mine(
    token: string,
    options: PaginationOptions = { page: 1, perpage: 10 },
  ): Promise<APIKeyResult> {
    const result = await this.r_GET(
      {
        version: 1,
        group: "key",
        path: "mine",
        params: { page: options.page, perpage: options.perpage },
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );

    return (await result.json()) as APIKeyResult;
  }

  public async create(
    options: {
      ownerToken?: string;
      maxUsage?: number;
    } = {},
  ): Promise<APIKeyModel & { error?: GenericAPIError }> {
    const result = await this.r_POST(
      {
        version: 1,
        group: "key",
        path: "create",
        params: { maxUsage: options.maxUsage ?? 0 },
      },
      {},
      {
        Authorization: `Bearer ${options.ownerToken}`,
      },
    );

    return (await result.json()) as APIKeyModel & { error?: GenericAPIError };
  }

  public async get(
    key: string,
  ): Promise<APIKeyModel & { error?: GenericAPIError }> {
    const result = await this.r_GET({
      version: 1,
      group: "key",
      path: key,
    });

    return (await result.json()) as APIKeyModel & { error?: GenericAPIError };
  }

  public async update(
    key: string,
    updateModel: APIKeyUpdateModel,
  ): Promise<GenericAPIResponse> {
    const result = await this.r_PATCH(
      {
        version: 1,
        group: "key",
        path: key,
      },
      updateModel,
    );

    return (await result.json()) as GenericAPIResponse;
  }

  public async delete(key: string): Promise<GenericAPIResponse> {
    const result = await this.r_DELETE({
      version: 1,
      group: "key",
      path: key,
    });

    return (await result.json()) as GenericAPIResponse;
  }
}
