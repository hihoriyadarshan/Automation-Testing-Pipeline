import { Page } from '@playwright/test';
import { UIActions } from '../actions/uiActions';

export class LoginPage {
    private actions: UIActions;

    constructor(page: Page) {
        this.actions = new UIActions(page);
    }

    async login(username: string, password: string) {
        await this.actions.type('#username', username);
        await this.actions.type('#password', password);
        await this.actions.click('#login');
    }
}