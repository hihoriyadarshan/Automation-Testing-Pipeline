import { test, expect } from '@playwright/test';
import { TestDataLoader } from '../utils/TestDataLoader';
import { LoginPage } from '../pages/LoginPage';

const testData =
  TestDataLoader.load(
    'Test-Data.xlsx',
    'Login'
  );

test.describe('Login Module', () => {

  for (const { name, data } of testData) {

    test(name, async ({ page }) => {

      const loginPage = new LoginPage(page);

      await test.step('Navigate to Login', async () => {
        await loginPage.navigate();
      });

      await test.step('Enter Credentials', async () => {
        await loginPage.login(
          data.username,
          data.password
        );
      });

      await test.step('Validate Login', async () => {

        const isLoggedIn =
          await loginPage.isLoginSuccess();

        expect(isLoggedIn)
          .toBe(data.expected === 'success');
      });
    });
  }
});