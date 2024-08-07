import { FieldNumericalBoolean } from "./generic";

export type APIKeyModel = {
  key: string;
  owner: string;
  enabled_key_manage: FieldNumericalBoolean;
  enabled_auth: FieldNumericalBoolean;
  enabled_search: FieldNumericalBoolean;
  enabled_user_fetch: FieldNumericalBoolean;
  enabled_user_actions: FieldNumericalBoolean;
  times_used: number;
  max_usage: number;
};

export type APIKeyUpdateModel = {
  owner?: string;
  enabled_key_manage?: FieldNumericalBoolean;
  enabled_auth?: FieldNumericalBoolean;
  enabled_search?: FieldNumericalBoolean;
  enabled_user_fetch?: FieldNumericalBoolean;
  enabled_user_actions?: FieldNumericalBoolean;
  times_used?: number;
  max_usage?: number;
};