<h1 class="title-with-image"><img src="Core/logo/vue.svg"
alt="Bryntum Scheduler Pro supports Vue"/>Using Bryntum Scheduler Pro with Vue</h1>

## Bryntum NPM repository access

Please refer to this [guide for Bryntum NPM repository access](#SchedulerPro/guides/npm-repository.md).

## Bryntum Scheduler Pro

Bryntum Scheduler Pro itself is framework agnostic, but it ships with demos and wrappers to simplify using it with popular
frameworks such as Vue. The purpose of this guide is to give a basic introduction on how to use Bryntum Scheduler Pro with Vue.

## View online demos

Bryntum Scheduler Pro Vue demos can be viewed in our
[online example browser](https://bryntum.com/products/schedulerpro/examples/?framework=vue).

## Build and run local demos

Download distribution zip with demos according to this [guide](#SchedulerPro/guides/download.md#distribution).

Vue demos are located in **examples/frameworks/vue** and **examples/frameworks/vue-3** folders inside distribution zip.

Distribution zip also contains Scheduler examples which are located in **examples-scheduler/frameworks/vue** and
**examples-scheduler/frameworks/vue-3** folders.

Each demo contains bundled `README.md` file in demo folder with build and run instructions.

To view and run an example locally in development mode, you can use the following commands:

```shell
$ npm install
$ npm run start
```

That starts a local server accessible at [http://127.0.0.1:8080](http://127.0.0.1:8080). If you modify the example code
while running it locally it is automatically rebuilt and updated in the browser allowing you to see your changes
immediately.

The production version of an example, or your application, is built by running:

```shell
$ npm install
$ npm run build
```

## TypeScript and Typings

Bryntum bundles ship with typings for the classes for usage in TypeScript applications. You can find `schedulerpro*.d.ts`
files in the `build` folder inside the distribution zip package. The definitions also contain a special config type
which can be passed to the class constructor.

The config specific types are also accepted by multiple other properties and functions, for example
the [Store.data](#Core/data/Store#config-data) config of the `Store` which accepts type `Partial<ModelConfig>[]`.

Sample code for tree store creation with `ModelConfig` and `StoreConfig` classes:

```typescript
import { Store, StoreConfig, ModelConfig } from '@bryntum/schedulerpro';

const storeConfig: Partial<StoreConfig> = {
    tree : true,
    data : [
        {
            id       : 1,
            children : [
                {
                    id : 2
                }
            ] as Partial<ModelConfig>[]
        }
    ] as Partial<ModelConfig>[]
};

new Store(storeConfig);
```

## Wrappers

The Vue wrappers encapsulate Bryntum Scheduler Pro and other Bryntum widgets in Vue components that expose
configuration options, properties, features and events. The wrapped all Bryntum UI components so they can be used the
usual Vue way.

To use native API package classes with wrappers import them from `@bryntum/schedulerpro`.

```javascript
import { SchedulerPro } from '@bryntum/schedulerpro';
```

### Installing the wrappers package

The wrappers are distributed as a separate package `@bryntum/schedulerpro-vue` that is installed according to the used
package manager. Please refer to this [guide for Bryntum NPM repository access](#SchedulerPro/guides/npm-repository.md).

### Wrappers Overview

Wrappers are Vue components which provide full access to Bryntum API widget class configs, properties, events and
features. Each Wrapper has it's own HTML tag which can be used in vue templates. This is the list of available
wrappers for Bryntum Scheduler Pro Vue package:

| Wrapper tag name | API widget reference |
|------------------|----------------------|
| &lt;bryntum-button/&gt; | [Button](#Core/widget/Button) |
| &lt;bryntum-button-group/&gt; | [ButtonGroup](#Core/widget/ButtonGroup) |
| &lt;bryntum-calendar-field/&gt; | [CalendarField](#SchedulerPro/widget/CalendarField) |
| &lt;bryntum-checkbox/&gt; | [Checkbox](#Core/widget/Checkbox) |
| &lt;bryntum-chip-view/&gt; | [ChipView](#Core/widget/ChipView) |
| &lt;bryntum-color-field/&gt; | [ColorField](#Core/widget/ColorField) |
| &lt;bryntum-color-picker/&gt; | [ColorPicker](#Core/widget/ColorPicker) |
| &lt;bryntum-combo/&gt; | [Combo](#Core/widget/Combo) |
| &lt;bryntum-constraint-type-picker/&gt; | [ConstraintTypePicker](#SchedulerPro/widget/ConstraintTypePicker) |
| &lt;bryntum-container/&gt; | [Container](#Core/widget/Container) |
| &lt;bryntum-cycle-resolution-popup/&gt; | [CycleResolutionPopup](#SchedulerPro/widget/CycleResolutionPopup) |
| &lt;bryntum-date-field/&gt; | [DateField](#Core/widget/DateField) |
| &lt;bryntum-date-picker/&gt; | [DatePicker](#Core/widget/DatePicker) |
| &lt;bryntum-date-time-field/&gt; | [DateTimeField](#Core/widget/DateTimeField) |
| &lt;bryntum-dependency-type-picker/&gt; | [DependencyTypePicker](#SchedulerPro/widget/DependencyTypePicker) |
| &lt;bryntum-display-field/&gt; | [DisplayField](#Core/widget/DisplayField) |
| &lt;bryntum-duration-field/&gt; | [DurationField](#Core/widget/DurationField) |
| &lt;bryntum-effort-field/&gt; | [EffortField](#SchedulerPro/widget/EffortField) |
| &lt;bryntum-end-date-field/&gt; | [EndDateField](#SchedulerPro/widget/EndDateField) |
| &lt;bryntum-event-color-field/&gt; | [EventColorField](#Scheduler/widget/EventColorField) |
| &lt;bryntum-event-color-picker/&gt; | [EventColorPicker](#Scheduler/widget/EventColorPicker) |
| &lt;bryntum-field-filter-picker/&gt; | [FieldFilterPicker](#Core/widget/FieldFilterPicker) |
| &lt;bryntum-field-filter-picker-group/&gt; | [FieldFilterPickerGroup](#Core/widget/FieldFilterPickerGroup) |
| &lt;bryntum-file-field/&gt; | [FileField](#Core/widget/FileField) |
| &lt;bryntum-file-picker/&gt; | [FilePicker](#Core/widget/FilePicker) |
| &lt;bryntum-filter-field/&gt; | [FilterField](#Core/widget/FilterField) |
| &lt;bryntum-gantt-task-editor/&gt; | [GanttTaskEditor](#SchedulerPro/widget/GanttTaskEditor) |
| &lt;bryntum-grid/&gt; | [Grid](#Grid/view/Grid) |
| &lt;bryntum-grid-base/&gt; | [GridBase](#Grid/view/GridBase) |
| &lt;bryntum-grid-field-filter-picker/&gt; | [GridFieldFilterPicker](#Grid/widget/GridFieldFilterPicker) |
| &lt;bryntum-grid-field-filter-picker-group/&gt; | [GridFieldFilterPickerGroup](#Grid/widget/GridFieldFilterPickerGroup) |
| &lt;bryntum-group-bar/&gt; | [GroupBar](#Grid/widget/GroupBar) |
| &lt;bryntum-list/&gt; | [List](#Core/widget/List) |
| &lt;bryntum-menu/&gt; | [Menu](#Core/widget/Menu) |
| &lt;bryntum-model-combo/&gt; | [ModelCombo](#SchedulerPro/widget/ModelCombo) |
| &lt;bryntum-number-field/&gt; | [NumberField](#Core/widget/NumberField) |
| &lt;bryntum-paging-toolbar/&gt; | [PagingToolbar](#Core/widget/PagingToolbar) |
| &lt;bryntum-panel/&gt; | [Panel](#Core/widget/Panel) |
| &lt;bryntum-password-field/&gt; | [PasswordField](#Core/widget/PasswordField) |
| &lt;bryntum-project-combo/&gt; | [ProjectCombo](#Scheduler/widget/ProjectCombo) |
| &lt;bryntum-radio/&gt; | [Radio](#Core/widget/Radio) |
| &lt;bryntum-radio-group/&gt; | [RadioGroup](#Core/widget/RadioGroup) |
| &lt;bryntum-resource-combo/&gt; | [ResourceCombo](#Scheduler/widget/ResourceCombo) |
| &lt;bryntum-resource-filter/&gt; | [ResourceFilter](#Scheduler/widget/ResourceFilter) |
| &lt;bryntum-resource-histogram/&gt; | [ResourceHistogram](#SchedulerPro/view/ResourceHistogram) |
| &lt;bryntum-resource-utilization/&gt; | [ResourceUtilization](#SchedulerPro/view/ResourceUtilization) |
| &lt;bryntum-scheduler/&gt; | [Scheduler](#Scheduler/view/Scheduler) |
| &lt;bryntum-scheduler-base/&gt; | [SchedulerBase](#Scheduler/view/SchedulerBase) |
| &lt;bryntum-scheduler-date-picker/&gt; | [SchedulerDatePicker](#Scheduler/widget/SchedulerDatePicker) |
| &lt;bryntum-scheduler-pro/&gt; | [SchedulerPro](#SchedulerPro/view/SchedulerPro) |
| &lt;bryntum-scheduler-pro-base/&gt; | [SchedulerProBase](#SchedulerPro/view/SchedulerProBase) |
| &lt;bryntum-scheduler-task-editor/&gt; | [SchedulerTaskEditor](#SchedulerPro/widget/SchedulerTaskEditor) |
| &lt;bryntum-scheduling-direction-picker/&gt; | [SchedulingDirectionPicker](#SchedulerPro/widget/SchedulingDirectionPicker) |
| &lt;bryntum-scheduling-issue-resolution-popup/&gt; | [SchedulingIssueResolutionPopup](#SchedulerPro/widget/SchedulingIssueResolutionPopup) |
| &lt;bryntum-scheduling-mode-picker/&gt; | [SchedulingModePicker](#SchedulerPro/widget/SchedulingModePicker) |
| &lt;bryntum-slider/&gt; | [Slider](#Core/widget/Slider) |
| &lt;bryntum-slide-toggle/&gt; | [SlideToggle](#Core/widget/SlideToggle) |
| &lt;bryntum-splitter/&gt; | [Splitter](#Core/widget/Splitter) |
| &lt;bryntum-start-date-field/&gt; | [StartDateField](#SchedulerPro/widget/StartDateField) |
| &lt;bryntum-tab-panel/&gt; | [TabPanel](#Core/widget/TabPanel) |
| &lt;bryntum-text-area-field/&gt; | [TextAreaField](#Core/widget/TextAreaField) |
| &lt;bryntum-text-area-picker-field/&gt; | [TextAreaPickerField](#Core/widget/TextAreaPickerField) |
| &lt;bryntum-text-field/&gt; | [TextField](#Core/widget/TextField) |
| &lt;bryntum-time-field/&gt; | [TimeField](#Core/widget/TimeField) |
| &lt;bryntum-timeline/&gt; | [Timeline](#SchedulerPro/widget/Timeline) |
| &lt;bryntum-time-picker/&gt; | [TimePicker](#Core/widget/TimePicker) |
| &lt;bryntum-toolbar/&gt; | [Toolbar](#Core/widget/Toolbar) |
| &lt;bryntum-tree-combo/&gt; | [TreeCombo](#Grid/widget/TreeCombo) |
| &lt;bryntum-undo-redo/&gt; | [UndoRedo](#Scheduler/widget/UndoRedo) |
| &lt;bryntum-version-grid/&gt; | [VersionGrid](#SchedulerPro/widget/VersionGrid) |
| &lt;bryntum-view-preset-combo/&gt; | [ViewPresetCombo](#Scheduler/widget/ViewPresetCombo) |
| &lt;bryntum-widget/&gt; | [Widget](#Core/widget/Widget) |
| &lt;bryntum-year-picker/&gt; | [YearPicker](#Core/widget/YearPicker) |

### Using the wrapper in your application

Now you can use the component defined in the wrapper in your application:

Sample code for `App.vue`:

```html
<template>
    <bryntum-scheduler-pro
        ref="schedulerpro"
        tooltip="schedulerProConfig.tooltip"
        v-bind="schedulerProConfig"
        @click="onClick"
    />
</template>

<script>

import { BryntumSchedulerPro } from '@bryntum/schedulerpro-vue';
import { schedulerProConfig } from './AppConfig';
import './components/ColorColumn.js';

export default {
    name: 'app',

    // local components
    components: {
        BryntumSchedulerPro
    },
    data() {
        return { schedulerProConfig };
    }
};
</script>

<style lang="scss">
@import './App.scss';
</style>
```

As shown above you can assign values and bind to Vue data with `tooltip="schedulerProConfig.tooltip"` or `v-bind` option.
Listen to events with `@click="onClick"`, or use `v-on`.

`AppConfig.js` should contain a simple Bryntum Scheduler Pro configuration.
We recommend to keep it in a separate file because it can become lengthy especially for more advanced configurations.

Sample code for `AppConfig.js`:

```javascript
export const schedulerProConfig =  {
    tooltip : "My cool Bryntum Scheduler Pro component"
    // Bryntum Scheduler Pro config options
};
```

Add `sass-loader` to your `package.json` if you used SCSS.

You will also need to import CSS file for Bryntum Scheduler Pro.
The ideal place for doing it is the beginning of `App.scss/App.css` that would be imported in `App.vue`:

```javascript
@import "~@bryntum/schedulerpro/schedulerpro.stockholm.css";
```

### Embedding widgets inside wrapper

Wrappers are designed to allow using Bryntum widgets as Vue components, but they themselves cannot contain other
Bryntum wrappers inside their tag. To embed Bryntum widgets inside a wrapper you should instead use the available
configuration options for the wrapper's widget. Please note that not all widgets may contain inner widgets, please refer
to the API docs to check for valid configuration options.

This example shows how to use a `Toolbar` widget inside the wrapper for Bryntum Scheduler Pro:

Sample code for `AppConfig.js`:

```javascript
export const schedulerProConfig =  {
    // Toolbar (tbar) config
    tbar: {
        items : [
            {
                type : 'button',
                text : 'My button'
            }
        ]
    }
    // Bryntum Scheduler Pro config options
};
```

### Syncing bound data changes

The stores used by the wrapper enable [syncDataOnLoad](#Core/data/Store#config-syncDataOnLoad) by default (Stores not
used by the wrapper have it disabled by default). It is done to make Vue column renderer update the value.
Without `syncDataOnLoad`, each time a new array of data is set to the store would apply the data as a completely new
dataset. With `syncDataOnLoad`, the new state is instead compared to the old, and the differences are applied.

## Using Vue components in cells

The wrapper implements support for using Vue Components to render the cell content. There are several steps needed to configure that in the application:

1. Register Vue component globally
2. Implement column renderer
3. Implement methods called in Vue component

You can see the online examples here:

* Vue 2: [Rendering components into cells demo (Vue 2)](https://bryntum.com/products/grid/examples/frameworks/vue/javascript/vue-renderer/dist/)
* Vue 3: [Components in cells demo (Vue 3)](https://bryntum.com/products/grid/examples/frameworks/vue-3/javascript/vue-renderer/dist/)

### Register Vue component

This is usually implemented in `main.js` before the global Vue instance is created.

```javascript
import Vue from 'vue';
import App from './App.vue';

import BlueButton from './components/BlueButton.vue';
import RedButton from './components/RedButton.vue';
import PercentBar from './components/PercentBar.vue';

// Register components globally to be accessible in renderers
Vue.component('BlueButton', BlueButton);
Vue.component('RedButton', RedButton);
Vue.component('PercentBar', PercentBar);

// etc...
```

The `BlueButton` could look like this:

```javascript
<template>
    <button class="b-button b-blue" @click="click($event)">
        <span>{{ htmlText }}</span>
    </button>
</template>

<script>
import { StringHelper } from '@bryntum/schedulerpro';

export default {
    name     : 'BlueButton',
    props    : ['record', 'clickHandler'],
    computed : {
        htmlText() {
            return StringHelper.encodeHtml(this.record.city);
        }
    },
    methods  : {
        click() {
            this.clickHandler(this.htmlText, 'b-blue');
        }
    }
};
</script>
```

### Implement column renderer

The column with Vue component must have a specific configuration:

```javascript
{
    text   : 'Button',
    field  : 'city',
    vue    : true,
    renderer({ grid: { extraData : { clickHandler } }, record }) {
        // The object needed by the wrapper to render the component
        return {
            // Required. Name of the component to render.
            // The component must be registered globally in main.js
            // https://vuejs.org/v2/guide/components.html#Dynamic-Components
            is : 'BlueButton',

            // `BlueButton` gets its text from `record`
            record,

            // Button click handler defined above
            clickHandler
        };
    }
```
`vue : true` is mandatory and `is` property of the returned object is also required.

### Implement methods called in Vue component

Should the component be interactive it needs handlers to process the user actions. The handler can be implemented
locally to the component if it does not need any outside data or it can be passed to the component from an upper level.
For example:

```javascript
<template>
    <div id="container">
        <bryntum-scheduler-pro
            v-bind="schedulerProConfig"
            :extraData="extraData"
        />
    </div>
</template>

<script>
import { BryntumSchedulerPro } from '@bryntum/schedulerPro-vue';
import { Toast } from '@bryntum/schedulerPro';
import { schedulerproConfig } from './AppConfig';

export default {
    name       : 'App',
    components : {
        BryntumSchedulerPro
    },

    data() {
        return {
            schedulerproConfig,

            // extraData is available as a property of the grid in renderer
            extraData : { clickHandler : this.clickHandler }
        };
    },

    methods : {
        clickHandler : (html, color) => {
            Toast.show({ html, color, timeout : 3000 });
        }
    }
};
</script>
```

## Configs, properties and events

All Bryntum Vue Wrappers support the full set of the public configs, properties and events of a component.

### Using dataChange event to synchronize data

Bryntum Scheduler Pro keeps all data in its stores which are automatically synchronized with the UI and the user actions.
Nevertheless, it is sometimes necessary for the rest of the application to be informed about data changes. For that
it is easiest to use `dataChange` event.

```javascript
<template>
    <div>
        <bryntum-scheduler-pro
            ref="schedulerpro"
            v-bind="schedulerProConfig"
            @datachange="syncData"
        />
    </div>
</template>

<script>
import { BryntumSchedulerPro } from "@bryntum/schedulerpro-vue";
import { schedulerProConfig } from "./AppConfig.js";

export default {
    name: "App",

    components: { BryntumSchedulerPro },

    methods: {
        syncData({ store, action, records }) {
            console.log(`${store.id} changed. The action was: ${action}. Changed records: `, records);
            // Your sync data logic comes here
        }
    },

    data() {
        return { schedulerProConfig };
    }
};
</script>
```

### Wrapper configs

* `relayStoreEvents` - set it to `true` to relay events from stores to `SchedulerPro` instance.
`dataChange` event fires twice if set to true.  Defaults to `false`.

## Features

Features are suffixed with `Feature` and act as both configs and properties for `BryntumSchedulerProComponent`.
They are mapped to the corresponding API features of the Bryntum Scheduler Pro `instance`.

This is a list of all `BryntumSchedulerProComponent` features:

|Wrapper feature name|API feature reference |
|--------------------|----------------------|
| calendarHighlightFeature | [CalendarHighlight](#SchedulerPro/feature/CalendarHighlight) |
| cellCopyPasteFeature | [CellCopyPaste](#Grid/feature/CellCopyPaste) |
| cellEditFeature | [CellEdit](#Grid/feature/CellEdit) |
| cellMenuFeature | [CellMenu](#Grid/feature/CellMenu) |
| cellTooltipFeature | [CellTooltip](#Grid/feature/CellTooltip) |
| columnAutoWidthFeature | [ColumnAutoWidth](#Grid/feature/ColumnAutoWidth) |
| columnDragToolbarFeature | [ColumnDragToolbar](#Grid/feature/ColumnDragToolbar) |
| columnLinesFeature | [ColumnLines](#Scheduler/feature/ColumnLines) |
| columnPickerFeature | [ColumnPicker](#Grid/feature/ColumnPicker) |
| columnRenameFeature | [ColumnRename](#Grid/feature/ColumnRename) |
| columnReorderFeature | [ColumnReorder](#Grid/feature/ColumnReorder) |
| columnResizeFeature | [ColumnResize](#Grid/feature/ColumnResize) |
| dependenciesFeature | [Dependencies](#Scheduler/feature/Dependencies) |
| dependencyEditFeature | [DependencyEdit](#SchedulerPro/feature/DependencyEdit) |
| eventBufferFeature | [EventBuffer](#SchedulerPro/feature/EventBuffer) |
| eventCopyPasteFeature | [EventCopyPaste](#Scheduler/feature/EventCopyPaste) |
| eventDragFeature | [EventDrag](#Scheduler/feature/EventDrag) |
| eventDragCreateFeature | [EventDragCreate](#Scheduler/feature/EventDragCreate) |
| eventDragSelectFeature | [EventDragSelect](#Scheduler/feature/EventDragSelect) |
| eventEditFeature | [EventEdit](#Scheduler/feature/EventEdit) |
| eventFilterFeature | [EventFilter](#Scheduler/feature/EventFilter) |
| eventMenuFeature | [EventMenu](#Scheduler/feature/EventMenu) |
| eventNonWorkingTimeFeature | [EventNonWorkingTime](#Scheduler/feature/EventNonWorkingTime) |
| eventResizeFeature | [EventResize](#SchedulerPro/feature/EventResize) |
| eventSegmentDragFeature | [EventSegmentDrag](#SchedulerPro/feature/EventSegmentDrag) |
| eventSegmentResizeFeature | [EventSegmentResize](#SchedulerPro/feature/EventSegmentResize) |
| eventSegmentsFeature | [EventSegments](#SchedulerPro/feature/EventSegments) |
| eventTooltipFeature | [EventTooltip](#Scheduler/feature/EventTooltip) |
| excelExporterFeature | [ExcelExporter](#Scheduler/feature/experimental/ExcelExporter) |
| fileDropFeature | [FileDrop](#Grid/feature/experimental/FileDrop) |
| fillHandleFeature | [FillHandle](#Grid/feature/FillHandle) |
| filterFeature | [Filter](#Grid/feature/Filter) |
| filterBarFeature | [FilterBar](#Grid/feature/FilterBar) |
| groupFeature | [Group](#Grid/feature/Group) |
| groupSummaryFeature | [GroupSummary](#Scheduler/feature/GroupSummary) |
| headerMenuFeature | [HeaderMenu](#Grid/feature/HeaderMenu) |
| headerZoomFeature | [HeaderZoom](#Scheduler/feature/HeaderZoom) |
| labelsFeature | [Labels](#Scheduler/feature/Labels) |
| mergeCellsFeature | [MergeCells](#Grid/feature/MergeCells) |
| multipageFeature | [MultiPageExporter](#Scheduler/feature/export/exporter/MultiPageExporter) |
| multipageverticalFeature | [MultiPageVerticalExporter](#Scheduler/feature/export/exporter/MultiPageVerticalExporter) |
| nestedEventsFeature | [NestedEvents](#SchedulerPro/feature/NestedEvents) |
| nonWorkingTimeFeature | [NonWorkingTime](#Scheduler/feature/NonWorkingTime) |
| panFeature | [Pan](#Scheduler/feature/Pan) |
| pdfExportFeature | [PdfExport](#Scheduler/feature/export/PdfExport) |
| percentBarFeature | [PercentBar](#SchedulerPro/feature/PercentBar) |
| quickFindFeature | [QuickFind](#Grid/feature/QuickFind) |
| regionResizeFeature | [RegionResize](#Grid/feature/RegionResize) |
| resourceMenuFeature | [ResourceMenu](#Scheduler/feature/ResourceMenu) |
| resourceNonWorkingTimeFeature | [ResourceNonWorkingTime](#SchedulerPro/feature/ResourceNonWorkingTime) |
| resourceTimeRangesFeature | [ResourceTimeRanges](#Scheduler/feature/ResourceTimeRanges) |
| rowCopyPasteFeature | [RowCopyPaste](#Grid/feature/RowCopyPaste) |
| rowExpanderFeature | [RowExpander](#Grid/feature/RowExpander) |
| rowReorderFeature | [RowReorder](#Grid/feature/RowReorder) |
| scheduleContextFeature | [ScheduleContext](#Scheduler/feature/ScheduleContext) |
| scheduleMenuFeature | [ScheduleMenu](#Scheduler/feature/ScheduleMenu) |
| scheduleTooltipFeature | [ScheduleTooltip](#Scheduler/feature/ScheduleTooltip) |
| searchFeature | [Search](#Grid/feature/Search) |
| simpleEventEditFeature | [SimpleEventEdit](#Scheduler/feature/SimpleEventEdit) |
| singlepageFeature | [SinglePageExporter](#Scheduler/feature/export/exporter/SinglePageExporter) |
| sortFeature | [Sort](#Grid/feature/Sort) |
| splitFeature | [Split](#Scheduler/feature/Split) |
| stickyCellsFeature | [StickyCells](#Grid/feature/StickyCells) |
| stickyEventsFeature | [StickyEvents](#Scheduler/feature/StickyEvents) |
| stripeFeature | [Stripe](#Grid/feature/Stripe) |
| summaryFeature | [Summary](#Scheduler/feature/Summary) |
| taskEditFeature | [TaskEdit](#SchedulerPro/feature/TaskEdit) |
| timeAxisHeaderMenuFeature | [TimeAxisHeaderMenu](#Scheduler/feature/TimeAxisHeaderMenu) |
| timeRangesFeature | [TimeRanges](#Scheduler/feature/TimeRanges) |
| timeSelectionFeature | [TimeSelection](#Scheduler/feature/TimeSelection) |
| timeSpanHighlightFeature | [TimeSpanHighlight](#SchedulerPro/feature/TimeSpanHighlight) |
| treeFeature | [Tree](#Grid/feature/Tree) |
| treeGroupFeature | [TreeGroup](#Grid/feature/TreeGroup) |
| versionsFeature | [Versions](#SchedulerPro/feature/Versions) |

## Bryntum Scheduler Pro API instance

It is important to know that the Vue `BryntumSchedulerProComponent` is **not** the native Bryntum Scheduler Pro instance, it
is a wrapper or an interface between the Vue application and the Bryntum Scheduler Pro itself.

All available configs, properties and features are propagated from the wrapper down to the underlying Bryntum Scheduler Pro
instance, but there might be the situations when you want to access the Bryntum Scheduler Pro directly. That is fully valid
approach and you are free to do it.

<div class="docs-tabs" data-name="vue">
<div>
    <a>Vue 2</a>
    <a>Vue 3</a>
</div>
<div>

<p>
If you need to access Bryntum Scheduler Pro functionality not exposed by the wrapper, you can access the Bryntum Scheduler Pro 
instance directly. Within the <strong>Vue 2</strong> wrapper it is available under the <code>instance</code> property.

This simple example shows how you could use it:

App.vue:
</p>

```html
<template>
    <bryntum-scheduler-pro ref="schedulerpro" v-bind="schedulerProConfig" />
</template>

<script>
// Bryntum Scheduler Pro and its config
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-vue';
import { schedulerProConfig } from './SchedulerProConfig';
import './components/ColorColumn.js';

// App
export default {
    name: 'App',

    // local components
    components: {
        BryntumSchedulerPro
    },

    data() {
        return { schedulerProConfig };
    },

    methods: {
        doSomething() {
            // Reference to Bryntum Scheduler Pro instance
            const schedulerproInstance = this.$refs.schedulerpro.instance;

            // NOTE: Do not use assignment to this.schedulerproInstance
            // Vue will wrap Bryntum Scheduler Pro instance with Proxy class
            // and this will not work as expected.
            // Refer to this Vue guide for the details:
            // https://vuejs.org/guide/extras/reactivity-in-depth.html
        }
    }
};
</script>

<style lang="scss">
@import './App.scss';
</style>
```
<p>
When accessing <code>instance</code> directly, use wrapper's API widget reference docs from the list above to get available
configs and properties.
</p>

</div>
<div>

<p>
If you need to access Bryntum Scheduler Pro functionality not exposed by the wrapper, you can access the Bryntum Scheduler Pro instance
directly. Within the <strong>Vue 3</strong> wrapper it is available under the <code>instance.value</code> property.

This simple example shows how you could use it:

App.vue:
</p>

```html
<template>
    <bryntum-scheduler-pro ref="schedulerpro" v-bind="schedulerProConfig" />
</template>

<script>
// vue imports
import { ref, reactive } from 'vue';

// Bryntum Scheduler Pro and its config
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-vue-3';
import { useSchedulerProConfig } from './SchedulerProConfig';
import './components/ColorColumn.js';

// App
export default {
    name: 'App',

    // local components
    components: {
        BryntumSchedulerPro
    },

    setup() {
        const schedulerpro = ref(null);
        const schedulerProConfig = reactive(useSchedulerProConfig());

        doSomething() {
            // Reference to Bryntum Scheduler Pro instance
            const schedulerproInstance = schedulerpro.value.instance.value;

            // NOTE: Do not use assignment to this.schedulerproInstance
            // Vue will wrap Bryntum Scheduler Pro instance with Proxy class
            // and this will not work as expected.
            // Refer to this Vue guide for the details:
            // https://vuejs.org/guide/extras/reactivity-in-depth.html
        }

        return {
            schedulerpro,
            schedulerProConfig,
            doSomething
        };
    },
};
</script>

<style lang="scss">
@import './App.scss';
</style>
```

<p>
When accessing <code>instance</code> directly, use wrapper's API widget reference docs from the list above to get available
configs and properties.
</p>
</div>
</div>

## Troubleshooting

Please refer to this [Troubleshooting guide](#SchedulerPro/guides/integration/vue/troubleshooting.md).

## References

* Config options, features, events and methods [Bryntum Scheduler Pro API docs](#api)
* Visit [Vue Framework Homepage](https://vuejs.org)
* Post your questions to [Bryntum Support Forum](https://forum.bryntum.com/)
* [Contact us](https://bryntum.com/contact/)


<p class="last-modified">Last modified on 2023-06-30 10:22:39</p>