import { GenericModule } from "../utils/modular";
import { GenericAPIError, PaginationOptions } from "../utils/typings/generic";
import { Pagination } from "../utils/typings/pagination";
import { UserModelFull } from "../utils/typings/user";

export class SearchModule extends GenericModule {
  public async user(
    alike: string,
    options: PaginationOptions = { page: 1, perpage: 10 },
  ): Promise<Pagination<UserModelFull> & { error?: GenericAPIError }> {
    const response = await this.r_GET({
      version: 1,
      group: "search",
      path: "user",
      params: { name: alike, page: options.page, perpage: options.perpage },
    });

    return (await response.json()) as Pagination<UserModelFull>;
  }
}
