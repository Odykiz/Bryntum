StartTest(async t => {
    t.setWindowSize(1200, 800);

    const
        {
            isTrial,
            skipTrialCheck,
            skipHeaderCheck,
            skipTestSizeCheck,
            popups
        }       = t.getConfig(),
        product = t.getConfigParam('product');

    // No upper test t.it level here to use separate subTestTimeout per each `t.it`
    // Use of `t.it` is slower than simple iteration but this outputs the failed example name from `t.it` description to TC log
    t.diag('Check each online example to have correct link back to all examples and trial button');

    await t.waitForSelector('.example');

    const baseHref = t.global.location.href.replace(/\/examples.*/, '/examples');

    // For Trial test all examples
    // For Full/PR test all except frameworks
    const examples = t.global.examples.filter(e => !e.offline)
        // Skip frameworks and examples from scheduler in pro (el.rootFolder)
        .filter(el => isTrial || (!el.folder.includes('frameworks') && !el.rootFolder))
        // Uncomment to filter by demo name (for test debug)
        // .filter(example => example.folder === 'timeranges')
    ;

    t.diag(`Testing ${examples.length} examples`);

    for (const example of examples) {

        t.describe(`Check example #${example.folder}`, async t => {

            const closePopups = async() => {
                const selector = popups?.[example.folder];
                if (selector) {
                    await t.waitForSelector(selector);
                    await t.click(selector);
                }
            };

            t.global.document.body.innerHTML = '';
            await t.waitForPageNavigate(`${baseHref}/${example.folder}?test`);
            await t.waitForSelector('#title h1');

            await closePopups();

            const
                { document } = t.global,
                { title }    = document,
                titleElement = document.getElementById('title'),
                correct      = `examples/#example-${example.folder}`;

            t.it('Check title', async t => {
                if (!titleElement?.href?.endsWith(correct)) {
                    t.fail(`Wrong #title href: "${titleElement?.href}", Correct ends with: "${correct}"`);
                }

                // Should have a meta description node
                const metaDescriptionNode = t.query('meta[name=description]')[0];
                t.isGreater(title.length, 10, 'Page has a sane title');
                t.ok(metaDescriptionNode, 'Description tag found');
                t.isGreater(metaDescriptionNode?.getAttribute('content').length, 10, 'Description tag has content');
                t.selectorCountIs('h1', 1, 'One H1 on the page');

                if (!skipHeaderCheck.find(skip => example.folder.includes(skip))) {
                    const
                        titleH1Element = titleElement.querySelector('h1'),
                        demoTitle      = title.split(' - ')[1] || title;

                    t.is(titleH1Element.innerText, demoTitle, 'Title H1 text should match demo title from "document.title" tag');
                }
            });

            t.it('Check trial button', async t => {
                if (!skipTrialCheck.find(skip => example.folder.includes(skip))) {
                    await t.waitForSelector(`a[href="https://bryntum.com/download/?product=${product}"]`);
                    t.pass(`Trial button displayed for ${example.folder}`);
                }
            });

            t.it('Check code editor, it should not crash when making a change', async t => {
                // Skip check for demos without code editor (scripttag, frameworks, etc.)
                if (!document.querySelector('[data-ref="codeButton"]')) {
                    t.pass('No code editor. Test skipped');
                    return;
                }

                await t.click('[data-ref="codeButton"]');
                await t.waitForSelector('.b-codeeditor pre code');
                const editorElement = t.query('.b-codeeditor pre code')[0];
                await t.waitFor(() => editorElement.innerText.length > 0);

                await t.click('.b-codeeditor .b-panel-header');
                if (!t.query('.b-codeeditor .readonly').length) {
                    editorElement.innerText = editorElement.innerText + ' ';
                    await t.doubleClick('[data-ref=autoApply]');
                }

                await closePopups();

                // Close editor
                await t.click('.b-codeeditor [data-ref="close"]');
                t.pass('Code editor is ok');
            });

            t.it('Check current config, should yield something', async t => {
                const
                    g       = t.global,
                    product = g.gantt || g.schedulerPro || g.calendar || g.taskBoard || g.grid || g.scheduler;

                // Some demos are for tooltips and combos etc, might get native Scheduler
                if (product?.isWidget) {
                    const configString = product.getTestCase();

                    t.isGreater(configString.length, 300, 'Has some content');

                    if (!skipTestSizeCheck?.includes(example.folder)) {
                        t.isLess(configString.length, 1000000, 'Content is not huge');
                    }

                    t.ok(configString.match(/new (Gantt|Calendar|SchedulerPro|Scheduler|TaskBoard|Grid)/), 'Has code to create a new instance');
                }
            });

            t.it('Check demo hints targets', async t => {
                const { shared } = t.global;

                if (!shared || !shared.loadHints) {
                    // ExtJS, esmodule, frameworks demos doesn't have shared and hints
                    t.pass('Skip test');
                    return;
                }

                // Hists are not disabled by default for tests, so we load them now
                await shared.loadHints();
                shared.initHints();

                await t.waitFor(()  => shared.hints);

                const hints = Object.keys(shared.hints);

                await t.waitFor(() => shared.hintsWarning || shared.toolTips?.length === hints.length);
                await t.waitForAnimations();

                if (shared.hintsWarning) {
                    t.fail(shared.hintsWarning);
                }
                else {
                    t.pass('All hints are displayed');
                }
            });

        });

    }

});
