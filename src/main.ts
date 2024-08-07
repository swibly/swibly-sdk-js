import { SwiblyAPI, SwiblyClient } from './classes/client';
import { UserLoginBody, UserRegisterBody, UserUpdateBody } from './utils/typings/auth';
import { SwiblyClientOptions } from './utils/typings/client';
import { FieldNumericalBoolean, ValidAPILanguages } from './utils/typings/generic';
import { UserModelFull } from './utils/typings/user';

export { SwiblyAPI, SwiblyClient };
export type {
  UserLoginBody as LoginBody,
  FieldNumericalBoolean as NumericalBoolean,
  UserRegisterBody as RegisterBody,
  SwiblyClientOptions,
  UserUpdateBody as UpdateBody,
  UserModelFull as UserModel,
  ValidAPILanguages,
};
