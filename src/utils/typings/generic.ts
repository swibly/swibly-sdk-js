/**
 * Type representing the response from the API.
 * It can be either a successful response with a message or an error response with an error.
 */
export type GenericAPIReturn = {
  message?: string;
  error?: GenericAPIError;
};

/**
 * Represents the response from the auth API.
 * It can either contain a message, a token and a success message, or an error message.
 */
export type GenericTokenAPIReturn = {
  message?: string;
  /** JWT token resulted from an auth action like login or register. */
  token?: string;
  error?: GenericAPIError;
};

/**
 * Type representing a generic error.
 * It can be a string or an object with string keys and string values.
 */
export type GenericAPIError = string | Record<string, string>;

/**
 * Type representing a numerical boolean, either 1 or -1.
 * Useful for boolean values that need to be stored as a number.
 */
export type FieldNumericalBoolean = 1 | -1;

/**
 * Type representing a language that is either pt, en or ru.
 */
export type ValidAPILanguages = 'pt' | 'en' | 'ru';