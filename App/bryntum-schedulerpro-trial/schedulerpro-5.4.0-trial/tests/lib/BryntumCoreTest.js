const
    ignoreExceptionRe                            = /ResizeObserver|Script error\./,
    paramValueRegExp                             = /^(\w+)=(.*)$/,
    postTapSequence                              = ['mouseover', 'mousemove', 'mousedown', 'mouseup', 'click'],
    postLongPressSequence                        = ['mouseover', 'mousemove', 'contextmenu'],
    postLongPressSequenceWithTouchStartPrevented = ['mousemove', 'contextmenu'],
    parseParams                                  = paramString => {
        const
            result = {},
            params = paramString ? paramString.split('&') : [];

        // loop through each 'filter={"field":"name","operator":"=","value":"Sweden","caseSensitive":true}' string
        // So we cannot use .split('='). Using forEach instead of for...of for IE
        params.forEach(nameValuePair => {
            const
                [match, name, value] = paramValueRegExp.exec(nameValuePair),
                decodedName          = decodeURIComponent(name),
                decodedValue         = decodeURIComponent(value);

            if (match) {
                let paramValue = result[decodedName];

                if (paramValue) {
                    if (!Array.isArray(paramValue)) {
                        paramValue = result[decodedName] = [paramValue];
                    }
                    paramValue.push(decodedValue);
                }
                else {
                    result[decodedName] = decodedValue;
                }
            }
        });

        return result;
    },
    exemptAnimationTargets                       = [
        '.b-toast-progress',
        '.b-filter-icon',
        '.b-fieldtrigger',
        '.b-field-inner',
        '.b-field-updated',
        '.b-row-reorder-proxy',
        '.cssanimation'
    ].join(','),
    ignoreTransitionProperties                   = {
        'background-color' : 1,
        background         : 1,
        color              : 1,
        opacity            : 1,
        'font-weight'      : 1
    },
    ignoreAnimations                             = {
        'instance-selected' : 1
    },
    nativeFocusableTags                          = {
        BUTTON   : 1,
        IFRAME   : 1,
        EMBED    : 1,
        INPUT    : 1,
        OBJECT   : 1,
        SELECT   : 1,
        TEXTAREA : 1,
        BODY     : 1
    },
    modifierKeys                                 = {
        altKey : {
            charCode    : 0,
            code        : 'Alt',
            key         : 'Alt',
            keyCode     : 18,
            readableKey : 'ALT',
            altKey      : true
        },
        metaKey : {
            charCode    : 0,
            code        : 'Meta',
            key         : 'Meta',
            keyCode     : 91,
            readableKey : 'CMD',
            metaKey     : true
        },
        ctrlKey : {
            charCode    : 0,
            code        : 'Control',
            key         : 'Control',
            keyCode     : 17,
            readableKey : 'CTRL',
            ctrlKey     : true
        },
        shiftKey : {
            charCode    : 0,
            code        : 'Shift',
            key         : 'Shift',
            keyCode     : 16,
            readableKey : 'SHIFT',
            shiftKey    : true
        }
    },
    simulatorOverrides                           = {
        // override to mimic focus after a touch tap
        possiblySimulateMouseEventsForTouchEnd(target, touch, options) {
            const
                me      = this,
                didMove = me.lastStartTouch.clientX !== touch.clientX ||
                    me.lastStartTouch.clientY !== touch.clientY;

            if (!didMove) {
                let sequence;
                const startWasPrevented = this.isEventPrevented(this.lastStartTouchEvent);
                // Don't fire mouse events if this is a move pointer move ("touchDrag") operation,
                // Chrome actually fires mouse events also when you move a little, probably since touch
                // by its nature is not exact typically.

                if (this.isLongPressing()) {
                    if (startWasPrevented) {
                        sequence = postLongPressSequenceWithTouchStartPrevented;
                    }
                    else {
                        sequence = postLongPressSequence;
                    }
                }
                else if (!startWasPrevented) {
                    sequence = this.lastStartTouchWasOnNewTarget ? postTapSequence : postTapSequence.filter(function(event) {
                        return event !== 'mouseover';
                    });
                }

                sequence && sequence.forEach(function(event) {
                    me.simulateEvent(target, event, options);

                    if (event === 'mousedown' && !startWasPrevented) {
                        me.mimicFocusOnMouseDown(target, me.lastStartTouchEvent);
                    }
                });
            }
        },

        findNextFocusable(el, offset) {
            const focusbleTreeWalker = this.getFocusbleTreeWalker();

            focusbleTreeWalker.currentNode = el;

            // Walk forwards or backwards through tabbable elements found by the TreeWalker
            for (const step = Math.sign(offset); offset; offset -= step) {
                el = offset > 0 ? focusbleTreeWalker.nextNode() : focusbleTreeWalker.previousNode();
            }

            return el;
        },

        getFocusbleTreeWalker() {
            const
                me           = this,
                { document } = me.global;

            // Create a TreeWalker which only visits tabbable Elements
            if (!me._focusbleTreeWalker) {
                me._focusbleTreeWalker = document.createTreeWalker(
                    document.body,
                    NodeFilter.SHOW_ELEMENT,
                    {
                        acceptNode(e) {
                            return me.isTabbable(e) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                        }
                    }
                );
            }

            return me._focusbleTreeWalker;
        },

        isTabbable(el) {
            const nodeName = el.nodeName;

            /*
             * An element is tabbable if it's visible or a focus trap element AND:
             *   - It is natively focusable, or
             *   - It is an anchor or link with href attribute, or
             *   - It has a tabIndex greater than -1, or
             *   - It is an editing host (contenteditable="true")
             *
             * Note that disabled items are still focusable.
             * They just do not react to normal mutation gestures.
             */
            return (el.classList.contains('b-focus-trap') && el.ownerDocument.defaultView.getComputedStyle(el).getPropertyValue('display') !== 'none') ||
                (this.test.isElementVisible(el) && (nativeFocusableTags[nodeName] ||
                    ((nodeName === 'A' || nodeName === 'LINK') && !!el.href) ||
                    parseInt(el.getAttribute('tabIndex')) > -1 ||
                    el.contentEditable === 'true'));
        }

    };

