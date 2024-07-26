import { config } from 'dotenv';
import { SwiblyAPI } from '../src/main';

config();

describe('API key validation', function () {
  test('Valid key should work', async function () {
    const client = new SwiblyAPI(process.env.SWIBLY_API_KEY!);

    await expect(client.validateAPIKey()).resolves.toBeUndefined(); // validateAPIKey resolves with no value if valid
  });

  test("Invalid key should not work, but don't throw an error", async function () {
    const client = new SwiblyAPI('this-is-not-a-valid-api-key');

    await expect(client.safeValidateAPIKey()).resolves.toEqual(false);
  });

  test('Invalid key should not work, but throw an error', async function () {
    const client = new SwiblyAPI('this-is-not-a-valid-api-key');

    await expect(client.validateAPIKey()).rejects.toThrow('Bad API key');
  });
});
