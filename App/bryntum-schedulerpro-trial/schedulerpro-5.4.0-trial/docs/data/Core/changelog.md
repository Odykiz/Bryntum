# Bryntum Core version history

## 5.4.0 - 2023-06-30

### FEATURES / ENHANCEMENTS

* Two new widgets for editing colors has been added in this release. Firstly, there is the `ColorPicker`, which lets the
  user select from a range of pre-defined colors. It is not built for stand-alone usage, but meant to be used in a
  `Menu` or as a picker for a `PickerField`. There is also the `ColorField` which can be used as a normal form field to
  display and edit a color value. It uses the `ColorPicker` as its color picker ([#2939](https://github.com/bryntum/support/issues/2939))
* `Widget` has a new config, `maximizeOnMobile` which takes effect only on `floating` widgets on a mobile device. It
  causes the widget to be maximized instead of positioned in order to accommodate the mobile virtual keyboard
  ([#6522](https://github.com/bryntum/support/issues/6522))
* On mobile devices, `type : 'checkbox'` is rendered as a `slidetoggle` widget. The API and value is the same, it is
  just a more appropriate UI for the platform
* Improved and condensed `FieldFilterPicker` layout for better use of space ([#6232](https://github.com/bryntum/support/issues/6232))

## 5.3.8 - 2023-06-28

### FEATURES / ENHANCEMENTS

* Internal code improvements and bugfixes

## 5.3.7 - 2023-06-20

### BUG FIXES

* [#7025](https://github.com/bryntum/support/issues/7025) - `Combo` should handle being destroyed in item/select/change listeners
* [#7028](https://github.com/bryntum/support/issues/7028) - Incorrect examples for `fields` config in `FieldFilterPicker` docs

## 5.3.6 - 2023-05-26

### API CHANGES

* The `change` event for the `FieldFilterPickerGroup` now includes an additional property `validFilters`, the subset of
  filters that are complete and valid ([#6774](https://github.com/bryntum/support/issues/6774))

### BUG FIXES

* [#6805](https://github.com/bryntum/support/issues/6805) - `includeInSubset` creates duplicate records in the store
* [#6833](https://github.com/bryntum/support/issues/6833) - Enabling/disabling filter checkbox in `FieldFilterPickerGroup` throws error on the console

## 5.3.5 - 2023-05-11

### BUG FIXES

* [#6384](https://github.com/bryntum/support/issues/6384) - Inconsistent tool order in header of inline collapsed panel

## 5.3.4 - 2023-04-28

### FEATURES / ENHANCEMENTS

* Internal code improvements and bugfixes

## 5.3.3 - 2023-04-21

### BUG FIXES

* [#6166](https://github.com/bryntum/support/issues/6166) - `createOnUnmatched` only creates new record on `Enter` key press

## 5.3.2 - 2023-04-04

### BUG FIXES

* [#6428](https://github.com/bryntum/support/issues/6428) - `FullScreen.request` method should move `floatRoot` into the `fullscreened` element
* [#6433](https://github.com/bryntum/support/issues/6433) - Escape key not working in example filter field

## 5.3.1 - 2023-03-17

### FEATURES / ENHANCEMENTS

* Tree store now applies filters/sorters to any new data when calling `applyChangeset()` ([#6155](https://github.com/bryntum/support/issues/6155))

### API CHANGES

* Date parsing was made more forgiving in regard to character used to separate date parts. For example these strings are
  now all acceptable as `HH:mm`: `10:20`, `10 20`, `10-20`, `10/20` ([#6344](https://github.com/bryntum/support/issues/6344))

### BUG FIXES

* [#6312](https://github.com/bryntum/support/issues/6312) - Splitter does not move after updating to 5.3.0
* [#6328](https://github.com/bryntum/support/issues/6328) - `'move'` event `oldParent` should pass `rootNode` when moving a node from the `rootNode`

## 5.3.0 - 2023-03-02

### FEATURES / ENHANCEMENTS

* There is a new `store` field type (`StoreDataField`) which can be used for fields on records that holds arrays. The
  array will be converted to a store, manipulating the store will flag the record as modified. On serialization the
  store will be converted back to an array
* Lots (but not all) of the not so informative `object` types in our TypeScript typings have been replaced with more
  specific types. Objects that in our JavaScript are used as maps are now declared as `Record<keyType, valueType>`, and
  for functions that accept object arguments many are replaced with anonymous type declarations, such as
  `{ foo: string, bar: number }` (Partially fixed [#5176](https://github.com/bryntum/support/issues/5176))
* `AjaxHelper.fetch` now supports using request body to pass parameters for non-GET requests. Please check
  `addQueryParamsToBody` argument in the method documentation ([#2855](https://github.com/bryntum/support/issues/2855))
* The model relation system, a data layer concept used internally to link a `ResourceTimeRange` to a `Resource` in
  Scheduler, was made public. It allows you to define one-to-many relations between models in a `relations` block when
  subclassing `Model` ([#3222](https://github.com/bryntum/support/issues/3222))

### API CHANGES

* [DEPRECATED] `LocaleManager.registerLocale` and `LocaleManager.extendLocale` are deprecated.
  `LocaleHelper.publishLocale` should be used instead.
* [DEPRECATED] The type of the `fields` config for `FieldFilterPicker` and `FieldFilterPickerGroup` widgets has changed
  from array of `FieldOption`s to `Object` map of `FieldOption`s keyed by field name. The array type is now deprecated

### LOCALE UPDATES

* Locales format and process for applying locales have been simplified
* New locales for 31 languages have been added. Currently available languages are listed in the localization guide
  (Guides/Customization/Localization)

### BUG FIXES

* [#6212](https://github.com/bryntum/support/issues/6212) - Infinite loop when chaining stores using `syncDataOnLoad`

## 5.2.10 - 2023-02-17

### API CHANGES

* Recently browsers have added support for Unicode 15, which changes the output of `Intl.DateTimeFormat` when
  formatting time to include `AM`/`PM`. Those browsers now use "thin space" (`\u202f`) instead of regular space. This
  affects the `DateHelper.format()` function, but likely you do not need to take any action in your application. It
  also affects `DateHelper.parse()`, which has been updated to support the new unicode space ([#6193](https://github.com/bryntum/support/issues/6193))

### BUG FIXES

* [#5791](https://github.com/bryntum/support/issues/5791) - `EventHelper`'s listeners for `.b-using-keyboard` break iOS dragging
* [#6039](https://github.com/bryntum/support/issues/6039) - Resource order not applied with `syncDataOnLoad`
* [#6092](https://github.com/bryntum/support/issues/6092) - Wrong type for `FetchOptions`
* [#6186](https://github.com/bryntum/support/issues/6186) - Should be possible to get the previous parent in move event

## 5.2.9 - 2023-01-30

### BUG FIXES

* [#5526](https://github.com/bryntum/support/issues/5526) - Cannot open second mask using static call
* [#6014](https://github.com/bryntum/support/issues/6014) - Button menu listeners get duplicated when changing the menu
* [#6071](https://github.com/bryntum/support/issues/6071) - DomHelper `getRootElement` throwing error on creating dependency

## 5.2.8 - 2023-01-19

### BUG FIXES

* [#5386](https://github.com/bryntum/support/issues/5386) - Improved panel collapse animation when collapsed panel header is perpendicular to expanded
* [#5804](https://github.com/bryntum/support/issues/5804) - Material panel toolbar padding not symmetric

## 5.2.7 - 2023-01-11

### FEATURES / ENHANCEMENTS

* Internal code improvements and bugfixes

## 5.2.6 - 2022-12-28

### BUG FIXES

* [#5783](https://github.com/bryntum/support/issues/5783) - Calendar dropdown getting focused when click on the label
* [#5821](https://github.com/bryntum/support/issues/5821) - `constrainTo` not applied unless component is shown using `alignTo`
* [#5838](https://github.com/bryntum/support/issues/5838) - Combo clearable trigger doesn't reset validation

## 5.2.5 - 2022-12-16

### FEATURES / ENHANCEMENTS

* Store now applies filters/sorters to any new data when calling `applyChangeset()` ([#5534](https://github.com/bryntum/support/issues/5534))
* Added field `orderedParentIndex` to resolve position of the child in the ordered children array ([#5353](https://github.com/bryntum/support/issues/5353))

### BUG FIXES

* [#5674](https://github.com/bryntum/support/issues/5674) - Combo not sized the same when editable vs non-editable
* [#5692](https://github.com/bryntum/support/issues/5692) - Combos should be able to share Stores
* [#5730](https://github.com/bryntum/support/issues/5730) - `index` is ignored when insert into filtered store
* [#5732](https://github.com/bryntum/support/issues/5732) - Combo should update value collection silently when replacing store
* [#5780](https://github.com/bryntum/support/issues/5780) - ICS export datetime stamp is not UTC

## 5.2.4 - 2022-11-28

### BUG FIXES

* [#5595](https://github.com/bryntum/support/issues/5595) - Fix panel collapse icon directions

## 5.2.3 - 2022-11-17

### BUG FIXES

* [#5518](https://github.com/bryntum/support/issues/5518) - Undo does not recognise zero and null values as a change
* [#5537](https://github.com/bryntum/support/issues/5537) - `tabPanel.add()` crashes the app
* [#5587](https://github.com/bryntum/support/issues/5587) - Do not patch `offsetX`/`offsetY`

## 5.2.2 - 2022-11-08

### API CHANGES

* [DEPRECATED] The behaviour of the `store.data` getter will be changed in 6.0. Currently, it returns the **initial**
  raw dataset, in 6.0 it will be changed to have the more expected behaviour of returning the data objects for the
  **current** state instead ([#5499](https://github.com/bryntum/support/issues/5499))

### BUG FIXES

* [#5491](https://github.com/bryntum/support/issues/5491) - `onToolClick` not working correctly (even with `callOnFunctions: true`)

## 5.2.1 - 2022-10-28

### API CHANGES

* `TreeNode.isRoot` property is now public ([#5471](https://github.com/bryntum/support/issues/5471))

### BUG FIXES

* [#5409](https://github.com/bryntum/support/issues/5409) - `Field`'s `fetchInputValue` ignores the `inputValueAttr` setting
* [#5451](https://github.com/bryntum/support/issues/5451) - `DatePicker` animation glitch
* [#5480](https://github.com/bryntum/support/issues/5480) - `EventHelper` has globally visible breaking side effects

## 5.2.0 - 2022-10-13

### FEATURES / ENHANCEMENTS

* Menu has a `separator` config to make it easier to visually separate menu items
* The responsive state objects used in the `responsive` config of the `Responsive` mixin now support a `once` property
  to allow configs to only be set on first activation of the state
* The `Core.helper.DateHelper` class has a new method `formatRange` method which can format date ranges, as well as new
  formatting options for week numbers
* Added new `FieldFilterPicker` and `FieldFilterPickerGroup` widgets, providing UI to manage a set of CollectionFilters

### API CHANGES

* [DEPRECATED] The `DomHelper.up()` function was deprecated, use native `element.closest()` instead

### BUG FIXES

* [#2512](https://github.com/bryntum/support/issues/2512) - Implement `ignoreParentReadOnly` config on `Widget`

## 5.1.5 - 2022-10-12

### FEATURES / ENHANCEMENTS

* New records are assigned a generated `id` if none is provided. The generated `id` is meant to be temporary (a
  phantom `id`), and should be replaced by the backend on commit. Previously the `id` was based on a global counter
  incremented with each assignment. That simplistic scheme assured no two records got the same `id` during a session,
  but if an application serialized the generated `id` (note, they should not) and then reloaded it, it would eventually
  collide with a new generated `id`. To prevent this, the generated `id`s are now based on a random UUID instead
* Stores now by default show a warning on console when loading records that has generated `id`s, as a reminder that it
  should be replaced by the backend on commit

### BUG FIXES

* [#4645](https://github.com/bryntum/support/issues/4645) - Improve error message "Bryntum bundle included twice"
* [#5341](https://github.com/bryntum/support/issues/5341) - `Picker` is shown for `Combo` with `keyStrokeFilterDelay` after clearing value

## 5.1.4 - 2022-09-29

### FEATURES / ENHANCEMENTS

* FilterBar feature now allows you to configure `operator` and `caseSensitive` on a column's `filterable` config object

### BUG FIXES

* [#4974](https://github.com/bryntum/support/issues/4974) - `AjaxStore` continuously making remote requests after store grouping when `sortParamName` is set
* [#5213](https://github.com/bryntum/support/issues/5213) - `DatePicker` can't move months if min date is after current date
* [#5214](https://github.com/bryntum/support/issues/5214) - `AjaxStore` continuously making remote requests after store sorting with `syncDataOnLoad` set to `true`
* [#5282](https://github.com/bryntum/support/issues/5282) - Make `AjaxStore` urls changeable

## 5.1.3 - 2022-09-09

### BUG FIXES

* [#415](https://github.com/bryntum/support/issues/415) - Improve docs on formatting currency values on `NumberField`
* [#5125](https://github.com/bryntum/support/issues/5125) - Setting an initial value for `activeTab` on a `TabPanel` no longer animates that tab into view
* [#5136](https://github.com/bryntum/support/issues/5136) - `callOnFunctions: true` triggers an error when on function is not set
* [#5182](https://github.com/bryntum/support/issues/5182) - `TimeField` should keep date if user types in the value
* [#5201](https://github.com/bryntum/support/issues/5201) - `Store` sort uses `localeCompare` for non-string types

## 5.1.2 - 2022-08-29

### FEATURES / ENHANCEMENTS

* Configs that accept configuration options for a widget (or other class) are now (mostly) documented to accept a typed
  config object rather than a plain object. For example instead of `{Object} tooltip - A tooltip configuration object`,
  it is now `{TooltipConfig} tooltip - A tooltip configuration object`. This improves our TypeScript typings (transforms
  to `Partial<TooltipConfig>` in typings) when using such configs, but also improves our docs by linking to the configs
  of the type
* Added a `keepDate` config to the `TimeField`. By default, it is false and sets date component of the field value to
  `January 1st`. Set it to true to keep original value intact and only change the time component ([#5058](https://github.com/bryntum/support/issues/5058))
* Excel export feature now accepts a `rows` array to export only certain rows instead of the full dataset

### BUG FIXES

* [#4953](https://github.com/bryntum/support/issues/4953) - `List` component does not process the disabled config
* [#5088](https://github.com/bryntum/support/issues/5088) - Crash when entering number into paging toolbar `page` field

## 5.1.1 - 2022-07-28

### BUG FIXES

* [#4958](https://github.com/bryntum/support/issues/4958) - List store reload needs to reset selection if no incoming records match previous selection

## 5.1.0 - 2022-07-21

### FEATURES / ENHANCEMENTS

* Updated the built-in version of FontAwesome Free to `6.1.1`
* Our TypeScript typings for string types that have a predefined set of alternatives was improved to only accept
  those alternatives. For example previously the `dock` config which was previously declared as `dock: string` is now
  `dock : 'top'|'right'|'bottom'|'left'`
* `KeyMap` is a mixin that allows for standardized and customizable keyboard shortcuts functionality. `KeyMap` is by
  default mixed in to `Widget` and therefore available to all `Widget`'s child classes. There is a new guide
  **Guides/Customization/Keyboard shortcuts** describing how to customize currently integrated keyboard shortcuts
  ([#4300](https://github.com/bryntum/support/issues/4300), [#4313](https://github.com/bryntum/support/issues/4313), [#4328](https://github.com/bryntum/support/issues/4328))

### BUG FIXES

* [#4683](https://github.com/bryntum/support/issues/4683) - Menu misaligned after window resizing
* [#4696](https://github.com/bryntum/support/issues/4696) - Parents sorted below children in docs
* [#4697](https://github.com/bryntum/support/issues/4697) - Too dark code background in docs
* [#4936](https://github.com/bryntum/support/issues/4936) - Combo with `autoexpand: true` closes immediately on first click of dropdown arrow

## 5.0.7 - 2022-07-13

### BUG FIXES

* [#4916](https://github.com/bryntum/support/issues/4916) - `Fullscreen` is not working on mobile Safari

## 5.0.6 - 2022-06-20

### BUG FIXES

* [#841](https://github.com/bryntum/support/issues/841) - Add `searchAllRecords` flag to store search functions
* [#4146](https://github.com/bryntum/support/issues/4146) - TaskEditor clears time when editing events with datetime picker
* [#4804](https://github.com/bryntum/support/issues/4804) - Radiobutton hover effect incorrectly positioned in Material theme when on RTL

## 5.0.5 - 2022-05-30

### BUG FIXES

* [#4350](https://github.com/bryntum/support/issues/4350) - Fixed various panel collapse issues
* [#4592](https://github.com/bryntum/support/issues/4592) - `UndoRedo` needs the `transactionsCombo` `emptyText` localized
* [#4636](https://github.com/bryntum/support/issues/4636) - Model field is not exposed correctly if data is not preloaded to the store
* [#4657](https://github.com/bryntum/support/issues/4657) - Cannot navigate out of the datetime field using `Shift + Tab`

## 5.0.4 - 2022-05-11

### API CHANGES

* Container's `autoUpdateRecord` config was made public. Set it to `true` to update record fields when child fields
  change ([#4073](https://github.com/bryntum/support/issues/4073))
* Model's `clearChanges` function parameter `includeDescendants` made public. Set it to `false` to not clear changes on
  a node's descendants ([#4565](https://github.com/bryntum/support/issues/4565))

## 5.0.3 - 2022-04-26

### BUG FIXES

* [#4496](https://github.com/bryntum/support/issues/4496) - createOnUnmatched doc is wrong

## 5.0.2 - 2022-04-13

### API CHANGES

* Deprecated `showByPoint()` in Widget, it will be removed in version 6.0. Use `showBy()` instead

### BUG FIXES

* [#2796](https://github.com/bryntum/support/issues/2796) - Allow customizing Roboto path in material theme
* [#3548](https://github.com/bryntum/support/issues/3548) - `SimpleEdit` should cancel when scrolled out of view
* [#4333](https://github.com/bryntum/support/issues/4333) - Gantt task editor end date picker arrows are not working
* [#4334](https://github.com/bryntum/support/issues/4334) - Material radio button circle misaligned
* [#4351](https://github.com/bryntum/support/issues/4351) - Listeners object breaks click functionality
* [#4360](https://github.com/bryntum/support/issues/4360) - Wrong color of checkbox checkmark in Stockholm theme
* [#4373](https://github.com/bryntum/support/issues/4373) - Panel collapse arrow pointing in wrong direction initially
* [#4377](https://github.com/bryntum/support/issues/4377) - Change radio button to use `<div>` for the selected circle
* [#4398](https://github.com/bryntum/support/issues/4398) - `Tooltips` should use `allowOver:true` if they are shown with visible and enable tools or items
* [#4404](https://github.com/bryntum/support/issues/4404) - List needs a simple selection API
* [#4406](https://github.com/bryntum/support/issues/4406) - Fixed items in disabled `fieldset`/`radiogroup` not being disabled

## 5.0.1 - 2022-03-04

### BUG FIXES

* [#4105](https://github.com/bryntum/support/issues/4105) - Adjust splitter hover and moving width
* [#4244](https://github.com/bryntum/support/issues/4244) - Corrected `RadioGroup` interaction with `autoUpdateRecord` not producing the correct value

## 5.0.0 - 2022-02-21

### FEATURES / ENHANCEMENTS

* `Model` has a new `readOnly` field that is respected by UI level editing features to disallow editing records having
  `readOnly : true`. It does not directly affect the datalayer, meaning that you can still programmatically edit the
  records ([#665](https://github.com/bryntum/support/issues/665))
* New `Radio` and `RadioGroup` widgets were added ([#1357](https://github.com/bryntum/support/issues/1357))
* `window` references are replaced with `globalThis` which is supported in all modern browsers and across different JS
  environments ([#4071](https://github.com/bryntum/support/issues/4071))
* Updated FontAwesome Free to version 6, which includes some new icons sponsored by Bryntum in the charts category:
  https://fontawesome.com/search?m=free&c=charts-diagrams&s=solid

### API CHANGES

* [BREAKING] TextAreaField was renamed to TextAreaPickerField to serve only as a picker-type field. A new TextAreaField
  widget was added which is used in Gantt's NotesTab
* [BREAKING] TextAreaPickerField's `inline` config has been removed, use TextAreaField instead
* Store's `toJSON()` method now ignores all local filters and returns all records ([#4101](https://github.com/bryntum/support/issues/4101))
* The following previously deprecated configs, functions etc. where removed:
* Config `DatePicker#editOnHover` - no replacement, no longer relevant
* Argument `newId.deep` for `Model#copy()` - previously replaced by separate `deep` argument
* Config `DateDataField#dateFormat` - previously replaced by `format` config
* Config `ContextMenuBase#menuConfig` - previously replaced by `menu` config
* Function `ObjectHelper.allKeys()` - previously replaced by `keys()` function
* Function `StringHelper.capitalizeFirstLetter()` - previously replaced by `capitalize()` function
* Function `StringHelper.lowercaseFirstLetter()` - previously replaced by `uncapitalize()` function
* Argument `config.element`for `ScrollManager#startMonitoring()` - previously replaced by `config.scrollables` arg
* Config `Button#menuIconCls` - previously replaced by `menuIcon` config
* Config `Tooltip.html` no longer handles returning `false` as a way of flagging the tooltip content as async -
      previously replaced by the `showAsyncMessage` config
* Param `record` of the `Store#move` event - previously replaced with the `records` param
* Old `TreeNode#insertChild()` signature - previously replaced with current `(childRecord, before, silent)` 
      signature
* Argument `returnAll` for `DomHelper.createElement` - previously replaced by `options.returnAll`

### BUG FIXES

* [#758](https://github.com/bryntum/support/issues/758) - State mixin to use configurable's `onConfigChange` hook
* [#3665](https://github.com/bryntum/support/issues/3665) - DateField and DatePicker accessibility
* [#3947](https://github.com/bryntum/support/issues/3947) - Inconsistent right / bottom padding in MessageDialog
* [#3952](https://github.com/bryntum/support/issues/3952) - Wrong border bottom color for panel header
* [#4022](https://github.com/bryntum/support/issues/4022) - Panel collapse icon
* [#4086](https://github.com/bryntum/support/issues/4086) - Allow derived classes to adjust delayable method options

## 4.3.8 - 2022-02-07

### FEATURES / ENHANCEMENTS

* Internal code improvements and bugfixes

## 4.3.7 - 2022-02-02

### FEATURES / ENHANCEMENTS

* Added public `dragStart` / `drag` / `drop` events to Splitter class ([#4060](https://github.com/bryntum/support/issues/4060))

### BUG FIXES

* [#3770](https://github.com/bryntum/support/issues/3770) - Fix handling of initially collapsed panels with configured size
* [#4041](https://github.com/bryntum/support/issues/4041) - `TextArea` ignores arrowDown key press
* [#4080](https://github.com/bryntum/support/issues/4080) - Sub-menu closes when moving over gap
* [#4082](https://github.com/bryntum/support/issues/4082) - Relayed listeners do not trigger onFunctions

## 4.3.6 - 2022-01-13

### BUG FIXES

* [#3788](https://github.com/bryntum/support/issues/3788) - Minimum value for duration field in Task Editor works incorrect
* [#3945](https://github.com/bryntum/support/issues/3945) - Cannot select text in popup
* [#3958](https://github.com/bryntum/support/issues/3958) - Fix panel collapser docs for `direction` config
* [#3978](https://github.com/bryntum/support/issues/3978) - Clicking selected day cell in datepicker causes refresh
* [#3987](https://github.com/bryntum/support/issues/3987) - StoreSync fails when using tree data with lazy loaded parent nodes
* [#3990](https://github.com/bryntum/support/issues/3990) - Chrome & Content Security Policy causes failure because of debug code section

## 4.3.5 - 2021-12-24

### BUG FIXES

* [#3848](https://github.com/bryntum/support/issues/3848) - Animator transitions now properly track their timers
* [#3928](https://github.com/bryntum/support/issues/3928) - DateHelper `k` format behaves incorrectly

## 4.3.4 - 2021-12-13

### BUG FIXES

* [#3674](https://github.com/bryntum/support/issues/3674) - Collapsed Panel fixes its container's height
* [#3816](https://github.com/bryntum/support/issues/3816) - `move` event is not triggered when moving a node in a `TreeStore`
* [#3840](https://github.com/bryntum/support/issues/3840) - The `menu` config for a button with only `listeners` is now treated as the config for the menu and not
  an item named "listeners"
* [#3850](https://github.com/bryntum/support/issues/3850) - [TypeScript] Missing static properties in typings
* [#3855](https://github.com/bryntum/support/issues/3855) - Setting a ModelDataField in a record could recurse infinitely

## 4.3.3 - 2021-11-30

### BUG FIXES

* [#3625](https://github.com/bryntum/support/issues/3625) - Panels that collapse right now display the expand tool on the top, clicking header of collapsed panel
  will expand the panel
* [#3637](https://github.com/bryntum/support/issues/3637) - When tooltip uses a `forSelector` and `trackMouse`, moving within its active target can hide it
* [#3644](https://github.com/bryntum/support/issues/3644) - Menu hide does not cause `subMenu` hide when `subMenu` is from an `overflow` config button clone
* [#3670](https://github.com/bryntum/support/issues/3670) - STM `resetQueue` error if a transaction is being recorded
* [#3674](https://github.com/bryntum/support/issues/3674) - Remove unnecessary `min-height`/`min-width` on collapsed panels sized by their container
* [#3678](https://github.com/bryntum/support/issues/3678) - Widget `draggable` does not constrain
* [#3740](https://github.com/bryntum/support/issues/3740) - Support async `beforeShow` event on a widget
* [#3749](https://github.com/bryntum/support/issues/3749) - Panels with no header now work when `collapsible : { tool : null }` is specified (collapse and expand
  must be performed via the API)

## 4.3.2 - 2021-10-29

### FEATURES/ENHANCEMENTS

* New PasswordField widget added
* New Field `inputType` config allowing to specify the native input element type used by the field

### BUG FIXES

* [#3566](https://github.com/bryntum/support/issues/3566) - `LocaleHelper` should not throw exception when trying to `trimLocale` with non-existent key
* [#3622](https://github.com/bryntum/support/issues/3622) - Edited cell is not marked when initial cell value is `0` or `undefined`

## 4.3.1 - 2021-10-21

### FEATURES / ENHANCEMENTS

* Bumped builtin Font Awesome Free to version 5.15.4

### BUG FIXES

* [#3567](https://github.com/bryntum/support/issues/3567) - Minified css bundle contains unicode chars

## 4.3.0 - 2021-10-12

### FEATURES/ENHANCEMENTS

* Panels can now be collapsed when configured as `collapsible` ([#914](https://github.com/bryntum/support/issues/914))

### API CHANGES

* [DEPRECATED] Buttons `menuIconCls` config was deprecated in favor of the new `menuIcon` config, which better matches
  the naming of other configs

### BUG FIXES

* [#3457](https://github.com/bryntum/support/issues/3457) - Fix toolbar overflow handling of text field when typing

## 4.2.7 - 2021-10-01

### FEATURES / ENHANCEMENTS

* You can now control if the widget tooltip should be shown when the widget is disabled using the
  `showTooltipWhenDisabled` config
* `ComboBox` can now be configured to accept unmatched typed filter strings to create a new record
  Use the `createOnUnmatched` config to enable this. This may be configured as a function to
  create the new record in an app-specific way ([#3249](https://github.com/bryntum/support/issues/3249))

### BUG FIXES

* [#3415](https://github.com/bryntum/support/issues/3415) - Generate unique phantom ids across all stores
* [#3458](https://github.com/bryntum/support/issues/3458) - Document nested fields

## 4.2.6 - 2021-09-15

### FEATURES / ENHANCEMENTS

* You can now control if the widget tooltip should be shown when the widget is disabled using the
  `showTooltipWhenDisabled` config

### BUG FIXES

* [#3179](https://github.com/bryntum/support/issues/3179) - Tooltip is not shown for a disabled button

## 4.2.5 - 2021-09-08

### FEATURES / ENHANCEMENTS

* The API documentation now better communicates when a field or property accepts multiple input types but uses a single
  type for output. For example date fields on models, which usually accepts a `String` or `Date` but always outputs a
  `Date` ([#2933](https://github.com/bryntum/support/issues/2933))

### BUG FIXES

* [#3373](https://github.com/bryntum/support/issues/3373) - Combo blank entry is less tall

## 4.2.4 - 2021-08-27

### BUG FIXES

* [#3096](https://github.com/bryntum/support/issues/3096) - Slider#showTooltip: false does not disable tooltip
* [#3294](https://github.com/bryntum/support/issues/3294) - List should update its selection prior to firing its item event
* [#3302](https://github.com/bryntum/support/issues/3302) - TreeStore#move does not update tree contents properly
* [#3332](https://github.com/bryntum/support/issues/3332) - [LWC] Exception when realigning popup

## 4.2.3 - 2021-08-05

### FEATURES / ENHANCEMENTS

* Internal code improvements and bugfixes

## 4.2.2 - 2021-07-21

### BUG FIXES

* [#416](https://github.com/bryntum/support/issues/416) - TreeNode children field cannot be mapped
* [#1632](https://github.com/bryntum/support/issues/1632) - Splitter should handle if flex direction changes
* [#3039](https://github.com/bryntum/support/issues/3039) - Fixed incorrect `dragcancel` firing when only a click (and no drag) occurred
* [#3151](https://github.com/bryntum/support/issues/3151) - TabPanel should fire `beforeTabChange` event
* [#3168](https://github.com/bryntum/support/issues/3168) - Date picker doesn't allow to navigate to month if minimum value is set

## 4.2.1 - 2021-07-07

### FEATURES / ENHANCEMENTS

* Internal code improvements and bugfixes

## 4.2.0 - 2021-06-30

### FEATURES / ENHANCEMENTS

* MessageDialog class now has a `prompt` method and an `alert` method ([#2653](https://github.com/bryntum/support/issues/2653))
* Added a new `bubbleEvents` config to specify events that should always bubble. Useful for example on fields in a
  container, to bubble `change` events and catch them in a listener on the container

### API CHANGES

* Added a new `Responsive` mixin that can be mixed into widgets to allow responsive behaviour ([#2672](https://github.com/bryntum/support/issues/2672))
* [BREAKING] `GlobalEvents` is no longer exposed on `window`. If you use it in your application, import it instead

### BUG FIXES

* [#2459](https://github.com/bryntum/support/issues/2459) - Support for drop down with grouped list
* [#2556](https://github.com/bryntum/support/issues/2556) - List is not updated when record id is modified

## 4.1.6 - 2021-06-23

### FEATURES / ENHANCEMENTS

* ButtonGroup now fires `toggle` event when a button in the group is toggled
* Button fires `toggle` event **only** when its `pressed` state is changed

### BUG FIXES

* [#278](https://github.com/bryntum/support/issues/278) - Calling tree store removeAll(true) unbinds rootNode from store
* [#3008](https://github.com/bryntum/support/issues/3008) - Remove childElementCount usages, unsupported in LWC
* [#3078](https://github.com/bryntum/support/issues/3078) - Avatars initials not rendering inside perfect circle

## 4.1.5 - 2021-06-09

### BUG FIXES

* [#1299](https://github.com/bryntum/support/issues/1299) - Add "select all" option for multi-select combo
* [#1596](https://github.com/bryntum/support/issues/1596) - Collapsed groups disappear when using filterBar

## 4.1.4 - 2021-05-28

### FEATURES / ENHANCEMENTS

* Buttons now has a new style `b-transparent` that renders them without background or borders ([#2853](https://github.com/bryntum/support/issues/2853))

### BUG FIXES

* [#2104](https://github.com/bryntum/support/issues/2104) - "Core" code not isomorphic
* [#2502](https://github.com/bryntum/support/issues/2502) - Allow multiple Droppable per element
* [#2775](https://github.com/bryntum/support/issues/2775) - Combo replaces its store data on set value if filterParamName defined
* [#2828](https://github.com/bryntum/support/issues/2828) - Memory leak when replacing project instance
* [#2834](https://github.com/bryntum/support/issues/2834) - Core should not use b-fa for icon prefix
* [#2874](https://github.com/bryntum/support/issues/2874) - Filter field should not grow when X is shown

## 4.1.3 - 2021-05-13

### FEATURES / ENHANCEMENTS

* Bumped the built in version of FontAwesome Free to 5.15.3 and added missing imports to allow stacked icons etc
* Bumped the `@babel/preset-env` config target to `chrome: 75` for the UMD and Module bundles. This decreased bundle
  sizes and improved performance for modern browsers

### BUG FIXES

* [#2866](https://github.com/bryntum/support/issues/2866) - Missing method return value type for `DomHelper.isInView` and `DomHelper.isFocusable`

## 4.1.2 - 2021-04-27

### BUG FIXES

* [#2677](https://github.com/bryntum/support/issues/2677) - Fixed improper toolbar overflow handling of buttons with menus

## 4.1.1 - 2021-04-23

### FEATURES / ENHANCEMENTS

* Popups can now be maximized to fill the visible viewport
* New config `autoHeight` on Tab Panel to set the height of all tabs to match the tab with the highest content
* Display field can now accept a template formatting its value, which can now also be markup ([#2641](https://github.com/bryntum/support/issues/2641))

### BUG FIXES

* [#109](https://github.com/bryntum/support/issues/109) - Slider label should not have right margin
* [#491](https://github.com/bryntum/support/issues/491) - Store loadChildren should remove existing children
* [#2410](https://github.com/bryntum/support/issues/2410) - List hide/show methods lose parent promises
* [#2482](https://github.com/bryntum/support/issues/2482) - MultiSelect Combo set value doesn't work when configured filterSelected : true
* [#2504](https://github.com/bryntum/support/issues/2504) - Toolbar's overflow button should begin life hidden
* [#2533](https://github.com/bryntum/support/issues/2533) - Panel items laid out using spacing by default
* [#2579](https://github.com/bryntum/support/issues/2579) - Popup should be maximizable
* [#2616](https://github.com/bryntum/support/issues/2616) - Varying padding-left in Panel
* [#2662](https://github.com/bryntum/support/issues/2662) - Toolbar can create duplicate IDs in overflow menu
* [#2671](https://github.com/bryntum/support/issues/2671) - parentIndex field has incorrect value after clearing filters

## 4.1.0 - 2021-04-02

### FEATURES / ENHANCEMENTS

* API code improvements for better XSS injection protection
* Model fields can now be marked with `alwaysWrite` to ensure important data fields are always included when updates
* Refactored `TabPanel` base class to `Panel` from `Container`. The `Panel` class's algorithm for handling docked
  items (such as `tbar` and `bbar`) was enhanced to work with the new `tabBar` config of `TabPanel` using the new
  `strips` config. The `strips` config is like `tools` except it is designed for toolbars. The items in `strips`
  have a `dock` config to specify the edge to which they dock (`'top'`, `'left'`, `'bottom'`, or `'right'`) or,
  alternatively, `'header'` or `'pre-header'` to position the toolbar in the panel's header after or before the
  title, respectively. These items also use their `weight` config to determine their docking order. The higher the
  item's `weight`, the closer it will be to the panel's central body element ([#1837](https://github.com/bryntum/support/issues/1837))
* Refactored the tab strip of `TabPanel` into a `TabBar` widget that extends `Toolbar`. This uses the new `tabBar`
  config of `TabPanel` to add an item to the new `strips` config of `Panel`. The `tabBar` uses its `weight` config
  to order it along with `tbar` and `bbar` of the `Panel`. The `tabBar` also inherits the `overflow` feature of
  `Toolbar` ([#1827](https://github.com/bryntum/support/issues/1827))
* Panel now has a `bodyCls` config to place CSS classes on the body element
* DatePicker now supports `cellRenderer` to output custom contents into the date cells ([#2498](https://github.com/bryntum/support/issues/2498))

### BUG FIXES

* [#876](https://github.com/bryntum/support/issues/876) - `store.query` should search through all records when searchAllRecords is true
* [#1819](https://github.com/bryntum/support/issues/1819) - DatePicker styling issues
* [#2128](https://github.com/bryntum/support/issues/2128) - Support for top-positioned field labels
* [#2194](https://github.com/bryntum/support/issues/2194) - Setting `title` on item in a `TabPanel` now updates the text of the tab in the tab bar
* [#2235](https://github.com/bryntum/support/issues/2235) - Not possible to type in negative numbers to the number field
* [#2273](https://github.com/bryntum/support/issues/2273) - Toast shows blank space at right side
* [#2317](https://github.com/bryntum/support/issues/2317) - Date picker jumps to wrong month when clicking next
* [#2435](https://github.com/bryntum/support/issues/2435) - TabPanel issues
* [#2439](https://github.com/bryntum/support/issues/2439) - Drag and drop selects text in Safari

## 4.0.7 - 2021-01-12

### FEATURES / ENHANCEMENTS

* Internal code improvements and bugfixes

## 4.0.5 - 2020-12-15

### BUG FIXES

* [#1826](https://github.com/bryntum/support/issues/1826) - Setting hidden/disabled property to tabs in TabPanel does not work as expected

## 4.0.4 - 2020-12-09

### FEATURES/ENHANCEMENTS

* Added config to specify allowed units (DurationField.allowedUnits) for the duration field ([#1891](https://github.com/bryntum/support/issues/1891))

## 4.0.3 - 2020-11-17

### BUG FIXES

* [#1811](https://github.com/bryntum/support/issues/1811) - Number field `changeOnSpin` flag doesn't work as expected

## 4.0.2 - 2020-11-04

### FEATURES / ENHANCEMENTS

* Internal code improvements and bugfixes

## 4.0.6 - 2020-11-03

### BUG FIXES

* [#1413](https://github.com/bryntum/support/issues/1413) - Card layout change animation
* [#2075](https://github.com/bryntum/support/issues/2075) - Widget's `newInstance` tooltip cannot be dynamically reconfigured

## 4.0.1 - 2020-11-03

### BUG FIXES

* [#1218](https://github.com/bryntum/support/issues/1218) - ComboBox list should be anchored to top/bottom sides only
* [#1729](https://github.com/bryntum/support/issues/1729) - Added border color for disabled button

## 4.0.0 - 2020-10-19

### API CHANGES

* Mask `progress` and `maxProgress` are now public properties
* The `Core/adapter` directory has been removed. There are no Widget adapters. All Widget classes register themselves
  with the `Widget` class, and the `Widget` class is the source of Widget `type` mapping and Widget registration and
  lookup by `id`
* Toolbars now have an inner element to wrap their child items with the class `'b-toolbar-content'`
  If you had customized CSS which targeted toolbar items, this may need to change

### FEATURES/ENHANCEMENTS

* Added new 'filterfield' to filter a Store
* Added new class `Core.helper.XMLHelper` with method to convert object to XML format
* Added XSS protection functions: `StringHelper.encodeHtml` and `StringHelper.xss`
* The `Toolbar` class now has an `overflow` config which may be `scroll` or `menu` to specify how overflowing toolbar
  items can be accessed

### BUG FIXES

* [#1349](https://github.com/bryntum/support/issues/1349) - Not possible to type into field with text selected
* [#1483](https://github.com/bryntum/support/issues/1483) - Fixed time format with AM/PM removing the "0" changing from 09:00 PM to 9:00 PM
* [#1542](https://github.com/bryntum/support/issues/1542) - Scheduler put inside of panel gets narrow with overlay scrollbar
* [#1555](https://github.com/bryntum/support/issues/1555) - Changed time format with AM/PM to return minutes only if is greater than "0" for `En` localization
* [#1644](https://github.com/bryntum/support/issues/1644) - Fixed `NumberField` enforcement of min/max values to allow typing beyond those ranges
* [#1694](https://github.com/bryntum/support/issues/1694) - Label overlaps start trigger in material theme
* [#1779](https://github.com/bryntum/support/issues/1779) - Label overlaps trigger icon in DateTimeField if value is empty

## 3.0.2 - 2020-01-29

### FEATURES/ENHANCEMENTS

* The core.module.js bundle is now lightly transpiled to ECMAScript 2015 using Babel to work with more browsers out of
  the box
* parentIndex is now a public field of TreeNode ([#358](https://github.com/bryntum/support/issues/358))
* Font Awesome 5 Pro was replaced with Font Awesome 5 Free as the default icon font (MIT / SIL OFL license)
* Font Awesome should be bound to font-weight 900 ([#596](https://github.com/bryntum/support/issues/596))
* The default year for our time components has been changed, they now use 2020 instead of 1970. For example,
  whatever time you set to the TimeField, the date will be Jan 1, 2020
* All widgets which contain other widgets can now be set to `readOnly : true` in addition to Field widgets
  This means it is easy to "lock" a UI to allow it to display information to users who may not have authorization
  to modify data
* The `Widget` `align` config's object form now accepts the `monitorResize` option, specifying that during
  aligned visibility, the Widget should monitor its target's size, and realign if it changes
* The `StateTrackingManager` now fires a new `disabled` event indicating its disabled state

### API CHANGES

* ObjectHelper#setPath method became chainable: it returns passed object instance
* DateHelper.getTime now accepts date as a parameter to extract time of
* Added DateHelper.defaultParseFormat property to allow separate formats for date/time parsing and formatting
* Model#copy now accepts an object with new values used to create the copy
* DEPRECATED: Model#copy no longer accepts passing `deep` property of the first parameter. Use 2nd parameter to indicate
  deep copying instead
* Removed not used localizations `DateHelper.shortWeek`, `DateHelper.shortQuarter`, `DateHelper.week`,
  `InstancePlugin.fnMissing`, `InstancePlugin.overrideFnMissing`
* Added `Model.clearChanges` method to clear record modifications without reverting them
* Added `DateHelper.getWeekNumber` method to get week number by date
* Model fields in derived classes are now merged with corresponding model fields (by name) in super classes. This allows
  serialization and other attributes to be inherited when a derived class only wants to change the `defaultValue` or
  other attribute of the field
* The `dateFormat` config for `type='date'` model fields has been simplified to `format`

### BUG FIXES

* [#742](https://github.com/bryntum/support/issues/742) - Not persistable data change may initiate a commit with an empty object
* [#756](https://github.com/bryntum/support/issues/756) - Cannot copy task when using deep: true flag
* [#330](https://github.com/bryntum/support/issues/330) - Id collision happens when you add or move records after filters are cleared
* [#422](https://github.com/bryntum/support/issues/422) - Theme switching leaks elements and crashes if changing multiple times with slow network
* [#492](https://github.com/bryntum/support/issues/492) - Button pressed/hover state sticks after click
* [#501](https://github.com/bryntum/support/issues/501) - DateHelper can't parse time with milliseconds correctly
* [#719](https://github.com/bryntum/support/issues/719) - Direction of sorting gets changed after each sort call with a sorting function provided
* [#729](https://github.com/bryntum/support/issues/729) - Field validation messages should be localizable
* [#769](https://github.com/bryntum/support/issues/769) - Popup is not aligned to target properly with constrainTo
* [#872](https://github.com/bryntum/support/issues/872) - Card layout Containers (eg `TabPanel`) now use the Widget `hide`/`show` API to hide and show child items
  meaning that apps can detect and react to these lifecycle events
* [#975](https://github.com/bryntum/support/issues/975) - STM doesn't update store changes properly
* [#1393](https://github.com/bryntum/support/issues/1393) - Combo's field overwritten during type-to-filter

## 3.0.1 - 2020-01-16

### FEATURES/ENHANCEMENTS

* Store can now remove individual filters by filter id or Filter instance using `store.removeFilter` ([#462](https://github.com/bryntum/support/issues/462))

### BUG FIXES

* [#2](https://github.com/bryntum/support/issues/2) - Not possible to enter 00:00 into time field
* [#213](https://github.com/bryntum/support/issues/213) - The `FilePicker` would fire two `change` events on each file selection. IE11 and Edge would also not
  fire the `change` event correctly, often not firing on the first user selection. Both issues have been corrected
* [#253](https://github.com/bryntum/support/issues/253) - Fixed exception when a popup (such as a context menu) would lose focus due to an active editor's
  `invalidAction: 'block'` setting. Such editors return focus to themselves when invalid, causing the popup to hide
  itself in the middle of its `show()` call
* [#258](https://github.com/bryntum/support/issues/258) - CheckBox should be usable as a field

## 3.0.0 - 2019-12-20

### FEATURES/ENHANCEMENTS

* Added `leadingZeroes` config option for NumberField (#7524)
* Localization. Common localizable words and phrases may now be added to a common `Object` block of properties and will
  be accessible to all classes
* Added support for named listeners ([#43](https://github.com/bryntum/support/issues/43))

### API CHANGES

* BREAKING: Model no longer considers `null` as a valid id on records. It is now handled the same way as if id was
  undefined, meaning that a generated id will be assigned instead. If you use `null` as id on a record in your code,
  this change might be breaking

  We recommend to always supply an id for records from your backend, and there is a new setting on Store to enforce
  that. Configuring Store with `allowNoId: false` will make it throw if a record without id is loaded (#8570)
* `Mask` now accepts a `target` config instead of an `element` config. The constructor converts an `element` in the
  config object to the new `target` config, but passing `element` is now deprecated
* BREAKING: The `element` property of a `Mask` instance is now the mask's primary element (as with widgets). This
  could break applications if they were to access this property and expect to have the mask's target (which is now
  accessed via the mask's `target` property)
* NumberField no longer uses native stepping with the arrow keys, instead it implements its own with configurable
  behaviour. See the new `changeOnSpin` config
* `DomHelper.createElement()` now accepts options as an object for its 2nd parameter. If a `Boolean`
  is passed, it is still interpreted as the `returnAll` parameter

  To pass `returnAll` in the new form: `createElement(..., { returnAll: true });`

### BUG FIXES

* #9212 - Adding FilePicker as widget for column



<p class="last-modified">Last modified on 2023-06-30 10:24:54</p>