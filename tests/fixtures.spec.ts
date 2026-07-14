import { test as base, expect, Page } from '@playwright/test';
import { config } from '../src/config';

base.describe('BUILD IN FIXTURES', () => {

    base('Page fixtures: each test has a fresh page instance', async ({ page }) => {
        await page.goto('/auth');
        await expect(page).toHaveURL(/auth/);
    });

    base('Browser fixtures: each test has a fresh browser context', async ({ browser }) => {
        const context = await browser.newContext();
        const secondPage = await context.newPage();

        await secondPage.goto('http://codeandtest.com/auth');

        await expect(secondPage).toHaveURL(/auth/);

        await context.close();
    });

    base('request fixtures: make a request to the server', async ({ request }) => {
        const response = await request.get(`${config.API_BASE_URL}/current-user`);
        expect(response.status()).toBeLessThan(500);
    });

});

type MyFixtures = {
    authPage: Page
};

const testWithAuth = base.extend<MyFixtures>({
    authPage: async ({ page }, use) => {
        await page.goto('/auth');
        await use(page);
    }
});

testWithAuth.describe('Custom fixtures with test.extend', () => {

    testWithAuth('authPage fixture delivers page already at /auth', async ({ authPage }) => {
        await expect(authPage).toHaveURL(/auth/);
    });

    testWithAuth('authPage: SIGNIN button is visible but disabled on arrival', async ({ authPage }) => {
        const signInButton = authPage.getByRole('button', { name: 'SIGNIN' });
        
        await expect(signInButton).toBeVisible();
        await expect(signInButton).toBeDisabled();
    });

});