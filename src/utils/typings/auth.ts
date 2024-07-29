import { FieldNumericalBoolean, GenericAPIError, ValidAPILanguages } from './generic';

/**
 * Represents the response from the auth API.
 * It can either contain a message, a token and a success message, or an error message.
 */
export type AuthAPIReturn =
  | {
      readonly message: string;
      /** JWT token resulted from an auth action like login or register. */
      readonly token: string;
    }
  | {
      readonly error: GenericAPIError;
    };

/**
 * Represents the body of a user registration request.
 */
export type UserRegisterBody = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

/**
 * Represents the body of a user login request.
 */
export type UserLoginBody = {
  /** The user's username. */
  username?: string;
  /** The user's email. */
  email?: string;
  /** The user's password. */
  password: string;
};

/**
 * Represents the body of a user update request.
 */
export type UserUpdateBody = {
  firstname?: string;
  lastname?: string;
  username?: string;
  bio?: string;
  verified?: boolean;
  email?: string;
  password?: string;
  notification?: {
    inapp?: FieldNumericalBoolean;
    email?: FieldNumericalBoolean;
  };
  show?: {
    profile?: FieldNumericalBoolean;
    image?: FieldNumericalBoolean;
    comments?: FieldNumericalBoolean;
    favorites?: FieldNumericalBoolean;
    projects?: FieldNumericalBoolean;
    components?: FieldNumericalBoolean;
    followers?: FieldNumericalBoolean;
    following?: FieldNumericalBoolean;
    inventory?: FieldNumericalBoolean;
    formations?: FieldNumericalBoolean;
  };
  country?: string;
  language?: ValidAPILanguages;
};
