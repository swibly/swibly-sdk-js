import { API_ENDPOINT } from './config';

export function unslash(path: string) {
  return path.replace(/^\/*|\/*$/gi, '');
}

export function endpoint(version: number, path: string) {
  return `${API_ENDPOINT}${version > 0 ? `/v${version}` : ''}/${unslash(path)}`;
}
