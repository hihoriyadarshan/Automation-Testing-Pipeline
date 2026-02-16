import { test, expect } from '@playwright/test';
import { TestDataLoader } from '../utils/TestDataLoader';
import { SignUpPage } from '../pages/SignUpPage';

// ✅ Load Excel Data from SignUp sheet
const testData =
  TestDataLoader.load(
    'Test-Data.xlsx',
    'SignUp'
  );

test.describe('SignUp Module', () => {

  for (const { name, data } of testData) {

    test(name, async ({ page }) => {

      const signUpPage = new SignUpPage(page);

      // -------------------------------------------
      // Navigate
      // -------------------------------------------
      await test.step('Navigate to Home Page', async () => {
        await signUpPage.navigate();
      });

      // -------------------------------------------
      // Perform SignUp
      // -------------------------------------------
      await test.step('Create New Account', async () => {

        await signUpPage.SignUp(
          data.User,
          data.email,
          data.password
        );

      });

      // -------------------------------------------
      // Validation (Generic Success Check)
      // -------------------------------------------
      await test.step('Validate Account Creation', async () => {

        // Wait for navigation after signup
        await page.waitForLoadState('networkidle');

        const currentUrl = page.url();

        // 👉 Adjust based on your app behavior
        const isSuccess =
          currentUrl.includes('dashboard') ||
          currentUrl.includes('welcome') ||
          currentUrl.includes('login');

        expect(isSuccess).toBeTruthy();

      });

    });

  }

});