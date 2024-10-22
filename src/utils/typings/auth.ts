import { ValidAPILanguages } from './generic';
import { UserNotificationProps, UserShowProps } from './user';

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
export type UserUpdateBody = Partial<{
  firstname: string;
  lastname: string;
  username: string;
  bio: string;
  verified: boolean;
  email: string;
  password: string;
  country: string;
  language: ValidAPILanguages;
}> & {
  show?: Partial<UserShowProps>;
} & { notification?: Partial<UserNotificationProps> };
