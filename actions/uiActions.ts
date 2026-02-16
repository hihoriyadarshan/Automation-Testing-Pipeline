import { Page, Locator, expect } from '@playwright/test';

export class UIActions {
    constructor(private page: Page) {}

    // Flexible locator handler
    private locatorElement(locator: string | Locator): Locator {
        return typeof locator === 'string'
            ? this.page.locator(locator)
            : locator;
    }

    // -----------------------------
    // WAIT SAFE ACTION
    // -----------------------------
    async waitForVisible(locator: string | Locator, timeout = 10000) {
        await expect(this.locatorElement(locator)).toBeVisible({ timeout });
    }

    // -----------------------------
    // SCROLL INTO VIEW
    // -----------------------------
    async scrollIntoView(locator: string | Locator) {
        await this.locatorElement(locator).scrollIntoViewIfNeeded();
    }

    // -----------------------------
    // AUTO-RETRY CLICK + FORCE FALLBACK
    // -----------------------------
    async Click(locator: string | Locator, retries = 3) {
        const element = this.locatorElement(locator);

        for (let i = 0; i < retries; i++) {
            try {
                await element.waitFor({ state: 'visible', timeout: 5000 });
                await element.click();
                return;
            } catch (error) {
                if (i === retries - 1) {
                    console.warn('Normal click failed. Trying force click...');
                    await element.click({ force: true });
                }
            }
        }
    }

    async doubleClick(locator: string | Locator) {
        await this.waitForVisible(locator);
        await this.locatorElement(locator).dblclick();
    }

    async rightClick(locator: string | Locator) {
        await this.locatorElement(locator).click({ button: 'right' });
    }

    async leftClick(locator: string | Locator) {
        await this.Click(locator);
    }

    // -----------------------------
    // JS FALLBACK CLICKS
    // -----------------------------
    async clickUsingJS(locator: string | Locator) {
        await this.locatorElement(locator).evaluate((el: HTMLElement) => el.click());
    }

    async doubleClickUsingJS(locator: string | Locator) {
        await this.locatorElement(locator).evaluate((el: HTMLElement) => {
            const event = new MouseEvent('dblclick', {
                bubbles: true,
                cancelable: true,
                view: window,
            });
            el.dispatchEvent(event);
        });
    }

    // -----------------------------
    // SMART TYPING (Human-like)
    // -----------------------------
    async smartType(
        locator: string | Locator,
        text: string,
        delay = 80 // milliseconds per key
    ) {
        const element = this.locatorElement(locator);
        await element.waitFor({ state: 'visible' });
        await element.click();

        await this.page.keyboard.type(text, { delay });
    }

    async type(locator: string | Locator, text: string) {
        await this.locatorElement(locator).fill(text);
    }

    // CTRL + A + DELETE
    async clearUsingKeyboard(locator: string | Locator) {
        const element = this.locatorElement(locator);
        await element.click();

        const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';

        await this.page.keyboard.press(`${modifier}+A`);
        await this.page.keyboard.press('Delete');
    }

    // -----------------------------
    // KEYBOARD ACTIONS
    // -----------------------------
    async keyboardPress(key: string) {
        await this.page.keyboard.press(key);
    }

    async keyboardShortcut(shortcut: string) {
        await this.page.keyboard.press(shortcut);
    }

    // -----------------------------
    // MOUSE ACTIONS
    // -----------------------------
    async mouseWheelScroll(deltaX = 0, deltaY = 500) {
        await this.page.mouse.wheel(deltaX, deltaY);
    }

    async hover(locator: string | Locator) {
        await this.locatorElement(locator).hover();
    }

    // -----------------------------
    // DRAG & DROP
    // -----------------------------
    async dragAndDrop(source: string | Locator, target: string | Locator) {
        await this.locatorElement(source).dragTo(this.locatorElement(target));
    }

    // -----------------------------
    // FILE UPLOAD
    // -----------------------------
    async uploadFile(locator: string | Locator, filePath: string) {
        await this.locatorElement(locator).setInputFiles(filePath);
    }

    // -----------------------------
    // DROPDOWN HANDLERS
    // -----------------------------
    async selectByValue(locator: string | Locator, value: string) {
        await this.locatorElement(locator).selectOption({ value });
    }

    async selectByLabel(locator: string | Locator, label: string) {
        await this.locatorElement(locator).selectOption({ label });
    }

    async selectByIndex(locator: string | Locator, index: number) {
        await this.locatorElement(locator).selectOption({ index });
    }

    // Custom dropdown (non-select HTML)
    async selectCustomDropdown(
        dropdownLocator: string | Locator,
        optionLocator: string | Locator
    ) {
        await this.Click(dropdownLocator);
        await this.Click(optionLocator);
    }

    // -----------------------------
    // TEXT
    // -----------------------------

    async getText(locator: string | Locator) {
        return await this.locatorElement(locator).textContent();
    }


    // ------------------------------------------------
    // AUTO LOGGER
    // ------------------------------------------------
    private log(message: string) {
        console.log(`🔹 UIActions: ${message}`);
    }


    // ------------------------------------------------
    // SCREENSHOT ON FAILURE
    // ------------------------------------------------
    private async takeScreenshotOnFailure(name: string) {
        await this.page.screenshot({
            path: `./screenshots/${name}-${Date.now()}.png`,
            fullPage: true
        });
    }


    


}