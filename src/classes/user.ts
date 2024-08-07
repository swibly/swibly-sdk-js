import { Endpoint } from "../utils/endpoint";
import { GenericModule } from "../utils/modular";
import { SwiblyClientOptions } from "../utils/typings/client";
import {
  GenericAPIError,
  GenericAPIResponseSimplified,
  PaginationOptions,
} from "../utils/typings/generic";
import { Pagination } from "../utils/typings/pagination";
import { UserModelFull } from "../utils/typings/user";

export class UserModule extends GenericModule {
  private _endpoint: Endpoint = new Endpoint();

  constructor(
    private _username: string,
    private _token: string,
    options: SwiblyClientOptions,
  ) {
    super(options);

    this._endpoint = new Endpoint({
      version: 1,
      group: `user/${this._username}`,
    });
  }

  private get __auth(): any {
    return this._token.trim() !== ""
      ? { Authorization: `Bearer ${this._token}` }
      : {};
  }

  public async profile(): Promise<UserModelFull & { error?: string }> {
    this._endpoint.withPath("profile");

    const result = await this.r_GET(this._endpoint.options, this.__auth);

    return (await result.json()) as UserModelFull & { error?: string };
  }

  public async permissions(): Promise<string[] | { error?: string }> {
    this._endpoint.withPath("permissions");

    const result = await this.r_GET(this._endpoint.options);

    return (await result.json()) as string[] | { error?: string };
  }

  public async followers(
    options: PaginationOptions = {},
  ): Promise<Pagination<UserModelFull> & { error?: string }> {
    this._endpoint.withPath("followers");
    this._endpoint.withParams({ page: options.page, perpage: options.perpage });

    const result = await this.r_GET(this._endpoint.options, this.__auth);

    this._endpoint.withParams({});

    return (await result.json()) as Pagination<UserModelFull> & {
      error?: string;
    };
  }

  public async following(
    options: PaginationOptions = {},
  ): Promise<Pagination<UserModelFull> & { error?: GenericAPIError }> {
    this._endpoint.withPath("following");
    this._endpoint.withParams({ page: options.page, perpage: options.perpage });

    const result = await this.r_GET(this._endpoint.options, this.__auth);

    this._endpoint.withParams({});

    return (await result.json()) as Pagination<UserModelFull> & {
      error?: GenericAPIError;
    };
  }

  public async follow(
    userToFollow: string,
  ): Promise<GenericAPIResponseSimplified> {
    this._endpoint.withPath("follow");

    let last = this._endpoint.options.group;

    this._endpoint.withGroup(`user/${userToFollow}`);

    const result = await this.r_POST(this._endpoint.options, {}, this.__auth);

    this._endpoint.withGroup(last!);

    return (await result.json()) as GenericAPIResponseSimplified;
  }

  public async unfollow(
    userToUnfollow: string,
  ): Promise<GenericAPIResponseSimplified> {
    this._endpoint.withPath("unfollow");

    let last = this._endpoint.options.group;

    this._endpoint.withGroup(`user/${userToUnfollow}`);

    const result = await this.r_POST(this._endpoint.options, {}, this.__auth);

    this._endpoint.withGroup(last!);

    return (await result.json()) as GenericAPIResponseSimplified;
  }
}
