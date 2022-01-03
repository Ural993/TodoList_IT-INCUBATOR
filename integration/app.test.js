describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
       // await page.setDefaultNavigationTimeout(0)
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/?path=/story/todolist-additemform--add-item-form-story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
