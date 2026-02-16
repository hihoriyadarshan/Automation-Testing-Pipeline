import { Page } from '@playwright/test';

export class WaitForSpinner {

  private page: Page;

  // Your spinner locator
  private readonly spinner =
    "//h2[text()='Please wait...']";

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for spinner to disappear
   * Safe even if spinner never appears.
   */
  async waitForSpinner(timeout: number = 15000) {

    try {

      // Check if spinner appears quickly
      await this.page
        .locator(this.spinner)
        .waitFor({
          state: 'visible',
          timeout: 3000
        });

      // If visible → wait until hidden
      await this.page
        .locator(this.spinner)
        .waitFor({
          state: 'hidden',
          timeout
        });

    } catch {

      // Spinner never appeared — continue test
      // Prevents unnecessary failures

    }
  }
}