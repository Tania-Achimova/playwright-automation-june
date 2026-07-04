import { expect, test } from "@playwright/test";


test.describe("NAVIGATION AND URL", () => {
    test("Home page loads with a non-empty title", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveTitle(/\w+/);
    });

    test("Auth page URL contains 'auth'", async ({ page }) => {
        await page.goto("/auth");
        await expect(page).toHaveURL(/auth/);
    });

    test("Home page does not contain auth", async ({ page }) => {
        await page.goto("/", { waitUntil: "domcontentloaded" });
        await expect(page).not.toHaveURL(/auth/);
    });

});

test.describe("ELEMENT VISIBILITY ON THE AUTH PAGE", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/auth");
    });

    test('Username placeholder is visible', async ({ page }) => {
        await expect(page.getByPlaceholder("Enter Username")).toBeVisible();
        await page.locator('input[placeholder="Enter Username"]').isVisible();
        await expect(page.locator('input[placeholder="Enter Username"]')).toBeVisible();
    });

    test('Password placeholder is visible', async ({ page }) => {
        await expect(page.getByPlaceholder("Enter Password")).toBeVisible();
        await page.locator('#password').isVisible();
        await expect(page.locator('[id="password"]')).toBeVisible();
    });

    test('Signin button is visible but disabled until credentials are entered', async ({ page }) => {
        const signinButton = page.getByRole("button", { name: "SIGNIN" });
        await expect(signinButton).toBeVisible();
        await expect(signinButton).toBeDisabled();
    });

});

test.describe('STRUCTURED TESTS WITH TEST.STEP', () => {

    test('Auth page renders all key fields', async ({ page }) => {
        await test.step('Navigate to the auth page', async () => {
            await page.goto("/auth");
            await expect(page).toHaveURL(/auth/);
        });

        await test.step('Verify the username and password fields are present', async () => {
            await expect(page.getByPlaceholder("Enter Username")).toBeVisible();
            await expect(page.getByPlaceholder("Enter Password")).toBeVisible();
        });
         
        await test.step('Verify the SIGNIN button is visible (disabled until credentials are entered)', async () => {
            await expect (page.getByRole("button", { name: "SIGNIN" })).toBeDisabled();
            await expect(page.getByRole("button", { name: "SIGNIN" })).toBeVisible();
        });
    });

    test("qa-practice page loads and has a visible heading", async ({ page }) => {
        await test.step('Navigate to the qa-practice page', async () => {
            await page.goto("/qa-practice");
            await expect(page).toHaveURL(/qa-practice/);
        });

        await test.step('Verify the heading is visible', async () => {
            await expect(page.getByRole('heading').first()).toBeVisible();
        });
    });
});

test.describe("SOFT ASSERTIONS", () => {

    test('Auth page has all 4 expected fields - collect all failures and report at the end', async ({ page }) => {
        await page.goto("/auth");
        
        await expect.soft(page.getByPlaceholder("Enter Usernames")).toBeVisible();
        await expect.soft(page.getByPlaceholder("Enter Passwords")).toBeVisible();
        await expect(page.getByRole("button", { name: "SIGNIN" })).toBeVisible();
        await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
    });
});

test.describe("SCREENSHOTS AS DEBUGGING AIDS", () => {

    test('Capture a screenshot of the qa-practice page and assert URL', async ({ page }) => {
        await page.goto("/qa-practice");

        await page.waitForLoadState('networkidle');

        await page.screenshot({
            path: 'screenshots/lecture-01.png',
            fullPage: true
        })

        await expect(page).toHaveURL(/qa-practice/);
        
    });
});