Class('BryntumCoreTest', {

    isa : Siesta.Test.Browser,

    has : {
        waitForScrolling               : true,
        applyTestConfigs               : true,
        waitForPollInterval            : 20,
        disableNoTimeoutsCheck         : false,
        disableWaitingForCSSAnimations : false
    },

    override : {
        setup(callback, errorCallback) {

            const
                me                  = this,
                isTeamCity          = location.search.includes('IS_TEAMCITY'),
                { project, global } = me,
                testConfig          = me.getConfig(),
                b                   = global.bryntum,
                ns                  = b && (b.core || b.grid || b.scheduler || b.schedulerpro || b.gantt || b.calendar || b.taskboard);

            project.ignoreException = project.ignoreException || ignoreExceptionRe;

            // running with bundle, but tests are written for import. need to publish all classes to global
            if (ns) {

                // If there's no UI, disable creation of debugging data by Base constructor
                if (!window.Ext) {
                    global.bryntum.DISABLE_DEBUG = true;
                }

                for (const className in ns) {
                    global[className] = ns[className];
                }
            }
            else {
                if (this.getMode() === 'umd') {
                    const umdBundleName = testConfig.preset.preload.find(preload => typeof preload === 'string' && preload.includes('.umd.'));
                    if (umdBundleName) {
                        this.fail(`Bryntum namespace was not found in "${umdBundleName}" bundle!`);
                    }
                }
            }

            // Add the DOM Standard :is() pseudo to Sizzle
            Siesta.Sizzle.selectors.pseudos.is = function(elem, zero, [ps, ps1, s, selector]) {
                return elem.matches(selector);
            };

            // Add the DOM Standard :regex() pseudo to Sizzle to match innerHTML using RegularExpression
            // '.class:regex(expression)'
            Siesta.Sizzle.selectors.pseudos.regex = function(elem, zero, [ps, ps1, s, expression]) {
                return new RegExp(expression, 'g').test(elem.innerHTML);
            };

            me.setupConsoleHook(global);

            if (testConfig.pageUrl) {
                me.diag(`PageUrl: ${testConfig.pageUrl}`);
            }

            // Allow tests to modify configuration of class instances
            global.__applyTestConfigs = 'applyTestConfigs' in testConfig ? testConfig.applyTestConfigs : me.applyTestConfigs;

            // Enable test-specific rules.
            global.document.body.classList.add('b-siesta-testing');

            // Enable video recording for reruns of tests
            if (isTeamCity && project.isRerunningFailedTests) {
                me.startVideoRecording(callback, project.ignoreException);
            }
            else {
                me.SUPER(callback, errorCallback);
            }

            me.setupInputOverflowHook(global);

            Object.assign(me.simulator, simulatorOverrides);

        },

        async reloadDemoCode() {
            const { shared } = this.global;
            if (!shared) {
                return;
            }
            const editor = await shared.showCodeEditor(true);
            if (!editor.readOnly) {
                await editor.updateJS();
            }
            await editor.collapse({ animation : null });
        },

        logTestDetails() {
            const me = this;

            if (me._logAdded) {
                return;
            }

            // Set flag to not add multiple entries
            me._logAdded = true;

            const
                { global, url } = me,
                pageUrl         = me.getConfigParam('pageUrl');

            if (pageUrl && global?.location?.href) {
                me.fail(`PAGE: ${global.location.href}`);
            }

            if (location?.href) {
                const
                    harnessUrl = new URL('index.html', location.href),
                    filter     = url.split('/').pop();
                me.fail(`TEST: ${harnessUrl}?filter=${encodeURIComponent(filter)}#${encodeURIComponent(url)}`);
            }
        },

        onFailedAssertion() {
            if (this.project.isAutomated) {
                this.logTestDetails();
            }
            this.SUPERARG(arguments);
        },

        genericMouseAction(el, callback, scope, options) {
            const
                { SUPER, simulator } = this,
                { body }             = this.global.document,
                originalCallback     = callback;

            // waitForTargetAndSyncMousePosition
            arguments[6] = true;

            // Process any keyups in callback
            arguments[1] = function() {
                // If modifier keys were requested, we have to inject the keyup events after the pointer event
                for (const modifierType in modifierKeys) {
                    if (options?.[modifierType]) {
                        simulator.simulateEvent(body, 'keyup', modifierKeys[modifierType]);
                    }
                }
                originalCallback?.call(scope || this);
            };

            // If modifier keys were requested, we have to inject the keydown events before the pointer event
            for (const modifierType in modifierKeys) {
                if (options?.[modifierType]) {
                    simulator.simulateEvent(body, 'keydown', modifierKeys[modifierType]);
                }
            }

            return SUPER.call(this, ...arguments);

        },

        it(name, callback) {
            if (name.startsWith('TOUCH:') && (!window.Touch || !window.TouchEvent)) {
                arguments[1] = t => {
                    t.diag('Test skipped for non-touch browsers');
                };
            }

            this.suppressPassedWaitForAssertion = true;

            return this.SUPERARG(arguments);
        },

        doubleClick(options) {
            if (arguments.length === 1 && options.target) {
                return this.SUPER(
                    options.target || options.el,
                    options.callback,
                    options.scope,
                    options.options,
                    options.offset
                );
            }

            return this.SUPERARG(arguments);
        },

        dragTo(options) {
            if (arguments.length === 1 && options.source) {
                return this.SUPER(
                    options.source,
                    options.target,
                    options.callback,
                    options.scope,
                    options.options,
                    options.dragOnly,
                    options.sourceOffset,
                    options.targetOffset
                );
            }

            return this.SUPERARG(arguments);
        },

        dragBy(options) {
            if (arguments.length === 1 && options.source) {
                return this.SUPER(
                    options.source,
                    options.delta,
                    options.callback,
                    options.scope,
                    options.options,
                    options.dragOnly,
                    options.offset
                );
            }

            return this.SUPERARG(arguments);
        },

        moveMouseTo(options) {
            if (arguments.length === 1 && options.target) {
                return this.SUPER(
                    options.target,
                    options.callback,
                    options.scope,
                    options.offset,
                    options.waitForTarget,
                    options.options
                );
            }

            return this.SUPERARG(arguments);
        },

        click(config) {
            const newArguments = arguments.length === 1 && config?.el
                ? [
                    config.el,
                    config.callback,
                    config.scope,
                    config.options,
                    config.offset
                ] : arguments;

            return this.SUPER(...newArguments);
        },

        rightClick(config) {
            const newArguments = arguments.length === 1 && config.el
                ? [
                    config.el,
                    config.callback,
                    config.scope,
                    config.options,
                    config.offset
                ] : arguments;

            return this.SUPER(...newArguments);
        },

        // t.contextMenu('.b-grid-cell', 'Split/Horizontal')
        async contextMenu(target, menuPath) {
            await this.rightClick(target);

            const items = menuPath.split('/').map(p => p.trim());
            for (const item of items) {
                await this.click(`.b-menuitem:textEquals(${item})`);
            }
        },

        type : async function(config) {
            const { SUPER } = this;

            const args    = (arguments.length === 1 && config.text) ? [
                    config.el,
                    config.text,
                    config.callback,
                    config.scope,
                    config.options,
                    config.clearExisting
                ] : arguments,
                options = args[4];

            // If modifier keys were requested, we have to inject the keydown events before the input events
            for (const modifierType in modifierKeys) {
                if (options?.[modifierType]) {
                    await this.simulator.simulateEvent(this.global.document.body, 'keydown', modifierKeys[modifierType]);
                }
            }

            await SUPER.call(this, ...args);

            // If modifier keys were requested, we have to inject the keyup events after the input events
            for (const modifierType in modifierKeys) {
                if (options?.[modifierType]) {
                    await this.simulator.simulateEvent(this.global.document.body, 'keyup', modifierKeys[modifierType]);
                }
            }
        },

        launchSpecs() {
            const
                me         = this,
                beforeEach = me.beforeEachHooks[0];

            // If beforeEach inside the test doesn't create new instances, let's wait for any timeouts to complete before starting new t.it
            if (!beforeEach || !beforeEach.code.toString().match('new ')) {
                me.beforeEach((t, callback) => me.verifyNoTimeoutsBeforeSubTest(t, callback));
            }

            me.beforeEach(async t => {
                if (t.name.startsWith('TOUCH:')) {
                    // Wait for JS to load
                    await t.waitFor(() => t.global.BrowserHelper);
                    t.global.BrowserHelper._isTouchDevice = true;
                }
            });

            me.afterEach(t => {
                if (t.global.BrowserHelper) {
                    delete t.global.BrowserHelper._isTouchDevice;
                }
            });

            return me.SUPERARG(arguments);
        },

        findValue(object, value, path = '') {
            // Visit all classes / members deeply to find links to objects that should not exist
            const
                me          = this,
                visited     = new Set(),
                forEachProp = (item, level = 0, path = '') => {
                    if (level < 40) {
                        for (const o in item) {
                            const
                                member = item[o];

                            if (member?.id === value && member.$$name) {
                                this.fail(`${o} references ${member.$$name}. Path: ${path}`);
                            }
                            else if (member && typeof member === 'object' && !('ELEMENT_NODE' in member) && !visited.has(member) && member !== me.global) {
                                visited.add(item);
                                forEachProp(member, level + 1, path ? path + '.' + o : o);
                            }
                        }
                    }
                };

            forEachProp(object, 0, path);
        },

        waitForFontLoaded(callback) {
            return this.global.document.fonts.ready;
        },

        earlySetup(callback, errorCallback) {
            const
                me             = this,
                testConfig     = me.getConfig(),
                { earlySetup } = testConfig;

            // if we have a URL to load early before the test gets started
            if (earlySetup) {
                const
                    { SUPER } = me,
                    args      = arguments;

                // request earlySetup.url before running the test
                fetch(earlySetup.url).then(response => {
                    earlySetup.callback(response, testConfig, me, () => SUPER.apply(me, args));
                }).catch(() => errorCallback(`Requesting ${earlySetup.url} failed`));
            }
            else {
                me.SUPER(callback, errorCallback);
            }
        },

        onTearDown(fn) {
            this._tearDownHook = fn;
        },

        tearDown(callback, errorCallback) {
            const
                me           = this,
                testConfig   = me.getConfig(),
                { tearDown } = testConfig,
                { SUPER }    = me,
                args         = arguments;

            if (me.isFailed() && me.rootCause?.nbrFramesRecorded > 3) {
                const
                    failedAssertions = me.getFailedAssertions(),
                    failMsg          = failedAssertions[0]?.description || failedAssertions[0]?.annotation,
                    err              = new Error(me.name + ' - ' + (failMsg || ''));

                me.rootCause.finalizeSiestaTestCallback = callback;
                me.rootCause.logException(err);
            }
            else if (me._tearDownHook) {
                me._tearDownHook(() => SUPER.apply(me, args));
            }
            // if we have a URL to load after the test finishes
            else if (tearDown) {
                // request tearDown.url after the test completion
                fetch(tearDown.url).then(response => {
                    tearDown.callback(response, testConfig, me, () => SUPER.apply(me, args));
                }).catch(() => errorCallback(`Requesting ${tearDown.url} failed`));
            }
            else {
                me.SUPERARG(args);
            }
        },

        getGlobalDelays() {
            return this.global?.bryntum?.globalDelays?.getFiltered?.({
                ignoreTimeouts : this.getConfigParam('ignoreTimeouts')
            }) || [];
        },

        async waitForAsyncness() {
            return this.waitFor(() => this.getGlobalDelays().length === 0);
        },

        // Ensure we don't start next t.it if there are active timeouts
        verifyNoTimeoutsBeforeSubTest(test, callback) {
            const
                me                         = this,
                { disableNoTimeoutsCheck } = me.getConfig();

            if (disableNoTimeoutsCheck || me.getGlobalDelays().length === 0) {
                callback();
                return;
            }

            let pollCount = 0;
            const
                POLL_DELAY     = 50,
                MAX_POLL_COUNT = 50,
                poll           = () => {
                    const delays = me.getGlobalDelays();
                    if (delays.length === 0) {
                        callback();
                    }
                    else if (pollCount > MAX_POLL_COUNT) {
                        // Output to console for debugging purposes
                        console.warn('Found delays');
                        console.log(delays);
                        const delayNames = delays.map(entry => `${entry.scope || ''}${entry.delay?.name || entry.fn?.wrapFn?.name || entry.fn?.name || ''}`).join(', ');
                        this.fail(`Found delays: ${delayNames}`);
                        callback();
                    }
                    else {
                        pollCount++;
                        // suppressAssertion is used to remove this waitFor from logs
                        this.waitFor({
                            method            : POLL_DELAY,
                            callback          : poll,
                            suppressAssertion : true
                        });
                    }
                };
            poll();
        },

        launchSubTest(subTest, callback) {
            const { DomHelper } = this.global;

            // Store current subtest for error logging purposes
            this._subTest = subTest;

            // Following test must not be affected by this test.
            DomHelper && (DomHelper.usingKeyboard = false);

            if (this.resetCursorPosition !== false) {
                this.simulator.currentPosition[0] = this.simulator.currentPosition[1] = 0;
            }

            // DO NOT REMOVE: handy for finding "leaking" timers
            // if (this.global.bryntum? && this.global.bryntum.globalDelays && !this.global.bryntum.globalDelays.isEmpty()) {
            //     debugger;
            //     this.fail('Active timeouts found');
            // }
            this.SUPERARG(arguments);
        }
    },

    methods : {
        initialize() {
            this.SUPERARG(arguments);

            this.on('beforetestfinalizeearly', this.performPostTestSanityChecks);
        },

        queryFilter(selector, filterFn) {
            return this.query(selector).filter(filterFn);
        },

        // Fail tests in automation containing iit() for Teamcity. Allow for local automation tests.
        iit(description) {
            if (this.project.isAutomated && this.isTeamCity) {
                this.fail('No iit allowed in automation mode - t.iit: ' + description);
            }
            return this.SUPERARG(arguments);
        },

        /**
         * Unify space types (unicode or ansi) for string comparing
         * @param {String} str
         * @returns {String}
         */
        fixStrValue(str) {
            return typeof str === 'string' ? str.replace(/\s/g, ' ') : str;
        },

        /**
         * Comparing values
         * @param {*} value1
         * @param {*|RegEx} value2 if value2 is RegEx then `value1` is compared against regular expression
         * @param {String} description
         */
        is(value1, value2, description) {
            // Do not use instanceof RegEx because it won't work
            if (value2 && typeof value2.test === 'function') {
                this.ok(value2.test(value1), `RegExp: ${description}`);
            }
            else {
                this.SUPER(this.fixStrValue(value1), this.fixStrValue(value2), description);
            }
        },

        getElementsAndStyles(selector, styles) {
            const pseudoEl =
                      (selector.endsWith(':before') && '::before') ||
                      (selector.endsWith(':after') && '::after') ||
                      '';

            if (pseudoEl) {
                selector = selector.slice(0, selector.lastIndexOf(':'));

                if (selector.endsWith(':')) {
                    selector = selector.slice(0, -1);
                }
            }

            const els = this.query(selector);
            const ret = [];

            els.forEach(el => {
                const actualStyles = el.ownerDocument.defaultView.getComputedStyle(el, pseudoEl);
                const values = {};

                ret.push([el, values]);

                for (const name of styles) {
                    let actual = actualStyles.getPropertyValue(name);

                    if (name === 'transform' && actual && /^matrix\([^)]+\)$/.test(actual)) {
                        const parts = actual.slice(7, -1).split(',').map(v => Number(v.trim()));

                        if (parts[4] === 0 && parts[5] === 0) {
                            actual = {
                                // see https://css-tricks.com/get-value-of-css-rotation-through-javascript/
                                rotate : Math.round(Math.atan2(parts[1], parts[0]) * (180 / Math.PI))
                            };
                        }
                    }

                    values[name] = actual;
                }
            });

            return ret;
        },

        elementHasStyle(selector, style, descr) {
            const pairs = this.getElementsAndStyles(selector, Object.keys(style));

            for (const [el, actual] of pairs) {
                const msg = `Correct style for ${descr || `${selector} => ${el.id}`}`;
                this.isDeeply(actual, style, msg);
            }
        },

        /**
         * Deeply compares subset of `where` fields which are specified in `what` object
         * @param {Object|Object[]} what
         * @param {Object|Object[]} where
         * @param {String} [desc]
         */
        isDeeplySubset(what, where, desc) {
            const
                isWhereArray = Array.isArray(where),
                isWhatArray  = Array.isArray(what);

            if (isWhatArray && isWhereArray) {
                if (where.length === what.length) {
                    what.forEach((item, index) => {
                        this.isDeeplySubset(item, where[index], `${desc}. ${index}`);
                    });
                }
                else {
                    this.fail(`${desc}. Arrays length mismatch, what: ${what.length}, where: ${where.length}.`);
                }
            }
            else if (isWhatArray || isWhereArray) {
                this.fail('Cannot compare array and non-array');
            }
            else {
                const projection = Object.keys(what).reduce((result, key) => {
                    result[key] = where[key];

                    return result;
                }, {});

                this.isDeeply(projection, what, desc);
            }
        },

        isAbove(el1, el2, tolerance, message) {
            el1 = el1.element || el1;
            el2 = el2.element || el2;

            if (typeof tolerance === 'string') {
                message = tolerance;
                tolerance = 0;
            }

            tolerance = tolerance || 0.1;

            const
                rect1 = el1.getBoundingClientRect(),
                rect2 = el2.getBoundingClientRect();

            this.isLessOrEqual(rect1.bottom, rect2.top + tolerance, message);
        },

        isLeft(el1, el2, tolerance, message) {
            el1 = el1.element || el1;
            el2 = el2.element || el2;

            if (typeof tolerance === 'string') {
                message = tolerance;
                tolerance = 0;
            }

            tolerance = tolerance || 0.1;

            const
                rect1 = el1.getBoundingClientRect(),
                rect2 = el2.getBoundingClientRect();

            this.isLessOrEqual(rect1.right, rect2.left + tolerance, message);
        },

        isNextElement(el1, el2, message) {
            el1 = el1 && el1.element || el1;
            el2 = el2 && el2.element || el2;

            this.ok(el1.nextElementSibling === el2, message);
        },

        isPrevElement(el1, el2, message) {
            el1 = el1 && el1.element || el1;
            el2 = el2 && el2.element || el2;

            this.ok(el1.previousElementSibling === el2, message);
        },

        isOverlappingHorz(el1, el2, tolerance, message) {
            el1 = el1.element || el1;
            el2 = el2.element || el2;

            if (typeof tolerance === 'string') {
                message = tolerance;
                tolerance = 0;
            }

            tolerance = tolerance || 0;

            const
                rect1 = el1.getBoundingClientRect(),
                rect2 = el2.getBoundingClientRect();

            this.ok(
                rect1.left < rect2.right + tolerance && rect2.left < rect1.right + tolerance,
                message);
        },

        isOverlappingVert(el1, el2, tolerance, message) {
            el1 = el1.element || el1;
            el2 = el2.element || el2;

            if (typeof tolerance === 'string') {
                message = tolerance;
                tolerance = 0;
            }

            tolerance = tolerance || 0;

            const
                rect1 = el1.getBoundingClientRect(),
                rect2 = el2.getBoundingClientRect();

            this.ok(
                rect1.top < rect2.bottom + tolerance && rect2.top < rect1.bottom + tolerance,
                message);
        },

        isSameCharacters(str1, str2, description) {
            str1 = str1.split('');
            str2 = str2.split('');
            let i = str1.length + 1;
            while (i--) {
                if (str2.indexOf(str1[i]) >= 0) {
                    str2.splice(str2.indexOf(str1[i]), 1);
                }
            }
            this.is(str2, '', description);
        },

        performPostTestSanityChecks(evt, t) {
            if (!this.parent && !this.url.match(/docs\//)) {
                this.assertNoDomGarbage(t);
                this.assertNoResizeMonitors();
                this.assertMaxOneFloatRoot();
            }
        },

        async delayedTouchDragBy(target, delta) {
            await this.touchStart(target);
            await this.waitForTouchTimeoutToExpire();
            await this.movePointerBy(delta);
            this.touchEnd();  // sync event
        },

        async delayedTouchDragTo(source, target, skipMouseUp) {
            await this.touchStart(source);
            await this.waitForTouchTimeoutToExpire();
            await this.movePointerTo(target);
            if (!skipMouseUp) {
                this.touchEnd();
            }
        },

        async waitForTouchTimeoutToExpire() {
            const delays = this.global.bryntum.globalDelays;

            return this.waitFor(() => {
                let foundTimeout;
                delays.timeouts.forEach(o => {
                    if (o.name === 'touchStartDelay') {
                        foundTimeout = true;
                    }
                });
                return !foundTimeout;
            });
        },

        async waitForScrollPosition(element, position, dimension = 'y') {
            const property = dimension.toLowerCase() === 'y' ? 'scrollTop' : 'scrollLeft';

            return new this.global.Promise(resolve => {
                if (this.samePx(element[property], position)) {
                    resolve();
                }
                const onScroll = () => {
                    if (this.samePx(element[property], position)) {
                        element.removeEventListener('scroll', onScroll);
                        resolve();
                    }
                };
                element.addEventListener('scroll', onScroll);
            });
        },

        async waitForSelectorCount(selector, root, count) {
            if (typeof root === 'number') {
                count = root;
                root = undefined;
            }
            return this.waitFor(() => this.getSelectorCount(selector, root) === count);
        },

        getSelectorCount(selector, root) {
            return this.query(selector, root).length;
        },

        isOnline() {
            return /^(www\.)?bryntum\.com/.test(window.location.host);
        },

        elementsEqual(array1, array2, margin, assert = true) {
            if (array1.length !== array2.length) {
                if (assert) {
                    this.fail('Arrays are not same length');
                }
                else {
                    return false;
                }
            }
            for (let i = 0, { length } = array1; i < length; i++) {
                const isEqual = margin ? Math.abs(array1[i] - array2[i]) <= margin : array1[i] === array2[i];

                if (!isEqual) {
                    if (assert) {
                        this.fail(`Elements at ${i} not equal`);
                    }
                    else {
                        return false;
                    }
                }
            }
            this.pass('Array values all equal');
        },

        allSame(array, margin, assert) {
            for (let i = 1, { length } = array; i < length; i++) {
                const isEqual = margin ? Math.abs(array[i] - array[i - 1]) <= margin : array[i] === array[i - 1];

                if (!isEqual) {
                    if (assert) {
                        this.fail(`element ${i} not equal to element ${i - 1}`);
                    }
                    else {
                        return false;
                    }
                }
            }
            return true;
        },

        isApproximatelyEqual(value1, value2, threshold) {
            if (arguments.length === 2) {
                threshold = 0;
            }
            return (Math.abs(value2 - value1) <= threshold);
        },

        addListenerToObservable(observable, event, listener) {
            if (observable) {
                if ('on' in observable) {
                    observable.on(event, listener);
                }
                else if ('addEventListener' in observable) {
                    observable.addEventListener(event, listener);
                }
            }
        },

        removeListenerFromObservable(observable, event, listener) {
            // Observable might be destroyed way before test is finalized. In that case it won't have `un` method
            // t.firesOnce(popup, 'beforehide');
            // t.firesOnce(popup, 'hide');
            // popup.destroy();
            if (observable?.un) {
                observable.un(event, listener);
            }
        },

        getTimeZone() {
            const
                Date = this.global.Date,
                date = new Date();

            return date.toLocaleString().replace(/.*(GMT.*)/, '$1');
        },

        /**
         * Returns dates when DST occurs in given year
         * @param {Number} year
         * @returns {Date[]} Array with two dates: spring DST switch and autumn DST switch
         */
        getDSTDates(year = 2012) {
            const
                Date      = this.global.Date,
                yearStart = new Date(year, 0, 1),
                yearEnd   = new Date(year, 11, 31),
                dstDates  = [];

            for (let i = yearStart; i <= yearEnd; i = new Date(i.setDate(i.getDate() + 1))) {
                const
                    midnightOffset = new Date(year, i.getMonth(), i.getDate()).getTimezoneOffset(),
                    noonOffset     = new Date(year, i.getMonth(), i.getDate(), 12).getTimezoneOffset();

                if (midnightOffset !== noonOffset) dstDates.push(new Date(i.getTime()));
            }

            return dstDates;
        },

        /**
         * Returns date representing last hour in the current TZ offset, meaning next hour have different TZ offset.
         * @param {Date} start
         * @returns {Date}
         */
        getExactDSTDate(start) {
            let next, result;

            for (let i = new Date(start), end = new Date(i.getFullYear(), i.getMonth(), i.getDate() + 1); !result && i < end; i = next) {
                next = new Date(i.getTime() + 1000 * 60 * 60);

                if (next.getTimezoneOffset() !== i.getTimezoneOffset()) {
                    result = i;
                }
            }

            return result;
        },

        assertMaxOneFloatRoot() {
            const nbrFloatRoots = this.query('.b-float-root').length;

            if (nbrFloatRoots > 1) {
                this.isLessOrEqual(nbrFloatRoots, 1, 'Max one float root');
            }
        },

        assertDuplicateIDs(t) {
            const
                ids   = Array.from(t.global.document.querySelectorAll('[id]')).map(el => el.id),
                idMap = {};

            ids.forEach(id => idMap[id] ? idMap[id] += 1 : idMap[id] = 1);
            Object.entries(idMap).forEach(([id, count]) => {
                if (count > 1) {
                    t.fail(`${count} duplicate element IDs found "#${id}"`);
                }
            });
        },

        assertNoDomGarbage(t) {
            const
                me            = this,
                body          = me.global.document.body,
                { innerHTML } = body;

            let garbageSelector = me.getConfigParam('domGarbageSelector') || [
                '[id*="undefined"]',
                '[id*="null"]',
                '[class*="undefined"]',
                '[class*="null"]'
            ];

            if (Array.isArray(garbageSelector)) {
                garbageSelector = garbageSelector.join(',');
            }

            if (innerHTML.match(/\bNaN/)) {
                me.fail(`No "NaN" string found in DOM.\n.${innerHTML}`);
            }

            if (innerHTML.match(/id=""/)) {
                me.fail(`No empty id="" found in DOM.\n.${innerHTML}`);
            }

            // If no floating Widgets have been shown, there will not be a floatRoot.
            // But if there have, there must only be one floatRoot.
            if (document.querySelectorAll('.b-float-root').length > 1) {
                me.fail('Only one .b-float-root element must be present');
            }

            if (!t.skipSanityChecks) {
                let asserted;
                const assertContents = (re, description) => {
                    // Remove embedded JS code blocks like `href="data:text/javascript;..."` or `<code>...</code>` from checking
                    const
                        htmlString = body.outerHTML.replace(/href="data:text\/javascript[\s\S]*?"/gm, '').replace(/<code[\s\S]*?<\/code>/gm, ''),
                        match      = re.exec(htmlString);

                    if (match) {
                        const
                            tagStartIndex = htmlString.lastIndexOf('<', match.index),
                            tagEndIndex   = htmlString.indexOf('>', match.index) + 1,
                            msg           = `${description}: ${htmlString.slice(tagStartIndex, tagEndIndex)}`;
                        me.fail(msg);
                        asserted = true;
                    }
                };
                assertContents(/object object/i, 'No "Object object" string found in DOM');
                assertContents(/undefined.*?/i, 'No undefined string found in DOM');

                if (asserted && me.global.monkeyActions) {
                    me.fail('Monkey actions: ' + JSON.stringify(me.global.monkeyActions));
                }
            }

            if (garbageSelector && me.$(garbageSelector, body).length) {
                me.selectorNotExists(garbageSelector, 'No DOM attribute garbage found in DOM');

                if (me.global.monkeyActions && body.querySelector(garbageSelector)) {
                    me.fail('Monkey steps:' + JSON.stringify(me.global.monkeyActions));
                }

                if (body.querySelector('.b-animating')) {
                    me.selectorNotExists('.b-animating', 'b-animating should not be found');
                }
            }
        },

        assertNoResizeMonitors() {
            Array.from(document.querySelectorAll('*')).forEach(e => {
                if (e._bResizemonitor?.handlers.length) {
                    this.fail(`${e.tagName}#e.id has ${e._bResizemonitor.handlers.length} resize monitors attached`);
                }
            });
        },

        // Never start an action is animations or scrolling is ongoing
        async waitForAnimations(callback = () => {}) {
            const
                me                                 = this,
                { disableWaitingForCSSAnimations } = me.getConfig();

            // Wait until there are no *running* animations in the document.
            if (!me.disableWaitingForCSSAnimations && !disableWaitingForCSSAnimations) {
                let animatingEl;
                const hasNoAnimations = () => {
                    animatingEl = null;
                    return !me.global.document.getAnimations?.().some(a => {
                        const
                            el        = a.effect.target,
                            pseudo    = a.effect.pseudoElement,
                            iterCount = el.ownerDocument.defaultView.getComputedStyle(el, pseudo).animationIterationCount;
                        // Ignore infinite animations like spinners
                        if (!el.matches(exemptAnimationTargets) && iterCount !== 'infinite' && !ignoreTransitionProperties[a.transitionProperty] && !ignoreAnimations[a.animationName]) {
                            animatingEl = el;
                            return a;
                        }
                    });
                };

                if (!hasNoAnimations()) {
                    await me.waitFor(() => hasNoAnimations());
                }

                if (animatingEl) {
                    me.fail(`Animating element found: ${animatingEl.outerHTML.replace(animatingEl.innerHTML, '')}`);
                }
            }

            // Finish when bryntum widgets have removed all animation or motion flag classes
            return me.waitForSelectorNotFound(`.b-animating,.b-aborting${me.waitForScrolling ? ',.b-scrolling' : ''}`, callback);
        },

        async waitForAnimationFrame(next) {
            let frameFired = false;
            requestAnimationFrame(() => frameFired = true);
            return this.waitFor(() => frameFired, next);
        },

        async waitForEventOnTrigger(observable, event, trigger, next) {
            const result = this.waitForEvent(observable, event, next);
            trigger?.call();
            return result;
        },
        async waitForOnTrigger(fn, trigger, next) {
            const result = this.waitFor(fn, next);
            trigger?.call();
            return result;
        },

        async waitForSelectorOnTrigger(selector, trigger, next) {
            const result = this.waitForSelector(selector, next);
            trigger?.call();
            return result;
        },

        async waitForPageNavigate(href, desc) {
            return new Promise(resolve => {
                this.chain(
                    { waitForPageLoad : null, trigger : () => this.global.location.href = href, desc },
                    resolve
                );
            });
        },

        async waitForScroll(next) {
            return new this.global.Promise(resolve => {
                const
                    me         = this,
                    as         = me.beginAsync(),
                    global     = me.global,
                    onFinished = () => {
                        me.endAsync(as);
                        global.removeEventListener('scroll', onScroll, true);
                        next?.();
                        resolve();
                    };

                let timer = global.setTimeout(onFinished, 500);

                const onScroll = () => {
                    global.clearTimeout(timer);
                    timer = global.setTimeout(onFinished, 200);
                };

                global.addEventListener('scroll', onScroll, true);
            });
        },

        async waitForScrollEnd(target, next) {
            target = this.normalizeElement(target);

            return new this.global.Promise(resolve => {
                let timer;

                const onScroll = () => {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        target.removeEventListener('scroll', onScroll);
                        next?.();
                        resolve();
                    }, 100);
                };
                target.addEventListener('scroll', onScroll, { passive : true });
            });
        },

        async waitForAllImagesLoaded(next) {
            const images = Array.from(this.global.document.querySelectorAll('img[src]'));

            await this.waitFor(() => !images.some(img => !img.complete), next);
        },

        // Allows `await t.animationFrame`
        async animationFrame(frames = 1) {
            let count = 0,
                resolveFn;
            const
                global = this.global,
                frame  = () => {
                    if (count++ < frames) {
                        global.requestAnimationFrame(() => frame());
                    }
                    else {
                        resolveFn();
                    }
                };

            return new Promise(resolve => {
                resolveFn = resolve;
                frame();
            });
        },

        /**
         * Registers the passed URL to return the passed mocked up Fetch Response object to the
         * AjaxHelper's promise resolve function.
         * @param {String} url The url to return mock data for
         * @param {Object|Function} response A mocked up Fetch Response object which must contain
         * at least a `responseText` property, or a function to which the `url` and a `params` object
         * is passed which returns that.
         * @param {String} response.responseText The data to return.
         * @param {Boolean} [response.synchronous] resolve the Promise immediately
         * @param {Number} [response.delay=100] resolve the Promise after this number of milliseconds.
         */
        mockUrl(url, response) {
            const
                me         = this,
                AjaxHelper = me.global.AjaxHelper;

            if (!AjaxHelper) {
                throw new Error('AjaxHelper must be injected into the global namespace');
            }

            (me.mockAjaxMap || (me.mockAjaxMap = {}))[url] = response;

            // Inject the override into the AjaxHelper instance
            if (!AjaxHelper.originalFetch) {
                AjaxHelper.originalFetch = AjaxHelper.fetch;
            }
            AjaxHelper.fetch = me.mockAjaxFetch.bind(me);
        },

        mockAjaxFetch(url, options) {
            const
                urlAndParams = url.split('?'),
                win          = this.global;

            let result     = this.mockAjaxMap[urlAndParams[0]],
                parsedJson = null;

            if (result) {
                if (typeof result === 'function') {
                    result = result(urlAndParams[0], parseParams(urlAndParams[1]), options);
                }
                // if a String is provided - treat it as responseText
                else if (typeof result === 'string') {
                    result = {
                        responseText : result
                    };
                }

                // stringify if text is provided as an Object
                if (typeof result.responseText === 'object') {
                    result.responseText = JSON.stringify(result.responseText);
                }

                try {
                    parsedJson = options.parseJson && JSON.parse(result.responseText);
                }
                catch (error) {
                    parsedJson = null;
                    result.error = error;
                }

                result = win.Object.assign({
                    status     : 200,
                    ok         : true,
                    headers    : new win.Headers(),
                    statusText : 'OK',
                    url,
                    parsedJson,
                    text       : () => new Promise((resolve) => {
                        resolve(result.responseText);
                    }),
                    json : () => new Promise((resolve) => {
                        resolve(parsedJson);
                    })
                }, result);

                let aborted;

                const promise = new win.Promise((resolve, reject) => {
                    if (result.synchronous) {
                        result.rejectPromise ? reject('Promise rejected!') : resolve(result);
                    }
                    else {
                        win.setTimeout(() => {
                            if (aborted) {
                                return;
                            }
                            result.rejectPromise ? reject('Promise rejected!') : resolve(result);
                        }, ('delay' in result ? result.delay : 100));
                    }
                });

                promise.abort = () => aborted = true;
                return promise;
            }
            else {
                return win.AjaxHelper.originalFetch(url, options);
            }
        },

        /**
         * Unregisters the passed URL from the mocked URL map
         */
        unmockUrl(url) {
            if (this.mockAjaxMap) {
                delete this.mockAjaxMap[url];
            }
        },

        isDeeplyUnordered(array, toMatch, desc) {
            const
                failDesc = 'isDeeplyUnordered check failed: ' + desc,
                passDesc = 'isDeeplyUnordered check passed: ' + desc;

            if (!this.global.Array.isArray(array) || !this.global.Array.isArray(toMatch)) {
                return this.isDeeply.apply(this, arguments);
            }

            if (array.length !== toMatch.length) {
                this.fail(failDesc);
                return;
            }

            toMatch = toMatch.slice();

            for (const item of array) {
                const index = toMatch.indexOf(item);

                if (index === -1) {
                    break;
                }

                toMatch.splice(index, 1);
            }

            if (toMatch.length) {
                this.fail(failDesc);
            }
            else {
                this.pass(passDesc);
            }
        },

        isRectApproxEqual(rect1, rect2, threshold, description) {
            if (typeof threshold === 'string') {
                description = threshold;
                threshold = null;
            }

            for (const param in rect1) {
                this.isApprox(rect1[param], rect2[param], threshold ?? 1,
                    description ? `${description} (${param})` : `Rectangle has correct ${param}`);
            }
        },

        // t.isCssTextEqual(element, 'position: absolute; color: blue;')
        isCssTextEqual(src, cssText, desc) {
            if (src instanceof this.global.HTMLElement) {
                src = src.style.cssText;
            }
            if (src === cssText) {
                this.pass(desc || 'Style matches');
            }
            else {
                const
                    srcParts    = src.split(';').map(p => p.trim()),
                    targetParts = cssText.split(';').map(p => p.trim());

                srcParts.sort();
                targetParts.sort();

                this.isDeeply(srcParts, targetParts);
            }
        },

        startVideoRecording(callback, ignoreException) {
            const
                me             = this,
                document       = me.global.document,
                script         = document.createElement('script'),
                startRootCause = () => {
                    me.on('testupdate', me.onTestUpdate, me);

                    me.rootCause = new me.global.RC.Logger({
                        nbrFramesRecorded      : 0,
                        captureScreenshot      : false,
                        applicationId          : '2709a8dbc83ccd7c7dd07f79b92b5f3a90182f93',
                        maxNbrOfReportedErrors : 10,
                        ignoreErrorMessageRe   : ignoreException,
                        recordSessionVideo     : true,
                        videoBaseUrl           : me.global.location.href,
                        logToConsole           : () => {},

                        // Ignore fails in non-DOM tests which should never be flaky, and video won't help
                        processVideoFrameFn(frame) {
                            // enum VideoRecordingMessage {
                            //     setBaseUrl,
                            //     applyDomSnapshot,
                            //     applyPointerPosition,
                            //     applyPointerState,
                            //     applyElementValueChange,
                            //     applyElementCheckedChange,
                            //     applyWindowResize,
                            //     applyDomScroll,
                            //     applyDomMutation
                            // }

                            // Ignore initial video snapshot frames
                            if (frame?.[0] > 1) {
                                this.nbrFramesRecorded++;
                            }
                        },

                        onErrorLogged(responseText) {
                            let data;

                            try {
                                data = JSON.parse(responseText);
                            }
                            catch (e) {
                            }

                            if (data?.id) {
                                me.fail(`RootCause: https://app.therootcause.io/watch/${data.id}`);
                                me.logTestDetails();
                            }
                            this.finalizeSiestaTestCallback?.();
                        },
                        onErrorLogFailed() {
                            this.finalizeSiestaTestCallback?.();
                        }
                    });

                    if (me.rootCause.socket?.readyState === WebSocket.OPEN) {
                        callback.call(me);
                    }
                    else {
                        me.rootCause.socket.addEventListener('open', callback.bind(me));
                    }
                };

            script.crossOrigin = 'anonymous';
            script.src = 'https://app.therootcause.io/rootcause-full.js';
            script.addEventListener('load', startRootCause);
            script.addEventListener('error', callback);

            document.head.appendChild(script);
        },

        onTestUpdate(event, test, result) {
            if (typeof result.passed === 'boolean') {
                this.rootCause?.addLogEntry({
                    type    : result.passed ? 'pass' : 'fail',
                    glyph   : result.passed ? 'check' : 'times',
                    message : (result.description || '') + (result.annotation ? result.annotation + ' \nresult.annotation' : '')
                });
            }
        },

        handlerThrowsOk(fn) {
            let success    = false,
                doneCalled = false;
            const
                me         = this,
                oldOnError = me.global.onerror,
                done       = () => {
                    if (!doneCalled) {
                        doneCalled = true;
                        me.global.onerror = oldOnError;
                        if (success) {
                            me.pass('Expected error was thrown');
                        }
                        else {
                            me.fail('Expected error was not thrown');
                        }
                        me.endAsync(async);
                    }
                };

            me.global.onerror = () => {
                success = true;
                done();
                return true;
            };

            const async = me.beginAsync();

            // We must return the destroy method first in case the
            // passed method is not in fact async.
            setTimeout(fn, 0);

            return done;
        },

        removeIframe(iframeId) {
            const
                t         = this,
                _document = t.global.document,
                iframe    = _document.getElementById(iframeId);
            if (iframe) {
                iframe.parentElement.removeChild(iframe);
            }
            else {
                t.fail('Cannot find iframe with id ' + iframeId);
            }
        },

        setIframeUrl(iframe, url, callback) {
            const
                async = this.beginAsync(),
                doc   = iframe.contentDocument;

            iframe.onload = () => {
                this.endAsync(async);
                iframe.onload = undefined;
                callback();
            };

            if (url && doc.location !== url) {
                doc.location = url;
            }
            else {
                doc.location.reload();
            }

        },

        async setIframeAsync(config) {
            return new this.global.Promise(resolve => {
                this.setIframe(this.global.Object.assign(config, {
                    onload : (document, iframe) => {
                        resolve({ document, iframe });
                    }
                }));
            });
        },

        setIframe(config) {
            config = config || {};

            const
                t         = this,
                id        = config.iframeId || config.id,
                {
                    onload,
                    html,
                    height = 1600,
                    width  = 900
                }         = config,
                _document = t.global.document,
                iframe    = _document.body.appendChild(_document.createElement('iframe'));

            let async = config.async;

            iframe.width = width;
            iframe.height = height;

            if (id) {
                iframe.setAttribute('id', id);
            }

            iframe.setAttribute('frameborder', 0);

            const doc = iframe.contentWindow.document;

            if (onload) {
                async = async || t.beginAsync();

                iframe.onload = () => {

                    // Anyone tries to change it, we ensure the correct test flag class is always on
                    new iframe.contentDocument.defaultView.MutationObserver(() => {
                        if (!document.body.classList.contains('b-siesta-testing')) {
                            this.fail('".b-siesta-testing" has been removed from body by some process or test! It should not happen.');
                            document.body.classList.add('b-siesta-testing');
                        }

                    }).observe(document.body, {
                        attributes : true
                    });

                    t.endAsync(async);
                    onload(doc, iframe);
                };
            }

            if (html) {
                doc.open();
                doc.write(html);
                doc.close();
            }

            doc.body.classList.add('b-siesta-testing');

            return iframe;
        },

        scrollIntoView(selector, callback) {
            this.global.document.querySelector(selector).scrollIntoView();
            callback?.();
        },

        // Calls the passed function using this as the scope for every theme and locale.
        // Theme and locale are passed as the first two params, optional args are appended.
        async forEveryThemeAndLocale(fn, args = []) {
            const
                {
                    DomHelper,
                    LocaleHelper
                }            = this.global,
                defaultTheme = DomHelper.getThemeInfo().name,
                locales      = Object.keys(LocaleHelper.locales),
                themes       = ['classic-light', 'classic-dark', 'material', 'stockholm', 'classic'];

            for (const theme of themes) {
                await DomHelper.setTheme(theme);

                for (const locale of locales) {
                    this.diag(`Test theme ${theme}, locale ${locale}`);
                    this.applyLocale(locale, true);

                    // Wait for UIs which are refreshed on AF
                    await this.waitForAnimationFrame();
                    await fn.apply(this, [theme, locale, ...args]);
                }
            }
            this.applyLocale('En');
            await DomHelper.setTheme(defaultTheme);
            await this.waitForAnimationFrame();
        },

        getSVGBox(svgElement) {
            const
                svgBox       = svgElement.getBBox(),
                containerBox = svgElement.viewportElement.getBoundingClientRect();

            return {
                left   : svgBox.x + containerBox.left,
                right  : svgBox.x + containerBox.left + svgBox.width,
                top    : svgBox.y + containerBox.top,
                bottom : svgBox.y + containerBox.top + svgBox.height,
                width  : svgBox.width,
                height : svgBox.height
            };
        },

        getPx(value) {
            if (isNaN(value)) {
                throw new Error(`getPx(${value}) is invalid`);
            }

            // Return pixel value according to window.devicePixelRatio for HiDPI display measurements
            return value * (window.devicePixelRatio || 1);
        },

        /**
         * Method to compare pixel values. Shows no assertions.
         * Use t.isApproxPx instead for testing with assertions.
         * @param value
         * @param compareWith
         * @param threshold
         * @returns {boolean} truthy value if measuring succeeds
         */
        samePx(value, compareWith, threshold = 1) {
            return Math.abs(value - compareWith) <= this.getPx(threshold);
        },

        /**
         * Method to compare pixel values of two rects. Shows no assertions.
         * Use t.isApproxRect instead for testing with assertions.
         * @param rect1
         * @param rect2
         * @param threshold
         * @returns {boolean} truthy value if measuring succeeds
         */
        sameRect(rect1, rect2, threshold = 1) {
            return this.samePx(rect1.top, rect2.top, threshold) &&
                this.samePx(rect1.left, rect2.left, threshold) &&
                this.samePx(rect1.width, rect2.width, threshold) &&
                this.samePx(rect1.height, rect2.height, threshold);
        },

        /**
         * Method to compare pixel value of selector's height. Shows no assertions.
         * Use t.hasApproxHeight instead for testing with assertions.
         * @param selector
         * @param height
         * @param threshold
         * @returns {boolean} truthy value if measuring succeeds
         */
        sameHeight(selector, height, threshold) {
            return this.samePx(this.rect(selector).height, height, threshold);
        },

        /**
         * Method to compare pixel value of selector's width. Shows no assertions.
         * Use t.hasApproxWidth instead for testing with assertions.
         * @param selector
         * @param width
         * @param threshold
         * @returns {boolean} truthy value if measuring succeeds
         */
        sameWidth(selector, width, threshold) {
            return this.samePx(this.rect(selector).width, width, threshold);
        },

        /**
         * This is a replacement of `await t.waitFor()` which preserves the async callstack.
         *
         * @param {Function} pred A function to call until it returns a truthy value
         * @param {Object} options Options for the waiting process
         * @param {Number} [options.timeout=5000] The number of milliseconds before the wait will fail
         * @param {Number} [options.speed=0] The polling rate for setInterval
         * @param {String} [options.message] A message to describe the wait
         * @async
         */
        until(pred, options) {
            const
                {
                    timeout = 5000,
                    speed   = 0
                }       = (options || {}),
                stack   = (new Error().stack).split('at '),
                src     = stack.find(it => /\.t(\.(module|umd))?\.js/.test(it))?.trim(),
                message = `${options?.message || `"${pred.toString()}"`} at ${src}`,
                t       = this,
                t0      = performance.now(),
                waiter  = t.startWaiting(`Waiting for ${message}`);

            return new Promise(resolve => {
                const timer = setInterval(() => {
                    const dt = performance.now() - t0;

                    if (pred()) {
                        clearInterval(timer);
                        t.finalizeWaiting(waiter, true, `Waited ${Math.round(dt)} ms for ${message}`);
                        resolve();
                    }
                    else if (dt >= timeout) {
                        clearInterval(timer);

                        const err = `Waited too long for ${message}`;

                        // This will do the debuggerOnFail which retains a proper async callstack (a breakpoint
                        // here is still better, however)
                        t.finalizeWaiting(waiter, false, err);

                        // Don't reject() here because that throws from await and for Siesta, This Is Not The Way
                        // (we've already injected a failure just above so our plight won't go undetected)
                        resolve(new Error(err));
                    }
                }, speed);
            });
        },

        untilSelector(selector, { limit = 5000, speed = 0, message = '' } = {}) {
            return this.until(() => this.query(selector).length, {
                limit,
                speed,
                message : message || `selector "${selector}" to exist`
            });
        },

        untilSelectorNotFound(selector, { limit = 5000, speed = 0, message = '' } = {}) {
            return this.until(() => this.query(selector).length < 1, {
                limit,
                speed,
                message : message || `selector "${selector}" to not exist`
            });
        },

        isApproxPx(value, compareWith, threshold = 1, desc) {
            if (typeof threshold === 'string') {
                desc = threshold;
                threshold = 1;
            }
            this.isApprox(value, compareWith, threshold, desc);
        },

        isApproxRect(rect1, rect2, threshold = 1, desc) {
            if (typeof threshold === 'string') {
                desc = threshold;
                threshold = 1;
            }
            desc = desc ? `${desc} ` : '';

            let equal = true;

            if (!this.samePx(rect1.top, rect2.top, threshold)) {
                this.isApproxPx(rect1.top, rect2.top, threshold, `${desc}Correct rectangle top`);
                equal = false;
            }
            if (!this.samePx(rect1.left, rect2.left, threshold)) {
                this.isApproxPx(rect1.left, rect2.left, threshold, `${desc}Correct rectangle left`);
                equal = false;
            }
            if (!this.samePx(rect1.width, rect2.width, threshold)) {
                this.isApproxPx(rect1.width, rect2.width, threshold, `${desc}Correct rectangle width`);
                equal = false;
            }
            if (!this.samePx(rect1.height, rect2.height, threshold)) {
                this.isApproxPx(rect1.height, rect2.height, threshold, `${desc}Correct rectangle height`);
                equal = false;
            }

            if (equal) {
                this.pass(`${desc}Matches`);
            }
        },

        /**
         * Asserts element height
         * @param {String} selector CSS selector to identify an element
         * @param {Number} height Expected height in px
         * @param {String} [desc] Assertion description
         */
        hasHeight(selector, height, desc) {
            this.is(this.rect(selector).height, height, desc || 'Correct height for ' + selector);
        },

        hasWidth(selector, width, desc) {
            this.is(this.rect(selector).width, width, desc || 'Correct width for ' + selector);
        },

        /**
         * Asserts elements approximate top
         * @param {String} selector CSS selector to identify an element
         * @param {Number} top Expected top in px
         * @param {Number} [threshold] Allowed deviance
         * @param {String} [desc] Assertion description
         */
        hasApproxTop(selector, top, threshold, desc) {
            this.isApproxPx(this.rect(selector).top, top, threshold, desc || 'Correct top for ' + selector);
        },

        /**
         * Asserts elements approximate height
         * @param {String} selector CSS selector to identify an element
         * @param {Number} height Expected height in px
         * @param {Number} [threshold] Allowed deviance
         * @param {String} [desc] Assertion description
         */
        hasApproxHeight(selector, height, threshold, desc) {
            this.isApproxPx(this.rect(selector).height, height, threshold, desc || 'Correct height for ' + selector);
        },

        /**
         * Asserts elements approximate width
         * @param {String} selector CSS selector to identify an element
         * @param {Number} width Expected width in px
         * @param {Number} [threshold] Allowed deviance
         * @param {String} [desc] Assertion description
         */
        hasApproxWidth(selector, width, threshold, desc) {
            this.isApproxPx(this.rect(selector).width, width, threshold, desc || 'Correct width for ' + selector);
        },

        hasAttributeValue(element, attr, value, description) {
            // FireFox has no support for ariaRowIndex
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaRowIndex
            if (attr === 'aria-rowindex' && this.bowser.firefox) {
                return;
            }

            this.SUPER(element, attr, value, description || `Attribute "${attr}" equals "${value}"`);
        },

        DOMtoObject(element) {
            if (element instanceof this.global.HTMLElement) {
                const
                    result     = {
                        children : []
                    },
                    attributes = element.attributes,
                    children   = element.children;

                for (let i = 0, l = attributes.length; i < l; i++) {
                    const attr = attributes[i];

                    result[attr.name] = attr.value;
                }

                for (let i = 0, l = children.length; i < l; i++) {
                    result.children.push(this.DOMtoObject(children[i]));
                }

                return result;
            }
        },

        elementToObject(element) {
            if (element instanceof this.global.HTMLElement) {
                const
                    result     = {
                        children : []
                    },
                    attributes = element.attributes,
                    children   = element.children;

                for (let i = 0, l = attributes.length; i < l; i++) {
                    const attr = attributes[i];

                    if (typeof attr.value === 'string') {
                        if (attr.value.length > 0) {
                            result[attr.name] = attr.value;
                        }
                    }
                    else {
                        result[attr.name] = attr.value;
                    }
                }

                for (let i = 0, l = children.length; i < l; i++) {
                    result.children.push(this.elementToObject(children[i]));
                }

                return result;
            }
        },

        flushDomUpdates(WidgetClass) {
            const { all } = WidgetClass;

            for (let i = 0; i < all.length; ++i) {
                all[i].isComposable && all[i].recompose.flush();
            }
        },

        isMonkeySkippable(el) {
            const
                me               = this,
                monkeySkippables = [
                    '[disabled]',
                    '.b-disabled',
                    '.b-hidden',
                    '.b-print-button',
                    '[data-ref="fullscreenButton"]',
                    '[data-ref=fileButton]',
                    'a .b-fa-download',
                    'button .b-fa-download',
                    '.b-no-monkeys',
                    '.b-skip-test',
                    '#docs-button',
                    'a.b-button',
                    // Clicking code editor button simultaneously with other action buttons
                    // may produce unexpected scrolling/resize behavior.
                    // It is not what human may do on the page.
                    // Code editor functionality for each example is tested in "examplebrowser-links.t.js" test
                    '[data-ref=codeButton]'
                ];

            // In Safari simultaneous click on infoButton, toggleSideBar, and dayShowButton hangs the page
            // https://github.com/bryntum/support/issues/2846
            if (me.bowser.safari) {
                monkeySkippables.push(
                    '[data-ref="toggleSideBar"]',
                    '[data-ref="dayShowButton"]',
                    '[data-ref="infoButton"]'
                );
            }

            // Skip interaction if the element has no layout
            // or is inside a currently collapsing zone
            // or matches one of the skippable selectors.
            return !el.offsetParent || el.closest('.b-collapsing') || monkeySkippables.some(sel => me.matches(el, sel));
        },

        smartMonkeys(description) {
            const
                me                 = this,
                clickSelectors     = ['.b-button', 'input[type=checkbox]'],
                containerSelectors = ['.demo-header', '.demo-toolbar', '.b-toolbar'],
                allSelectors       = containerSelectors.map(container => clickSelectors.map(click => `${container} ${click}`)).flat().join(', '),
                elementsToClick    = me.query(allSelectors),
                slidersToUpdate    = me.query('input[type=range]');

            me.diag(`Element selectors: ${allSelectors}`);

            if (elementsToClick.length > 0) {
                elementsToClick.forEach(el => {
                    // Extra fullscreen check for framework buttons
                    if (!el.querySelector('.b-icon-fullscreen')) {
                        // Skippable check must be dynamic because clicking things changes things!
                        if (!me.isMonkeySkippable(el)) {
                            me.diag(`Click "${el?.dataset?.ref || el.id || el.classList?.join?.(' ') || el}"`);
                            //el.click();
                        }
                    }
                });
                me.pass(description || 'Smart monkeys clicking around did not produce errors');
            }

            if (slidersToUpdate.length > 0) {
                slidersToUpdate.forEach(input => {
                    const { min, max } = input;

                    input.value = max;
                    input.value = min;
                    me.simulator.simulateEvent(input, 'change');
                    me.simulator.simulateEvent(input, 'input');
                });
                me.pass(description || 'Smart monkeys changing sliders did not produce errors');
            }
        },

        failXSS(element, name) {
            const
                parent    = element.parentElement,
                extraInfo = parent ? ` in ${parent.outerHTML.replace(parent.innerHTML, '...')}` : '';
            this.fail(`XSS: ${name}${extraInfo}`);
        },

        // Try to find XSS vulnerability
        injectXSS(component, maxRecords = 5) {

            // Use XSS injection in chrome browser only
            if (!this.bowser.chrome) {
                return;
            }

            // Setup XSS fail handler on window
            this.global.failXSS = this.failXSS.bind(this);

            const
                xssText  = name => `<img src="xss" onerror="failXSS(this, '${name}')"/>`,
                injected = new WeakSet(),
                widgets  = component ? new Set([component]) : new Set([
                    'calendar',
                    'gantt',
                    'ganttbase',
                    'grid',
                    'gridbase',
                    'resourcehistogram',
                    'resourceutilization',
                    'scheduler',
                    'schedulerbase',
                    'schedulerpro',
                    'schedulerprobase',
                    'taskboard',
                    'taskboardbase',
                    'treegrid'
                ].flatMap(this.global.bryntum.queryAll));

            widgets.forEach(widget => widget.detectExcessiveRendering = false);

            widgets.forEach(widget => {
                ['columns', 'swimlanes', 'store', 'taskStore', 'eventStore', 'resourceStore'].forEach(storeName => {
                    const store = widget.project?.[storeName] || widget[storeName];

                    if (store && !injected.has(store)) {
                        injected.add(store);
                        this.diag(`Inject XSS to ${widget.$$name}.${storeName}`);
                        const records = store ? store.records.slice(0, maxRecords) : [];
                        let count = 0;
                        for (const record of records) {
                            const fields = record?.fieldMap;
                            if (fields) {

                                // Set image to `false` to avoid rendering of non-existing images
                                // It is checked in API code to avoid errors (E.g. Scheduler/lib/Scheduler/column/ResourceInfoColumn.js)
                                if (fields.image) {
                                    record.image = false;
                                }

                                if (fields.isLink) {
                                    record.isLink = false;
                                }

                                [
                                    'text',
                                    'name',
                                    'team',
                                    'firstName',
                                    'surName',
                                    'city',
                                    'email',
                                    'description',
                                    'tags',
                                    'note'
                                ].forEach(field => {
                                    if (fields[field]) {
                                        if (field === 'text' && record.htmlEncodeHeaderText === false) {
                                            // Skip injection in case this column is pre-configured with disabled encoding
                                            return;
                                        }
                                        record.set(field, xssText(`${widget.$$name}.${storeName} -> ${record.$$name}.${field} [${count++}]`));
                                    }
                                });
                            }
                        }
                    }
                });
            });
        },

        query(selector, root) {
            const me = this;

            selector = selector.trim();

            // Handle potential nested iframes
            root = root || me.getNestedRoot(selector);

            selector = selector.split('->').pop().trim();

            if (selector.match(/=>/)) {
                const
                    bryntum         = me.getGlobal(root).bryntum,
                    parts           = selector.split('=>'),
                    cssSelector     = parts.pop().trim(),
                    bryntumSelector = parts[0].trim(),
                    widgets         = bryntum.queryAll(bryntumSelector);

                return widgets.map(widget => me.query(cssSelector, widget.element)[0]).filter(result => Boolean(result));
            }
            else if (selector.match(/\s*>>/)) {
                const bryntum = me.getGlobal(root).bryntum;

                return bryntum.queryAll(selector.substr(2)).map(widget => widget.element);
            }

            selector = selector.replaceAll(/\$ref=(([^\s.:])*)/g, '[data-ref="$1"]');

            return me.SUPERARG([selector, root]);
        },

        /**
         * Query bryntum widget from CSS selector
         * @param {String} selector css selector
         * @return Object
         */
        queryWidget(selector) {
            return this.global.bryntum.fromElement(this.global.document.querySelector(selector));
        },

        setRandomPHPSession() {
            // Sets random cookie session ID per test
            const
                rndStr = Math.random().toString(16).substring(2),
                cookie = `${this.url} ${rndStr}`.replace(/[ .\\/&?=]/gm, '-').toLowerCase();

            this.diag(`PHPSESSID: ${cookie}`);
            this.global.document.cookie = `PHPSESSID=${cookie}`;
        },

        rect(selectorOrEl) {
            return this.normalizeElement(selectorOrEl).getBoundingClientRect();
        },

        /**
         * Returns test configuration
         */
        getConfig() {
            return this.project.getScriptDescriptor(this.url);
        },

        /**
         * Searches over all parents in test configuration to get param value
         */
        getConfigParam(param) {
            return this.project.getDescriptorConfig(this.getConfig(), param);
        },

        /**
         * Returns test mode 'es6', 'umd', 'module'
         */
        getMode() {
            return this.getConfigParam('mode');
        },

        /**
         * Enables intercepting console errors.
         */
        setupConsoleHook(parent) {
            const
                me = this;
            // No need to install hooks twice
            if (!me._consoleHooks) {
                const
                    parentWindow            = parent || me.global,
                    usesConsole             = me.getConfigParam('usesConsole'),
                    consoleFailLevels       = usesConsole ? [] : me.getConfigParam('consoleFail') || ['error', 'warn', 'log', 'info'],
                    allowedConsoleMessageRe = me.getConfigParam('allowedConsoleMessageRe');

                if (consoleFailLevels.length > 0) {
                    me.diag(`Console fails: [${consoleFailLevels.join(', ')}]`);
                }

                // Allow console message filtering by level
                consoleFailLevels.forEach(level => {
                    parentWindow.console[level] = (...args) => {
                        const
                            msg         = args[0],
                            isAllowed   = allowedConsoleMessageRe?.test(args[0]),
                            isTrialNote = BryntumTestHelper.isTrial && /Bryntum .* Trial Version/.test(msg);

                        if (!isAllowed && !isTrialNote) {
                            me.fail([`Console ${level}: `, ...args].join(''));
                        }
                        console[level](...args);
                    };
                    parentWindow.console[level].direct = (...args) => console[level](...args);
                });
                me._consoleHooks = true;
            }
        },

        /**
         * Checks combos by spying on showPicker and then takes out the longest selectable value, measures it and
         * compares it with the input width.
         *
         * Checks datefields & timefields by spying on showPicker and then measures a date value and compares it with
         * the input width.
         */
        setupInputOverflowHook(global) {
            const
                me = this,
                {
                    DomHelper,
                    DateHelper,
                    Rectangle,
                    DateField,
                    TimeField,
                    Combo,
                    LocaleManager
                }  = global;

            if (!DomHelper || !Rectangle || me.getConfig().ignoreInputOverflowTest) {
                return;
            }

            const
                ignore         = ['b-datepicker-monthfield', 'b-new-column-combo'],
                attachToPicker = (field, getStringFn) => {
                    if (!field || field.originalShowPicker) {
                        return;
                    }

                    field.originalShowPicker = field.prototype.showPicker;
                    field.prototype.showPicker = function() {
                        field.originalShowPicker.apply(this, arguments);

                        if (this.isPainted && !ignore.some(cls => this.element.classList.contains(cls)) &&
                            !this.parent?.element?.classList.contains('b-cell-editor')
                        ) {
                            const
                                string     = getStringFn(this),
                                textWidth  = string && !String(string).includes('img src="xss"') ? DomHelper.measureText(string, this.input) : 0,
                                inputWidth = Rectangle.content(this.input).width;

                            if (inputWidth < textWidth) {
                                me.fail(`${field.type} input is overflowing for ${LocaleManager.locale.localeName}: ref-${this.ref}, id-${this.id}, string: ${string}, string width: ${textWidth}, input width: ${inputWidth}`);
                            }
                        }
                    };
                };

            attachToPicker(Combo, (field) => {
                if (!field.multiSelect && field.items?.length) {
                    return field.store.map(r => r[field.displayField]).sort((a, b) => b.length - a.length)[0];
                }
            });

            if (DateHelper) {
                const dateTimeStringFn = field => DateHelper.format(new Date(2033, 1, 2, 10, 30, 30), field.format);

                attachToPicker(DateField, dateTimeStringFn);
                attachToPicker(TimeField, dateTimeStringFn);
            }

        },

        // region docs
        findMemberInClass(clsRecord, propertyType, memberName, isStatic) {
            const store = clsRecord.stores[0];

            let found = (clsRecord.data[propertyType] || []).find(mem => {
                return mem.name === memberName && (mem.scope === 'static') === isStatic;
            });

            if (!found && clsRecord.data.extends) {
                const superClass = store.getById(clsRecord.data.extends[0]);

                found = this.findMemberInClass(superClass, propertyType, memberName, isStatic);
            }

            // search in mixed in members
            if (!found && clsRecord.data.mixes) {
                const mixins = clsRecord.data.mixes.slice();

                let mixin;

                while (!found && (mixin = mixins.shift())) {
                    const mixinCls = store.getById(mixin);

                    found = this.findMemberInClass(mixinCls, propertyType, memberName, isStatic);
                }
            }

            return found;
        },

        async assertDocsLinks(classRecord) {
            const
                me             = this,
                knownTags      = [
                    'function',
                    'member',
                    'method',
                    'property',
                    'link',
                    'ts-ignore',
                    'typings',
                    'category',
                    'config',
                    'field',
                    'internal',
                    'deprecated',
                    'calculated',
                    'propagating',
                    'preventable',
                    'singleton',
                    'readonly',
                    'hide',
                    'hideconfigs',
                    'hideproperties',
                    'hidefunctions',
                    'uninherit'
                ],
                contentElement = me.global.document.getElementById('content');

            if (contentElement.querySelector('.path-not-found')) {
                me.selectorNotExists('.path-not-found', 'Resource missing');
            }
            if (me.query('.description:textEquals(undefined)').length > 0) {
                me.contentNotLike(contentElement, '<div class="description">undefined</div>', 'No undefined descriptions');
            }
            if (me.query('code:empty').length > 0) {
                me.selectorNotExists('code:empty', 'No empty CODE tags');
            }

            // Assert document title (guides don't have a predictable title)
            if (!classRecord.isGuide && !contentElement.querySelector('h1').innerText.includes(classRecord.name)) {
                me.contentLike(contentElement.querySelector('h1'), classRecord.name, 'Document has the correct name');
            }

            // assert no unprocessed JSDOC tags are displayed
            knownTags.forEach(tag => {
                if (contentElement.innerText.includes('@' + tag)) {
                    me.contentNotLike(contentElement, new RegExp('@' + tag, 'i'), `No "@${tag}" string found in content`);
                }
            });

            await me.assertAllDocsLinks(classRecord, contentElement);

            me.assertClassMembers(classRecord);

            // verify all internal links are correct, in the left pane + inheritance / mixin lists
            me.assertInternalDocsLinks(classRecord, contentElement);

            // verify all links to global symbols (Date, HTMLElement etc) are OK
            me.assertExternalDocsLinks();
        },

        assertClassMembers(classRecord) {
            const
                me             = this,
                contentElement = me.global.document.getElementById('content'),
                treeStore      = classRecord.stores[0],
                // records data is replaced when showing inherited, need to get it again
                data           = treeStore.getById(classRecord.id).data,
                {
                    configs    = [],
                    functions  = [],
                    properties = [],
                    events     = []
                }              = data;

            configs.forEach(config => {
                const types = config.accepts || config.type;

                // only verify public configs
                if (!config.access) {
                    if (types?.length > 0) {
                        let defaultValue     = config.defaultValue,
                            defaultValueType = typeof defaultValue;

                        // Skip checking configs with just one complex type since we cannot verify it
                        if (types.length === 1 && types[0].includes('.')) {
                            return;
                        }

                        // if (types.includes('Array')) {
                        //     me.fail(`Config ${classRecord.name}#${config.name} uses Array type: ${types.join('|')}`);
                        // }

                        // Skip checking lazy config values for now, JsDoc garbles them
                        if (defaultValueType === 'string' && defaultValue.startsWith('{"$config')) {
                            return;
                        }

                        // Some default values are stringified objects
                        if (defaultValueType === 'string') {
                            if (defaultValue[0] === '{') {
                                defaultValueType = 'object';
                            }
                            else if (defaultValue[0] === '[' && types.find(type => type.endsWith('[]'))) {
                                // For array default values, just pick first value as a smoke check
                                defaultValue = JSON.parse(defaultValue);

                                if (defaultValue.length > 0) {
                                    defaultValue = defaultValue[0];
                                    defaultValueType = typeof defaultValue;
                                }
                            }
                            else if (types[0] === 'Number' && !isNaN(Number(defaultValue))) {
                                defaultValueType = 'number';
                            }
                        }

                        // If there's a default value, match it with config type
                        if (defaultValue != null && !types.map(type => type.toLowerCase().replace(/\[]/, '')).includes(defaultValueType) && !types.some(type => type === `'${defaultValue}'` || type === defaultValue)) {
                            let found;

                            // Sometimes default value is a snippet of code
                            try {
                                const evalResult = defaultValueType === 'string' && me.global.eval(defaultValue);

                                found = types.find(type => {
                                    if (type === '*') {
                                        return true;
                                    }

                                    try {
                                        const constructor = me.global.eval(type);

                                        return evalResult instanceof constructor;
                                    }
                                    catch (e) {

                                    }
                                });
                            }
                            catch (e) {

                            }

                            if (!found) {
                                me.fail(`Config ${classRecord.name}#${config.name} has default value ${defaultValue} [${defaultValueType}]. Documented types: ${types.join('|')}`);
                            }
                        }
                    }
                    else {
                        me.fail(`Config ${classRecord.name}#${config.name} is missing type`);
                    }
                }
            });

            if (data.extends?.length && contentElement.querySelectorAll('.class-hierarchy li').length < 2) {
                me.isGreater(contentElement.querySelectorAll('.class-hierarchy li').length, 1, 'Class + superclass rendered');
            }

            for (const func of functions) {
                const fId = func.scope === 'static' ? func.name + '-static' : func.name;

                if (func.parameters) {
                    if (!classRecord.access && !func.access || func.access === 'static') {
                        func.parameters.forEach(param => {
                            if (param.type.length === 0) {
                                me.fail(`Function ${classRecord.name}#${fId} param ${param.name} missing type`);
                            }
                            // else if (param.type.includes('Array')) {
                            //     me.fail(`Config ${classRecord.name}#${func.name} uses Array type: ${param.type}`);
                            // }
                        });
                    }
                }

                if (contentElement.querySelectorAll('#function-' + fId + ' .function-body .parameter').length !== (func.parameters || []).length) {
                    me.fail('#function-' + fId + ': wrong function params rendered');
                }
            }

            properties.forEach(property => {
                if ((!property.access || property.access === 'static')) {
                    if (!property.type?.[0]) {
                        me.fail(`Property ${classRecord.name}#${property.name} missing type`);
                    }
                    // else if (property.type.includes('Array')) {
                    //     me.fail(`Config ${classRecord.name}#${property.name} uses Array type: ${property.type}`);
                    // }
                }
            });

            for (const e of events) {
                // -1 to offset the manually rendered top level single 'event' param for Bryntum events
                if (e.parameters) {
                    if (contentElement.querySelectorAll('#event-' + e.name + '.event .parameter').length - 1 !== e.parameters.length) {
                        me.fail(e.name + ': wrong event params rendered');
                    }
                    // e.parameters.forEach(param => {
                    //     if (param.type.includes('Array')) {
                    //         me.fail(`Event ${classRecord.name}#${e.name} uses Array type: ${param.type.join('|')}`);
                    //     }
                    // });
                }
            }

            if (contentElement.querySelectorAll('.configs .config').length !== classRecord.singleton ? 0 : configs.length) {
                me.selectorCountIs('.configs .config', contentElement, classRecord.singleton ? 0 : configs.length, 'Configs rendered');
            }
            if (contentElement.querySelectorAll('.properties .property').length !== properties.length) {
                me.selectorCountIs('.properties .property', contentElement, properties.length, 'Properties rendered');
            }
            if (contentElement.querySelectorAll('.events .event').length !== events.length) {
                me.selectorCountIs('.events .event', contentElement, events.length, 'Events rendered');
            }
        },

        async assertAllDocsLinks(classRecord, contentElement) {
            const
                nodes   = contentElement.querySelectorAll('a'),
                checked = [],
                failed  = [],
                addFail = (node, href, reason) => failed.push(`"${node.textContent || node}" : href="${href}". [${reason}]`);

            await Promise.all(Array.from(nodes).filter(node => node.href).map(node => {
                let href = node.getAttribute('href');
                if (checked.includes(href)) {
                    return;
                }

                checked.push(href);

                if (/https:\/\/(www\.)?bryntum\.com\S+\.md/.test(href)) {
                    addFail(node, href, 'Bryntum online link should not be an "*.md" file');
                }

                href = href.split('#')[0];

                // Skip external links
                if (href === '' || /^(http|https|mailto|api|guide|#|\?)/.test(href)) {
                    return;
                }

                this.diag(`Check url: ${href}`);

                if (href.includes('href=')) {
                    addFail(node, href, 'Wrong link format');
                    return;
                }

                if (BryntumTestHelper.isPR) {
                    // Run simplified test for PR validation
                    if (!/^(..\/.*examples|engine|data|\?)/.test(href)) {
                        addFail(node, href, 'Wrong link format');
                    }
                }
                else {
                    // Run full test for checking external links
                    return this.global.AjaxHelper.get(href)
                        .then(({ status, statusText }) => {
                            if (status !== 200) {
                                addFail(node, href, `${status}: ${statusText}`);
                            }
                        })
                        .catch(err => addFail(node, href, err.message));

                }
            }));

            failed.forEach(f => this.fail(f));
        },

        assertInternalDocsLinks(classRecord, contentElement) {
            const
                me               = this,
                product          = me.getConfigParam('product'),
                treeStore        = classRecord.stores[0],
                ignoreLinks      = me.getConfig().ignoreLinks || [],
                ignoreClasses    = me.getConfig().ignoreClasses || [],
                linkSelector     = 'a[href^="#"]:not(.summary-icon):not(.inherited):not(.anchor-link)',
                memberCategories = ['events', 'properties', 'configs', 'functions', 'fields'],
                nodes            = contentElement.querySelectorAll(`.left-pane ${linkSelector}, .right-pane > :not(.class-contents-container) ${linkSelector}`);

            Array.from(nodes).forEach((node) => {
                const
                    href              = node.getAttribute('href').substring(1),
                    className         = href.split('#')[0],
                    member            = href.split('#')[1],
                    linkedClassRecord = treeStore.getById(className),
                    linkHref          = `${classRecord.id}#${href}`,
                    checkIgnoreConfig = linkHref => {
                        if (ignoreLinks.includes(linkHref)) {
                            me.fail(`${linkHref} is redundant in ignoreLinks test config. Remove from tests/index.js`);
                        }
                    },
                    isIgnoredLink     = linkHref => {
                        const hash = linkHref?.split('#')[1];
                        if (hash) {
                            // Skip #foo links
                            if (hash === 'foo') {
                                return true;
                            }

                            // Allow links to guides of "parent" products without placing them to navigation tree
                            if (['/guides/', '/readme.md'].some(link => hash.includes(link)) && !hash.toLowerCase().startsWith(`${product}/`)) {
                                checkIgnoreConfig(linkHref);
                                this.diag(`Ignored guide link: #${hash}`);
                                return true;
                            }
                        }
                        // Skip ignored links
                        return ignoreLinks.includes(linkHref);
                    };

                // Ignore internal docs page link
                if (linkHref.endsWith('#class-description')) {
                    return;
                }

                // Completely ignore by link url
                if (!linkedClassRecord && isIgnoredLink(linkHref)) {
                    return;
                }
                else if (linkedClassRecord) {
                    checkIgnoreConfig(linkHref);
                }

                if (!linkedClassRecord && !ignoreClasses.includes(className)) {
                    me.fail(`${linkHref} not found in navigation tree. Add to docs/data/navigation.js or to ignoreClasses/ignoreLinks test config in tests/index.js`);
                }
                else if (linkedClassRecord && !member && !classRecord.access && linkedClassRecord.access === 'private') {
                    const isLinkedFromPublicMember = node.closest('.member:not(.private):not(.internal)');

                    if (isLinkedFromPublicMember) {
                        me.fail(`Public class ${classRecord.name} links to private class ${linkedClassRecord.name}`);
                    }
                }
                else if (!linkedClassRecord?.isGuide && !linkedClassRecord?.isQuickStart && member && !ignoreLinks.includes(href)) {

                    // Check links to class description
                    const headerRegexp = new RegExp(`<h2 ?[a-z"=-]*>${member.replace(/-/g, ' ')}</h2>`, 'i');
                    if (linkedClassRecord?.classDescription?.match(headerRegexp)) {
                        return;
                    }

                    const
                        parts        = member.split('-'),
                        name         = decodeURIComponent(parts[1]),
                        category     = parts[0],
                        isStatic     = parts.length === 3,
                        propertyName = category === 'property' ? 'properties' : (category + 's');

                    let found = false;

                    if (parts.length > 1) {
                        found = me.findMemberInClass(linkedClassRecord, propertyName, name, isStatic);
                    }

                    if (!found && !memberCategories.includes(category)) {
                        me.fail(`${classRecord.id} - docs link not found: ${href}`);
                    }
                    else if (classRecord.access !== 'private' && linkedClassRecord.access === 'private') {
                        const isLinkedFromPublicMember = node.closest('.member:not(.private):not(.internal)');

                        if (isLinkedFromPublicMember) {
                            me.fail(`${classRecord.name} links to private member ${linkedClassRecord.name}`);
                        }
                    }
                }
            });
        },

        assertExternalDocsLinks() {
            const
                contentElement = this.global.document.getElementById('content'),
                global         = this.global,
                linkNodes      = contentElement.querySelectorAll('a.type[target=_blank]'),
                ignoreSymbols  = {
                    Class                : 1,
                    TemplateStringsArray : 1,
                    TouchEvent           : 1,
                    null                 : 1,
                    DragEvent            : this.bowser.safari // DragEvent somehow missing in Safari
                };

            if (!this.global.freshWindow) {
                const frame = document.createElement('iframe');

                this.global.document.body.appendChild(frame);

                frame.style.display = 'none';

                this.global.freshWindow = frame.contentWindow;
            }

            // verify all links to global symbols are OK
            global.Array.from(linkNodes).forEach(node => {
                const symbolName = node.innerHTML.trim().replace('[]', '').replace('...', '');

                if (!symbolName.startsWith('\'') && !ignoreSymbols[symbolName] && !(symbolName in this.global.freshWindow)) {
                    this.fail(global.location.hash + ' - docs global symbol link not found: ' + symbolName);
                }
            });
        },
        // endregion docs

        /**
         * Applying locales which were preloaded via alsoPreload in tests/index.js
         * Usage example:
         * {
         *     alsoPreload : preloadLocales,
         *     url         : 'test.t.js'
         * }
         * @param {String|Object} nameOrConfig locale name
         * @param config pass config or `true` to re-apply current locale
         * @returns {Object} locale object
         */
        applyLocale(nameOrConfig, config) {
            const { LocaleManager } = this.global;

            if (typeof nameOrConfig === 'string') {
                this.diag(`Applying locale ${nameOrConfig}`);
            }

            // Checking existing locale with test workaround suggestion
            if (typeof nameOrConfig === 'string' && !config) {
                const locale = this.global.bryntum.locales[nameOrConfig];
                if (!locale) {
                    this.fail(`"${nameOrConfig}" locale is not published. Add "alsoPreload : preloadLocales" for test config in tests/index.js`);
                }
            }

            return LocaleManager.applyLocale(nameOrConfig, config);
        },

        getWebSocketServerMessageHandler() {
            return class CoreMessageHandler {
                handle(data) {
                    let result;

                    switch (data.command) {
                        case 'hello':
                            result = {
                                command : 'users',
                                users   : [data.userName]
                            };
                            break;
                        default:
                            break;
                    }

                    return result;
                }
            };
        },

        getWebSocketServerStub() {
            const messageHandler = this.getWebSocketServerMessageHandler();

            class WebSocketServerStub {
                static messageHandlerImplementation = messageHandler;

                mockProject(projectId, data) {
                    this.messageHandler.mockProject(projectId, data);
                }

                pool = {};

                constructor() {
                    this.messageHandler = new this.constructor.messageHandlerImplementation();
                }

                add(client) {
                    if (client.address in this.pool) {
                        this.pool[client.address].add(client);
                    }
                    else {
                        const set = this.pool[client.address] = new Set();
                        set.add(client);
                    }
                }

                remove(client) {
                    if (client.address in this.pool) {
                        this.pool[client.address].delete(client);
                    }
                }

                handleClientMessage(client, message) {
                    message = JSON.parse(message);

                    try {
                        let response = this.messageHandler.handle(message);

                        if (response) {
                            response = JSON.stringify(response);

                            // do not broadcast dataset
                            if (message.command === 'dataset') {
                                client.handleMessage(response);
                            }
                            else {
                                this.pool[client.address].forEach(client => {
                                    client.handleMessage(response);
                                });
                            }
                        }
                    }
                    catch (e) {
                        this.trigger('error', { e });
                    }
                }
            }

            return new WebSocketServerStub();
        },

        getWebSocketStub() {
            const serverStub = this.getWebSocketServerStub();

            return class WebSocketStub extends this.global.Events(this.global.Base) {
                static CONNECTING = 0;
                static OPEN = 1;
                static CLOSING = 2;
                static CLOSED = 3;

                static mockProject(projectId, data) {
                    serverStub.mockProject(projectId, data);
                }

                readyState = WebSocket.CLOSED;

                construct(address) {
                    super.construct({ address });

                    setTimeout(() => {
                        this.open();
                    }, 100);
                }

                open() {
                    if (this.readyState === WebSocket.OPEN) {
                        return;
                    }

                    if (this.address.match(/nonexist/)) {
                        this.trigger('error', { message : 'Not found' });
                    }
                    else {
                        this.readyState = WebSocket.OPENING;
                        serverStub.add(this);
                        this.trigger('open', { target : this });
                        this.readyState = WebSocket.OPEN;
                    }
                }

                close() {
                    this.readyState = WebSocket.CLOSING;
                    this.trigger('close', { target : this });
                    serverStub.remove(this);
                    this.readyState = WebSocket.CLOSED;
                }

                send(data) {
                    setTimeout(() => {
                        serverStub.handleClientMessage(this, data);
                    }, 300);
                }

                handleMessage(data) {
                    this.trigger('message', { data });
                }

                addEventListener(event, handler) {
                    this.on(event, handler);
                }

                removeEventListener(event, handler) {
                    this.un(event, handler);
                }
            };
        },

        startEventListenerTracking() {
            const
                me                                = this,
                { Element, globalThis, document } = me.global;
            me.oldAdd = Element.prototype.addEventListener;
            me.oldRemove = Element.prototype.removeEventListener;
            const activeListeners = me.activeListeners = [];
            const
                newAdd    = function(eventName, handler, options) {
                    me.oldAdd.call(this, ...arguments);

                    if (eventName === 'unload' || handler.spec?.expires) {
                        return;
                    }
                    activeListeners.push({
                        element : this,
                        eventName,
                        handler
                    });
                },
                newRemove = function(eventName, handler) {
                    me.oldRemove.call(this, ...arguments);

                    const index = activeListeners.findIndex(item => item.element === this && item.eventName === eventName && item.handler === handler);
                    if (index >= 0) {
                        activeListeners.splice(index, 1);
                    }
                };

            Element.prototype.addEventListener = newAdd;
            globalThis.addEventListener = newAdd;
            globalThis.visualViewport.addEventListener = newAdd;
            document.addEventListener = newAdd;

            Element.prototype.removeEventListener = newRemove;
            globalThis.removeEventListener = newRemove;
            globalThis.visualViewport.removeEventListener = newRemove;
            document.removeEventListener = newRemove;
        },

        stopEventListenerTracking() {
            const { Element, globalThis } = this.global;

            Element.prototype.addEventListener = this.oldAdd;
            Element.prototype.removeEventListener = this.oldRemove;
            globalThis.addEventListener = this.oldAdd;
            globalThis.removeEventListener = this.oldRemove;
            globalThis.document.addEventListener = this.oldAdd;
            globalThis.document.removeEventListener = this.oldRemove;
            globalThis.visualViewport.addEventListener = this.oldAdd;
            globalThis.visualViewport.removeEventListener = this.oldRemove;
        },

        getActiveEventListeners() {
            const { globalThis, document } = this.global;

            return this.activeListeners.filter(({ element }) => element === globalThis ||
                element === globalThis.visualViewport ||
                element === document ||
                element === document.documentElement ||
                document.documentElement.contains(element)
            );
        },

        assertNoActiveEventListeners(message) {
            const listeners = this.getActiveEventListeners();
            if (listeners.length > 0) {
                console.log(listeners);
            }

            this.is(listeners.length, 0, message);
        }
    }
});

