import { Endpoint, EndpointOptions } from './endpoint';
import { ValidAPILanguages } from './typings/generic';

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
   * @param {ValidAPILanguages} _lang - The language to use. Defaults to 'pt'.
   * @memberof GenericModule
   */
  constructor(private _key: string, private _lang: ValidAPILanguages = 'pt') {
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

  /**
   * Gets the language used by the module.
   *
   * @readonly
   * @type {ValidAPILanguages}
   * @memberof GenericModule
   */
  protected get lang(): ValidAPILanguages {
    return this._lang;
  }

  /**
   * Sets the language used by the module.
   *
   * @param {ValidAPILanguages} lang - The language to set.
   * @return {this} The instance of the module.
   * @memberof GenericModule
   */
  public withLang(lang: ValidAPILanguages): this {
    this._lang = lang;
    return this;
  }

  private _request(endpoint: EndpointOptions, method: _allowedMethods, body?: any, headers?: any) {
    return fetch(Endpoint.from(endpoint), {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'X-API-KEY': this.key,
        'X-Lang': this.lang,
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
