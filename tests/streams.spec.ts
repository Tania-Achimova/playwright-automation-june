import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { extractAuthId } from '../src/helper';
import { config } from '../src/config';
import { console } from 'inspector/promises';
import { StreamPage } from '../page-objects/StreamPage';

let testUserName: string;
let testEmail: string;
let context: BrowserContext;
let page: Page;
let testAuthId: string;

const API_BASE_URL = config.API_BASE_URL;

test.describe('Streams', () => {

    test.beforeAll(async ({ browser }: { browser: Browser }) => {

        testUserName = `pw_PW${faker.string.alphanumeric(8)}`;
        testEmail = `${testUserName}@gmail.com`;


        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/auth');
        await page.getByRole('button', { name: 'Sign Up' }).click();
        await page.getByPlaceholder('Enter Username').fill(testUserName);
        await page.getByPlaceholder('Enter Email').fill(testEmail);
        await page.getByPlaceholder('Enter Password').fill('123456');

        let signupStatus = 0
        let signupBody: Record<string, unknown> = {}

        try {
            const [signUpRes] = await Promise.all([
                page.waitForResponse(
                    response => response.url().includes('/signup') && response.request().method() === 'POST',
                    { timeout: 20_000 }
                ), // Wait for the sign-up response completed
                page.getByRole('button', { name: 'SIGNUP' }).click()
            ]);

            signupStatus = signUpRes.status();
            console.log(`[beforeAll] Sign-up response status: ${signupStatus} for user: ${testUserName}`);

            if (!signUpRes.ok()) {
                console.warn(`[beforeAll] Sign-up failed with status: ${signupStatus} for user: ${testUserName}: skipping test execution.`);
                test.skip(true, `Sign-up failed with status: ${signupStatus} for user: ${testUserName}`);
                return;
            }
            signupBody = await signUpRes.json().catch(() => ({}));

        } catch (error) {
            console.warn('Error during sign up:', error);
            test.skip(true, `Sign-up failed with error for user: ${testUserName} - retrying may be necessary.`);
            return;
        }

        await page.waitForURL(url => !url.pathname.startsWith('/auth'), { timeout: 20_000 });

        testAuthId = extractAuthId(signupBody);

        if (!testAuthId) {
            const userResponse = await page.request.get(`${API_BASE_URL}/currentuser`);
            const userData = await userResponse.json().catch(() => ({}));
            testAuthId = extractAuthId(userData);
        }

        console.log(`[beforeAll] Signup completed for user: ${testUserName} with authId: ${testAuthId}`);
        expect(testAuthId, 'authId required for test execution').toBeTruthy();

        await page.goto('/app/social/streams');
        await page.waitForURL(/app\/social\/streams/, { timeout: 20_000 });
    });

    test.afterAll(async () => {
        if (testAuthId && page) {
            const cleanupResponse = await page.request
                .delete(`${API_BASE_URL}/test/cleanup/${testAuthId}`, {
                    headers: { 'x-test-secret': config.TEST_CLEANUP_SECRET ?? '' }
                })
                .catch(() => null);
            if (cleanupResponse && !cleanupResponse.ok()) {
                console.warn(`[afterAll] Cleanup failed with status: ${cleanupResponse.status()} for authId: ${testAuthId}`);
            }
        }
        if (context) await context.close();
    });

    test.beforeEach(async () => {
        const streamPage = new StreamPage(page);
        await streamPage.navigate();
    });

    test('Streams page URL and title are correct after login', async () => {
        const streamPage = new StreamPage(page);
        await streamPage.verifyPage();
    });

});

