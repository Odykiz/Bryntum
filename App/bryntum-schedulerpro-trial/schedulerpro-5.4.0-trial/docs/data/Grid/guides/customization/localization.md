# Localization

## Introduction

Bryntum Grid uses locales for translating texts, date formats and such to different languages. This guide shows you 
how to use the supported locales in Bryntum Grid and how to create your own.

Localization is the process of adapting a product to be suitable for a specific region. It is not
only translation of texts from one language to another, but it includes other aspects of adapting the components and
user interface. Such adaptations include:

1. Translations of texts
2. Adjusting date, time, numbers and currency formats
3. Setting the day week starts on
4. Translation of day, months and other units' names
5. Handling of plural forms of words

This guide shows how to use Bryntum's built-in localization and how to extend it to cover the whole application.

## Supported languages

Bryntum Grid ships with the following locales:

| Language                 | Locale Name | Locale Code | Locale description       |
|--------------------------|-------------|-------------|--------------------------|
| Arabic (Modern Standard) | Ar          | ar          | اللغة العربية            |
| Bulgarian                | Bg          | bg          | Български                |
| Chinese (Simplified)     | ZhCn        | zh-CN       | 简体中文                  |
| Croatian                 | HR          | hr          | Hrvatski                 |
| Czech                    | Cs          | cs          | Česky                    |
| Danish                   | Da          | da          | Dansk                    |
| Dutch                    | Nl          | nl          | Netherlands              |
| German                   | De          | de          | Deutsch                  |
| Greek                    | El          | el          | Ελληνικά                 |
| English (United States)* | En          | en-US       | English (US)             |
| English (Great Britain)  | EnGb        | en-GB       | English (Great Britain)  |
| Estonian                 | Et          | et          | Eesti keel               |
| Finnish                  | Fi          | fi          | Suomi                    |
| French (France)          | FrFr        | fr-FR       | Français (France)        |
| Hebrew                   | He          | he          |                    עִברִית |
| Hindi                    | Hi          | hi          | हिन्दी                      |
| Italian                  | It          | it          | Italiano                 |
| Hungarian                | Hu          | hu          | Magyar                   |
| Indonesian               | Id          | id          | Bahasa Indonesia         |
| Japanese                 | Ja          | ja          | 日本語                    |
| Korean                   | Ko          | ko          | 한국어                     |
| Malay                    | Ms          | ms          | Melayu                   |
| Norwegian                | No          | no          | Norsk                    |
| Polish                   | Pl          | pl          | Polski                   |
| Portuguese               | Pt          | pt          | Português                |
| Serbian                  | Sr          | sr          | Srpski                  |
| Spanish                  | Es          | es          | Español                  |
| Swedish                  | SvSE        | sv-SE       | Svenska                  |
| Romanian                 | Ro          | ro          | Română                   |
| Russian                  | Ru          | ru          | Русский                  |
| Slovak                   | Sk          | sk          | Slovenský                |
| Slovene                  | Sl          | sl          | Slovensko                |
| Thai                     | Th          | th          | ไทย                      |
| Turkish                  | Tr          | tr          | Türkçe                   |
| Vietnamese               | Vi          | vi          | Tiếng Việt               |

\* **English (United States)** is the default locale.

## The structure of a Locale

A locale is a collection of data that defines the texts and other settings for a specific language and country.
Technically, it is an object which encapsulates this data. The translation of locale strings is grouped by class names.
Here is a small excerpt from the English Core locale:

```javascript
const locale = {

    localeName : 'En',
    localeDesc : 'English (US)',
    localeCode : 'en-US',

    DateField : {
        invalidDate : 'Invalid date input'
    },

    DatePicker : {
        gotoPrevYear  : 'Go to previous year',
        gotoPrevMonth : 'Go to previous month',
        gotoNextMonth : 'Go to next month',
        gotoNextYear  : 'Go to next year'
    },

    NumberFormat : {
        locale   : 'en-US',
        currency : 'USD'
    },
    ...
}
```

## Using source code, module and UMD bundles

To manage locales in your app, you use the `LocaleHelper` and `LocaleHelper` classes that can be imported using the 
following paths:<br>

* `PATH_TO_LIB` targets the **lib** source folder of the distribution zip. Available for licensed version only.
* `PATH_TO_BUILD` targets the **build** source folder of the distribution zip or the **node_modules/@bryntum/grid**
  folder if npm packages were used.

