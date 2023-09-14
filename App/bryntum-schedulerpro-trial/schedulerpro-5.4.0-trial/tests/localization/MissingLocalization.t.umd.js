
StartTest(t => {

    // Ignore translations completely (merged with test config from tests/index.js)
    const
        notUsedList = t.getConfigParam('notUsedList') || [],
        commonList  = [
            /DateHelper.unitAbbreviations\.\d\.\d/,
            /DateHelper.unitNames\.\d/,
            /DateHelper.nonWorkingDays\.\d/,
            /DateHelper.weekends\.\d/,
            /.*\.width$/,
            /.*\.height$/,
            /.*\.labelWidth$/,
            /.*\.editorWidth$/,
            'PresetManager.secondAndMinute',
            'PresetManager.minuteAndHour',
            'PresetManager.hourAndDay',
            'PresetManager.dayAndWeek'
        ].concat(t.getConfigParam('ignoreList') || []),
        ignoreList  = [...commonList, ...notUsedList];

    // Locales are loaded in "tests/index.js" file in Localization test group in "alsoPreloads"
    const
        { locales }    = LocaleHelper,
        originalLocale = locales.En;

    // Current locale for test
    let locale,
        missing,
        redundant;

    function isIgnored(list, str) {
        return list.some(item => item instanceof RegExp ? item.test(str) : item === str);
    }

    function assertMissing(t, original, asserted, path = '') {
        Object.keys(original).forEach(key => {
            const currentPath = path ? `${path}.${key}` : key;
            // if path should not be ignored
            if (!isIgnored(ignoreList, currentPath)) {
                // localization is found
                if (key in asserted && typeof asserted[key] === typeof original[key]) {
                    // If value type is an object go inside
                    if (typeof original[key] === 'object') {
                        assertMissing(t, original[key], asserted[key], currentPath);
                    }
                }
                // localization not found
                else {
                    if (typeof original[key] === 'object') {
                        for (const child of Object.keys(original[key])) {
                            missing.push(`${currentPath}.${child}`);
                        }
                    }
                    else {
                        missing.push(currentPath);
                    }
                }
            }
        });
    }

    function assertRedundant(t, master, asserted, path = '') {
        Object.keys(asserted).forEach(localeKey => {
            const currentPath = path ? `${path}.${localeKey}` : localeKey;

            if (!isIgnored(commonList, currentPath)) {
                // if not found in master
                if (!(localeKey in master) ||
                    (typeof master[localeKey] !== typeof asserted[localeKey]) ||
                    // While De locale is fully custom one we check all not used keys here also
                    (localeKey === 'De' && isIgnored(notUsedList, currentPath))
                ) {
                    redundant.push(currentPath);
                }
                else if (typeof asserted[localeKey] === 'object') {
                    assertRedundant(t, master[localeKey], asserted[localeKey], currentPath);
                }
            }
        });
    }

    // skip En locale during iterations
    delete locales.En;

    Object.keys(locales).forEach(localeName => {
        t.it(`Check ${localeName} locale`, t => {
            locale = locales[localeName];

            t.ok(locale.localeDesc, `Locale description is specified for ${localeName}`);

            // Checking Missing Translations
            missing = [];
            assertMissing(t, originalLocale, locale);

            if (missing.length > 0) {
                t.fail(`${missing.length} missing key(s) found in ${localeName} locale! Add to locale file or if valid add to "ignoreList" for MissingLocalization test config in tests/index.js`);
                missing.forEach(str => t.fail(`'${str}',`));
            }

            //Checking Redundant Translations
            redundant = [];

            assertRedundant(t, originalLocale, locale);
            if (redundant.length > 0) {
                t.fail(`${redundant.length} redundant key(s) found in ${localeName} locale! Remove from locale file or if valid add to "ignoreList" for MissingLocalization test config in tests/index.js`);
                redundant.forEach(str => t.fail(`'${str}',`));
            }
        });
    });
});
