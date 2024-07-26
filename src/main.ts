import { endpoint } from './utils/endpoint';

export class SwiblyAPI {
  private headers: Record<string, string> = {};

  constructor(key: string) {
    if (!key) {
      throw new Error('Missing API key');
    }

    this.headers['X-API-KEY'] = key;
  }

  private async _fetch(method: string, url: string, body?: any): Promise<Response> {
    return fetch(url, {
      method,
      body,
      headers: this.headers,
    });
  }

  /**
   * Checks if the API key is valid. Throws an error if the API key is invalid.
   */
  public async validateAPIKey(): Promise<void> {
    if (!(await this.safeValidateAPIKey())) {
      throw new Error('Bad API key');
    }
  }

  /**
   * Checks if the API key is valid safely without throwing an error.
   * True if the API key is valid, false if the API key is invalid.
   */
  public async safeValidateAPIKey(): Promise<boolean> {
    try {
      const response = await this._fetch('GET', endpoint(0, 'healthcare'));
      return response.status === 200;
    } catch (error) {
      console.error('Failed to validate API key:', error);
      return false; // In case of network errors, consider the API key invalid.
    }
  }
}
