# Bryntum Scheduler Pro version history

## 5.4.0 - 2023-06-30

### FEATURES / ENHANCEMENTS

* This release introduces a new `TimelineHistogram` class which implements a grid with histogram charts displayed for
  rows in the timeaxis section. Please check the new
  [Timeline histogram demo](https://bryntum.com/products/schedulerpro/examples-scheduler/timelinehistogram/) and the
  "Timeline histogram" guide for more details
* The release also includes refactored `ResourceHistogram` and `ResourceUtilization` views which now better support
  `TreeGroup` and `Group` features and provide some additional APIs for customization. For more details please check
  new "Resource histogram" and "Resource utilization" guides and see the updated `resourcehistogram` and
  `resourceutilization` examples
* `Widget` has a new config, `maximizeOnMobile` which takes effect only on `floating` widgets on a mobile device. It
  causes the widget to be maximized instead of positioned in order to accommodate the mobile virtual keyboard. This will
  make event editing much easier to use on mobile devices ([#6522](https://github.com/bryntum/support/issues/6522))
* On mobile devices, `type : 'checkbox'` is rendered as a `slidetoggle` widget. The API and value is the same, it is
  just a more appropriate UI for the platform
* The `NestedEvents` feature now supports deeper nesting of events, by specifying the new `maxNesting` config (it
  defaults to one level). Although it technically supports any depth, we do not recommend going deeper than 2 levels for
  the UI to be comprehensible ([#6030](https://github.com/bryntum/support/issues/6030))
* For a slightly better docs experience for most users, the docs browser now by default hides some more obscure APIs
  normally only used when implementing own widgets and features. Advanced users in need of these APIs can still opt in
  to see them using the `Show` menu in the docs browser

### API CHANGES

* The `ScaleColumn` class has been moved from Pro to regular Scheduler classes. This should not affect your application
  unless it imports the class from its individual file (not the case for the vast majority of customers). The
  distribution still includes `SchedulerPro/column/ScaleColumn.js` file which is now an empty wrapper importing the
  class from its new location. The wrapper is there till the next major release so please update your code and import
  the file from its new location if needed ([#6176](https://github.com/bryntum/support/issues/6176))

### BUG FIXES

* [#5553](https://github.com/bryntum/support/issues/5553) - `reapplyFilterOnAdd` doesn't work when adding resources before loading

## 5.3.8 - 2023-06-28

### BUG FIXES

* [#6986](https://github.com/bryntum/support/issues/6986) - Undo / Redo Inconsistent Crud changes

## 5.3.7 - 2023-06-20

### BUG FIXES

* [#6389](https://github.com/bryntum/support/issues/6389) - Drag-n-Drop bug when `constrainDragToTimeSlot` set to `true`
* [#6842](https://github.com/bryntum/support/issues/6842) - Issues with updating segments in latest nightly (2023-05-24-release)
* [#7004](https://github.com/bryntum/support/issues/7004) - [REACT] `StateTrackingManager` not working correctly

## 5.3.6 - 2023-05-26

### FEATURES / ENHANCEMENTS

* Event segments can now have `eventColor` HEX values, e.g. `[#000000](https://github.com/bryntum/support/issues/000000)` ([#6531](https://github.com/bryntum/support/issues/6531))

### BUG FIXES

* [#6740](https://github.com/bryntum/support/issues/6740) - [REACT] Set same events data with segments shows different result
* [#6747](https://github.com/bryntum/support/issues/6747) - Exception when filtering the segmented event
* [#6762](https://github.com/bryntum/support/issues/6762) - `WidgetHelper.showContextMenu` does not display the context menu when using `Number[]`

## 5.3.5 - 2023-05-11

### API CHANGES

* The internal feature mixin `ProTaskEditStm` has been moved to Scheduler codebase and renamed to `TaskEditStm`. It is
  available now as `TaskEditStm` entry in Scheduler bundle

### BUG FIXES

* [#6610](https://github.com/bryntum/support/issues/6610) - Scheduler Pro crashes when trying to undo after copy/paste multievent selection (`[CTRL + Click]`)
* [#6684](https://github.com/bryntum/support/issues/6684) - Cannot read properties of `null` (reading `'activeTransaction'`)
* [#6691](https://github.com/bryntum/support/issues/6691) - Events render to early when `timeZone` is set on a Scheduler Pro
* [#6699](https://github.com/bryntum/support/issues/6699) - Should record only 1 STM transaction for drag-create and following task edit user actions
* [#6701](https://github.com/bryntum/support/issues/6701) - [IONIC] `Scrollbar` width could not be determined under Ionic framework
* [#6713](https://github.com/bryntum/support/issues/6713) - Time spans highlights re-appear after calling `unhighlightTimeSpans()`
* [#6749](https://github.com/bryntum/support/issues/6749) - Event editor body cropped and not scrollable

## 5.3.4 - 2023-04-28

### FEATURES / ENHANCEMENTS

* New config option on the `SchedulerPro`'s `ProjectModel`: `skipNonWorkingTimeInDurationWhenSchedulingManually`.
  Please refer to the documentation for details

### BUG FIXES

* [#6582](https://github.com/bryntum/support/issues/6582) - Event's endDate jumps when start editing manually scheduled event
* [#6644](https://github.com/bryntum/support/issues/6644) - Edit Task option missing in `EventMenu`
* [#6652](https://github.com/bryntum/support/issues/6652) - Minified UMD bundle does not export `bryntum` namespace

## 5.3.3 - 2023-04-21

### FEATURES / ENHANCEMENTS

* [TypeScript] Type definition files were added for `schedulerpro.node.cjs` and `schedulerpro.node.mjs` bundles
  ([#6523](https://github.com/bryntum/support/issues/6523))
* `ResourceNonWorkingTime` now offers a `enableMouseEvents` config to enable showing tooltips for its rendered
  elements. See updated `resource-non-working-time` demo ([#6545](https://github.com/bryntum/support/issues/6545))
* `ResourceNonWorkingTime` now supports showing the `name` interval field in the rendered element ([#6493](https://github.com/bryntum/support/issues/6493))
* [ANGULAR] Bryntum Scheduler Pro now ships with two npm Angular wrapper packages to support different versions of
  Angular framework. Existing `@bryntum/schedulerpro-angular` package is now designed to work with Angular 12 and newer
  versions, which use the IVY rendering engine. New `@bryntum/schedulerpro-angular-view` package is designed to work
  with Angular 11 and older versions, which use the View Engine rendering. Check Upgrading and Angular integration
  guides in documentation for more information ([#6270](https://github.com/bryntum/support/issues/6270))
* [ANGULAR] `angular-11` demo has been added to show use of `@bryntum/schedulerpro-angular-view` package with
  Angular 11. Demo is located in `examples/frameworks/angular/angular-11` folder

### BUG FIXES

* [#1372](https://github.com/bryntum/support/issues/1372) - Pro Constraints demo doesn't update constraint icon
* [#2695](https://github.com/bryntum/support/issues/2695) - Resource Histogram is not updated when primary partner is zoomed or gets shifted
* [#5059](https://github.com/bryntum/support/issues/5059) - Histogram not updating when doing `shiftPrevious()`
* [#6439](https://github.com/bryntum/support/issues/6439) - Timeline jumps to wrong dates when change direction to RTL at runtime with `infiniteScroll` enabled
* [#6521](https://github.com/bryntum/support/issues/6521) - Task Editor disappears when entering invalid time
* [#6527](https://github.com/bryntum/support/issues/6527) - [ANGULAR] Resource Utilization - custom tick context is not updated when shift timeline
* [#6539](https://github.com/bryntum/support/issues/6539) - `eventRecord` member missing in EventTooltip feature
* [#6542](https://github.com/bryntum/support/issues/6542) - Wrong text color when hovering event
* [#6562](https://github.com/bryntum/support/issues/6562) - Broken drag-select + drag & drop of parent events
* [#6576](https://github.com/bryntum/support/issues/6576) - Timelines appear when filter non-working time with custom `viewPreset`

## 5.3.2 - 2023-04-04

### FEATURES / ENHANCEMENTS

* [REACT] Added new React 18 demo "Highlighting time spans". Demo is located in
  `examples/frameworks/react/highlight-time-spans` folder ([#6277](https://github.com/bryntum/support/issues/6277))
* The custom event layout function `eventLayout.layoutFn` is now passed the resource record being laid out as the second
  parameter. ([#6504](https://github.com/bryntum/support/issues/6504))

### BUG FIXES

* [#3765](https://github.com/bryntum/support/issues/3765) - Returning false from beforeUpdate does not revert event D&D
* [#3789](https://github.com/bryntum/support/issues/3789) – UndoRedo widget doesn't catch the project if configured standalone in Angular
* [#6037](https://github.com/bryntum/support/issues/6037) - Inconsistent event menu actions when multiple events are selected
* [#6064](https://github.com/bryntum/support/issues/6064) - Incorrect rendering of a timeaxis when `forceFit` enabled
* [#6105](https://github.com/bryntum/support/issues/6105) - Inconsistent event menu copy/cut/paste actions when multiple events are selected
* [#6297](https://github.com/bryntum/support/issues/6297) - Not possible to drag event that dropped from grid when `nestedEvents` enabled
* [#6369](https://github.com/bryntum/support/issues/6369) - Issues with timezones on scheduler
* [#6376](https://github.com/bryntum/support/issues/6376) - Resource calendar not shown when using nested events
* [#6390](https://github.com/bryntum/support/issues/6390) - Type for `CalendarModel`'s `intervals` too strict
* [#6394](https://github.com/bryntum/support/issues/6394) - `project.changes` still available after `project.revertChanges()`
* [#6425](https://github.com/bryntum/support/issues/6425) - `NestedEvents` not working in vertical mode
* [#6430](https://github.com/bryntum/support/issues/6430) - `taskEditCanceled` event is not triggering
* [#6444](https://github.com/bryntum/support/issues/6444) - Error on load function after dragging
* [#6484](https://github.com/bryntum/support/issues/6484) - Invisible cells repainted with wrong data
* [#6510](https://github.com/bryntum/support/issues/6510) - Event segment `eventColor` not applied

## 5.3.1 - 2023-03-17

### API CHANGES

* `ProjectModel` convenience getter methods (`events`, `resources` etc.) now returns `allRecords` instead of `records`
* Date parsing was made more forgiving in regard to character used to separate date parts. For example these strings are
  now all acceptable as `HH:mm`: `10:20`, `10 20`, `10-20`, `10/20` ([#6344](https://github.com/bryntum/support/issues/6344))

### BUG FIXES

* [#5084](https://github.com/bryntum/support/issues/5084) - React orders demo not working properly
* [#6025](https://github.com/bryntum/support/issues/6025) - Uncaught error in `populateEventMenu` when dropping an event on the first resource
* [#6041](https://github.com/bryntum/support/issues/6041) - `getDateConstraints()` bounds works not correct with not rounded time in start/end dates
* [#6129](https://github.com/bryntum/support/issues/6129) - Dependencies not refreshed after dropping event on non-working time
* [#6274](https://github.com/bryntum/support/issues/6274) - SENCHA + Scheduler Pro + Chrome : Strange behaviour after zoom
* [#6279](https://github.com/bryntum/support/issues/6279) - Add a new tree node with empty children throws an exception
* [#6320](https://github.com/bryntum/support/issues/6320) - `effortDriven` + fixed duration not working when setting it in the data level initially
* [#6326](https://github.com/bryntum/support/issues/6326) - `GroupSummary` data not updating on event deletion
* [#6351](https://github.com/bryntum/support/issues/6351) - Components do not render into containers not already in DOM

## 5.3.0 - 2023-03-02

### FEATURES / ENHANCEMENTS

* CSS changes in Scheduler has cut the size of Scheduler Pro's standalone CSS-bundles roughly in half. See Schedulers
  upgrade guide for more information
* Added basic support for recurring events, see "What's new" for more information. And be sure to try it out in the new
  `recurrence` demo ([#792](https://github.com/bryntum/support/issues/792))
* Support for Time zone conversion has been added to all Bryntum scheduling products. Simply set a IANA time zone
  identifier as value for the `timeZone` config and that's it. But, since time zones is not supported natively in
  JavaScript we strongly recommend to read our Time zone guide ([#1533](https://github.com/bryntum/support/issues/1533))
* Added `Versions` feature, enabling capturing snapshots of projects together with a detailed changelog
* Localization demos updated to show up-to-date localization approach
* Event model has got new `schedulingMode`, `effort` and `effortDriven` fields. The fields add support for a new
  scheduling mode in which user provided effort gets distributed across the event duration.
  Please check the new `effort` demo to see how it works
* `AjaxHelper.fetch` now supports using request body to pass parameters for non-GET requests. Please check
  `addQueryParamsToBody` argument in the method documentation ([#2855](https://github.com/bryntum/support/issues/2855))
* Lots (but not all) of the not so informative `object` types in our TypeScript typings have been replaced with more
  specific types. Objects that in our JavaScript are used as maps are now declared as `Record<keyType, valueType>`, and
  for functions that accept object arguments many are replaced with anonymous type declarations, such as
  `{ foo: string, bar: number }` (Partially fixed [#5176](https://github.com/bryntum/support/issues/5176))
* Added new "Nested events configuration options" Angular demo. Demo is located in
  `examples/frameworks/angular/nested-events-configuration` folder ([#5188](https://github.com/bryntum/support/issues/5188))
* While resizing the `PercentBar`, the owning component now trigger `percentBarDragStart`, `percentBarDrag`
  and `percentBarDrop` events. The task record is also updated in realtime triggering continuous UI updates for a nicer
  UX ([#6146](https://github.com/bryntum/support/issues/6146))

### API CHANGES

* [DEPRECATED] `LocaleManager.registerLocale` and `LocaleManager.extendLocale` are deprecated.
  `LocaleHelper.publishLocale` should be used instead.
* When configuring a SchedulerPro with a time zone at initialization, and there's also a `startDate` and/or a `endDate`
  initially, those days will be treated as in local system time zone and will therefore be converted to the configured
  time zone. Previously (in `5.3.0-alpha-1` and `5.3.0-beta-1`) those dates was treated as in the provided time zone
* The default value for `ResourceHistogram`'s `effortFormat` was changed from `0` to `0.#`, to round values to one
  decimal place. Previously it was not rounding at all

### LOCALE UPDATES

* Locales format and process for applying locales have been simplified
* New locales for 31 languages have been added. Currently available languages are listed in the localization guide
  (Guides/Customization/Localization)

### BUG FIXES

* [#5889](https://github.com/bryntum/support/issues/5889) - Events are not rendered according to the timezone when scheduler has a timezone
* [#5981](https://github.com/bryntum/support/issues/5981) - Scrolling close to edges hides `highlightEventCalendars`
* [#6018](https://github.com/bryntum/support/issues/6018) - Wrong position of highlighted region when `taskRecord` is set
* [#6020](https://github.com/bryntum/support/issues/6020) - Highlighted task timespan height not adjusting with the height of the rows
* [#6156](https://github.com/bryntum/support/issues/6156) - `eventRecord.set` only works first time for preamble/postamble
* [#6260](https://github.com/bryntum/support/issues/6260) - Milestone is rendered incorrectly
* [#6271](https://github.com/bryntum/support/issues/6271) - Timeline enables eventEdit feature if any features config provided

## 5.2.10 - 2023-02-17

### FEATURES / ENHANCEMENTS

* Added a `trackProjectModelChanges` config to the `ProjectModel` to optionally track own changes of the `ProjectModel`
  ([#5355](https://github.com/bryntum/support/issues/5355))

### API CHANGES

* Recently browsers have added support for Unicode 15, which changes the output of `Intl.DateTimeFormat` when
  formatting time to include `AM`/`PM`. Those browsers now use "thin space" (`\u202f`) instead of regular space. This
  affects the `DateHelper.format()` function, but likely you do not need to take any action in your application. It
  also affects `DateHelper.parse()`, which has been updated to support the new unicode space ([#6193](https://github.com/bryntum/support/issues/6193))

### BUG FIXES

* [#6112](https://github.com/bryntum/support/issues/6112) - Exception is thrown after rejecting a conflicting change
* [#6114](https://github.com/bryntum/support/issues/6114) - `scrollEventIntoView` doesn't handle nested events
* [#6133](https://github.com/bryntum/support/issues/6133) - Crash when dragging events between two schedulers
* [#6142](https://github.com/bryntum/support/issues/6142) - DST Adjustment issue adding 1h on events
* [#6147](https://github.com/bryntum/support/issues/6147) - Undo/redo adding a calendar crashes

## 5.2.9 - 2023-01-30

### FEATURES / ENHANCEMENTS

* The `TaskEditor's` `Advanced` tab's combos has been made wider which required some additional styling and some fields
  have been rearranged as well. If your app is customizing the `Advanced` tab, you should check that your customization
  still gives same result with the new default layout ([#5966](https://github.com/bryntum/support/issues/5966))

### BUG FIXES

* [#5925](https://github.com/bryntum/support/issues/5925) - Adding `workingTime` cause the event tooltip to start from the `eventBuffer` start date
* [#5979](https://github.com/bryntum/support/issues/5979) - Summary on vertical mode "disappears" on double click
* [#6017](https://github.com/bryntum/support/issues/6017) - Scheduler Pro not assigning resourceId to new events
* [#6019](https://github.com/bryntum/support/issues/6019) - [TypeScript] Feature classes and configs have `on` event handlers exposed on owner class
* [#6038](https://github.com/bryntum/support/issues/6038) - Event drag copy throws with mapped fields
* [#6069](https://github.com/bryntum/support/issues/6069) - Params lost if defined in class config

## 5.2.8 - 2023-01-19

### BUG FIXES

* [#5386](https://github.com/bryntum/support/issues/5386) - Improved panel collapse animation when collapsed panel header is perpendicular to expanded
* [#5788](https://github.com/bryntum/support/issues/5788) - Automatic dependency setting not working after resetting events array
* [#5814](https://github.com/bryntum/support/issues/5814) - `StateProvider` throws during component construction
* [#5904](https://github.com/bryntum/support/issues/5904) - TypeError in Scheduler Pro on Drag/Drop event
* [#5917](https://github.com/bryntum/support/issues/5917) - When load data with `schedulerPro.project.loadCrudManagerData` Scheduler Pro crashes
* [#5923](https://github.com/bryntum/support/issues/5923) - `applyProjectChanges` does not account for mapped `id` field
* [#5931](https://github.com/bryntum/support/issues/5931) - Deprecated API use. Handle size is from CSS
* [#5935](https://github.com/bryntum/support/issues/5935) - Scheduler drag to create on a linked record does not work
* [#5950](https://github.com/bryntum/support/issues/5950) - Crash when resizing event being created
* [#5953](https://github.com/bryntum/support/issues/5953) - Event record disappears after changing to zero duration

## 5.2.7 - 2023-01-11

### API CHANGES

* The `StartDateField/EndDateField` fields now sets the default value of their `max` property to be 200 years after the
  project's end date, see the docs for the corresponding classes ([#5779](https://github.com/bryntum/support/issues/5779))

### BUG FIXES

* [#4862](https://github.com/bryntum/support/issues/4862) - Scheduler Pro percent bar in vertical mode wrong UI
* [#5474](https://github.com/bryntum/support/issues/5474) - Wrong endDate when dragging events over days at which DST/STD change
* [#5849](https://github.com/bryntum/support/issues/5849) - Store exception event triggered when create a new event with backend used
* [#5882](https://github.com/bryntum/support/issues/5882) - Rendering content from eventRenderer disappearing when scrolling

## 5.2.6 - 2022-12-28

### FEATURES / ENHANCEMENTS

* [REACT] React wrapper now supports React components in widgets and tooltips ([#774](https://github.com/bryntum/support/issues/774))

### BUG FIXES

* [#2176](https://github.com/bryntum/support/issues/2176) - Adding non-working interval dynamically does not recalculate tasks
* [#4851](https://github.com/bryntum/support/issues/4851) - Infinite requests if server response is malformed
* [#5394](https://github.com/bryntum/support/issues/5394) - Non working days not painted after adding a calendar interval programmatically
* [#5786](https://github.com/bryntum/support/issues/5786) - Store `autoCommit` gets disabled by `CRUDManager`

## 5.2.5 - 2022-12-16

### FEATURES / ENHANCEMENTS

* `RowCopyPaste` feature supports copying rows in tree. Copied records will have same hierarchy
* Paste after cut and copy behavior is unified, records are moved below the paste target

### BUG FIXES

* [#5408](https://github.com/bryntum/support/issues/5408) - `EventDragCreate` doesn't take `ignoreResourceCalendar` into account
* [#5668](https://github.com/bryntum/support/issues/5668) - Chained `resourceStores` from one `CrudManager` works incorrect
* [#5693](https://github.com/bryntum/support/issues/5693) - Nested events drag from Grid example crashes when dragging after code edit
* [#5731](https://github.com/bryntum/support/issues/5731) - Time axis cells are recycled when making schedule area small
* [#5776](https://github.com/bryntum/support/issues/5776) - `Radiobutton` not circular in small popup
* [#5778](https://github.com/bryntum/support/issues/5778) - Dragging resources to the last row causes crash in group

## 5.2.4 - 2022-11-28

### FEATURES / ENHANCEMENTS

* We recently launched a new homepage over at [bryntum.com](https://bryntum.com), and have now slightly updated the
  styling for demos and docs to better match it (new logo, new header color, new font). Please note that this is not a
  change to our themes, only the look of the demos, and it won't affect your application

### BUG FIXES

* [#5242](https://github.com/bryntum/support/issues/5242) - Create styling guide for Scheduler Pro
* [#5564](https://github.com/bryntum/support/issues/5564) - Crash when drag creating with task editor open
* [#5595](https://github.com/bryntum/support/issues/5595) - Fix panel collapse icon directions

## 5.2.3 - 2022-11-17

### BUG FIXES

* [#5551](https://github.com/bryntum/support/issues/5551) - Store `allRecords` includes group footers twice

## 5.2.2 - 2022-11-08

### API CHANGES

* [DEPRECATED] The behaviour of the `store.data` getter will be changed in 6.0. Currently, it returns the **initial**
  raw dataset, in 6.0 it will be changed to have the more expected behaviour of returning the data objects for the
  **current** state instead. See Grid's upgrade guide for more information ([#5499](https://github.com/bryntum/support/issues/5499))

## 5.2.1 - 2022-10-28

### FEATURES / ENHANCEMENTS

* Documentation for `EventModel` mistakenly listed support for `effort`, related fields and functions. The concept
  currently only exists in Gantt, docs has been cleaned up. ([#5411](https://github.com/bryntum/support/issues/5411))

### BUG FIXES

* [#2605](https://github.com/bryntum/support/issues/2605) - Setting new resources to the store fails when all resources are filtered out
* [#4392](https://github.com/bryntum/support/issues/4392) - Error when using store instance in `ProjectModel` definition
* [#5149](https://github.com/bryntum/support/issues/5149) - Angular demos now use component-local styles using `ViewEncapsulation.None`
* [#5322](https://github.com/bryntum/support/issues/5322) - Getting Error "Unknown identifier ClassDefEx-1.$.startDate" when dynamically loading Data
* [#5406](https://github.com/bryntum/support/issues/5406) - `ResourceHistogram` view fails when `eventStore` config is passed
* [#5420](https://github.com/bryntum/support/issues/5420) - Exception thrown when using event tree store in `SchedulerPro`
* [#5435](https://github.com/bryntum/support/issues/5435) - Error after call `loadInlineData` with resource tree structure

## 5.2.0 - 2022-10-13

### FEATURES / ENHANCEMENTS

* Scheduler Pro has gained built-in support for segmented events, by using the new `EventSegments`,
  `EventSegmentDrag` and `EventSegmentResize` features. The features cover splitting events to segments, rendering of
  such events and individual segments dragging Please check the new `split-events` demo to see how it works
  ([#2975](https://github.com/bryntum/support/issues/2975))
* A new widget, ViewPresetCombo, is available to Scheduler, SchedulerPro and Gantt. Put it in the toolbar, and it will
  provide easy-to-setup view switching. It uses the built-in ViewPresets functionality which is easily customized
  ([#4539](https://github.com/bryntum/support/issues/4539))
* Menu has a `separator` config to make it easier to visually separate menu items
* The responsive state objects used in the `responsive` config of the `Responsive` mixin now support a `once` property
  to allow configs to only be set on first activation of the state
* The `Core.helper.DateHelper` class has a new method `formatRange` method which can format date ranges, as well as new
  formatting options for week numbers
* A new `EventNonWorkingTime` feature was added to Scheduler. When enabled in Scheduler Pro, the combined calendar for
  an event (a merge of project / resource + event calendars) is visualized by shading the parts of an event that
  intersects non-working time. Can be tried in the new `event-non-working-time` demo
* PdfExport feature is refactored to render content directly. This significantly improves performance and robustness by
  eliminating component scrolling. This behavior is enabled by default. You can revert to the old behavior by setting
  `enableDirectRendering` config on the export feature to `false` ([#4449](https://github.com/bryntum/support/issues/4449))
* `ResourceHistogram` has got a new `generateScalePoints` event that allows customizing its scale points at runtime
  ([#5025](https://github.com/bryntum/support/issues/5025))

### API CHANGES

* `EventModel` has new `ignoreResourceCalendar` boolean field. When field is set to `true` the event will not take its
  assigned resource calendars into account and will perform according to its own calendar only ([#3349](https://github.com/bryntum/support/issues/3349))

### LOCALE UPDATES

* Added localization for the new event split functionality, keys `EventSegments.splitEvent` and
  `EventSegments.renameSegment`

### BUG FIXES

* [#4096](https://github.com/bryntum/support/issues/4096) - CalendarIntervalMixin class uses hardcoded date field formats
* [#5241](https://github.com/bryntum/support/issues/5241) - Cannot reach dependency terminals for segmented events
* [#5243](https://github.com/bryntum/support/issues/5243) - Task editor too narrow in classic themes
* [#5290](https://github.com/bryntum/support/issues/5290) - Error on triggering `zoomToFit` on `ResourceHistogram`

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
* [#4654](https://github.com/bryntum/support/issues/4654) - [REACT] Bryntum widget wrappers don't accept all component properties in React 18
* [#5352](https://github.com/bryntum/support/issues/5352) - Exception thrown when refreshing the data with event selected
* [#5372](https://github.com/bryntum/support/issues/5372) - Not able to remove events in Vertical mode

## 5.1.4 - 2022-09-29

### BUG FIXES

* [#4374](https://github.com/bryntum/support/issues/4374) - Console error if return false on preventable `beforeAdd` event on dependency store
* [#5050](https://github.com/bryntum/support/issues/5050) - Events are not rendered correctly after exporting to PDF
* [#5170](https://github.com/bryntum/support/issues/5170) - When first region has width and last region is collapsed, Scheduler Pro doesn't resize with container
* [#5196](https://github.com/bryntum/support/issues/5196) - Task editor in Scheduler Pro gets empty when opened too fast after closing
* [#5199](https://github.com/bryntum/support/issues/5199) - When `resourceTimeRanges` feature enabled description is displayed twice

## 5.1.3 - 2022-09-09

### BUG FIXES

* [#415](https://github.com/bryntum/support/issues/415) - Improve docs on formatting currency values on `NumberField`
* [#3680](https://github.com/bryntum/support/issues/3680) - Support Salesforce Winter 22 release
* [#5133](https://github.com/bryntum/support/issues/5133) - Custom layout function scope should have a reference to the scheduler

## 5.1.2 - 2022-08-29

### FEATURES / ENHANCEMENTS

* Configs that accept configuration options for a widget (or other class) are now (mostly) documented to accept a typed
  config object rather than a plain object. For example instead of `{Object} tooltip - A tooltip configuration object`,
  it is now `{TooltipConfig} tooltip - A tooltip configuration object`. This improves our TypeScript typings (transforms
  to `Partial<TooltipConfig>` in typings) when using such configs, but also improves our docs by linking to the configs
  of the type
* Added a config to allow State Tracking Manager to ignore remote changes coming in a sync response. This allows user
  to only undo/redo local changes (`ignoreRemoteChangesInSTM` config on the ProjectModel) ([#5083](https://github.com/bryntum/support/issues/5083))

### BUG FIXES

* [#4943](https://github.com/bryntum/support/issues/4943) - Changing the time by dragging an event triggering an error
* [#4965](https://github.com/bryntum/support/issues/4965) - Dependency creation still working when `readOnly` is `true`
* [#4968](https://github.com/bryntum/support/issues/4968) - `change` event doesn't fire when canceling event editor
* [#5010](https://github.com/bryntum/support/issues/5010) - Group expanders still visible after stopping grouping
* [#5017](https://github.com/bryntum/support/issues/5017) - [TypeScript] Property type is missing in `DataFieldConfig`
* [#5018](https://github.com/bryntum/support/issues/5018) - [Vue] Prop Validation fails for `String` options
* [#5028](https://github.com/bryntum/support/issues/5028) - UI does not refresh when certain fields are changed
* [#5056](https://github.com/bryntum/support/issues/5056) - Project mutes events in stores not managed by the engine

## 5.1.1 - 2022-07-28

### BUG FIXES

* [#3427](https://github.com/bryntum/support/issues/3427) - Infinite sync loop if `percentDone` value is incorrect
* [#4963](https://github.com/bryntum/support/issues/4963) - Undoing two scheduled nested events causes crash

## 5.1.0 - 2022-07-21

### FEATURES / ENHANCEMENTS

* Scheduler Pro has gained built-in support for nested events, by using a tree EventStore and the new NestedEvents
  feature. On display in the new `nested-events-configuration` and `nested-events-drag-from-grid` demos, as well as in
  the updated `nested-events` demo ([#1519](https://github.com/bryntum/support/issues/1519), [#3564](https://github.com/bryntum/support/issues/3564))
* Our TypeScript typings for string types that have a predefined set of alternatives was improved to only accept
  those alternatives. For example previously the `dock` config which was previously declared as `dock: string` is now
  `dock : 'top'|'right'|'bottom'|'left'`
* Create React App templates now available
* Configuring the crud manager functionality of the project was made a little easier by introducing shortcuts for
  setting load and sync urls using the new `loadUrl` and `syncUrl` configs
* Updated the built-in version of FontAwesome Free to `6.1.1`
* `KeyMap` is a mixin that allows for standardized and customizable keyboard shortcuts functionality. `KeyMap` is by
  default  mixed in to `Widget` and therefore available to all `Widget`'s child classes. There is a new guide
  **Guides/Customization/Keyboard shortcuts** describing how to customize currently integrated keyboard shortcuts
  ([#4300](https://github.com/bryntum/support/issues/4300), [#4313](https://github.com/bryntum/support/issues/4313), [#4328](https://github.com/bryntum/support/issues/4328))
* Project optionally allows `sync()` calls without local changes, to retrieve changes from the backend. Configure
  `forceSync : true` to enable this new behaviour ([#4575](https://github.com/bryntum/support/issues/4575))

### API CHANGES

* [BREAKING] [ANGULAR] Angular wrappers now use the more modern module bundle by default, instead of the legacy umd
  bundle. Hence application imports must be changed to match. This will slightly improve application size and
  performance ([#2786](https://github.com/bryntum/support/issues/2786))
* [BREAKING] `schedulerpro.lite.umd.js` bundle is no longer available
* [BREAKING] WebComponents has been removed from `schedulerpro.module.js` ES modules bundle. New bundle with
  WebComponents is `schedulerpro.wc.module.js`

### BUG FIXES

* [#4378](https://github.com/bryntum/support/issues/4378) - Dependencies not redrawn when rows reordered
* [#4608](https://github.com/bryntum/support/issues/4608) - Nested events ugly with scrollbars on
* [#4689](https://github.com/bryntum/support/issues/4689) - Drag creating a new event in `nested-events-drag-from-grid` should create a `container`
* [#4696](https://github.com/bryntum/support/issues/4696) - Parents sorted below children in docs
* [#4697](https://github.com/bryntum/support/issues/4697) - Too dark code background in docs
* [#4945](https://github.com/bryntum/support/issues/4945) - Dropping nested event causes crash when not constraining drag to timeline
* [#4948](https://github.com/bryntum/support/issues/4948) - `EventTooltip` buggy for nested events
* [#4955](https://github.com/bryntum/support/issues/4955) - Removing parent when nested event is selected causes crash

## 5.0.7 - 2022-07-13

### BUG FIXES

* [#4681](https://github.com/bryntum/support/issues/4681) - STM issues when using with backend
* [#4737](https://github.com/bryntum/support/issues/4737) - Paste events are not generating the assignments in the request
* [#4756](https://github.com/bryntum/support/issues/4756) - PDF export hangs trying to restore component
* [#4892](https://github.com/bryntum/support/issues/4892) - Unexpected change events after drag or resize if preamble/postamble used
* [#4916](https://github.com/bryntum/support/issues/4916) - `Fullscreen` is not working on mobile Safari
* [#4919](https://github.com/bryntum/support/issues/4919) - Engine throws exception on referencing a destroyed project

## 5.0.6 - 2022-06-20

### BUG FIXES

* [#4146](https://github.com/bryntum/support/issues/4146) - `TaskEditor` clears time when editing events with datetime picker
* [#4626](https://github.com/bryntum/support/issues/4626) - Exception when pressing enter in event editor in timeline demo
* [#4731](https://github.com/bryntum/support/issues/4731) - Reverting assignment change does not update the view
* [#4749](https://github.com/bryntum/support/issues/4749) - Assignment record for new event does not appear in project changes in task editor is disabled
* [#4778](https://github.com/bryntum/support/issues/4778) - Body mask now tracks grid resize to maintain cover of the body
* [#4808](https://github.com/bryntum/support/issues/4808) - Typings are wrong for async functions
* [#4813](https://github.com/bryntum/support/issues/4813) - Scheduling Cycle combo shows previous content on resolving next conflict

## 5.0.5 - 2022-05-30

### FEATURES / ENHANCEMENTS

* Added public `afterTaskEdit` event which is triggered at the end of the task editing after task editor is closed

### BUG FIXES

* [#4503](https://github.com/bryntum/support/issues/4503) - Returning false from `beforeTaskEdit` event breaks `autoSync`
* [#4519](https://github.com/bryntum/support/issues/4519) - `TimeAxis` stopped refreshing data after `loadInlineData` call
* [#4547](https://github.com/bryntum/support/issues/4547) - [LWC] Exception when dragging scheduler pro event on lightning tab
* [#4584](https://github.com/bryntum/support/issues/4584) - `TimeSpanHighlight`: surrounding and non-surrounding simultaneously
* [#4607](https://github.com/bryntum/support/issues/4607) - [VUE] Incorrect prop types in Vue wrapper
* [#4624](https://github.com/bryntum/support/issues/4624) - XSS security bugs
* [#4653](https://github.com/bryntum/support/issues/4653) - Event and dependency are not rendered after reverting changes made in the task editor
* [#4657](https://github.com/bryntum/support/issues/4657) - Can not navigate out of the datetime field using `Shift + Tab`
* [#4668](https://github.com/bryntum/support/issues/4668) - `StartDate` not updated with `syncDataOnLoad` and `project.load()`

## 5.0.4 - 2022-05-11

### FEATURES / ENHANCEMENTS

* The `EventCopyPaste` feature is since its inception documented as being enabled by default, but that only applied to
  the basic Scheduler, code was changed to make it enabled by default also in Scheduler Pro

### API CHANGES

* `ProjectModel` has got new `maxCalendarRange` option that allows to supporting long running projects. For more
  details, see [What's new](https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/whats-new/5.0.4)
  ([#2962](https://github.com/bryntum/support/issues/2962))

### BUG FIXES

* [#4294](https://github.com/bryntum/support/issues/4294) - Not possible to reach horizontal time axis scrollbar
* [#4490](https://github.com/bryntum/support/issues/4490) - Dragging events between Scheduler Pro instances freezes
* [#4562](https://github.com/bryntum/support/issues/4562) - [REACT] React wrappers have incorrect source mapping urls
* [#4574](https://github.com/bryntum/support/issues/4574) - `highlightTimeSpans` works even though the `timeSpanHighlight` feature is disabled

## 5.0.3 - 2022-04-26

### FEATURES / ENHANCEMENTS

* Added new `examples/inline-data` demo showing assigning inline data to `SchedulerPro`
* [WRAPPERS] `ProjectModel` wrapper component reference can now be used as `project` parameter for Bryntum Scheduler Pro
  wrapper component in Angular and Vue applications ([#4238](https://github.com/bryntum/support/issues/4238))
* [WRAPPERS] Scheduler Pro has a new `ProjectModel` framework wrapper available for React, Vue and Angular. It
  simplifies sharing data between multiple Bryntum components ([#4382](https://github.com/bryntum/support/issues/4382))
* [ANGULAR] New demo showing use of inline data and `ProjectModel` wrapper. Demo located in
  `examples/frameworks/angular/inline-data` folder
* [REACT] New demo showing use of inline data and `ProjectModel` wrapper. Demo located in
  `examples/frameworks/react/javascript/inline-data` folder
* [VUE-3] New demo showing use of inline data and `ProjectModel` wrapper. Demo located in
  `examples/frameworks/vue-3/javascript/inline-data` folder
* [REACT] New basic React demo with TypeScript. Demo located in `examples/frameworks/react/typescript/basic` folder

### API CHANGES

* The `validateResponse` flag on `ProjectModel` has been changed to default to `true`. When enabled, it validates
  responses from the backend and outputs a message on console if the format isn't valid. This is helpful during the
  development phase, but can be turned off in production
* New Vue 2/3 wrapper config option `relayStoreEvents` (defaults to `false`). When set to `true`, the events fired by
  stores are relayed to the Bryntum Grid instance
* [REACT] React wrappers now include TypeScript definitions ([#3378](https://github.com/bryntum/support/issues/3378))

### BUG FIXES

* [#4031](https://github.com/bryntum/support/issues/4031) - First Redo action works incorrect
* [#4127](https://github.com/bryntum/support/issues/4127) - [LWC] `DomHelper.isInView()` throws
* [#4222](https://github.com/bryntum/support/issues/4222) - [LWC] Performance degradation in 5.0 release
* [#4432](https://github.com/bryntum/support/issues/4432) - [LWC] Mouse events do not work
* [#4439](https://github.com/bryntum/support/issues/4439) - Add public event to track task edit cancel action
* [#4461](https://github.com/bryntum/support/issues/4461) - [Vue] wrapper triggers doubled `dataChange` events with different params

## 5.0.2 - 2022-04-13

### FEATURES / ENHANCEMENTS

* The `beforeTaskEdit`, `beforeTaskSave` and `beforeTaskDelete` events triggered by the TaskEdit feature now handle
  async flows. Use async / await in your listener or return a Promise and it will be awaited before execution
  continues. Useful for example to ask for a confirmation on save etc ([#4421](https://github.com/bryntum/support/issues/4421))
* TaskEditor now offers a `blurAction` config to not reject changes when clicking outside the editor ([#4445](https://github.com/bryntum/support/issues/4445))

### BUG FIXES

* [#4049](https://github.com/bryntum/support/issues/4049) - `beforeEventEdit` does not fire on Scheduler Pro, whereas `beforeTaskEdit` does
* [#4310](https://github.com/bryntum/support/issues/4310) - Wrong console tip for Scheduler Pro
* [#4332](https://github.com/bryntum/support/issues/4332) - Crash when double clicking histogram
* [#4370](https://github.com/bryntum/support/issues/4370) - Assigning tasks to project when `syncDataOnLoad:true` results in empty `SchedulerPro`
* [#4389](https://github.com/bryntum/support/issues/4389) - Scheduler with `infiniteScroll` throws when trying to render already loaded project
* [#4406](https://github.com/bryntum/support/issues/4406) - Fixed items in disabled `fieldset`/`radiogroup` not being disabled
* [#4479](https://github.com/bryntum/support/issues/4479) - `DependencyEdit` dialog not include `fromSide`/`toSide` update into changes param of `datachange` event

## 5.0.1 - 2022-03-04

### API CHANGES

* [WRAPPERS] New `ResourceUtilization` widget wrapper available for Angular, React and Vue frameworks ([#4276](https://github.com/bryntum/support/issues/4276))

### BUG FIXES

* [#4264](https://github.com/bryntum/support/issues/4264) - Collapse / expand icons too far apart
* [#4265](https://github.com/bryntum/support/issues/4265) - Highlighted time span elements animate after zooming
* [#4266](https://github.com/bryntum/support/issues/4266) - Time span highlight elements not updated after resizing window
* [#4267](https://github.com/bryntum/support/issues/4267) - Disabling resources field breaks task editor

## 5.0.0 - 2022-02-21

* We are thrilled to announce version 5.0 of our Scheduler Pro product. This release marks a big milestone for us, after
  more than a year of development. This update makes it much easier to combine multiple Bryntum products, and also
  includes lots of new demos, an EventBuffer feature (for travel time), a ResourceUtilization widget as bug fixes and
  other enhancements requested by our community. A big thanks to our customers who helped us with testing our alpha &
  beta versions
* You are most welcome to join us on March 16th, at 9am PST (6pm CET) for a 5.0 walkthrough webinar, demonstrating all
  the shiny new features
  [Click here to register](https://us06web.zoom.us/webinar/register/5116438317103/WN_4MkExpZPQsGYNpzh1mR_Ag)
* We hope you will enjoy this release and we are looking forward to hearing your feedback of what you would like us to
  develop next

*/ Mats Bryntse, CEO @Bryntum

### FEATURES / ENHANCEMENTS

* Added a new Resource Utilization view displaying resource allocation. Please check its demo for details ([#2348](https://github.com/bryntum/support/issues/2348))
* With this release Scheduler Pro starts displaying a popup informing users of scheduling conflicts, cycles and calendar
  misconfigurations. The popup allows user to pick an appropriate resolution for the case at hand. On the data level the
  cases are indicated by new events triggered on the project ([#1264](https://github.com/bryntum/support/issues/1264), [#1265](https://github.com/bryntum/support/issues/1265))
* Scheduler Pro now performs the initial rendering of events quicker than before, by rendering them using raw data prior
  to performing calculations. Especially on large datasets this makes it feel much snappier. Requires loading normalized
  data to work optimally. Depending on how much non-UI manipulating your app does on the events the delayed calculations
  might affect your code, be sure to check out the upgrade guide ([#2251](https://github.com/bryntum/support/issues/2251))
* Each product has a new "thin" JavaScript bundle. The thin bundle only contains product specific code, letting you
  combine multiple Bryntum products without downloading the shared code multiple times (previously only possible with
  custom-built bundles from sources). Find out more in the What's new guide ([#2805](https://github.com/bryntum/support/issues/2805))
* Each theme is now available in a version that only has product specific CSS in it, called a `thin` version. These
  files are name `[product].[theme].thin.css` - `schedulerpro.stockholm.thin.css` for example. They are intended for
  using when you have multiple different bryntum products on the same page, to avoid including shared CSS multiple
  times. Read more about it in the `What's new` section in docs ([#3276](https://github.com/bryntum/support/issues/3276))
* `Model` has a new `readOnly` field that is respected by UI level editing features to disallow editing records having
  `readOnly : true`. It does not directly affect the datalayer, meaning that you can still programmatically edit the
  records ([#665](https://github.com/bryntum/support/issues/665))
* New feature - Event Buffer - which allows visualizing things like travel time ([#2822](https://github.com/bryntum/support/issues/2822))
* Manually scheduled tasks are changed to not skip non-working time for proposed start/end date values. Check the
  upgrade guide if you want to revert to the previous behaviour ([#2326](https://github.com/bryntum/support/issues/2326))
* New `drag-unplanned-tasks` which shows how to drag tasks from an external grid, and highlighting available resource
  slots in the schedule while dragging
* Scheduler Pro's event rendering now uses absolute positioning instead of translation to position the event bars. This
  was changed to make native `position: sticky` work, the `stickyEvents` feature is now very thin and more performant
  ([#4055](https://github.com/bryntum/support/issues/4055))
* New `ProjectModel` setters/getters for `assignments`, `dependencies`, `events`, `resourceTimeRanges`, `resources`,
  `timeRanges` ([#4043](https://github.com/bryntum/support/issues/4043))
* New `drag-unplanned-tasks` which shows how to drag tasks from an external grid, and highlighting available resource
  slots in the schedule while dragging
* `window` references are replaced with `globalThis` which is supported in all modern browsers and across different JS
  environments ([#4071](https://github.com/bryntum/support/issues/4071))
* You can now style `CalendarIntervals` by providing a `cls` field in their data. This makes it very easy to style non
  working time elements ([#3255](https://github.com/bryntum/support/issues/3255))
* A new function called `downloadTestCase()` was added to Bryntum widgets, it is intended to simplify creating test
  cases for reporting issues on Bryntum's support forum. Running it collects the current value for the configs your app
  is using, inlines the current dataset and compiles that into a JavaScript app that is then downloaded. The app will
  most likely require a fair amount of manual tweaking to reproduce the issue, but we are hoping it will simplify the
  process for you. Run `schedulerPro.downloadTestCase()` on the console in a demo to try it
* Updated FontAwesome Free to version 6, which includes some new icons sponsored by Bryntum in the charts category:
  https://fontawesome.com/search?m=free&c=charts-diagrams&s=solid
* When configured with a StateProvider and `stateId`, Scheduler Pro state is stored automatically as stateful properties
  change ([#1859](https://github.com/bryntum/support/issues/1859))

For more details, see [What's new](https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/whats-new/5.0.0)
and [Upgrade guide](https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/upgrades/5.0.0) in docs

### API CHANGES

* [BREAKING] React wrappers now use the more modern module bundle by default, instead of the legacy umd bundle. Hence
  application imports must be changed to match. This will slightly improve application size and performance
  ([#2787](https://github.com/bryntum/support/issues/2787))
* [BREAKING] The Engine `ResourceAllocationInfo` class `allocation` property has been changed from an `Array` to
  an`Object` with two properties `total` and `byAssignments`. The `total` property contains an array of the resource
  allocation intervals. And the `byAssignments` is a `Map` keeping individual assignment allocation intervals with
  assignments as keys and arrays of allocation intervals as values
  Please check [Upgrade guide](https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/upgrades/5.0.0) if
  your code uses that class
* [DEPRECATED] ResourceHistogram `getBarTip` config has been deprecated in favour of new `barTooltipTemplate` config
  Please check the upgrade guide and update your code accordingly
* `DependencyModel.active` field has been changed to persisted. To revert to the old behavior
  please override the field and set its `persist` config to `false`
* Code of drag-from-grid and similar demos have been simplified and if you have used that code in your application you
  should make sure to review and update your code accordingly
* The following previously deprecated Scheduler Pro configs, functions etc. where removed:
* Configs `hoursPerDay`, `daysPerWeek`, `daysPerWeek` from `CalendarModel` - previously moved to `ProjectModel`
* Config `TaskEdit#showDeleteButtton` - previously replaced by `editorConfig`
* Config `TaskEdit#extraItems` - previously replaced by `items`
* Config `TaskEdit#tabsConfig` - previously replaced by `items`
* Function `ProjectModel#propagate()` - previously replaced by `commitAsync()`
* Event `SchedulerPro#beforeExport` - in favor of `beforePdfExport` event
* Event `SchedulerPro#export` - in favor of `pdfExport` event

### BUG FIXES

* [#3985](https://github.com/bryntum/support/issues/3985) - Timeline time axis header not visible
* [#4144](https://github.com/bryntum/support/issues/4144) - Big data example - Console error after open TaskEditor if 10k events loaded
* [#4156](https://github.com/bryntum/support/issues/4156) - Duplicate assignment Event error when assign resource in Maps demo
* [#4203](https://github.com/bryntum/support/issues/4203) - Big dataset demo broken
* [#4235](https://github.com/bryntum/support/issues/4235) - Wrong start date after copy pasting event

## 4.3.9 - 2022-02-17

### FEATURES / ENHANCEMENTS

* Internal code improvements and bugfixes

## 4.3.8 - 2022-02-07

### BUG FIXES

* [#4100](https://github.com/bryntum/support/issues/4100) - `DependencyStore` does not sync when updating dependency

## 4.3.7 - 2022-02-02

### API CHANGES

* [DEPRECATED] SchedulerPro `beforeExport` and `export` events (triggered by `PdfExport` feature) were deprecated
  in favor of the `beforePdfExport` and `pdfExport` events respectively. The old events names will be dropped in v5.0.0

### BUG FIXES

* [#4012](https://github.com/bryntum/support/issues/4012) - Unexpected scheduling conflict
* [#4082](https://github.com/bryntum/support/issues/4082) - Relayed listeners do not trigger onFunctions

## 4.3.6 - 2022-01-13

### BUG FIXES

* [#3788](https://github.com/bryntum/support/issues/3788) - Minimum value for duration field in Task Editor works incorrect
* [#3835](https://github.com/bryntum/support/issues/3835) - Scheduler Pro task edit resources combo store filter reset on value change
* [#3990](https://github.com/bryntum/support/issues/3990) - Chrome & Content Security Policy causes failure because of debug code section

## 4.3.5 - 2021-12-24

### BUG FIXES

* [#3896](https://github.com/bryntum/support/issues/3896) - [TypeScript] Wrong typings of model class configs
* [#3907](https://github.com/bryntum/support/issues/3907) - [TypeScript] Cannot pass Scheduler instance to `Store.relayAll`
* [#3928](https://github.com/bryntum/support/issues/3928) - DateHelper `k` format behaves incorrectly

## 4.3.4 - 2021-12-13

### FEATURES / ENHANCEMENTS

* Updated `resource-histogram` Angular demo to use Angular 13 ([#3742](https://github.com/bryntum/support/issues/3742))

### BUG FIXES

* [#3621](https://github.com/bryntum/support/issues/3621) - [TypeScript] Improve typings of mixins
* [#3759](https://github.com/bryntum/support/issues/3759) - Touch drag starts event drag creation
* [#3850](https://github.com/bryntum/support/issues/3850) - [TypeScript] Missing static properties in typings
* [#3852](https://github.com/bryntum/support/issues/3852) - Crash if zooming while hovering event resize handle

## 4.3.3 - 2021-11-30

### BUG FIXES

* [#3532](https://github.com/bryntum/support/issues/3532) - Performance issues when resize events for big data apps
* [#3648](https://github.com/bryntum/support/issues/3648) - [DOCS] Content navigation is broken
* [#3668](https://github.com/bryntum/support/issues/3668) - Map demo resets `timeSpan` bounds to 1 work day instead of using user defined start/end dates
* [#3691](https://github.com/bryntum/support/issues/3691) - Resource Histogram renders empty initially
* [#3743](https://github.com/bryntum/support/issues/3743) - [DOCS] `web.config` file for Windows IIS server

## 4.3.2 - 2021-10-29

### FEATURES / ENHANCEMENTS

* `EventCopyPaste` feature now fires `beforeCopy` and `beforePaste` events to let you prevent the actions ([#3303](https://github.com/bryntum/support/issues/3303))

## 4.3.1 - 2021-10-21

### FEATURES / ENHANCEMENTS

* ProjectModel now has a `resetUndoRedoQueuesAfterLoad` flag to optionally clear undo / redo queues
* Bumped builtin Font Awesome Free to version 5.15.4

### BUG FIXES

* [#3539](https://github.com/bryntum/support/issues/3539) - Resource time ranges are not rendered for initially invisible resource rows
* [#3560](https://github.com/bryntum/support/issues/3560) - Timeline demo is rendered with visual artifacts in chrome
* [#3567](https://github.com/bryntum/support/issues/3567) - Minified css bundle contains unicode chars
* [#3579](https://github.com/bryntum/support/issues/3579) - Crash when combining `resourceTimeRanges` and `eventRenderer` with custom content

## 4.3.0 - 2021-10-12

### FEATURES / ENHANCEMENTS

* `ResourceHistogram` now supports resource grouping. It displays the aggregated resources allocation on the group level
  ([#2608](https://github.com/bryntum/support/issues/2608))
* Events can be grouped or manually positioned inside the row. See this demonstrated in the
  new `examples/custom-layouts` demo ([#1854](https://github.com/bryntum/support/issues/1854))

### API CHANGES

* `TimeAxisColumn` now subclasses `WidgetColumn` (before it was a `Column`), this should not affect your code. This
  opens up for rendering widgets embedded in row cells, see this demonstrated in the new `examples/embedded-chart`
  example
* [DEPRECATED] Buttons `menuIconCls` config was deprecated in favor of the new `menuIcon` config, which better matches
  the naming of other configs

## 4.2.7 - 2021-10-01

### BUG FIXES

* [#2284](https://github.com/bryntum/support/issues/2284) - Gantt should support disabling the calculation engine
* [#3166](https://github.com/bryntum/support/issues/3166) - Dependency editor Lag field does not use `dependency.lagUnit` value
* [#3411](https://github.com/bryntum/support/issues/3411) - Noticeable delay before new event is seen when drag creating in big data set scenario
* [#3428](https://github.com/bryntum/support/issues/3428) - `dataChange` event does not fire on SchedulerPro
* [#3458](https://github.com/bryntum/support/issues/3458) - Document nested fields
* [#3471](https://github.com/bryntum/support/issues/3471) - Crash when finalizing drop async on a group header row

## 4.2.6 - 2021-09-15

### FEATURES / ENHANCEMENTS

* The ResourceNonWorkingTime elements are no longer focusable/interfering with tab navigation ([#3391](https://github.com/bryntum/support/issues/3391))

### BUG FIXES

* [#3384](https://github.com/bryntum/support/issues/3384) - Error when loading inline data twice on the same schedule
* [#3408](https://github.com/bryntum/support/issues/3408) - Updated typings to support spread operator for method parameters

## 4.2.5 - 2021-09-08

### FEATURES / ENHANCEMENTS

* Added `schedulerpro.node.mjs` and `schedulerpro.node.cjs` bundles without UI components for Node.js environment
  compatibility ([#3224](https://github.com/bryntum/support/issues/3224))
* ProjectModel now fires a `dataReady` event when the engine has finished its calculations and the result has been
  written back to the records ([#2019](https://github.com/bryntum/support/issues/2019))
* The API documentation now better communicates when a field or property accepts multiple input types but uses a single
  type for output. For example date fields on models, which usually accepts a `String` or `Date` but always outputs a
  `Date` ([#2933](https://github.com/bryntum/support/issues/2933))

### BUG FIXES

* [#3313](https://github.com/bryntum/support/issues/3313) - Allow `String`, `String[]` and `Object` in `cls` getter for subclassing `EventModel`
* [#3322](https://github.com/bryntum/support/issues/3322) - Add `dataChange` event to framework guides
* [#3343](https://github.com/bryntum/support/issues/3343) - Scrolling Scheduler Pro while dragging from outside does not resolve correct resource record
* [#3358](https://github.com/bryntum/support/issues/3358) - Event gets broken after quick drag create

## 4.2.4 - 2021-08-27

### BUG FIXES

* [#1432](https://github.com/bryntum/support/issues/1432) - Scheduler doesn't take DST into account for event duration
* [#2906](https://github.com/bryntum/support/issues/2906) - Labels are visible on non working time entries
* [#2971](https://github.com/bryntum/support/issues/2971) - ResourceTimeRangeStore updates not tracked by STM
* [#3116](https://github.com/bryntum/support/issues/3116) - Gantt throws on task terminal drag
* [#3265](https://github.com/bryntum/support/issues/3265) - Docs are not scrolled to the referenced member
* [#3295](https://github.com/bryntum/support/issues/3295) - Sync requests triggered during drag-create
* [#3305](https://github.com/bryntum/support/issues/3305) - Guides look bad in the docs search results
* [#3306](https://github.com/bryntum/support/issues/3306) - Doc browser does not scroll to member
* [#3319](https://github.com/bryntum/support/issues/3319) - Should not show event editor when double clicking nonworking time range
* [#3320](https://github.com/bryntum/support/issues/3320) - Non working resource time ranges removed after double clicking to create a new event

## 4.2.3 - 2021-08-05

### FEATURES / ENHANCEMENTS

* Project can now log warnings to the browser console when it detects an unexpected response format. To enable these
  checks please use the `validateResponse` config ([#2668](https://github.com/bryntum/support/issues/2668))
* [NPM] Bryntum Npm server now supports remote private repository access for Artifactory with username and password
  authentication ([#2864](https://github.com/bryntum/support/issues/2864))
* [TYPINGS] Type definitions now contain typed `features` configs and properties ([#2740](https://github.com/bryntum/support/issues/2740))

### API CHANGES

* [DEPRECATED] PdfExport feature `export` event is deprecated and will be removed in 4.3.0. Use `export` event on the
  SchedulerPro instead
* [DEPRECATED] SchedulerPro `beforeExport` event signature is deprecated and will be removed in 4.3.0. New signature
  wraps config object to the corresponding key

### BUG FIXES

* [#1727](https://github.com/bryntum/support/issues/1727) - Error when drag event over the histogram
* [#3116](https://github.com/bryntum/support/issues/3116) - Gantt throws on task terminal drag
* [#3182](https://github.com/bryntum/support/issues/3182) - Create React version of drag-batches example
* [#3191](https://github.com/bryntum/support/issues/3191) - New event misrendered when drag creating
* [#3203](https://github.com/bryntum/support/issues/3203) - Crud Manager not sending assignment record

## 4.2.2 - 2021-07-21

### FEATURES / ENHANCEMENTS

* [NPM] Bryntum Npm server now supports `npm token` command for managing access tokens for CI/CD ([#2703](https://github.com/bryntum/support/issues/2703))

### BUG FIXES

* [#3167](https://github.com/bryntum/support/issues/3167) - LWC bundle is missing from trial packages
* [#3178](https://github.com/bryntum/support/issues/3178) - Syntax highlighter messes up code snippets in docs
* [#3190](https://github.com/bryntum/support/issues/3190) - Crash when drag creating in SchedulerPro partnered with Gantt

## 4.2.1 - 2021-07-07

### FEATURES / ENHANCEMENTS

* [FRAMEWORKS] Added `scheduleContextFeature` to frameworks wrappers ([#3135](https://github.com/bryntum/support/issues/3135))

### BUG FIXES

* [#3117](https://github.com/bryntum/support/issues/3117) - Improve the docs to show how to access `eventRecord` in `beforeShow` listener
* [#3136](https://github.com/bryntum/support/issues/3136) - [NPM] Running `npm install` twice creates modified `package-lock.json` file
* [#3139](https://github.com/bryntum/support/issues/3139) - Support `on` and `un` methods for `eventTooltip` feature instance

## 4.2.0 - 2021-06-30

### FEATURES / ENHANCEMENTS

* Scheduler Pro has a new config option `infiniteScroll` meaning that as the user scrolls the timeline back or forward
  in time, the "window" of time encapsulated by the TimeAxis is moved ([#1114](https://github.com/bryntum/support/issues/1114))
* The `EventResize` feature now uses the task's data to change the appearance by updating `endDate` or `startDate` live
  but in batched mode so that the changes are not propagated until the operation is finished. ([#2541](https://github.com/bryntum/support/issues/2541))
* Dependencies can now be created by dropping on the target event without hitting the terminal circle element. The
  defaultValue of the DependencyModel `type` field will be used in this case. ([#3003](https://github.com/bryntum/support/issues/3003))
* Dependency creation can now be finalized asynchronously, for example after showing the user a confirmation dialog
* For more details, see [What's new](https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/whats-new/4.2.0)
  and [Upgrade guide](https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/upgrades/4.2.0) in docs

### API CHANGES

* [DEPRECATED] The `resources` param of the `beforeEventAdd` event fired by SchedulerPro was renamed
  to `resourceRecords` and will be removed in 5.0

### LOCALE UPDATES

* `removeRows` label of CellMenu & GridBase was removed
* Value of `removeRow` label of CellMenu & GridBase was updated to say just 'Remove'
* RowCopyPaste locales were updated to just say 'Copy', 'Cut' & 'Paste'. `copyRows`, `cutRows` & `pasteRows` keys were
  removed
* EventCopyPaste locales were updated to just say 'Copy', 'Cut' & 'Paste'. `copyRows`, `cutRows` & `pasteRows` keys were
  removed

### BUG FIXES

* [#3075](https://github.com/bryntum/support/issues/3075) - Task editor behaviour changed after drag create

## 4.1.6 - 2021-06-23

### FEATURES / ENHANCEMENTS

* TaskEdit has a new `scrollIntoView` boolean config allowing to opt-out of scrolling the task being edited into view
  ([#997](https://github.com/bryntum/support/issues/997))

### BUG FIXES

* [#3005](https://github.com/bryntum/support/issues/3005) - [VUE-3] Problem with Critical Paths due to Vue Proxy and double native events firing bug
* [#3026](https://github.com/bryntum/support/issues/3026) - [VUE-2] and [VUE-3] typescript type declarations are missing

## 4.1.5 - 2021-06-09

### FEATURES / ENHANCEMENTS

* Scheduler Pro now has a `minHeight` of `10em` by default. This assures that the Scheduler Pro will get a size even if
  no other sizing rules are applied for the element it is rendered to. When the default `minHeight` is driving the
  height, a warning is shown on the console to let the dev know that sizing rules are missing. The warning is not shown
  if a `minHeight` is explicitly configured ([#2915](https://github.com/bryntum/support/issues/2915))
* [TYPINGS] API singleton classes are correctly exported to typings ([#2752](https://github.com/bryntum/support/issues/2752))

### BUG FIXES

* [#674](https://github.com/bryntum/support/issues/674) - Setting field value or visibility does not work in beforeTaskEditShow when field has "name" property
  specified
* [#2889](https://github.com/bryntum/support/issues/2889) - [ANGULAR] Project model event listeners do not fire on production angular build
* [#2990](https://github.com/bryntum/support/issues/2990) - [ANGULAR] Preventable async events don't work
* [#2991](https://github.com/bryntum/support/issues/2991) - Events disappear after scrolling

## 4.1.4 - 2021-05-28

### FEATURES / ENHANCEMENTS

* TypeScript definitions updated to use typed `Partial<>` parameters where available
* Buttons now has a new style `b-transparent` that renders them without background or borders ([#2853](https://github.com/bryntum/support/issues/2853))
* [NPM] repository package `@bryntum/schedulerpro` now includes source code ([#2723](https://github.com/bryntum/support/issues/2723))
* [NPM] repository package `@bryntum/schedulerpro` now includes minified versions of bundles ([#2842](https://github.com/bryntum/support/issues/2842))
* [FRAMEWORKS] Frameworks demos packages dependencies updated to support Node v12

### BUG FIXES

* [#2104](https://github.com/bryntum/support/issues/2104) - "Core" code not isomorphic
* [#2691](https://github.com/bryntum/support/issues/2691) - Docs for ResourceNonWorkingTime feature
* [#2828](https://github.com/bryntum/support/issues/2828) - Memory leak when replacing project instance
* [#2834](https://github.com/bryntum/support/issues/2834) - Core should not use b-fa for icon prefix
* [#2858](https://github.com/bryntum/support/issues/2858) - Crash when reloading project if groups are collapsed
* [#2865](https://github.com/bryntum/support/issues/2865) - CrudManager should disable autoSync / autoLoad for all its stores
* [#2885](https://github.com/bryntum/support/issues/2885) - Fast switching tabs in TaskEditor is shows blank tab

## 4.1.3 - 2021-05-13

### FEATURES / ENHANCEMENTS

* Percent Bar feature allows to use a custom field instead of percentDone ([#2739](https://github.com/bryntum/support/issues/2739))
* Bumped the built in version of FontAwesome Free to 5.15.3 and added missing imports to allow stacked icons etc
* Bumped the `@babel/preset-env` config target to `chrome: 75` for the UMD and Module bundles. This decreased bundle
  sizes and improved performance for modern browsers
* Updated Angular Wrappers to be compatible with Angular 6-7 in production mode for target `es2015`

### API CHANGES

* Scheduler Pro's locales have a new `GanttTaskEditor` entry. It defines the width of the task editor when using Gantt's
  editor with Scheduler Pro ([#2789](https://github.com/bryntum/support/issues/2789))
* [DEPRECATED] EventDrag#dragTipTemplate was renamed to `tooltipTemplate` to better match the naming scheme of other
  features

### BUG FIXES

* [#2665](https://github.com/bryntum/support/issues/2665) - Timeline does not render events when used as container item
* [#2745](https://github.com/bryntum/support/issues/2745) - Vue 3 demo crashes when clicking left-most checkbox in tbar
* [#2778](https://github.com/bryntum/support/issues/2778) - Wrong module declaration in typings file
* [#2810](https://github.com/bryntum/support/issues/2810) - PercentBar feature cannot be disabled
* [#2820](https://github.com/bryntum/support/issues/2820) - Loading SchedulerPro styles to a Calendar demo breaks it
* [#2859](https://github.com/bryntum/support/issues/2859) - Drag feature does not update the element when drag is finalized async

## 4.1.2 - 2021-04-27

### BUG FIXES

* [#2735](https://github.com/bryntum/support/issues/2735) - Exception when resizing event with disabled dependencies feature in scheduler pro
* [#2746](https://github.com/bryntum/support/issues/2746) - Deleting predecessor in task editor should put focus back on a row/cell
* [#2761](https://github.com/bryntum/support/issues/2761) - Task editor padding missing

## 4.1.1 - 2021-04-23

### API CHANGES

* ResourceNonWorkingTime feature now has a `maxTimeAxisUnit` config to define at what time axis resolution to stop
  drawing non-working time. Defaults to 'hour', meaning when you zoom out to day view or greater the non-working
  elements will not be painted. The feature also supports configuring the Model class to use for the non-working time
  records, via `resourceTimeRangeModelClass`

### BUG FIXES

* [#2138](https://github.com/bryntum/support/issues/2138) - ResourceHistogram is not refreshed after inline data reset and load again
* [#2257](https://github.com/bryntum/support/issues/2257) - ScaleColumn of ResourceHistogram widget should be configurable
* [#2488](https://github.com/bryntum/support/issues/2488) - TaskEditor tab configuration in beforeTaskEditShow does not work correct
* [#2493](https://github.com/bryntum/support/issues/2493) - GeneralTab defines the height of the TaskEditor
* [#2606](https://github.com/bryntum/support/issues/2606) - SchedulerPro doesn't refresh events
* [#2632](https://github.com/bryntum/support/issues/2632) - Resource non-working time should not be drawn when zoomed out
* [#2636](https://github.com/bryntum/support/issues/2636) - [WRAPPERS] Features are not updated at runtime
* [#2649](https://github.com/bryntum/support/issues/2649) - Timeline should not force flex value
* [#2679](https://github.com/bryntum/support/issues/2679) - on-owner events should be added to owner too in docs
* [#2681](https://github.com/bryntum/support/issues/2681) - Yarn. Package trial alias can not be installed
* [#2697](https://github.com/bryntum/support/issues/2697) - Should be possible to select only single resource

## 4.1.0 - 2021-04-02

### FEATURES / ENHANCEMENTS

* We are happy to announce that Bryntum Scheduler Pro now can be directly installed using our npm registry
  We've updated all our frameworks demos to use `@bryntum` npm packages. See them in `examples/frameworks` folder
  Please refer to "Npm packages" guide in docs for registry login and usage information
* ProjectModel now exposes a `changes` property returning an object with the current changes in its stores
* Bryntum demos were updated with XSS protection code. `StringHelper.encodeHtml` and `StringHelper.xss` functions were
  used for this
* Added new Vue Cell Renderer demo to show Vue Components as cell renderers (Partially fixed [#946](https://github.com/bryntum/support/issues/946) - Vue: Support
  components in renderers)
* Added new React 17 demo for Scheduler with Timeline widget. The example also implements theme switching ([#1823](https://github.com/bryntum/support/issues/1823)
  and [#2213](https://github.com/bryntum/support/issues/2213))
* A new custom element was added to use the SchedulerPro inside a web component. See the new webcomponents demo for
  reference
* Added new Vue 3 demo of Scheduler Pro partnered with Resource histogram ([#1315](https://github.com/bryntum/support/issues/1315))
* Added new "Scheduler Pro event scheduling" guide describing events scheduling logic ([#2268](https://github.com/bryntum/support/issues/2268))

### API CHANGES

* [BREAKING] Removed RequireJS demos and integration guides in favor of modern ES6 Modules technology ([#1963](https://github.com/bryntum/support/issues/1963))
* [BREAKING] `init` method is no longer required in Lightning Web Components and was removed from the LWC bundle
* [DEPRECATED] In the `DependencyCreation` feature, the `data` param of all events was deprecated. All events now have
  useful documented top level params

### BUG FIXES

* [#655](https://github.com/bryntum/support/issues/655) - Cell editor misaligned if row grows as a result of cell edit
* [#695](https://github.com/bryntum/support/issues/695) - Dependency line not redrawn during resize
* [#1525](https://github.com/bryntum/support/issues/1525) - Improve Localization guide
* [#1893](https://github.com/bryntum/support/issues/1893) - [REACT] JSX renderer not supported for TreeColumn
* [#2088](https://github.com/bryntum/support/issues/2088) - Error in ResourceInfoColumn after reload inline data
* [#2211](https://github.com/bryntum/support/issues/2211) - Add test coverage for XSS
* [#2264](https://github.com/bryntum/support/issues/2264) - ResourceHistogram column header menu does not work when a feature specified
* [#2359](https://github.com/bryntum/support/issues/2359) - Update readme files in all framework demos in all products
* [#2379](https://github.com/bryntum/support/issues/2379) - Add minified version of *.lite.umd.js to the bundle
* [#2437](https://github.com/bryntum/support/issues/2437) - Demo styling issues
* [#2441](https://github.com/bryntum/support/issues/2441) - Demo control sizes and styling issues
* [#2549](https://github.com/bryntum/support/issues/2549) - Reacts timeline demo is fixed height
* [#2559](https://github.com/bryntum/support/issues/2559) - Resource Histogram demo in Vue is misconfigured

## 4.0.8 - 2021-01-27

### FEATURES / ENHANCEMENTS

* Project (Crud Manager) now supports less strict `sync` response format allowing to respond only server side changes
  See `supportShortSyncResponse` config for details

### API CHANGES

* [BREAKING] Project (Crud Manager) default behaviour has been changed to allow `sync` response to include only
  server-side changes
  Previously it was mandatory to mention each updated/removed record in the response to confirm the changes
  With this release the project automatically confirms changes of all updated/removed records mentioned in
  corresponding request
  To revert to previous strict behaviour please use `supportShortSyncResponse` config

### BUG FIXES

* [#1814](https://github.com/bryntum/support/issues/1814) - Summaries not updating correctly with Angular wrapper
* [#1865](https://github.com/bryntum/support/issues/1865) - Pro Nested events demo bugs

## 4.0.7 - 2021-01-12

### BUG FIXES

* [#2197](https://github.com/bryntum/support/issues/2197) - Broken styles in React demos

## 4.0.6 - 2020-12-29

### BUG FIXES

* [#2110](https://github.com/bryntum/support/issues/2110) - allowOverlap not working
* [#2146](https://github.com/bryntum/support/issues/2146) - enableProgressNotifications should be documented

## 4.0.5 - 2020-12-15

### FEATURES / ENHANCEMENTS

* You can now change partnership of Scheduler panels at runtime using `addPartner` / `removePartner` APIs ([#2042](https://github.com/bryntum/support/issues/2042))

### BUG FIXES

* [#2082](https://github.com/bryntum/support/issues/2082) - Not possible to configure a config object or Tooltip instance as EventResize#tip

## 4.0.4 - 2020-12-09

### FEATURES / ENHANCEMENTS

* A new config `discardPortals` on the React wrapper, that controls the behaviour of cell renderers using React
  components. Set to `false` (default) to enhance performance. Set to `true` to limit memory consumption
* A new Scheduler feature `StickyEvents` enables the textual content of event bars
  to "stick" within the scrolling viewport until the event itself is out of view. ([#390](https://github.com/bryntum/support/issues/390))

### API CHANGES

* [DEPRECATED] The `showDeleteButton` config on the TaskEdit feature was deprecated in favor of the `items` config
  ([#1526](https://github.com/bryntum/support/issues/1526))

### BUG FIXES

* [#1717](https://github.com/bryntum/support/issues/1717) - Dependency tabs bbar buttons lack height
* [#1812](https://github.com/bryntum/support/issues/1812) - Make tables look better in docs
* [#1869](https://github.com/bryntum/support/issues/1869) - Very low performance of React cell renderers
* [#1962](https://github.com/bryntum/support/issues/1962) - Dependencies are not refreshed when replace resources

## 4.0.3 - 2020-11-17

### FEATURES / ENHANCEMENTS

* `schedulerpro.umd.js` and `schedulerpro.lite.umd.js` bundles are now compiled with up-to-date `@babel/preset-env`
  webpack preset with no extra polyfilling. This change decreases size for the bundle by ~20% and offers performance
  enhancements for supported browsers
* [DEPRECATED] `schedulerpro.lite.umd.js` was deprecated in favor of `schedulerpro.umd.js` and will be removed in
  version 5.0

### BUG FIXES

* [#1681](https://github.com/bryntum/support/issues/1681) - React applications are compiled with patched `react-scripts` presets. Check
  `examples/frameworks/npm/react/readme.md` for more information
* [#1743](https://github.com/bryntum/support/issues/1743) - No way to drag outer event if it's 100% full of subtasks

## 4.0.2 - 2020-11-04

### BUG FIXES

* [#724](https://github.com/bryntum/support/issues/724) - Not possible to shift event -1d if it starts after a non-working day

## 4.0.1 - 2020-11-03

### BUG FIXES

* Fixed minor bugs

## 4.0.0 - 2020-10-19

### FEATURES / ENHANCEMENTS

* Added Bryntum Scheduler Pro with Timeline widget demo
* Added Pro example with draggable nested events ([#889](https://github.com/bryntum/support/issues/889))
* Scheduler Pro now extends `Panel` instead of `Container`. This allows you to easily add toolbars to it ([#1417](https://github.com/bryntum/support/issues/1417))
* Added Bryntum Scheduler Pro example for Ext JS modern framework ([#1471](https://github.com/bryntum/support/issues/1471))
* Added a new powerful MapboxGL JS integration demo, see examples/maps ([#1476](https://github.com/bryntum/support/issues/1476))
* Added `schedulerpro.lite.umd.js` module that does not include `Promise` polyfill. This module is primarily intended to
  be used with Angular to prevent `zone.js` polyfills overwrite
* Added experimental support for Salesforce Locking Service ([#359](https://github.com/bryntum/support/issues/359)). The distributed bundle only supports modern
  browsers (no IE11 or non-chromium based Edge), since Salesforce drops support for these in January 1st 2021 too
* Added Lightning Web Component demo, see `examples/salesforce/src/lwc`

### API CHANGES

* [BREAKING] Dropped Support for Edge 18 and older. Our Edge <=18 fixes are still in place and active, but we will not
  be adding more fixes. Existing fixes will be removed in a later version
* [BREAKING] The `Default`, `Light` and `Dark` themes were renamed to `Classic`, `Classic-Light` and `Classic-Dark`
  This change highlights the fact that they are variations of the same theme, and that it is not the default theme
  (Stockholm is our default theme since version 2.0 of Grid)
* `TaskModel.calendar` property behavior has been changed. Now it returns the task own calendar only (so it could be
  `null` if the task has no own calendar specified). To get the effective calendar used by the task please use
  `TaskModel.effectiveCalendar` which refers to the actual calendar used by the task (either the task own calendar if
  provided or the project calendar)
* Model fields in derived classes are now merged with corresponding model fields (by name) in super classes. This allows
  serialization and other attributes to be inherited when a derived class only wants to change the `defaultValue` or
  other attribute of the field
* The `dateFormat` config for `type='date'` model fields has been simplified to `format`
* Propagation caused by data loading has been changed and now supports two alternative ways (fixed [#1346](https://github.com/bryntum/support/issues/1346))
  The changes happened due to the propagation are applied either:
  1. silently: no store `change`/`update` events are triggered, records aren't modified after the propagation. This mode
     is used by default
  2. not silently: store `change`/`update` events are triggered, records are modified after the propagation
  Please check project `silenceInitialCommit` config for details
* Scheduler Pros "main" stores (EventStore, ResourceStore, AssignmentStore and DependencyStore) has had their event
  triggering modified to make sure data is in a calculated state when relevant events are triggered. This affects the
  timing of the `add`, `remove`, `removeAll`, `change` and `refresh` events. Please see the upgrade guide for more
  information ([#1486](https://github.com/bryntum/support/issues/1486))

### BUG FIXES

* [#639](https://github.com/bryntum/support/issues/639) - Toggling working time on and off does not redraw
* [#1140](https://github.com/bryntum/support/issues/1140) - taskEdit feature ignores width defined in editorConfig
* [#1249](https://github.com/bryntum/support/issues/1249) - Columns lines are not exported correctly
* [#1252](https://github.com/bryntum/support/issues/1252) - Adding predecessor removes dependency line to the successor
* [#1272](https://github.com/bryntum/support/issues/1272) - Crash when removing all resources
* [#1289](https://github.com/bryntum/support/issues/1289) - TaskEdit confirmDelete dialog doesn't support localization
* [#1313](https://github.com/bryntum/support/issues/1313) - Grouping feature throws in Scheduler Pro Resource Histogram demo
* [#1330](https://github.com/bryntum/support/issues/1330) - Event takes significant time to appear after scroll
* [#1439](https://github.com/bryntum/support/issues/1439) - Editor not shown after drag create
* [#1442](https://github.com/bryntum/support/issues/1442) - Invalid resize not reverted
* [#1461](https://github.com/bryntum/support/issues/1461) - Overlapping events styling broken
* [#1470](https://github.com/bryntum/support/issues/1470) - Replacing dataset is very slow
* [#1472](https://github.com/bryntum/support/issues/1472) - Task Editor items of two separate Scheduler Pro instances have implicit impact on each other
* [#1503](https://github.com/bryntum/support/issues/1503) - Cancelling editing of a newly added event should remove it
* [#1506](https://github.com/bryntum/support/issues/1506) - Task tooltip should not show while task editor is open
* [#1521](https://github.com/bryntum/support/issues/1521) - Resource grouping issues
* [#1538](https://github.com/bryntum/support/issues/1538) - Drag create does not respect start+end date of the drag if Event model has a default duration set
* [#1549](https://github.com/bryntum/support/issues/1549) - SchedulerPro summary feature not working
* [#1548](https://github.com/bryntum/support/issues/1548) - [ANGULAR] Investigate zone.js loading order and set it to Angular default
* [#1569](https://github.com/bryntum/support/issues/1569) - Mapping for date on nestedData doesn't work
* [#1611](https://github.com/bryntum/support/issues/1611) - Not possible to select text in Task Editor name field in Firefox
* [#1613](https://github.com/bryntum/support/issues/1613) - Tasks flicker on initial load in Firefox
* [#1622](https://github.com/bryntum/support/issues/1622) - Dependencies are drawn to unassigned events
* [#1635](https://github.com/bryntum/support/issues/1635) - Dragging task outside the timeline and back into the schedule causes a crash
* [#1659](https://github.com/bryntum/support/issues/1659) - TaskEditor demo does not remove warning icon after update
* [#1645](https://github.com/bryntum/support/issues/1645) - Angular example throws an error on expired trial version
* [#1654](https://github.com/bryntum/support/issues/1654) - autoSync doesn't send assignment data
* [#1655](https://github.com/bryntum/support/issues/1655) - autoSync keep trying to sync
* [#1668](https://github.com/bryntum/support/issues/1668) - Crash if adding features config to Timeline config object
* [#1670](https://github.com/bryntum/support/issues/1670) - Event Editor fails to initialize resource field after editing multi assigned event

## 1.0.2 - 2020-07-24

### FEATURES / ENHANCEMENTS

* Added Angular, React and Vue wrappers for Scheduler Pro and Histogram + demos. [#787](https://github.com/bryntum/support/issues/787)

### API CHANGES

* Localization moved from `SchedulerProCommon` to `DependencyType`

### BUG FIXES

* [#797](https://github.com/bryntum/support/issues/797) - View breaks after zooming out few times then clicking work time button
* [#906](https://github.com/bryntum/support/issues/906) - When select event and press enter the event editor doesn't open
* [#956](https://github.com/bryntum/support/issues/956) - Crash when clicking Add button in React basic demo
* [#1041](https://github.com/bryntum/support/issues/1041) - Changing calendar does not redraw events
* [#1084](https://github.com/bryntum/support/issues/1084) - Resource non working time only drawn for initial time span

## 1.0.1 - 2020-05-12

### BUG FIXES

* [#746](https://github.com/bryntum/support/issues/746) - Histogram doesn't track visible timespan changes

## 1.0.0-ga - 2020-05-07

* It is with great pleasure we announce the 1.0 version of the Bryntum Scheduler Pro – our brand new product
  combining the visualisation capabilities of the Bryntum Scheduler with the scheduling engine of the Bryntum Gantt
  The result is a very powerful scheduling tool, which utilises Gantt data structures to reschedule successor
  tasks while respecting constraints, dependencies and calendars. A typical use case is a Manufacturing Execution
  System (MES) where staff have defined shifts, machines need downtime for maintenance / repair and tasks are
  recurring and inter-dependent

### FEATURES / ENHANCEMENTS

* Added histogram widget + demo
* Added new `pro-drag-from-grid` demo

### API CHANGES

* BREAKING: Method `isValid` of the DependencyBaseModel is now a getter

### BUG FIXES

* [#586](https://github.com/bryntum/support/issues/586) - Histogram demo needs to show weekends
* [#599](https://github.com/bryntum/support/issues/599) - Vertical view broken in dragfromgrid demo
* [#601](https://github.com/bryntum/support/issues/601) - Drag-onto-tasks event styling a bit broken
* [#602](https://github.com/bryntum/support/issues/602) - Events are not updated when resource color is changed
* [#604](https://github.com/bryntum/support/issues/604) - Crash after removing resource in task editor and assigning new one
* [#605](https://github.com/bryntum/support/issues/605) - Dependencies not redrawn correctly when unassigning
* [#607](https://github.com/bryntum/support/issues/607) - Progress bar is missing on event
* [#611](https://github.com/bryntum/support/issues/611) - Wrong milestone styling in multi summary demo
* [#615](https://github.com/bryntum/support/issues/615) - Major column lines are not updated correctly
* [#616](https://github.com/bryntum/support/issues/616) - Unintentional header on event tooltips
* [#617](https://github.com/bryntum/support/issues/617) - Column lines out of alignment on timeaxis demo
* [#619](https://github.com/bryntum/support/issues/619) - Custom event styling broken in tasks demo
* [#622](https://github.com/bryntum/support/issues/622) - Dependencies not working in bigdataset demo
* [#625](https://github.com/bryntum/support/issues/625) - Wrong event styling in eventeditor demo
* [#629](https://github.com/bryntum/support/issues/629) - Unreadable text in `Fill ticks` demo
* [#633](https://github.com/bryntum/support/issues/633) - Nested events styling broken
* [#635](https://github.com/bryntum/support/issues/635) - Events disappear when toggling other node
* [#637](https://github.com/bryntum/support/issues/637) - Wrong event styling in validation dem
* [#646](https://github.com/bryntum/support/issues/646) - View is not updated when cancelling changes from task editor
* [#647](https://github.com/bryntum/support/issues/647) - Crash when double clicking to create new event while task editor is visible
* [#650](https://github.com/bryntum/support/issues/650) - Broken styling in weekends demo
* [#652](https://github.com/bryntum/support/issues/652) - EventEditor layout issues in material
* [#654](https://github.com/bryntum/support/issues/654) - Percent bar should not have rounded corners
* [#659](https://github.com/bryntum/support/issues/659) - Dependency lines should break at a grid based on rowHeight
* [#667](https://github.com/bryntum/support/issues/667) - ActionColumn icons in Material have too sharp black color
* [#676](https://github.com/bryntum/support/issues/676) - Improve resource histogram colors
* [#682](https://github.com/bryntum/support/issues/682) - Crash after editing duration of task
* [#684](https://github.com/bryntum/support/issues/684) - Label widths not loaded from locale
* [#688](https://github.com/bryntum/support/issues/688) - Should not save if state of task editor is invalid
* [#693](https://github.com/bryntum/support/issues/693) - Constraint is set after undo
* [#697](https://github.com/bryntum/support/issues/697) - Selected event has indistinguishable progress bar
* [#704](https://github.com/bryntum/support/issues/704) - Crash on drag after deleting a successor
* [#706](https://github.com/bryntum/support/issues/706) - Histogram crashes upon render in Safari
* [#725](https://github.com/bryntum/support/issues/725) - Crash if clearing start date field and pressing TAB
* [#732](https://github.com/bryntum/support/issues/732) - Milestones are rendered incorrectly in scheduler



<p class="last-modified">Last modified on 2023-06-30 10:24:52</p>