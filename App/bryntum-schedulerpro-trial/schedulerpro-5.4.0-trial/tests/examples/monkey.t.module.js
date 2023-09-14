StartTest(async t => {
    // Test config
    const
        {
            webComponent,
            waitSelector,
            targetSelector,
            skipTargets,
            isPR,
            skipCodeReload,
            skipXSSInject
        } = t.getConfig(),
        { global } = t;

    if (isPR) {
        t.pass('Skip monkey test for PR');
        return;
    }

    const
        topLocation    = window.top.location,
        testLocation   = global.location,
        selectorPrefix = webComponent && /webcomponent/.test(testLocation.href) ? `${webComponent} ->` : '',
        runMonkeyTest  = async t => {
            const params = new URLSearchParams(topLocation.search);

            // Play external steps if provided in query string
            if (params.has('monkeyActions')) {
                window.monkeyActions = JSON.parse(params.get('monkeyActions'));
                await t.chain(window.monkeyActions);
            }
            else {
                return new Promise(resolve => {
                    t.monkeyTest({
                        target           : selectorPrefix + targetSelector,
                        skipTargets      : ['#fullscreen-button', '.b-skip-test', '.b-codeeditor', '.b-no-monkeys', '.b-print-button'].concat(skipTargets || []),
                        nbrInteractions  : isPR ? 2 : 10,
                        alwaysLogActions : true,
                        callback(actionLog) {
                            window.monkeyActions = actionLog;
                            if (Boolean(t.nbrExceptions || t.failed)) {
                                t.fail('Wild rabid monkeys found error');
                                t.fail(`Monkey actions: ${JSON.stringify(window.monkeyActions)}`);
                            }
                            resolve();
                        }
                    });
                });
            }
        };

    // Ability to set monkey actions for the test
    window.top.setMonkeyActions = window.setMonkeyActions = actions => {
        const params = new URLSearchParams(topLocation.search);
        params.set('monkeyActions', JSON.stringify(actions));
        topLocation.search = '?' + params.toString();
    };

    const waitForDemoReady = async t => {
        await t.waitFor(() => global.bryntum);
        await t.waitForAnimations();
        await t.waitForSelector(selectorPrefix + waitSelector);
    };

    // Use unique cookie session ID per test
    t.setRandomPHPSession();

    // Re-run of the example code to ensure demo handles code editing
    if (t.getMode() === 'module' && !skipCodeReload && global.shared && !isPR) {
        t.it('Reload demo code', async t => {
            await waitForDemoReady(t);
            await t.reloadDemoCode();
        });
    }

    t.it('Crazy monkeys', async t => {
        t.diag('Test PageURL: ' + t.scopeProvider.sourceURL);

        // monkeys should not wait for any scrolling
        t.waitForScrolling = false;

        await waitForDemoReady(t);

        t.pass('Example rendered without exception');

        if (!skipXSSInject) {
            t.injectXSS();
        }

        if (document.querySelector('.x-messagebox')) {
            await t.click('.x-messagebox .x-button', () => runMonkeyTest(t));
        }
        else {
            await runMonkeyTest(t);
        }

        // If the example page was RTL, check that all widgets know that.
        if (t.global.location.search.split(/[?&]/).includes('rtl')) {
            bryntum.queryAll('*').forEach(w => {
                if (w.rendered && !w.up(w => !w.rendered) && !w.rtl)  {
                    t.fail(`Widget ${w.id} did not inherit the RTL environment setting`);
                }
            });
        }
    });

});
