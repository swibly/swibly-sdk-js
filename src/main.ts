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

  public async validateAPIKey(): Promise<string> {
    return (await this._fetch('GET', endpoint(0, 'healthcare'))).ok ? 'OK' : 'Bad API key';
  }
}
