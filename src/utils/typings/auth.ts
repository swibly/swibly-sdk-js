import { UserModelProps, UserNotificationProps, UserShowProps } from './user';

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
  username?: string;
  email?: string;
  password: string;
};

/**
 * Represents the body of a user update request.
 */
export type UserUpdateBody = Partial<UserModelProps> &
  Partial<UserShowProps> &
  Partial<UserNotificationProps>;
