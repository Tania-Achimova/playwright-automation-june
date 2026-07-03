import { test as it, expect } from "@playwright/test";

const URL = "/qa-practice/web-inputs";

it.describe("WEB INPUTS PAGE TESTS", () => {

    it.beforeEach(async ({ page }) => {
        await page.goto(URL);

        await expect(page).toHaveURL(URL);
    });

    it("Page loads with correct URL and has a visible heading", async ({ page }) => {

        await expect(page.getByRole("textbox", { name: /text input/i })).toBeVisible();
        await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
        await expect(page.getByRole('textbox', { name: /password/i })).toBeVisible();
        await expect(page.getByRole('spinbutton', { name: /number/i })).toBeVisible();
        await expect(page.getByTestId('web-date-input')).toBeVisible();
        await expect(page.getByRole('combobox', { name: /select dropdown/i })).toBeVisible();
        await expect(page.getByRole('radio', { name: /radio 1/i })).toBeVisible();
        await expect(page.getByRole('checkbox')).toBeVisible();
        await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /reset/i })).toBeVisible();
    });

});


it.describe("WEB INPUTS VALUES IS CORRECT", () => {

    it.beforeEach(async ({ page }) => {
        await page.goto(URL);

        await expect(page).toHaveURL(URL);
    });

    it('Fills inputs and asserts the value is correct', async ({ page }) => {

        const textInput = page.getByRole("textbox", { name: /text input/i });
        const text = "Hello World";
        await textInput.fill(text);
        await expect(textInput).toHaveValue(text);

        const emailInput = page.getByRole("textbox", { name: /email/i });
        const email = "test@example.com";
        await emailInput.fill(email);
        await expect(emailInput).toHaveValue(email);

        const passwordInput = page.getByRole("textbox", { name: /password/i });
        await passwordInput.fill('password1234');
        await expect(passwordInput).toHaveValue('password1234');
        await expect(passwordInput).toHaveAttribute('type', 'password');

        const numberInput = page.getByRole("spinbutton", { name: /number/i });
        await numberInput.fill('42');
        await expect(numberInput).toHaveValue('42');

        const dropdown = page.getByRole("combobox", { name: /select dropdown/i });
        const optionValue = "option2";
        await dropdown.selectOption(optionValue);
        await expect(dropdown).toHaveValue(optionValue);
        await expect(dropdown).toHaveValue(/option.?2/i);

        const radioButton = page.getByRole("radio", { name: /radio 1/i });
        await radioButton.check();
        await expect(radioButton).toBeChecked();

        const checkbox = page.getByRole("checkbox", { name: /i agree to the terms and conditions/i });
        await checkbox.check();
        await expect(checkbox).toBeChecked();

        // await checkbox.uncheck();
        // await expect(checkbox).not.toBeChecked();

        const submitButton = page.getByRole("button", { name: /submit/i });
        await submitButton.click();
        

        await expect(page.getByRole('heading', { name: /submitted data/i })).toBeVisible();

        const dialog = page.getByRole('dialog');

        await expect(
            dialog.locator('.data-item', { hasText: 'Text Input:' }).locator('.data-value')
        ).toHaveText('Hello World');

        await expect(
            dialog.locator('.data-item', { hasText: 'Email:' }).locator('.data-value')
        ).toHaveText('test@example.com');

        await expect(
            dialog.locator('.data-item', { hasText: 'Password:' }).locator('.data-value')
        ).toHaveText('••••••••'); // or assert masked length/pattern instead of literal value

        await expect(
            dialog.locator('.data-item', { hasText: 'Number:' }).locator('.data-value')
        ).toHaveText('42');

        await expect(
            dialog.locator('.data-item', { hasText: 'Select:' }).locator('.data-value')
        ).toHaveText('option2');

        await expect(
            dialog.locator('.data-item', { hasText: 'Radio:' }).locator('.data-value')
        ).toHaveText('radio1');

        await expect(
            dialog.locator('.data-item', { hasText: 'Checkbox:' }).locator('.data-value')
        ).toHaveText('Checked');

        const closeButton = dialog.getByRole('button', { name: /close/i });
        await closeButton.click();
        await expect(dialog).not.toBeVisible();



        const resetButton = page.getByRole("button", { name: /reset/i });
        await resetButton.click();
       
        await expect(textInput).toHaveValue('');
        await expect(emailInput).toHaveValue('');
        await expect(passwordInput).toHaveValue('');
        await expect(numberInput).toHaveValue('');
        await expect(dropdown).toHaveValue('');
        await expect(radioButton).not.toBeChecked();
        await expect(checkbox).not.toBeChecked();
   
    });

       it('Selects a date and asserts the value is correct', async ({ page }) => {
        const dateInput = page.getByTestId("web-date-input");
        await dateInput.click();
        
        const datePickerDropdown = page.getByTestId("web-date-picker-dropdown");
        await expect(datePickerDropdown).toBeVisible();

        const datePickerHeader = datePickerDropdown.locator('.date-picker-header');
        await expect(datePickerHeader).toBeVisible();
        await expect(datePickerHeader).toHaveText(/select date/i);
        
        const monthSelect = datePickerDropdown.locator('#month-select');
        await expect(monthSelect).toBeVisible();
        await monthSelect.selectOption('2'); 
        await expect(monthSelect).toHaveValue('2');

        const daySelect = datePickerDropdown.locator('#day-select');
        await expect(daySelect).toBeVisible();
        await daySelect.selectOption('14'); 
        await expect(daySelect).toHaveValue('14');

        const yearSelect = datePickerDropdown.locator('#year-select');
        await expect(yearSelect).toBeVisible();
        await yearSelect.selectOption('2024');
        await expect(yearSelect).toHaveValue('2024');

        const doneButton = datePickerDropdown.getByRole('button', { name: /done/i });
        await expect(doneButton).toBeVisible();
        await doneButton.click();


        await expect(dateInput).toHaveValue('02-14-2024');
    });

});