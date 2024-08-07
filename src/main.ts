import { SwiblyAPI, SwiblyClient } from "./classes/client";
import { SwiblyClientOptions } from "./utils/typings/client";
import { UserModelFull } from "./utils/typings/user";
import {
  UserRegisterBody,
  UserLoginBody,
  UserUpdateBody,
} from "./utils/typings/auth";
import {
  ValidAPILanguages,
  FieldNumericalBoolean,
} from "./utils/typings/generic";

export { SwiblyAPI, SwiblyClient };
export type {
  SwiblyClientOptions,
  UserModelFull as UserModel,
  UserRegisterBody as RegisterBody,
  UserLoginBody as LoginBody,
  UserUpdateBody as UpdateBody,
  ValidAPILanguages,
  FieldNumericalBoolean as NumericalBoolean,
};
