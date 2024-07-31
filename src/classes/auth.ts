import { GenericModule } from '../utils/modular';
import { UserLoginBody, UserRegisterBody, UserUpdateBody } from '../utils/typings/auth';
import { GenericAPIReturn, GenericTokenAPIReturn } from '../utils/typings/generic';

export class AuthModule extends GenericModule {
  /**
   * Registers a new user with the provided information.
   *
   * @param {RegisterBody} body - The user's information.
   * @return {Promise<GenericTokenAPIReturn>} A Promise that resolves to the response from the API.
   */
  public async register(body: UserRegisterBody): Promise<GenericTokenAPIReturn> {
    try {
      const response = await this.r_POST({ version: 1, path: 'auth/register' }, body);
      return (await response.json()) as GenericTokenAPIReturn;
    } catch (e: any) {
      return e.response as GenericTokenAPIReturn; // Return the API key error
    }
  }

  /**
   * Logs in a user with the provided information.
   *
   * @param {LoginBody} body - The user's information.
   * @return {Promise<GenericTokenAPIReturn>} A Promise that resolves to the response from the API.
   */
  public async login(body: UserLoginBody): Promise<GenericTokenAPIReturn> {
    try {
      const response = await this.r_POST({ version: 1, path: 'auth/login' }, body);
      return (await response.json()) as GenericTokenAPIReturn;
    } catch (e: any) {
      return e.response as GenericTokenAPIReturn; // Return the API key error
    }
  }

  /**
   * Updates the user's information with the provided token and body.
   *
   * @param {string} token - The user's token.
   * @param {UpdateBody} body - The user's new information.
   * @return {Promise<ActionReturn>} A Promise that resolves to the response from the API.
   */
  public async update(token: string, body: UserUpdateBody): Promise<GenericAPIReturn> {
    try {
      const response = await this.r_PATCH({ version: 1, path: 'auth/update' }, body, {
        Authorization: `Bearer ${token}`,
      });

      return (await response.json()) as GenericAPIReturn;
    } catch (e: any) {
      return e.response as GenericAPIReturn; // Return the API key error
    }
  }

  /**
   * Deletes the user's account with the provided token.
   *
   * @param {string} token - The user's token.
   * @return {Promise<ActionReturn>} A Promise that resolves to the response from the API.
   */
  public async delete(token: string): Promise<GenericAPIReturn> {
    try {
      const response = await this.r_DELETE(
        { version: 1, path: 'auth/delete' },
        {
          Authorization: `Bearer ${token}`,
        },
      );

      return (await response.json()) as GenericAPIReturn;
    } catch (e: any) {
      return e.response as GenericAPIReturn; // Return the API key error
    }
  }
}
