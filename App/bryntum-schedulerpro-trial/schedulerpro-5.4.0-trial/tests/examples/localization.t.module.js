
StartTest(t => {
    const schedulerPro = bryntum.query('schedulerpro');

    t.it('Default locale (De)', async t => {

        t.is(schedulerPro.timeAxis.weekStartDay, 1, 'weekStartDay localized');

        await t.waitForSelector('[data-column="company"] .b-grid-header-text:textEquals(Firma)');

        await t.doubleClick('.b-sch-event');

        await t.waitForSelector('.b-schedulerpro-taskeditor');

        t.selectorExists('button:textEquals(Stornieren)', 'Cancel button is written in German');
        t.selectorExists('.b-combo label:textEquals(Ressourcen)', 'Resource selector label is written in German');

        await t.click('[data-ref=infoButton]');

        await t.click('[data-ref=localeCombo] input');

        // Switch to English locale
        await t.click('.b-list :contains(English (US))');

        await t.waitForSelector('[data-column="company"] .b-grid-header-text:textEquals(Company)');

        await t.doubleClick('.b-sch-event');

        await t.waitForSelector('.b-schedulerpro-taskeditor');

        t.is(schedulerPro.timeAxis.weekStartDay, 0, 'weekStartDay localized');
        t.selectorExists('button:textEquals(Cancel)', 'Cancel button is written in English');
        t.selectorExists('.b-combo label:textEquals(Resources)', 'Resource selector label is written in English');
    });

    t.it('Check all locales', async t => {
        await t.click('[data-ref=infoButton]');

        for (const locale of Object.values(LocaleHelper.locales).map(l => l.localeDesc)) {
            t.diag(`Checking locale ${locale}`);

            const value = document.querySelector('[data-ref=localeCombo] input').value;

            // Change to the locale if necessary
            if (value !== locale) {
                await t.click('[data-ref=localeCombo] input');

                await t.click(`.b-list-item:contains(${locale})`);

                // Change triggers hide of the info popup
                await t.waitForSelectorNotFound('[data-ref=localeCombo] input');

                // Show the info popup again
                await t.click('[data-ref=infoButton]');

                // This must exist
                await t.waitForSelector('.info-popup .b-checkbox');
            }

            await t.moveMouseTo('.info-popup .b-checkbox');

            await t.waitForSelector('.b-tooltip-shared');

            t.contentNotLike('.b-tooltip-shared', /L{/, 'Tooltip is localized');
        }
    });
});
