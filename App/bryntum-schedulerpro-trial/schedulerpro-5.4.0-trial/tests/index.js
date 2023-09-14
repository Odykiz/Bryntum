const
    Project = new Siesta.Project.Browser(),
    {
        isPR,
        isTC,
        isTrial,
        isWebGL,
        locales,
        examplesLocales,
        script,
        placeOnWindow
    }       = BryntumTestHelper;

Project.configure({
    title                   : document.location.host === 'lh' ? 'Pro' : 'Bryntum Scheduler Pro Test Suite',
    isReadyTimeout          : 30000, // longer for memory profiling which slows things down
    testClass               : BryntumSchedulerProTest,
    runCore                 : 'sequential',
    disableCaching          : false,
    autoCheckGlobals        : false,
    keepResults             : false,
    enableCodeCoverage      : Boolean(window.IstanbulCollector),
    failOnResourceLoadError : true,
    turboMode               : true,
    recorderConfig          : {
        recordOffsets    : false,
        ignoreCssClasses : [
            'b-sch-event-hover',
            'b-active',
            'b-icon',
            'b-hover',
            'b-dirty',
            'b-focused',
            'b-contains-focus'
        ],
        shouldIgnoreDomElementId : id => /^b-/.test(id)
    },

    failKnownBugIn : Project.getQueryParam('failKnownBugIn')
});

