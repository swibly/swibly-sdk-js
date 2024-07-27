import { generateEndpoint } from '../../utils/endpoint';

type NumericalBoolean = 1 | -1;

type AuthReturn = {
  readonly message?: string;
  readonly token?: string;
  readonly error?: string | Record<string, string>;
};

type ActionReturn = {
  readonly message?: string;
  readonly error?: string | Record<string, string>;
};

type RegisterBody = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

type LoginBody = {
  username?: string;
  email?: string;
  password: string;
};

type UpdateBody = {
  firstname?: string;
  lastname?: string;
  username?: string;
  bio?: string;
  verified?: boolean;
  email?: string;
  password?: string;
  notification?: {
    inapp?: NumericalBoolean;
    email?: NumericalBoolean;
  };
  show?: {
    profile?: NumericalBoolean;
    image?: NumericalBoolean;
    comments?: NumericalBoolean;
    favorites?: NumericalBoolean;
    projects?: NumericalBoolean;
    components?: NumericalBoolean;
    followers?: NumericalBoolean;
    following?: NumericalBoolean;
    inventory?: NumericalBoolean;
    formations?: NumericalBoolean;
  };
  country?: string;
  language?: string;
};

export class AuthModule {
  constructor(private key: string) {}

  /**
   * Registers a new user with the provided information.
   *
   * @param {RegisterBody} body - The user's information.
   * @return {Promise<AuthReturn>} A Promise that resolves to the response from the API.
   */
  public async register(body: RegisterBody): Promise<AuthReturn> {
    try {
      const response = await fetch(generateEndpoint({ version: 1, path: 'auth/register' }), {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'X-API-KEY': this.key },
      });

      return (await response.json()) as AuthReturn;
    } catch (e: any) {
      return e.response as AuthReturn; // Return the API key error
    }
  }

  /**
   * Logs in a user with the provided information.
   *
   * @param {LoginBody} body - The user's information.
   * @return {Promise<AuthReturn>} A Promise that resolves to the response from the API.
   */
  public async login(body: LoginBody): Promise<AuthReturn> {
    try {
      const response = await fetch(generateEndpoint({ version: 1, path: 'auth/login' }), {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'X-API-KEY': this.key },
      });

      return (await response.json()) as AuthReturn;
    } catch (e: any) {
      return e.response as AuthReturn; // Return the API key error
    }
  }

  /**
   * Updates the user's information with the provided token and body.
   *
   * @param {string} token - The user's token.
   * @param {UpdateBody} body - The user's new information.
   * @return {Promise<ActionReturn>} A Promise that resolves to the response from the API.
   */
  public async update(token: string, body: UpdateBody): Promise<ActionReturn> {
    try {
      const response = await fetch(generateEndpoint({ version: 1, path: 'auth/update' }), {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'X-API-KEY': this.key, Authorization: `Bearer ${token}` },
      });

      return (await response.json()) as ActionReturn;
    } catch (e: any) {
      return e.response as ActionReturn; // Return the API key error
    }
  }

  /**
   * Deletes the user's account with the provided token.
   *
   * @param {string} token - The user's token.
   * @return {Promise<ActionReturn>} A Promise that resolves to the response from the API.
   */
  public async delete(token: string): Promise<ActionReturn> {
    try {
      const response = await fetch(generateEndpoint({ version: 1, path: 'auth/delete' }), {
        method: 'DELETE',
        headers: { 'X-API-KEY': this.key, Authorization: `Bearer ${token}` },
      });

      return (await response.json()) as ActionReturn;
    } catch (e: any) {
      return e.response as ActionReturn; // Return the API key error
    }
  }
}
