import { generateEndpoint } from '../utils/endpoint';

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
}
