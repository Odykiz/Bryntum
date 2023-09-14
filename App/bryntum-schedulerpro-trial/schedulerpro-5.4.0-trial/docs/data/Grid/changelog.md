# Bryntum Grid version history

## 5.4.0 - 2023-06-30

### FEATURES / ENHANCEMENTS

* The `RowCopyPaste` feature has been enhanced to use a page-global internal clipboard and also supports the browser's
  native Clipboard API if accessible. This means that it is possible to copy and paste row between multiple instances
  of Grid or Grid-based components. It is also possible to copy a row and paste it inside a Spreadsheet app like Excel
* Two new widgets for editing colors has been added in this release. Firstly, there is the `ColorPicker`, which lets the
  user select from a range of pre-defined colors. It is not built for stand-alone usage, but meant to be used in a
  `Menu` or as a picker for a `PickerField`. There is also the `ColorField` which can be used as a normal form field to
  display and edit a color value. It uses the `ColorPicker` as its color picker ([#2939](https://github.com/bryntum/support/issues/2939))
* A new column, `ColorColumn`, has also been added. It renders a colored element which the user can click and select a
  new color from the `ColorPicker's` pre-defined range of colors
* The `RowExpander` now supports rendering widgets inside the expanded row. This makes it possible to expand a row and
  show more details in a nested grid. Two new demos has been added to demonstrate this - `Master-detail` and `Nested
  grids` ([#3591](https://github.com/bryntum/support/issues/3591))
* Columns can now display data in related records (defined using the relation system) using a `.` in the field name, for
  example `team.name` ([#6639](https://github.com/bryntum/support/issues/6639))
* On a similar note, columns can now also display (and allow editing of) nested data using a `.` in the field name, for
  example `address.city` when given `record.data = { address : { city : 'Stockholm' } }`. Define the top level field
  (`address`) on your Model with `type: 'object'` to wire it up correctly
* `Widget` has a new config, `maximizeOnMobile` which takes effect only on `floating` widgets on a mobile device. It
  causes the widget to be maximized instead of positioned in order to accommodate the mobile virtual keyboard. This will
  make event editing much easier to use on mobile devices ([#6522](https://github.com/bryntum/support/issues/6522))
* On mobile devices, `type : 'checkbox'` is rendered as a `slidetoggle` widget. The API and value is the same, it is
  just a more appropriate UI for the platform
* Grid has a new `Split` feature, that allows splitting the grid into multiple parts (horizontally, vertically or both
  ways). Try it out in the new `split` demo ([#3917](https://github.com/bryntum/support/issues/3917))
* The `MergeCells` feature now supports merging cells in any column, not only sorted columns. Opt in to the new behavior
  by configuring the feature with `sortedOnly: false` ([#5012](https://github.com/bryntum/support/issues/5012), [#6429](https://github.com/bryntum/support/issues/6429))
* For a slightly better docs experience for most users, the docs browser now by default hides some more obscure APIs
  normally only used when implementing own widgets and features. Advanced users in need of these APIs can still opt in
  to see them using the `Show` menu in the docs browser
* Updated `columntypes` demo to show how to use a SlideToggle widget in a WidgetColumn ([#2256](https://github.com/bryntum/support/issues/2256))
* Button now adds a `type` attribute specified by the Button´s `behaviorType` value (defaults to `button`). See
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button for more info ([#7032](https://github.com/bryntum/support/issues/7032))

### API CHANGES

* The `RowCopyPaste` feature's `copyRows` and `pasteRows` has been made asynchronous due to the enhancements mentioned
  above
* The `RowCopyPaste` feature's `beforeCopy` and `beforePaste` events are now asynchronously preventable
* The `CellCopyPaste` feature's `beforeCopy` and `beforePaste` events are now asynchronously preventable
* The underlying store created when using `StoreDataField` now defaults to using `syncDataOnLoad : true`. You can use
  the new `store` config to supply a custom configuration object used when creating the store

### BUG FIXES

* [#5943](https://github.com/bryntum/support/issues/5943) - Undo/redo does not catch cut-pasting row
* [#6884](https://github.com/bryntum/support/issues/6884) - Detail row becomes empty after several sorting operations on the main column
* [#6946](https://github.com/bryntum/support/issues/6946) - Missing gap between filter fields
* [#6947](https://github.com/bryntum/support/issues/6947) - Grid split example issue
* [#6955](https://github.com/bryntum/support/issues/6955) - Grid localization example does not render on iPad Safari
* [#6958](https://github.com/bryntum/support/issues/6958) - Scheduler split demo throws an exception
* [#7014](https://github.com/bryntum/support/issues/7014) - `Checkbox` cell is not accessible with keyboard
* [#7062](https://github.com/bryntum/support/issues/7062) - Adding a column to a split Grid not reflected in splits
* [#7080](https://github.com/bryntum/support/issues/7080) - "No color" looks like white color and checkmark not updating
* [#7081](https://github.com/bryntum/support/issues/7081) - Child widgets with `autoHeight` stops collapse animation

## 5.3.8 - 2023-06-28

### API CHANGES

* A new config has been added to the `RowExpander` feature that re-activates the previous behaviour of scrolling the
  expanding row into view. The config is called `autoScroll` and defaults to `false` ([#7027](https://github.com/bryntum/support/issues/7027))
* Grid now supports toggling `hideHeaders` and `hideFooters` during runtime to control visibility of header / footer
* Grid now supports configuring away its horizontal scrollbar using its new `hideHorizontalScrollbar` config

### BUG FIXES

* [#2002](https://github.com/bryntum/support/issues/2002) - Sorters/filters are not refreshed up after changing store
* [#5427](https://github.com/bryntum/support/issues/5427) - `parentId` appears as a modification after undoing a delete
* [#5507](https://github.com/bryntum/support/issues/5507) - Undo action with STM not keeping the actions after deleting a node
* [#6694](https://github.com/bryntum/support/issues/6694) - `beforeColumnDropFinalize` event lacks information on where column is being placed
* [#6924](https://github.com/bryntum/support/issues/6924) - `exportProgressMask` does not change value on PDF Export
* [#6962](https://github.com/bryntum/support/issues/6962) - Demos use deprecated `sum` Boolean parameter in columns config
* [#7021](https://github.com/bryntum/support/issues/7021) - `ViewPresetCombo` not showing name from custom presets base
* [#7039](https://github.com/bryntum/support/issues/7039) - Crash when filtering and hide/show columns
* [#7048](https://github.com/bryntum/support/issues/7048) - YY year format shows only single digit
* [#7054](https://github.com/bryntum/support/issues/7054) - Possible to resize a region with `regionResize` disabled
* [#7055](https://github.com/bryntum/support/issues/7055) - Grid Column Header align `right !== end` in material theme
* [#7060](https://github.com/bryntum/support/issues/7060) - [PERFORMANCE] Prevent partnering header which is hidden
* [#7070](https://github.com/bryntum/support/issues/7070) - Filtering demo describes filterable example function incorrectly
* [#7071](https://github.com/bryntum/support/issues/7071) - `columnDrag` event payload insertBefore property is incorrect

## 5.3.7 - 2023-06-20

### FEATURES / ENHANCEMENTS

* A new config for the `Sort` feature, `toggleOnHeaderClick` makes it possible to specify that sorting should only
  occurs when clicking on the icon ([#6827](https://github.com/bryntum/support/issues/6827))
* MenuItem `item` event now includes a `domEvent` param ([#6863](https://github.com/bryntum/support/issues/6863))

### BUG FIXES

* [#5436](https://github.com/bryntum/support/issues/5436) - Undo does not work when deleting selected children and parent
* [#5494](https://github.com/bryntum/support/issues/5494) - Collapsed/expanded state bug when using undo/redo on tree grid
* [#5927](https://github.com/bryntum/support/issues/5927) - Error when scrolling and then switching to collapsed tree structure
* [#6673](https://github.com/bryntum/support/issues/6673) - Bug when undoing a cut operation
* [#6788](https://github.com/bryntum/support/issues/6788) - Irregular behaviour with last locked column and hidden locked columns
* [#6844](https://github.com/bryntum/support/issues/6844) - Filter field not updated when replacing column with same `id`
* [#6877](https://github.com/bryntum/support/issues/6877) - [LWC] Cannot read properties of undefined (reading 'host')
* [#6896](https://github.com/bryntum/support/issues/6896) - Tree Grid search highlighting throws an error in lazy loaded implementation
* [#6907](https://github.com/bryntum/support/issues/6907) - Cell navigation with keyboard ignores visible column order
* [#6912](https://github.com/bryntum/support/issues/6912) - [REACT] Custom column editor lose value in React 18
* [#6954](https://github.com/bryntum/support/issues/6954) - Merged cell value is not displayed in classic-dark nor material theme
* [#6969](https://github.com/bryntum/support/issues/6969) - Grid `TreeColumn` text should be truncated when a column is too small
* [#6976](https://github.com/bryntum/support/issues/6976) - Not possible to control group row height when combined with `GroupSummary` feature
* [#6996](https://github.com/bryntum/support/issues/6996) - `CellCopyPaste` feature docs are misleading
* [#7010](https://github.com/bryntum/support/issues/7010) - Zoom level state not restored when timeline is collapsed
* [#7025](https://github.com/bryntum/support/issues/7025) - `Combo` should handle being destroyed in item/select/change listeners
* [#7028](https://github.com/bryntum/support/issues/7028) - Incorrect examples for `fields` config in `FieldFilterPicker` docs

## 5.3.6 - 2023-05-26

### FEATURES / ENHANCEMENTS

* Grid now fires new `splitterExpandClick` and `splitterCollapseClick` events which lets you prevent the default
  behavior when clicking the collapse/expand icons inside the grid splitter ([#6677](https://github.com/bryntum/support/issues/6677))

### BUG FIXES

* [#6409](https://github.com/bryntum/support/issues/6409) - Group feature should restore groupers when re-enabling
* [#6704](https://github.com/bryntum/support/issues/6704) - Inconsistent work of `CheckColumn` when `selectAll` enabled
* [#6756](https://github.com/bryntum/support/issues/6756) - [LWC] Grid does not render due to `scrollBarWidth` calculation
* [#6760](https://github.com/bryntum/support/issues/6760) - `CellCopyPaste` feature paste is off by number of hidden columns
* [#6791](https://github.com/bryntum/support/issues/6791) - Columns are not exported correctly if they exceed total grid row subgrid size
* [#6799](https://github.com/bryntum/support/issues/6799) - Grid throws when applying column state with non-existing region
* [#6805](https://github.com/bryntum/support/issues/6805) - `includeInSubset` creates duplicate records in the store
* [#6807](https://github.com/bryntum/support/issues/6807) - Splitter cannot resize neighbor widgets in react apps

## 5.3.5 - 2023-05-11

### FEATURES / ENHANCEMENTS

* Grid now fires a new `columnDrag` event which lets you mark a drop position as invalid ([#6634](https://github.com/bryntum/support/issues/6634))
* Column widths and hide/show state are synced between partnered schedulers with identical column sets ([#6682](https://github.com/bryntum/support/issues/6682))

### API CHANGES

* In a group header row, the expand/collapse icon is now a separate element rather than a pseudo-element of the header
  cell

### BUG FIXES

* [#6384](https://github.com/bryntum/support/issues/6384) - Inconsistent tool order in header of inline collapsed panel
* [#6495](https://github.com/bryntum/support/issues/6495) - ReorderFeature - `gripOnly` doesn't work when first column is a checkbox column
* [#6544](https://github.com/bryntum/support/issues/6544) - Not possible to return a `DOMConfig` array in a `TreeColumn` renderer
* [#6565](https://github.com/bryntum/support/issues/6565) - Event trigger from widget button doesn't go up to grid if bubbles enabled
* [#6656](https://github.com/bryntum/support/issues/6656) - Grouping `beforeToggleGroup` event should include the instigating UI event
* [#6672](https://github.com/bryntum/support/issues/6672) - Drag proxy misrendered in row reordering in Safari
* [#6701](https://github.com/bryntum/support/issues/6701) - [IONIC] `Scrollbar` width could not be determined under Ionic framework
* [#6703](https://github.com/bryntum/support/issues/6703) - Allow selecting text in row expander body
* [#6715](https://github.com/bryntum/support/issues/6715) - Grid cell unhovered when moving over inner element

## 5.3.4 - 2023-04-28

### FEATURES / ENHANCEMENTS

* Store now has a `startGroupsCollapsed` property meaning that all groups begin collapsed. ([#6642](https://github.com/bryntum/support/issues/6642))

### API CHANGES

* `Checkbox` selection column is no longer hideable by the user by default (can be toggled in code by setting `hideable`
  to `true`) ([#6650](https://github.com/bryntum/support/issues/6650))

### BUG FIXES

* [#6267](https://github.com/bryntum/support/issues/6267) - Persist expanded state when pasting tree nodes
* [#6584](https://github.com/bryntum/support/issues/6584) - Row select blinking on mobile after first select
* [#6640](https://github.com/bryntum/support/issues/6640) - [LWC] Context menu only opens once
* [#6652](https://github.com/bryntum/support/issues/6652) - Minified UMD bundle does not export `bryntum` namespace
* [#6653](https://github.com/bryntum/support/issues/6653) - Unhandled mouse event exceptions in Salesforce on Safari
* [#6657](https://github.com/bryntum/support/issues/6657) - Drag proxy misrendered in row reordering

## 5.3.3 - 2023-04-21

### FEATURES / ENHANCEMENTS

* The `CellEdit` feature's `autoEdit` functionality now triggers a `beforeCellRangeDelete` event which by returning
  `false`, can prevent the deletion on multiple cell values. When only deleting a single value, the already existing
  `beforeCellEditStart` event is used as before
* [ANGULAR] Bryntum Grid now ships with two npm Angular wrapper packages to support different versions of Angular
  framework. Existing `@bryntum/grid-angular` package is now designed to work with Angular 12 and newer versions,
  which use the IVY rendering engine. New `@bryntum/grid-angular-view` package is designed to work with Angular 11
  and older versions, which use the View Engine rendering. Check Upgrading and Angular integration guides in
  documentation for more information ([#6270](https://github.com/bryntum/support/issues/6270))
* [ANGULAR] `angular-9`, `angular-10` and `angular-11` demos have been added to show use of `@bryntum/grid-angular-view`
  package with Angular 9, 10 and 11. Demos are located in subfolders inside `examples/frameworks/angular/` folder
* [ANGULAR] `angular-12`, `angular-13` and `angular-14` demos have been added for Angular 12, 13 and 14. Demos are
  located in subfolders inside `examples/frameworks/angular/` folder
* [ANGULAR] `basic` demo has been upgraded to use Angular 15. Demo is localed in located in
  `examples/frameworks/angular/basic/` folder
* [ANGULAR] legacy `angular-6`, `angular-7` and `angular-8` demos has been removed

### API CHANGES

* Removed `skipRefresh` argument from Grid's `toggleCollapse()` function, since it was not working and there was no
  code to back it up
* [DEPRECATED] Events triggered by the `RowReorder` feature have been deprecated and now instead trigger on the owning
  Grid instance (all other features follow this pattern). Old events fired by RowReorder will be removed in 6.0
  ([#6579](https://github.com/bryntum/support/issues/6579))

### BUG FIXES

* [#5758](https://github.com/bryntum/support/issues/5758) - Tree column `autoHeight` not working
* [#6166](https://github.com/bryntum/support/issues/6166) - `createOnUnmatched` only creates new record on `Enter` key press
* [#6483](https://github.com/bryntum/support/issues/6483) - Grid header alignment Issue when using 3+ levels headers
* [#6524](https://github.com/bryntum/support/issues/6524) - `FillHandle` feature does not work in Salesforce
* [#6528](https://github.com/bryntum/support/issues/6528) - TypeError `r.ion` is not a function
* [#6533](https://github.com/bryntum/support/issues/6533) - Datasync issue on remotely filtered and paged Store with `syncDataOnLoad`
* [#6548](https://github.com/bryntum/support/issues/6548) - `Backspace` key not working in cell editor with `combo`
  combo
* [#6549](https://github.com/bryntum/support/issues/6549) - Grid header misalignment when material theme used
* [#6620](https://github.com/bryntum/support/issues/6620) - Dynamically created SubGrid's `xScroller` does not have a reference to the outer `Y` scroller

## 5.3.2 - 2023-04-04

### FEATURES / ENHANCEMENTS

* Grid's `ColumnStore` now uses `syncDataOnLoad : true` (and it is not intended to be changed by apps), which improves
  performance for state changes when binding to `<bryntum-grid columns="">` in frameworks (Partial fix [#6340](https://github.com/bryntum/support/issues/6340))
* The backends for the `php` and `php-paging` demos were updated to work with PHP 8

### API CHANGES

* The docs for the Grid's `selectionChange` and `beforeSelectionChange` events mistakenly showed that the `deselected`,
  `selected` and `selection` params included records or cells, when they only included records. That have been fixed,
  and we also added `deselectedCells`, `selectedCells` and `cellSelection` params to same events.
* Context menu items for copying and pasting rows (from the `RowCopyPaste` feature) are no longer combined with menu
  items for copying and pasting cells (from `CellCopyPaste`). To show both cell & row copy items in the same menu,
  enable the `rowOptionsOnCellContextMenu` config.

### BUG FIXES

* [#6058](https://github.com/bryntum/support/issues/6058) - Widget's `showAnimation` config not working properly
* [#6120](https://github.com/bryntum/support/issues/6120) - `store.load()` doesn't work if `TreeGroup` feature used
* [#6321](https://github.com/bryntum/support/issues/6321) - Built in `DateField` validation not working properly
* [#6357](https://github.com/bryntum/support/issues/6357) - Double entries of copy/paste
* [#6358](https://github.com/bryntum/support/issues/6358) - Hard to select row in advanced demo
* [#6360](https://github.com/bryntum/support/issues/6360) - `selectedRecords` need to include records from selected cells
* [#6380](https://github.com/bryntum/support/issues/6380) - Cannot drop into collapsed group if store is filtered
* [#6392](https://github.com/bryntum/support/issues/6392) - Tree Scheduler with initial filters on the resource store renders too early
* [#6395](https://github.com/bryntum/support/issues/6395) - Fixed angular production build of `StateProvider` helper classes
* [#6428](https://github.com/bryntum/support/issues/6428) - `FullScreen.request` method should move `floatRoot` into the `fullscreened` element
* [#6433](https://github.com/bryntum/support/issues/6433) - Escape key not working in example filter field
* [#6443](https://github.com/bryntum/support/issues/6443) - `SubGrid` hiding does not work properly
* [#6447](https://github.com/bryntum/support/issues/6447) - Filter feature column tooltips not working with array-valued relation filters
* [#6478](https://github.com/bryntum/support/issues/6478) - Grid Region still resizable when resizable is set to false
* [#6484](https://github.com/bryntum/support/issues/6484) - Invisible cells repainted with wrong data
* [#6500](https://github.com/bryntum/support/issues/6500) - Right click on Grid WebComponent throws an error
* [#6507](https://github.com/bryntum/support/issues/6507) - `dropOnLeaf` does not work properly on a scrolled page
* [#6509](https://github.com/bryntum/support/issues/6509) - Column `readOnly` should prevent editing

## 5.3.1 - 2023-03-17

### FEATURES / ENHANCEMENTS

* Tree store now applies filters/sorters to any new data when calling `applyChangeset()` ([#6155](https://github.com/bryntum/support/issues/6155))

### API CHANGES

* Removed obsolete config `keepUncommittedChanges` for chained stores. It did not affect chained store behavior
* `expanded` field was moved to `Model` class from `GridRowModel`
* Date parsing was made more forgiving in regard to character used to separate date parts. For example these strings are
  now all acceptable as `HH:mm`: `10:20`, `10 20`, `10-20`, `10/20` ([#6344](https://github.com/bryntum/support/issues/6344))

### BUG FIXES

* [#5325](https://github.com/bryntum/support/issues/5325) - Multi-level sort with custom sorting fn not working
* [#6086](https://github.com/bryntum/support/issues/6086) - Checkbox columns are always unchecked
* [#6229](https://github.com/bryntum/support/issues/6229) - Exception when reconfiguring store on a grouped and filtered view
* [#6282](https://github.com/bryntum/support/issues/6282) - Checkbox missing right margin
* [#6286](https://github.com/bryntum/support/issues/6286) - Horizontal scroll resets when scrolling back up
* [#6301](https://github.com/bryntum/support/issues/6301) - Grouping is broken after record remove is cancelled
* [#6312](https://github.com/bryntum/support/issues/6312) - Splitter does not move after updating to `5.3.0`
* [#6314](https://github.com/bryntum/support/issues/6314) - [VUE] Columns prop has wrong type in `BryntumGrid` wrapper component
* [#6327](https://github.com/bryntum/support/issues/6327) - Examples filter field clearing does not refresh example list
* [#6328](https://github.com/bryntum/support/issues/6328) - `'move'` event `oldParent` should pass `rootNode` when moving a node from the `rootNode`
* [#6331](https://github.com/bryntum/support/issues/6331) - Prevent checkbox column to be scrolled out of view
* [#6342](https://github.com/bryntum/support/issues/6342) - Tooltip remains visible when moved by multiple rows across empty cells
* [#6351](https://github.com/bryntum/support/issues/6351) - Components do not render into containers not already in DOM
* [#6355](https://github.com/bryntum/support/issues/6355) - `StateProviderConfig` TypeScript missing listeners property
* [#6365](https://github.com/bryntum/support/issues/6365) - [VUE3] Tree Grid Demo is buggy
* [#6370](https://github.com/bryntum/support/issues/6370) - Task editor closes when changing active tab programmatically
* [#6386](https://github.com/bryntum/support/issues/6386) - Wrong sorting when grouped by custom `groupSortFn`

## 5.3.0 - 2023-03-02

### FEATURES / ENHANCEMENTS

* The CSS with predefined colors for `Button`, `Checkbox`, `Radio`, `SlideToggle` & `Toast` was changed to reduce file
  sizes (cuts away ~15% of the size of Grid's standalone CSS-bundles), while also making it easier for us to add more
  colors in the future
* The Grid's selection functionality has been greatly improved as of this release. In addition to row and checkbox
  selection it now also supports cell selection, column selection and `RowNumberColumn` selection. The ability to select
  by dragging the pointer has also been added. All the selection settings are now fully changeable at runtime. For full
  details of the new selection functionality, please check out or new selection demo ([#497](https://github.com/bryntum/support/issues/497), [#1915](https://github.com/bryntum/support/issues/1915),
  [#3123](https://github.com/bryntum/support/issues/3123), [#3334](https://github.com/bryntum/support/issues/3334), [#3970](https://github.com/bryntum/support/issues/3970), [#4628](https://github.com/bryntum/support/issues/4628), [#4932](https://github.com/bryntum/support/issues/4932))
* The new `FillHandle` feature brings spreadsheet like fill functionality to the Grid. When enabled, a Grid selection
  range will get a fill handle along with a fill border. This handle can then be dragged over new cells in any
  direction. The cells being dragged over will be filled with values calculated from the original selection
* The `CellEdit` feature has been updated with support for editing multiple rows simultaneously. The `multiEdit` config
  is `true` by default. Simply select multiple rows, edit the last one and then hit Ctrl+Enter to apply the new value to
  all selected rows
* The new `CellCopyPaste` feature adds the ability to cut, copy and paste individual cell values or ranges of cell
  values
* Keyboard focused column headers now has same focus indicator as cells ([#4707](https://github.com/bryntum/support/issues/4707))
* There is a new `store` field type (`StoreDataField`) which can be used for fields on records that holds arrays. The
  array will be converted to a store, manipulating the store will flag the record as modified. On serialization the
  store will be converted back to an array
* Selection in a Grid with a `TreeStore` has been improved by addition of the `includeParents` config. Set it to `all`
  or `true` to auto select a parent if all its children gets selected. If one gets deselected, the parent will also be
  deselected. Set it to `some` to select a parent if one of its children gets selected. The parent will be deselected if
  all its children gets deselected ([#5726](https://github.com/bryntum/support/issues/5726))
* Localization demos updated to show up-to-date localization approach
* `AjaxHelper.fetch` now supports using request body to pass parameters for non-GET requests. Please check
  `addQueryParamsToBody` argument in the method documentation ([#2855](https://github.com/bryntum/support/issues/2855))
* New `TreeCombo` widget added
* The model relation system, a data layer concept used internally to link a `ResourceTimeRange` to a `Resource` in
  Scheduler, was made public. It allows you to define one-to-many relations between models in a `relations` block when
  subclassing `Model` ([#3222](https://github.com/bryntum/support/issues/3222))
* The `CellCopyPaste` feature can now repeat the copied pattern into a larger selection target. Copy one cell or a range
  of cells, then select a new range of cells and paste into that. If the selected range matches the copied pattern in
  size (n times bigger, must fit completely), all the selected cells will be filled with values ([#6003](https://github.com/bryntum/support/issues/6003))
* Lots (but not all) of the not so informative `object` types in our TypeScript typings have been replaced with more
  specific types. Objects that in our JavaScript are used as maps are now declared as `Record<keyType, valueType>`, and
  for functions that accept object arguments many are replaced with anonymous type declarations, such as
  `{ foo: string, bar: number }` (Partially fixed [#5176](https://github.com/bryntum/support/issues/5176))

### API CHANGES

* [DEPRECATED] `LocaleManager.registerLocale` and `LocaleManager.extendLocale` are deprecated.
  `LocaleHelper.publishLocale` should be used instead.
* [DEPRECATED] With the introduction of cell selection, Grid's `selectionMode` config no longer has the `row` setting.
  Instead, it is the default mode and can be omitted. Specifying `cell : true` will enable cell selection and disable
  row selection - both cannot be used at the same time.
* [DEPRECATED] The `rowCheckboxSelection` setting of Grid's `selectionMode` config was renamed to `checkboxOnly`, to
  better indicate its purpose. The old name is still supported, but will be removed in a future release
* [DEPRECATED] The type of the `fields` config for `GridFieldFilterPicker` and `GridFieldFilterPickerGroup` widgets has
  changed from array of `FieldOption`s to `Object` map of `FieldOption`s keyed by field name. The array type is now
  deprecated. The fields supplied in this config (if any) will now be merged with fields found in the configured
  `grid`'s columns, instead of overwriting them

### LOCALE UPDATES

* Locales format and process for applying locales have been simplified
* New locales for 31 languages have been added. Currently available languages are listed in the localization guide
  (Guides/Customization/Localization)

### BUG FIXES

* [#3213](https://github.com/bryntum/support/issues/3213) -`[Cmd/Ctrl] + [Right click]` weird behavior
* [#3733](https://github.com/bryntum/support/issues/3733) - `selectedRecords` are in wrong order after shift selection
* [#4595](https://github.com/bryntum/support/issues/4595) - Select all checkbox should not select filtered out records
* [#5097](https://github.com/bryntum/support/issues/5097) - Selected row gets deselected after page change with `preserveSelectionOnPageChange: true`
* [#5844](https://github.com/bryntum/support/issues/5844) - Selection styling not applied after clicking a cell
* [#5863](https://github.com/bryntum/support/issues/5863) - Cell drag does not work on spreadsheet demo on `5.3.0`
* [#5864](https://github.com/bryntum/support/issues/5864) - Cut & Paste column does not work on column header
* [#5865](https://github.com/bryntum/support/issues/5865) - Wrong redo icon
* [#5866](https://github.com/bryntum/support/issues/5866) - Copy and paste buttons disabled when selecting row
* [#5867](https://github.com/bryntum/support/issues/5867) - Name column width too narrow
* [#5992](https://github.com/bryntum/support/issues/5992) - `Checkbox` column background color to bright in `Classic-Dark` theme
* [#6054](https://github.com/bryntum/support/issues/6054) - Not persisted field marked as dirty in the grid, but not persisted in modified data
* [#6194](https://github.com/bryntum/support/issues/6194) - Crash when editing started and grid scrolled quickly
* [#6205](https://github.com/bryntum/support/issues/6205) - Crash when ancestor node of active cell is collapsed
* [#6207](https://github.com/bryntum/support/issues/6207) - `Treegrid` cut operation optimization
* [#6208](https://github.com/bryntum/support/issues/6208) - Row should be selected when clicking outside a checkbox in a `checkcolumn` cell
* [#6243](https://github.com/bryntum/support/issues/6243) - `reapplySortersOnAdd` doesn't work for tree store
* [#6246](https://github.com/bryntum/support/issues/6246) - Crash when pasting rows if one of the copied tasks is removed
* [#6267](https://github.com/bryntum/support/issues/6267) - Persist expanded state when pasting tree nodes

## 5.2.10 - 2023-02-17

### FEATURES / ENHANCEMENTS

* Search feature now supports not showing the hit index numbers ([#6124](https://github.com/bryntum/support/issues/6124))

### API CHANGES

* Recently browsers have added support for Unicode 15, which changes the output of `Intl.DateTimeFormat` when
  formatting time to include `AM`/`PM`. Those browsers now use "thin space" (`\u202f`) instead of regular space. This
  affects the `DateHelper.format()` function, but likely you do not need to take any action in your application. It
  also affects `DateHelper.parse()`, which has been updated to support the new unicode space ([#6193](https://github.com/bryntum/support/issues/6193))

### BUG FIXES

* [#4586](https://github.com/bryntum/support/issues/4586) - Cannot drag row to last position in online demo
* [#5637](https://github.com/bryntum/support/issues/5637) - Allow dropping to closed groups
* [#6039](https://github.com/bryntum/support/issues/6039) - Resource order not applied with `syncDataOnLoad`
* [#6087](https://github.com/bryntum/support/issues/6087) - `Checkbox` column state changed only on second click when its field is not defined in the `Model`
* [#6088](https://github.com/bryntum/support/issues/6088) - `CellEdit` feature throws if passed context points to non-existent record
* [#6092](https://github.com/bryntum/support/issues/6092) - Wrong type for `FetchOptions`
* [#6100](https://github.com/bryntum/support/issues/6100) - Row get deselected when click inside another row's actionable cell
* [#6102](https://github.com/bryntum/support/issues/6102) - Changing the column position then setting back to the initial position makes `oldValue` `undefined`
* [#6126](https://github.com/bryntum/support/issues/6126) - Tree Grid Search doesn't highlight cells after search function returns no results
* [#6134](https://github.com/bryntum/support/issues/6134) - Store ordering is broken after synchronizing changes
* [#6144](https://github.com/bryntum/support/issues/6144) - `applyChangeset` on a filtered store does not update the view
* [#6169](https://github.com/bryntum/support/issues/6169) - Filter feature should not show menu items for group headers and footers
* [#6186](https://github.com/bryntum/support/issues/6186) - Should be possible to get the previous parent in move event

## 5.2.9 - 2023-01-30

### FEATURES / ENHANCEMENTS

* New demo showing how to import Excel files into the grid ([#5984](https://github.com/bryntum/support/issues/5984))

### API CHANGES

* As of version 6.0, `remove` event will no longer be fired when moving a node in a tree store. To enable this behavior
  now (recommended), you can set a new `fireRemoveEventForMoveAction` on your tree store to `false` ([#5371](https://github.com/bryntum/support/issues/5371))

### BUG FIXES

* [#5526](https://github.com/bryntum/support/issues/5526) - Cannot open 2nd mask using static call
* [#5860](https://github.com/bryntum/support/issues/5860) - Docs UI is broken on a small window
* [#5869](https://github.com/bryntum/support/issues/5869) - Clicking checkbox column checkbox should not select/deselect
* [#5967](https://github.com/bryntum/support/issues/5967) - `TreeColumn` needs separate renderer docs
* [#5970](https://github.com/bryntum/support/issues/5970) - `DragHelper` is too eager stopping event propagation
* [#6004](https://github.com/bryntum/support/issues/6004) - `RowReorder` and `rowCheckboxSelection` mode improvements
* [#6013](https://github.com/bryntum/support/issues/6013) - Default `'sum'` operation on aggregate columns does not sum decimal numbers
* [#6014](https://github.com/bryntum/support/issues/6014) - Button menu listeners get duplicated when changing the menu
* [#6019](https://github.com/bryntum/support/issues/6019) - [TypeScript] Feature classes and configs have `on` event handlers exposed on owner class
* [#6023](https://github.com/bryntum/support/issues/6023) - Group header counter is wrong when dropping rows from one group to another
* [#6024](https://github.com/bryntum/support/issues/6024) - Go to next/previous hit API does not work consistent
* [#6045](https://github.com/bryntum/support/issues/6045) - Missing localization `"Expand"` in `RowExpander`
* [#6053](https://github.com/bryntum/support/issues/6053) - Cut and paste within a tree crashes the grid
* [#6069](https://github.com/bryntum/support/issues/6069) - Params lost if defined in class config

## 5.2.8 - 2023-01-19

### BUG FIXES

* [#5386](https://github.com/bryntum/support/issues/5386) - Improved panel collapse animation when collapsed panel header is perpendicular to expanded
* [#5804](https://github.com/bryntum/support/issues/5804) - Material panel toolbar padding not symmetric
* [#5884](https://github.com/bryntum/support/issues/5884) - Grid doesn't show fetched data after clearing filter
* [#5893](https://github.com/bryntum/support/issues/5893) - Row rendering breaks when collapsing groups
* [#5895](https://github.com/bryntum/support/issues/5895) - Groups disappear when changing grouped field value in a filtered view
* [#5911](https://github.com/bryntum/support/issues/5911) - `FilterBar` should not override data of filter field using chained store
* [#5959](https://github.com/bryntum/support/issues/5959) - Reordering a row selects it when `rowCheckboxSelection: true`

## 5.2.7 - 2023-01-11

### FEATURES / ENHANCEMENTS

* The updated `tree` demo shows using different `Model` classes for the rows ([#5888](https://github.com/bryntum/support/issues/5888))
* `Tree` feature now supports expanding to multiple nodes ([#2287](https://github.com/bryntum/support/issues/2287))
* `Search` feature now supports providing the "fields" to restrict the search to for performance ([#2294](https://github.com/bryntum/support/issues/2294))

### API CHANGES

* When using remote filtering for the `AjaxStore`, the date filter value is now always serialized in the local timezone.
  Previously (but undocumented) it was using the UTC timezone. The serialization format is `YYYY-MM-DDThh:mm:ss.ms`
  ([#5896](https://github.com/bryntum/support/issues/5896))

### BUG FIXES

* [#5179](https://github.com/bryntum/support/issues/5179) - Bad UX when typing into date field
* [#5253](https://github.com/bryntum/support/issues/5253) - Moved collapsed column doesn't have red text when drop is prohibited
* [#5774](https://github.com/bryntum/support/issues/5774) - Reordering row is not possible to do in the last row
* [#5876](https://github.com/bryntum/support/issues/5876) - `fitMode` generates unexpected result for `ActionColumn`
* [#5883](https://github.com/bryntum/support/issues/5883) - Unexpected error with empty columns with specific configuration

## 5.2.6 - 2022-12-28

### FEATURES / ENHANCEMENTS

* [REACT] React wrapper now supports React components in widgets and tooltips ([#774](https://github.com/bryntum/support/issues/774))
* The `RowCopyPaste` feature will now paste copied or cut row(s) *below* selected or provided reference record.
  Previously the documentation stated that the copied or cut row(s) would be pasted above the reference record. However,
  the behaviour was inconsistent and cut-paste was done above while copy-paste was done below ([#4890](https://github.com/bryntum/support/issues/4890))

### BUG FIXES

* [#5019](https://github.com/bryntum/support/issues/5019) - Grid ExtJS Modern App integration demo fails on Cell click
* [#5486](https://github.com/bryntum/support/issues/5486) - Horizontal scrollbar overlaps when the view becomes smaller
* [#5790](https://github.com/bryntum/support/issues/5790) - Column headers should not show pointer cursor if not sortable
* [#5805](https://github.com/bryntum/support/issues/5805) - Visual bug with MergeCells in multipage export
* [#5812](https://github.com/bryntum/support/issues/5812) - Horizontal scroll not working when mergeCells feature is enabled
* [#5830](https://github.com/bryntum/support/issues/5830) - "No records to display" label is wrongly rendered
* [#5838](https://github.com/bryntum/support/issues/5838) - Combo clearable trigger doesn't reset validation

## 5.2.5 - 2022-12-16

### FEATURES / ENHANCEMENTS

* TreeStore now supports `indent` and `outdent` operations ([#5547](https://github.com/bryntum/support/issues/5547))
* `RowCopyPaste` feature supports copying rows in a tree. Copied records will have same hierarchy
* Paste after cut and copy behavior is unified, records are moved below the paste target
* Added field `orderedParentIndex` to resolve position of the child in the ordered children array ([#5353](https://github.com/bryntum/support/issues/5353))
* Store now applies filters/sorters to any new data when calling `applyChangeset()` ([#5534](https://github.com/bryntum/support/issues/5534))

### API CHANGES

* [DEPRECATED] Currently, when returning `undefined` from a column renderer, the actual cell will not be updated. There
  is a new config on Grid.column.Column which controls this behaviour - `alwaysClearCell`. In 5.2.5 this will default to
  `false` giving the same behaviour as previously. But in 6.0, `alwaysClearCell` will default to `true`, requiring
  columns that relies on the previous behaviour to be configured with `alwaysClearCell` set to `false`

### BUG FIXES

* [#5128](https://github.com/bryntum/support/issues/5128) - Check column with supplied field should be filterable and sortable
* [#5267](https://github.com/bryntum/support/issues/5267) - Copy action not copying child resources
* [#5288](https://github.com/bryntum/support/issues/5288) - Columns get displaced when we try to resize that column while editing
* [#5521](https://github.com/bryntum/support/issues/5521) - Column sorting in empty cell editor mode merge cell values
* [#5572](https://github.com/bryntum/support/issues/5572) - Using sort feature triggers `autoLoad` for `AjaxStore`
* [#5635](https://github.com/bryntum/support/issues/5635) - [LWC] event in `filterOnInput` reports wrong `target`
* [#5646](https://github.com/bryntum/support/issues/5646) - Selection column sometimes not draggable
* [#5647](https://github.com/bryntum/support/issues/5647) - Columns sometimes collapse when resizing
* [#5674](https://github.com/bryntum/support/issues/5674) - Combo not sized the same when editable vs non-editable
* [#5688](https://github.com/bryntum/support/issues/5688) - [LWC] Cannot add property isActive, object is not extensible
* [#5692](https://github.com/bryntum/support/issues/5692) - Combos should be able to share Stores
* [#5698](https://github.com/bryntum/support/issues/5698) - Examples text overlaps
* [#5700](https://github.com/bryntum/support/issues/5700) - `FinalizeCellEdit` launch multiple times when clicked outside of grid with non-resolved promise
* [#5706](https://github.com/bryntum/support/issues/5706) - `syncDataOnLoad` + `threshold`, scroll error
* [#5730](https://github.com/bryntum/support/issues/5730) - `index` is ignored when insert into filtered store
* [#5732](https://github.com/bryntum/support/issues/5732) - Combo should update value collection silently when replacing store
* [#5778](https://github.com/bryntum/support/issues/5778) - Dragging resources to the last row causes crash in group

## 5.2.4 - 2022-11-28

### FEATURES / ENHANCEMENTS

* We recently launched a new homepage over at [bryntum.com](https://bryntum.com), and have now slightly updated the
  styling for demos and docs to better match it (new logo, new header color, new font). Please note that this is not a
  change to our themes, only the look of the demos, and it won't affect your application

### BUG FIXES

* [#5594](https://github.com/bryntum/support/issues/5594) - Grid splitter collapse/expand hover artefacts
* [#5595](https://github.com/bryntum/support/issues/5595) - Fix panel collapse icon directions
* [#5617](https://github.com/bryntum/support/issues/5617) - Collapsing locked subgrid not working if `minWidth` is set
* [#5620](https://github.com/bryntum/support/issues/5620) - Sort & Filter icons not visible in grid column when there is not enough space and material theme is used

## 5.2.3 - 2022-11-17

### BUG FIXES

* [#5256](https://github.com/bryntum/support/issues/5256) - FireFox doesn't have horizontal scrollbars in demos on Windows
* [#5518](https://github.com/bryntum/support/issues/5518) - Undo does not recognise zero and null values as a change
* [#5537](https://github.com/bryntum/support/issues/5537) - `tabPanel.add()` crashes the app
* [#5551](https://github.com/bryntum/support/issues/5551) - Store `allRecords` includes group footers twice
* [#5569](https://github.com/bryntum/support/issues/5569) - Grouping the store does not trigger state save
* [#5570](https://github.com/bryntum/support/issues/5570) - Crash when searching if focused cell is out of view

## 5.2.2 - 2022-11-08

### FEATURES / ENHANCEMENTS

* The `emptyText` config may now be an HTML string ([#5046](https://github.com/bryntum/support/issues/5046))

### API CHANGES

* [DEPRECATED] The behaviour of the `store.data` getter will be changed in 6.0. Currently, it returns the **initial**
  raw dataset, in 6.0 it will be changed to have the more expected behaviour of returning the data objects for the
  **current** state instead ([#5499](https://github.com/bryntum/support/issues/5499))

### BUG FIXES

* [#5489](https://github.com/bryntum/support/issues/5489) - Left region goes momentarily full width when resized to 0
* [#5490](https://github.com/bryntum/support/issues/5490) - Readonly Grid with widget-type column makes buttons disabled
* [#5491](https://github.com/bryntum/support/issues/5491) - `onToolClick` not working correctly (even with `callOnFunctions: true`)
* [#5531](https://github.com/bryntum/support/issues/5531) - Column rename not compatible with Filter feature

## 5.2.1 - 2022-10-28

### API CHANGES

* `TreeNode.isRoot` property is now public ([#5471](https://github.com/bryntum/support/issues/5471))

### BUG FIXES

* [#4443](https://github.com/bryntum/support/issues/4443) - `MergeCells` set `true` resources are not collapsing correctly
* [#5149](https://github.com/bryntum/support/issues/5149) - Angular demos now use component-local styles using `ViewEncapsulation.None`
* [#5363](https://github.com/bryntum/support/issues/5363) - Row reorder with non-direct parent/child don't match structure
* [#5402](https://github.com/bryntum/support/issues/5402) - Text overflows editor after opening cell editor
* [#5403](https://github.com/bryntum/support/issues/5403) - Pagination does not work when remote sort is used.
* [#5404](https://github.com/bryntum/support/issues/5404) - `TabPanel` triggers focus error when removing tab
* [#5409](https://github.com/bryntum/support/issues/5409) - `Field`'s `fetchInputValue` ignores the `inputValueAttr` setting
* [#5426](https://github.com/bryntum/support/issues/5426) - Mapped field does not return `null` value
* [#5428](https://github.com/bryntum/support/issues/5428) - Changing column name should not trigger rerendering
* [#5444](https://github.com/bryntum/support/issues/5444) - Error when compiling TS Scheduler with `filterType: string` config
* [#5451](https://github.com/bryntum/support/issues/5451) - `DatePicker` animation glitch
* [#5463](https://github.com/bryntum/support/issues/5463) - Crash when resizing code editor panel to small width
* [#5473](https://github.com/bryntum/support/issues/5473) - `TabPanel` without tabs throwing an error
* [#5479](https://github.com/bryntum/support/issues/5479) - An error when using remote filtering with `syncDataOnLoad` enabled
* [#5480](https://github.com/bryntum/support/issues/5480) - `EventHelper` has globally visible breaking side effects

## 5.2.0 - 2022-10-13

### FEATURES / ENHANCEMENTS

* Grid group columns now support collapsing and expanding. Try it out in the new `collapsible-columns` demo
  ([#4878](https://github.com/bryntum/support/issues/4878))
* Grid columns can now be renamed by using the new `Rename` menu option in the column header or by focusing on the
  header and pressing `F2` ([#5112](https://github.com/bryntum/support/issues/5112))
* Menu has a `separator` config to make it easier to visually separate menu items
* The responsive state objects used in the `responsive` config of the `Responsive` mixin now support a `once` property
  to allow configs to only be set on first activation of the state
* The `Core.helper.DateHelper` class has a new method `formatRange` method which can format date ranges, as well as new
  formatting options for week numbers
* The `TreeGroup` feature was reworked to work better in Gantt, and as a bonus it also works in Scheduler. It now
  displays a new tree structure with links to the leafs in the original structure, rather than actually restructuring
  the original store. In Grid this should have almost no impact, but for very advanced use cases it can be worth knowing
* `PdfExport` feature is refactored to render content directly. This significantly improves performance and robustness
  by eliminating component scrolling. This behavior is enabled by default. You can revert to the old behavior by setting
  `enableDirectRendering` config on the export feature to `false`. ([#4449](https://github.com/bryntum/support/issues/4449))
* Added new `GridFieldFilterPicker` and `GridFieldFilterPickerGroup` widgets, providing UI to manage a set of
  `CollectionFilter`s based on a Grid's columns
* New `fieldfilters` demo showing how to add multi-filter UI to a Grid

### API CHANGES

* [DEPRECATED] The `DomHelper.up()` function was deprecated, use native `element.closest()` instead

### BUG FIXES

* [#2512](https://github.com/bryntum/support/issues/2512) - Implement `ignoreParentReadOnly` config on Widget
* [#4907](https://github.com/bryntum/support/issues/4907) - Export dialog is not usable on narrow screen if component has a lot of columns
* [#5237](https://github.com/bryntum/support/issues/5237) - Moving a grouped header into another subgrid breaks headers
* [#5240](https://github.com/bryntum/support/issues/5240) - Reordering and then collapsing columns breaks header layout
* [#5292](https://github.com/bryntum/support/issues/5292) - Export dialog takes too much time to open in `groupedheaders` demo
* [#5297](https://github.com/bryntum/support/issues/5297) - Export feature settings A6 landscape gives odd blank pages
* [#5301](https://github.com/bryntum/support/issues/5301) - Exporting dialog freezes
* [#5360](https://github.com/bryntum/support/issues/5360) - Clearing tree groups twice causes crash

## 5.1.5 - 2022-10-12

### FEATURES / ENHANCEMENTS

* Added a preventable `beforeCancelCellEdit` event to the grid ([#1832](https://github.com/bryntum/support/issues/1832))
* New records are assigned a generated `id` if none is provided. The generated `id` is meant to be temporary (a
  phantom `id`), and should be replaced by the backend on commit. Previously the `id` was based on a global counter
  incremented with each assignment. That simplistic scheme assured no two records got the same `id` during a session,
  but if an application serialized the generated `id` (note, they should not) and then reloaded it, it would eventually
  collide with a new generated `id`. To prevent this, the generated `id`s are now based on a random UUID instead
* Stores now by default show a warning on console when loading records that has generated `id`s, as a reminder that it
  should be replaced by the backend on commit

### BUG FIXES

* [#4645](https://github.com/bryntum/support/issues/4645) - Improve error message "Bryntum bundle included twice"
* [#4654](https://github.com/bryntum/support/issues/4654) - [REACT] Bryntum widget wrappers don't accept all component properties in React 18
* [#5341](https://github.com/bryntum/support/issues/5341) - `Picker` is shown for `Combo` with `keyStrokeFilterDelay` after clearing value
* [#5343](https://github.com/bryntum/support/issues/5343) - `AggregateColumn` not working if added after `Grid` is painted
* [#5348](https://github.com/bryntum/support/issues/5348) - `RadioGroup` live demo broken
* [#5358](https://github.com/bryntum/support/issues/5358) - Event being triggered multiple times after changing hidden property
* [#5383](https://github.com/bryntum/support/issues/5383) - Error triggered when adding new tab after remove a tab
* [#5384](https://github.com/bryntum/support/issues/5384) - Error after removing tab the index is not updated

## 5.1.4 - 2022-09-29

### FEATURES / ENHANCEMENTS

* The `RowReorder` feature now has a `dropOnLeaf` config which in a `TreeGrid` enables creation of parents simply by
  drag and dropping a row on a leaf. The feature has also been visually updated - when dragging and targeting into a row
  the targeted row will get a border and a different background. The arrow which previously indicated to which parent a
  row would be added, has been removed ([#4582](https://github.com/bryntum/support/issues/4582))
* Added a preventable `beforeToggleGroup` event that is triggered before groups are toggled using the UI ([#5218](https://github.com/bryntum/support/issues/5218))

### BUG FIXES

* [#227](https://github.com/bryntum/support/issues/227) - `RowReorder`: Not possible to drop a row as a child of an empty parent node
* [#4974](https://github.com/bryntum/support/issues/4974) - `AjaxStore` continuously making remote requests after store grouping when `sortParamName` is set
* [#5031](https://github.com/bryntum/support/issues/5031) - [TypeScript] Column type property is not defined
* [#5032](https://github.com/bryntum/support/issues/5032) - Column doesn't set column type according to data type
* [#5170](https://github.com/bryntum/support/issues/5170) - When first region has width and last region is collapsed, Grid doesn't resize with container
* [#5173](https://github.com/bryntum/support/issues/5173) - `FilterBar` doesn't work for `startDate`/`endDate` columns when date has `hour`/`minute` provided
* [#5191](https://github.com/bryntum/support/issues/5191) - Column's tooltip config (field) incorrectly processed
* [#5209](https://github.com/bryntum/support/issues/5209) - Rows remain selected after reorder on touch device
* [#5210](https://github.com/bryntum/support/issues/5210) - Crash when reordering rows on a touch device
* [#5213](https://github.com/bryntum/support/issues/5213) - `DatePicker` can't move months if min date is after current date
* [#5214](https://github.com/bryntum/support/issues/5214) - `AjaxStore` continuously making remote requests after store sorting with `syncDataOnLoad` set to `true`
* [#5217](https://github.com/bryntum/support/issues/5217) - Update `RowReorder` SASS to facilitate custom theming
* [#5220](https://github.com/bryntum/support/issues/5220) - Should be able to drop a row as a child of an another row
* [#5261](https://github.com/bryntum/support/issues/5261) - `StateProvider` doesn't save state for grouped columns
* [#5275](https://github.com/bryntum/support/issues/5275) - Error message returned from backend not displayed
* [#5282](https://github.com/bryntum/support/issues/5282) - Make `AjaxStore` urls changeable
* [#5285](https://github.com/bryntum/support/issues/5285) - Error after sorting with custom `id` model field

## 5.1.3 - 2022-09-09

### BUG FIXES

* [#415](https://github.com/bryntum/support/issues/415) - Improve docs on formatting currency values on `NumberField`
* [#3680](https://github.com/bryntum/support/issues/3680) - Support Salesforce Winter 22 release
* [#5096](https://github.com/bryntum/support/issues/5096) - `Datepicker` year select doesn't allow to configure year options
* [#5125](https://github.com/bryntum/support/issues/5125) - Setting an initial value for `activeTab` on a `TabPanel` no longer animates that tab into view
* [#5142](https://github.com/bryntum/support/issues/5142) - Drag and drop support for the `rowexpander`
* [#5161](https://github.com/bryntum/support/issues/5161) - Grid doesn't destroy existing column models when assigning new data to `columns`
* [#5174](https://github.com/bryntum/support/issues/5174) - `RowExpander` triggers an error when configured in Vue example
* [#5182](https://github.com/bryntum/support/issues/5182) - `TimeField` should keep date if user types in the value
* [#5201](https://github.com/bryntum/support/issues/5201) - `Store` sort uses `localeCompare` for non-string types

## 5.1.2 - 2022-08-29

### FEATURES / ENHANCEMENTS

* Grid Columns now accept a `cellEditor` property as a config object to allow customization of the floating `Editor`
  Widget which encapsulates its `editor` input field ([#2465](https://github.com/bryntum/support/issues/2465))
* An application's filters on a store may now be configured with an `internal` property. This indicates that they are
  fixed, and must not be ingested and modified by filtering UIs such as the `Filter` and   `FilterBar` features
  ([#4980](https://github.com/bryntum/support/issues/4980))
* Configs that accept configuration options for a widget (or other class) are now (mostly) documented to accept a typed
  config object rather than a plain object. For example instead of `{Object} tooltip - A tooltip configuration object`,
  it is now `{TooltipConfig} tooltip - A tooltip configuration object`. This improves our TypeScript typings (transforms
  to `Partial<TooltipConfig>` in typings) when using such configs, but also improves our docs by linking to the configs
  of the type
* Added a `keepDate` config to the `TimeField`. By default, it is false and sets date component of the field value to
  `January 1st`. Set it to true to keep original value intact and only change the time component ([#5058](https://github.com/bryntum/support/issues/5058))
* Added a new `project-summary` demo showing how to combine multiple Grid features to provide a visually nice looking
  list of data

### BUG FIXES

* [#3238](https://github.com/bryntum/support/issues/3238) - Columns in the column store may not reflect the order they appear in visually
* [#3552](https://github.com/bryntum/support/issues/3552) - Opened dropdown list not re-positioned when scroll the entire app
* [#4656](https://github.com/bryntum/support/issues/4656) - Error when deleting rows out of visible area in large data sets
* [#4661](https://github.com/bryntum/support/issues/4661) - `OnToggle` in the `CheckColumn` not working
* [#4929](https://github.com/bryntum/support/issues/4929) - `autoHeight` cells with no content should not cause rows to collapse below the configured `rowHeight`
* [#4946](https://github.com/bryntum/support/issues/4946) - Mask is not aligned properly to the grid body if `bbar` is enabled
* [#4999](https://github.com/bryntum/support/issues/4999) - `AjaxStore` `beforeRequest` doesn't allow to make changes in request body
* [#5010](https://github.com/bryntum/support/issues/5010) - Group expanders still visible after stopping grouping
* [#5017](https://github.com/bryntum/support/issues/5017) - [TypeScript] Property type is missing in `DataFieldConfig`
* [#5018](https://github.com/bryntum/support/issues/5018) - [Vue] Prop Validation fails for `String` options
* [#5026](https://github.com/bryntum/support/issues/5026) - Auto filled combo in filter bar does not select picked values
* [#5067](https://github.com/bryntum/support/issues/5067) - `readOnly` disables Slider fields and makes them unfocusable
* [#5072](https://github.com/bryntum/support/issues/5072) - `grid.startEditing()` should be supported
* [#5080](https://github.com/bryntum/support/issues/5080) - TAB from an actionable location inside a grid cell should navigate right (or left with shift key)
* [#5088](https://github.com/bryntum/support/issues/5088) - Crash when entering number into paging toolbar `page` field
* [#5089](https://github.com/bryntum/support/issues/5089) - Grid `readOnly` value should not be saved in its state
* [#5104](https://github.com/bryntum/support/issues/5104) - [Docs] Wrong docs for `toggleCollapse` function in `Group` feature

## 5.1.1 - 2022-07-28

### BUG FIXES

* [#4637](https://github.com/bryntum/support/issues/4637) - `mergeCells` is not reactive to row height
* [#4798](https://github.com/bryntum/support/issues/4798) - Grid row freezes when reordering multiple rows
* [#4979](https://github.com/bryntum/support/issues/4979) - Some keys do not work in cell editor

## 5.1.0 - 2022-07-21

### FEATURES / ENHANCEMENTS

* A row expander feature has been added to Grid, which also makes it available for Scheduler and Scheduler Pro. The
  feature makes it possible to expand and collapse each row by either a separate expander column or a grid cell
  event. The expanded rows content is rendered by a rendering function that the implementor provides in the feature
  config ([#2374](https://github.com/bryntum/support/issues/2374))
* Updated the built-in version of FontAwesome Free to `6.1.1`
* Our TypeScript typings for string types that have a predefined set of alternatives was improved to only accept
  those alternatives. For example previously the `dock` config which was previously declared as `dock: string` is now
  `dock : 'top'|'right'|'bottom'|'left'`
* Create React App templates now available
* `KeyMap` is a mixin that allows for standardized and customizable keyboard shortcuts functionality. `KeyMap` is by
  default mixed in to `Widget` and therefore available to all `Widget`'s child classes. There is a new guide
  **Guides/Customization/Keyboard shortcuts** describing how to customize currently integrated keyboard shortcuts
  ([#4300](https://github.com/bryntum/support/issues/4300), [#4313](https://github.com/bryntum/support/issues/4313), [#4328](https://github.com/bryntum/support/issues/4328))

### API CHANGES

* [DEPRECATED] The `breakpoints` config of the `Core.widget.mixin.Responsive` mixin is deprecated in favor of its new
  `responsive` config. The `responsive` config is more easily customized when used in the default configuration of
  widgets
* [DEPRECATED] The `responsiveWidthChange` and `responsiveHeightChange` events of the `Core.widget.mixin.Responsive`
  mixin are deprecated in favor of its new `responsiveStateChange` event
* [BREAKING] [ANGULAR] Angular wrappers now use the more modern module bundle by default, instead of the legacy umd
  bundle. Hence application imports must be changed to match. This will slightly improve application size and
  performance ([#2786](https://github.com/bryntum/support/issues/2786))
* [BREAKING] `grid.lite.umd.js` bundle is no longer available
* [BREAKING] WebComponents has been removed from `grid.module.js` ES modules bundle. New bundle with WebComponents
  is `grid.wc.module.js`

### BUG FIXES

* [#4687](https://github.com/bryntum/support/issues/4687) - Grid RowExpander: Content overflows to the next row when browser window is narrow
* [#4688](https://github.com/bryntum/support/issues/4688) - Make button text in **rowexpander** demo not selectable
* [#4696](https://github.com/bryntum/support/issues/4696) - Parents sorted below children in docs
* [#4697](https://github.com/bryntum/support/issues/4697) - Too dark code background in docs
* [#4934](https://github.com/bryntum/support/issues/4934) - Selection column in the wrong place when using grouped headers
* [#4936](https://github.com/bryntum/support/issues/4936) - Combo with `autoexpand: true` closes immediately on first click of dropdown arrow

## 5.0.7 - 2022-07-13

### FEATURES / ENHANCEMENTS

* Added preventable `beforeSelectionChange` event which fires before selection changes ([#4705](https://github.com/bryntum/support/issues/4705))

### BUG FIXES

* [#4746](https://github.com/bryntum/support/issues/4746) - Vertical scroll jumps up when clicked on top of horizontal scrollbar
* [#4758](https://github.com/bryntum/support/issues/4758) - Allow cancelling an export process
* [#4836](https://github.com/bryntum/support/issues/4836) - Check column not rendered correctly on `readOnly` mode
* [#4865](https://github.com/bryntum/support/issues/4865) - [LWC] Exception when clicking on modal over the component
* [#4871](https://github.com/bryntum/support/issues/4871) - Error when committing changes with nested `responseDataProperty` path
* [#4872](https://github.com/bryntum/support/issues/4872) - Aborted fetch should reject the promise
* [#4874](https://github.com/bryntum/support/issues/4874) - `WidgetColumn` should be readOnly if record is `readOnly`
* [#4879](https://github.com/bryntum/support/issues/4879) - Grid Vue demo error rendering
* [#4915](https://github.com/bryntum/support/issues/4915) - Cell tooltip remains when hovering over blank cells
* [#4916](https://github.com/bryntum/support/issues/4916) - `Fullscreen` is not working on mobile Safari

## 5.0.6 - 2022-06-20

### BUG FIXES

* [#841](https://github.com/bryntum/support/issues/841) - Add `searchAllRecords` flag to store search functions
* [#4146](https://github.com/bryntum/support/issues/4146) - `TaskEditor` clears time when editing events with datetime picker
* [#4254](https://github.com/bryntum/support/issues/4254) - Grid with checkbox column should be `readonly` if bound to a data field and `cellEdit` is not enabled
* [#4750](https://github.com/bryntum/support/issues/4750) - Splitter overlays `bbar`
* [#4755](https://github.com/bryntum/support/issues/4755) - Wrong element focused if tabbing over cells where `beforeCellEditStart` returns `false`
* [#4778](https://github.com/bryntum/support/issues/4778) - Body mask now tracks grid resize to maintain cover of the body
* [#4779](https://github.com/bryntum/support/issues/4779) - Crash when adding empty `bbar`
* [#4788](https://github.com/bryntum/support/issues/4788) - `GridRow` Chevron Stops Responding on Touch Device with `5.0.X`
* [#4804](https://github.com/bryntum/support/issues/4804) - Radiobutton hover effect incorrectly positioned in Material theme when on RTL
* [#4808](https://github.com/bryntum/support/issues/4808) - Typings are wrong for async functions

## 5.0.5 - 2022-05-30

### FEATURES / ENHANCEMENTS

* Added `paste` and `copy` events to the `RowCopyPaste` feature ([#4552](https://github.com/bryntum/support/issues/4552))
* Added `filterStyles` config to the `PdfExport` feature to simplify styles processing ([#3103](https://github.com/bryntum/support/issues/3103))

### BUG FIXES

* [#2275](https://github.com/bryntum/support/issues/2275) - Export to PDF fails when Grid headers are hidden
* [#4350](https://github.com/bryntum/support/issues/4350) - Fixed various panel collapse issues
* [#4444](https://github.com/bryntum/support/issues/4444) - Tooltip not displayed when calling `showBy` targeting a widget
* [#4545](https://github.com/bryntum/support/issues/4545) - [LWC] Columns and row reordering features don't work
* [#4567](https://github.com/bryntum/support/issues/4567) - Using too new `replaceChildren` API in Row
* [#4607](https://github.com/bryntum/support/issues/4607) - [VUE] Incorrect prop types in Vue wrapper
* [#4630](https://github.com/bryntum/support/issues/4630) - Column reorder triggers double repaint
* [#4636](https://github.com/bryntum/support/issues/4636) - Model field is not exposed correctly if data is not preloaded to the store
* [#4638](https://github.com/bryntum/support/issues/4638) - `mergeCells` causes fail in export

## 5.0.4 - 2022-05-11

### API CHANGES

* Container's `autoUpdateRecord` config was made public. Set it to `true` to update record fields when child fields
  change ([#4073](https://github.com/bryntum/support/issues/4073))
* Model's `clearChanges` function parameter `includeDescendants` made public. Set it to `false` to not clear changes on
  a node's descendants ([#4565](https://github.com/bryntum/support/issues/4565))

### BUG FIXES

* [#3930](https://github.com/bryntum/support/issues/3930) - Exception when collapsing tree scrolled to the bottom
* [#4294](https://github.com/bryntum/support/issues/4294) - Not possible to reach horizontal time axis scrollbar
* [#4541](https://github.com/bryntum/support/issues/4541) - Grid splitter too dark in Stockholm theme
* [#4559](https://github.com/bryntum/support/issues/4559) - Grid region splitter buttons not centered
* [#4562](https://github.com/bryntum/support/issues/4562) - [REACT] React wrappers have incorrect source mapping urls

## 5.0.3 - 2022-04-26

### FEATURES / ENHANCEMENTS

* `AggregateColumn` now has a `includeParentInChangeSet` config which will trigger parent row changes to appear
  in the modification tracking and in sync requests ([#3969](https://github.com/bryntum/support/issues/3969))

### API CHANGES

* New Vue 2/3 wrapper config option `relayStoreEvents` (defaults to `false`). When set to `true`, the events fired by
  stores are relayed to the Bryntum Grid instance
* [REACT] React wrappers now include TypeScript definitions ([#3378](https://github.com/bryntum/support/issues/3378))

### BUG FIXES

* [#100](https://github.com/bryntum/support/issues/100) - Splitter has wrong color
* [#4127](https://github.com/bryntum/support/issues/4127) - [LWC] `DomHelper.isInView()` throws
* [#4222](https://github.com/bryntum/support/issues/4222) - [LWC] Performance degradation in 5.0 release
* [#4289](https://github.com/bryntum/support/issues/4289) - Using `TreeGroup` modifies tasks
* [#4324](https://github.com/bryntum/support/issues/4324) - Widget column with button doesn't pass text into child widget
* [#4432](https://github.com/bryntum/support/issues/4432) - [LWC] Mouse events do not work
* [#4459](https://github.com/bryntum/support/issues/4459) - Bryntum Grid search feature limited to 1000 matches
* [#4461](https://github.com/bryntum/support/issues/4461) - [Vue] wrapper triggers doubled `dataChange` events with different params
* [#4496](https://github.com/bryntum/support/issues/4496) - `createOnUnmatched` doc is wrong
* [#4523](https://github.com/bryntum/support/issues/4523) - Docs do not tell how to disable certain menu items
* [#4535](https://github.com/bryntum/support/issues/4535) - Error appeared when state try to apply selection on already removed record

## 5.0.2 - 2022-04-13

### API CHANGES

* Deprecated `showByPoint()` in Widget, it will be removed in version 6.0. Use `showBy()` instead

### BUG FIXES

* [#2796](https://github.com/bryntum/support/issues/2796) - Allow customizing Roboto path in material theme
* [#3941](https://github.com/bryntum/support/issues/3941) - Field picker is not aligned on scroll
* [#4097](https://github.com/bryntum/support/issues/4097) - Bug when restore state for `filterBar` column with date type
* [#4134](https://github.com/bryntum/support/issues/4134) - [REACT] Basic React Data Grid demo - React cell editor does not work
* [#4248](https://github.com/bryntum/support/issues/4248) - Grid splitter arrows artefact
* [#4308](https://github.com/bryntum/support/issues/4308) - Problems with rendering React component in column renderer and as cell editor
* [#4321](https://github.com/bryntum/support/issues/4321) - Dragging between groups in the Grid should change group field of the dragged records
* [#4326](https://github.com/bryntum/support/issues/4326) - Grid region splitter buttons not touchable
* [#4351](https://github.com/bryntum/support/issues/4351) - Listeners object breaks click functionality
* [#4360](https://github.com/bryntum/support/issues/4360) - Wrong color of checkbox checkmark in Stockholm theme
* [#4364](https://github.com/bryntum/support/issues/4364) - When editing cell, editing doesn't end when click outside of the grid
* [#4366](https://github.com/bryntum/support/issues/4366) - Dragging column header to edge should trigger scroll
* [#4368](https://github.com/bryntum/support/issues/4368) - Filterbar live demo in docs has misaligned fields
* [#4373](https://github.com/bryntum/support/issues/4373) - Panel collapse arrow pointing in wrong direction initially
* [#4377](https://github.com/bryntum/support/issues/4377) - Change radio button to use `<div>` for the selected circle
* [#4406](https://github.com/bryntum/support/issues/4406) - Fixed items in disabled `fieldset`/`radiogroup` not being disabled
* [#4408](https://github.com/bryntum/support/issues/4408) - Column `filterFn` function works incorrectly if multiple columns share field
* [#4412](https://github.com/bryntum/support/issues/4412) - Batch column updates do not show until next column update
* [#4464](https://github.com/bryntum/support/issues/4464) - Search feature not searching on date and duration fields
* [#4467](https://github.com/bryntum/support/issues/4467) - Changing the tree column causes expand icon sync issues
* [#4482](https://github.com/bryntum/support/issues/4482) - Grid not refreshed when supplying empty array to `store.filter()` with `replace: true`

## 5.0.1 - 2022-03-04

### BUG FIXES

* [#4246](https://github.com/bryntum/support/issues/4246) - Docs splitter is too wide when hovered
* [#4249](https://github.com/bryntum/support/issues/4249) - `DateTimeField` does not update if required
* [#4270](https://github.com/bryntum/support/issues/4270) - `CellTooltip` should not cache async fetched cell content
* [#4278](https://github.com/bryntum/support/issues/4278) - `cellContextMenu` not working
* [#4282](https://github.com/bryntum/support/issues/4282) - Examples browser scrolls to top after fully loaded
* [#4288](https://github.com/bryntum/support/issues/4288) - Right editor border not visible when starting editing

## 5.0.0 - 2022-02-21

* We are thrilled to announce version 5.0 of our Grid product. This release marks a big milestone for us, after more
  than a year of development. This update contains a new RadioButton widget, new TreeGroup and MergeCells features as
  well as bug fixes and other enhancements requested by our community. A big thanks to our customers who helped us with
  testing our alpha & beta versions
* You are most welcome to join us on March 16th, at 9am PST (6pm CET) for a 5.0 walkthrough webinar, demonstrating all
  the shiny new features
  [Click here to register](https://us06web.zoom.us/webinar/register/5116438317103/WN_4MkExpZPQsGYNpzh1mR_Ag)
* We hope you will enjoy this release and we are looking forward to hearing your feedback of what you would like us to
  develop next
* / Mats Bryntse, CEO @Bryntum

### FEATURES / ENHANCEMENTS

* Each product has a new "thin" JavaScript bundle. The thin bundle only contains product specific code, letting you
  combine multiple Bryntum products without downloading the shared code multiple times (previously only possible with
  custom-built bundles from sources). Find out more in the What's new guide ([#2805](https://github.com/bryntum/support/issues/2805))
* Each theme is now available in a version that only has product specific CSS in it, called a `thin` version. These
  files are name `[product].[theme].thin.css` - `grid.stockholm.thin.css` for example. They are intended for using
  when you have multiple different bryntum products on the same page, to avoid including shared CSS multiple times
  Read more about it in the `What's new` section in docs ([#3276](https://github.com/bryntum/support/issues/3276))
* Using the new `MergeCells` feature and the corresponding `mergeCells` config on columns it is now possible to have
  cells spanning multiple rows. Applies to sorted columns, cells that have the same value are merged into a single
  cell. Try it out in the new `merge-cells` demo ([#196](https://github.com/bryntum/support/issues/196))
* A new `deselectOnClick` config was added to `GridSelection` to allow single click toggling of a row / cell
  selected state ([#3577](https://github.com/bryntum/support/issues/3577))
* `Model` has a new `readOnly` field that is respected by UI level editing features to disallow editing records having
  `readOnly : true`. It does not directly affect the datalayer, meaning that you can still programmatically edit the
  records ([#665](https://github.com/bryntum/support/issues/665))
* Grid has a new `TreeGroup` feature that can transform a tree on the fly. It generates a new tree structure based on an
  array of field names (or functions), each entry yields a new level in the resulting tree. Check it out in the new
  `tree-grouping` demo ([#3543](https://github.com/bryntum/support/issues/3543))
* `window` references are replaced with `globalThis` which is supported in all modern browsers and across different JS
  environments ([#4071](https://github.com/bryntum/support/issues/4071))
* A new function called `downloadTestCase()` was added to Bryntum widgets, it is intended to simplify creating test
  cases for reporting issues on Bryntum's support forum. Running it collects the current value for the configs your app
  is using, inlines the current dataset and compiles that into a JavaScript app that is then downloaded. The app will
  most likely require a fair amount of manual tweaking to reproduce the issue, but we are hoping it will simplify the
  process for you. Run `grid.downloadTestCase()` on the console in a demo to try it
* Updated FontAwesome Free to version 6, which includes some new icons sponsored by Bryntum in the charts category:
  https://fontawesome.com/search?m=free&c=charts-diagrams&s=solid
* When configured with a StateProvider and `stateId`, Grid state is stored automatically as stateful properties change
  ([#1859](https://github.com/bryntum/support/issues/1859))

### API CHANGES

* [BREAKING] Grid's `selectionMode` config is now merged with the default settings (previously it overwrote defaults)
  See upgrade guide for more details
* [BREAKING] Store´s remove method now returns an empty array if no records were removed (previously returned `null`)
* [BREAKING] TreeStore´s `beforeRemove` and `remove` events now only include `parent` when removing a single node
* The List widget now uses UL and LI elements to represent its items, may affect your styling if you use DIV in your
  style rules
* [BREAKING] TextAreaField was renamed to TextAreaPickerField to serve only as a picker-type field. A new TextAreaField
  widget was added which is used in Gantt's NotesTab
* [BREAKING] TextAreaPickerField's `inline` config has been removed, use TextAreaField instead
* [BREAKING] React wrappers now use the modern module bundle by default, instead of the legacy umd bundle. Hence
  application imports must be changed to match. This will slightly improve application size and performance
  ([#2787](https://github.com/bryntum/support/issues/2787))
* Store's `toJSON()` method now ignores all local filters and returns all records ([#4101](https://github.com/bryntum/support/issues/4101))
* The following previously deprecated Core configs, functions etc. where removed:
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
* The following previously deprecated Grid configs, functions etc. where removed:
* Array form of the `Column#cellMenuItems` config - previously replaced by object form
* Array form of the `Column#headerMenuItems` config - previously replaced by object form
* Config `Grid#showRemoveRowInContextMenu` - in favor of CellMenu feature items configuration
* Returning `false` from `CellTooltip#tooltipRenderer` no longer flags it as async -
      previously replaced with returning a Promise
* `ContextMenu` feature - previously replaced by `HeaderMenu` and `CellMenu` features
* Param `record` of all `RowReorder` events - previously replaced by `records`
* Event `Grid#beforeExport` - in favor of `beforePdfExport` event ([#3240](https://github.com/bryntum/support/issues/3240))
* Event `Grid#export` - in favor of `pdfExport` event

### BUG FIXES

* [#758](https://github.com/bryntum/support/issues/758) - State mixin to use configurable's `onConfigChange` hook
* [#1404](https://github.com/bryntum/support/issues/1404) - Tapping cell should select row, not start cell editing
* [#3088](https://github.com/bryntum/support/issues/3088) - `ColumnStore` remove method is very slow
* [#3575](https://github.com/bryntum/support/issues/3575) - No selection when disabling `multiSelect`
* [#3947](https://github.com/bryntum/support/issues/3947) - Inconsistent right / bottom padding in `MessageDialog`
* [#3952](https://github.com/bryntum/support/issues/3952) - Wrong border bottom color for panel header
* [#4022](https://github.com/bryntum/support/issues/4022) - Panel collapse icon
* [#4039](https://github.com/bryntum/support/issues/4039) - Popup with grid hides when picking item in grid cell menu if `animateRemovingRows` is `true`
* [#4045](https://github.com/bryntum/support/issues/4045) - Arrow down in FilterBar number field should not navigate to grid cells
* [#4079](https://github.com/bryntum/support/issues/4079) - CellEdit instantUpdate regression
* [#4086](https://github.com/bryntum/support/issues/4086) - Allow derived classes to adjust delayable method options
* [#4143](https://github.com/bryntum/support/issues/4143) - Autoheight demo throws when trying to edit notes
* [#4233](https://github.com/bryntum/support/issues/4233) - Cut task remains grayed out after copying

## 4.3.9 - 2022-02-17

### BUG FIXES

* [#4127](https://github.com/bryntum/support/issues/4127) - [LWC] `DomHelper.isInView()` throws in Salesforce
* [#4130](https://github.com/bryntum/support/issues/4130) - fi-FI locale uses `\u2212` as the negation symbol which won't parse
* [#4131](https://github.com/bryntum/support/issues/4131) - `DurationField` uses wrong unit after clearing and using step trigger
* [#4170](https://github.com/bryntum/support/issues/4170) - `Column` interface is missing `static get type()`
* [#4195](https://github.com/bryntum/support/issues/4195) - `AjaxStore` loads despite autoLoad being false when filterBar used and there is a configured filter
* [#4201](https://github.com/bryntum/support/issues/4201) - Cannot load non-extensible data objects with `transformFlatData`
* [#4209](https://github.com/bryntum/support/issues/4209) - `transformFlatData` not working if `children : true` is present

## 4.3.8 - 2022-02-07

### BUG FIXES

* [#4098](https://github.com/bryntum/support/issues/4098) - `AggregateColumn` doesn't gather all child node values, so can calculate inaccurately
* [#4108](https://github.com/bryntum/support/issues/4108) - Combo should expand when clicking empty space if editable is `false` + `multiSelect`
* [#4119](https://github.com/bryntum/support/issues/4119) - Wrong position of cell editors in scrolled subgrids

## 4.3.7 - 2022-02-02

### FEATURES / ENHANCEMENTS

* CellEdit `autoEdit` now leaves editing state after pressing Enter, you can control this behavior with the new
  `editNextOnEnterPress` flag. ([#4032](https://github.com/bryntum/support/issues/4032))
* CellEdit can now be configured to stop editing after clicking another cell via its new `continueEditingOnCellClick`
  config ([#4046](https://github.com/bryntum/support/issues/4046))
* Added public `dragStart` / `drag` / `drop` events to Splitter class ([#4060](https://github.com/bryntum/support/issues/4060))

### API CHANGES

* TreeColumn icons are now always rendered before the `b-tree-cell-value` text content element. Might effect your
  styling if you relied on icon position in the DOM
* [DEPRECATED] Grid `beforeExport` and `export` events (triggered by `PdfExport` feature) were deprecated in favor of
  the `beforePdfExport` and `pdfExport` events respectively. The old events names will be dropped in v5.0.0

### BUG FIXES

* [#3197](https://github.com/bryntum/support/issues/3197) - Grid Filter Popup has hardcoded width which breaks rendering when fields have a big width
* [#3770](https://github.com/bryntum/support/issues/3770) - Fix handling of initially collapsed panels with configured size
* [#4028](https://github.com/bryntum/support/issues/4028) - On demand load issue in tree grid when using `syncDataOnLoad`
* [#4029](https://github.com/bryntum/support/issues/4029) - `autoEdit` should not react when CTRL / CMD key is used to copy & paste
* [#4030](https://github.com/bryntum/support/issues/4030) - `RowCopyPaste` broken
* [#4041](https://github.com/bryntum/support/issues/4041) - `TextArea` ignores arrowDown key press
* [#4051](https://github.com/bryntum/support/issues/4051) - `CellTooltip` does not update on next show for the same row, when its record is mutated
* [#4080](https://github.com/bryntum/support/issues/4080) - Sub-menu closes when moving over gap
* [#4082](https://github.com/bryntum/support/issues/4082) - Relayed listeners do not trigger onFunctions

## 4.3.6 - 2022-01-13

### FEATURES / ENHANCEMENTS

* Clearing and changing the content of a TreeStore is much easier and faster now using the `clearChildren`
  and `replaceChildren` API of the `TreeNode` class. Changing the column set of a Grid should use these APIs on the
  store's `rootNode`
* The Grid now fires `beforeRenderRow` and `renderRow` events to allow customization of rows ([#3960](https://github.com/bryntum/support/issues/3960))

### BUG FIXES

* [#935](https://github.com/bryntum/support/issues/935) - text-overflow of grid column header broken in material theme
* [#3795](https://github.com/bryntum/support/issues/3795) - Grid Search feature does not handle TreeColumn's rendering inside a cell
* [#3897](https://github.com/bryntum/support/issues/3897) - [TypeScript] Missing ArrayDataField
* [#3933](https://github.com/bryntum/support/issues/3933) - An error when using multiSelect filter field config for tree column
* [#3945](https://github.com/bryntum/support/issues/3945) - Cannot select text in popup
* [#3950](https://github.com/bryntum/support/issues/3950) - PasswordField styles broken
* [#3958](https://github.com/bryntum/support/issues/3958) - Fix panel collapser docs for `direction` config
* [#3962](https://github.com/bryntum/support/issues/3962) - Tree parent / leaf icon indent mismatch
* [#3975](https://github.com/bryntum/support/issues/3975) - Restore state works incorrect with filterBar
* [#3976](https://github.com/bryntum/support/issues/3976) - Grid Column needs a maxWidth config
* [#3978](https://github.com/bryntum/support/issues/3978) - Clicking selected day cell in datepicker causes refresh
* [#3987](https://github.com/bryntum/support/issues/3987) - StoreSync fails when using tree data with lazy loaded parent nodes
* [#3989](https://github.com/bryntum/support/issues/3989) - Tree grid + filterbar + multiselect not working
* [#3990](https://github.com/bryntum/support/issues/3990) - Chrome & Content Security Policy causes failure because of debug code section
* [#4008](https://github.com/bryntum/support/issues/4008) - Filter icon disappears when a column is hidden

## 4.3.5 - 2021-12-24

### BUG FIXES

* [#2944](https://github.com/bryntum/support/issues/2944) - `transformFlatData` not compatible with `syncDataOnLoad` in a tree store
* [#3752](https://github.com/bryntum/support/issues/3752) - Restoring state after `filterBy` on grid (or scheduler) crashes
* [#3863](https://github.com/bryntum/support/issues/3863) - Export server executable for windows does not work
* [#3896](https://github.com/bryntum/support/issues/3896) - [TypeScript] Wrong typings of model class configs
* [#3902](https://github.com/bryntum/support/issues/3902) - `AjaxStore` re-requests the current page if the `pageStartParam` being requested is zero
* [#3906](https://github.com/bryntum/support/issues/3906) - When using selection mode `rowCheckboxSelection` overrides checkbox property
* [#3907](https://github.com/bryntum/support/issues/3907) - [TypeScript] Cannot pass Scheduler instance to `Store.relayAll`
* [#3908](https://github.com/bryntum/support/issues/3908) - ActionColumn: tooltip not displayed when using rendered config
* [#3909](https://github.com/bryntum/support/issues/3909) - `showCheckAll` config in CheckColumn not working
* [#3910](https://github.com/bryntum/support/issues/3910) - Error when collapsing expanded nodes in TreeGrid with empty children array
* [#3912](https://github.com/bryntum/support/issues/3912) - `Grid.column.ActionColumn` renderer not working
* [#3928](https://github.com/bryntum/support/issues/3928) - DateHelper `k` format behaves incorrectly
* [#3938](https://github.com/bryntum/support/issues/3938) - `revertChanges` not working for number column having an undefined value

## 4.3.4 - 2021-12-13

### FEATURES / ENHANCEMENTS

* Updated `angular-renderer` Angular demo to use Angular 13 ([#3742](https://github.com/bryntum/support/issues/3742))
* RowReorder `gridRowBeforeDropFinalize` and `gridRowDrop` events now include information about the original position of
  the dragged tree nodes when reordering nodes in a tree grid ([#3810](https://github.com/bryntum/support/issues/3810))

### BUG FIXES

* [#3621](https://github.com/bryntum/support/issues/3621) - [TypeScript] Improve typings of mixins
* [#3816](https://github.com/bryntum/support/issues/3816) - `move` event is not triggered when moving a node in a `TreeStore`
* [#3850](https://github.com/bryntum/support/issues/3850) - [TypeScript] Missing static properties in typings
* [#3853](https://github.com/bryntum/support/issues/3853) - Cannot set row height for scheduler webcomponent
* [#3855](https://github.com/bryntum/support/issues/3855) - Setting a ModelDataField in a record could recurse infinitely

## 4.3.3 - 2021-11-30

### FEATURES / ENHANCEMENTS

* Grid´s `ColumnReorder` feature now fires `beforeColumnDragStart`, `columnDragStart`, `beforeColumnDropFinalize`,
  `columnDrop` events which let you veto move operations ([#3667](https://github.com/bryntum/support/issues/3667))
* New `aggregation-column` demo showing the Aggregate Column ([#3818](https://github.com/bryntum/support/issues/3818))

### API CHANGES

* AggregateColumn now subclasses NumberColumn instead of Column

### BUG FIXES

* [#3616](https://github.com/bryntum/support/issues/3616) - `Filter` bar field remains after hiding a column
* [#3630](https://github.com/bryntum/support/issues/3630) - Whitespace seen when adding many new rows quickly
* [#3637](https://github.com/bryntum/support/issues/3637) - When tooltip uses a `forSelector` and `trackMouse`, moving within its active target
* [#3648](https://github.com/bryntum/support/issues/3648) - [DOCS] Content navigation is broken
* [#3654](https://github.com/bryntum/support/issues/3654) - Format of date `FilterBar` field should default to date format of column
* [#3670](https://github.com/bryntum/support/issues/3670) - STM `resetQueue` error if a transaction is being recorded
* [#3671](https://github.com/bryntum/support/issues/3671) - Parent column receives an autogenerated field
* [#3707](https://github.com/bryntum/support/issues/3707) - `ExcelExporter` export method should return a Promise
* [#3710](https://github.com/bryntum/support/issues/3710) - Allow to configure `dragTouchStartDelay` for `RowReorder` feature
* [#3743](https://github.com/bryntum/support/issues/3743) - [DOCS] `web.config` file for Windows IIS server
* [#3817](https://github.com/bryntum/support/issues/3817) - Adding a node to a collapsed parent does not refresh grid properly

## 4.3.2 - 2021-10-29

### FEATURES / ENHANCEMENTS

* `RowCopyPaste` feature now fires `beforeCopy` and `beforePaste` events to let you prevent the actions ([#3303](https://github.com/bryntum/support/issues/3303))

### BUG FIXES

* [#3611](https://github.com/bryntum/support/issues/3611) - `CellEdit` does not tolerate dot delimited field names in accord with how its host Grid does
* [#3616](https://github.com/bryntum/support/issues/3616) - Filter bar field remains after hiding a column
* [#3622](https://github.com/bryntum/support/issues/3622) - Edited cell is not marked when initial cell value is `0` or `undefined`

## 4.3.1 - 2021-10-21

### FEATURES / ENHANCEMENTS

* A group column can now be `sealed` meaning you are not allowed to drop columns into it ([#3536](https://github.com/bryntum/support/issues/3536))
* Bumped builtin Font Awesome Free to version 5.15.4

### BUG FIXES

* [#361](https://github.com/bryntum/support/issues/361) - Sorting `ColumnStore` should rerender content automatically
* [#3522](https://github.com/bryntum/support/issues/3522) - Filter bar header field disappears when moving parent column in grouped headers
* [#3535](https://github.com/bryntum/support/issues/3535) - Crash when dragging column header to locked side
* [#3561](https://github.com/bryntum/support/issues/3561) - Crash after right clicking columns on Gantt Predecessor / Successor, only works on the first one
* [#3567](https://github.com/bryntum/support/issues/3567) - Minified css bundle contains unicode chars
* [#3581](https://github.com/bryntum/support/issues/3581) - Toolable docs link broken
* [#3582](https://github.com/bryntum/support/issues/3582) - Columns autoWidth feature not working when table is embedded in a div with `display: none` style
* [#3587](https://github.com/bryntum/support/issues/3587) - Possible to select unselectable row using checkbox

## 4.3.0 - 2021-10-12

### FEATURES / ENHANCEMENTS

* WidgetColumn now offers two-way binding by configuring the column's field widget with a name corresponding to a
  `Model` field name. See this demonstrated in the `examples/widgetcolumn` example
* Panels can now be collapsed when configured as `collapsible` ([#914](https://github.com/bryntum/support/issues/914))
* [BREAKING] `@babel/preset-env` config target `chrome: 75` is now used for the UMD bundle. This decreases bundle size
  and improves performance for modern browsers ([#3201](https://github.com/bryntum/support/issues/3201))
* Legacy Angular demos for versions 1-5 were removed due to incompatibility with the new UMD bundle format

### API CHANGES

* [DEPRECATED] Buttons `menuIconCls` config was deprecated in favor of the new `menuIcon` config, which better matches
  the naming of other configs

### BUG FIXES

* [#3480](https://github.com/bryntum/support/issues/3480) - Make `dataChange` event work for Grid
* [#3511](https://github.com/bryntum/support/issues/3511) - Crash when adding a new column to a grid starting out with no columns

## 4.2.7 - 2021-10-01

### FEATURES / ENHANCEMENTS

* Buttons that have a menu now show a caret down arrow icon, see `menuIconCls` in Button docs ([#3426](https://github.com/bryntum/support/issues/3426))
* Grid now fires `subGridExpand` + `subGridCollapse` events after toggling the sub grid `collapsed` state ([#3459](https://github.com/bryntum/support/issues/3459))
* `ComboBox` can now be configured to accept unmatched typed filter strings to create a new record. Use the
  `createOnUnmatched` config to enable this. This may be configured as a function to create the new record in an
  app-specific way ([#3249](https://github.com/bryntum/support/issues/3249))

### BUG FIXES

* [#3272](https://github.com/bryntum/support/issues/3272) - Expanding last node sometimes doesn't increase scroll size
* [#3415](https://github.com/bryntum/support/issues/3415) - Generate unique phantom ids across all stores
* [#3439](https://github.com/bryntum/support/issues/3439) - Filtering out all child rows should hide parent row chevron icon
* [#3443](https://github.com/bryntum/support/issues/3443) - Not possible to use filter feature with grouped headers in grid
* [#3458](https://github.com/bryntum/support/issues/3458) - Document nested fields

## 4.2.6 - 2021-09-15

### FEATURES / ENHANCEMENTS

* You can now control if the widget tooltip should be shown when the widget is disabled using the
  `showTooltipWhenDisabled` config

### BUG FIXES

* [#3145](https://github.com/bryntum/support/issues/3145) - Adding filters shows wrong date filter value
* [#3179](https://github.com/bryntum/support/issues/3179) - Tooltip is not shown for a disabled button
* [#3387](https://github.com/bryntum/support/issues/3387) - Group header incorrect when showing summary in header
* [#3408](https://github.com/bryntum/support/issues/3408) - Updated typings to support spread operator for method parameters

## 4.2.5 - 2021-09-08

### FEATURES / ENHANCEMENTS

* The `GroupSummary` feature has a new config (and property) called `target` that can be used to render summaries to
  group headers (`target : 'header'`) instead of to group footers (the default, `target : 'footer'`). Try it out in the
  updated `groupsummary` demo ([#3312](https://github.com/bryntum/support/issues/3312))
* The API documentation now better communicates when a field or property accepts multiple input types but uses a single
  type for output. For example date fields on models, which usually accepts a `String` or `Date` but always outputs a
  `Date` ([#2933](https://github.com/bryntum/support/issues/2933))

### BUG FIXES

* [#2756](https://github.com/bryntum/support/issues/2756) - Row height is not recalculated when collapsing group when using `collapseToHeader`
* [#2951](https://github.com/bryntum/support/issues/2951) - Store is not filtered if filterBar combo is initialized with multiple values
* [#3322](https://github.com/bryntum/support/issues/3322) - Add `dataChange` event to framework guides
* [#3355](https://github.com/bryntum/support/issues/3355) - Column cell tooltip misplaced with `hideDelay = 0`
* [#3364](https://github.com/bryntum/support/issues/3364) - Grid select all records not working when store is grouped and filtered
* [#3373](https://github.com/bryntum/support/issues/3373) - Combo blank entry is less tall

## 4.2.4 - 2021-08-27

### BUG FIXES

* [#2983](https://github.com/bryntum/support/issues/2983) - Row Selection Checkbox disappears with Group Summary feature
* [#3096](https://github.com/bryntum/support/issues/3096) - Slider#showTooltip: false does not disable tooltip
* [#3220](https://github.com/bryntum/support/issues/3220) - Sorting column by nested field does not work
* [#3259](https://github.com/bryntum/support/issues/3259) - Splitter should support block containers
* [#3265](https://github.com/bryntum/support/issues/3265) - Docs are not scrolled to the referenced member
* [#3277](https://github.com/bryntum/support/issues/3277) - Crash when hiding parent column
* [#3301](https://github.com/bryntum/support/issues/3301) - Copy/Paste should not react if cell or editor text is selected
* [#3302](https://github.com/bryntum/support/issues/3302) - TreeStore#move does not update tree contents properly
* [#3305](https://github.com/bryntum/support/issues/3305) - Guides look bad in the docs search results
* [#3306](https://github.com/bryntum/support/issues/3306) - Doc browser does not scroll to member

## 4.2.3 - 2021-08-05

### FEATURES / ENHANCEMENTS

* The PdfExport feature now supports configuring its ExportDialog to pre-select columns to export or
  to customize any of the child widgets ([#2052](https://github.com/bryntum/support/issues/2052))
* [NPM] Bryntum Npm server now supports remote private repository access for Artifactory with username and password
  authentication ([#2864](https://github.com/bryntum/support/issues/2864))
* [TYPINGS] Type definitions now contain typed `features` configs and properties ([#2740](https://github.com/bryntum/support/issues/2740))

### API CHANGES

* [DEPRECATED] PdfExport feature `export` event is deprecated and will be removed in 4.3.0. Use `export` event on the
  Grid instead
* [DEPRECATED] Grid `beforeExport` event signature is deprecated and will be removed in 4.3.0. New signature wraps
  config object to the corresponding key

### BUG FIXES

* [#1596](https://github.com/bryntum/support/issues/1596) - Collapsed groups disappear when using filterBar
* [#1698](https://github.com/bryntum/support/issues/1698) - Export dialog is not configurable
* [#2600](https://github.com/bryntum/support/issues/2600) - PdfExport feature export() method should take column exportable flag into account
* [#2693](https://github.com/bryntum/support/issues/2693) - exporterType : 'multipage' not respected
* [#3206](https://github.com/bryntum/support/issues/3206) - Selection is not updated when triggering contextmenu on expander icon
* [#3209](https://github.com/bryntum/support/issues/3209) - Filterbar feature uses wrong column looking for filter fn
* [#3247](https://github.com/bryntum/support/issues/3247) - Scroller position reset to 0 when filtering using FilterBar with no results

## 4.2.2 - 2021-07-21

### FEATURES / ENHANCEMENTS

* [NPM] Bryntum Npm server now supports `npm token` command for managing access tokens for CI/CD ([#2703](https://github.com/bryntum/support/issues/2703))

### BUG FIXES

* [#365](https://github.com/bryntum/support/issues/365) - Re-assigning columns is not compatible with checkbox selection model
* [#2170](https://github.com/bryntum/support/issues/2170) - Cell tooltip hides & shows infinitely if it doesn't fit in the viewport
* [#3039](https://github.com/bryntum/support/issues/3039) - Fixed incorrect `dragcancel` firing when only a click (and no drag) occurred
* [#3162](https://github.com/bryntum/support/issues/3162) - LoadOnDemand feature cannot be disabled in runtime
* [#3167](https://github.com/bryntum/support/issues/3167) - LWC bundle is missing from trial packages
* [#3178](https://github.com/bryntum/support/issues/3178) - Syntax highlighter messes up code snippets in docs
* [#3192](https://github.com/bryntum/support/issues/3192) - Filterbar combo width does not stretch to match column

## 4.2.1 - 2021-07-07

### FEATURES / ENHANCEMENTS

* [FRAMEWORKS] Added `rowCopyPasteFeature` to frameworks wrappers ([#3135](https://github.com/bryntum/support/issues/3135))

### BUG FIXES

* [#3043](https://github.com/bryntum/support/issues/3043) - syncDataOnLoad does not work correctly with trees
* [#3136](https://github.com/bryntum/support/issues/3136) - [NPM] Running `npm install` twice creates modified `package-lock.json` file

## 4.2.0 - 2021-06-30

### FEATURES / ENHANCEMENTS

* List can now render a grouped store, which can be used by Combo for a grouped combo UI ([#2459](https://github.com/bryntum/support/issues/2459))
* Added a new `Responsive` mixin that can be mixed into widgets to allow responsive behaviour ([#2672](https://github.com/bryntum/support/issues/2672))
* [BREAKING] `Grid.util.ScrollManager` was moved to the Core package and renamed to `Core.util.ScrollManager`. It is
  untangled from the Grid and allows managing scrolling of any DOM element. ([#2883](https://github.com/bryntum/support/issues/2883))
* Added a new `bubbleEvents` config to specify events that should always bubble. Useful for example on fields in a
  container, to bubble `change` events and catch them in a listener on the container
* Added "Replacing Font Awesome with Material Icons" guide

### API CHANGES

* [BREAKING] `GlobalEvents` is no longer exposed on `window`. If you use it in your application, import it instead

### LOCALE UPDATES

* `removeRows` label of CellMenu & GridBase was removed
* Value of `removeRow` label of CellMenu & GridBase was updated to say just 'Remove'
* RowCopyPaste locales were updated to just say 'Copy', 'Cut' & 'Paste'. `copyRows`, `cutRows` & `pasteRows` keys
  were removed

### BUG FIXES

* [#2643](https://github.com/bryntum/support/issues/2643) - Code editor shows all code in one line
* [#2940](https://github.com/bryntum/support/issues/2940) - Ok and Cancel button order should match OS
* [#3036](https://github.com/bryntum/support/issues/3036) - Hidden columns are exported anyway
* For more details, see [What's new](https://bryntum.com/products/grid/docs/guide/Grid/whats-new/4.2.0) and
  [Upgrade guide](https://bryntum.com/products/grid/docs/guide/Grid/upgrades/4.2.0) in docs

## 4.1.6 - 2021-06-23

### FEATURES / ENHANCEMENTS

* GridSelection has a new selectionMode option `preserveSelectionOnPageChange` which preserves the selected records
  while moving between pages in a paged dataset ([#3079](https://github.com/bryntum/support/issues/3079))

### BUG FIXES

* [#110](https://github.com/bryntum/support/issues/110) - Group and Sort features should support custom sorting functions
* [#278](https://github.com/bryntum/support/issues/278) - Calling tree store removeAll(true) unbinds rootNode from store
* [#2756](https://github.com/bryntum/support/issues/2756) - Row height is not recalculated when collapsing group
* [#3005](https://github.com/bryntum/support/issues/3005) - [VUE-3] Problem with Critical Paths due to Vue Proxy and double native events firing bug
* [#3008](https://github.com/bryntum/support/issues/3008) - Remove childElementCount usages, unsupported in LWC
* [#3018](https://github.com/bryntum/support/issues/3018) - QuickFind feature should encode HTML
* [#3026](https://github.com/bryntum/support/issues/3026) - [VUE-2] and [VUE-3] typescript type declarations are missing
* [#3028](https://github.com/bryntum/support/issues/3028) - Parent task turned into leaf after removing child task
* [#3029](https://github.com/bryntum/support/issues/3029) - Child nodes not removed after collapsing parent node in tree grid

## 4.1.5 - 2021-06-09

### FEATURES / ENHANCEMENTS

* Grid now has a `minHeight` of `10em` by default. This assures that the Grid will get a size even if no other sizing
  rules are applied for the element it is rendered to. When the default `minHeight` is driving the height, a warning is
  shown on the console to let the dev know that sizing rules are missing. The warning is not shown if a `minHeight` is
  explicitly configured ([#2915](https://github.com/bryntum/support/issues/2915))
* [TYPINGS] API singleton classes are correctly exported to typings ([#2752](https://github.com/bryntum/support/issues/2752))

### BUG FIXES

* [#2724](https://github.com/bryntum/support/issues/2724) - CellEditor won't close properly after invalid search in combo list
* [#2757](https://github.com/bryntum/support/issues/2757) - React and Vue column renderers do not sync the value
* [#2985](https://github.com/bryntum/support/issues/2985) - RowReorder drag proxy element misplaced
* [#2990](https://github.com/bryntum/support/issues/2990) - [ANGULAR] Preventable async events don't work

## 4.1.4 - 2021-05-28

### FEATURES / ENHANCEMENTS

* Grid can now be configured to clear its row / cell selection after a new dataset is loaded. This is
  configured using the `selectionMode#preserveSelectionOnDatasetChange` config of the GridSelection mixin
* Grid can now be configured to preserve its vertical scroll state after a new dataset is loaded. This is
  controlled by the `preserveScrollOnDatasetChange` flag
* Grid RowReorder feature now allows for async finalization of a drop. See updated docs or `rowreorder` demo for
  guidance. ([#2716](https://github.com/bryntum/support/issues/2716))
* TypeScript definitions updated to use typed `Partial<>` parameters where available
* Buttons now has a new style `b-transparent` that renders them without background or borders ([#2853](https://github.com/bryntum/support/issues/2853))
* [NPM] repository package `@bryntum/grid` now includes source code ([#2723](https://github.com/bryntum/support/issues/2723))
* [NPM] repository package `@bryntum/grid` now includes minified versions of bundles ([#2842](https://github.com/bryntum/support/issues/2842))
* [FRAMEWORKS] Frameworks demos packages dependencies updated to support Node v12

### BUG FIXES

* [#2104](https://github.com/bryntum/support/issues/2104) - "Core" code not isomorphic
* [#2783](https://github.com/bryntum/support/issues/2783) - CellMenu not triggered on iPhone's with 3D touch enabled
* [#2828](https://github.com/bryntum/support/issues/2828) - Memory leak when replacing project instance
* [#2834](https://github.com/bryntum/support/issues/2834) - Core should not use b-fa for icon prefix
* [#2874](https://github.com/bryntum/support/issues/2874) - Filter field should not grow when X is shown
* [#2884](https://github.com/bryntum/support/issues/2884) - Check all checkbox checked state should be updated after page change
* [#2908](https://github.com/bryntum/support/issues/2908) - [ANGULAR] Add custom-tag rendering of tooltip, header, etc. to angular-renderer demo
* [#2936](https://github.com/bryntum/support/issues/2936) - Filter added to nested column does not update filter field
* [#2937](https://github.com/bryntum/support/issues/2937) - Clicking next page doesn't scroll to top

## 4.1.3 - 2021-05-13

### FEATURES / ENHANCEMENTS

* Improved PDF Export feature API. It exposes methods allowing to take control over requests and responses
  ([#2726](https://github.com/bryntum/support/issues/2726))
* Grid's row checkbox selection with checkbox can now also select tree node children when a parent node is selected
  ([#1951](https://github.com/bryntum/support/issues/1951))
* Column now has a 'tooltip' config for showing a tooltip when hovering the column header ([#2794](https://github.com/bryntum/support/issues/2794))
* Bumped the built in version of FontAwesome Free to 5.15.3 and added missing imports to allow stacked icons etc
* Bumped the `@babel/preset-env` config target to `chrome: 75` for the Module bundle. This decreased bundle
  sizes and improved performance for modern browsers
* Updated Angular Wrappers to be compatible with Angular 6-7 in production mode for target `es2015`

### BUG FIXES

* [#2478](https://github.com/bryntum/support/issues/2478) - Normal grid cannot be expanded after restoring its collapsed state
* [#2581](https://github.com/bryntum/support/issues/2581) - PDF Export server doesn't load local resources via HTTPS
* [#2597](https://github.com/bryntum/support/issues/2597) - Pointer position is out of sync with column right edge when reducing column width
* [#2694](https://github.com/bryntum/support/issues/2694) - [REACT] Grid - column resizing broken
* [#2731](https://github.com/bryntum/support/issues/2731) - Column drag proxy is misplaced in absolutely positioned web component
* [#2762](https://github.com/bryntum/support/issues/2762) - TimeField step defaults to day unit
* [#2778](https://github.com/bryntum/support/issues/2778) - Wrong module declaration in typings file
* [#2795](https://github.com/bryntum/support/issues/2795) - Row selection lost after collapse / expand parent node
* [#2801](https://github.com/bryntum/support/issues/2801) - Filter bar misrendered in docs example
* [#2816](https://github.com/bryntum/support/issues/2816) - Not possible to use renderer on Checkbox column
* [#2856](https://github.com/bryntum/support/issues/2856) - Column filter's "operator" argument never changes after setting

## 4.1.2 - 2021-04-27

### BUG FIXES

* [#2677](https://github.com/bryntum/support/issues/2677) - Fixed improper toolbar overflow handling of buttons with menus

## 4.1.1 - 2021-04-23

### FEATURES / ENHANCEMENTS

* Added new `enableUndoRedoKeys` config to Grid which triggers undo / redo upon pressing CTRL-Z key combination
  ([#2532](https://github.com/bryntum/support/issues/2532))
* Popups can now be maximized to fill the visible viewport
* New Vue 3 Vue Renderer demo
* New Vue 3 TreeGrid demo
* New config `autoHeight` on Tab Panel to set the height of all tabs to match the tab with the highest content
* The Context menu base class (ContextMenuBase.js) now supports triggering a context menu to be shown programmatically
  using the new `showContextMenu` method
* The summary feature now supports summing only selected rows ([#2631](https://github.com/bryntum/support/issues/2631))
* Display field can now accept a template formatting its value, which can now also be markup ([#2641](https://github.com/bryntum/support/issues/2641))

### BUG FIXES

* [#109](https://github.com/bryntum/support/issues/109) - Slider label should not have right margin
* [#491](https://github.com/bryntum/support/issues/491) - Store loadChildren should remove existing children
* [#1083](https://github.com/bryntum/support/issues/1083) - Summary not updated after filtering with filter bar
* [#1339](https://github.com/bryntum/support/issues/1339) - Issue when destroying the grid with custom React components
* [#1861](https://github.com/bryntum/support/issues/1861) - Store filter method does not support nested fields
* [#1987](https://github.com/bryntum/support/issues/1987) - DOCS: React guide needs a section on how to listen for events
* [#2293](https://github.com/bryntum/support/issues/2293) - Search in a tree grid by a full matched string produces Object object in cell content
* [#2410](https://github.com/bryntum/support/issues/2410) - List hide/show methods lose parent promises
* [#2482](https://github.com/bryntum/support/issues/2482) - MultiSelect Combo set value doesn't work when configured filterSelected : true
* [#2542](https://github.com/bryntum/support/issues/2542) - selectionMode with checkbox column does not handle selection mutating inside selectionChange listener
* [#2569](https://github.com/bryntum/support/issues/2569) - Grid scroll not working after store.add when store is filtered
* [#2596](https://github.com/bryntum/support/issues/2596) - Vue-3: Implement Vue component support for column (cell) renderer
* [#2616](https://github.com/bryntum/support/issues/2616) - Varying padding-left in Panel
* [#2636](https://github.com/bryntum/support/issues/2636) - [WRAPPERS] Features are not updated at runtime
* [#2659](https://github.com/bryntum/support/issues/2659) - Context menus do not work with extra wrapper around lwc container element
* [#2671](https://github.com/bryntum/support/issues/2671) - parentIndex field has incorrect value after clearing filters
* [#2678](https://github.com/bryntum/support/issues/2678) - Column autoWidth and cell edit causes editor to be misaligned
* [#2679](https://github.com/bryntum/support/issues/2679) - on-owner events should be added to owner too in docs
* [#2681](https://github.com/bryntum/support/issues/2681) - Yarn. Package trial alias can not be installed
* [#2687](https://github.com/bryntum/support/issues/2687) - Excel Export ignores nested fields
* [#2729](https://github.com/bryntum/support/issues/2729) - Action Column Causes Grouping Header to Disappear

## 4.1.0 - 2021-04-02

### FEATURES / ENHANCEMENTS

* We are happy to announce that Bryntum Grid now can be directly installed using our npm registry
  We've updated all our frameworks demos to use `@bryntum` npm packages. See them in `examples/frameworks` folder
  Please refer to "Npm packages" guide in docs for registry login and usage information
* Added new Vue 3 Simple demo to show how to use Bryntum Grid in Vue 3 ([#13155](https://github.com/bryntum/support/issues/13155) - Implement demos with VUE 3
  support)
* Added new Vue Cell Renderer demo to show Vue Components as cell renderers (Partially fixed [#946](https://github.com/bryntum/support/issues/946) - Vue: Support
  components in renderers)
* Added new Bryntum Grid Big Dataset demo in React 17 demo . The example also implements theme switching ([#1823](https://github.com/bryntum/support/issues/1823)
  and [#2213](https://github.com/bryntum/support/issues/2213))
* Bryntum demos were updated with XSS protection code. `StringHelper.encodeHtml` and `StringHelper.xss` functions were
  used for this
* CellEdit#startEditing will now cancel any ongoing editing before starting the editing (previously just ignored this
  situation)
* Model fields can now be marked with `alwaysWrite` to ensure important data fields are always included when updates
  are committed by an AjaxStore ([#848](https://github.com/bryntum/support/issues/848))
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
* Summary feature now offers a `refresh` method to update summaries. See updated summary demo for sample usage
* DatePicker now supports `cellRenderer` to output custom contents into the date cells ([#2498](https://github.com/bryntum/support/issues/2498))
* `showValue` config of PercentColumn class defaults to `false` now
* The `ColumnPicker` feature now has a new config, `createColumnsFromData` which means that data fields in the grid's
  model class are interrogated and new columns may be added from the column menu to represent those fields
* It is now possible to use automatic height for cells, see the new `autoHeight` config on `Column`. Please note that
  enabling it comes with a pretty hefty performance hit, since all the cells has to be measured in DOM. Check it out in
  the new `autoheight` demo ([#2236](https://github.com/bryntum/support/issues/2236))
* Widgets now offer `requestFullscreen` and `exitFullscreen` methods, which ensure tooltips and other floating
  sub-widgets will be visible while in fullscreen mode
* CellEdits `cancelCellEdit()` method now includes an `event` parameter if the cancellation was triggered by a DOM event
  ([#2311](https://github.com/bryntum/support/issues/2311))
* Column´s header text is now HTML encoded by default. Can be disabled by using the new `htmlEncodeHeaderText` config
  ([#2765](https://github.com/bryntum/support/issues/2765))
* Added a compact mode to the FilterBar feature, that overlays the filtering fields on the headers ([#2132](https://github.com/bryntum/support/issues/2132))

### API CHANGES

* [BREAKING] Removed RequireJS demos and integration guides in favor of modern ES6 Modules technology ([#1963](https://github.com/bryntum/support/issues/1963))
* [BREAKING] Angular wrapper `onGridEvents` event renamed to `onCatchAll`
* [BREAKING] Angular wrapper feature names are now suffixed with `Feature`
* [BREAKING] `init` method is no longer required in Lightning Web Components and was removed from the LWC bundle
* [DEPRECATED] React, Angular, Vue wrappers `gridInstance` property renamed to `instance`
* [DEPRECATED] The `cellSelector` param of the Grid cellClick / cellDblClick / cellContextMenu / cellMouseOver /
  cellMouseOut events was deprecated and will be removed in 5.0
* [DEPRECATED] The `Store` `move` event's `record` property was deprecated in favor of `records`, but if the array form
  has been used, only contains the first record. This property will be removed in a future version
* Internal DOM structure of the DatePicker header was refactored and simplified. This may affect your styling if you
  have relied on the presence of certain elements or CSS classes
* DatePicker#editOnHover config was deprecated and it has no effect on the widget
* Returning `false` from an on-function now prevents the listeners for that event from being triggered
* The `Store.move()` API now accepts an array of records to move as well as a single record. The corresponding
  `Store` `move` event now has an extra `records` property referencing all records which have been moved

### BUG FIXES

* [#400](https://github.com/bryntum/support/issues/400) - Tooltips and floating widgets are not visible if Scheduler is fullscreen
* [#876](https://github.com/bryntum/support/issues/876) - `store.query` should search through all records when searchAllRecords is true
* [#951](https://github.com/bryntum/support/issues/951) - Tooltips not shown for widgets inside a web component with shadow root
* [#1059](https://github.com/bryntum/support/issues/1059) - Slider cannot be used as a widget in a column
* [#1525](https://github.com/bryntum/support/issues/1525) - Improve Localization guide
* [#1689](https://github.com/bryntum/support/issues/1689) - Investigate sharing static resource between multiple LWC on the same page
* [#1819](https://github.com/bryntum/support/issues/1819) - DatePicker styling issues
* [#1893](https://github.com/bryntum/support/issues/1893) - [REACT] JSX renderer not supported for TreeColumn
* [#2109](https://github.com/bryntum/support/issues/2109) - Row selection in check column not possible if grid is readonly
* [#2153](https://github.com/bryntum/support/issues/2153) - Select all checkbox in Check column does not react on click
* [#2194](https://github.com/bryntum/support/issues/2194) - Setting `title` on item in a `TabPanel` now updates the text of the tab in the tab bar
* [#2211](https://github.com/bryntum/support/issues/2211) - Add test coverage for XSS
* [#2225](https://github.com/bryntum/support/issues/2225) - Store.originalCount should ignore special group records
* [#2235](https://github.com/bryntum/support/issues/2235) - Number column does not accept key typed if its cell has the same value
* [#2285](https://github.com/bryntum/support/issues/2285) - React Components not being rendered within Scheduler cells when columns are sorted
* [#2295](https://github.com/bryntum/support/issues/2295) - Not possible to type in negative numbers to the number field
* [#2304](https://github.com/bryntum/support/issues/2304) - CheckColumn does not respect "text" config
* [#2305](https://github.com/bryntum/support/issues/2305) - Editing code in online demos throws error
* [#2306](https://github.com/bryntum/support/issues/2306) - Grid#selectRow fails if first column is hidden
* [#2321](https://github.com/bryntum/support/issues/2321) - [LWC] input arrows do not work
* [#2328](https://github.com/bryntum/support/issues/2328) - Calling store.load on paged grid changes the page number
* [#2354](https://github.com/bryntum/support/issues/2354) - Column filter icon tooltip displays the valueField instead of the displayField
* [#2359](https://github.com/bryntum/support/issues/2359) - Update readme files in all framework demos in all products
* [#2367](https://github.com/bryntum/support/issues/2367) - Bug when dragging child column to last index of its parent
* [#2379](https://github.com/bryntum/support/issues/2379) - Add minified version of *.lite.umd.js to the bundle
* [#2384](https://github.com/bryntum/support/issues/2384) - Child nodes loaded on demand are not sorted
* [#2385](https://github.com/bryntum/support/issues/2385) - Keyboard Navigation Broken When Restoring Column Hidden State
* [#2390](https://github.com/bryntum/support/issues/2390) - Support sorting after Store#add
* [#2407](https://github.com/bryntum/support/issues/2407) - Grid/Scheduler not working in IE11
* [#2423](https://github.com/bryntum/support/issues/2423) - Cannot define responsiveLevels in class definition
* [#2426](https://github.com/bryntum/support/issues/2426) - Double clicking tree expander icon should not start editing
* [#2432](https://github.com/bryntum/support/issues/2432) - Setting combobox value to non-matched value should sync input value to that value
* [#2435](https://github.com/bryntum/support/issues/2435) - TabPanel issues
* [#2474](https://github.com/bryntum/support/issues/2474) - Empty text not shown when using autoHeight
* [#2486](https://github.com/bryntum/support/issues/2486) - Month/year picker is not aligned to date picker properly
* [#2505](https://github.com/bryntum/support/issues/2505) - Clicking tree node expander icon should not focus row
* [#2511](https://github.com/bryntum/support/issues/2511) - Applying empty store state doesn't clear filters/sorters/groupers
* [#2522](https://github.com/bryntum/support/issues/2522) - Percent column never displays a value
* [#2526](https://github.com/bryntum/support/issues/2526) - Grid CheckAll checkbox un-checks after drag and drop
* [#2527](https://github.com/bryntum/support/issues/2527) - Inconsistent Behaviour with Select All when Collapsed Groups
* [#2531](https://github.com/bryntum/support/issues/2531) - React JSX Column renderer buggy in grouping grid
* [#2539](https://github.com/bryntum/support/issues/2539) - toggleNode event 'collapse' param showing is undefined
* [#2546](https://github.com/bryntum/support/issues/2546) - [VUE] Widget column doesn't render widget after stopped grouping
* [#2547](https://github.com/bryntum/support/issues/2547) - Vue dashboard demo visual issues
* [#2548](https://github.com/bryntum/support/issues/2548) - [VUE] Cell renderer does not update on sort
* [#2551](https://github.com/bryntum/support/issues/2551) - Removing row makes grid to render several empty lines

## 4.0.8 - 2021-01-27

### FEATURES / ENHANCEMENTS

* Grid now exposes a firstVisibleRow and lastVisibleRow returning first/last visible row records in the grid viewport
* Added sliding toggle widget, which is a styled checkbox ([#2242](https://github.com/bryntum/support/issues/2242))

### BUG FIXES

* [#2195](https://github.com/bryntum/support/issues/2195) - Action column buttons needs a softer color
* [#2223](https://github.com/bryntum/support/issues/2223) - Static request params should be merged with params specified in URL
* [#2250](https://github.com/bryntum/support/issues/2250) - Group Renderer does not allow direct changes to cellElement for feature config
* [#2260](https://github.com/bryntum/support/issues/2260) - CheckColumn ignores headerRenderer
* [#2280](https://github.com/bryntum/support/issues/2280) - Grid header is rendered incorrectly in LWC

## 4.0.7 - 2021-01-12

### FEATURES / ENHANCEMENTS

* The `params` config of AjaxStore was made public ([#2216](https://github.com/bryntum/support/issues/2216))
* `DateField` now supports entering of time if it is configured with `keepTime: 'entered'` and if the field `format`
   includes time info

### BUG FIXES

* [#2127](https://github.com/bryntum/support/issues/2127) - Unable to Edit Number Column Cell Decimal Values
* [#2135](https://github.com/bryntum/support/issues/2135) - Template columns not rendering properly after grouping the grid
* [#2160](https://github.com/bryntum/support/issues/2160) - ActionColumn action handler runs more than once
* [#2177](https://github.com/bryntum/support/issues/2177) - Display of the date column filter tooltip is inconsistent
* [#2186](https://github.com/bryntum/support/issues/2186) - "responsive" event is not fired for the smallest level on load
* [#2187](https://github.com/bryntum/support/issues/2187) - Cell editing finalized after server response with autoSync
* [#2198](https://github.com/bryntum/support/issues/2198) - Enter key should skip group header rows
* [#2207](https://github.com/bryntum/support/issues/2207) - After removing last record in a group, the Group renderer is called for the empty group

## 4.0.6 - 2020-12-29

### FEATURES / ENHANCEMENTS

* The Grid can now remove filtered out records from its row selection using the new
  `selectionMode.deselectFilteredOutRecords` flag ([#2112](https://github.com/bryntum/support/issues/2112))
* ActionColumn is now usable when its Grid is readOnly, and its actions are optionally disabled based on the
  new `disableIfGridReadOnly` config value (defaults to false)

### BUG FIXES

* [#1894](https://github.com/bryntum/support/issues/1894) - Click on chapter works only first time
* [#1990](https://github.com/bryntum/support/issues/1990) - Grid subclasses can now configure its store (e.g., `modelClass`) in its `static get configurable()`
* [#2039](https://github.com/bryntum/support/issues/2039) - ordinalSuffix yields incorrect result for numbers ending with 11, 12, and 13
* [#2107](https://github.com/bryntum/support/issues/2107) - Excel export fails to export while using groupSummary
* [#2115](https://github.com/bryntum/support/issues/2115) - DurationField should respect useAbbreviation config
* [#2155](https://github.com/bryntum/support/issues/2155) - Cell tooltip shows up empty sometimes
* [#2156](https://github.com/bryntum/support/issues/2156) - ActionColumn crashes if Grid#hideHeaders is true
* [#2161](https://github.com/bryntum/support/issues/2161) - Docs should handle URI encoding
* [#2168](https://github.com/bryntum/support/issues/2168) - Grid title header misstyled like a column header
* [#2169](https://github.com/bryntum/support/issues/2169) - Properties missing type in docs

## 4.0.5 - 2020-12-15

### FEATURES / ENHANCEMENTS

* Added specific CSS class for ColumnPicker submenu - `b-column-picker-menu` ([#2057](https://github.com/bryntum/support/issues/2057))

### API CHANGES

* ContextMenu features now accept a `menu` config to merge into their default configuration for their Menus. The
  `menuConfig` property is deprecated in keeping with slimming our API footprint

### BUG FIXES

* [#2049](https://github.com/bryntum/support/issues/2049) - Allow overriding fields for filter feature on column basis
* [#2553](https://github.com/bryntum/support/issues/2553) - Column.resizeToFitContent has poor performance with multiple columns

## 4.0.4 - 2020-12-09

### FEATURES / ENHANCEMENTS

* A new config `discardPortals` on the React wrapper, that controls the behaviour of cell renderers using React
  components. Set to `false` (default) to enhance performance. Set to `true` to limit memory consumption
* Added new Vue Export to Excel demo
* Added new React TreeGrid demo
* Custom sorting functions defined on columns (see `Column#sortable`) can now be applied when programmatically sorting
  the store by that columns field, see the new `Sort#prioritizeColumns` config ([#1303](https://github.com/bryntum/support/issues/1303))
* Custom filtering functions defined on columns (see `Column#filterable`) can now be applied when programmatically
  filtering the store by that columns field, see the new `Filter#prioritizeColumns` and `FilterBar#prioritizeColumns`
  configs ([#1925](https://github.com/bryntum/support/issues/1925))
* DurationField now offers `min` / `max` configs ([#1997](https://github.com/bryntum/support/issues/1997))

### API CHANGES

* CellEdit#doAddNewAtEnd method was made public by mistake, it is now private

### BUG FIXES

* [#1754](https://github.com/bryntum/support/issues/1754) - Click on Action Column items not triggering anything when cellEdit feature is disabled
* [#1812](https://github.com/bryntum/support/issues/1812) - Make tables look better in docs
* [#1857](https://github.com/bryntum/support/issues/1857) - Subgrid cannot be expanded after applying collapsed state
* [#1869](https://github.com/bryntum/support/issues/1869) - Very low performance of React cell renderers
* [#1896](https://github.com/bryntum/support/issues/1896) - Revise column state attributes
* [#1902](https://github.com/bryntum/support/issues/1902) - Combo filter should use exact match for string values
* [#1917](https://github.com/bryntum/support/issues/1917) - Field error tooltip contains wrong information
* [#1922](https://github.com/bryntum/support/issues/1922) - Make public some API used by `destroy`
* [#1928](https://github.com/bryntum/support/issues/1928) - Aligned Popups can lose their configurations on drag
* [#1936](https://github.com/bryntum/support/issues/1936) - ENTER key on last row cell should add a new row if `addNewAtEnd` is enabled
* [#1946](https://github.com/bryntum/support/issues/1946) - Multi sort UI is broken for Duration column (any column with `sortable` function)
* [#1957](https://github.com/bryntum/support/issues/1957) - Date filter is applied incorrectly when restoring from state
* [#1988](https://github.com/bryntum/support/issues/1988) - Docs left panel shrinks when filtered
* [#2026](https://github.com/bryntum/support/issues/2026) - Row reorder broken when header menu is disabled

## 4.0.3 - 2020-11-17

### FEATURES / ENHANCEMENTS

* A new config, `collapseToHeader` on the `GroupSummary` feature makes the headers row of a collapsed group contain the
  summary data for the group. Be aware that the group title is limited in width in a collapsed group header with this
  set so that it does not overflow into summary cells. ([#1355](https://github.com/bryntum/support/issues/1355))
* Added supported for reverting model changes ([#1874](https://github.com/bryntum/support/issues/1874))

### BUG FIXES

* [#1719](https://github.com/bryntum/support/issues/1719) - No scrollbar if all data filtered
* [#1811](https://github.com/bryntum/support/issues/1811) - Number field `changeOnSpin` flag doesn't work as expected
* [#1831](https://github.com/bryntum/support/issues/1831) - Null entries should not swap positions when sorting
* [#1836](https://github.com/bryntum/support/issues/1836) - Combo's picker loses anchoring after typing
* [#1850](https://github.com/bryntum/support/issues/1850) - Column sortable function not called when sorting from context menu
* [#1858](https://github.com/bryntum/support/issues/1858) - Pressing space on a CheckColumn should not trigger scroll
* [#1878](https://github.com/bryntum/support/issues/1878) - initClass method should be public
* [#1884](https://github.com/bryntum/support/issues/1884) - Load mask not hidden after loading fails

## 4.0.2 - 2020-11-04

### BUG FIXES

* [#1350](https://github.com/bryntum/support/issues/1350) - Excel export turns numbers into text
* [#1511](https://github.com/bryntum/support/issues/1511) - DatePicker selects wrong month
* [#1563](https://github.com/bryntum/support/issues/1563) - Editor class fires "complete" event twice

## 4.0.1 - 2020-11-03

### FEATURES / ENHANCEMENTS

* Improved API Docs with a new fiddle panel for live demos, you can now update the code of any live
  demo and instantly see the result. Also added TOC to guides and a class hierarchy
* Columns can now supply a custom `filterField` to control which widget handles the filtering
  Makes it possible to have list based filtering, where you pick a value from a Combo to filter ([#1772](https://github.com/bryntum/support/issues/1772))

### API CHANGES

* Store#query and Store#find no longer calls the supplied filtering method for special group header records
* Renamed and documented events `columnShow`/`columnHide` for Grid.data.ColumnStore

### BUG FIXES

* [#124](https://github.com/bryntum/support/issues/124) - Pressed button border overlaps badge
* [#913](https://github.com/bryntum/support/issues/913) - Docs: Navigating back after visiting bad link has no effect
* [#405](https://github.com/bryntum/support/issues/405) - Crash when typing *foo* into grid column filter
* [#890](https://github.com/bryntum/support/issues/890) - Tooltip / container with text content should not use display flex
* [#1322](https://github.com/bryntum/support/issues/1322) - Extra rows appearing when stop grouping
* [#1323](https://github.com/bryntum/support/issues/1323) - Not possible to escape out of invalid or empty number field editor
* [#1408](https://github.com/bryntum/support/issues/1408) - Promise rejection when an example tooltip load is aborted
* [#1672](https://github.com/bryntum/support/issues/1672) - Right click a grid cell when another window is active on Mac and then removing the record fails
  with exception
* [#1705](https://github.com/bryntum/support/issues/1705) - Wrong region size on export
* [#1706](https://github.com/bryntum/support/issues/1706) - Toolbar should not be exported
* [#1712](https://github.com/bryntum/support/issues/1712) - Skip non-exportable columns in export dialog window
* [#1777](https://github.com/bryntum/support/issues/1777) - List always focuses first item when clicking unfocused list
* [#1782](https://github.com/bryntum/support/issues/1782) - Incorrect group size displayed

## 4.0.0 - 2020-10-19

### FEATURES / ENHANCEMENTS

* [BREAKING] Dropped Support for Edge 18 and older. Our Edge <=18 fixes are still in place and active, but we will not
  be adding more fixes. Existing fixes will be removed in a later version
* Context menu features refactoring: simplified naming by removing the word "Context" in feature names and in event
  names, introduced named objects for menu items, split context menu features by area of responsibility. Please check
  out the upgrade guide for details ([#128](https://github.com/bryntum/support/issues/128))
* ContextMenu feature has been split into CellMenu and HeaderMenu ([#8440](https://github.com/bryntum/support/issues/8440))
* Added "Customize context menus" and "Replace context menus" guides ([#1312](https://github.com/bryntum/support/issues/1312))
* Added a new Grid Feature `StickyCells`. When using highly structured cell content, this allows row content identified
  by a selector to be pinned to the grid top while the row is scrolling off the top but is still visible:
  ```
    features : {
        stickyCells : {
            contentSelector : '.myClass'
        }
    }
  ```
* Field widgets now support a `hint` (and `hintHtml`) config to display non-interactive text overlaying the input
  element
* The RowReorder feature was updated to allow dragging multiple rows at once ([#1402](https://github.com/bryntum/support/issues/1402))
* Added a `precision` config to Model fields of type `number`, to control the number of digits they hold. Input is
  rounded to the specified precision. Makes it easier to match up with a backend using floating numbers of a certain
  precision ([#1320](https://github.com/bryntum/support/issues/1320))
* Grid now extends `Panel` instead of `Container`. This allows you to easily add toolbars to it ([#1417](https://github.com/bryntum/support/issues/1417))
* Added XSS protection functions: `StringHelper.encodeHtml` and `StringHelper.xss`
* Added `grid.lite.umd.js` module that does not include `Promise` polyfill. This module is primarily intended to be used
  with Angular to prevent `zone.js` polyfills overwrite
* Added experimental support for Salesforce Locking Service ([#359](https://github.com/bryntum/support/issues/359)). The distributed bundle only supports modern
  browsers (no IE11 or non-chromium based Edge), since Salesforce drops support for these in January 1st 2021 too
* Added Lightning Web Component demo, see `examples/salesforce/src/lwc`

### API CHANGES

* [BREAKING] The `Core/adapter` directory has been removed. There are no Widget adapters. All Widget classes register
  themselves  with the `Widget` class, and the `Widget` class is the source of Widget `type` mapping and Widget
  registration and lookup by `id`
* [BREAKING] GridState now stores subGrid state in a new format so end users might observe their width/collapsed states
  not being restored
* [BREAKING] The `Default`, `Light` and `Dark` themes were renamed to `Classic`, `Classic-Light` and `Classic-Dark`
  This change highlights the fact that they are variations of the same theme, and that it is not the default theme
  (Stockholm is our default theme since version 2.0)
* [DEPRECATED] `ContextMenu` feature was deprecated. Instead 2 new features were introduced: `CellMenu` and `HeaderMenu`
* [DEPRECATED] `showRemoveRowInContextMenu` config was deprecated in favour of `CellMenu` configuration
* [DEPRECATED] Providing `cellMenuItems` and `headerMenuItems` column configs as an array was deprecated. It has to be a
  named object now
* [DEPRECATED] The `capitalizeFirsLetter()` and `lowerCaseFirstLetter()` functions in `StringHelper` was deprecated in
  favor of `capitalize()` and `uncapitalize()`
* [DEPRECATED] The `record` property of RowReorder events is now deprecated in favor of `records` since the feature now
  supports dragging multiple rows
* Model fields in derived classes are now merged with corresponding model fields (by name) in super classes. This allows
  serialization and other attributes to be inherited when a derived class only wants to change the `defaultValue` or
  other attribute of the field
* The `dateFormat` config for `type='date'` model fields has been simplified to `format`
* Arrow down from column header now navigates to first fully visible cell in that column, instead of the previous
  behavior of opening the column menu
* Stores `json` accessor (which returns a JSON string) and `toJSON()` function (an array of objects) was both documented
  and made public. Useful if you need access to the data of all records to serialize yourself. Output of `toJSON()` can
  be directly plugged into `store.data`, and the output of `json` can be consumed by setting the same property
* Widget reference moved from `reference` attribute to `data-reference`. Change only affects CSS selectors, JS API
  remain intact
* The following previously deprecated members/classes where removed:
  - `StateTrackingManager.getStoreById()`
  - `Store.isVisible()`
  - `Rectangle.round()`
  - `InstancePlugin.pluggedInto`
  - `Editor.allowInvalid`
  - `FlagField`
  - `Widget.visible`
  - `startCellEdit` events `grid` param
  - `cancelCellEdit` events `grid` param

### BUG FIXES

* [#963](https://github.com/bryntum/support/issues/963) - Double clicking other cell during async finalizeCellEdit causes crash
* [#1268](https://github.com/bryntum/support/issues/1268) - Exception when editing date cell
* [#1324](https://github.com/bryntum/support/issues/1324) - Grouping demo should use combo to pick colors
* [#1325](https://github.com/bryntum/support/issues/1325) - Crash after menu hidden
* [#1400](https://github.com/bryntum/support/issues/1400) - DateHelper typo
* [#1405](https://github.com/bryntum/support/issues/1405) - Crash when dragging row up to grid header
* [#1414](https://github.com/bryntum/support/issues/1414) - Checkbox tooltip is not localized in the demo
* [#1425](https://github.com/bryntum/support/issues/1425) - Strange Swedish date format
* [#1479](https://github.com/bryntum/support/issues/1479) - Examples thumbnails are missing
* [#1484](https://github.com/bryntum/support/issues/1484) - Step triggers not horizontally centered
* [#1488](https://github.com/bryntum/support/issues/1488) - b-masked CSS class still found after removing mask
* [#1504](https://github.com/bryntum/support/issues/1504) - Arrow down from column header should jump to first fully visible cell in that column
* [#1512](https://github.com/bryntum/support/issues/1512) - Typing text into inferred number data field in demos produce NaN
* [#1514](https://github.com/bryntum/support/issues/1514) - NumberColumn outputs 0 for null/undefined field value
* [#1540](https://github.com/bryntum/support/issues/1540) - Unquoted column.id in selectors
* [#1544](https://github.com/bryntum/support/issues/1544) - Classic-dark theme white background in example browser
* [#1545](https://github.com/bryntum/support/issues/1545) - Mini demo in example browser fails to load for classic themes in IE11
* [#1548](https://github.com/bryntum/support/issues/1548) - [ANGULAR] Investigate zone.js loading order and set it to Angular default
* [#1600](https://github.com/bryntum/support/issues/1600) - Down key in TextAreaField does not respect inline config
* [#1637](https://github.com/bryntum/support/issues/1637) - Number field triggers reset value
* [#1645](https://github.com/bryntum/support/issues/1645) - Angular example throws an error on expired trial version
* [#1676](https://github.com/bryntum/support/issues/1676) - Vuestic demo issues
* [#1684](https://github.com/bryntum/support/issues/1684) - MessageDialog yesButton missing from docs

## 3.1.9 - 2020-08-26

### BUG FIXES

* [#1424](https://github.com/bryntum/support/issues/1424) - Date picker next button leads to wrong year
* [#1352](https://github.com/bryntum/support/issues/1352) - Filters removed on data load

## 3.1.8 - 2020-08-11

### API CHANGES

* Mask `progress` and `maxProgress` are now public properties ([#1060](https://github.com/bryntum/support/issues/1060))

### BUG FIXES

* [#967](https://github.com/bryntum/support/issues/967) - ActionColumn icon is not centered
* [#975](https://github.com/bryntum/support/issues/975) - STM doesn't update store changes properly
* [#1244](https://github.com/bryntum/support/issues/1244) - Initial export options are shown incorrectly in the export dialog
* [#1301](https://github.com/bryntum/support/issues/1301) - Prevent using filterBar and filter features together

## 3.1.7 - 2020-07-24

### FEATURES/ENHANCEMENTS

* Added new exporter: MultiPageVertical. It fits content horizontally and then generates vertical pages to fit
  vertical content. ([#1092](https://github.com/bryntum/support/issues/1092))

### BUG FIXES

* [#953](https://github.com/bryntum/support/issues/953) - Load mask appearing on top of export progress
* [#973](https://github.com/bryntum/support/issues/973) - Export feature does not respect left grid section width
* [#1172](https://github.com/bryntum/support/issues/1172) - Wrapper should not relay store events to the instance
* [#1176](https://github.com/bryntum/support/issues/1176) - Destroying scheduler on touchstart fails
* [#1180](https://github.com/bryntum/support/issues/1180) - Exported grid should end with the last row
* [#1211](https://github.com/bryntum/support/issues/1211) - Badge example in docs not working
* [#1215](https://github.com/bryntum/support/issues/1215) - PdfExport should not rely on loadMask of the grid

## 3.1.6 - 2020-07-10

### FEATURES/ENHANCEMENTS

* Added Docker image of the PDF Export Server. See server README for details. ([#905](https://github.com/bryntum/support/issues/905))

### API CHANGES

* [DEPRECATED] To avoid risk of confusing the Grid instance with the calculation engine, `gridEngine` has been
  deprecated in favor of `gridInstance` in all framework wrappers (Angular, React, Vue). [#776](https://github.com/bryntum/support/issues/776)

### BUG FIXES

* [#842](https://github.com/bryntum/support/issues/842) - Column renderer should return a value to update cell content
* [#881](https://github.com/bryntum/support/issues/881) - Tooltip is blinking in Firefox when hoverDelay is specified
* [#884](https://github.com/bryntum/support/issues/884) - Slider crops its marker
* [#907](https://github.com/bryntum/support/issues/907) - Error when combining Grid rowCheckboxSelection and summary feature
* [#944](https://github.com/bryntum/support/issues/944) - ExportDialog should respect PdfExport feature configuration
* [#964](https://github.com/bryntum/support/issues/964) - Sorting and filter parameters not URL encoded
* [#1086](https://github.com/bryntum/support/issues/1086) - Sort triggered after column resize
* [#1100](https://github.com/bryntum/support/issues/1100) - Widgets having show animation does not get the b-animating CSS class
* [#1135](https://github.com/bryntum/support/issues/1135) - Incorrect Sorting behaviour for Duration column
* [#1137](https://github.com/bryntum/support/issues/1137) - eventColor should not apply background to dashed eventStyle

## 3.1.5 - 2020-06-09

### FEATURES/ENHANCEMENTS

* Added a new `beforeGridRowDropFinalize` event to RowReorderFeature to allow a single event to set validity
  ([#808](https://github.com/bryntum/support/issues/808))
* Removed React and Vue CDN demos in favor of existing framework examples ([#840](https://github.com/bryntum/support/issues/840))
* Updated Font Awesome Free to v5.13.0
* ScrollManager class was made public, allowing control of how drag-scroll gestures behave ([#870](https://github.com/bryntum/support/issues/870))
* Updated Vue Integration Guide ([#672](https://github.com/bryntum/support/issues/672))
* Added `indentSize` config to `Grid.column.TreeColumn` ([#775](https://github.com/bryntum/support/issues/775))
* Tooltip#beforeShow event now includes access to the event that triggered it to show (via `source.triggeredByEvent`)
  ([#799](https://github.com/bryntum/support/issues/799))

### API CHANGES

* To fix locale inheritance problems some Grid locale strings were moved from the `Grid` section to the `GridBase`
  section in localization files. Any custom localizations for Grid should be updated accordingly. ([#780](https://github.com/bryntum/support/issues/780))
* Column renderers can now request a lower height than the configured `rowHeight`. To allow this, they are now called
  with `size : { height : null }` instead of `size : { height : rowHeight }`. As before, set your desired height there
  The largest requested height for a row will be used. If none is requested it will use the configured row height
* Removed not used localizations `GridBase.serverResponseLabel`, `Tree.noTreeColumn`, `Grid.featureNotFound`,
  `Grid.invalidFeatureNameFormat`, `ColumnStore.columnTypeNotFound`,  `TemplateColumn.noTemplate`,
  `TemplateColumn.noFunction`
* Renamed localization `PdfExport.Waiting for response from server...` to `PdfExport.Waiting for response from server`

### BUG FIXES

* [#653](https://github.com/bryntum/support/issues/653) - Grouped schedule grid corrupted after group collapse / expand
* [#742](https://github.com/bryntum/support/issues/742) - Not persistable data change may initiate a commit with an empty object
* [#781](https://github.com/bryntum/support/issues/781) - Grouping breaks when removing last record in group
* [#828](https://github.com/bryntum/support/issues/828) - Tree node with link does not cover cell fully
* [#831](https://github.com/bryntum/support/issues/831) - Clicking parent node (with href set) expander should not trigger the link
* [#844](https://github.com/bryntum/support/issues/844) - Drag drop does not finalize properly if mouse up happens above an iframe
* [#854](https://github.com/bryntum/support/issues/854) - Allow renderers to set lower row height
* [#861](https://github.com/bryntum/support/issues/861) - Crash if calling refreshColumn on a hidden column
* [#885](https://github.com/bryntum/support/issues/885) - Page scrolls when expanding date picker with keyboard

## 3.1.4 - 2020-05-19

### BUG FIXES

* [#521](https://github.com/bryntum/support/issues/521) - Blank records added on stop grouping of filtered grid
* [#761](https://github.com/bryntum/support/issues/761) - Tooltip does not show first time when loadingMsg is empty and loading remote content
* [#769](https://github.com/bryntum/support/issues/769) - Popup is not aligned to target properly with constrainTo
* [#777](https://github.com/bryntum/support/issues/777) - Show / hide filter bar is not working when after removing a column
* [#782](https://github.com/bryntum/support/issues/782) - Crash after collapse all with empty tree
* [#785](https://github.com/bryntum/support/issues/785) - Code editor not working reliably

## 3.1.3 - 2020-05-14

### FEATURES/ENHANCEMENTS

* Added Vue.js and Vuetify.js integrated examples ([#374](https://github.com/bryntum/support/issues/374))
* Added `triggerEvent` config to `Grid.feature.CellEdit` ([#496](https://github.com/bryntum/support/issues/496))
* Added new `ActionColumn` component ([#504](https://github.com/bryntum/support/issues/504))
* Added new Vue demos

### BUG FIXES

* [#493](https://github.com/bryntum/support/issues/493) - Export file name is not configurable
* [#581](https://github.com/bryntum/support/issues/581) - Example label text cannot be selected
* [#594](https://github.com/bryntum/support/issues/594) - gridRowDrop reorder event fires before row has been moved
* [#595](https://github.com/bryntum/support/issues/595) - Crash when double clicking example image in examples browser
* [#596](https://github.com/bryntum/support/issues/596) - Font Awesome should be bound to font-weight 900
* [#670](https://github.com/bryntum/support/issues/670) - Editor Sass syntax error
* [#680](https://github.com/bryntum/support/issues/680) - Crash if collapsing parent node with left section collapsed
* [#759](https://github.com/bryntum/support/issues/759) - Cell editor not aligned after window resizing

## 3.1.2 - 2020-04-17

### FEATURES/ENHANCEMENTS

* The grid.module.js bundle is now lightly transpiled to ECMAScript 2015 using Babel to work with more browsers out of
  the box

## 3.1.1 - 2020-03-27

### FEATURES/ENHANCEMENTS

* Buttons now support having a link via the new `href` and `target` config options

### API CHANGES

* NumberField now reports `undefined` if the input field is empty
* ObjectHelper#setPath method became chainable and returns the passed object instance

### BUG FIXES

* [#030](https://github.com/bryntum/support/issues/030) - Region resize splitter problems on touch devices
* [#330](https://github.com/bryntum/support/issues/330) - Id collision happens when you add or move records after filters are cleared
* [#411](https://github.com/bryntum/support/issues/411) - Setting icon classes on TreeColumn doesn't work properly
* [#420](https://github.com/bryntum/support/issues/420) - Fixed Store sort does not respect ascending flag
* [#422](https://github.com/bryntum/support/issues/422) - Theme switching leaks elements and crashes if changing multiple times with slow network
* [#434](https://github.com/bryntum/support/issues/434) - Cell tooltip not working reliably
* [#437](https://github.com/bryntum/support/issues/437) - removeAll on chained store clears master store
* [#439](https://github.com/bryntum/support/issues/439) - required attribute has no effect on NumberField
* [#445](https://github.com/bryntum/support/issues/445) - React: Scheduler crashes when features object passed as prop
* [#451](https://github.com/bryntum/support/issues/451) - collapseAll does not update selection bug
* [#453](https://github.com/bryntum/support/issues/453) - NaN seen in grid group summary demo bug

## 3.1.0 - 2020-03-10

### FEATURES/ENHANCEMENTS

* Added `httpVerbs` and `useRestMethods` to AjaxStore to be able to use GET, POST, PUT, DELETE verbs for Store crud
  actions ([#387](https://github.com/bryntum/support/issues/387))
* Font Awesome 5 Pro was replaced with Font Awesome 5 Free as the default icon font (MIT / SIL OFL license)
* `parentIndex` is now a public field of TreeNode ([#358](https://github.com/bryntum/support/issues/358))
* `CheckColumn` + selection model now supports a check-all checkbox in the column header

### BUG FIXES

* [#340](https://github.com/bryntum/support/issues/340) - Crash when selecting row if checkbox column is hidden
* [#341](https://github.com/bryntum/support/issues/341) - Crash when removing multiple rows fast
* [#342](https://github.com/bryntum/support/issues/342) - Crash if groupsummary is enabled without grid being grouped
* [#344](https://github.com/bryntum/support/issues/344) - Crash after Enter keydown in filter bar
* [#379](https://github.com/bryntum/support/issues/379) - STM manager doesn't undo row reordering
* [#401](https://github.com/bryntum/support/issues/401) - Filtering a large, sorted dataset, when scrolled to the end, throws an error

## 3.0.4 - 2020-02-24

### FEATURES/ENHANCEMENTS

* Added new Angular 9 example that shows how to use Angular Component as grid cell renderer ([#304](https://github.com/bryntum/support/issues/304))

### BUG FIXES

* [#293](https://github.com/bryntum/support/issues/293) - Multiselect setting not honored in check box column
* [#305](https://github.com/bryntum/support/issues/305) - 'b-text' class is not applied for widget column with button config for zero value
* [#306](https://github.com/bryntum/support/issues/306) - Wrong row selection on click after Grid loses focus
* [#327](https://github.com/bryntum/support/issues/327) - Export generates empty pages
* [#332](https://github.com/bryntum/support/issues/332) - Setting rowHeight to 0 crashes the grid
* [#348](https://github.com/bryntum/support/issues/348) - Tooltip misaligned after clicking add in tasks demo

## 3.0.3 - 2020-02-13

### FEATURES/ENHANCEMENTS

* Tab panel now supports hiding tabs ([#78](https://github.com/bryntum/support/issues/78))
* ScrollManager now has a `startScrollDelay` and waits before scrolling is started when mouse is moved close to an edge
  of an element monitored by the ScrollManager ([#252](https://github.com/bryntum/support/issues/252))

### BUG FIXES

* [#202](https://github.com/bryntum/support/issues/202) - Columns sub-menu does not scroll for many columns
* [#228](https://github.com/bryntum/support/issues/228) - iPad vertical scroll not working
* [#246](https://github.com/bryntum/support/issues/246) - Dragging splitter should cancel cell editing

## 3.0.2 - 2020-01-29

### FEATURES/ENHANCEMENTS

* PDF export server was refactored. Removed websocket support until it is implemented on a client side
  Added logging. Added configuration file (see `app.config.js`) which can be overridden by CLI options
  Multipage export performance was increased substantially (see `max-workers` config in server readme)
  ([#112](https://github.com/bryntum/support/issues/112))

## 3.0.1 - 2020-01-16

### FEATURES/ENHANCEMENTS

* Added to the documentation what editor types columns support ([#55](https://github.com/bryntum/support/issues/55))
* PDF Export feature uses "Grid" as the default file name ([#117](https://github.com/bryntum/support/issues/117))
* Store can now remove individual filters by filter id or Filter instance using `store.removeFilter` ([#462](https://github.com/bryntum/support/issues/462))

### API CHANGES

* To show async content in a tooltip, you can now either return a `Promise` from the `Tooltip#getHtml` method or you can
  now set a `Promise` yielding a string as the value the `Tooltip#html` property. See the What's new guide in the docs
  or more information
* [DEPRECATED] Setting `Tooltip#html` to false to show loading message is deprecated. Use `Tooltip#showAsyncMessage`
  instead, see the What's new guide in the docs for more information

### BUG FIXES

* [#2](https://github.com/bryntum/support/issues/2) - Not possible to enter 00:00 into time field
* [#27](https://github.com/bryntum/support/issues/27) - Crash when clicking time picker forward
* [#28](https://github.com/bryntum/support/issues/28) - Crash after changing locale in celledit demo
* [#88](https://github.com/bryntum/support/issues/88) - Crash after reordering column in grouping demo
* [#113](https://github.com/bryntum/support/issues/113) - Cannot right click demo header
* [#122](https://github.com/bryntum/support/issues/122) - Showing async tooltips is broken
* [#133](https://github.com/bryntum/support/issues/133) - Not possible to set activeTab in 'beforeshow' listener of Card layout
* [#158](https://github.com/bryntum/support/issues/158) - Pasting code into demo code editor keeps styling/formatting from IDE
* [#170](https://github.com/bryntum/support/issues/170) - Grid Ext JS demo broken online
* [#171](https://github.com/bryntum/support/issues/171) - Grid Ext JS demo broken
* [#189](https://github.com/bryntum/support/issues/189) - DOCS: Public configs should not link to private configs/classes

## 3.0.0 - 2019-12-20

### FEATURES/ENHANCEMENTS

* New Ionic Themes demo which shows using and changing included themes. (#9394)
* Grids styling for its horizontally scrolling elements was updated with `overscroll-behaviour: contain auto`. This
  prevents accidental history navigation while scrolling horizontally using trackpads/on touch devices
* Grid `Column`s may be configured with a `finalizeCellEdit` method which validates cell edits in that column
  It must return `true` or `false`. It may also be an `async` function whose resolution yields `true` or `false`
* Added support for exporting the Grid to PDF and PNG. It is showcased in the new `export` demo. The feature requires a
  special export server, which you can find in the examples/_shared/server folder. You will find more instructions
  in the README.md file in the new demo. (#6268)
* Added `leadingZeroes` config option for NumberField (#7524)
* Localization. Common localizable words and phrases may now be added to a common `Object` block of properties and will
  be accessible to all classes
* Added support for named listeners ([#43](https://github.com/bryntum/support/issues/43))

### API CHANGES

* [BREAKING] (for those who build from sources): "Common" package was renamed to "Core", so all our basic classes
  should be imported from `lib/Core/`
* [BREAKING] Model no longer considers `null` as a valid id on records. It is now handled the same way as if id was
  undefined, meaning that a generated id will be assigned instead. If you use `null` as id on a record in your code,
  this change might be breaking
  We recommend to always supply an id for records from your backend, and there is a new setting on `Store` to enforce
  that. Configuring Store with `allowNoId: false` will make it throw if a record without id is loaded (#8570)
* NumberField no longer uses native stepping with the arrow keys, instead it implements its own with configurable
  behaviour. See the new `changeOnSpin` config
* DateHelpers default date format was made configurable (assign to DateHelper.defaultFormat) and changed from
  `YYYY-MM-DDTHH:mm:ss.SSSZ` to `YYYY-MM-DDTHH:mm:ssZ` to better match client expectations

### BUG FIXES

* #9434 - Tooltips are broken on Android devices
* [#14](https://github.com/bryntum/support/issues/14) - Record id 0 breaks Store#indexOf
* [#24](https://github.com/bryntum/support/issues/24) - Inconsistent record 'changes' object after update
* #9212 - Adding FilePicker as widget for column
* [#102](https://github.com/bryntum/support/issues/102) - Tree column not indented in exported Excel file

## 2.3.0 - 2019-11-05

### FEATURES/ENHANCEMENTS

* Widget's tooltip configuration now uses a shared singleton Tooltip instance by default. Use `newInstance: true` if a
  new Tooltip instance is required for the widget (#7033)
* Added a basic Splitter widget that allows resizing sibling elements/widgets in a flexbox layout (#9138)
* Combobox is now able to filter its store using remote filter requests as the user types. See
  the `filterParamName` config. (#9256)
* DatePicker panel now has month and year selection combos which appear on hover (#9259)
* TextField class now supports adding minlength, maxlength, tabindex attributes, as well as any other HTML attribute
  through the new 'inputAttributes' config (#9296)
* Widgets may now adopt a preexisting DOM node to use as their encapsulating `element`. This reduces DOM footprint when
  widgets are being placed inside existing applications, or when used inside UI frameworks which provide a DOM node. See
  the `adopt` config option (#9414)
* `Container`s now support removal and adding and inserting of child widgets. See the API docs for `Container`
* `Container`s can now get/set values from/to all nested widgets using the new `values` property. Also added
  `Container#isValid` to check validity of all nested fields
* Adding event listeners now accepts an `expires` option which is for how many milliseconds the event listener persists
  before it is removed. This is useful for capturing potential future events which may or may not happen
* A new thinner version of Grid called `GridBase` was added. It is a Grid without default features, allowing smaller
  custom builds using for example WebPack. See the new `custom-build` demo for a possible setup (#7883)
* The Group features `groupRenderer` is now applied to all columns in a group header, allowing more control over the
  rendering (#8751)
* Column filtering using the FilterBar feature can now be done using any field through the new `filterable.filterField`
  config (#8799)
* Added new 'Paged Grid demo with php backend' that shows how to use a paged store for Grid with remote sorting and
  filtering (#9213)
* A new Column type: 'aggregate' has been added. When used in a Tree, it aggregates the value of that column's field
  from child nodes. (#9227)
* The CellEdit feature now allows a `beforeCellEditStart` to inject an input field into the
  `editor` property of the passed `editorContext` to use the specified input field to edit the cell (#9281)
* Grids checkbox selection now offers a mode `rowCheckboxSelection` where selection is only done when clicking on
  a checkbox (#9313)
* Support for disabling features at runtime has been improved, all features except Tree can now be disabled at any time
  (#8187, #9353)

### DATA LAYER CHANGES
* Added support for paged stores, remote sorting and remote filtering (#4504)
* Stores can now be configured with `syncDataOnLoad: true`, which will make them apply the difference between a new
  dataset and its existing data rather than doing a full replace. Especially useful in scenarios where `store.data` is
  bound to something that applies the entire dataset on changes, for example a React state
* Fields can be added/removed from a Model at runtime, using the new `Model.addField()` and `Model.removeField()`
  functions (#9328)
* `ColumnStore` can be configured with `autoAddField : true` to automatically add the fields used by its columns to
  Grids store
* Added new Angular 7 and Angular 8 integration examples (#9069)
* Experimental: The React wrapper has been updated to support using React components (JSX) in cell renderers and as cell
  editors. Please check out the updated React demos to see how it works, and read up on it in the updated integration
  guide (#7334, #9043, #9244)

### API CHANGES

* The behaviour of `Store#add()` in a tree store has been changed to take the `parentId` of the records being added into
  consideration. Previously all nodes added this way was appended to root, but they can now be added to any parent in
  the tree. For example `store.add({ name : 'New kid', parentId : 5 })` will add the new node to parent with id 5. To
  actually add to root, use `parentId : null` (or even better, use the TreeNode api)
* `Model.convertEmptyParentToLeaf` was changed to accept either a boolean or a config object, for control over if
  conversion happens on load or on CRUD or both (#8973)
* ResizeHelper can be configured with `dynamicHandleSize : true` to automatically shrink virtual handles from their
  configured size towards 1 to enable resizing elements that do no fit full handles
* The validation behaviour for `required` fields was slightly changed to not flag initially empty fields as invalid,
  they are instead flagged on blur or when checking validity
* [DEPRECATED] `InstancePlugin#pluggedInto` was deprecated in favour of already existing `InstancePlugin#client`
* The `Grid#selectRow()` method now accepts a single, object parameter to describe the required´selection type and
  associated actions to avoid long, unwieldy method signatures. The previous signature will be recognized until version
  3.0

### BUG FIXES

* #8280 - Chained Tree store API inconsistency
* #8846 - Exception from onStoreUpdateRecord with fullRowRefresh: false
* #8911 - AjaxStore syncing modifications returns field names in the JSON object
* #9018 - Hovering splitter should add hover styling to parallel splitters
* #9176 - Filterbar and group feature duplicate records
* #9235 - Summary feature should be disableable
* #9257 - Uncaught TypeError: Converting circular structure to JSON when comparing two records as fields
* #9271 - Tooltip listeners config not honored
* #9277 - Filter icon missing if sort is disabled
* #9332 - Readonly status reset after schedule click
* #9334 - Grid doesn't clear b-cell-dirty on grid.store.commit()
* #9352 - DateHelper wrong quarter calculation
* #9354 - Column header disappears on reordering
* #9356 - Combo should not mutate incoming value array
* #9357 - Splitter collapse/expand buttons misplaced
* #9371 - isMove in `add` event is not a boolean but always an object. Documentation corrected
* #9375 - Rendering broken with a cluster of really high rows and scrolling to bottom
* #9404 - insertChild should trigger beforeAdd with records as array
* #9412 - Exception when the sole record in a grid is removed in a cancelCellEdit listener
* #9428 - Store#filter, contrary to the documented API, clears filters when passed a function

## 2.2.5 - 2019-09-13

### FEATURES/ENHANCEMENTS

* New date format introduced called `d1`. It represents the first character of the day name, for example "W" from
  "Wednesday" (#9201)

### BUG FIXES

* #9191 - Reloading store when different combination of groups expanded breaks grouping
* #9194 - DateHelper cannot parse date strings without separator
* #9200 - Crash if calling removeAll and there is no data initially
* #9208 - Scroller missing docs for Events / Delayable
* #9216 - DOCS: Nested configs look broken

## 2.2.4 - 2019-09-09

### FEATURES/ENHANCEMENTS

* New demo showing a stock list with rapid data updates every 20ms (#9171)
* Store has a new config `useRawData`. By specifying it as `true` you guarantee the data loaded is valid as is, which
  bypasses duplicate id detection, default values and field processing. This in turn gives a nice performance boost when
  loading large datasets (about 30% faster initial rendering time on the bigdataset demo with 10,000 records)
* Pressing space key in a grid column header now show the column menu (#8855)
* Added `contextMenuTriggerEvent` config for Grid to set event which triggers context menus and `triggerEvent` config
  for ContextMenu to override Grids setting for which triggers context menu (#8757)

### BUG FIXES

* #8669 - Mask loses alignment to Grid body element after scrolling
* #8797 - Records are not shown in the tree after clearing filters if they were added while the tree was filtered
* #8890 - DOCS: Store#indexOf returns -1
* #8891 - Combo should fire select event only per user action. The select event now has a `userAction` flag which
  is passed as `true` or `false`
* #9137 - Previous scheduled event animation exit not canceled by initiating new animated event update
* #9155 - SubGrid region size changes after column resizing
* #9158 - Crash when reloading store if a group is collapsed
* #9178 - Checkbox column is broken after a group is collapsed/expanded

## 2.2.3 - 2019-08-27

### FEATURES/ENHANCEMENTS

* Date formats can now include arbitrary text wrapped in {}, for example `"h {o'clock}"` -> `"10 o'clock"`
  (#8612)
* Combos `store` config now accepts a store config object (#8769)
* Grids `columns` config now accepts a store config object (#8862)
* Fields `readOnly` handling and styling was improved
* Model `fields` field definitions can now specify that a field is `readOnly: true`

### API CHANGES

* Widgets `visible` setter was deprecated, use `hidden` instead. To determine if a widget actually is visible, you can
  use `isVisible` (#8820)
* `store.isVisible` was deprecated, use `store.isAvailable` instead

### BUG FIXES

* #7736 - Text of selected item gets into the input in Combo with multiselect
* #7737 - Select input text and hit backspace removes selected items in Combo with multiselect
* #7739 - There is no place to type in Combo with multiselect
* #8351 - STYLING: Missing pressed / active state color
* #8439 - STYLING: Stockholm theme tab body html color
* #8444 - Panel#widgetMap should include tools
* #8521 - If one menu item has an icon all other menu items should align properly
* #8692 - View is not refreshed when record with existed Id is added
* #8734 - Online code editor duplicates panels on change
* #8812 - RowReorder feature should support indicating drop validity
* #8813 - Row reorder feature should highlight target parent node when reordering in a tree
* #8886 - beforesort event is not fired
* #8914 - Grid#collapseAll when scrolled to the bottom of the dataset breaks row rendering
* #9026 - RowReorder feature events should be public
* #9031 - "No rows to display" text overflows locked grid
* #9060 - STYLING: Wrong slider label color in Material theme
* #9063 - Code editor panel not scrollable with mouse
* #9106 - Moving a record within a tree store causes its descendant records to be registered as added
* #9116 - DOCS: 'scrollable' property missing in Widget docs

## 2.2.2 - 2019-08-15

### FEATURES/ENHANCEMENTS

* Added two new classes which wrap file input: FileField and FilePicker. FileField is a default field without extra
  styling. FilePicker is more advanced component which looks like a common button

### API CHANGES

* Adding a child record to a parent in a tree store now triggers the same events (`beforeAdd`, `add`, `change`) no
  matter which function is used (`store.add()`, `node.appendChild()`, `node.insertChild()`)
* [BREAKING] Stores `beforeRemoveChild` event was removed. Removing child records in a tree store now triggers same
  events as when removing records in a flat store (`beforeRemove`, `remove`, `change`)

### BUG FIXES

* #8336 - Switching locale repaints view multiple times
* #8794 - relations not initialized if the foreign id field uses a complex mapping as its dataSource
* #8896 - ScrollManager not working with touch devices
* #8912 - DateHelper.formatDelta doesn't round to hours
* #8940 - Scrollable.scrollIntoView with block : 'center' and highlight fails if the target is a Rectangle and
  cannot reach the center
* #8945 - STYLING: Checkbox hover issue in Material theme
* #8963 - ES6 syntax in the eval block
* #8968 - Grid. Changed record Id it is not updated in DomDataStore
* #8970 - Vertical mode: Dragging elements vertically does not work reliably
* #8974 - Id should be unique in Tree store
* #8983 - childrenField does not work unless the store is configured with tree:true
* #9025 - isParent doesn't take convertEmptyParentToLeaf into account
* #9029 - React app in trial distribution should not throw when styles are missing
* #9037 - Document chained stores as the official way of sharing stores between widgets
* #9040 - Custom Toast styling
* #9044 - Make tree crud events consistent

## 2.2.1 - 2019-07-24

### BUG FIXES

* #8836 - Destroying a popup from a child button fails with an exception
* #8883 - averageRowHeight not recalculated when a row set is rerendered
* #8895 - Scheduler events disappearing on scroll
* #8938 - Ionic demo not runnable online

## 2.2.0 - 2019-07-19

### FEATURES / ENHANCEMENTS

* AjaxStore now supports a 'writeAllFields' config to send all fields when a modified record is committed (#8909)
* ButtonGroup now supports configuring `toggleGroup` and `color` on a per group basis (#8833)
* Popup now has a `modal` config (#8297)
* DateField now supports configuring its `picker` (#8828)

### API CHANGES

* Toggling a button in a `toggleGroup` now triggers `toggle` on all buttons in that group (#8834)
* Docs changed to clarify that removing a child node from a tree triggers `beforeChildRemove` and not `beforeRemove`
  (#8571)

### BUG FIXES

* #7872 - Row reordering needs a handle or gesture on touch

## 2.1.3 - 2019-07-04

### FEATURES / ENHANCEMENTS

* Nodes rendered in a TreeColumn now support two new attributes `href` and `target` to easily render links
* Common.widget.DatePicker was made public

### BUG FIXES

* #8804 - Error / warnings in console of web components demo
* #8825 - Initial sorters applied too late in tree stores
* #8865 - Column headers duplicated when reordering

## 2.1.2 - 2019-06-27

### FEATURES / ENHANCEMENTS

* Added a `pressedIcon` config to Button, to easily display another icon for pressed toggle buttons (#8781)

### BUG FIXES

* #8482 - Using beginBatch/endBatch prevents related stores being updated
* #8562 - Datefield fails to parse input date when 'L' format is used in De, Nl and Ru locales
* #8699 - scrollEnd event is not fired properly on scrollable
* #8706 - Orphaned resize handles seen after mouse out of an event bar
* #8707 - Resizing column expands collapsed section

## 2.1.1 - 2019-06-14

### BUG FIXES

* #8674 - Crash if disabling ColumnReorder on touch device
* #8676 - Filter feature performs double filtering
* #8486 - Crash when trying to revert focus to a Grid cell that no longer exists

## 2.1.0 - 2019-06-12

### FEATURES / ENHANCEMENTS

* Added a new ButtonGroup container (#8013)
* Bumped built in FontAwesome to version 5.8.2
* Slider styling adjusted for Stockholm theme
* Tree parent cells styling changed to use bolder font
* Demos now have a built in code editor that allows you to edit their code (Chrome only) and CSS (#7210)
* `throttled` option added to `EventHelper.on`. For rapidly repeating events (Such as `wheel` or `scroll` or
  `mousemove`), this is the number of milliseconds to delay subsequent handler calls after first invocation which
  happens immediately
* `DateField` now has a `step` config which is a time delta by which to increment and decrement the value when forward
  and back triggers in the field UI are clicked (#8081)
* Grid cellEdit action is now preventable using `beforeCellEditStart` event (#8459)
* `Button` now has a `menu` config which specifies a menu to show when pressed. This may be an array of menu item
  configs, or a widget config. If a widget config, the `type` defaults to `menu`, but it could be any type, eg `'popup'`
(#8020)

### API CHANGES

* [DEPRECATED] The `widgets` config to specify child components of a `Container` has been deprecated in favour
  of `items`. The processing of `widgets` will be removed in a future version (#8375)
* [DEPRECATED] The 'grid' param in the events triggered by the CellEdit feature has been removed in favor of `source`
  param which points to the Grid instance
* TreeColumn now htmlEncodes its contents by default, just like regular Columns
* Model batch behaviour has been changed to no longer apply changes until `endBatch()` is called. Ending the batch will
  trigger the same `beforeUpdate` and `update` events as normal field changes does
* Returning `false` from the `beforeUpdate` listener or calling the new Model's `cancelBatch()` function will cancel the
  data update, rejecting the changes
* Widget querying now matches registered type, whereas previously it matched lowercase class name (#8464)

### BUG FIXES

* #5725 - White space lost when using Search feature
* #7552 - Editing is cancelled on click in uneditable cell, should be applied instead
* #7579 - Fire beforeUpdate event when batch updating
* #7892 - Inserting/appending child nodes using empty array returns undefined
* #8244 - Edge: View scrolls when typing up/down arrows in percent done field
* #8246 - Safari highlights disabled button on click
* #8373 - When copying tree branch child ids are not cleared which leads to id collisions
* #8469 - Dragging columns in a grid which is a picker of a cell editor cancels editing
* #8489 - QuickFind not compatible with columns using renderer + htmlEncode set to false
* #8497 - Crash when pressing space after deleting row
* #8500 - STYLING: Wrong color of empty text in dark theme
* #8501 - Tree column + quick find not compatible
* #8528 - Crash when trying to scroll event into that is inside a collapsed parent
* #8546 - scrollEventIntoView/scrollResourceEventIntoView should focus event element
* #8552 - Tooltip is not shown if to remove pointer before hoverDelay is over
* #8559 - STYLING: Datepicker back/forward icons are not visible in Material theme
* #8563 - DateField should hide its picker on Enter key press
* #8582 - Button Tooltip shown even if no tipText is defined
* #8592 - Column order is reset when a new column drag happens
* #8593 - Column header size is wrong after state restoring #8613 - Context menu is broken on Android
  devices and in emulation mode
* #8622 - STYLING: ButtonGroup has wrong border style for pressed button
* #8633 - Checkbox column keeps focus style on checked grid cell
* #8666 - Filtering a tree store should not include the root node
* #8675 - Filter feature should reset before searching

## 2.0.3 - 2019-05-23

### FEATURES / ENHANCEMENTS

* SubGrids can now be configured with 'maxWidth' and 'minWidth' which are respected by the regionResize feature

### API CHANGES

* The action for the `refresh` event triggered by Store `endBatch()` was changed to `'batch'` to allow listeners to
  determine the cause of the refresh

### BUG FIXES

* #8367 - event.userAction should be true for changes made by user
* #8376 - Reordering rows in tree removes new record from changeset
* #8382 - Setting maxWidth on locked subGrid config breaks region resizing
* #8389 - Badge is using wrong font
* #8399 - Grouped grid broken after adding + scrolling
* #8409 - 'normal' subGrid loses default config if configuring only locked subGrid
* #8412 - Setting store.modelClass.idField has no effect
* #8419 - Store 'beforeload' listener not working for 'autoLoad' case
* #8437 - STYLING: TextField and subclasses have wrong cursor

## 2.0.2 - 2019-05-10

### FEATURES / ENHANCEMENTS

* ResizeHelper now aborts resize operations if Escape key is pressed (#7496)

### BUG FIXES

* #7818 - Material checkbox invisible when unchecked
* #7953 - Grid's response to store changes should tolerate the grid not being layed out
* #8317 - Column lines out of sync when zooming out
* #8324 - Wrong URL hash separator in Doc's search
* #8327 - Empty columns does not respect header width when autosizing
* #8335 - Tooltip with trackMouse misaligns when constrained on scrolled page
* #8338 - Folders should be rendered first in the docs tree
* #8358 - Column menu needs to be scrollable in case it contains more items than fit on screen
* #8368 - Crash in tree when pressing shift-right with no row selected

## 2.0.1 - 2019-05-03

### FEATURES / ENHANCEMENTS

* Docs now display an icon on entries that are expandable (#7212)
* `fetchOptions` config added to AjaxStore to get complete control over the fetch API options used by AjaxStore
  (#7895)

### API CHANGES

* To avoid reserving a commonly used field name, `TreeNode#level` was renamed to `childLevel`. It was also made public
  to avoid future collisions (#7972)

### BUG FIXES

* #7858 - Can't iterate over columns of a subGrid
* #7903 - Rendering fails when using 'em' column width
* #7919 - Row reordering should be enabled only in leftmost section
* #7941 - resizeToFitContent prevents last column in grouped header to fill its parent column
* #8003 - Delayable::requestAnimationFrame() doesn't work as documented
* #8016 - Crash when dragging row over active cell editor
* #8085 - Crash when clicking empty tree area with 'expandOnCellClick'
* #8086 - Crash when destroying a scheduler that had a context menu open
* #8087 - Crash in TimeField docs
* #8090 - Crash in multi-region demo if a region is empty
* #8091 - Columns / cell widths out of sync after moving column to new region
* #8102 - Rows disappear when sorting with collapsed grouped rows
* #8151 - vue_cli does not compile with scheduler.material.css
* #8164 - Calling Combo#clear when it has no value should be a no-op
* #8177 - Button badge should not be shown for empty string
* #8186 - Disable row reorder on touch devices
* #8192 - Destroying Panel doesn't destroy its tbar / bbar
* #8196 - DOCS: Bad look of search tag if typing then clicking outside search field
* #8220 - DragHelper doesn't take page scroll into account if cloneTarget is true
* #8221 - Drag proxy misplaced if page is scrolled
* #8222 - Calling appendChild on a leaf should convert to parent, add child and refresh UI
* #8238 - Store::includes() always return true if Store is a tree and model instance has been passed
* #8274 - Grid's filter menu needs a scrollAction setting
* #8290 - Exception is thrown when providing empty items array to combo field
* #8294 - Combo's isValid should check required and selection count

## 2.0.0 - 2019-03-27

### FEATURES / ENHANCEMENTS

* New demo using Ionic added (#7450)
* New demo showing cascading combos
* Included a new default theme called "stockholm"
* Removed flatpickr as our time picker for `TimeField` and replaced with our own implementation (#7396)
* Added TimeField horizontal spin triggers (#7326)
* `Checkbox` now has preventable `beforeChange` event (#7631);
* `CheckColumn` now has preventable `beforeToggle` event (#7632);
* Grid now supports multiple regions for columns, as opposed to only two previously (locked and normal). Check out the
  new multi-regions demo to see how it works (#7642)
* Cell editor now looks for a field setter when completing edit (#7754)
* Added support for custom filtering functions on columns (see `filterable`). Used by Filter and´FilterBar features
  (#7580)
* Combo will mark itself as invalid while an unmatched filter string is being typed when configured
  `validateFilter : true` (#7785)
* New Row reordering feature + demo added, disabled by default (#7490)
* Added API support for repainting a single column
* AjaxStore now offers a `headers` config to pass headers to the underlying server request

### API CHANGES

* Made the `grid.columns` property public and added docs. It is a readonly property to get the ColumnStore of the Grid
* When a store is maintaining a tree structure, it now has a `rootNode` property which is an invisible node which is at
  the root of the tree. All additions and removals to the dataset must be through the TreeNode API, *not* Store's
  add/remove API. So use a record's `appendChild`/`insertChild` and `removeChild` methods
* [BREAKING] When, in a tree Store, a parent node is expanded, the Store will fire its `add` event to signal
  the child nodes being inserted into the store's collection. When a parent node is collapsed, the Store will fire its
  `remove` event to signal that child nodes are being removed from the store's collection. If you listen for `add` or
  `remove` events, or the `change` event's `action : 'add'` or `action : 'remove'` to signify records being added to or
  removed from a dataset, the differentiator will be that there will be an `isExpand : true` or an `isCollapse : true`
  property on the event when it is due to node expand or collapse
* `CheckColumn` now fires `toggle` event after new data is set to the record
* The functions to show and hide load masks for Grid were made public and added to the documentation. Call
  `grid.maskBody('msg')` to show a load mask and `grid.unmaskBody()` to hide it
* Configuring a tooltip with `hideDelay : 0` will now hide it immediately, as opposed to earlier with a timeout of 0
  This in turn makes tooltip respect `hoverDelay` when moving mouse within the same `fromElement`, useful when
  populating cell tooltips async (#7730)
* In addition to specifying row height through data (see `GridRowModel`) we also made the `size` parameter of
  `Column#renderer()` public. Set `size.height` in a renderer to specify the desired row height. The largest collected
  height for that row will be used. Uses Grids configured `rowHeight` as the min value
* [BREAKING] TimeField's and DateField's `pickerFormat` config was removed in favour of using `format` also for the
  picker
* [BREAKING] Grid now renders it contents on `paint` instead of on `render`, to allow it to initialize correct when
  embedded in tab panels and similar. Because of this change, the `render` event was removed
* [BREAKING] `idField` config was removed from `Store`, it was not used in the codebase and did not work as intended
  The config is still available and working on `Model`, set it on your subclass (`MyModelClass.idField = 'MyId'`). If
  you really want to remap id to another field in your data without subclassing `Model` you can still do it using the
  `fields` config on `Store`: `new Store({ fields : [{ name : 'id', dataSource : 'MyId' }] });`
* [BREAKING] The `AjaxStore#exception` event no longer includes the `request` object. Instead it includes a reference to
  the fetch Response object through the `response` property
* [BREAKING] The `AjaxStore#loadChildren` event no longer includes the `request` object. Instead it includes a reference
  to the fetch Response object through the `response` property
* [BREAKING] The `response` property of the  `AjaxStore#loadChildren` event was renamed to `json`, and `response` refers
  to the fetch Response object
* [BREAKING] The `AjaxStore#afterRequest` event no longer includes the `request` object. Instead it includes a reference
  to the fetch Response object through the `response` property
* [BREAKING] The `response` property of the `AjaxStore#afterRequest` event was renamed to `json`, and `response` refers
  to the fetch Response object
* [BREAKING] The `response` property of the  `AjaxStore#load` event was renamed to `json`, and `response` refers to the
  fetch Response object
* [BREAKING] The `response` property of the  `AjaxStore#exception` event was renamed to `json`, and `response` refers to
  the fetch Response object
* [BREAKING] The AjaxStore now sends POST data as raw JSON (based on the Fetch API). To keep using the 1.x behavior
  which posts form data, set `AjaxStore#sendAsFormData` to true on your stores

### BUG FIXES

* #6685 - AjaxStore + AjaxHelper should offer way to pass headers + params
* #7356 - Group headers should not be included in selection
* #7513 - ScrollManager should support scrolling in just one direction
* #7545 - STYLING: links have bad color in grid cells in dark theme
* #7588 - Panel last focus trap in wrong place. Cannot TAB into bbar
* #7602 - NumberField spinners not disabled with field
* #7643 - Date field cannot handle some valid date formats
* #7660 - QuickFind not working in IE11
* #7672 - Error when adding filter to scrolled grid
* #7680 - Input fields need to disable autocomplete
* #7718 - Combo does not trigger input
* #7726 - DOCS: Complete list of defaults
* #7728 - Double clicking to fit empty column makes it 0 width
* #7729 - Also measure column header width when autosizing columns
* #7735 - defaultValues should respect mapping
* #7817 - Investigate performance when dragging events
* #7822 - DOM not repainted properly when moving a record in the store
* #7823 - Replace toFixed polyfill with ObjectHelper.toFixed
* #7829 - Relaying events should return the relayed return value
* #7856 - Region splitter not working if subGrids use flex

## 1.2.4 - 2019-02-19

### FEATURES / ENHANCEMENTS

* Updated `readme.md` to better describe the projects folder structure and different included bundles

### BUG FIXES

* #7628 - Columns do not support "listeners" config
* #7644 - Row record cls should allow passing space separated classes

## 1.2.3 - 2019-02-14

### BUG FIXES

* #7530 - STYLING: Links have wrong color in Material popups
* #7549 - toFixed override breaks native behavior
* #7589 - Id for filterBy functions should work
* #7591 - commit event is not fired on the local ajax store
* #7608 - react_build demo is broken

## 1.2.2 - 2019-01-28

### BUG FIXES

* #7546 - webcomponent element never passes visibility check

## 1.2.1 - 2019-01-17

### BUG FIXES

* #5869 - `htmlEncode : true` on a TreeColumn should escape only the value, not the entire internal tree markup
* #7354 - Angular demo doesn't work in IE11
* #7369 - Locked grid broken after dragging column from right to left section
* #7370 - [EDGE] Investigate Angular + trial bundle
* #7387 - isModified is true after setting original start date
* #7402 - Bundle aliases for angular demos not updated
* #7403 - TimeFields clock icon not updating live
* #7409 - React Typescript demo doesn't work in IE11
* #7422 - Cannot read property 'atob' of undefined
* #7433 - cellEdit#startEditing should automatically scroll row into view
* #7446 - Crash when clicking document and picker is auto-destroyed
* #7447 - Crash when scrolling causing widget realign
* #7452 - Trial demos do not work in Edge
* #7474 - Can scroll to beneath rows
* #7486 - Selecting multiple rows in GridTree not working correctly
* #7491 - Tooltip tries to realign itself even when mouse is not over Tooltip's element
* #7503 - Drag drop breaks if event start is aligned with viewport left edge
* #7516 - Typings generation misses `implements` if no `extends`
* #7629 - Angular demo won't build from release package

## 1.2.0 - 2018-12-19

### FEATURES / ENHANCEMENTS

* Full TypeScript typings included as `build/grid.d.ts`. Typings define
  module `bryntum-grid` to avoid possible name collisions, so we had to
  also rename import in the angular demo
* Added React + TypeScript demo (#7283)
* StateTrackingManager now offers undoAll/redoAll methods (#7208)
* Store now fires a `beforeRemove` event prior to removing records in both the `remove` and `removeAll` methods
* Built in version of FontAwesome was bumped to 5.5.0
* CellEdit feature now automatically starts editing when typing if configured with `startEditOnCharacterPress`
  (#7294)
* Added a new guide on how to listen for events (#7196)
* Docs updated to state that locales should be included before the umd bundle to have effect (#7205)
* Added a custom column to the `columntypes` demo
* Added a custom widget used as an editor to the `celledit` demo
* Sorting has a new config `useLocaleCompare` that makes it use `localeCompare` for comparisons, which makes it sort in
  a locale specific order (#7113)
* Store now throws an exception if trying to set data with duplicate ids (#7272)
* The context menu for headers and cells now accepts a `processCellItems`/`procesHeaderItems` function that allows
  processing of the items before the menu is shown

### API CHANGES

* #7004 - Add preventable beforeAdd, beforeRemove events to Store

### BUG FIXES

* #7373 - [IE11] Grid scrolls when pressing up/down arrow keys instead of navigating to the next/previous row
* #7216 - Improve state handling
* #7215 - Moving node to new parent does not update tree correctly
* #7244 - [IE11] Fullscreen button works incorrectly
* #7246 - Salesforce demo doesn't work
* #7253 - Model constructor from object doesn't work with mapped fields
* #7257 - Strange date formatting with bundle
* #7261 - Eventdragdrop doesn't work in trial umd bundle
* #7275 - Last column in locked side of grid allows its resize handle to overflow
* #7311 - Angular demo does not work in Edge
* #7317 - Formatting date with 'hh A' format yields "00 PM" at noon
* #7325 - Angular production buid doesn't work with trial sources
* #7340 - DOCS: Config options not grouped correctly
* #7346 - react_build demo is missing .babelrc config
* #7357 - Summary bar doesn't take grouped headers into account
* #7360 - 'undefined' seen in load mask after store loading fails
* #7364 - Adding a record with children to an empty tree does not render correctly
* #7380 - STYLING: Region splitter bg-color is too close to stripe row color in material theme

## 1.1.2 - 2018-11-23

### BUG FIXES

* #7141 - Ripple ripples twice on tap on touch devices
* #7142 - The final resize handle causes extra scrollWidth in grid headers
* #7175 - Drag drop with dropTarget specified not working on touch devices
* #7184 - Empty grid should be scrollable horizontally
* #7190 - STYLING: Grid column header doesn't read 'align' value in Material theme
* #7193 - Right click on non-hideable column to hide some other column throws JS error
* #7195 - Production build broken in angular demo
* #7206 - Grouped headers with all flex columns
* #7207 - resizeToFitContent should populate all renderer params
* #7227 - Wrong count in group row when using groupSummary feature

## 1.1.1 - 2018-11-15

### API CHANGES

* `Column#resizeToMatchWidestString()` was renamed to `Column#resizeToFitContent()` and made public. Call it on a
  column to resize it to fit its contents

### BUG FIXES

* #7030 - Group by field without column
* #7127 - Adding records to blank grid does not update scrollbars
* #7136 - Duration field should spin on up/down keys
* #7156 - Tooltips which are `trackMouse: true` should continue to track and avoid contact with the mouse during
  their hide timeout
* #7163 - Striped rows missing in dragfromgrid demo

## 1.1.0 - 2018-11-09

### FEATURES / ENHANCEMENTS

* Angular demo bumped to Angular 7
* Built in FontAwesome version bumped to 5.4.1, scope changed from .fa -> .b-fa to not affect icons outside of our
  widgets
* New Export to Excel demo (#6961)

### API CHANGES

* The `WidgetContainer` mixin has been removed. The `Container` subclass is the base for
  all Widgets which need to contain other Widgets
* The `Container` class now has a `layoutStyle` config which is an object-based config which
  may be used to apply CSS style properties to the `contentElement` of the `Container`
  By default, Containers use flexbox layout, so this may be eg `{flexDirection : 'column'}`
* There is a new `Panel` class which extends `Container` and offers the ability to dock
  headers (which may contain title and clickable tools) to any border. The `Panel` subclass
  is now the immediate superclass of `Popup`
* `Popup` now has a `closable` config which causes the display of a close icon, which, when clicked, invokes the close
  method (See the `closeAction` config)
* Form fields may contain multiple clickable "triggers" be configuring them with a
  `triggers` config. This is an object-based configuration which specifies each trigger
  with a CSS class for applying icon styling and a handler for executing the click action
* There is a new `TextAreaField` input field which may be used to edit multi-line data
  By default, it works in single line mode displaying the text in a read-only `input` element
  and editing the text in a dropdown upon click if an expand trigger. Configuring the field
  `inline: false` renders the field as a `textarea` element
* Grid's `selectionMode` config may now contain `checkbox : true` to indicate that a row's selected status is indicated
  by a checkbox
* The `CellEdit` plugin now has a `addNewAtEnd` config which indicates that when tabbing off the last column in the last
  row, a new row should automatically be inserted, and editing should continue in the first editable cell of the new
  row
* The `Combo` now accepts `multiSelect: true` to allow selection of multiple values from
  the dropdown. Selected values are shown in the form of "Chips" (formerly known as "Tags") in
  an inline display to the left of the input area. These Chips may be deleted either by
  tapping the close icon in them, or selecting them using keyboard action and deleting them
  using the delete key
* Date parsing and formatting previously used Moment.js internally, but in this version it has been replaced with custom
  code for performance reasons. Tokens used for formatting and parsing are similar to those used in Moment.js, in most
  cases you should not need to adjust your code at all
* `Collection`'s `includes` method now accepts a `string` or `number` to check for presence
  of the given value as an `id`
* `Combo` now accepts `items` as an object where property names are the field values, and
  the property values are the displayed text values
* The `Container` class now has a `layout` config which may describe a helper class to be used
  to render child items, and apply certain CSS classes to specify layout. The only ones implemented
  as of 1.1 are `'card'` which implements slide-in displaying of multiple child widgets,
  and `'fit'` which fits a single child widget into the `contentElement`
* The `TabPanel` class now fires a `tabchange` event when the active tab is changed
* When defining a `Model` subclass, it is no longer necessary to include the superclass's
  `fields` in any declared `fields` getter. The new class will automatically inherit the fields
  of its inheritance chain upon first instantiation. The same goes for specifying a `Model` subclass's `defaults`
* An Editor class has been introduced which is a `positioned` Container which encapsulates
  an input field for performing inline edits
* The `positioned: true` config indicates that a widget may be rendered into another
  widget's `contentEl`, but it does not participate in the layout. Rather it is absolutely
  positioned. Developers may use the `X` and `Y` configs directly, or the `showBy`
  and `alignTo` APIs
* `remove` method on a `Store` had third parameter `fromClear` documented
  It was removed fom documentation
* Grid now has a `showDirty` config which, when configured as `true`, displays a
  triangular "dirty" flag in the corner of a cell which contains a uncommitted change

### BUG FIXES

* #5848 - Confusing when using keyboard up/down in grid and cursor is over
* #5850 - Tree row flashes when selecting a parent node, which toggles collapse
* #6098 - `Scroller` has a new `addPartner` method which pairs scrollers together so that they
  keep their scroll position synced in the passed axes
* #6199 - DOCS: Empty groups should not be visible in docs after filtering
* #6227 - No way to clear grouping if grouped column is hidden
* #6627 - Tree node methods, insertChild, removeChild, appendChild do not work
* #6686 - Dark Theme: sorted header has black text
* #6710 - Crash when dragging column on touch device
* #6727 - Recent theming change regressions
* #6731 - Our CSS rules should be all scoped to apply inside .b-widget
* #6777 - Tooltip max-width conflict of interest
* #6796 - The esmodule examples do not render correctly in IE11
* #6888 - Combo picker misaligns when resizing window
* #6903 - Crash in demo browser when opening `https://bryntum.com/products/grid/examples/index.umd.html`
* #6904 - `https://bryntum.com/products/grid/examples/theme/` gives 404 for FontAwesome
* #6907 - TextField without label gets blank `id` attribute
* #6909 - Double tap creates event on wrong place on touch device
* #6971 - DOCS: Docs tree content can overflow its grid
* #6989 - Event resize throws exceptions when dependency store is empty and dependencies feature is enabled
* #6998 - STYLING: Too noticable border for unchecked checkbox
* #7002 - Checkbox column check change should update full row
* #7061 - Tooltip dismissDelay does not work
* #7051 - New tooltip config `hideOnDelegateChange` to hide tip between subtargets of forElement
* #7075 - Cell editing focus loss should commit value, not reject
* #7097 - Adding columns not working as expected

## 1.0.4 - 2018-10-08

### BUG FIXES

* #6518 - If selected record is removed, it should be deselected
* #6768 - "No rows to display" shown for scheduler with auto loading store
* #6772 - Menu should have proper padding
* #6861 - Online webcomponents demo doesn't load polyfill for firefox
* #6876 - Floating widget should support being 'draggable'
* #6486 - Alignment with axisLock should fall back further then the opposite edge'

## 1.0.3 - 2018-10-01

### FEATURES / ENHANCEMENTS

* Added demos for Angular 1, 2, 4, 5 and 6

### BUG FIXES

* #6781 - Add polyfills to WebComponents demo to make it work across all browsers
* #6805 - contextmenu click on a grid row that is sliding due to record removal should not invoke the ContextMenu
* #6826 - Cache buster needed for docs app.js

## 1.0.2 - 2018-09-24

### FEATURES / ENHANCEMENTS

* #6041 - Improve transaction demo

### BUG FIXES

* #6779 - Link to react_build demo gives 404
* #6794 - Examples online do not work in edge
* #6797 - Widgets have no link to the parent if they configured as instances
* #6799 - Widget's anchor config must be able to update widget state dynamically
* #6808 - Locales broken in react demo

## 1.0.1 - 2018-09-20

### FEATURES / ENHANCEMENTS

* Web Components demo has been added to the trial build (#6761)

### BUG FIXES

* #6700 - Links to examples in docs not working online
* #6717 - 404s seen in docs
* #6734 - Crash in column drag drop toolbar
* #6762 - Grid docs throws error on opening customization/styling page
* #6740 - EventResize tip misaligned when Scheduler is rendered in a scrolled document
* #6756 - Error thrown if TimeRanges feature configured with timeRanges data block and Scheduler uses CrudManager
* #6752 - Group header should include child count
* #6736 - Longpress->contextmenu not working in some places in iOS

## 1.0.0 - 2018-09-13

* We're happy to announce the first v1.0.0 release of our new Grid component. The Grid is a modern and high performance
  data table component. Built from the ground up with pure JavaScript, supporting any framework you are already using
  (incl. React, Angular and Vue). Please see our website and documentation for a full presentation

### FEATURES / ENHANCEMENTS

* `grid.modules.js` bundle and related demos are now included in trial

### BUG FIXES

* #6366 - Minor trial watermark adjustment
* #6481 - Transaction demo updated to match name changes
* #6484 - Tooltip misaligned after deleting event in Scheduler
* #6492 - Fixed color of resizing header
* #6493 - Footer styling and behaviour updated to more closely match headers
* #6524 - Editing broken in tree demo
* #6592 - Column widths out of sync on mobile device
* #6596 - Dark theme text color bug in event editor time field
* #6604 - "element.closest is not a function", when operating on a text element
* #6606 - Tooltips close when not supposed to
* #6609 - Trigger (icon) layout bad in DateField in Material
* #6640 - TimeField clock broken
* #6651 - Demo browser data should have cache buster
* #6682 - Drag drop not working on iPhone
* #6691 - Trial watermark doesn't look correct in IE11
* #6692 - Cls .b-grid-row-updating not removed when update finished



<p class="last-modified">Last modified on 2023-06-30 10:24:55</p>