import { Page } from '@playwright/test';

export class UIActions {
    constructor(private page: Page) {}

    async click(locator: string) {
        await this.page.locator(locator).click();
    }

    async type(locator: string, text: string) {
        await this.page.locator(locator).fill(text);
    }

    async getText(locator: string) {
        return await this.page.locator(locator).textContent();
    }
}