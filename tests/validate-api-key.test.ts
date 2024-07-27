import { config } from 'dotenv';
import { SwiblyAPI } from '../src/main';

config();

describe('API key validation', function () {
  test('Valid key should work', async function () {
    const client = new SwiblyAPI(process.env.SWIBLY_API_KEY!);

    await expect(client.canConnect()).resolves.toBe(true);
  });

  test('Invalid key should not work', async function () {
    const client = new SwiblyAPI('this-is-not-a-valid-api-key');

    await expect(client.canConnect()).resolves.toBe(false);
  });
});
