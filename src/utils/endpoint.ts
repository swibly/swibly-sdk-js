export type EndpointOptions = Partial<{
  path: string;
  group: string;
  version: number;
}>;

export class Endpoint {
  private path = '';
  private group = '';
  private version = 1;

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

    return finalEndpoint;
  }

  public static from(initialConfiguration?: EndpointOptions): string {
    return new Endpoint(initialConfiguration).build();
  }
}
