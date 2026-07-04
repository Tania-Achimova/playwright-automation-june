import { Page, expect } from '@playwright/test';

export class BasePage {
    protected readonly page: Page
    
    constructor(page: Page) { 
        this.page = page;
    }

    async goTo(path: string): Promise<void> {
        await this.page.goto(path);
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async expectUrl(pattern: string | RegExp): Promise<void> {
        await expect(this.page).toHaveURL(pattern);
    }

    async expectTitle(pattern: string | RegExp): Promise<void> {
        await expect(this.page).toHaveTitle(pattern);
    }

}