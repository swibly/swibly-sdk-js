import { Endpoint, EndpointOptions } from './endpoint';

type _allowedMethods = 'POST' | 'GET' | 'PATCH' | 'DELETE';

/**
 * Base class for Swibly API modules.
 *
 * @protected
 */
export class GenericModule {
  /**
   * Creates an instance.
   *
   * @param {string} _key - The API key.
   * @memberof GenericModule
   */
  constructor(private _key: string) {
    if (!_key || _key.trim().length === 0) {
      throw new Error('Missing API key');
    }
  }

  /**
   * Gets the API key.
   *
   * @readonly
   * @type {string}
   * @memberof GenericModule
   */
  protected get key(): string {
    return this._key;
  }

  private _request(endpoint: EndpointOptions, method: _allowedMethods, body?: any, headers?: any) {
    return fetch(Endpoint.from(endpoint), {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'X-API-KEY': this.key,
        ...headers,
      },
      method,
    });
  }

  protected r_POST(endpoint: EndpointOptions, body: any, headers?: Record<string, string>) {
    return this._request(endpoint, 'POST', body, headers);
  }

  protected r_GET(endpoint: EndpointOptions, headers?: Record<string, string>) {
    return this._request(endpoint, 'GET', undefined, headers);
  }

  protected r_PATCH(endpoint: EndpointOptions, body: any, headers?: Record<string, string>) {
    return this._request(endpoint, 'PATCH', body, headers);
  }

  protected r_DELETE(endpoint: EndpointOptions, headers?: Record<string, string>) {
    return this._request(endpoint, 'DELETE', undefined, headers);
  }
}
