import { test, expect } from '../src/fixtures';


test.describe('Login page tests with fixtures', () => {

    test('AuthPage  fixture delivers page already at /auth', async ({ authPage }) => {
        await authPage.navigate();
        await authPage.login('testuser', 'Test@12345678');
        await authPage.expectSignInButtonEnabled();
    });

});