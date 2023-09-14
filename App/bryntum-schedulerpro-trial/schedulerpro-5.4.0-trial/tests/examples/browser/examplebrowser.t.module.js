StartTest(t => {

    const {
        exampleName,
        exampleTitle,
        offlineExampleName,
        jumpSectionName,
        jumpExampleName,
        filterText,
        filterCount
    } = t.getConfig();

    let document = t.global.document;
    t.setWindowSize(1200, 800);

    // Should not have initial header animations
    t.isDeeply(document.querySelector('.demo-header').getAnimations().map(p => p.transitionProperty), [], 'No header animations found');

    t.beforeEach(async t => {
        document = t.global.document;
        await t.waitForSelector('.example');
    });

    t.it('Should have working framework tabs', async t => {
        t.selectorCountIs('.framework-tab', 4, 'Found 4 framework tabs');

        t.diag('JS');
        await t.click('.framework-tab[data-ref=js]');

        t.selectorNotExists('h2:contains(Angular)', 'No Angular section');
        t.selectorNotExists('h2:contains(React)', 'No React section');
        t.selectorNotExists('h2:contains(Vue)', 'No Vue section');

        t.selectorNotExists('[data-group="Angular examples"] .group-path:contains(examples/frameworks/angular)');
        t.selectorNotExists('[data-group="React examples"] .group-path:contains(examples/frameworks/react)');
        t.selectorNotExists('[data-group="Vue examples"] .group-path:contains(examples/frameworks/vue-3)');

        t.diag('React');
        await t.click('.framework-tab[data-ref=react]');

        t.selectorNotExists('h2:contains(Angular)', 'No Angular section');
        t.selectorExists('h2:contains(React)', 'React section');
        t.selectorNotExists('h2:contains(Vue)', 'No Vue section');

        t.selectorNotExists('[data-group="Angular examples"] .group-path:contains(examples/frameworks/angular)');
        t.selectorExists('[data-group="React examples"] .group-path:contains(examples/frameworks/react)');
        t.selectorNotExists('[data-group="Vue examples"] .group-path:contains(examples/frameworks/vue-3)');

        t.diag('Vue');
        await t.click('.framework-tab[data-ref=vue]');

        t.selectorNotExists('h2:contains(Angular)', 'No Angular section');
        t.selectorNotExists('h2:contains(React)', 'No React section');
        t.selectorExists('h2:contains(Vue)', 'Vue section');

        t.selectorNotExists('[data-group="Angular examples"] .group-path:contains(examples/frameworks/angular)');
        t.selectorNotExists('[data-group="React examples"] .group-path:contains(examples/frameworks/react)');
        t.selectorExists('[data-group="Vue examples"] .group-path:contains(examples/frameworks/vue-3)');

        t.diag('Angular');
        await t.click('.framework-tab[data-ref=angular]');

        t.selectorExists('h2:contains(Angular)', 'Angular section');
        t.selectorNotExists('h2:contains(React)', 'No React section');
        t.selectorNotExists('h2:contains(Vue)', 'No Vue section');

        t.selectorExists('[data-group="Angular examples"] .group-path:contains(examples/frameworks/angular)');
        t.selectorNotExists('[data-group="React examples"] .group-path:contains(examples/frameworks/react)');
        t.selectorNotExists('[data-group="Vue examples"] .group-path:contains(examples/frameworks/vue-3)');
    });

    t.it('Should open same framework tab on reload', async t => {
        const href = t.global.location.href;

        await t.click('.framework-tab[data-ref=react]');

        t.chain(
            {
                waitForPageLoad : null,
                trigger         : () => t.global.location.href = 'about:blank'
            },
            {
                waitForPageLoad : null,
                trigger         : () => t.global.location.href = href
            },
            { waitForSelector : `.framework-tab.b-pressed[data-ref=react]` },

            async() => {
                t.selectorExists('h2:contains(React)', 'React section');
            },

            { click : '.framework-tab[data-ref=js]' }
        );
    });

    t.it('Should read framework from QS', async t => {
        const href = t.global.location.href;

        t.chain(
            {
                waitForPageLoad : null,
                trigger         : () => t.global.location.href = 'about:blank'
            },
            {
                waitForPageLoad : null,
                trigger         : () => t.global.location.href = `${href}&framework=react`
            },
            { waitForSelector : `.framework-tab.b-pressed[data-ref=react]` },

            async() => {
                t.selectorExists('h2:contains(React)', 'React section');
            },

            { click : '.framework-tab[data-ref=js]' },

            {
                waitForPageLoad : null,
                trigger         : () => t.global.location.href = href
            }
        );
    });

    t.it('Jump to section', async t => {
        t.chain(
            { waitForScroll : null },
            { click : '[data-ref=jumpTo]', desc : 'Click Jump to' },
            { click : `.b-list-item:textEquals(${jumpSectionName})`, desc : `Select ${jumpSectionName} section` },
            { waitForElementTop : `#b-example-${jumpExampleName}`, desc : `Wait for Example ${jumpExampleName} to be on top` }
        );
    });

    t.it('Should initially scroll section into view if provided in hash', async t => {
        const href = t.global.location.href;
        t.chain(
            {
                waitForPageLoad : null,
                trigger         : () => t.global.location.href = 'about:blank',
                desc            : `Clean the page`
            },
            {
                waitForPageLoad : null,
                trigger         : () => {
                    t.global.location.href = `${href}#example-${exampleName}`;
                },
                desc : `Reload the page with hash`
            },
            { waitForElementTop : `#b-example-${exampleName}` }
        );
    });

    t.it('Rendering', async t => {
        t.chain(
            next => {
                const example = document.querySelector(`#b-example-${exampleName}`);
                example.scrollIntoView();
                t.isGreater(document.querySelectorAll('.example').length, 3, 'A bunch of examples displayed');
                t.isGreater(document.querySelectorAll('h2').length, 1, 'A bunch of headers displayed');
                t.ok(example.href.match(`${exampleName}/$`), 'First link looks correct');
                const browserEl = document.getElementById('browser');
                t.ok(browserEl.scrollHeight > browserEl.clientHeight, 'Browser element is scrollable');
                next();
            },
            { moveCursorTo : `#b-example-${exampleName} .tooltip` },
            { waitForSelector : `.b-tooltip:contains(${exampleTitle})`, desc : 'Example tip shown' }
        );
    });

    t.it('Changing theme', async t => {
        t.chain(
            // Items are lazy loaded
            { waitFor : () => t.global.shared.infoButton.menuItems, desc : 'Info button items are loaded' },
            // Theme defaults to material, by using ?theme=material on url
            { waitFor : () => document.querySelector(`#b-example-${exampleName} img`).src.toLowerCase().match('thumb.material.png$') },
            // First item should not be a default theme since popup won't be hidden
            ['Classic-Dark', 'Classic', 'Classic-Light', 'Material', 'Stockholm'].map(theme => [
                { click : '[data-ref=infoButton]', desc : 'Click on the cog' },
                { click : '[data-ref=themeCombo]', desc : 'Click on the theme combo' },
                { click : `.b-list-item:contains(${theme})`, desc : `Switching to ${theme} theme` },
                { type : '[ESC]' },
                { waitForSelector : `#b-example-${exampleName} img[src="${exampleName}/meta/thumb.${theme.toLowerCase()}.png"]`, desc : 'Correct thumb image for basic example' }
            ])
        );
    });

    t.it('Check thumbnail sizes', async t => {
        const steps = [];

        document.querySelectorAll('.image [loading="lazy"]').forEach(element => {
            element.removeAttribute('loading');
        });

        document.querySelectorAll('.example').forEach(example => {
            steps.push({
                waitFor : () => {
                    const
                        img   = document.querySelector(`#${example.id} img`),
                        rect  = img.getBoundingClientRect();

                    return rect.width > 445 && rect.height > rect.width * 0.75;
                },
                desc : `Correct image size for: "${example.id}"`
            });
        });
        t.chain(steps);
    });

    t.it('Check tooltips for examples not available offline', async t => {
        if (offlineExampleName) {
            t.chain(
                { scrollIntoView : `#b-example-${offlineExampleName}` },
                { waitForSelector : `#b-example-${offlineExampleName} i.b-fa-cog`, desc : 'Correct info icon used' },
                { moveCursorTo : `#b-example-${offlineExampleName} .tooltip` },
                { waitForSelector : '.b-tooltip-content:contains(This demo needs to be built before it can be viewed)', desc : 'Tooltip shown' },
                { moveCursorTo : 'label.title', desc : 'Hiding tooltip to avoid aborting requests' },
                { waitForSelectorNotFound : '.b-tooltip', desc : 'Tooltip hidden' }
            );
        }
    });

    t.it('Should handle non existing theme ids gracefully', async t => {
        let locationSearch;
        // old themes (plus extra one imitating just a bad value) mapping
        const themeNames = {
            dark    : 'Classic-Dark',
            light   : 'Classic-Light',
            default : 'Classic',
            foo     : 'Stockholm'
        };

        t.chain(
            { diag : 'Dropping theme forcing from URL' },
            {
                waitForPageLoad : null,
                trigger         : () => {
                    // location.search looks like "?theme=material" for this test
                    // so we need to reset it to test localStorage provided theme
                    locationSearch = t.global.location.search;
                    t.global.location.search = '';
                }
            },

            ['dark', 'light', 'default', 'foo'].map(theme => [
                { diag : `Trying ${theme} theme` },

                {
                    waitForPageLoad : null,
                    trigger         : () => {
                        // saving theme & reloading page
                        localStorage.setItem('b-example-theme', theme);
                        t.global.location.reload();
                    }
                },

                {
                    click : '[data-ref=infoButton]:not(.b-disabled)',
                    desc  : 'Clicked info button'
                },
                {
                    click : '[data-ref=themeCombo]',
                    desc  : 'Clicked theme button to expand dropdown list'
                },
                {
                    waitForSelector : `.b-list-item.b-selected:contains(${themeNames[theme]})`,
                    desc            : 'Correct theme is selected'
                },
                next => {
                    t.is(t.global.document.querySelector('[data-ref=themeCombo] input').value, themeNames[theme], 'Correct theme field value');
                    next();
                }
            ]),
            { diag : 'Restoring initial iframe URL back' },
            { waitForPageLoad : null, trigger : () => t.global.location.search = locationSearch }
        );
    });

    // https://github.com/bryntum/support/issues/6433
    t.it('Should clear filter field with ESC key', async t => {
        const allCount = t.query('.example').length;

        t.global.bryntum.query('filterfield').value = '';
        t.chain(
            { click : '[data-ref=filterField] input' },
            { type : 'foo'  },
            { waitForSelectorNotFound : '.example' },
            { type : '[ESCAPE]', desc : 'Clear filter' },
            { waitFor : () => t.query('.example').length === allCount, desc : 'Wait for all examples visible' }
        );
    });

    t.it('Filtering demos', async t => {
        const
            count = t.query('.example').length,
            order = t.query('.example').map(el => el.id);

        t.chain(
            { type : `${filterText}[TAB]`, target : '[data-ref=filterField] input', desc : `Filter by "${filterText}"` },
            { waitFor : () => t.query('.example').length >= filterCount, desc : `Wait for ${filterCount} filtered examples` },
            { type : '[BACKSPACE]', options : { shiftKey : true }, target : '[data-ref=filterField] input', desc : 'Clear filter' },
            { waitFor : () => t.query('.example').length === count, desc : 'Wait for all examples visible' },
            () => {
                t.isDeeply(t.query('.example').map(el => el.id), order, 'Correct order of examples');
            }
        );
    });

    t.it('Example browser links should have trailing backslash', async t => {

        const failed = [];

        // Examples links should have trailing backslash
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');

            if (href) {
                const
                    baseHref = href.split('#')[0],
                    paths    = ['examples/', 'docs'];

                if (paths.some(path => baseHref.includes(path)) && !baseHref.endsWith('/')) {
                    failed.push(href);
                }
            }
        });

        if (failed.length > 0) {
            t.fail(`Found ${failed.length} link(s) without trailing slash`);
            failed.forEach(f => t.fail(f));
        }
        else {
            t.pass('No links without trailing slash');
        }
    });

    t.it('Jump combo should have sufficient width for all items', async t => {
        const
            { DomHelper }   = t.global.demoBrowser,
            jumpCombo       = t.queryWidget('[data-ref="jumpTo"]'),
            { offsetWidth } = jumpCombo.input;

        for (const text of jumpCombo.store.data.map(item => item.text)) {
            const width = DomHelper.measureText(text, jumpCombo.input);
            if (width > offsetWidth) {
                t.fail(`Item "${text}" width doesn't fit combo width. ${width}px > ${offsetWidth}px"`);
            }
        }
    });

    t.it('Should focus filter field when pressing CTRL-F', async t => {
        await t.type(document.body, 'f', null, null, { ctrlKey : true });

        t.is(document.activeElement, t.global.bryntum.query('filterfield').input);
    });

});
