StartTest(t => {

    t.it('Open all links in guides and assert correct content + no crashes', async t => {

        const { navigationTree } = DocsBrowserInstance;

        DocsBrowserInstance.animateScroll = false;
        // Disable processing of content rendering like fiddle panel and highlighting
        DocsBrowserInstance.noProcess = true;

        DocsBrowserInstance.onSettingsChange({
            settings : {
                showPublic    : true,
                showInternal  : true,
                showPrivate   : true,
                showInherited : true
            }
        });

        await navigationTree.expandAll();

        await t.waitForSelectorNotFound('.loading');

        navigationTree.store.traverse(classRecord => {
            if (classRecord.isLeaf && classRecord.isGuide) {
                t.it(`Checking ${classRecord.id}`, async t => {
                    t.global.location.hash = classRecord.fullName;
                    t.suppressPassedWaitForAssertion = true;
                    await t.waitForSelector(`#content[data-id="${classRecord.id}"]`);
                    await t.waitForSelectorNotFound('.b-mask:contains(Loading),.fiddlePanelResult:empty,[data-error]');
                    await t.assertDocsLinks(classRecord);

                    // Page should not have anchors with multiple dashes
                    let links  = document.querySelectorAll('a');
                    links.forEach(el => {
                        const href = el.getAttribute('href');
                        if (href?.includes('--')) {
                            t.fail(`Wrong link: ${href}`);
                        }
                    });

                    // Guide page should not have duplicate id's
                    links  = document.querySelectorAll('[id]');
                    const ids = [], duplicates = [];
                    links.forEach(el => {
                        const id = el.id;
                        // "arrowEnd" is used for svg and is ignored
                        if (id !== 'arrowEnd' && ids.includes(id) && !duplicates.includes(id)) {
                            duplicates.push(id);
                        }
                        ids.push(id);
                    });
                    duplicates.forEach(dup => t.fail(`Duplicate id: ${dup}`));
                });
            }
        });
    });

    t.it('Verify upgrade guide link', async t => {
        await t.click('.b-upgrade-guide-button');
        await t.waitForSelector('h2:contains(API Version diff)');
        t.pass('Navigation is ok');
    });

});
