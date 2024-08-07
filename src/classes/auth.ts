import { GenericModule } from '../utils/modular';
import { UserLoginBody, UserRegisterBody, UserUpdateBody } from '../utils/typings/auth';
import { GenericAPIResponse, GenericTokenAPIResponse } from '../utils/typings/generic';

export class AuthModule extends GenericModule {
  /**
   * Registers a new user with the provided information.
   *
   * @param {RegisterBody} body - The user's information.
   * @return {Promise<GenericTokenAPIResponse>} A Promise that resolves to the response from the API.
   */
  public async register(body: UserRegisterBody): Promise<GenericTokenAPIResponse> {
    try {
      const response = await this.r_POST({ version: 1, group: 'auth', path: 'register' }, body);
      return (await response.json()) as GenericTokenAPIResponse;
    } catch (e: any) {
      return e.response as GenericTokenAPIResponse; // Return the API key error
    }
  }

  /**
   * Logs in a user with the provided information.
   *
   * @param {LoginBody} body - The user's information.
   * @return {Promise<GenericTokenAPIResponse>} A Promise that resolves to the response from the API.
   */
  public async login(body: UserLoginBody): Promise<GenericTokenAPIResponse> {
    try {
      const response = await this.r_POST({ version: 1, group: 'auth', path: 'login' }, body);
      return (await response.json()) as GenericTokenAPIResponse;
    } catch (e: any) {
      return e.response as GenericTokenAPIResponse; // Return the API key error
    }
  }

  /**
   * Updates the user's information with the provided token and body.
   *
   * @param {string} token - The user's token.
   * @param {UpdateBody} body - The user's new information.
   * @return {Promise<ActionReturn>} A Promise that resolves to the response from the API.
   */
  public async update(token: string, body: UserUpdateBody): Promise<GenericAPIResponse> {
    try {
      const response = await this.r_PATCH({ version: 1, group: 'auth', path: 'update' }, body, {
        Authorization: `Bearer ${token}`,
      });

      return (await response.json()) as GenericAPIResponse;
    } catch (e: any) {
      return e.response as GenericAPIResponse; // Return the API key error
    }
  }

  /**
   * Deletes the user's account with the provided token.
   *
   * @param {string} token - The user's token.
   * @return {Promise<ActionReturn>} A Promise that resolves to the response from the API.
   */
  public async delete(token: string): Promise<GenericAPIResponse> {
    try {
      const response = await this.r_DELETE(
        { version: 1, group: 'auth', path: 'delete' },
        {
          Authorization: `Bearer ${token}`,
        },
      );

      return (await response.json()) as GenericAPIResponse;
    } catch (e: any) {
      return e.response as GenericAPIResponse; // Return the API key error
    }
  }

  /**
   * Validates if the provided token is valid.
   *
   * @param {string} token - The user's token.
   * @return {Promise<boolean>} A Promise that resolves to a boolean indicating if the token is valid.
   */
  public async isValid(token: string): Promise<boolean> {
    return (
      await this.r_GET(
        { version: 1, group: 'auth', path: 'validate' },
        { Authorization: `Bearer ${token}` },
      )
    ).ok;
  }
}