Importing for JavaScript code compatible with ES modules can be done with

Import from source:

```javascript
import LocaleHelper from 'PATH_TO_LIB/Core/localization/LocaleHelper.js';
import LocaleManager from 'PATH_TO_LIB/Core/localization/LocaleManager.js';
```

or import from module bundle:

```javascript
import { LocaleManager, LocaleHelper } from 'PATH_TO_BUILD/grid.module.js';
```

For UMD compatibility you may use this code:

HTML:

```html
<script src="PATH_TO_BUILD/grid.umd.js"></script>
```

JavaScript:

```javascript
const { LocaleManager } = window.bryntum.grid;
```

The code below shows import from module bundle for simplicity, but you may convert it to importing from umd or source if
you want.

## Publishing and applying locales

Bryntum Grid ships with two locale management classes [LocaleHelper](#Core/localization/LocaleHelper) and
[LocaleManager](#Core/localization/LocaleManager) which contain methods for publishing new and applying existing
locales.

The key methods and properties are:

[LocaleHelper.locales](#Core/localization/LocaleHelper#property-locales-static) - contains currently available locales.

[LocaleHelper.locale](#Core/localization/LocaleHelper#property-locale-static) - the currently active locale.

[LocaleHelper.publishLocale](#Core/localization/LocaleHelper#function-publishLocale-static) - used to publish locale 
which can be used later:

```javascript
import { LocaleHelper } from 'PATH_TO_BUILD/grid.module.js';

const locale = {

    localeName : 'En',
    localeDesc : 'English (US)',
    localeCode : 'en-US',

    // ...(locale key:value pairs)

}
LocaleHelper.publishLocale(locale);
```  

[LocaleManager.applyLocale](#Core/localization/LocaleManager#function-applyLocale) - used to set the active locale:

```javascript
import { LocaleManager } from 'PATH_TO_BUILD/grid.module.js';

LocaleManager.applyLocale('SvSE');
```

Simple assignment is also possible with [LocaleHelper.locale](#Core/localization/LocaleManager#property-locale)
property:

```javascript
import { LocaleManager } from 'PATH_TO_BUILD/grid.module.js';

LocaleManager.locale = 'SvSE';
```

## Enabling a locale with a script tag

Built locales are located in the `PATH_TO_BUILD/locales` folder. These locales are in UMD format and can be included on 
pages using normal script tags.

To include on a page using a `<script>` tag:

```html
<script src="PATH_TO_BUILD/locales/grid.locale.SvSE.js"></script>
```

By default, the first included locale is applied, but you can specify the `data-default-locale` attribute on any `<script>`
tag in your HTML page to set the one to use:

```html
<script data-default-locale="De" src="app.js"></script>
```

<div class="note">

The default English (US) locale is part of the Bryntum Grid bundle, you don't need to include it separately.

</div>

## Enabling locale with module imports

It is also possible to import locales directly from JavaScript code using the `import` statement.
This approach naturally works for frameworks such as Angular, React, Vue and others and is preferred whenever possible.

Locales would be imported at the beginning of the application code:

```javascript
import 'PATH_TO_BUILD/locales/grid.locale.SvSE.js';
```

<div class="note">

The default English locale is part of the Bryntum Grid bundle, you don't need to import it separately.

</div>

## Switching locale

You can also use `LocaleManager` from code to switch locale at any point:

```javascript
import { LocaleManager, LocaleHelper } from 'PATH_TO_BUILD/grid.module.js';

LocaleManager.locale = 'SvSE';
// or
LocaleManager.locale = LocaleHelper.locales.SvSE;
// or
LocaleManager.applylocale('SvSE');
// or
LocaleManager.applylocale(LocaleHelper.locales.SvSE);
```

## Extend existing locale

To extend an existing locale with additional localizations, first create an object with `localeName` property matching the
exising locale and add required localization `key:value`  pairs to it. Then use the
[LocaleHelper.publishLocale](#Core/localization/LocaleHelper#function-publishLocale-static) method to apply your 
localization changes to the existing locale.

Example code for extending `SvSE` locale:

```javascript
import { LocaleManager, LocaleHelper } from 'PATH_TO_BUILD/grid.module.js';
// Import default locale SvSE first. This will also publish it
import 'PATH_TO_BUILD/locales/grid.locale.SvSE.js';

const newLocalization = {

    List : {
        loading : 'Listan laddas...'
    },

    // ...(your custom locale key:value pairs)
}

// Extend locale
LocaleHelper.publishLocale('SvSE', newLocalization);

// Or extend and apply locale
LocaleManager.applyLocale('SvSE', newLocalization);
```

## Create a custom locale

To create a custom locale from scratch, create an object with `localeName`, `localeDesc` and `localeCode` properties and 
add the required localization `key:value` pairs to it. Then use
[LocaleHelper.publishLocale](#Core/localization/LocaleHelper#function-publishLocale-static) method to make it 
available for applying.

Example code for a full `Custom` locale:

```javascript
import { LocaleManager, LocaleHelper } from 'PATH_TO_BUILD/grid.module.js';

const locale = {

    localeName : 'Custom',
    localeDesc : 'Custom locale',
    localeCode : 'en-US',

    List : {
        loading : 'Your custom localization for loading'
    },

    // ... (your custom locale key:value pairs)
}

// Publish locale
LocaleHelper.publishLocale(locale);

// Apply locale
LocaleManager.locale = 'Custom';
```

**Note** that your "Custom" locale should have all localization keys to provide full localization. Copy code from
[Full locale](##full-locale) to create a new locale.

Example code for a Custom locale based on the existing SvSE locale:

```javascript
import { LocaleManager, LocaleHelper } from 'PATH_TO_BUILD/grid.module.js';
// Import default locale SvSE first. This will also publish it
import SvSELocale from 'PATH_TO_BUILD/locales/grid.locale.SvSE.js';

const locale = {

    localeName : 'Custom',
    localeDesc : 'Custom Swedish',
    localeCode : 'sv-SE',

    List : {
        loading : 'Listan laddas...'
    },

    // ... (your custom locale key:value pairs)
}

// Here we merge existing Swedish locale key:value pairs with the Custom locale
const mergedLocale = LocaleHelper.mergeLocales(SvSELocale, locale);
// Publish merged locale
LocaleHelper.publishLocale(mergedLocale);
// Apply locale
LocaleManager.locale = 'Custom';
```

## Change single entries

It is also possible to change the translation of most items one by one at runtime. Try the following approach, but
please note that any string already displayed in the UI will not change:

```javascript
import { LocaleHelper } from 'PATH_TO_BUILD/grid.module.js';

// Change for current locale
LocaleHelper.locale.List.loading = 'Loading ...';
// or change for any other locale
LocaleHelper.locales.En.List.loading = 'Loading ...';
```

<div class="note">

Please note that each published locale is represented with 
<a href="#Core/localization/LocaleHelper#typedef-Locale">Locale</a> object which includes localization pairs.

</div>

## Using the L function

The `L` function executes the translation itself and returns the localized string. The `L` function is implemented in 
the [Localizable](#Core/localization/Localizable) mixin that is mixed into each Bryntum widget so that accessing it is 
easy.

```javascript
// Get the translation used in the snippets above
const translation = List.L('loading');
```

<div class="note">

If you cannot see the docs for the <code>L</code> function, click the top-right "Show" button and make sure you have 
"Show Advanced APIs" checked

</div>

The static translations described above are enough in most cases, but they will not do for more complex
tasks where we want to implement a complex pluralization or any other localization that is based on runtime data.
For these to work we need to use functions with placeholders.

For example:

```javascript
const locale = {
    Button : {
        'Invoice button' : count => `View ${count} invoices`,
    }
}
```

The function takes one argument `data` (it can be an object) that can be used to compose the resulting displayed text (a
simple concatenation in this case). The `data` argument is passed to this function from the `L` call.

`L` must in this scenario be called with 2 arguments, for example:

```javascript
const setInvoiceButtonText = () => {
    const invoiceButton = panel.widgetMap.invoiceButton;
    invoiceButton.text = myButton.L('Invoice button', nbrUnpaidInvoices);
}
```

The first argument is the text to translate (`'My button'` in this case) and second argument is any kind of `data`
needed for the locale function (any number in this case).

Install [locale](#Core/localization/LocaleManager#event-locale) event listener on `LocaleManager` that invokes the
translations on locale change, for example:

```javascript
LocaleManager.on('locale', () => {
    setInvoiceButtonText();
});
```

## Change date formats

Dates are formatted using
[Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).
The full list of locales according to BCP 47 standard is available
[here](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).

When you create a custom locale, you need to update the `DateHelper.locale` property according to your country code. For
example, if you create a Spanish locale, you need to set:

```javascript
import { LocaleHelper } from 'PATH_TO_BUILD/grid.module.js';

const locale = {

    localeName : 'Es',
    localeDesc : 'Español',
    localeCode : 'es',

    DateHelper : {
        locale : 'es-ES'
    }
}

LocaleHelper.publishLocale(locale);
```

## Change week start day

The week start day depends on the current locale by default. To change it, configure `weekStartDay` config of the
`DateHelper` class:

```javascript
const locale = {
    DateHelper : {
        weekStartDay : 1 // 0-6 (0: Sunday, 1: Monday etc.)
    }
}
```

## Localization demo

The <a href="../examples/localization" target="_blank">localization demo</a> (found at **examples/localization**)
has custom locales under `locales` folder.

You can inspect the Localization demo and the locale files to see how to create your own locales and how to use
them in your application.

## Full locale

The code below contains full localization for Bryntum Grid which can be used for creating new locales.

```javascript
const locale = {

    localeName : 'En',
    localeDesc : 'English (US)',
    localeCode : 'en-US',

    Object : {
        Yes    : 'Yes',
        No     : 'No',
        Cancel : 'Cancel',
        Ok     : 'OK',
        Week   : 'Week'
    },

    ColorPicker : {
        noColor : 'No color'
    },

    Combo : {
        noResults          : 'No results',
        recordNotCommitted : 'Record could not be added',
        addNewValue        : value => `Add ${value}`
    },

    FilePicker : {
        file : 'File'
    },

    Field : {
        badInput              : 'Invalid field value',
        patternMismatch       : 'Value should match a specific pattern',
        rangeOverflow         : value => `Value must be less than or equal to ${value.max}`,
        rangeUnderflow        : value => `Value must be greater than or equal to ${value.min}`,
        stepMismatch          : 'Value should fit the step',
        tooLong               : 'Value should be shorter',
        tooShort              : 'Value should be longer',
        typeMismatch          : 'Value is required to be in a special format',
        valueMissing          : 'This field is required',
        invalidValue          : 'Invalid field value',
        minimumValueViolation : 'Minimum value violation',
        maximumValueViolation : 'Maximum value violation',
        fieldRequired         : 'This field is required',
        validateFilter        : 'Value must be selected from the list'
    },

    DateField : {
        invalidDate : 'Invalid date input'
    },

    DatePicker : {
        gotoPrevYear  : 'Go to previous year',
        gotoPrevMonth : 'Go to previous month',
        gotoNextMonth : 'Go to next month',
        gotoNextYear  : 'Go to next year'
    },

    NumberFormat : {
        locale   : 'en-US',
        currency : 'USD'
    },

    DurationField : {
        invalidUnit : 'Invalid unit'
    },

    TimeField : {
        invalidTime : 'Invalid time input'
    },

    TimePicker : {
        hour   : 'Hour',
        minute : 'Minute',
        second : 'Second'
    },

    List : {
        loading   : 'Loading...',
        selectAll : 'Select All'
    },

    GridBase : {
        loadMask           : 'Loading...',
        syncMask           : 'Saving changes, please wait...',
        loadFailedMessage  : 'Data loading failed!',
        syncFailedMessage  : 'Data synchronization failed!',
        unspecifiedFailure : 'Unspecified failure',
        networkFailure     : 'Network error',
        parseFailure       : 'Failed to parse server response',
        serverResponse     : 'Server response:',
        noRows             : 'No records to display',
        moveColumnLeft     : 'Move to left section',
        moveColumnRight    : 'Move to right section',
        moveColumnTo       : region => `Move column to ${region}`
    },

    PagingToolbar : {
        firstPage         : 'Go to first page',
        prevPage          : 'Go to previous page',
        page              : 'Page',
        nextPage          : 'Go to next page',
        lastPage          : 'Go to last page',
        reload            : 'Reload current page',
        noRecords         : 'No records to display',
        pageCountTemplate : data => `of ${data.lastPage}`,
        summaryTemplate   : data => `Displaying records ${data.start} - ${data.end} of ${data.allCount}`
    },

    PanelCollapser : {
        Collapse : 'Collapse',
        Expand   : 'Expand'
    },

    Popup : {
        close : 'Close'
    },

    UndoRedo : {
        Undo           : 'Undo',
        Redo           : 'Redo',
        UndoLastAction : 'Undo last action',
        RedoLastAction : 'Redo last undone action',
        NoActions      : 'No items in the undo queue'
    },

    FieldFilterPicker : {
        equals                 : 'equals',
        doesNotEqual           : 'does not equal',
        isEmpty                : 'empty',
        isNotEmpty             : 'not empty',
        contains               : 'contains',
        doesNotContain         : 'does not contain',
        startsWith             : 'starts with',
        endsWith               : 'ends with',
        isOneOf                : 'one of',
        isNotOneOf             : 'not one of',
        isGreaterThan          : 'greater than',
        isLessThan             : 'less than',
        isGreaterThanOrEqualTo : 'greater than or equal to',
        isLessThanOrEqualTo    : 'less than or equal to',
        isBetween              : 'between',
        isNotBetween           : 'not between',
        isBefore               : 'before',
        isAfter                : 'after',
        isToday                : 'today',
        isTomorrow             : 'tomorrow',
        isYesterday            : 'yesterday',
        isThisWeek             : 'this week',
        isNextWeek             : 'next week',
        isLastWeek             : 'last week',
        isThisMonth            : 'this month',
        isNextMonth            : 'next month',
        isLastMonth            : 'last month',
        isThisYear             : 'this year',
        isNextYear             : 'next year',
        isLastYear             : 'last year',
        isYearToDate           : 'year to date',
        isTrue                 : 'true',
        isFalse                : 'false',
        selectAProperty        : 'Select a property',
        selectAnOperator       : 'Select an operator',
        caseSensitive          : 'Case-sensitive',
        and                    : 'and',
        dateFormat             : 'D/M/YY',
        selectOneOrMoreValues  : 'Select one or more values',
        enterAValue            : 'Enter a value',
        enterANumber           : 'Enter a number',
        selectADate            : 'Select a date'
    },

    FieldFilterPickerGroup : {
        addFilter : 'Add filter'
    },

    DateHelper : {
        locale         : 'en-US',
        weekStartDay   : 0,
        nonWorkingDays : {
            0 : true,
            6 : true
        },
        weekends : {
            0 : true,
            6 : true
        },
        unitNames : [
            { single : 'millisecond', plural : 'ms', abbrev : 'ms' },
            { single : 'second', plural : 'seconds', abbrev : 's' },
            { single : 'minute', plural : 'minutes', abbrev : 'min' },
            { single : 'hour', plural : 'hours', abbrev : 'h' },
            { single : 'day', plural : 'days', abbrev : 'd' },
            { single : 'week', plural : 'weeks', abbrev : 'w' },
            { single : 'month', plural : 'months', abbrev : 'mon' },
            { single : 'quarter', plural : 'quarters', abbrev : 'q' },
            { single : 'year', plural : 'years', abbrev : 'yr' },
            { single : 'decade', plural : 'decades', abbrev : 'dec' }
        ],
        unitAbbreviations : [
            ['mil'],
            ['s', 'sec'],
            ['m', 'min'],
            ['h', 'hr'],
            ['d'],
            ['w', 'wk'],
            ['mo', 'mon', 'mnt'],
            ['q', 'quar', 'qrt'],
            ['y', 'yr'],
            ['dec']
        ],
        parsers : {
            L   : 'MM/DD/YYYY',
            LT  : 'HH:mm A',
            LTS : 'HH:mm:ss A'
        },
        ordinalSuffix : number => {
            const hasSpecialCase = ['11', '12', '13'].find((n) => number.endsWith(n));

            let suffix = 'th';

            if (!hasSpecialCase) {
                const lastDigit = number[number.length - 1];
                suffix = { 1 : 'st', 2 : 'nd', 3 : 'rd' }[lastDigit] || 'th';
            }

            return number + suffix;
        }
    },

    ColumnPicker : {
        column          : 'Column',
        columnsMenu     : 'Columns',
        hideColumn      : 'Hide column',
        hideColumnShort : 'Hide',
        newColumns      : 'New columns'
    },

    Filter : {
        applyFilter   : 'Apply filter',
        filter        : 'Filter',
        editFilter    : 'Edit filter',
        on            : 'On',
        before        : 'Before',
        after         : 'After',
        equals        : 'Equals',
        lessThan      : 'Less than',
        moreThan      : 'More than',
        removeFilter  : 'Remove filter',
        disableFilter : 'Disable filter'
    },

    FilterBar : {
        enableFilterBar  : 'Show filter bar',
        disableFilterBar : 'Hide filter bar'
    },

    Group : {
        group                : 'Group',
        groupAscending       : 'Group ascending',
        groupDescending      : 'Group descending',
        groupAscendingShort  : 'Ascending',
        groupDescendingShort : 'Descending',
        stopGrouping         : 'Stop grouping',
        stopGroupingShort    : 'Stop'
    },

    HeaderMenu : {
        moveBefore     : text => `Move before "${text}"`,
        moveAfter      : text => `Move after "${text}"`,
        collapseColumn : 'Collapse column',
        expandColumn   : 'Expand column'
    },

    ColumnRename : {
        rename : 'Rename'
    },

    MergeCells : {
        mergeCells  : 'Merge cells',
        menuTooltip : 'Merge cells with same value when sorted by this column'
    },

    Search : {
        searchForValue : 'Search for value'
    },

    Sort : {
        sort                   : 'Sort',
        sortAscending          : 'Sort ascending',
        sortDescending         : 'Sort descending',
        multiSort              : 'Multi sort',
        removeSorter           : 'Remove sorter',
        addSortAscending       : 'Add ascending sorter',
        addSortDescending      : 'Add descending sorter',
        toggleSortAscending    : 'Change to ascending',
        toggleSortDescending   : 'Change to descending',
        sortAscendingShort     : 'Ascending',
        sortDescendingShort    : 'Descending',
        removeSorterShort      : 'Remove',
        addSortAscendingShort  : '+ Ascending',
        addSortDescendingShort : '+ Descending'
    },

    Split : {
        split        : 'Split',
        unsplit      : 'Unsplit',
        horizontally : 'Horizontally',
        vertically   : 'Vertically',
        both         : 'Both'
    },

    Column : {
        columnLabel : column => `${column.text ? `${column.text} column. ` : ''}SPACE for context menu${column.sortable ? ', ENTER to sort' : ''}`,
        cellLabel   : emptyString
    },

    Checkbox : {
        toggleRowSelect : 'Toggle row selection',
        toggleSelection : 'Toggle selection of entire dataset'
    },

    RatingColumn : {
        cellLabel : column => `${column.text ? column.text : ''} ${column.location?.record ? `rating : ${column.location.record.get(column.field) || 0}` : ''}`
    },

    CellMenu : {
        removeRow : 'Delete'
    },

    RowCopyPaste : {
        copyRecord  : 'Copy',
        cutRecord   : 'Cut',
        pasteRecord : 'Paste',
        rows        : 'rows',
        row         : 'row'
    },

    CellCopyPaste : {
        copy  : 'Copy',
        cut   : 'Cut',
        paste : 'Paste'
    },

    PdfExport : {
        'Waiting for response from server' : 'Waiting for response from server...',
        'Export failed'                    : 'Export failed',
        'Server error'                     : 'Server error',
        'Generating pages'                 : 'Generating pages...',
        'Click to abort'                   : 'Cancel'
    },

    ExportDialog : {
        width          : '40em',
        labelWidth     : '12em',
        exportSettings : 'Export settings',
        export         : 'Export',
        exporterType   : 'Control pagination',
        cancel         : 'Cancel',
        fileFormat     : 'File format',
        rows           : 'Rows',
        alignRows      : 'Align rows',
        columns        : 'Columns',
        paperFormat    : 'Paper format',
        orientation    : 'Orientation',
        repeatHeader   : 'Repeat header'
    },

    ExportRowsCombo : {
        all     : 'All rows',
        visible : 'Visible rows'
    },

    ExportOrientationCombo : {
        portrait  : 'Portrait',
        landscape : 'Landscape'
    },

    SinglePageExporter : {
        singlepage : 'Single page'
    },

    MultiPageExporter : {
        multipage     : 'Multiple pages',
        exportingPage : ({ currentPage, totalPages }) => `Exporting page ${currentPage}/${totalPages}`
    },

    MultiPageVerticalExporter : {
        multipagevertical : 'Multiple pages (vertical)',
        exportingPage     : ({ currentPage, totalPages }) => `Exporting page ${currentPage}/${totalPages}`
    },

    RowExpander : {
        loading  : 'Loading',
        expand   : 'Expand',
        collapse : 'Collapse'
    },

    TreeGroup : {
        group                  : 'Group by',
        stopGrouping           : 'Stop grouping',
        stopGroupingThisColumn : 'Ungroup column'
    }
};

```


<p class="last-modified">Last modified on 2023-06-30 9:58:47</p>