class BryntumTestHelper {

    static detectTrial() {
        let result = true;
        
        return result;
    }

    static detectWebGL() {
        if (bowser.chrome) {
            const canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            const supported = Boolean(canvas.getContext('webgl'));
            canvas.remove();
            return supported;
        }
    }

    static detectNetCore() {
        // run netcore tests only in chrome because we are testing backend really
        let result = false;
        if (bowser.chrome) {
            const params = new URLSearchParams(document.location.search);
            if (params.has('netcore') && params.get('netcore') !== 'false') {
                result = true;
            }
        }
        return result;
    }

    static expandUrl(url, root) {
        // Append root to the string item if it doesn't start with it (to simplify configs)
        return url.startsWith(root) ? url : `${root}/${url}`;
    }

    static prepareFrameworkTests(items, examplesRoot = '../examples/frameworks', testsRoot = 'examples/frameworks') {
        // Disable tests for PR
        if (BryntumTestHelper.isPR) {
            return [];
        }

        return items.map(item => {
            if (item.pageUrl != null && item.url != null) {
                return Object.assign({}, item, {
                    pageUrl                : this.expandUrl(item.pageUrl, examplesRoot),
                    url                    : this.expandUrl(item.url, testsRoot),
                    keepPageUrl            : true,
                    disableNoTimeoutsCheck : true
                });
            }
        });
    }

