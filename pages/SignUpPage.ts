import { Page } from '@playwright/test';
import { UIActions } from '../actions/uiActions';

export class SignUpPage {

  private ui: UIActions;

  constructor(private page: Page) {
    this.ui = new UIActions(page);
  }

  // ✅ Use readonly so locators cannot be modified accidentally
  readonly CreateAccount = "//a[text()='Create an account']";
  readonly Username = "//input[@name='userName']";
  readonly email = "//input[@name='email']";
  readonly password = "//input[@name='password']";
  readonly CreateAccountButton = "//button[text()='Create Account']";

  // ------------------------------------------------
  // NAVIGATION
  // ------------------------------------------------
  async navigate() {
    await this.page.goto('/');
  }

  // ------------------------------------------------
  // LOGIN FLOW
  // ------------------------------------------------
  async SignUp(username: string , email: string, pass: string) {

    await this.ui.waitForVisible(this.CreateAccount);
    await this.ui.Click(this.CreateAccount);

    await this.ui.waitForVisible(this.Username);
    await this.ui.Click(this.Username);
    await this.ui.type(this.Username, username);

    await this.ui.clearUsingKeyboard(this.email);
    await this.ui.type(this.email, email);

    await this.ui.clearUsingKeyboard(this.password);
    await this.ui.type(this.password, pass);

    // Uses auto-retry click from UIActions
    await this.ui.Click(this.CreateAccountButton);
  }
}