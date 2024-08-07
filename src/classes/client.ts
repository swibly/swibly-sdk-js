import { GenericModule } from '../utils/modular';
import { APIKeyModule } from './apikey';
import { AuthModule } from './auth';
import { SearchModule } from './search';
import { UserModule } from './user';

/**
 * Class representing a Swibly API client.
 *
 * @class
 */
export class SwiblyClient extends GenericModule {
  /**
   * Checks if the API is reachable by making a request to the healthcare endpoint using the provided API key.
   *
   * @return {Promise<boolean>} A Promise that resolves to a boolean indicating if the API is reachable (true) or not (false).
   */
  public async canConnect(): Promise<boolean> {
    try {
      return (await this.r_GET({ version: 0, path: 'healthcare' }, { 'X-Lang': this.lang })).ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Returns an instance of the AuthModule class initialized with the current API key, which can be used to make
   * auth related requests like `login`, `register`, etc.
   *
   * @return {AuthModule} An instance of the AuthModule class.
   */
  public get auth(): AuthModule {
    return new AuthModule({ key: this.key, lang: this.lang });
  }

  /**
   * Returns an instance of the SearchModule class initialized with the current API key, which can be used to make
   * search related requests like `user`, etc.
   *
   * @return {SearchModule} An instance of the SearchModule class.
   */
  public get search(): SearchModule {
    return new SearchModule({ key: this.key, lang: this.lang });
  }

  /**
   * Returns an instance of the APIKeyModule class initialized with the current API key, which can be used to make
   * API key related requests like `list`, `create`, etc.
   *
   * @return {APIKeyModule} An instance of the APIKeyModule class.
   */
  public get apikey(): APIKeyModule {
    return new APIKeyModule({ key: this.key, lang: this.lang });
  }

  /**
   * Returns an instance of the UserModule class initialized with the current API key and the provided username,
   * which can be used to make user related requests like `profile`, `permissions`, etc.
   *
   * @param {string} username - The username of the user.
   * @param {string} [token=''] - The token for the user.
   * @return {UserModule} An instance of the UserModule class.
   * @throws {Error} If the username is null or empty.
   */
  public user(username: string, token: string = ''): UserModule {
    if (username.trim() === '') {
      throw new Error('Username cannot be null');
    }

    return new UserModule(username, token, { key: this.key, lang: this.lang });
  }
}

/**
 * Class representing a Swibly API client.
 *
 * @class
 * @deprecated This class is deprecated and will be removed in future versions. Use {@link SwiblyClient} instead.
 */
export class SwiblyAPI extends SwiblyClient {
  /**
   * Creates an instance of SwiblyAPI.
   *
   * @param {string} key - The API key.
   * @memberof SwiblyAPI
   */
  constructor(key: string) {
    super({ key, lang: 'pt' });
    console.warn(
      'SwiblyAPI is deprecated and will be removed in future versions. Use SwiblyClient instead.',
    );
  }
}
