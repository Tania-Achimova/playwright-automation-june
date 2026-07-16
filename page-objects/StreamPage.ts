import { BasePage } from './BasePage';
import { Page, Locator, expect } from '@playwright/test';


export class StreamPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get postTextarea(): Locator { return this.page.locator('textarea[data-placeholder="Write something here..."]')}
    get suggestedStream(): Locator { return this.page.getByText('Suggestions')}
    get followButton(): Locator { return this.page.getByRole('button', { name: /^follow$/i })}

    public async navigate():Promise<void> {
        await this.page.goto('/app/social/streams');
        await this.page.getByRole('heading', { name: 'Create Post' }).waitFor({ timeout: 15_000 });
    }

    public async verifyPage(): Promise<void> {
        await expect(this.page).toHaveURL(/app\/social\/streams/);
        await expect(this.page).toHaveTitle(/Streams/i);
    
    }

}