    static prepareFrameworkMonkeyTests({ items, examplesRoot = '../examples/frameworks', config = {}, smartMonkeys }) {
        // Disable tests for PR
        if (BryntumTestHelper.isPR) {
            return [];
        }

        return this.prepareMonkeyTests({
            items,
            examplesRoot,
            config,
            smartMonkeys
        });
    }

    static prepareMonkeyTests({
        items, mode, examplesRoot = '../examples', config = {}, smartMonkeys = false, rtl = false,
        itemFilter = item => item
    }) {
        const
            isPR       = BryntumTestHelper.isPR,
            urls       = [],
            monkeyName = smartMonkeys ? 'monkey-smart' : 'monkey';

        return items.filter(itemFilter).map(item => {
            if (item.skipMonkey) {
                return;
            }

            const cfg = Object.assign({}, config, item instanceof Object ? item : { pageUrl : item });
            if (cfg.pageUrl) {

                cfg.pageUrl = this.expandUrl(cfg.pageUrl, examplesRoot);

                if (!cfg.keepPageUrl && ['umd', 'module'].includes(mode)) {
                    const parts = cfg.pageUrl.split('?');
                    cfg.pageUrl = parts[0] + (parts[0].endsWith('/') ? '' : '/') + `index.${mode}.html?` + (parts[1] || '');
                }

                // Prepare url-friendly id
                const id = cfg.pageUrl
                    .replace(/\.+\//g, '')
                    .replace(/[?&./]+/g, '-')
                    .replace(/-+$/, '')
                    .replace(/examples(.*?)-frameworks/, 'frameworks$1') +
                    (rtl ? '-monkey-rtl' : '');

                // Append test param to hide tooltips
                if (!/[&?]test/.test(cfg.pageUrl)) {
                    cfg.pageUrl = `${cfg.pageUrl}${cfg.pageUrl.includes('?') ? '&' : '?'}test`;
                }

                // Append RTL param if needed
                if (rtl && !/[&?]rtl/.test(cfg.pageUrl)) {
                    cfg.pageUrl = `${cfg.pageUrl}${cfg.pageUrl.includes('?') ? '&' : '?'}rtl`;
                }

                Object.assign(cfg, {
                    isPR,
                    isMonkey                : true,
                    keepPageUrl             : true,
                    name                    : `${monkeyName}-${id}`,
                    url                     : `examples/${monkeyName}.t.js?${id}`,
                    // Skip errors caused by copying resources (name changes from "Dave" to "Dave - 2", "Dave - 3", etc.)
                    failOnResourceLoadError : /users\/.*?\d?\.(jpg|png)$/,
                    disableNoTimeoutsCheck  : true
                });

                // Timeout for bigdataset demos
                if (/big-?dataset/.test(id)) {
                    cfg.defaultTimeout = 60000;
                }

                // Avoid duplicates
                if (!urls.includes(cfg.url)) {
                    urls.push(cfg.url);
                    return cfg;
                }
            }
        });
    }

    static updateTitle(item, testUrl) {
        // Split testUrl to display in tree grid
        if (testUrl && (typeof URL === 'function')) {
            const
                url      = new URL(`http://bryntum.com/${testUrl}`),
                pathName = url.pathname,
                idx      = pathName.lastIndexOf('/'),
                testName = pathName.substring(idx + 1),
                testPath = !item.isMonkey ? pathName.substring(1, idx) : item.pageUrl;
            item.title = `${testName}${url.search} ${testPath !== '' ? `[ ${testPath} ]` : ''}`;
        }
    }

    static prepareItem(item, mode) {
        // Update test url and pageUrl for mode
        if (mode !== 'es6') {
            if (item.url && !item.keepUrl) {
                item.url = item.url.replace('.t.js', `.t.${mode}.js`);
            }

            if (item.pageUrl && !item.keepPageUrl && !(mode === 'module' && BryntumTestHelper.isTrial)) {
                // keep querystring also for bundle (works with both url/?develop and url?develop)
                const qs = item.pageUrl.match(/(.*?)(\/*)([?#].*)/);
                if (qs) {
                    item.pageUrl = `${qs[1]}/index.${mode}.html${qs[3]}`;
                }
                else {
                    item.pageUrl += `/index.${mode}.html`;
                }
            }

        }
        this.updateTitle(item, item.url || item.pageUrl);
    }

    static normalizeItem(item, mode) {
        // Apply custom properties for mode or default
        if (item instanceof Object) {
            for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    const val = item[key];
                    if (val && (val[mode] != null || val.default != null)) {
                        item[key] = val[mode] != null ? val[mode] : val.default;
                    }
                }
            }
        }
    }

    static prepareItems(items, mode) {
        items?.map((item, i) => {
            if (item) {
                BryntumTestHelper.normalizeItem(item, mode);

                // Only include es6 specific tests + module tests in PR mode
                if (BryntumTestHelper.isPR) {
                    // Apply group `includeFor` for items inside group
                    if (item.items) {
                        item.items = item.items.filter(child => child).map(child => {
                            if (typeof child === 'string') {
                                child = { url : child };
                            }
                            child.includeFor = child.includeFor || item.includeFor;
                            return child;
                        });
                    }
                    else {
                        item.includeFor = item.includeFor || 'module';
                        if (mode === 'es6' && !item.includeFor.includes('es6') || mode === 'umd') {
                            items[i] = null;
                            return;
                        }
                    }
                }

                // Include for bundle and skip handling
                if (item.skip !== null && item.skip === true ||
                    (item.includeFor?.replace(' ', '').split(',').indexOf(mode) === -1)) {
                    items[i] = null;
                }
                else {
                    // Normalize URL
                    if (typeof item === 'string') {
                        item = items[i] = { url : item };
                    }
                    BryntumTestHelper.prepareItem(items[i], mode);
                    BryntumTestHelper.prepareItems(item.items, mode);

                    // Remove groups with all items excluded
                    if (item.items?.every(item => item == null)) {
                        items[i] = null;
                    }
                }
            }
        });
        return items;
    }

    /**
     * Creates JS script to inject in test
     * @param {String|String[]} content
     * @param {Boolean} isEcmaModule
     * @returns {Object}
     */
    static script = (content, isEcmaModule = true) => {
        content = Array.isArray(content) ? content.join('\n') : content;
        return {
            type : 'js',
            isEcmaModule,
            content
        };
    };

    /**
     * Creates JS script to import modules and places classes on window
     * @param {String[]} modules list of modules
     * @returns {Object}
     */
    static placeOnWindow = modules => {
        const shortName = name => name.match(/\/(\w+)\.js$/)[1];
        return BryntumTestHelper.script([
            ...modules.map(m => `import ${shortName(m)} from '${m}';`),
            ...modules.map(m => `window.${shortName(m)} = ${shortName(m)};`)
        ]);
    };

    static isTC      = /IS_TEAMCITY/.test(location.href);
    static isPR      = /IS_PR/.test(location.href);
    static isTrial   = BryntumTestHelper.detectTrial();
    static isNetCore = BryntumTestHelper.detectNetCore();
    static isWebGL   = BryntumTestHelper.detectWebGL();

    // API locales for tests
    static locales = this.isPR ? ['En', 'Es', 'Nl', 'Ru', 'SvSE'] : [
        'Ar', 'Bg', 'Cs', 'Da', 'De', 'El', 'En', 'EnGb', 'Es', 'Et',
        'Fi', 'FrFr', 'He', 'Hi', 'Hr', 'Hu', 'Id', 'It', 'Ja', 'Ko',
        'Ms', 'Nl', 'No', 'Pl', 'Pt', 'Ro', 'Ru', 'Sk', 'Sl', 'Sr',
        'SvSE', 'Th', 'Tr', 'Vi', 'ZhCn'
    ];

    // Examples locales for tests
    static examplesLocales = ['En', 'Nl', 'Ru', 'SvSE', 'De'];
}

// Set flag for test mode
globalThis.bryntum = { isTestEnv : true };
