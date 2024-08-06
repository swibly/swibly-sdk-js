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

  constructor(initialConfiguration?: EndpointOptions) {
    if (initialConfiguration) {
      Object.assign(this, initialConfiguration);
    }
  }

  public withPath(path: string): Endpoint {
    this.path = path;
    return this;
  }

  public withGroup(group: string): Endpoint {
    this.group = group;
    return this;
  }

  public withVersion(version: number): Endpoint {
    this.version = version;
    return this;
  }

  public withParams(params: Record<string, any>) {
    this.params = params;
    return this;
  }

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

  public static from(initialConfiguration?: EndpointOptions): string {
    return new Endpoint(initialConfiguration).build();
  }
}
