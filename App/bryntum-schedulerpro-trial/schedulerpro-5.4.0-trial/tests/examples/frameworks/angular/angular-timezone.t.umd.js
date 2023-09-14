StartTest(async t => {

    const
        buttonNext = t.queryWidget('#button-next'),
        buttonPrevious = t.queryWidget('#button-previous'),
        buttonToday = t.queryWidget('#button-today');

    t.it('Should not crash when clicking buttons fast', async t => {
        for (let i = 0; i < 20; i++) {
            t.click(buttonNext.element);
            t.click(buttonToday.element);
            t.click(buttonPrevious.element);
        }
    });

    t.it('Should not crash when clicking buttons few times', async t => {

        const click = async button => {
            await t.click(button.element);
            // Check that button is enabled after data is loaded
            await t.waitFor(() => !button.disabled);
        };

        for (let i = 0; i < 10; i++) {
            await click(buttonNext);
        }

        await click(buttonToday);

        for (let i = 0; i < 10; i++) {
            await click(buttonPrevious);
        }
    });

});
