import { config } from 'dotenv';
import { SwiblyAPI } from '../src/main';

config();

describe('Auth module', function () {
  test('Auth module should be defined', async function () {
    const client = new SwiblyAPI(process.env.SWIBLY_API_KEY!);
    const auth = client.auth;

    expect(auth).toBeDefined();
  });

  test('Register should work', async function () {
    const client = new SwiblyAPI(process.env.SWIBLY_API_KEY!);
    const auth = client.auth;

    const response = await auth.register({
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      email: 'johndoe@swibly.com',
      password: 'T3$T1in6P4$$w()rD',
    });

    expect(response.token).toBeDefined();
  });

  test('Login should work', async function () {
    const client = new SwiblyAPI(process.env.SWIBLY_API_KEY!);
    const auth = client.auth;

    const response = await auth.login({
      username: 'johndoe',
      password: 'T3$T1in6P4$$w()rD',
    });

    expect(response.token).toBeDefined();
  });

  test('Update should work', async function () {
    const client = new SwiblyAPI(process.env.SWIBLY_API_KEY!);
    const auth = client.auth;

    // Dependant on previous tests
    const loginResponse = await auth.login({
      username: 'johndoe',
      password: 'T3$T1in6P4$$w()rD',
    });

    const updateResponse = await auth.update(loginResponse.token!, {
      verified: true,
    });

    expect(updateResponse.message).toBeDefined();
  });

  test('Delete should work', async function () {
    const client = new SwiblyAPI(process.env.SWIBLY_API_KEY!);
    const auth = client.auth;

    // Dependant on previous tests
    const loginResponse = await auth.login({
      username: 'johndoe',
      password: 'T3$T1in6P4$$w()rD',
    });

    const deleteResponse = await auth.delete(loginResponse.token!);

    expect(deleteResponse.message).toBeDefined();
  });
});
