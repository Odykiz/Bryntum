
StartTest(t => {

    // NOTE: This test is required to be run against "module" bundle only!

    const
        notUsedList         = t.getConfigParam('notUsedList') || [],
        notUsedSanityList   = [],
        {
            classRename,
            classes
        }                   = window.bryntum,
        localeUsageRegExp   = /L{([\w\d. %(){}-]+)}/gm,
        localeParseRegExp   = /((.*?)\.)?(.+)/,
        locale              = LocaleHelper.locales.En,
        localeEntries       = Object.entries(locale).filter(([className]) => !['localeName', 'localeDesc', 'localeCode', 'localePath'].includes(className)),
        // Specify optional translations which are not required
        optionalKeys        = {
            AnyClass : [
                'height',
                'width',
                'labelWidth',
                'editorWidth',
                'foo'
            ],
            DateHelper : [
                'formats',
                'weekStartDay'
            ],
            PresetManager : [
                'secondAndMinute',
                'minuteAndHour',
                'hourAndDay',
                'dayAndWeek',
                'weekAndDay',
                'day',
                'week',
                'dayAndMonth',
                'weekAndMonth',
                'weekAndDayLetter',
                'weekDateAndMonth',
                'monthAndYear',
                'year',
                'manyYears'
            ],
            Localizable : [
                'group' // Used in snippet
            ]
        },
        isIgnored           = (className, localeKey) => {
            const result = notUsedList?.includes(className) || notUsedList?.includes(`${className}.${localeKey}`);
            if (result) {
                notUsedSanityList.push(className);
                notUsedSanityList.push((`${className}.${localeKey}`));
            }
            return result;
        },
        isOptional          = (className, localeKey) => optionalKeys.AnyClass.includes(localeKey) || optionalKeys[className]?.includes(localeKey) || isIgnored(className, localeKey),
        moduleLocale        = {},
        moduleLocaleStrict  = {},
        moduleLocaleLazy    = {},
        buildModuleLocale   = () => {
            const handledClasses = new Map();
            // Start collecting from the classes listed in the bundle
            const classesToProcess = new Map(Object.entries(classes));

            // Find and process L{ClassName.LocaleKey} values from module classes into locale hierarchy
            classesToProcess.forEach((cls, className) => {
                if (handledClasses.has(cls)) return;
                const
                    circularReplacer = (key, value) => (value === window) || (value === document) ? '' : value,
                    // Collect all localization strings from class
                    classText        = cls.toString() +
                        JSON.stringify(cls.localization) +
                        JSON.stringify(cls.defaults) +
                        JSON.stringify(cls.configurable, circularReplacer) +
                        cls.constructor.toString();
                let m;
                while ((m = localeUsageRegExp.exec(classText))) {
                    const
                        classMatch  = localeParseRegExp.exec(m[1]),
                        localeKey   = classMatch[3],
                        localeClass = classMatch[2],
                        setLocale   = (bundle, cls, key) => {
                            cls = classRename?.[cls] || cls;
                            bundle[cls] = bundle[cls] || {};
                            bundle[cls][key] = key;
                        };

                    // By original className
                    setLocale(moduleLocale, className, localeKey);
                    // By locale Class if exist
                    localeClass && setLocale(moduleLocale, localeClass, localeKey);

                    // For checking localization
                    setLocale(moduleLocaleStrict, localeClass || className, localeKey);

                    // Localization is used from class with no localeClass
                    !localeClass && setLocale(moduleLocaleLazy, className, localeKey);
                }

                // collect parent classes info (they could be not publicly listed in the bundle)
                if (cls.$$meta) {
                    let parentCls = cls.$meta;

                    // bubble the class hierarchy
                    while ((parentCls = parentCls.super)) {
                        const name = parentCls?.class.$$name || parentCls?.class.name;
                        if (!classesToProcess.has(name)) {
                            classesToProcess.set(name, parentCls.class);
                        }
                    }
                }

                handledClasses.set(cls, true);
            });
        },
        // Checks if locale is used by the provided class by searching for moduleLocale entry.
        // The function also searches for parent classes entries.
        isLocaleUsedByClass = (className, localeKey) => {

            let cls = classes[className];

            // get class meta if provided (for mixins we just have a function at the moment)
            cls = cls?.$meta || cls;

            while (className) {
                // if found locale usage in the class
                if (moduleLocale[className]?.[localeKey]) {
                    return true;
                }

                // otherwise iterate to parent class
                cls = cls?.super;
                className = cls?.class.$$name || cls?.class.name;
            }

            return false;
        },
        checked$names       = [],
        check$name          = (t, className, reason = '') => {
            if (checked$names.includes(className)) {
                return;
            }

            checked$names.push(className);

            let bryntumClass = classes[className];

            // bryntumClass may be a mixin which means the "class" must be yielded by calling it.
            // Must try/catch because calling a constructor throws.
            if (!hasOwnProperty.call(bryntumClass, '$name')) {
                try {
                    bryntumClass = bryntumClass();
                }
                catch (e) {}
            }

            if (!hasOwnProperty.call(bryntumClass, '$name')) {
                t.fail(`${className} class has no $name() static method. ${reason}`);
            }
            else {
                const
                    className         = bryntumClass.$name,
                    requiredClassName = classRename?.[className] || className;
                if (className !== requiredClassName) {
                    t.fail(
                        `${className} class has wrong $name() static method result.` +
                        `\nExpected ${requiredClassName} got ${className}.` +
                        '\nCheck exports in "bundle/entry.js" file and @typings for this class"'
                    );
                }
            }
        };

    const nestedLocales = {};

    // collect cases of nest locale usages when one locale text contains another one:
    // MyClass : {
    //     Foo  : "My name is L{name}"
    //     name : "Bob"
    // }
    for (const [clsName, clsLocale] of localeEntries) {
        const clsLocaleText = JSON.stringify(clsLocale);
        let m;

        while ((m = localeUsageRegExp.exec(clsLocaleText))) {
            nestedLocales[m[1]] = [] || nestedLocales[m[1]];
            nestedLocales[m[1]].push(clsName);
        }
    }

    // Build locale from classes in module bundle
    buildModuleLocale();
    //console.log(JSON.stringify(moduleLocale, null, 2));

    t.it('Check English locale contains valid keys', async t => {
        let count = 0;
        localeEntries.forEach(([className, clsLocales]) => {
            Object.keys(clsLocales).forEach(localeKey => {
                count++;
                if (localeKey.includes('.') || localeKey.includes('?')) {
                    t.fail(`'${localeKey}' in '${className}' has "." or "?" in locale key`);
                }
            });
        });
        t.pass(`Checked ${count} entries`);
    });

    t.it('Check localization is not used in throw new Error()', async t => {
        let count = 0;
        Object.entries(classes).forEach(([className, cls]) => {
            const classText = typeof cls === 'function' && cls.toString() || '';
            count++;
            if (/throw new Error\((me|this)\.L\(/.test(classText)) {
                t.fail(`"throw new Error(...)" should not contain Localization me.L() or this.L() in class "${className}"`);
            }
        });
        t.pass(`Checked ${count} entries`);
    });

    t.it('Compare English locale with module bundle', async t => {
        let count = 0;
        localeEntries.forEach(([className, clsValues]) => {
            Object.keys(clsValues).forEach(localeKey => {
                count++;
                if (!isOptional(className, localeKey)) {
                    // check if the locales is used in the source code
                    // or is nested somewhere in other locales
                    if (!isLocaleUsedByClass(className, localeKey) && !nestedLocales[`${className}.${localeKey}`]) {
                        t.fail(`En ${className}.'L{${localeKey}}' locale string is not used in module bundle or test can't find it. If string used in static field then convert field to static getter.`);
                    }
                }
            });
        });
        t.pass(`Checked ${count} entries`);
    });

    t.it('Check localize works for each entry in moduleLocales', async t => {
        let count = 0;
        Object.entries(moduleLocaleStrict).filter(([className]) => !['Object'].includes(className)).forEach(([className, clsValues]) => {
            Object.keys(clsValues).forEach((localeKey) => {
                count++;
                if (!isOptional(className, localeKey)) {
                    const bryntumClass = classes[className];

                    // Check lazy locale loading and $name static method
                    if (moduleLocaleLazy[className]?.[localeKey] && bryntumClass) {
                        check$name(t, className, `Checking "${localeKey}" key.`);
                    }

                    if (bryntumClass?.localize) {
                        // Class is Localizable
                        if (!bryntumClass.localize(localeKey)) {
                            t.fail(`${className}.localize('${localeKey}') failed`);
                        }
                    }
                    else {
                        // Just check key in locale
                        if (!locale[className]?.[localeKey]) {
                            t.fail(`'L{${localeKey}}' localization is not found for ${className}`);
                        }

                    }
                }
            });
        });
        t.pass(`Checked ${count} entries`);
    });

    t.it('Sanity checks for notUsedList test config', t => {
        const redunduntEntries = notUsedList.filter(line => !notUsedSanityList.includes(line));

        if (redunduntEntries.length > 0) {
            t.fail('"notUsedList" test config contains redundunt entries. Check "tests.index.js" file.');
            redunduntEntries.forEach(entry => t.fail(entry));
        }
        else {
            t.pass('Test config is ok');
        }
    });

});
