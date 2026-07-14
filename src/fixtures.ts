import { AuthPage } from '../page-objects/AuthPage';
import { test as base } from '@playwright/test';

type PageObjects = {
    authPage: AuthPage
};

export const test = base.extend<PageObjects>({
    authPage: async ({ page }, use) => {
        const authPage = new AuthPage(page);
        await use(authPage);
    }   
});

export { expect } from '@playwright/test';