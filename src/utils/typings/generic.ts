/**
 * Type representing a numerical boolean, either 1 or -1.
 * Useful for boolean values that need to be stored as a number.
 */
export type FieldNumericalBoolean = 1 | -1;

/**
 * Type representing a generic error.
 * It can be a string or an object with string keys and string values.
 */
export type GenericAPIError = string | Record<string, string>;

/**
 * Type representing the response from the API.
 * It can be either a successful response with a message or an error response with an error.
 */
export type GenericAPIReturn =
  | {
      readonly message: string;
    }
  | {
      readonly error: GenericAPIError;
    };

/**
 * Type representing a language that is either pt, en or ru.
 */
export type ValidAPILanguages = 'pt' | 'en' | 'ru';
