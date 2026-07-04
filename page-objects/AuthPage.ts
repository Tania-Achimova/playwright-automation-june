import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get usernameInput() {
        return this.page.getByPlaceholder('Enter Username');
    }

    get passwordInput() {
        return this.page.getByPlaceholder('Enter Password');
    }

    get signInButton() {
        return this.page.getByRole('button', { name: 'SIGNIN' });
    }

    get signUpToggle() {
        return this.page.getByRole('button', { name: 'Sign Up' });
    }

    async navigate(): Promise<void> {
        await this.goTo('/auth');
        await expect(this.page).toHaveURL(/auth/i);
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }

    async expectSignInButtonEnabled(): Promise<void> {
        await expect(this.signInButton).toBeEnabled();
    }

}
