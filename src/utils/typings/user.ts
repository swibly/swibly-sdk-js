import { FieldNumericalBoolean, ValidAPILanguages } from './generic';

/**
 * Represents the properties of a user model.
 */
export type UserModelProps = {
  firstname: string;
  lastname: string;
  username: string;
  bio: string;
  verified: boolean;
  email: string;
  password: string;
  country: string;
  language: ValidAPILanguages;
};

/**
 * Represents the notification preferences of a user.
 */
export type UserNotificationProps = {
  /** Indicates if the user wants to receive notifications in the app. */
  inapp: FieldNumericalBoolean;
  /** Indicates if the user wants to receive email notifications. */
  email: FieldNumericalBoolean;
};

/**
 * Represents the visibility settings of a user's data.
 */
export type UserShowProps = {
  profile: FieldNumericalBoolean;
  image: FieldNumericalBoolean;
  comments: FieldNumericalBoolean;
  favorites: FieldNumericalBoolean;
  projects: FieldNumericalBoolean;
  components: FieldNumericalBoolean;
  followers: FieldNumericalBoolean;
  following: FieldNumericalBoolean;
  inventory: FieldNumericalBoolean;
  formations: FieldNumericalBoolean;
};
