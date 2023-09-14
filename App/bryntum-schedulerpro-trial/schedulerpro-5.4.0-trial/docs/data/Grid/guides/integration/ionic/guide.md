<h1 class="title-with-image"><img src="Core/logo/ionic.svg" alt="Bryntum Grid supports Ionic"/>
Using Bryntum Grid with Ionic</h1>

## Bryntum NPM repository access

Please refer to this [guide for Bryntum NPM repository access](#Grid/guides/npm-repository.md).

## Ionic with Angular

The guide below references to using Ionic Framework for building application based on Angular.

## Bryntum Grid

The Bryntum Grid itself is framework agnostic, but it ships with demos and wrappers to simplify its use with popular
frameworks such as Ionic. The purpose of this guide is to give you a basic introduction on how to use Bryntum Grid
with Ionic.

## View online demos

Bryntum Grid Ionic demos can be viewed in our
[online example browser](https://bryntum.com/products/grid/examples/#Integration).

## Build and run local demos

Download distribution zip with demos according to this [guide](#Grid/guides/download.md#distribution).

Ionic demos are located in **examples/frameworks/ionic** folder inside
distribution zip.

Each demo contains bundled `README.md` file in demo folder with build and run instructions.

To view and run an example locally in development mode, you can use the following commands:

```shell
$ npm install
$ npm run start
```

That starts a local server accessible at [http://localhost:4200"](http://localhost:4200). If
you modify the example code while running it locally it is automatically rebuilt and updated in the browser allowing you
to see your changes immediately.

The production version of an example, or your application, is built by running:

```shell
$ npm install
$ npm run build
```

The built version is then located in `dist` sub-folder which contains the compiled code that can be deployed to your
production server.

## Install Ionic framework

Installation and API documentation can be found at the Ionic project's page https://ionicframework.com/.

Install the Ionic CLI globally with npm:

```shell
$ npm install -g ionic
```

The -g means it is a global install. For Windows it is recommended to open an Admin command prompt. For Mac/Linux, run
the command with sudo.

## Create Ionic app

Create an App:

```shell
$ ionic start IonicApp blank
```

`blank` is a common starter template for the app.

Run the App:

```shell
$ cd IonicApp
$ ionic serve
```

## TypeScript and Typings

Bryntum bundles ship with typings for the classes for usage in TypeScript applications. You can find `grid*.d.ts`
files in the `build` folder inside the distribution zip package. The definitions also contain a special config type
which can be passed to the class constructor.

The config specific types are also accepted by multiple other properties and functions, for example
the [Store.data](#Core/data/Store#config-data) config of the `Store` which accepts type `Partial<ModelConfig>[]`.

Sample code for tree store creation with `ModelConfig` and `StoreConfig` classes:

```typescript
import { Store, StoreConfig, ModelConfig } from '@bryntum/grid';

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

The Ionic wrappers encapsulate Bryntum Grid and other Bryntum widgets in Ionic components that expose configuration
options, properties, features and events. The wrapped all Bryntum UI components so they can be used the usual Ionic way.

To use native API package classes with wrappers import them from `@bryntum/grid`.

```typescript
import { Grid } from '@bryntum/grid';
```

### Installing the wrappers package

The wrappers are distributed as a separate package `@bryntum/grid-angular` that is installed according to the used
package manager. Please refer to this [guide for Bryntum NPM repository access](#Grid/guides/npm-repository.md).

### Wrappers Overview

Wrappers are Ionic components which provide full access to Bryntum API widget class configs, properties, events and
features. Each Wrapper has it's own HTML tag which can be used in ionic templates. This is the list of available
wrappers for Bryntum Grid Ionic package:

| Wrapper tag name | Wrapper component name | API widget reference |
|------------------|------------------------|----------------------|
| &lt;bryntum-button/&gt; | BryntumButtonComponent | [Button](#Core/widget/Button) |
| &lt;bryntum-button-group/&gt; | BryntumButtonGroupComponent | [ButtonGroup](#Core/widget/ButtonGroup) |
| &lt;bryntum-checkbox/&gt; | BryntumCheckboxComponent | [Checkbox](#Core/widget/Checkbox) |
| &lt;bryntum-chip-view/&gt; | BryntumChipViewComponent | [ChipView](#Core/widget/ChipView) |
| &lt;bryntum-color-field/&gt; | BryntumColorFieldComponent | [ColorField](#Core/widget/ColorField) |
| &lt;bryntum-color-picker/&gt; | BryntumColorPickerComponent | [ColorPicker](#Core/widget/ColorPicker) |
| &lt;bryntum-combo/&gt; | BryntumComboComponent | [Combo](#Core/widget/Combo) |
| &lt;bryntum-container/&gt; | BryntumContainerComponent | [Container](#Core/widget/Container) |
| &lt;bryntum-date-field/&gt; | BryntumDateFieldComponent | [DateField](#Core/widget/DateField) |
| &lt;bryntum-date-picker/&gt; | BryntumDatePickerComponent | [DatePicker](#Core/widget/DatePicker) |
| &lt;bryntum-date-time-field/&gt; | BryntumDateTimeFieldComponent | [DateTimeField](#Core/widget/DateTimeField) |
| &lt;bryntum-display-field/&gt; | BryntumDisplayFieldComponent | [DisplayField](#Core/widget/DisplayField) |
| &lt;bryntum-duration-field/&gt; | BryntumDurationFieldComponent | [DurationField](#Core/widget/DurationField) |
| &lt;bryntum-field-filter-picker/&gt; | BryntumFieldFilterPickerComponent | [FieldFilterPicker](#Core/widget/FieldFilterPicker) |
| &lt;bryntum-field-filter-picker-group/&gt; | BryntumFieldFilterPickerGroupComponent | [FieldFilterPickerGroup](#Core/widget/FieldFilterPickerGroup) |
| &lt;bryntum-file-field/&gt; | BryntumFileFieldComponent | [FileField](#Core/widget/FileField) |
| &lt;bryntum-file-picker/&gt; | BryntumFilePickerComponent | [FilePicker](#Core/widget/FilePicker) |
| &lt;bryntum-filter-field/&gt; | BryntumFilterFieldComponent | [FilterField](#Core/widget/FilterField) |
| &lt;bryntum-grid/&gt; | BryntumGridComponent | [Grid](#Grid/view/Grid) |
| &lt;bryntum-grid-base/&gt; | BryntumGridBaseComponent | [GridBase](#Grid/view/GridBase) |
| &lt;bryntum-grid-field-filter-picker/&gt; | BryntumGridFieldFilterPickerComponent | [GridFieldFilterPicker](#Grid/widget/GridFieldFilterPicker) |
| &lt;bryntum-grid-field-filter-picker-group/&gt; | BryntumGridFieldFilterPickerGroupComponent | [GridFieldFilterPickerGroup](#Grid/widget/GridFieldFilterPickerGroup) |
| &lt;bryntum-group-bar/&gt; | BryntumGroupBarComponent | [GroupBar](#Grid/widget/GroupBar) |
| &lt;bryntum-list/&gt; | BryntumListComponent | [List](#Core/widget/List) |
| &lt;bryntum-menu/&gt; | BryntumMenuComponent | [Menu](#Core/widget/Menu) |
| &lt;bryntum-number-field/&gt; | BryntumNumberFieldComponent | [NumberField](#Core/widget/NumberField) |
| &lt;bryntum-paging-toolbar/&gt; | BryntumPagingToolbarComponent | [PagingToolbar](#Core/widget/PagingToolbar) |
| &lt;bryntum-panel/&gt; | BryntumPanelComponent | [Panel](#Core/widget/Panel) |
| &lt;bryntum-password-field/&gt; | BryntumPasswordFieldComponent | [PasswordField](#Core/widget/PasswordField) |
| &lt;bryntum-radio/&gt; | BryntumRadioComponent | [Radio](#Core/widget/Radio) |
| &lt;bryntum-radio-group/&gt; | BryntumRadioGroupComponent | [RadioGroup](#Core/widget/RadioGroup) |
| &lt;bryntum-slider/&gt; | BryntumSliderComponent | [Slider](#Core/widget/Slider) |
| &lt;bryntum-slide-toggle/&gt; | BryntumSlideToggleComponent | [SlideToggle](#Core/widget/SlideToggle) |
| &lt;bryntum-splitter/&gt; | BryntumSplitterComponent | [Splitter](#Core/widget/Splitter) |
| &lt;bryntum-tab-panel/&gt; | BryntumTabPanelComponent | [TabPanel](#Core/widget/TabPanel) |
| &lt;bryntum-text-area-field/&gt; | BryntumTextAreaFieldComponent | [TextAreaField](#Core/widget/TextAreaField) |
| &lt;bryntum-text-area-picker-field/&gt; | BryntumTextAreaPickerFieldComponent | [TextAreaPickerField](#Core/widget/TextAreaPickerField) |
| &lt;bryntum-text-field/&gt; | BryntumTextFieldComponent | [TextField](#Core/widget/TextField) |
| &lt;bryntum-time-field/&gt; | BryntumTimeFieldComponent | [TimeField](#Core/widget/TimeField) |
| &lt;bryntum-time-picker/&gt; | BryntumTimePickerComponent | [TimePicker](#Core/widget/TimePicker) |
| &lt;bryntum-toolbar/&gt; | BryntumToolbarComponent | [Toolbar](#Core/widget/Toolbar) |
| &lt;bryntum-tree-combo/&gt; | BryntumTreeComboComponent | [TreeCombo](#Grid/widget/TreeCombo) |
| &lt;bryntum-widget/&gt; | BryntumWidgetComponent | [Widget](#Core/widget/Widget) |
| &lt;bryntum-year-picker/&gt; | BryntumYearPickerComponent | [YearPicker](#Core/widget/YearPicker) |

### Import BryntumGridModule

Add the following code to your `app.module.ts`:

```typescript
import { BryntumGridModule } from '@bryntum/grid-angular'

@NgModule({
    imports : [
        BryntumGridModule
    ]
})
```

Then you will be able to use the custom tag like `<bryntum-grid>` and others listed above the same way as you use
your application components. Our examples are built this way so you can refer to them to see how to use the tag and how
to pass parameters.

### Using the wrapper in your application

Now you can use the component defined in the wrapper in your application:

```html
<bryntum-grid
    #grid
    tooltip="My cool Bryntum Grid component" ,
    (onCatchAll)="onGridEvents($event)"
// other configs, properties, events or features
></bryntum-grid>
```

You will also need to import CSS file for Bryntum Grid. We recommend to do it in `src/styles.scss`:

```typescript
@import "@bryntum/grid/grid.material.css";

// other application-global styling
```

### Embedding widgets inside wrapper

Wrappers are designed to allow using Bryntum widgets as Angular components, but they themselves cannot contain other
Bryntum wrappers inside their tag. To embed Bryntum widgets inside a wrapper you should instead use the available
configuration options for the wrapper's widget. Please note that not all widgets may contain inner widgets, please refer
to the API docs to check for valid configuration options.

This example shows how to use a `Toolbar` widget inside the wrapper for Bryntum Grid:

Sample code for `app.component.ts`:

```typescript
export class AppComponent {

    // Toolbar (tbar) config
    tbarConfig = {
        items : [
            {
                type : 'button',
                text : 'My button'
            }
        ]
    }

}
```

Sample code for `app.component.html`:

```html
<bryntum-grid
    #grid
    tbar="tbarConfig",
></bryntum-grid>
```

## Configs, properties and events

All Bryntum Ionic Wrappers support the full set of the public configs, properties and events of a component.

## Listening to Bryntum Grid events

The Bryntum Grid events are passed up to the Angular wrapper which makes it possible to listen to them the standard Angular
way. 

The following code demonstrates listening to the `cellClick` event:

Sample code for `app.component.ts`:

```typescript
export class AppComponent implements AfterViewInit {

    onGridCellClick(e : {[key:string] : any}) : void {
        console.log('onCellClick', e);
    }
    // etc.
```

Sample code for `app.component.html`:

```html
<bryntum-grid
    #grid
    (onCellClick) = "onGridCellClick($event)"
```

Please note that we prefix the capitalized event name with the `on` keyword and that we pass `$event` as
the argument to the listener.

Another valid method is to pass a [`listeners`](https://bryntum.com/products/grid/docs/api/Core/mixin/Events#config-listeners)
config object to the Angular wrapper. For example:

Sample code for `app.config.ts`:

```typescript
export const gridConfig = {
    listeners : {
        cellClick(e) {
            console.log('cellClick', e);
        }
    },
    // etc
```

and `app.component.html`:

```html
<bryntum-grid
    #grid
    [listeners] = "gridConfig.listeners"
```

Please note that we use unprefixed event names in this case.

### Using dataChange event to synchronize data

Bryntum Grid keeps all data in its stores which are automatically synchronized with the UI and the user actions.
Nevertheless, it is sometimes necessary for the rest of the application to be informed about data changes. For that
it is easiest to use `dataChange` event.

`app.component.html`:

```html
<bryntum-grid
    #grid
    (onDataChange) = "syncData($event)"
```

`app.component.ts`:

```typescript
export class AppComponent {

    syncData({ store, action, records } : { store : Store; action : String; records : Model[]}) : void {
        console.log(`${store.id} changed. The action was: ${action}. Changed records: `, records);
        // Your sync data logic comes here
    }

    // ...
}
```

## Features

Features are suffixed with `Feature` and act as both configs and properties for `BryntumGridComponent`. They are
mapped to the corresponding API features of the Bryntum Grid `instance`.

This is a list of all `BryntumGridComponent` features:

|Wrapper feature name|API feature reference |
|--------------------|----------------------|
| cellCopyPasteFeature | [CellCopyPaste](#Grid/feature/CellCopyPaste) |
| cellEditFeature | [CellEdit](#Grid/feature/CellEdit) |
| cellMenuFeature | [CellMenu](#Grid/feature/CellMenu) |
| cellTooltipFeature | [CellTooltip](#Grid/feature/CellTooltip) |
| columnAutoWidthFeature | [ColumnAutoWidth](#Grid/feature/ColumnAutoWidth) |
| columnDragToolbarFeature | [ColumnDragToolbar](#Grid/feature/ColumnDragToolbar) |
| columnPickerFeature | [ColumnPicker](#Grid/feature/ColumnPicker) |
| columnRenameFeature | [ColumnRename](#Grid/feature/ColumnRename) |
| columnReorderFeature | [ColumnReorder](#Grid/feature/ColumnReorder) |
| columnResizeFeature | [ColumnResize](#Grid/feature/ColumnResize) |
| excelExporterFeature | [ExcelExporter](#Grid/feature/experimental/ExcelExporter) |
| fileDropFeature | [FileDrop](#Grid/feature/experimental/FileDrop) |
| fillHandleFeature | [FillHandle](#Grid/feature/FillHandle) |
| filterFeature | [Filter](#Grid/feature/Filter) |
| filterBarFeature | [FilterBar](#Grid/feature/FilterBar) |
| groupFeature | [Group](#Grid/feature/Group) |
| groupSummaryFeature | [GroupSummary](#Grid/feature/GroupSummary) |
| headerMenuFeature | [HeaderMenu](#Grid/feature/HeaderMenu) |
| mergeCellsFeature | [MergeCells](#Grid/feature/MergeCells) |
| multipageFeature | [MultiPageExporter](#Grid/feature/export/exporter/MultiPageExporter) |
| multipageverticalFeature | [MultiPageVerticalExporter](#Grid/feature/export/exporter/MultiPageVerticalExporter) |
| pdfExportFeature | [PdfExport](#Grid/feature/export/PdfExport) |
| quickFindFeature | [QuickFind](#Grid/feature/QuickFind) |
| regionResizeFeature | [RegionResize](#Grid/feature/RegionResize) |
| rowCopyPasteFeature | [RowCopyPaste](#Grid/feature/RowCopyPaste) |
| rowExpanderFeature | [RowExpander](#Grid/feature/RowExpander) |
| rowReorderFeature | [RowReorder](#Grid/feature/RowReorder) |
| searchFeature | [Search](#Grid/feature/Search) |
| singlepageFeature | [SinglePageExporter](#Grid/feature/export/exporter/SinglePageExporter) |
| sortFeature | [Sort](#Grid/feature/Sort) |
| splitFeature | [Split](#Grid/feature/Split) |
| stickyCellsFeature | [StickyCells](#Grid/feature/StickyCells) |
| stripeFeature | [Stripe](#Grid/feature/Stripe) |
| summaryFeature | [Summary](#Grid/feature/Summary) |
| treeFeature | [Tree](#Grid/feature/Tree) |
| treeGroupFeature | [TreeGroup](#Grid/feature/TreeGroup) |

## Bryntum Grid API instance

It is important to know that the Ionic `BryntumGridComponent` is **not** the native Bryntum Grid instance, it
is a wrapper or an interface between the Ionic application and the Bryntum Grid itself.

All available configs, properties and features are propagated from the wrapper down to the underlying Bryntum Grid
instance, but there might be the situations when you want to access the Bryntum Grid directly. That is fully valid
approach and you are free to do it.

### Accessing the Bryntum Grid instance

If you need to access Bryntum Grid functionality not exposed by the wrapper, you can access the Bryntum Grid instance
directly. Within the wrapper it is available under the `instance` property.

This simple example shows how you could use it:

app.component.html

```html
<ion-header>
...
</ion-header>

<ion-content>
    <grid
        #grid
        tooltip = "My cool Bryntum Grid component"
    ></grid>
</ion-content>
```

Sample code for `app.component.ts`:

```typescript
import { BryntumGridComponent } from '@bryntum/grid-angular';
import { Grid } from '@bryntum/grid';

export class AppComponent implements AfterViewInit {

    @ViewChild(BryntumGridComponent, { static : false }) gridComponent: BryntumGridComponent;

    private grid : Grid;

    @ViewChild(BryntumGridComponent, { static : false }) gridComponent: BryntumGridComponent;

    ngAfterViewInit(): void {
        // store Bryntum Grid isntance
        this.grid = this.gridComponent.instance;
    }
}
```

When accessing `instance` directly, use wrapper's API widget reference docs from the list above to get available configs
and properties.

## Troubleshooting

Please refer to this [Troubleshooting guide](#Grid/guides/integration/ionic/troubleshooting.md).

## References

* Config options, features, events and methods [Bryntum Grid API docs](#api)
* Visit [Ionic Framework Homepage](https://ionicframework.com)
* Visit [Angular Framework Homepage](https://angular.io)
* Post your questions to [Bryntum Support Forum](https://forum.bryntum.com/)
* [Contact us](https://bryntum.com/contact/)


<p class="last-modified">Last modified on 2023-06-30 9:58:47</p>