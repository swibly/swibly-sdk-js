export type EndpointOptions = Partial<{
  path: string;
  group: string;
  version: number;
  params: Record<string, any>;
}>;

export class Endpoint {
  private path = '';
  private group = '';
  private version = 1;
  private params: Record<string, any> = {};

  /**
   * Initializes a new instance of the {@link Endpoint} class.
   *
   * @param {EndpointOptions} [initialConfiguration={}] - The initial configuration for the endpoint.
   */
  constructor(initialConfiguration: EndpointOptions = {}) {
    Object.assign(this, initialConfiguration);
  }

  /**
   * Sets the path of the endpoint.
   *
   * @param {string} path - The path of the endpoint.
   * @returns {Endpoint} The current instance of the {@link Endpoint} class.
   */
  public withPath(path: string): Endpoint {
    this.path = path;
    return this;
  }

  /**
   * Sets the group of the endpoint.
   *
   * @param {string} group - The group of the endpoint.
   * @returns {Endpoint} The current instance of the {@link Endpoint} class.
   */
  public withGroup(group: string): Endpoint {
    this.group = group;
    return this;
  }

  /**
   * Sets the version of the endpoint.
   *
   * @param {number} version - The version of the endpoint.
   * @returns {Endpoint} The current instance of the {@link Endpoint} class.
   */
  public withVersion(version: number): Endpoint {
    this.version = version;
    return this;
  }

  /**
   * Sets the parameters of the endpoint.
   *
   * @param {Record<string, any>} params - The parameters of the endpoint.
   * @returns {Endpoint} The current instance of the {@link Endpoint} class.
   */
  public withParams(params: Record<string, any>): Endpoint {
    this.params = params;
    return this;
  }

  /**
   * Gets the options of the endpoint.
   *
   * @returns {EndpointOptions} The options of the endpoint.
   */
  public get options(): EndpointOptions {
    return {
      path: this.path,
      group: this.group,
      version: this.version,
      params: this.params,
    };
  }

  /**
   * Builds the endpoint URL.
   *
   * @returns {string} The URL of the endpoint.
   */
  public build(): string {
    const unslash = (str: string) => str.replace(/\/$/, '');

    let finalEndpoint = 'https://api.swibly.com.br';

    if (this.version > 0) {
      finalEndpoint += `/v${this.version}`;
    }

    if (this.group.trim() !== '') {
      finalEndpoint += `/${unslash(this.group)}`;
    }

    if (this.path.trim() !== '') {
      finalEndpoint += `/${unslash(this.path)}`;
    }

    if (JSON.stringify(this.params) !== '{}') {
      finalEndpoint += '?';

      const p = [];

      for (const [key, value] of Object.entries(this.params)) {
        if (value !== '') {
          p.push(`${key}=${value}`);
        } else {
          p.push(key);
        }
      }

      finalEndpoint += p.join('&');
    }

    return encodeURI(finalEndpoint);
  }

  /**
   * Creates a new instance of the {@link Endpoint} class from the given options.
   *
   * @param {EndpointOptions} [initialConfiguration={}] - The initial configuration for the endpoint.
   * @returns {string} The URL of the endpoint.
   */
  public static from(initialConfiguration: EndpointOptions = {}): string {
    return new Endpoint(initialConfiguration).build();
  }
}
