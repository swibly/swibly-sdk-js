import { Endpoint } from '../utils/endpoint';
import { GenericModule } from '../utils/modular';
import { SwiblyClientOptions } from '../utils/typings/client';
import {
  GenericAPIError,
  GenericAPIResponseSimplified,
  PaginationOptions,
} from '../utils/typings/generic';
import { Pagination } from '../utils/typings/pagination';
import { UserModelFull } from '../utils/typings/user';

export class UserModule extends GenericModule {
  private _endpoint: Endpoint = new Endpoint();

  /**
   * Constructs a new UserModule.
   *
   * @param {string} _username - The username of the user.
   * @param {string} _token - The authentication token for the user.
   * @param {SwiblyClientOptions} options - The client options.
   */
  constructor(private _username: string, private _token: string, options: SwiblyClientOptions) {
    super(options);

    this._endpoint = new Endpoint({
      version: 1,
      group: `user/${this._username}`,
    });
  }

  /**
   * Returns the authentication headers for the user.
   *
   * @returns {Object} The authentication headers.
   */
  private get __auth(): any {
    return this._token.trim() !== '' ? { Authorization: `Bearer ${this._token}` } : {};
  }

  /**
   * Fetches the profile of the user.
   *
   * @returns {Promise<UserModelFull & { error?: string }>} The user's profile.
   */
  public async profile(): Promise<UserModelFull & { error?: string }> {
    this._endpoint.withPath('profile');

    const result = await this.r_GET(this._endpoint.options, this.__auth);

    return (await result.json()) as UserModelFull & { error?: string };
  }

  /**
   * Fetches the permissions of the user.
   *
   * @returns {Promise<string[] | { error?: string }>} The user's permissions.
   */
  public async permissions(): Promise<string[] | { error?: string }> {
    this._endpoint.withPath('permissions');

    const result = await this.r_GET(this._endpoint.options);

    return (await result.json()) as string[] | { error?: string };
  }

  /**
   * Fetches the followers of the user.
   *
   * @param {PaginationOptions} [options={}] - The pagination options.
   * @returns {Promise<Pagination<UserModelFull> & { error?: string }>} The user's followers.
   */
  public async followers(
    options: PaginationOptions = {},
  ): Promise<Pagination<UserModelFull> & { error?: string }> {
    this._endpoint.withPath('followers');
    this._endpoint.withParams({ page: options.page, perpage: options.perpage });

    const result = await this.r_GET(this._endpoint.options, this.__auth);

    this._endpoint.withParams({});

    return (await result.json()) as Pagination<UserModelFull> & {
      error?: string;
    };
  }

  /**
   * Fetches the users being followed by the user.
   *
   * @param {PaginationOptions} [options={}] - The pagination options.
   * @returns {Promise<Pagination<UserModelFull> & { error?: GenericAPIError }>} The users being followed.
   */
  public async following(
    options: PaginationOptions = {},
  ): Promise<Pagination<UserModelFull> & { error?: GenericAPIError }> {
    this._endpoint.withPath('following');
    this._endpoint.withParams({ page: options.page, perpage: options.perpage });

    const result = await this.r_GET(this._endpoint.options, this.__auth);

    this._endpoint.withParams({});

    return (await result.json()) as Pagination<UserModelFull> & {
      error?: GenericAPIError;
    };
  }

  /**
   * Follows a user.
   *
   * @param {string} userToFollow - The username of the user to follow.
   * @returns {Promise<GenericAPIResponseSimplified>} The response of the follow operation.
   */
  public async follow(userToFollow: string): Promise<GenericAPIResponseSimplified> {
    this._endpoint.withPath('follow');

    let last = this._endpoint.options.group;

    this._endpoint.withGroup(`user/${userToFollow}`);

    const result = await this.r_POST(this._endpoint.options, {}, this.__auth);

    this._endpoint.withGroup(last!);

    return (await result.json()) as GenericAPIResponseSimplified;
  }

  /**
   * Unfollows a user.
   *
   * @param {string} userToUnfollow - The username of the user to unfollow.
   * @returns {Promise<GenericAPIResponseSimplified>} The response of the unfollow operation.
   */
  public async unfollow(userToUnfollow: string): Promise<GenericAPIResponseSimplified> {
    this._endpoint.withPath('unfollow');

    let last = this._endpoint.options.group;

    this._endpoint.withGroup(`user/${userToUnfollow}`);

    const result = await this.r_POST(this._endpoint.options, {}, this.__auth);

    this._endpoint.withGroup(last!);

    return (await result.json()) as GenericAPIResponseSimplified;
  }
}
