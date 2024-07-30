const API_ENDPOINT: string = 'https://api.swibly.com.br';

type EndpointOptions = {
  readonly version?: number;
  readonly path: string;
};

function unslash(path: string): string {
  return path.replace(/^\/*|\/*$/gi, '');
}

export function generateEndpoint({ version, path }: EndpointOptions): string {
  return `${API_ENDPOINT}${version && version > 0 ? `/v${version}` : ''}/${unslash(path)}`;
}
