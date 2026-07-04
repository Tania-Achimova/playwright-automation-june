import { test } from '@playwright/test';
import { AuthPage } from '../page-objects/AuthPage';

// class BasePage {
//     constructor(protected readonly page: Page) { }

//     async goTo(path: string): Promise<void> {
//         await this.page.goto(path);
//     }

//     async getTitle(): Promise<string> {
//         return this.page.title();
//     }

//     async getCurrentUrl(): Promise<string> {
//         return this.page.url();
//     }

//     async expectUrl(pattern: string | RegExp): Promise<void> {
//         await expect(this.page).toHaveURL(pattern);
//     }

//     async expectTitle(pattern: string | RegExp): Promise<void> {
//         await expect(this.page).toHaveTitle(pattern);
//     }

// }

// class AuthPage extends BasePage {
//     constructor(page: Page) {
//         super(page);
//     }

//     get usernameInput() {
//         return this.page.getByPlaceholder('Enter Username');
//     }

//     get passwordInput() {
//         return this.page.getByPlaceholder('Enter Password');
//     }

//     get signInButton() {
//         return this.page.getByRole('button', { name: 'SIGNIN' });
//     }

//     get signUpToggle() {
//         return this.page.getByRole('button', { name: 'Sign Up' });
//     }

//     async navigate(): Promise<void> {
//         await this.goTo('/auth');
//         await expect(this.page).toHaveURL(/auth/i);
//     }

//     async login(username: string, password: string): Promise<void> {
//         await this.usernameInput.fill(username);
//         await this.passwordInput.fill(password);
//         await this.signInButton.click();
//     }

//     async expectSignInButtonEnabled(): Promise<void> {
//         await expect(this.signInButton).toBeEnabled();
//     }

// }

test.describe('POM before and after login', () => {

    test('Without POM', async ({ page }) => {
        await page.goto('/auth');

        const usernameInput = page.getByPlaceholder('Enter Username');
        const passwordInput = page.getByPlaceholder('Enter Password');
        const signInButton = page.getByRole('button', { name: 'SIGNIN' });

        await usernameInput.fill('testuser');
        await passwordInput.fill('password123');
        await signInButton.click();
    });

    test('With POM', async ({ page }) => {
        const authPage = new AuthPage(page);

        await authPage.navigate();
        await authPage.login('testuser', 'password123');
        await authPage.expectSignInButtonEnabled();
    });

});