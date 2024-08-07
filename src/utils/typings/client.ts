import { ValidAPILanguages } from './generic';

/**
 * Represents the options used to initialize a {@link SwiblyClient}. (or any other module)
 *
 * @typedef {Object} SwiblyClientOptions
 * @property {string} key - The API key used to authenticate requests.
 * @property {ValidAPILanguages} [lang] - The language used by the client.
 *    Defaults to 'pt'.
 */
export type SwiblyClientOptions = {
  key: string;
  lang?: ValidAPILanguages;
};
