import { generateEndpoint } from '../utils/endpoint';
import { AuthModule } from './modules/Auth';

export default class SwiblyAPI {
  constructor(private key: string) {
    if (!key || key.trim().length === 0) {
      throw new Error('Missing API key');
    }
  }

  /**
   * Checks if the API is reachable by making a request to the healthcare endpoint using the provided API key.
   *
   * @return {Promise<boolean>} A Promise that resolves to a boolean indicating if the API is reachable or not.
   */
  public async canConnect(): Promise<boolean> {
    try {
      const response = await fetch(generateEndpoint({ path: 'healthcare' }), {
        method: 'GET',
        headers: { 'X-API-KEY': this.key },
      });

      return response.ok;
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
    return new AuthModule(this.key);
  }
}