const
    getItems                = mode => {
        const
            examples            = [
                {
                    defaultTimeout : 60000,
                    includeFor     : 'module,es6',
                    pageUrl        : '../examples/bigdataset',
                    url            : 'examples/bigdataset.t.js'
                },
                {
                    pageUrl                 : '../examples/conflicts?test',
                    url                     : 'examples/conflicts.t.js',
                    ignoreInputOverflowTest : true
                },
                {
                    pageUrl : '../examples/constraints?test',
                    url     : 'examples/constraints.t.js'
                },
                'custom-layouts',
                {
                    pageUrl : '../examples/dependencies?test',
                    url     : 'examples/dependencies.t.js'
                },
                {
                    pageUrl       : '../examples/drag-batches?test',
                    viewportWidth : 1300,
                    url           : 'examples/drag-batches.t.js'
                },
                'drag-from-grid',
                {
                    pageUrl       : '../examples/drag-unplanned-tasks?test',
                    viewportWidth : 1300,
                    waitSelector  : '.b-sch-timeaxis-cell',
                    url           : 'examples/drag-unplanned-tasks.t.js'
                },
                'effort',
                {
                    pageUrl       : '../examples/embedded-chart?test',
                    url           : 'examples/embedded-chart.t.js',
                    viewportWidth : 1400,
                    includeFor    : 'module,es6'
                }, {
                    pageUrl : '../examples/event-non-working-time?test',
                    url     : 'examples/event-non-working-time.t.js'
                },
                {
                    pageUrl     : '../examples/extjsmodern',
                    keepPageUrl : true
                },
                'grouping',
                {
                    pageUrl       : '../examples/highlight-event-calendars?test',
                    viewportWidth : 1300,
                    url           : 'examples/highlight-event-calendars.t.js'
                },
                {
                    pageUrl       : '../examples/highlight-resource-calendars?test',
                    viewportWidth : 1300,
                    url           : 'examples/highlight-resource-calendars.t.js'
                },
                {
                    pageUrl : '../examples/highlight-time-spans?test',
                    url     : 'examples/highlight-time-spans.t.js'
                },
                {
                    defaultTimeout : 30000,
                    pageUrl        : '../examples/inline-data',
                    url            : 'examples/inline-data.t.js'
                },
                {
                    pageUrl : '../examples/localization?test&reset',
                    url     : 'examples/localization.t.js'
                },
                {
                    pageUrl                : '../examples/maps?test',
                    viewportWidth          : 1300,
                    disableNoTimeoutsCheck : true,
                    url                    : 'examples/maps.t.js',
                    skip                   : !isWebGL || isPR,
                    defaultTimeout         : 60000,
                    subTestTimeout         : 60000,
                    waitForTimeout         : 30000
                },
                {
                    pageUrl : '../examples/nested-events',
                    url     : 'examples/nested-events.t.js'
                },
                {
                    pageUrl : '../examples/nested-events-configuration?test',
                    url     : 'examples/nested-events-configuration.t.js'
                },
                'nested-events-deep',
                {
                    pageUrl : '../examples/nested-events-drag-from-grid?test',
                    url     : 'examples/nested-events-drag-from-grid.t.js'
                },
                {
                    pageUrl : '../examples/non-working-time',
                    url     : 'examples/non-working-time.t.js'
                },
                'percent-done',
                'recurrence',
                {
                    pageUrl : '../examples/resource-non-working-time?test',
                    url     : 'examples/resource-non-working-time.t.js'
                },
                {
                    pageUrl : '../examples/resourcehistogram',
                    url     : 'examples/resourcehistogram.t.js'
                },
                'resourceutilization',
                {
                    // Skip testing. Config is here for sanity checks
                    pageUrl : '../examples/salesforce',
                    skip    : true
                },
                'split-events',
                {
                    pageUrl : '../examples/taskeditor',
                    url     : 'examples/taskeditor.t.js'
                },
                {
                    pageUrl        : '../examples/timeline',
                    viewportHeight : 500,
                    url            : 'examples/timeline.t.js'
                },
                {
                    pageUrl     : '../examples/timezone?test',
                    consoleFail : ['error']
                },
                {
                    pageUrl                : '../examples/travel-time',
                    url                    : 'examples/travel-time.t.js',
                    disableNoTimeoutsCheck : true
                },
                {
                    // Disable preloading module bundle for examples tests. Required for `bryntum.query(...)`
                    alsoPreload : [],
                    pageUrl     : '../examples/webcomponents/?test',
                    url         : 'examples/webcomponents.t.js',
                    keepPageUrl : mode === 'umd',
                    includeFor  : 'module,umd'
                },
                'weekends'
            ],

            examplesScheduler   = [
                'animations',
                'basic',
                'bigdataset',
                'bigdataset-vertical',
                'columns',
                'configuration',
                //'crudmanager',
                //'csp',
                'customeventstyling',
                'dependencies',
                'drag-between-schedulers',
                'drag-onto-tasks',
                'dragfromgrid',
                'dragselection',
                //'esmodule',
                'eventeditor',
                'eventeditor-combos',
                'eventmenu',
                'eventstyles',
                'export',
                'exporttoexcel',
                {
                    pageUrl     : 'extjsmodern',
                    keepPageUrl : true
                },
                'fillticks',
                'filtering',
                'grouping',
                'groupsummary',
                'histogramsummary',
                'icons',
                'labels',
                'layouts',
                // 'localization', (Scheduler Pro has its own example)
                'milestonelayout',
                'multiassign',
                'multiassign-with-dependencies',
                'multisummary',
                'nestedevents',
                'partners',
                'php',
                'recurrence',
                'recurringtimeranges',
                'resourcetimeranges',
                'responsive',
                'rough',
                'rowheight',
                //'salesforce',
                {
                    pageUrl     : 'scripttag',
                    keepPageUrl : true
                },
                'scrollto',
                'simpleeditor',
                'summary',
                'tasks',
                'theme',
                'timeaxis',
                'timeranges',
                'timeresolution',
                'tooltips',
                'tree',
                'undoredo',
                'validation',
                'vertical',
                {
                    pageUrl      : '../examples-scheduler/websockets?test',
                    waitSelector : '.b-scheduler'
                },
                'workingtime'
            ],

            frameworks          = [

                // ANGULAR

                'angular/angular-11',
                'angular/conflicts',
                {
                    pageUrl : 'angular/inline-data',
                    url     : 'angular/angular-inline-data.t.js'
                },
                {
                    pageUrl : 'angular/nested-events-configuration',
                    url     : 'angular/angular-nested-events-configuration.t.js'
                },
                'angular/non-working-time',
                'angular/resource-histogram',
                {
                    pageUrl     : 'angular/timezone',
                    url         : 'angular/angular-timezone.t.js',
                    consoleFail : ['error']
                },
                {
                    pageUrl    : 'angular/resource-histogram',
                    url        : 'angular/angular-resource-histogram.t.js',
                    skipMonkey : true,
                    // Firefox report incorrect scaled svg size
                    // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
                    // The sub-test asserts coordinates so cannot be used in FF
                    skip       : bowser.firefox
                },
                'angular/taskeditor',

                // REACT - JAVASCRIPT

                'react/javascript/conflicts',
                {
                    pageUrl       : 'react/javascript/drag-batches',
                    viewportWidth : 1300,
                    url           : 'react/react-drag-batches.t.js'
                },
                {
                    pageUrl : 'react/javascript/highlight-time-spans',
                    url     : 'react/react-highlight-time-spans.t.js'
                },

                {
                    pageUrl : 'react/javascript/inline-data',
                    url     : 'react/react-inline-data.t.js'
                },
                'react/javascript/non-working-time',
                'react/javascript/resource-histogram',
                'react/javascript/test-cra',
                'react/javascript/timeline',

                // REACT - TYPESCRIPT

                {
                    pageUrl : 'react/typescript/basic',
                    url     : 'react/react-typescript-basic.t.js'
                },
                'react/typescript/test-cra',

                // REACT - VITE

                'react-vite/taskeditor',

                // VUE

                'vue/javascript/resource-histogram',
                'vue/javascript/vue-renderer',

                // VUE 3

                'vue-3/javascript/conflicts',
                {
                    pageUrl : 'vue-3/javascript/inline-data',
                    url     : 'vue-3/vue-3-inline-data.t.js'
                },
                'vue-3/javascript/non-working-time',
                {
                    pageUrl : 'vue-3/javascript/resource-histogram',
                    url     : 'vue-3/vue-3-resource-histogram.t.js'
                },

                // VUE 3 - VITE

                'vue-3-vite/taskeditor',

                // WEBPACK

                {
                    pageUrl : 'webpack',
                    url     : 'webpack.t.js'
                }
            ],

            frameworksScheduler = [
                'angular/advanced',
                'angular/angular-11-routing',
                'angular/animations',
                'angular/basic',
                'angular/columns',
                'angular/custom-event-editor',
                'angular/dependencies',
                'angular/drag-between-schedulers',
                'angular/drag-from-grid',
                'angular/drag-onto-tasks',
                'angular/filtering',
                'angular/localization',
                'angular/pdf-export',
                'angular/recurring-events',
                'angular/recurring-timeranges',
                'angular/simpleeditor',
                'angular/tasks',
                'ionic/ionic-4',
                'ionic/themes',
                'react/javascript/advanced',
                'react/javascript/animations',
                'react/javascript/columns',
                'react/javascript/custom-event-editor',
                'react/javascript/dependencies',
                'react/javascript/drag-between-schedulers',
                'react/javascript/drag-from-grid',
                'react/javascript/drag-onto-tasks',
                'react/javascript/filtering',
                'react/javascript/localization',
                'react/javascript/pdf-export',
                'react/javascript/react-events',
                'react/javascript/react-state',
                'react/javascript/react-tooltips',
                'react/javascript/simple',
                'react/javascript/simpleeditor',
                'react/javascript/vertical',
                'react/typescript/basic',
                'react/typescript/drag-from-grid',
                'react/typescript/filtering',
                'react/typescript/recurring-events',
                'react/typescript/recurring-timeranges',
                'vue/javascript/advanced',
                'vue/javascript/animations',
                'vue/javascript/custom-event-editor',
                'vue/javascript/dependencies',
                'vue/javascript/drag-between-schedulers',
                'vue/javascript/drag-from-grid',
                'vue/javascript/drag-onto-tasks',
                'vue/javascript/localization',
                'vue/javascript/pdf-export',
                'vue/javascript/simple',
                'vue/javascript/tasks',
                'vue/javascript/vue-renderer',
                'vue/javascript/vuestic',
                'vue-3/javascript/columns',
                'vue-3/javascript/simple',
                'vue-3/javascript/simpleeditor',
                'webpack'
            ],
            items               = [
                {
                    group : 'Column',
                    items : [
                        'column/ResourceInfoColumn.t.js'
                    ]
                },
                {
                    group   : 'Combination',
                    skip    : isPR,
                    // Don't pull in any classes from sources or bundles
                    preload : [
                        '../build/thin/core.stockholm.thin.css',
                        '../build/thin/grid.stockholm.thin.css',
                        '../build/thin/scheduler.stockholm.thin.css',
                        '../build/thin/schedulerpro.stockholm.thin.css'
                    ],
                    includeFor : 'module',
                    items      : [
                        {
                            url         : 'combination/thin-all.t.js',
                            keepUrl     : true,
                            alsoPreload : [
                                '../build/thin/gantt.stockholm.thin.css',
                                '../build/thin/calendar.stockholm.thin.css',
                                '../build/thin/taskboard.stockholm.thin.css'
                            ]
                        },
                        {
                            url         : 'combination/thin-schedulerpro-calendar.t.js',
                            keepUrl     : true,
                            alsoPreload : [
                                '../build/thin/calendar.stockholm.thin.css'
                            ]
                        },
                        {
                            url         : 'combination/thin-schedulerpro-gantt.t.js',
                            keepUrl     : true,
                            alsoPreload : [
                                '../build/thin/gantt.stockholm.thin.css'
                            ]
                        },
                        {
                            url     : 'combination/thin-schedulerpro-grid.t.js',
                            keepUrl : true
                        },
                        {
                            url     : 'combination/thin-schedulerpro-scheduler.t.js',
                            keepUrl : true
                        },
                        {
                            url         : 'combination/thin-schedulerpro-taskboard.t.js',
                            keepUrl     : true,
                            alsoPreload : [
                                '../build/thin/taskboard.stockholm.thin.css'
                            ]
                        }
                    ]
                },
                {
                    group                  : 'Docs',
                    pageUrl                : '../docs/',
                    includeFor             : isTrial ? 'module,umd' : 'es6',
                    keepPageUrl            : true,
                    subTestTimeout         : 120000,
                    defaultTimeout         : 240000,
                    waitForTimeout         : 10000,
                    disableNoTimeoutsCheck : true,
                    alsoPreload            : bowser.firefox && preloadNoResizeObserver,
                    viewportHeight         : 500,
                    viewportWidth          : 1500,
                    items                  : [
                        {
                            isPR,
                            url            : 'docs/open-all-links.t.js',
                            subTestTimeout : 600000,
                            waitForTimeout : 20000,
                            ignoreTopics   : [
                                'demos',
                                'engineDocs'
                            ],
                            ignoreLinks   : [],
                            ignoreClasses : [
                                'guides/calendars.md',
                                'guides/project_data.md'
                            ],
                            products               : ['SchedulerPro'],
                            docsTitle              : 'Bryntum Scheduler Pro',
                            disableNoTimeoutsCheck : true
                        },
                        {
                            url                    : 'docs/verify-links-in-guides.t.js',
                            subTestTimeout         : 240000,
                            waitForTimeout         : 20000,
                            disableNoTimeoutsCheck : true,
                            ignoreLinks            : []
                        },
                        
                    ]
                },

                {
                    group : 'Crud manager',
                    items : [
                        'crud-manager/api.t.js',
                        'crud-manager/mask.t.js',
                        {
                            url                     : 'crud-manager/16_auto_sync_error.t.js',
                            allowedConsoleMessageRe : /CrudManager error while auto-syncing the data/
                        },
                        'crud-manager/syncDataOnLoad.t.js',
                        'crud-manager/sync_stm.t.js',
                        'crud-manager/sync.t.js',
                        'crud-manager/data_load.t.js'
                    ]
                },
                {
                    group : 'Data',
                    items : [
                        'data/AssignmentStore.t.js',
                        'data/EventStore.t.js',
                        'data/EventStorePerformance.t.js',
                        'data/ModelLink.t.js',
                        'data/ProjectSyncDataOnLoad.t.js',
                        'data/ResourceStore.t.js',
                        'data/StateTrackingManagerSegments.t.js',
                        'data/UndoRedo.t.js'
                    ]
                },
                {
                    group : 'Features',
                    items : [
                        'features/EventBuffer.t.js',
                        'features/EventBufferFeatures.t.js',
                        'features/EventBufferFilteredAxis.t.js',
                        'features/EventBufferVertical.t.js',
                        'features/CalendarHighlight.t.js',
                        'features/CellEdit.t.js',
                        'features/Dependencies.t.js',
                        'features/DependencyEdit.t.js',
                        'features/EventColorMenu.t.js',
                        'features/EventContextMenu.t.js',
                        'features/EventCopyPaste.t.js',
                        'features/EventDragBetweenSchedulers.t.js',
                        'features/EventDragCopy.t.js',
                        'features/EventDragCreate.t.js',
                        'features/EventDragPro.t.js',
                        'features/EventMenuPro.t.js',
                        'features/EventNonWorkingTime.t.js',
                        'features/EventResizePro.t.js',
                        'features/EventSegmentResize.t.js',
                        'features/EventSegments.t.js',
                        'features/EventSelection.t.js',
                        'features/Filter.t.js',
                        'features/Group.t.js',
                        'features/GroupSummary.t.js',
                        'features/NestedEvents.t.js',
                        'features/NestedEventsCRUD.t.js',
                        'features/NestedEventsDeeper.t.js',
                        'features/NestedEventsDependencies.t.js',
                        'features/NestedEventsDrag.t.js',
                        'features/NestedEventsEdit.t.js',
                        'features/NestedEventsResize.t.js',
                        'features/NestedEventsVertical.t.js',
                        'features/NonWorkingTime.t.js',
                        'features/SplitFeatures.t.js',
                        'features/PercentBar.t.js',
                        'features/RecurringEvents.t.js',
                        'features/RecurringEventsDrag.t.js',
                        'features/RecurringEventsEdit.t.js',
                        'features/RecurringEventsEditRecurrence.t.js',
                        'features/RecurringEventsResize.t.js',
                        'features/ResourceNonWorkingTime.t.js',
                        'features/RowReorder.t.js',
                        'features/Summary.t.js',
                        {
                            url            : 'features/TaskEdit.t.js',
                            alsoPreload    : preloadLocales,
                            defaultTimeout : 90000
                        },
                        'features/TimeSpanHighlight.t.js',
                        {
                            url         : 'features/TimeZone.t.js',
                            consoleFail : ['error']
                        },
                        'features/TreeGroup.t.js'
                    ]
                },
                {
                    group       : 'Localization',
                    alsoPreload : preloadLocales,
                    notUsedList : [
                        'BaseDependencyResolution.descriptionTpl',
                        'BaseEmptyCalendarEffectResolution.descriptionTpl',
                        'ConstraintIntervalDescription.descriptionTpl',
                        'DisableManuallyScheduledConflictResolution',
                        'ManuallyScheduledParentConstraintIntervalDescription',
                        'ProjectConstraintIntervalDescription'
                    ],
                    items : [
                        
                    ]
                },
                {
                    group : 'Model',
                    items : [
                        'model/changelog/ChangeLogTransactionModel.t.js'
                    ]
                },
                
                {
                    group : 'Pro',
                    items : [
                        {
                            group : 'Event layout',
                            items : [
                                'pro/eventlayout/Horizontal.t.js',
                                'pro/eventlayout/HorizontalLayoutFn.t.js'
                            ]
                        },
                        {
                            group : 'Model',
                            items : [
                                'pro/model/EventModel.t.js',
                                'pro/model/CalendarModel.t.js',
                                'pro/model/ProjectModel.t.js',
                                'pro/model/ProjectModelChange.t.js',
                                'pro/model/ProjectModelUsages.t.js'
                            ]
                        },
                        {
                            group : 'Dependencies',
                            items : [

                                {
                                    url      : 'pro/dependencies/Create-Async.t.js',
                                    speedRun : false
                                },
                                'pro/dependencies/LinkingTwoNewEvents.t.js'
                            ]
                        },
                        {
                            group : 'Effects',
                            items : [
                                'pro/effects/01_empty_calendar.t.js',
                                'pro/effects/02_conflict.t.js',
                                'pro/effects/03_cycle.t.js',
                                'pro/effects/04_cycle.t.js',
                                'pro/effects/05_cycle.t.js',
                                'pro/effects/10_handling.t.js'
                            ]
                        },
                        {
                            group : 'Task edit',
                            items : [
                                'pro/taskedit/cancel_task_creation.t.js',
                                'pro/taskedit/constraint_date.t.js',
                                'pro/taskedit/haschanges_event.t.js',
                                'pro/taskedit/revert_changes.t.js',
                                'pro/taskedit/start_end_dates.t.js',
                                'pro/taskedit/taskedit_sanity.t.js',
                                'pro/taskedit/unassign.t.js'
                            ]
                        },
                        {
                            group : 'View',
                            items : [
                                {
                                    group : 'DST',
                                    items : [
                                        'pro/view/dst/EventRendering.t.js'
                                    ]
                                },
                                {
                                    group : 'mixin',
                                    items : [
                                        'pro/view/mixin/ProjectProgressMixin.t.js'
                                    ]
                                },
                                'pro/view/DestroyCleanup.t.js',
                                'pro/view/SchedulerPro.t.js',
                                'pro/view/SchedulerProEventRendering.t.js',
                                'pro/view/SchedulerProState.t.js',
                                'pro/view/SchedulerProVertical.t.js',
                                'pro/view/EventUnassign.t.js',
                                'pro/view/ResourceHistogram.t.js',
                                'pro/view/ResourceHistogramConfigs.t.js',
                                'pro/view/ResourceHistogramLoadData.t.js',
                                {
                                    url                    : 'pro/view/ResourceHistogramZoom.t.js',
                                    disableNoTimeoutsCheck : true
                                },
                                'pro/view/ResourceHistogramZoom2.t.js',
                                'pro/view/ResourceHistogramSetTimeSpan.t.js',
                                'pro/view/ResourceHistogramGrouping.t.js',
                                'pro/view/ResourceHistogramGroupingConfigs.t.js',
                                {
                                    url        : 'pro/view/WebComponent.t.js',
                                    includeFor : isTrial ? 'module,umd' : 'es6'
                                },
                                'pro/view/ResourceUtilization.t.js',
                                'pro/view/ResourceUtilizationCalendars.t.js',
                                'pro/view/ResourceUtilizationTreeGroup.t.js'
                            ]
                        },
                        {
                            group : 'Crud Manager',
                            items : [
                                'pro/crud_manager/12_mask.t.js'
                            ]
                        },
                        {
                            group : 'Widget',
                            items : [
                                'pro/widget/ActionColumn.t.js',
                                'pro/widget/EndDateField.t.js',
                                'pro/widget/StartDateField.t.js',
                                'pro/widget/Timeline.t.js',
                                'pro/widget/ViewPresetCombo.t.js'
                            ]
                        },
                        {
                            group : 'XSS',
                            skip  : !bowser.chrome,
                            items : [
                                'xss/ResourceHistogramXSS.t.js',
                                'xss/SchedulerProXSS.t.js'
                            ]
                        },
                        'pro/001_scheduler_w_project.t.js',
                        'pro/002_drag_create.t.js',
                        'pro/003_drag_drop_reassign.t.js',
                        'pro/004_project_initial_commit.t.js',
                        'pro/005_calendars.dst.t.js'
                    ]
                },
                {
                    group : 'Engine',
                    items : [
                        {
                            includeFor : 'module,umd',
                            url        : 'engine/engine-export.t.js'
                        }
                    ]
                },
                {
                    group          : 'Examples browser',
                    subTestTimeout : 120000,
                    defaultTimeout : 120000,
                    waitForTimeout : 60000,
                    items          : [
                        {
                            pageUrl                        : '../examples/?theme=material&test',
                            url                            : 'examples/browser/examplebrowser.t.js',
                            enablePageRedirect             : true,
                            exampleName                    : 'grouping',
                            exampleTitle                   : 'Pro Grouping demo',
                            offlineExampleName             : 'frameworks-webpack',
                            jumpSectionName                : 'Features',
                            jumpExampleName                : 'conflicts',
                            filterText                     : 'group',
                            filterCount                    : 3,
                            disableWaitingForCSSAnimations : true
                        },
                        {
                            pageUrl         : '../examples/?online&test',
                            url             : 'examples/browser/examplebrowser-links.t.js',
                            isPR,
                            isTrial,
                            config          : { skipSanityChecks : true },
                            skipHeaderCheck : [
                                'esmodule',
                                'scripttag',
                                'frameworks-vue-javascript-localization'
                            ],
                            skipTrialCheck : [
                                'csp',
                                'extjsmodern',
                                'frameworks-vue-javascript-vuestic',
                                'esmodule',
                                'scripttag'
                            ],
                            skipTestSizeCheck : [
                                'examples-scheduler-infinite-scroll'
                            ],
                            enablePageRedirect     : true,
                            defaultTimeout         : 480000,
                            // Demo browser opens module demos even if opened as umd when not run on an ancient
                            // browser (which we do not support), so no point in running this test for umd
                            includeFor             : 'es6',
                            disableNoTimeoutsCheck : true,
                            popups                 : {
                                'example-taskedit' : '.b-taskeditor button.b-popup-close'
                            }
                        }
                    ]
                },
                {
                    group       : 'Examples',
                    // Allow modules examples tests use helper classes from bundle published on window. Umd is published from namespace
                    alsoPreload : mode === 'module' ? script(
                        `import * as Module from "../../build/schedulerpro.module.js";Object.assign(window, Module);`
                    ) : undefined,
                    // Filter out examples used for monkey tests only
                    items : examples.filter(example => example?.pageUrl != null && example?.url != null)
                },
                {
                    group : 'Monkey Tests for Examples',
                    items : BryntumTestHelper.prepareMonkeyTests({
                        items  : examples,
                        mode,
                        config : {
                            webComponent   : 'bryntum-schedulerpro',
                            waitSelector   : '.b-sch-event',
                            targetSelector : '.b-schedulerprobase',
                            skipTargets    : ['.b-resourceinfo-cell']
                        }
                    })
                },
                {
                    group : 'Smart Monkey Tests for Examples',
                    items : BryntumTestHelper.prepareMonkeyTests({
                        items : [
                            ...examples,
                            { pageUrl : '../examples', waitSelector : '.image' }
                        ],
                        mode,
                        smartMonkeys : true,
                        config       : {
                            webComponent   : 'bryntum-schedulerpro',
                            waitSelector   : '.b-sch-event',
                            targetSelector : '.b-schedulerprobase',
                            skipTargets    : ['.b-resourceinfo-cell'],
                            consoleFail    : ['error']
                        }
                    })
                },
                {
                    group : 'Monkey tests for Examples (Scheduler)',
                    items : BryntumTestHelper.prepareMonkeyTests({
                        items        : examplesScheduler,
                        mode,
                        examplesRoot : '../examples-scheduler',
                        config       : {
                            webComponent   : 'bryntum-grid',
                            waitSelector   : '.b-sch-event',
                            targetSelector : '.b-schedulerbase',
                            skipTargets    : ['.b-resourceinfo-cell']
                        }
                    })
                },
                {
                    group      : 'Frameworks examples (npm build)',
                    includeFor : 'umd',
                    skip       : !(isTrial && bowser.chrome),
                    items      : [
                        'examples/frameworks-build.t.js'
                    ]
                },
                {
                    group      : 'Examples tests sanity',
                    includeFor : 'es6',
                    skip       : !bowser.chrome,
                    items      : [
                        'examples/examples-missing-tests.t.js'
                    ]
                },
                {
                    group          : 'Frameworks',
                    consoleFail    : ['error', 'warn'],
                    includeFor     : isTrial ? 'module,umd' : 'es6',
                    config         : { skipSanityChecks : true },
                    subTestTimeout : 120000,
                    defaultTimeout : 120000,
                    skip           : isTC && !isTrial,
                    items          : [
                        {
                            group : 'Frameworks examples',
                            items : BryntumTestHelper.prepareFrameworkTests(frameworks)
                        },
                        {
                            group : 'Monkey tests for Frameworks examples',
                            items : BryntumTestHelper.prepareFrameworkMonkeyTests({
                                items  : frameworks,
                                config : {
                                    waitSelector   : '.b-sch-event',
                                    targetSelector : '.b-schedulerprobase',
                                    skipTargets    : ['.b-resourceinfo-cell']
                                }
                            })
                        },
                        {
                            group : 'Smart Monkey tests for Frameworks examples',
                            items : BryntumTestHelper.prepareFrameworkMonkeyTests({
                                items        : frameworks,
                                smartMonkeys : true,
                                config       : {
                                    waitSelector   : '.b-sch-event',
                                    targetSelector : '.b-schedulerprobase',
                                    skipTargets    : ['.b-resourceinfo-cell']
                                }
                            })
                        },
                        {
                            group : 'Monkey tests for Frameworks examples (Scheduler)',
                            items : BryntumTestHelper.prepareFrameworkMonkeyTests(
                                {
                                    items        : frameworksScheduler,
                                    examplesRoot : '../examples-scheduler/frameworks',
                                    config       : {
                                        waitSelector   : '.b-sch-event',
                                        targetSelector : '.b-schedulerbase',
                                        skipTargets    : ['.b-resourceinfo-cell']
                                    }
                                })
                        }
                    ]
                }

            ];

        return BryntumTestHelper.prepareItems(items, mode);
    },
    // Preloads for tests. Usage example: alsoPreload : [preloadName]
    preloadFont             = {
        // want size to be as equal as possible on different platforms
        type    : 'css',
        content : 'body, button { font-family: Arial, Helvetica, sans-serif;  font-size: 14px; }'
    },
    preloadLocales          = {
        umd     : locales.map(l => `../build/locales/schedulerpro.locale.${l}.js`),
        default : script(locales.map(l => `import "../lib/SchedulerPro/localization/${l}.js";`))
    },
    preloadNoResizeObserver = {
        type    : 'js',
        content : 'window.ResizeObserver = null; window.onerror = function(err) { return /ResizeObserver/.test(err);};'
    },
    preloadTurbo            = {
        // To allow classes to have different config values in test execution
        type    : 'js',
        content : 'window.__applyTestConfigs = ' + String(Project.turboMode) + ';'
    },
    preloadCss              = '../build/schedulerpro.classic.css',
    preloads                = [
        preloadCss,
        preloadFont,
        preloadTurbo
    ],
    groups                  = [];



groups.push({
    group   : 'Using module bundle',
    preload : [
        ...preloads,
        script(`
            import * as Module from "../build/${isPR ? 'schedulerpro.module.min.js' : 'schedulerpro.module.js'}";
            Object.assign(window, Module);
        `)
    ],
    isEcmaModule : true,
    collapsed    : true,
    mode         : 'module',
    items        : getItems('module')
});

groups.push({
    group   : 'Using umd bundle',
    preload : [
        ...preloads,
        isTrial ? '../build/schedulerpro.umd.js' : '../build/schedulerpro.umd.min.js'
    ],
    isEcmaModule : false,
    mode         : 'umd',
    items        : getItems('umd')
});

groups.forEach(group => group.product = 'schedulerpro');

Project.start(groups);
