import { GenericModule } from '../utils/modular';
import { AuthModule } from './auth';

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
