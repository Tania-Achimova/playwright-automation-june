import { test, expect } from '@playwright/test';

test.describe('HOME PAGE TESTS', () => {

    test('Home page has a title and is not the auth page', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL('/');

        await expect(page).toHaveTitle(/\w+/);
        await expect(page).not.toHaveURL(/auth/);

    });

    test('Auth page — navigate, locate fields, verify actions', async ({ page }) => {

        await page.goto('/auth');


        await expect(page).toHaveURL('/auth');
        await expect(page.getByPlaceholder('Enter Username')).toBeVisible();
        await expect(page.getByPlaceholder('Enter Password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'SIGNIN' })).toBeVisible();




        await expect(page.getByPlaceholder('Enter Username')).toBeVisible();
        await expect(page.getByPlaceholder('Enter Password')).toBeVisible();



        const signInButton = page.getByRole('button', { name: 'SIGNIN' });

        await expect(signInButton).toBeVisible();
        await expect(signInButton).toBeDisabled();


    });

    test('Auth page - collect all field failures with soft asertions', async ({ page }) => {
        await page.goto('/auth');

        await expect.soft(page.getByPlaceholder('Enter Username')).toBeVisible();
        await expect.soft(page.getByPlaceholder('Enter Password')).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'SIGNIN' })).toBeVisible();

        await expect(page).toHaveURL('/auth');

    });

    test('goBack() returns from the auth page to the home page', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL('/');

        await page.goto('/auth');
        await expect(page).toHaveURL('/auth');

        await page.goBack();
        await expect(page).not.toHaveURL('/auth');
        await expect(page).toHaveURL('/');
    });

});

test.describe('qa-practice page', () => {

    test('screenshot captures fully-loaded page', async ({ page }) => {
        await page.goto('http://codeandtest.com/qa-practice');
        await expect(page).toHaveURL('/qa-practice');

        await page.waitForLoadState('networkidle');

        await page.screenshot({
            path: 'screenshots/homework-01-qa-practice.png',
            fullPage: true
        });

        await expect(page).toHaveURL(/qa-practice/);
    })

});

