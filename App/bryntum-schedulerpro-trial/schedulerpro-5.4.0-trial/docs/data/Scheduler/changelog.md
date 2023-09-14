# Bryntum Scheduler version history

## 5.4.0 - 2023-06-30

### FEATURES / ENHANCEMENTS

* This release introduces a new `TimelineHistogram` class which implements a grid with histogram charts displayed
  for rows in the timeaxis section. Please check the new
  [Timeline histogram demo](https://bryntum.com/examples/scheduler/timelinehistogram/) and the "Timeline histogram"
  guide for more details
* The `EventCopyPaste` feature has been enhanced to use a page-global internal clipboard and also supports the browser's
  native Clipboard API if accessible. This means that it is possible to copy and paste events between multiple instances
  of Scheduler or other Grid-based components. It is also possible to copy an event and paste it inside a Spreadsheet
  app like Excel ([#5308](https://github.com/bryntum/support/issues/5308))
* `Widget` has a new config, `maximizeOnMobile` which takes effect only on `floating` widgets on a mobile device. It
  causes the widget to be maximized instead of positioned in order to accommodate the mobile virtual keyboard. This will
  make event editing much easier to use on mobile devices ([#6522](https://github.com/bryntum/support/issues/6522))
* On mobile devices, `type : 'checkbox'` is rendered as a `slidetoggle` widget. The API and value is the same, it is
  just a more appropriate UI for the platform
* We have added default editors for the `eventColor` field. There is one in the `EventMenu` feature's context menu
  and one in the `EventEdit` feature's event editing panel. Just set `showEventColorPickers` to true and the editors
  will appear
* There is also a new `EventColorColumn` which can be added to any Scheduler. It renders a colored element which the
  user can click and select a new color for each event
* Schedule has a new `Split` feature, that allows splitting the schedule into multiple parts (horizontally, vertically
  or both ways). Try it out in the new `split` demo ([#3917](https://github.com/bryntum/support/issues/3917))
* `EventModel` has a new `resourceIds` field, that can be used to assign multiple resources
  to the event without having to use assignment records ([#6502](https://github.com/bryntum/support/issues/6502))
* For a slightly better docs experience for most users, the docs browser now by default hides some more obscure APIs
  normally only used when implementing own widgets and features. Advanced users in need of these APIs can still opt in
  to see them using the `Show` menu in the docs browser
* Added new `multiassign-resourceids` demo showing event `resourceIds` field usage ([#6936](https://github.com/bryntum/support/issues/6936))

### API CHANGES

* The `EventCopyPaste` feature's `copyEvents` and `pasteEvents` has been made asynchronous due to the enhancements
  mentioned above
* The `EventCopyPaste` feature's `beforeCopy` and `beforePaste` events is now asynchronously preventable

### BUG FIXES

* [#5553](https://github.com/bryntum/support/issues/5553) - `reapplyFilterOnAdd` doesn't work when adding resources before loading
* [#6717](https://github.com/bryntum/support/issues/6717) - `EventEditor` bottom padding missing when setting scheduler to `readOnly = true`
* [#7077](https://github.com/bryntum/support/issues/7077) - Splitting scheduler with scrolled timeline leads to broken header
* [#7078](https://github.com/bryntum/support/issues/7078) - Paste Event menu option is visible without copying anything

## 5.3.8 - 2023-06-28

### FEATURES / ENHANCEMENTS

* [PERFORMANCE] Scheduler now offers a `ignoreDomEventsWhileScrolling` config which you can set to `true` to ignore DOM
  events fired while scrolling to maximize scroll performance

### BUG FIXES

* [#7034](https://github.com/bryntum/support/issues/7034) - STM exception when double-clicking in partly visible resource
* [#7060](https://github.com/bryntum/support/issues/7060) - [PERFORMANCE] Prevent partnering header that is hidden

## 5.3.7 - 2023-06-20

### FEATURES / ENHANCEMENTS

* `EventSelection` now offers a `deselectAllOnScheduleClick` flag to control if selection should be cleared when
  clicking the empty schedule area ([#6964](https://github.com/bryntum/support/issues/6964))

### BUG FIXES

* [#3530](https://github.com/bryntum/support/issues/3530) - State tracking manager logs incorrect steps when adding new event
* [#6389](https://github.com/bryntum/support/issues/6389) - Drag-and-Drop bug when `constrainDragToTimeSlot` set to true
* [#6589](https://github.com/bryntum/support/issues/6589) - Touch moving event to the edge of the scheduler does not scroll the view on some browsers
* [#6641](https://github.com/bryntum/support/issues/6641) - Zooming with mouse wheel broken in RTL
* [#6757](https://github.com/bryntum/support/issues/6757) - Event wrongly positioned when some specific dates used with workingTime setting
* [#6801](https://github.com/bryntum/support/issues/6801) - Paste event doesn't contain the pasted records in eventRecords
* [#6874](https://github.com/bryntum/support/issues/6874) - Fix docs and typing for `eventColor` field
* [#6875](https://github.com/bryntum/support/issues/6875) - Resource headers not rendered in vertical mode if no events exist in the initial time span
* [#6876](https://github.com/bryntum/support/issues/6876) - Preset switching in Vertical mode issue
* [#6889](https://github.com/bryntum/support/issues/6889) - Phantom event element after dragging event holding shift
* [#6908](https://github.com/bryntum/support/issues/6908) - Console error when `eventDrag` feature disabled but `dependencies` used
* [#6940](https://github.com/bryntum/support/issues/6940) - [REACT] Tooltip shows wrong time
* [#6982](https://github.com/bryntum/support/issues/6982) - [REACT] `renderEvent` not triggering
* [#7016](https://github.com/bryntum/support/issues/7016) - Context menu event creation adds the event even when canceling the event editor with `[Cancel]` button

## 5.3.6 - 2023-05-26

### API CHANGES

* [DEPRECATED] Deprecated the `getEvents()` function of `ResourceModel`, in favor of using the `events` property

### BUG FIXES

* [#6132](https://github.com/bryntum/support/issues/6132) - ScrollTo functionality does not work with `infiniteScroll` enabled
* [#6689](https://github.com/bryntum/support/issues/6689) - Setting `startDate` in EventEditor to null corrupts dates
* [#6693](https://github.com/bryntum/support/issues/6693) - Multi assigned events not rendering properly when scrolling fast
* [#6707](https://github.com/bryntum/support/issues/6707) - It deletes the two events instead one when undo after a shift copy
* [#6719](https://github.com/bryntum/support/issues/6719) - Bad styling
* [#6723](https://github.com/bryntum/support/issues/6723) - Broken rendering after changing resource column width with grouping enabled
* [#6759](https://github.com/bryntum/support/issues/6759) - [LWC] Exception is triggered when creating a dependency
* [#6777](https://github.com/bryntum/support/issues/6777) - Method cannot be called at this state!
* [#6782](https://github.com/bryntum/support/issues/6782) - Displaying a tooltip while the data is being updated throws errors
* [#6785](https://github.com/bryntum/support/issues/6785) - `eventDragSelect` does not clear previous selection
* [#6816](https://github.com/bryntum/support/issues/6816) - [REACT] `TypeError: _a.features may be undefined`

## 5.3.5 - 2023-05-11

### FEATURES / ENHANCEMENTS

* The `ResourceFilter` widget may now be configured to also filter the `resourceStore` by configuring `filterResources`
  as `true` ([#6698](https://github.com/bryntum/support/issues/6698))
* New demo showing drag from external grid onto a Tree Scheduler. Demo is located in `examples/drag-from-grid-to-tree`
  folder
* Added `eventClick` for nested events in the scheduler example called 'Nested events' ([#6412](https://github.com/bryntum/support/issues/6412))
* Column widths and hide/show state are synced between partnered schedulers with identical column sets ([#6682](https://github.com/bryntum/support/issues/6682))

### BUG FIXES

* [#6384](https://github.com/bryntum/support/issues/6384) - Inconsistent tool order in header of inline collapsed panel
* [#6659](https://github.com/bryntum/support/issues/6659) - Artefact in web sockets demo
* [#6663](https://github.com/bryntum/support/issues/6663) - Bad colors for selected event in react event renderer demo
* [#6664](https://github.com/bryntum/support/issues/6664) - Flicker when event resize starts
* [#6680](https://github.com/bryntum/support/issues/6680) - `TimeAxisViewModel` should round calculated start date to top header increment if possible
* [#6681](https://github.com/bryntum/support/issues/6681) - `DatePicker`'s `activeDate` should persist while it is focused
* [#6699](https://github.com/bryntum/support/issues/6699) - Should record only 1 STM transaction for drag-create and following task edit user actions
* [#6701](https://github.com/bryntum/support/issues/6701) - [IONIC] `Scrollbar` width could not be determined under Ionic framework
* [#6730](https://github.com/bryntum/support/issues/6730) - Multiple events are draggable even when `multiEventSelect` is `false`

## 5.3.4 - 2023-04-28

### FEATURES / ENHANCEMENTS

* CrudManager now optionally includes the owning Scheduler's `startDate` and `endDate` as params in its load requests,
  via the `passStartEndParameters` config flag in Scheduler ([#6552](https://github.com/bryntum/support/issues/6552))

### BUG FIXES

* [#6403](https://github.com/bryntum/support/issues/6403) - Dropping events past noon gives unexpected results
* [#6438](https://github.com/bryntum/support/issues/6438) - Support `stickyEvents` feature in RTL mode
* [#6584](https://github.com/bryntum/support/issues/6584) - Row select blinking on mobile after first select
* [#6645](https://github.com/bryntum/support/issues/6645) - Rendering breaks having two schedulers using different viewpresets
* [#6647](https://github.com/bryntum/support/issues/6647) - Tooltip offset increase on every show when dependencies feature enabled
* [#6652](https://github.com/bryntum/support/issues/6652) - Minified UMD bundle does not export `bryntum` namespace

## 5.3.3 - 2023-04-21

### FEATURES / ENHANCEMENTS

* New `state` demo showing how to implement saving of UI state in the Scheduler
* `EventDragSelect` now offer to extend selections by pressing CTRL or CMD-key ([#6536](https://github.com/bryntum/support/issues/6536))
* Scheduler now shows a group divider line between resource groups in vertical mode ([#6568](https://github.com/bryntum/support/issues/6568))
* `ResourceTimeRanges` can now be recurring out of the box, without the need for mixing in recurrence support on the
  store and model classes ([#6611](https://github.com/bryntum/support/issues/6611))
* [ANGULAR] Bryntum Scheduler now ships with two npm Angular wrapper packages to support different versions of Angular
  framework. Existing `@bryntum/scheduler-angular` package is now designed to work with Angular 12 and newer versions,
  which use the IVY rendering engine. New `@bryntum/scheduler-angular-view` package is designed to work with Angular 11
  and older versions, which use the View Engine rendering. Check Upgrading and Angular integration guides in
  documentation for more information ([#6270](https://github.com/bryntum/support/issues/6270))
* [ANGULAR] `angular-11-routing` demo has been upgraded to show use of `@bryntum/scheduler-angular-view` package with
  Angular 11. Demo is located in `examples/frameworks/angular/angular-11-routing/` folder
* [ANGULAR] `basic`, `dependencies`, `drag-between-schedulers`, `drag-onto-tasks`, `filtering`, `localization`,
  `pdf-export`, `recurring-events` and `tasks` demos have been upgraded to use Angular 15. Demos are located in
  subfolders inside `examples/frameworks/angular/` folder
* [ANGULAR] legacy `angular-6`, `angular-7` and `angular-8` demos has been removed

### API CHANGES

* Time axis filters that produce an empty timeline are now temporarily disabled while you zoom. Filters should ideally
  check the `scheduler.timeaxis.unit` property to only apply it to relevant zoom levels

### BUG FIXES

* [#6070](https://github.com/bryntum/support/issues/6070) - Filtering `timeAxis` to exclude weekends produces wrong results
* [#6411](https://github.com/bryntum/support/issues/6411) - Dependencies not redrawn when filtering rows in tree view
* [#6415](https://github.com/bryntum/support/issues/6415) - `zoomIn`/`zoomOut` doesn't work properly with RTL + `zoomPosition`
* [#6426](https://github.com/bryntum/support/issues/6426) - [REACT] Portals are re-created while resizing event
* [#6436](https://github.com/bryntum/support/issues/6436) - `ZoomIn`/`zoomOut` does not keep center when RTL direction used
* [#6439](https://github.com/bryntum/support/issues/6439) - Timeline jumps to wrong dates when change direction to RTL at runtime with `infiniteScroll` enabled
* [#6547](https://github.com/bryntum/support/issues/6547) - `TimeSpan` timeZone-field missing in types
* [#6551](https://github.com/bryntum/support/issues/6551) - Drag create shows invalid when using `showExactResizePosition` in 1 month increment resolution
* [#6555](https://github.com/bryntum/support/issues/6555) - Nothing is displayed when having a single resource with variable resource widths
* [#6567](https://github.com/bryntum/support/issues/6567) - Scheduler should only respond to `datachange` when visible
* [#6569](https://github.com/bryntum/support/issues/6569) - Dependencies feature disables `eventTooltip`'s offset config
* [#6592](https://github.com/bryntum/support/issues/6592) - The tooltip does not display well and is cut off on the right side
* [#6593](https://github.com/bryntum/support/issues/6593) - Toggling `EventResize` disabled state does not show resize handles

## 5.3.2 - 2023-04-04

### FEATURES / ENHANCEMENTS

* [REACT] Added new TypeScript demo "Drag from Grid". Demo is located in
  `examples/frameworks/react/typescript/drag-from-grid` ([#4891](https://github.com/bryntum/support/issues/4891))
* The `crudmanager` demo was updated to use a more extensive PHP + MySQL backend, based on the backend from the `php`
  demo in Gantt

### API CHANGES

* The time resolution increment for the `minuteAndHour` view preset was changed from 30 minutes to 15 minutes, plus
  the zoom order was slightly adjusted to prevent resolution increment from increasing when zooming in ([#6446](https://github.com/bryntum/support/issues/6446))

### BUG FIXES

* [#3789](https://github.com/bryntum/support/issues/3789) – `UndoRedo` widget doesn't catch the project if configured standalone in Angular
* [#5546](https://github.com/bryntum/support/issues/5546) - Event drag create when using `showExactResizePosition` doesn't show invalid rendition for `0` duration
  event
* [#6037](https://github.com/bryntum/support/issues/6037) - Inconsistent event menu actions when multiple events are selected
* [#6058](https://github.com/bryntum/support/issues/6058) - Widget's `showAnimation` config not working properly
* [#6064](https://github.com/bryntum/support/issues/6064) - Incorrect rendering of a timeaxis when `forceFit` enabled
* [#6105](https://github.com/bryntum/support/issues/6105) - Inconsistent event menu copy/cut/paste actions when multiple events are selected
* [#6150](https://github.com/bryntum/support/issues/6150) - `scrollToDate` with animation does not work at edges of date buffer
* [#6321](https://github.com/bryntum/support/issues/6321) - Built in `DateField` validation not working properly
* [#6349](https://github.com/bryntum/support/issues/6349) - Optimize dependency hovering performance
* [#6392](https://github.com/bryntum/support/issues/6392) - Tree Scheduler with initial filters on the resource store renders too early
* [#6395](https://github.com/bryntum/support/issues/6395) - Fixed angular production build of `StateProvider` helper classes
* [#6407](https://github.com/bryntum/support/issues/6407) - Start and end date is incorrect in `timeAxisHeaderContextMenu`
* [#6434](https://github.com/bryntum/support/issues/6434) - Syncing added events redraws multiple times
* [#6437](https://github.com/bryntum/support/issues/6437) - Touch moving event to the edge of the scheduler does not scroll the view
* [#6484](https://github.com/bryntum/support/issues/6484) - Invisible cells repainted with wrong data
* [#6511](https://github.com/bryntum/support/issues/6511) - Should not allow dropping events completely out of view

## 5.3.1 - 2023-03-17

### API CHANGES

* `ProjectModel` convenience getter methods (`events`, `resources` etc) now returns `allRecords` instead of `records`
* Date parsing was made more forgiving in regard to character used to separate date parts. For example these strings are
  now all acceptable as `HH:mm`: `10:20`, `10 20`, `10-20`, `10/20` ([#6344](https://github.com/bryntum/support/issues/6344))

### BUG FIXES

* [#5711](https://github.com/bryntum/support/issues/5711) - Infinite scrolling doesn't work in RTL mode
* [#6057](https://github.com/bryntum/support/issues/6057) - Copy-paste allow overlapping when `allowOverlap` is disabled
* [#6108](https://github.com/bryntum/support/issues/6108) - Crashes after clicking on time axis header cell
* [#6228](https://github.com/bryntum/support/issues/6228) - `timeAxisHeaderMenuBeforeShow` is not documented
* [#6248](https://github.com/bryntum/support/issues/6248) - Context menus in vertical mode doesn't work as expected
* [#6293](https://github.com/bryntum/support/issues/6293) - Multi event drag produces invalid results
* [#6299](https://github.com/bryntum/support/issues/6299) - `scheduleContext` feature is throwing error when using with `fillTicks`
* [#6302](https://github.com/bryntum/support/issues/6302) - `5.3.0` TypeScript typing issues
* [#6309](https://github.com/bryntum/support/issues/6309) - Error on `CrudManager.revertChanges()`
* [#6311](https://github.com/bryntum/support/issues/6311) - Crash when adding new resource in grouped vertical mode
* [#6339](https://github.com/bryntum/support/issues/6339) - `scrollEventIntoView()` does not scroll with `extendTimeAxis : false`
* [#6343](https://github.com/bryntum/support/issues/6343) - Events empty after scrolling
* [#6345](https://github.com/bryntum/support/issues/6345) - Tooltip doesn't show overlap error when trying to overlap by `eventResize`
* [#6351](https://github.com/bryntum/support/issues/6351) - Components do not render into containers not already in DOM
* [#6354](https://github.com/bryntum/support/issues/6354) - Timeline disappears if removing Scheduler from DOM then putting it back
* [#6356](https://github.com/bryntum/support/issues/6356) - Event overlap not prevented on resize with multi assigned events
* [#6366](https://github.com/bryntum/support/issues/6366) - `selectEvent` doesn't work as expected for recurring instances

## 5.3.0 - 2023-03-02

### FEATURES / ENHANCEMENTS

* The CSS used to support `eventStyle` and `eventColor` was changed, reducing the size of the unminified Scheduler
  specific CSS from just below 500kB down to 110kB, while also making it easier for us to add more colors and styles
  in the future
* Support for Time zone conversion has been added to all Bryntum scheduling products. Simply set a IANA time zone
  identifier as value for the `timeZone` config and that's it. But, since time zones is not supported natively in
  JavaScript we strongly recommend to read our Time zone guide ([#1533](https://github.com/bryntum/support/issues/1533))
* Scheduler now does less processing of already visible events when scrolling, boosting scroll performance with large
  number of events on screen simultaneously ([#5651](https://github.com/bryntum/support/issues/5651))
* Localization demos updated to show up-to-date localization approach
* `AjaxHelper.fetch` now supports using request body to pass parameters for non-GET requests. Please check
  `addQueryParamsToBody` argument in the method documentation ([#2855](https://github.com/bryntum/support/issues/2855))
* Vertical mode now supports grouping resources ([#1395](https://github.com/bryntum/support/issues/1395))
* [REACT] React components can now be used in event renderers ([#763](https://github.com/bryntum/support/issues/763))
* [REACT] New example that shows how to use React components in event renderers. Demo is localed in
  `examples/frameworks/react/javascript/react-events` folder.
* Lots (but not all) of the not so informative `object` types in our TypeScript typings have been replaced with more
  specific types. Objects that in our JavaScript are used as maps are now declared as `Record<keyType, valueType>`, and
  for functions that accept object arguments many are replaced with anonymous type declarations, such as
  `{ foo: string, bar: number }` (Partially fixed [#5176](https://github.com/bryntum/support/issues/5176))
* Tooltips in the `react-tooltips` demo are now rich, with resource avatar and event times ([#6184](https://github.com/bryntum/support/issues/6184))

### API CHANGES

* [DEPRECATED] `LocaleManager.registerLocale` and `LocaleManager.extendLocale` are deprecated.
  `LocaleHelper.publishLocale` should be used instead.
* [BREAKING] The `syncEventRecord()` function of the `RecurrenceEditor` was made private, it was unintentionally public
  before and there is no reason to use it directly.
* When configuring a Scheduler with a time zone at initialization, and there's also a `startDate` and/or a `endDate`
  initially, those days will be treated as in local system time zone and will therefore be converted to the configured
  time zone. Previously (in `5.3.0-alpha-1` and `5.3.0-beta-1`) those dates was treated as in the provided time zone

### LOCALE UPDATES

* Locales format and process for applying locales have been simplified
* New locales for 31 languages have been added. Currently available languages are listed in the localization guide
  (Guides/Customization/Localization)

### BUG FIXES

* [#5856](https://github.com/bryntum/support/issues/5856) - `Intl.supportedValuesOf` fallback in time zone demos
* [#5889](https://github.com/bryntum/support/issues/5889) - Events are not rendered according to the timezone when scheduler has a timezone
* [#5968](https://github.com/bryntum/support/issues/5968) - Scroll To Date In RTL not working correctly
* [#5986](https://github.com/bryntum/support/issues/5986) - `eventStyle: 'line'` broken
* [#6139](https://github.com/bryntum/support/issues/6139) - Wrong behavior with `fillTicks` and `snapRelativeToEventStartDate`
* [#6216](https://github.com/bryntum/support/issues/6216) - Event elements lost after reverting changes
* [#6217](https://github.com/bryntum/support/issues/6217) - `toggleNode` event doesn't get triggered for parent with `children : true`
* [#6234](https://github.com/bryntum/support/issues/6234) - Event bar disappears on drop with filtered timeaxis, `snapRelativeToEventStart` & `fillTicks`
* [#6250](https://github.com/bryntum/support/issues/6250) - `showCurrentTimeLine` not working on filtered timeaxis
* [#6260](https://github.com/bryntum/support/issues/6260) - Milestone is rendered incorrectly

## 5.2.10 - 2023-02-17

### FEATURES / ENHANCEMENTS

* The `beforeSend` event triggered by `CrudManager` now allows async listeners ([#6011](https://github.com/bryntum/support/issues/6011))

### API CHANGES

* Recently browsers have added support for Unicode 15, which changes the output of `Intl.DateTimeFormat` when
  formatting time to include `AM`/`PM`. Those browsers now use "thin space" (`\u202f`) instead of regular space. This
  affects the `DateHelper.format()` function, but likely you do not need to take any action in your application. It
  also affects `DateHelper.parse()`, which has been updated to support the new unicode space ([#6193](https://github.com/bryntum/support/issues/6193))
* [DEPRECATED] The `eventRecord` and `assignmentRecord` params of the `eventKeyDown` & `eventKeyUp` events fired by
  Scheduler were renamed to `eventRecords` and `assignmentRecords` to match the type (array)

### BUG FIXES

* [#5109](https://github.com/bryntum/support/issues/5109) - `StickyContents` not working correctly during `dragMove` in Safari
* [#5605](https://github.com/bryntum/support/issues/5605) - Enable mouse Events config in Resource Time Range feature triggers an error
* [#5607](https://github.com/bryntum/support/issues/5607) - Dependencies lines "lose" position when dragging
* [#5781](https://github.com/bryntum/support/issues/5781) - Problem with pan enabled for 2 partnered schedulers
* [#5829](https://github.com/bryntum/support/issues/5829) - Dependencies are rendered incorrectly after zooming
* [#5977](https://github.com/bryntum/support/issues/5977) - Chained `resourceStore` doesn't work as expected
* [#6027](https://github.com/bryntum/support/issues/6027) - `eventKeyUp` and `eventKeyDown` not being triggered correctly
* [#6094](https://github.com/bryntum/support/issues/6094) - Error appeared on drop event into empty scheduler
* [#6109](https://github.com/bryntum/support/issues/6109) - `ScheduleContext` feature cannot be disabled
* [#6113](https://github.com/bryntum/support/issues/6113) - `SimpleEventEdit` editor has wrong size in vertical mode
* [#6119](https://github.com/bryntum/support/issues/6119) - Zoom In with dependencies enabled stuck the Scheduler with big dataset
* [#6159](https://github.com/bryntum/support/issues/6159) - `EventEdit` modal popup shows anchor arrow on first display

## 5.2.9 - 2023-01-30

### FEATURES / ENHANCEMENTS

* The event editor of the `EventEdit` feature may be reconfigured to not be a popup by configuring the `editorConfig`
  with `floating : false` or by adding an `appendTo` config. In this situation, the editor is displayed as a side-docked
  overlay. See the new docked-editor example ([#5873](https://github.com/bryntum/support/issues/5873))

### BUG FIXES

* [#5006](https://github.com/bryntum/support/issues/5006) - Add `ViewPreset` base property to documentation and TS types
* [#5956](https://github.com/bryntum/support/issues/5956) - `ResizeObserver` loop limit exceeded warning
* [#5971](https://github.com/bryntum/support/issues/5971) - Dependency terminals not shown when enabling feature at runtime
* [#5974](https://github.com/bryntum/support/issues/5974) - Unable to extend 5971 without specifying `'headers'`
* [#5979](https://github.com/bryntum/support/issues/5979) - Summary cell opens context menu on vertical mode
* [#6019](https://github.com/bryntum/support/issues/6019) - [TypeScript] Feature classes and configs have `on` event handlers exposed on owner class

## 5.2.8 - 2023-01-19

### BUG FIXES

* [#5386](https://github.com/bryntum/support/issues/5386) - Improved panel collapse animation when collapsed panel header is perpendicular to expanded
* [#5814](https://github.com/bryntum/support/issues/5814) - `StateProvider` throws during component construction
* [#5913](https://github.com/bryntum/support/issues/5913) - Scheduler states it's still dragging, when canceling event drop in `beforeEventDropFinalize`
* [#5931](https://github.com/bryntum/support/issues/5931) - Deprecated API use. Handle size is from CSS
* [#5957](https://github.com/bryntum/support/issues/5957) - Console error when removing events in vertical mode
* [#5960](https://github.com/bryntum/support/issues/5960) - TypeError: `this.docScrollListener is not a function`

## 5.2.7 - 2023-01-11

### API CHANGES

* [DEPRECATED] The `EventDrag` feature's events `beforeEventDrag` and `eventDragStart` property `event` will be replaced
  by `domEvent` in 6.0. This to make it more clear that it refers to the original event from the `DOM` that initiated
  the Bryntum event ([#5818](https://github.com/bryntum/support/issues/5818))
* [DEPRECATED] The `handleSize` and `touchHandleSize` configs to the `EventResize` feature is deprecated and will no
  longer have any effect. The handle size is determined from the theme's CSS ([#5882](https://github.com/bryntum/support/issues/5882))

### BUG FIXES

* [#2258](https://github.com/bryntum/support/issues/2258) - Dragged task hangs on drop position when drag and drop is finalized in `beforeEventDropFinalize` handler
* [#3995](https://github.com/bryntum/support/issues/3995) - Using chained `eventStore` caused an error
* [#4411](https://github.com/bryntum/support/issues/4411) - `DragCreate` fails when event store is reloaded while dragging
* [#4862](https://github.com/bryntum/support/issues/4862) - Scheduler Pro percent bar in vertical mode wrong UI
* [#5604](https://github.com/bryntum/support/issues/5604) - Empty timerange line header
* [#5729](https://github.com/bryntum/support/issues/5729) - Dependency creation difficult on touch devices
* [#5850](https://github.com/bryntum/support/issues/5850) - Zooming out on partnered schedulers crashes when infiniteScroll is enabled
* [#5891](https://github.com/bryntum/support/issues/5891) - Support `sort` feature in vertical mode

## 5.2.6 - 2022-12-28

### FEATURES / ENHANCEMENTS

* [REACT] React wrapper now supports React components in widgets and tooltips ([#774](https://github.com/bryntum/support/issues/774))
* Dependencies feature now fires `dependencyContextMenu` event when right clicking a dependency line ([#5800](https://github.com/bryntum/support/issues/5800))

### BUG FIXES

* [#4455](https://github.com/bryntum/support/issues/4455) - Copy-paste event to collapsed group should be a no-op
* [#4569](https://github.com/bryntum/support/issues/4569) - Row outlined after event copy paste
* [#5486](https://github.com/bryntum/support/issues/5486) - Horizontal scrollbar overlaps when the view becomes smaller
* [#5817](https://github.com/bryntum/support/issues/5817) - Zoomed scheduler time header looks incorrect after exporting to multiple pages
* [#5822](https://github.com/bryntum/support/issues/5822) - The `endDate` remains frozen when moving events more than once
* [#5825](https://github.com/bryntum/support/issues/5825) - Infinite scroll demo shows lots of Toasts
* [#5830](https://github.com/bryntum/support/issues/5830) - "No records to display" label is wrongly rendered

## 5.2.5 - 2022-12-16

### FEATURES / ENHANCEMENTS

* Scheduler previously supported including milestone labels in the layout calculations to avoid overlap in a mode that
  "stretches" the diamonds (by configuring a `milestoneLayoutMode`). It can now do the same for the normal milestone
  rendition by combining  `milestoneLayoutMode` with the new `milestoneTextPosition : 'always-outside'` setting. The
  `milestonelayout` demo was updated to showcase this ([#3483](https://github.com/bryntum/support/issues/3483))
* `RowCopyPaste` feature supports copying rows in a tree. Copied records will have same hierarchy
* Paste after cut and copy behavior is unified, records are moved below the paste target
* Event drag feature is improved to allow copying dragged event. To copy, press and hold copy key (`Shift` by
  default). Copy can either add new assignment (default) or copy the event itself, this behavior is controlled
  by `copyMode` config. ([#4940](https://github.com/bryntum/support/issues/4940))
* The `Dependencies` feature has a new `clickWidth` config, that lets you enlarge the clickable area for dependency
  lines. Tradeoff being that the lines will be more expensive to draw. The `dependencies` demo has been updated
  with a slider for adjusting it ([#41](https://github.com/bryntum/support/issues/41))

### BUG FIXES

* [#5036](https://github.com/bryntum/support/issues/5036) - Zooming not centered where the cursor is
* [#5163](https://github.com/bryntum/support/issues/5163) - Context menu not working correctly inside the schedule
* [#5267](https://github.com/bryntum/support/issues/5267) - Copy action not copying child resources
* [#5378](https://github.com/bryntum/support/issues/5378) - Resource gets hidden on event creation in first parent resource
* [#5545](https://github.com/bryntum/support/issues/5545) - Center date is not restored correctly if state contains different size for locked grid
* [#5668](https://github.com/bryntum/support/issues/5668) - Chained `resourceStores` from one `CrudManager` works incorrect
* [#5710](https://github.com/bryntum/support/issues/5710) - Error in Widget detection of RTL environment
* [#5724](https://github.com/bryntum/support/issues/5724) - Scheduler crashes when resources children changed to boolean
* [#5731](https://github.com/bryntum/support/issues/5731) - Time axis cells are recycled when making schedule area small
* [#5770](https://github.com/bryntum/support/issues/5770) - CopyPaste doesn't work with mapped event id field
* [#5780](https://github.com/bryntum/support/issues/5780) - ICS export datetime stamp is not UTC

## 5.2.4 - 2022-11-28

### FEATURES / ENHANCEMENTS

* We recently launched a new homepage over at [bryntum.com](https://bryntum.com), and have now slightly updated the
  styling for demos and docs to better match it (new logo, new header color, new font). Please note that this is not a
  change to our themes, only the look of the demos, and it won't affect your application

### BUG FIXES

* [#4463](https://github.com/bryntum/support/issues/4463) - Event drag create on big dataset generates error
* [#5307](https://github.com/bryntum/support/issues/5307) - [React] error when changing Scheduler dataset in React Advanced demo
* [#5541](https://github.com/bryntum/support/issues/5541) - Timeline header is not rendered when calling `zoomToFit`
* [#5595](https://github.com/bryntum/support/issues/5595) - Fix panel collapse icon directions
* [#5633](https://github.com/bryntum/support/issues/5633) – Crash when changing bar margin slider in demo

## 5.2.3 - 2022-11-17

### FEATURES / ENHANCEMENTS

* The `Dependencies` feature has a new `drawOnScroll` config, that controls whether dependencies are dawn during scroll
  or only when scrolling ends. Setting it to `false` will boost scrolling performance for schedules with many
  dependencies ([#5555](https://github.com/bryntum/support/issues/5555))
* Pan and EventDragSelect features now offer preventable `beforePan` and `beforeEventDragSelect` events which give you
  better control over when each feature is active.
* The `EventModel.split` function can now accept a duration to split at in the form of a string such as `'30 min'`. The
  duration of the event will be converted into the specified units if they are different. The new event's duration will
  be in the same units. Splitting using a fraction of the event duration will continue to work as usual.

### BUG FIXES

* [#4868](https://github.com/bryntum/support/issues/4868) - Events UI does not update when using batch mode and update custom field
* [#5535](https://github.com/bryntum/support/issues/5535) - Inconsistent End Date information in event tooltip when zooming out
* [#5551](https://github.com/bryntum/support/issues/5551) - Store `allRecords` includes group footers twice
* [#5578](https://github.com/bryntum/support/issues/5578) - [LWC] `onScheduleScroll` listener should be disabled for Salesforce

## 5.2.2 - 2022-11-08

### API CHANGES

* [DEPRECATED] The behaviour of the `store.data` getter will be changed in 6.0. Currently, it returns the **initial**
  raw dataset, in 6.0 it will be changed to have the more expected behaviour of returning the data objects for the
  **current** state instead. See Grid's upgrade guide for more information ([#5499](https://github.com/bryntum/support/issues/5499))

### BUG FIXES

* [#3600](https://github.com/bryntum/support/issues/3600) - Hide resize handle if disabled on feature level
* [#5500](https://github.com/bryntum/support/issues/5500) - `eventResizeEnd` doesn't return the resized `eventRecord`
* [#5520](https://github.com/bryntum/support/issues/5520) - [LWC] Scheduler throws on body scroll if pan feature is active

## 5.2.1 - 2022-10-28

### BUG FIXES

* [#1996](https://github.com/bryntum/support/issues/1996) - Maximum call stack size exceeded when updating event `resourceId`
* [#4443](https://github.com/bryntum/support/issues/4443) - `MergeCells` set `true` resources are not collapsing correctly
* [#5149](https://github.com/bryntum/support/issues/5149) - Angular demos now use component-local styles using `ViewEncapsulation.None`
* [#5377](https://github.com/bryntum/support/issues/5377) - `hideHeaders` crashing vertical mode when combined with `FilterBar` feature
* [#5388](https://github.com/bryntum/support/issues/5388) - `DragHelper` misplaces drag proxy on a scrolled page
* [#5422](https://github.com/bryntum/support/issues/5422) - Scheduler "Custom event styling" demo has wrong styles
* [#5431](https://github.com/bryntum/support/issues/5431) - `Pan` feature interferes with row reordering
* [#5432](https://github.com/bryntum/support/issues/5432) - `Pan` feature buggy when reaching edge of window
* [#5446](https://github.com/bryntum/support/issues/5446) - Wrong event position on invalid drop with `expandOnCellClick` enabled
* [#5447](https://github.com/bryntum/support/issues/5447) - Exception on console when clear time and date on event edit
* [#5457](https://github.com/bryntum/support/issues/5457) - Drag creating events fails with multiple vertical schedulers on a scrolled page
* [#5465](https://github.com/bryntum/support/issues/5465) - `EventStore.filter()` does not trigger refresh

## 5.2.0 - 2022-10-13

### FEATURES / ENHANCEMENTS

* A new widget, `ViewPresetCombo`, is available to Scheduler, SchedulerPro and Gantt. Put it in the toolbar, and it will
  provide easy-to-setup view switching. It uses the built-in `ViewPreset`s functionality which is easily customized
  ([#4539](https://github.com/bryntum/support/issues/4539))
* New `booking` demo, mimicking a real property booking interface
* ResourceTimeRanges feature now has a `enableMouseEvents` flag which lets you interact with the resource time range
  elements ([#1069](https://github.com/bryntum/support/issues/1069))
* The `TimeRanges` feature was refactored to support virtualization, it now only renders lines and ranges in view. This
  also applies to the `NonWorkingTime` feature, and will boost rendering performance on long time axes when either
  feature is used ([#3757](https://github.com/bryntum/support/issues/3757))
* Added a new `collapsible-columns` demo showing how to use collapsible column groups ([#4878](https://github.com/bryntum/support/issues/4878))
* You can now select a custom time span in the timeline header, see new `time-selection` demo ([#2676](https://github.com/bryntum/support/issues/2676))
* The `NonWorkingTime` feature was made aware of the `fillTicks` config, cropping the non-working-time ranges for a
  better look when `fillTicks` is enabled
* A new `EventNonWorkingTime` feature was added. When enabled, the parts of the event bars that intersect weekends will
  be shaded. Can be tried in the updated `nonworkingdays` demo ([#5150](https://github.com/bryntum/support/issues/5150))
* Menu has a `separator` config to make it easier to visually separate menu items
* The responsive state objects used in the `responsive` config of the `Responsive` mixin now support a `once` property
  to allow configs to only be set on first activation of the state
* The `Core.helper.DateHelper` class has a new method `formatRange` method which can format date ranges, as well as new
  formatting options for week numbers
* The `TreeGroup` feature introduced in 5.0.0 has been reworked and now also works in Scheduler. Check it out in the new
  `tree-grouping` demo
* PdfExport feature is refactored to render content directly. This significantly improves performance and robustness by
  eliminating component scrolling. This behavior is enabled by default. You can revert to the old behavior by setting
  `enableDirectRendering` config on the export feature to `false`. ([#4449](https://github.com/bryntum/support/issues/4449))

### API CHANGES

* [DEPRECATED] The `highlightWeekends` config of the `NonWorkingTime` feature is superfluous, disabling the feature will
  yield the same result. It has been deprecated and will be removed in 6.0

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

## 5.1.4 - 2022-09-29

### FEATURES / ENHANCEMENTS

* The `ScheduleContext` feature now offers a `triggeredBy` config which may be `'mouseover'`. It also offers
  a `renderer` which allows applications to customize the highlight style. Scheduler now fires a `timelineContextChange`
  event when the mouse moves from tick to tick and row to row within the schedule region. ([#5035](https://github.com/bryntum/support/issues/5035))

### API CHANGES

* [DEPRECATED] The `events` config of `SchedulerDatePicker` has been renamed to `showEvents`. The `events` property is
  deprecated but will continue to work during its deprecation period
* [DEPRECATED] The 3rd param of the `scrollResourceEventIntoView` was deprecated and will be removed in a future release
* [DEPRECATED] The 2nd param of the `scrollAssignmentIntoView` was deprecated and will be removed in a future release

### BUG FIXES

* [#3198](https://github.com/bryntum/support/issues/3198) - Order of events changes on scrolling if `eventLayout: 'none'`
* [#4374](https://github.com/bryntum/support/issues/4374) - Console error if return false on preventable `beforeAdd` event on dependency store
* [#4995](https://github.com/bryntum/support/issues/4995) - Should not allow creating or dragging events for `readOnly` resources
* [#5066](https://github.com/bryntum/support/issues/5066) - Visual Splitter glitch in docs demo
* [#5130](https://github.com/bryntum/support/issues/5130) - Scheduler partnering in vertical mode should use vertical scroll sync
* [#5155](https://github.com/bryntum/support/issues/5155) - Timeline scrolls when event creation canceled
* [#5170](https://github.com/bryntum/support/issues/5170) - When first region has width and last region is collapsed, Scheduler doesn't resize with container
* [#5231](https://github.com/bryntum/support/issues/5231) - `eventDragSelect` does not select events when scrolling
* [#5272](https://github.com/bryntum/support/issues/5272) - Group Summary not updating when display in header
* [#5315](https://github.com/bryntum/support/issues/5315) - Scheduler has no vertical lines in vertical mode
* [#5316](https://github.com/bryntum/support/issues/5316) - `AvatarRendering` should always set alt text by default

## 5.1.3 - 2022-09-09

### BUG FIXES

* [#415](https://github.com/bryntum/support/issues/415) - Improve docs on formatting currency values on `NumberField`
* [#3680](https://github.com/bryntum/support/issues/3680) - Support Salesforce Winter 22 release
* [#5062](https://github.com/bryntum/support/issues/5062) - Drag from grid demo is missing invalid indicator
* [#5125](https://github.com/bryntum/support/issues/5125) - Setting an initial value for `activeTab` on a `TabPanel` no longer animates that tab into view
* [#5135](https://github.com/bryntum/support/issues/5135) - Event is not selected after `Ctrl + click` following a multi-drag

## 5.1.2 - 2022-08-29

### FEATURES / ENHANCEMENTS

* Configs that accept configuration options for a widget (or other class) are now (mostly) documented to accept a typed
  config object rather than a plain object. For example instead of `{Object} tooltip - A tooltip configuration object`,
  it is now `{TooltipConfig} tooltip - A tooltip configuration object`. This improves our TypeScript typings (transforms
  to `Partial<TooltipConfig>` in typings) when using such configs, but also improves our docs by linking to the configs
  of the type
* Added a config to allow State Tracking Manager to ignore remote changes coming in a sync response. This allows user
  to only undo/redo local changes (`ignoreRemoteChangesInSTM` config on the ProjectModel/CrudManager) ([#5083](https://github.com/bryntum/support/issues/5083))

### BUG FIXES

* [#2124](https://github.com/bryntum/support/issues/2124) - UI issues related to recurring events
* [#2806](https://github.com/bryntum/support/issues/2806) - Browser freezes while vertically scrolling Scheduler with many events selected
* [#4225](https://github.com/bryntum/support/issues/4225) - Wrong `endDate` when dragging events over days at which DST/STD change
* [#4835](https://github.com/bryntum/support/issues/4835) - Summary feature showing incorrect values when enabled after scheduler initialization
* [#4897](https://github.com/bryntum/support/issues/4897) - `ResourceFilter` should continue to filter when its own `Store` is filtered
* [#4943](https://github.com/bryntum/support/issues/4943) - Changing the time by dragging an event triggering an error
* [#4965](https://github.com/bryntum/support/issues/4965) - Dependency creation still working when readOnly is true
* [#4981](https://github.com/bryntum/support/issues/4981) - `copy` event menu item not able to copy multiple events
* [#4999](https://github.com/bryntum/support/issues/4999) - `AjaxStore` `beforeRequest` doesn't allow to make changes in request body
* [#5017](https://github.com/bryntum/support/issues/5017) - [TypeScript] Property type is missing in `DataFieldConfig`
* [#5018](https://github.com/bryntum/support/issues/5018) - [Vue] Prop Validation fails for `String` options
* [#5076](https://github.com/bryntum/support/issues/5076) - Cannot configure customized `ViewPreset` set
* [#5078](https://github.com/bryntum/support/issues/5078) - `eventDrag` feature should support `tip` being configured away
* [#5117](https://github.com/bryntum/support/issues/5117) - Drag drop stops working after drop during scrolling
* [#5122](https://github.com/bryntum/support/issues/5122) - Dependencies not rendered after expanding parent nodes in a tree resource data set
* [#5124](https://github.com/bryntum/support/issues/5124) - Improve docs for `eventMouseEnter` and `eventMouseLeave`

## 5.1.1 - 2022-07-28

### BUG FIXES

* [#4637](https://github.com/bryntum/support/issues/4637) - `mergeCells` is not reactive to row height
* [#4849](https://github.com/bryntum/support/issues/4849) - Scheduler Pro with dependencies | Vertical mode + Resize
* [#4908](https://github.com/bryntum/support/issues/4908) - Collapsing resource tree column changes dependency lines
* [#4957](https://github.com/bryntum/support/issues/4957) - `ScheduleContext` feature does not offer information about the selected context

## 5.1.0 - 2022-07-21

### FEATURES / ENHANCEMENTS

* The `Dependencies` feature was refactored, it now supports vertical mode (shown in the new vertical-dependencies demo)
  and also continuously redraws dependencies during drag, resize and transitions. In addition to this it now also allows
  customizing the marker (arrow head), applying a radius to line corners for a more rounded look and taking full control
  over what enters the DOM using a `renderer` function ([#4579](https://github.com/bryntum/support/issues/4579))
* Scheduler `ResourceModel` now has a `columnWidth` field which is used in vertical mode ([#734](https://github.com/bryntum/support/issues/734))
* Our TypeScript typings for string types that have a predefined set of alternatives was improved to only accept
  those alternatives. For example previously the `dock` config which was previously declared as `dock: string` is now
  `dock : 'top'|'right'|'bottom'|'left'`
* Create React App templates now available
* Configuring the CrudManager was made a little easier by introducing shortcuts for setting load and sync urls using the
  new `loadUrl` and `syncUrl` configs
* Updated the built-in version of FontAwesome Free to `6.1.1`
* `KeyMap` is a mixin that allows for standardized and customizable keyboard shortcuts functionality. `KeyMap` is by
  default  mixed in to `Widget` and therefore available to all `Widget`'s child classes. There is a new guide
  **Guides/Customization/Keyboard shortcuts** describing how to customize currently integrated keyboard shortcuts
  ([#4300](https://github.com/bryntum/support/issues/4300), [#4313](https://github.com/bryntum/support/issues/4313), [#4328](https://github.com/bryntum/support/issues/4328))
* CrudManager uses `parentIndex` field to insert record to the correct position in the store ([#4720](https://github.com/bryntum/support/issues/4720))
* CrudManager optionally allows `sync()` calls without local changes, to retrieve changes from the backend. Configure
  `forceSync : true` to enable this new behaviour ([#4575](https://github.com/bryntum/support/issues/4575))
* The dependency hover tooltip can now be configured using the new `tooltipTemplate` config on the Dependencies feature
  ([#1063](https://github.com/bryntum/support/issues/1063))
* The tooltip shown while creating new dependencies can now be configured using the new `creationTooltipTemplate` config
  on the Dependencies feature ([#4655](https://github.com/bryntum/support/issues/4655))

### API CHANGES

* [BREAKING] [ANGULAR] Angular wrappers now use the more modern module bundle by default, instead of the legacy umd
  bundle. Hence application imports must be changed to match. This will slightly improve application size and
  performance ([#2786](https://github.com/bryntum/support/issues/2786))
* [BREAKING] `schedulerpro.lite.umd.js` bundle is no longer available
* [BREAKING] WebComponents has been removed from `scheduler.module.js` ES modules bundle. New bundle with WebComponents
  is `scheduler.wc.module.js`
* [BREAKING] The `draw()`, `drawDependency()`, `getConnectorEndSide()`, `getConnectorStartSide()`,
  `refreshDependency()` and `releaseDependency()` functions on the `Dependencies` feature has mistakenly been public
  ever since the feature was created. With the refactoring described above they are all now either removed or made
  private
* [DEPRECATED] The `drawForEvent()` fn of the `Dependencies` feature was deprecated. Calling it should no longer be
  necessary
* Removed the `removeUnassignedEvent` config from Scheduler. It was moved to `EventStore` back in 4.0 and was supposed
  to have been removed at the same time, it has not had any effect since

### BUG FIXES

* [#4681](https://github.com/bryntum/support/issues/4681) - STM issues when using w/ backend
* [#4684](https://github.com/bryntum/support/issues/4684) - Highlighted dependencies loose highlight on hover
* [#4685](https://github.com/bryntum/support/issues/4685) - Dependency creation tooltip layout broken
* [#4691](https://github.com/bryntum/support/issues/4691) - Scheduler responsive demo with small screen width
* [#4694](https://github.com/bryntum/support/issues/4694) - Scheduler dependencies: "Drop anywhere" is not re-enabled after re-checking the button
* [#4696](https://github.com/bryntum/support/issues/4696) - Parents sorted below children in docs
* [#4697](https://github.com/bryntum/support/issues/4697) - Too dark code background in docs
* [#4850](https://github.com/bryntum/support/issues/4850) - Time range label misplaced when `showHeaderElements` is `false`

## 5.0.7 - 2022-07-13

### BUG FIXES

* [#1667](https://github.com/bryntum/support/issues/1667) - Changing `rowHeight` and `barMargin` breaks the layout
* [#3363](https://github.com/bryntum/support/issues/3363) - Allow "Change only this event" option for a master event
* [#4681](https://github.com/bryntum/support/issues/4681) - STM issues when using with backend
* [#4703](https://github.com/bryntum/support/issues/4703) - Resources disappear if removed all and added new in scrolled position
* [#4756](https://github.com/bryntum/support/issues/4756) - PDF export hangs trying to restore component
* [#4881](https://github.com/bryntum/support/issues/4881) - Visible timeline is not restored properly for a scheduler with `infiniteScroll`
* [#4888](https://github.com/bryntum/support/issues/4888) - Event disappear after dragdrop
* [#4899](https://github.com/bryntum/support/issues/4899) - Timeline header is rendered incorrectly after restoring app state
* [#4916](https://github.com/bryntum/support/issues/4916) - `Fullscreen` is not working on mobile Safari

## 5.0.6 - 2022-06-20

### FEATURES / ENHANCEMENTS

* TimeRange feature now fires `timeRangeHeaderClick`,  `timeRangeHeaderDblClick` and  `timeRangeHeaderContextMenu`
  events when interacting with the header elements ([#4790](https://github.com/bryntum/support/issues/4790))

### BUG FIXES

* [#4748](https://github.com/bryntum/support/issues/4748) - Occurrence content element has wrong CSS class
* [#4777](https://github.com/bryntum/support/issues/4777) - Web sockets demo broken
* [#4778](https://github.com/bryntum/support/issues/4778) - Body mask now tracks grid resize to maintain cover of the body
* [#4808](https://github.com/bryntum/support/issues/4808) - Typings are wrong for async functions

## 5.0.5 - 2022-05-30

### FEATURES / ENHANCEMENTS

* Pan feature now is now also enabled when dragging in the time axis header. Can be disabled with the new
  `enableInHeader` config ([#4594](https://github.com/bryntum/support/issues/4594))
* You can now render custom HTML contents inside TimeRange elements using the `headerRenderer` and `bodyRenderer`
  methods ([#4613](https://github.com/bryntum/support/issues/4613))
* Added `paste` and `copy` events to the `EventCopyPaste` feature ([#4552](https://github.com/bryntum/support/issues/4552))

### BUG FIXES

* [#4468](https://github.com/bryntum/support/issues/4468) - Event disappears if dropped over group head
* [#4478](https://github.com/bryntum/support/issues/4478) - Vertical time axis in Scheduler should show time labels aligned with lines like calendar week view
* [#4589](https://github.com/bryntum/support/issues/4589) - `EventDrag` broken if async validation finalized without delay in `beforeEventDropFinalize`
* [#4591](https://github.com/bryntum/support/issues/4591) - `response.message` not shown in error mask in case of response code not `200`
* [#4592](https://github.com/bryntum/support/issues/4592) - `UndoRedo` needs the `transactionsCombo` emptyText localized
* [#4607](https://github.com/bryntum/support/issues/4607) - [VUE] Incorrect prop types in Vue wrapper
* [#4615](https://github.com/bryntum/support/issues/4615) - Vertical scrolling broken in vertical mode
* [#4667](https://github.com/bryntum/support/issues/4667) - Turn off infinite scroll feature when exporting to PDF

## 5.0.4 - 2022-05-11

### FEATURES / ENHANCEMENTS

* The behaviour of the `EventCopyPaste` feature in a multi assignment scheduler is now better defined and also
  configurable using the new `copyPasteAction` config on the feature ([#4495](https://github.com/bryntum/support/issues/4495))
* On a similar note the behaviour of `EventDragSelect` was also improved in a multi assigned scheduler. It now selects
  the assignments within the selection marquee rather than the events, giving you better control

### API CHANGES

* [DEPRECATED] The `records` param of the `beforeCopy` and `beforePaste` events triggered by the `EventCopyPaste`
  feature was deprecated in favour of the new `eventRecords` param

### BUG FIXES

* [#3832](https://github.com/bryntum/support/issues/3832) - Change from invalid resourceId to valid resourceId of event throws error
* [#4526](https://github.com/bryntum/support/issues/4526) - DragMove doesn't work on touch enabled laptops
* [#4562](https://github.com/bryntum/support/issues/4562) - [REACT] React wrappers have incorrect source mapping urls

## 5.0.3 - 2022-04-26

### API CHANGES

* The `validateResponse` flag on `CrudManager` has been changed to default to `true`. When enabled, it validates
  `CrudManager` responses from the backend and outputs a message on console if the format isn't valid. This is helpful
  during the development phase, but can be turned off in production
* New Vue 2/3 wrapper config option `relayStoreEvents` (defaults to `false`). When set to `true`, the events fired
  by stores are relayed to the Bryntum Grid instance
* [REACT] React wrappers now include TypeScript definitions ([#3378](https://github.com/bryntum/support/issues/3378))

### BUG FIXES

* [#4127](https://github.com/bryntum/support/issues/4127) - [LWC] `DomHelper.isInView()` throws
* [#4222](https://github.com/bryntum/support/issues/4222) - [LWC] Performance degradation in 5.0 release
* [#4225](https://github.com/bryntum/support/issues/4225) - Wrong `endDate` when dragging events over days at which DST/STD change
* [#4387](https://github.com/bryntum/support/issues/4387) - ASPNet demos should use trial packages in trial distribution
* [#4432](https://github.com/bryntum/support/issues/4432) - [LWC] Mouse events do not work
* [#4461](https://github.com/bryntum/support/issues/4461) - [Vue] wrapper triggers doubled `dataChange` events with different params
* [#4484](https://github.com/bryntum/support/issues/4484) - `zoomToFit` does not work correctly when `infiniteScroll` is enabled

## 5.0.2 - 2022-04-13

### FEATURES / ENHANCEMENTS

* `ResourceFilter` in `Sidebar` should be configurable with custom selection ([#2006](https://github.com/bryntum/support/issues/2006))
* EventDrag now adds `b-drop-target` class to all valid drop target elements on drag start when
  an `externalDropTargetSelector` is provided. ([#3888](https://github.com/bryntum/support/issues/3888))
* The previously private event `visibleRangeChange` has been removed in favour of the public
  event `visibleDateRangeChange`. If your app made use of this event, please replace the event name
  ([#3876](https://github.com/bryntum/support/issues/3876))
* You can now set event drag-drop validity in the eventDrag listener ([#4441](https://github.com/bryntum/support/issues/4441))

### BUG FIXES

* [#3528](https://github.com/bryntum/support/issues/3528) - Content Security Policy (csp) demo doesn't work in Scheduler
* [#4219](https://github.com/bryntum/support/issues/4219) - Milestones not rendered in vertical view
* [#4298](https://github.com/bryntum/support/issues/4298) - `b-animating` class added/removed while dragging task onto schedule
* [#4371](https://github.com/bryntum/support/issues/4371) - Summary tooltip should not be shown for empty cells
* [#4397](https://github.com/bryntum/support/issues/4397) - Bad alignment in header
* [#4406](https://github.com/bryntum/support/issues/4406) - Fixed items in disabled `fieldset`/`radiogroup` not being disabled
* [#4412](https://github.com/bryntum/support/issues/4412) - Batch column updates do not show until next column update
* [#4416](https://github.com/bryntum/support/issues/4416) - `MergeCells` feature prevents scrolling time axis
* [#4426](https://github.com/bryntum/support/issues/4426) - Should be possible to invalidate an external drop by setting valid flag to `false`
* [#4467](https://github.com/bryntum/support/issues/4467) - Changing the tree column causes expand icon sync issues
* [#4480](https://github.com/bryntum/support/issues/4480) - Milestone element misplaced while dragging

## 5.0.1 - 2022-03-04

### BUG FIXES

* [#4267](https://github.com/bryntum/support/issues/4267) - Disabling resources field breaks task editor
* [#4275](https://github.com/bryntum/support/issues/4275) - SASS Compilation Error when min/max conflicts with native CSS
* [#4278](https://github.com/bryntum/support/issues/4278) - `cellContextMenu` not working
* [#4283](https://github.com/bryntum/support/issues/4283) - Crashing when exporting after filtering out a resource
* [#4293](https://github.com/bryntum/support/issues/4293) - `scrollEventIntoView` bug when event falls in time span not matching `workingTime`

## 5.0.0 - 2022-02-21

* We are thrilled to announce version 5.0 of our Scheduler product. This release marks a big milestone for us, after
  more than a year of development. This update makes it much easier to combine multiple Bryntum products, and also
  includes new demos, improved state management as well as bug fixes and other enhancements requested by our community
  A big thanks to our customers who helped us with testing our alpha & beta versions
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
  files are name `[product].[theme].thin.css` - `scheduler.stockholm.thin.css` for example. They are intended for using
  when you have multiple different bryntum products on the same page, to avoid including shared CSS multiple times
  Read more about it in the `What's new` section in docs ([#3276](https://github.com/bryntum/support/issues/3276))
* `Model` has a new `readOnly` field that is respected by UI level editing features to disallow editing records having
  `readOnly : true`. It does not directly affect the datalayer, meaning that you can still programmatically edit the
  records ([#665](https://github.com/bryntum/support/issues/665))
* New `drag-from-list` demo showing how to drag items from an external List widget onto events in the schedule
  ([#3904](https://github.com/bryntum/support/issues/3904))
* Scheduler's event rendering now uses absolute positioning instead of translation to position the event bars. This
  was changed to make native `position: sticky` work, the `stickyEvents` feature is now very thin and more performant
  ([#4055](https://github.com/bryntum/support/issues/4055))
* New `ProjectModel` setters/getters for `assignments`, `dependencies`, `events`, `resourceTimeRanges`, `resources`,
  `timeRanges` ([#4043](https://github.com/bryntum/support/issues/4043))
* New `deselectOnClick` to allow simple deselection of events with click ([#3221](https://github.com/bryntum/support/issues/3221))
* `window` references are replaced with `globalThis` which is supported in all modern browsers and across different JS
  environments ([#4071](https://github.com/bryntum/support/issues/4071))
* A new function called `downloadTestCase()` was added to Bryntum widgets, it is intended to simplify creating test
  cases for reporting issues on Bryntum's support forum. Running it collects the current value for the configs your app
  is using, inlines the current dataset and compiles that into a JavaScript app that is then downloaded. The app will
  most likely require a fair amount of manual tweaking to reproduce the issue, but we are hoping it will simplify the
  process for you. Run `scheduler.downloadTestCase()` on the console in a demo to try it
* The TimeAxis class now lets you change the `generateTicks` method during runtime ([#4199](https://github.com/bryntum/support/issues/4199))
* Updated FontAwesome to version 6, which includes some new icons sponsored by Bryntum in the charts category:
  https://fontawesome.com/search?m=free&c=charts-diagrams&s=solid
* When configured with a StateProvider and `stateId`, Scheduler state is stored automatically as stateful properties
  change ([#1859](https://github.com/bryntum/support/issues/1859))
* Scheduler´s selectAssignment & deselectAssignment methods now receives the native DOM event allowing you to
  implement custom selection behaviors ([#4234](https://github.com/bryntum/support/issues/4234))

### API CHANGES

* [BREAKING] React wrappers now use the more modern module bundle by default, instead of the legacy umd bundle. Hence
  application imports must be changed to match. This will slightly improve application size and performance
  ([#2787](https://github.com/bryntum/support/issues/2787))
* [DEPRECATED] Schedulers `horizontalEventSorterFn` config was deprecated and will be removed in 6.0. It was replaced by
  a new `overlappingEventSorter` config, which works identically but has a better name ([#3716](https://github.com/bryntum/support/issues/3716))
* Code of drag-from-grid and similar demos have been simplified and if you have used that code in your application you
  should make sure to review and update your code accordingly
* Event bar root node now uses CSS grid layout for its internal layout. This may affect your appearance if you have
  customized the event bar markup
* The following previously deprecated Scheduler configs, functions etc. where removed:
* `EventContextMenu` feature - previously replaced by `EventMenu` feature
* `HeaderContextMenu` feature - previously replaced by `TimeAxisHeaderMenu` feature
* `ScheduleContextMenu` feature - previously replaced by `ScheduleMenu` feature
* Argument `draggedRecords` of the `EventDrag#validatorFn()` function - previously replaced by `assignmentRecords`
      and `eventRecords`
* Config `EventEdit#showResourceField` - previously replaced by `resourceField` property in `items` config
* Config `EventEdit#resourceFieldConfig` - previously replaced by `resourceField` property in `items` config
* Config `EventEdit#autoClose` - previously replaced by `autoClose` property in `editorConfig` config
* Config `EventEdit#showDeleteButton` - previously replaced by `deleteButton` property in `items` config
* Config `EventEdit#showNameField` - previously replaced by `nameField` property in `items` config
* Config `EventEdit#startTimeConfig` - previously replaced by `startTimeField` property in `items` config
* Config `EventEdit#startDateConfig` - previously replaced by `startDateField` property in `items` config
* Config `EventEdit#endTimeConfig` - previously replaced by `endTimeField` property in `items` config
* Config `EventEdit#endDateConfig` - previously replaced by `endDateField` property in `items` config
* Config `EventEdit#extraItems` - previously replaced by `items` config
* Param `resourceRecord` of the `EventEdit#beforeEventSave` event - previously replaced by `resourceRecords` param
* Event `TimeAxisColumn#timeAxisHeaderClick` - previously replaced by the same event on Scheduler
* Event `TimeAxisColumn#timeAxisHeaderDblClick` - previously replaced by the same event on Scheduler
* Event `TimeAxisColumn#timeAxisHeaderContextMenu` - previously replaced by the same event on Scheduler
* Function `CrudManager#commit()` - previously replaced by `acceptChanges()`
* Function `CrudManager#reject()` - previously replaced by `revertChanges()`
* Function `CrudManager#commitCrudStores()` - previously replaced by `acceptChanges()`
* Function `CrudManager#rejectCrudStores()` - previously replaced by `revertChanges()`
* Property `CrudManager#timeRangesStore` - previously replaced by `timeRangeStore`
* Function `DependencyStore#getEventPredecessors()` - previously replaced by `event.predecessors`
* Function `DependencyStore#getEventSuccessors()` - previously replaced by `event.successors`
* Function `EventStore#getEventsInTimeSpan()` - previously replaced by `getEvents()`
* Function `EventStore#getEventsByStartDate()` - previously replaced by `getEvents()`
* Arguments `startText`, `endText`, `startClockHtml`, `endClockHtml` & `dragData` of `EventDrag#tooltipTemplate()`
* Param `context` of the `EventDrag#beforeEventDrag` event
* Param `context` of the `EventDrag#eventDragStart` event
* Param `context` of the `EventDrag#eventDrag` event
* Param `context` of the `EventDrag#eventDragAbort` event
* Param `newEventRecord` of the `EventDragCreate#dragCreateEnd` event - previously replaced by `eventRecord`
* Param `proxyElement` of the `EventDragCreate#dragCreateEnd` event - previously replaced by `eventElement`
* Param `proxyElement` of the `EventDragCreate#dragCreateStart` event - previously replaced by `eventElement`
* Param `proxyElement` of the `EventDragCreate#beforeDragCreateFinalize` event - previously replaced by 
      `eventElement`
* Param `proxyElement` of the `EventDragCreate#afterDragCreate` event - previously replaced by `eventElement`
* Config `ResourceTimeRanges#store` - previously replaced by `Scheduler#resourceTimeRangeStore`
* Config `ResourceTimeRanges#resourceTimeRanges` - previously replaced by `Scheduler#resourceTimeRanges`
* Config `TimeRanges#store` - previously replaced by `Scheduler#timeRangeStore`
* Config `TimeRanges#timeRanges` - previously replaced by `Scheduler#timeRanges`
* Param `data.source` of the `Dependencies#beforeDependencyCreateDrag` event - previously replaced by `source` param
* Param `data` of the `Dependencies#dependencyCreateDragStart` event - previously replaced by top level params
* Param `data` of the `Dependencies#dependencyValidationComplete` event - previously replaced by top level params
* Param `data` of the `Dependencies#dependencyValidationStart` event - previously replaced by top level params
* Param `data` of the `Dependencies#dependencyCreateDrop` event - previously replaced by top level params
* Param `data` of the `Dependencies#afterDependencyCreateDrop` event - previously replaced by top level params
* Property `DependencyModel#sourceEvent` - previously replaced by `fromEvent`
* Property `DependencyModel#targetEvent` - previously replaced by `toEvent`
* Function `DependencyModel#getSourceEvent()` - previously replaced by `fromEvent`
* Function `DependencyModel#getTargetEvent()` - previously replaced by `toEvent`
* Argument `tplData` of `Scheduler#eventRenderer()` - previously replaced by `renderData`
* Param `tplData` of the `Scheduler#renderEvent` event - previously replaced by `renderData`
* Param `resources` of the `Scheduler#beforeEventAdd` event - previously replaced by `resourceRecords`
* Function `Scheduler#getVisibleDateRange()` - previously replaced by property `visibleDateRange`
* Config `EventDrag#dragTipTemplate` - previously replaced by `tooltipTemplate`
* Event `Scheduler#beforeExport` - in favor of `beforePdfExport` event
* Event `Scheduler#export` - in favor of `pdfExport` event

### BUG FIXES

* [#758](https://github.com/bryntum/support/issues/758) - State mixin to use configurable's `onConfigChange` hook
* [#1953](https://github.com/bryntum/support/issues/1953) - When constrainDragToTimeline is false the dragging outside a scheduler should be invalid
* [#1954](https://github.com/bryntum/support/issues/1954) - Create a demo showing drag events to grid
* [#2192](https://github.com/bryntum/support/issues/2192) - Events rendering is broken when prevent multiple event drag which is not constrained to the timeline
* [#3069](https://github.com/bryntum/support/issues/3069) - Nested events misrendered if startDate starts before visible area
* [#3829](https://github.com/bryntum/support/issues/3829) - Extra element appears after invalid drag drop when constrainDragToTimeline is disabled
* [#4147](https://github.com/bryntum/support/issues/4147) - Milestone label overlaps element
* [#4151](https://github.com/bryntum/support/issues/4151) - Bad animation when `constrainToTimeline` is false
* [#4207](https://github.com/bryntum/support/issues/4207) - `getDateConstraints` not working in vertical Scheduler
* [#4212](https://github.com/bryntum/support/issues/4212) - Error thrown when event is updated in a non-painted scheduler
* [#4227](https://github.com/bryntum/support/issues/4227) - Event drag drop is broken in closed shadow root
* [#4239](https://github.com/bryntum/support/issues/4239) - Vertical mode crashes if endDate is not provided in data

## 4.3.9 - 2022-02-17

### BUG FIXES

* [#4121](https://github.com/bryntum/support/issues/4121) - Reasonable minimum task bar in both `Gantt` and `Scheduler`
* [#4167](https://github.com/bryntum/support/issues/4167) - `EventDrag` feature does not allow configuration of its tooltip
* [#4184](https://github.com/bryntum/support/issues/4184) - `DomClassList` not updated when cls changes using `syncDataOnLoad`

## 4.3.8 - 2022-02-07

### BUG FIXES

* [#4100](https://github.com/bryntum/support/issues/4100) - `DependencyStore` does not sync when updating dependency

## 4.3.7 - 2022-02-02

### API CHANGES

* [DEPRECATED] Scheduler `beforeExport` and `export` events (triggered by `PdfExport` feature) were deprecated in favor
  of the `beforePdfExport` and `pdfExport` events respectively. The old event names will be dropped in v5.0.0

### BUG FIXES

* [#630](https://github.com/bryntum/support/issues/630) - Drag drop is not finalized correctly when fillTicks is enabled
* [#4050](https://github.com/bryntum/support/issues/4050) - `Tooltip` aligned on clipped out area of target element
* [#4051](https://github.com/bryntum/support/issues/4051) - `CellTooltip` does not update on next show for the same row, when its record is mutated
* [#4082](https://github.com/bryntum/support/issues/4082) - Relayed listeners do not trigger onFunctions
* [#4092](https://github.com/bryntum/support/issues/4092) - Code editor wrongly positioned in theme example

## 4.3.6 - 2022-01-13

### BUG FIXES

* [#3779](https://github.com/bryntum/support/issues/3779) - Dependencies aren't attached to correct task after scrolling
* [#3798](https://github.com/bryntum/support/issues/3798) - The Cancel button of the recurrence confirmation dialog doesn't cause rerender
* [#3933](https://github.com/bryntum/support/issues/3933) - An error when using multiSelect filter field config for tree column
* [#3974](https://github.com/bryntum/support/issues/3974) - Crash after dragging event with no content element
* [#3976](https://github.com/bryntum/support/issues/3976) - Grid Column needs a maxWidth config
* [#3990](https://github.com/bryntum/support/issues/3990) - Chrome & Content Security Policy causes failure because of debug code section
* [#3994](https://github.com/bryntum/support/issues/3994) - Scheduler fails to scroll for drag-create when row-reorder is enabled

## 4.3.5 - 2021-12-24

### API CHANGES

* [DEPRECATED] ResourceInfoColumn `validNames` is deprecated and will be removed in 6.0

### BUG FIXES

* [#3544](https://github.com/bryntum/support/issues/3544) - dragCreate takes wrong dates if weekStartDay is not default
* [#3752](https://github.com/bryntum/support/issues/3752) - Restoring state after `filterBy` on grid (or scheduler) crashes
* [#3815](https://github.com/bryntum/support/issues/3815) - Event listeners stop working properly after scroll using Firefox
* [#3896](https://github.com/bryntum/support/issues/3896) - [TypeScript] Wrong typings of model class configs
* [#3899](https://github.com/bryntum/support/issues/3899) - `ScheduleTooltip` feature should forward own configuration into it's tooltip the same as `TooltipBase`
* [#3907](https://github.com/bryntum/support/issues/3907) - [TypeScript] Cannot pass Scheduler instance to `Store.relayAll`
* [#3918](https://github.com/bryntum/support/issues/3918) - Event tooltip stays visible on target change if `hideOnDelegateChange` is enabled
* [#3927](https://github.com/bryntum/support/issues/3927) - TimeAxis available space set too narrow on TimeAxisSubGrid resize
* [#3928](https://github.com/bryntum/support/issues/3928) - DateHelper `k` format behaves incorrectly

## 4.3.4 - 2021-12-13

### FEATURES / ENHANCEMENTS

* Updated `advanced`, `animations`, `custom-event-editor` and `drag-from-grid` Angular demos to use Angular 13
  ([#3742](https://github.com/bryntum/support/issues/3742))
* Added Angular demo which shows using TimeRanges feature with recurring time spans and TypeScript mixins. Demo is
  located at `examples\angular\recurring-timeranges`
* Added React demo which shows using TimeRanges feature with recurring time spans TypeScript mixins. Demo is located
  at `examples\react\typescript\recurring-timeranges`

### BUG FIXES

* [#3495](https://github.com/bryntum/support/issues/3495) - Extra scrollbar space when resizing partner panels
* [#3508](https://github.com/bryntum/support/issues/3508) - Deleting all future events does not update recurrenceRule
* [#3621](https://github.com/bryntum/support/issues/3621) - [TypeScript] Improve typings of mixins
* [#3699](https://github.com/bryntum/support/issues/3699) - Export generates empty pages if scrolled to bottom before
* [#3737](https://github.com/bryntum/support/issues/3737) - EventStore's LoadDateRange is too large on ViewPreset changes
* [#3759](https://github.com/bryntum/support/issues/3759) - Touch drag starts event drag creation
* [#3763](https://github.com/bryntum/support/issues/3763) - EventStore's LoadDateRange emits twice on ViewPreset changes
* [#3767](https://github.com/bryntum/support/issues/3767) - Incorrect expand/collapse functionality when the resources are initially collapsed
* [#3801](https://github.com/bryntum/support/issues/3801) - Scheduler - White space appearing at the bottom of a tree grid
* [#3830](https://github.com/bryntum/support/issues/3830) - resourceRecord param undefined when pasting event using [Ctrl V]
* [#3834](https://github.com/bryntum/support/issues/3834) - Make the copy paste suffix configurable
* [#3837](https://github.com/bryntum/support/issues/3837) - Scheduler with autoHeight places scrollbar below foreground canvas
* [#3850](https://github.com/bryntum/support/issues/3850) - [TypeScript] Missing static properties in typings
* [#3852](https://github.com/bryntum/support/issues/3852) - Crash if zooming while hovering event resize handle
* [#3853](https://github.com/bryntum/support/issues/3853) - Cannot set row height for scheduler webcomponent
* [#3854](https://github.com/bryntum/support/issues/3854) - `DependencyColumn` does not produce valid value for the Filter Feature
* [#3856](https://github.com/bryntum/support/issues/3856) - Dragged event bar maintains sticky event styling after aborted drag

## 4.3.3 - 2021-11-30

### FEATURES / ENHANCEMENTS

* `EventSelection` now offers an `isEventSelectable` template method which you can implement to prevent some events from
  being selected ([#3647](https://github.com/bryntum/support/issues/3647))
* Scroll performance when using `StickyEvents` was improved by not processing events that are fully in view
  ([#3709](https://github.com/bryntum/support/issues/3709))

### API CHANGES

* The `EventTooltip` feature now hides the tooltip on scroll by default, whereas it previously realigned it. This change
  was done to boost scrolling performance, since realigning the tooltip has negative impact on that. To restore the old
  behaviour, configure the feature with `scrollAction : 'realign'`

### BUG FIXES

* [#3370](https://github.com/bryntum/support/issues/3370) - Recurring range performance issue if many ranges used
* [#3620](https://github.com/bryntum/support/issues/3620) - Milestone's left/right label position is off
* [#3635](https://github.com/bryntum/support/issues/3635) - Drag Error with `constrainDragToTimeline: false`
* [#3640](https://github.com/bryntum/support/issues/3640) - Left/right labels not vertically centered in demo
* [#3645](https://github.com/bryntum/support/issues/3645) - Dependency links are not shown up at browser zoom level 75%
* [#3648](https://github.com/bryntum/support/issues/3648) - [DOCS] Content navigation is broken
* [#3662](https://github.com/bryntum/support/issues/3662) - Partnered scheduler collapse state not synced
* [#3683](https://github.com/bryntum/support/issues/3683) - Not possible to set `constrainDragToTimeline` in `beforeEventDragListener`
* [#3700](https://github.com/bryntum/support/issues/3700) - [REACT] Equipment list empty in drag-onto-tasks demo
* [#3702](https://github.com/bryntum/support/issues/3702) - Events not shown when `eventId` or `resourceId` of assignments use dataSource
* [#3715](https://github.com/bryntum/support/issues/3715) - Infinite scroll changes height of Timeline viewport momentarily
* [#3720](https://github.com/bryntum/support/issues/3720) - `dataSource` property not working on dependency from and to fields
* [#3735](https://github.com/bryntum/support/issues/3735) - `eventMenuBeforeShow` event doesn't expose browser event
* [#3740](https://github.com/bryntum/support/issues/3740) - Support async `beforeshow` event on a widget
* [#3743](https://github.com/bryntum/support/issues/3743) - [DOCS] `web.config` file for Windows IIS server
* [#3785](https://github.com/bryntum/support/issues/3785) - `infiniteScroll` does not re-center when clicking the rightmost point of the horizontal scrollbar
* [#3800](https://github.com/bryntum/support/issues/3800) - Investigate performance with recurring `ResourceTimeRanges`

## 4.3.2 - 2021-10-29

### FEATURES / ENHANCEMENTS

* `EventCopyPaste` feature now fires `beforeCopy` and `beforePaste` events to let you prevent the actions ([#3303](https://github.com/bryntum/support/issues/3303))
* Added a new React demo that shows how to use state to bind events and resources to Scheduler. Demo is located in
  `examples/frameworks/react/javascript/react-state` folder ([#3366](https://github.com/bryntum/support/issues/3366))

### BUG FIXES

* [#3442](https://github.com/bryntum/support/issues/3442) - Recurring events doesn't work in vertical mode
* [#3603](https://github.com/bryntum/support/issues/3603) - ResourceTimeRange showing content from reused event element
* [#3604](https://github.com/bryntum/support/issues/3604) - Events still rendered after returning false from beforeEventAdd listener

## 4.3.1 - 2021-10-21

### FEATURES / ENHANCEMENTS

* Added a new demo using a big data set in a tree scheduler, called `bigdataset-tree`. Optionally also displays
  ResourceTimeRanges and Dependencies
* Bumped builtin Font Awesome Free to version 5.15.4

### BUG FIXES

* [#2481](https://github.com/bryntum/support/issues/2481) - `EventCopyPaste` forces single assignment mode
* [#2495](https://github.com/bryntum/support/issues/2495) - Should be possible to disable `StickyEvents` dynamically
* [#2696](https://github.com/bryntum/support/issues/2696) - Resource Histogram is not aligned when partnered on the fly
* [#3432](https://github.com/bryntum/support/issues/3432) - [ANGULAR] `EventTooltip` template is shown only once when displaying customElement
* [#3479](https://github.com/bryntum/support/issues/3479) - Crash after removing multiple events using keyboard
* [#3515](https://github.com/bryntum/support/issues/3515) - Setting `resourceTimeRange` store data breaks the view
* [#3523](https://github.com/bryntum/support/issues/3523) - Dragging events with Ctrl key pressed always adds to selection
* [#3539](https://github.com/bryntum/support/issues/3539) - Resource time ranges are not rendered for initially invisible resource rows
* [#3563](https://github.com/bryntum/support/issues/3563) - Feature toggle event for baselines feature does not fire
* [#3567](https://github.com/bryntum/support/issues/3567) - Minified css bundle contains unicode chars
* [#3568](https://github.com/bryntum/support/issues/3568) - Incorrect `visibleDateRange` in horizontal scroll listener when changing view preset
* [#3574](https://github.com/bryntum/support/issues/3574) - Fix recurrence editor handling of monthly pattern using "On the n'th of the month" ("first" was ignored,
  "second" was interpreted as "first", etc.)
* [#3579](https://github.com/bryntum/support/issues/3579) - Crash when combining `resourceTimeRanges` and `eventRenderer` with custom content
* [#3593](https://github.com/bryntum/support/issues/3593) - Weekly recurrence does not handle Sunday properly

## 4.3.0 - 2021-10-12

### FEATURES / ENHANCEMENTS

* [BREAKING] `@babel/preset-env` config target `chrome: 75` is now used for the UMD bundle. This decreases bundle size
  and improves performance for modern browsers ([#3201](https://github.com/bryntum/support/issues/3201))
* Legacy Angular demos for versions 1-5 were removed due to incompatibility with the new UMD bundle format
* Dependency drawing was sped up a bit by not always recalculating dependency bounds. This change will give a boost
  to scroll performance for schedules with many dependencies ([#3486](https://github.com/bryntum/support/issues/3486))

### API CHANGES

* TimeAxisColumn now subclasses WidgetColumn (before it was a Column), this should not affect your code. This opens up
  for rendering widgets embedded in row cells, see this demonstrated in the `examples/embedded-chart` demo in
  Scheduler Pro
* [DEPRECATED] Buttons `menuIconCls` config was deprecated in favor of the new `menuIcon` config, which better matches
  the naming of other configs

### BUG FIXES

* [#2811](https://github.com/bryntum/support/issues/2811) - Zoomed-out dependencies do not display correctly
* [#3449](https://github.com/bryntum/support/issues/3449) - `ResourceTimeRanges` disappear when many tasks are overlapping on a resource
* [#3472](https://github.com/bryntum/support/issues/3472) - Error after drop while finalizing async beforeEventDropFinalize event after switching browser tab
* [#3473](https://github.com/bryntum/support/issues/3473) - Dependencies not repainted after editing event duration
* [#3474](https://github.com/bryntum/support/issues/3474) - Fix and update React Advanced JavaScript demo
* [#3476](https://github.com/bryntum/support/issues/3476) - `DragCreate` does not work after scrolling on Firefox
* [#3477](https://github.com/bryntum/support/issues/3477) - Resource time range gets the name of the event after re-add
* [#3482](https://github.com/bryntum/support/issues/3482) - EventStore's `add` event not being emitted when editing occurrences
* [#3509](https://github.com/bryntum/support/issues/3509) - Tooltip position is wrongly recognized after moving event out of schedule
* [#3521](https://github.com/bryntum/support/issues/3521) - Time range and resource time range should not share `z-index`

## 4.2.7 - 2021-10-01

### FEATURES / ENHANCEMENTS

* `ComboBox` can now be configured to accept unmatched typed filter strings to create a new record. Use the
  `createOnUnmatched` config to enable this. This may be configured as a function to create the new record in an
  app-specific way. See the `eventeditor` example for usage ([#3249](https://github.com/bryntum/support/issues/3249))
* You can now force single assignment mode using the `singleAssignment` config on EventStore ([#3287](https://github.com/bryntum/support/issues/3287))

### BUG FIXES

* [#1481](https://github.com/bryntum/support/issues/1481) - Recurring events repeats endless after delete one of occurrences
* [#3166](https://github.com/bryntum/support/issues/3166) - Dependency editor Lag field does not use `dependency.lagUnit` value
* [#3413](https://github.com/bryntum/support/issues/3413) - Correct DST handling in monthly recurrence for nth weekdays of a month
* [#3422](https://github.com/bryntum/support/issues/3422) - [LWC] Scheduler pro doesn't render all events
* [#3444](https://github.com/bryntum/support/issues/3444) - Time axis header is broken
* [#3449](https://github.com/bryntum/support/issues/3449) - ResourceTimeRanges disappear when many tasks are overlapping on a resource
* [#3456](https://github.com/bryntum/support/issues/3456) - End after X time setting not applies for event with end on date setting
* [#3458](https://github.com/bryntum/support/issues/3458) - Document nested fields
* [#3479](https://github.com/bryntum/support/issues/3479) - Crash after removing multiple events using keyboard

## 4.2.6 - 2021-09-15

### FEATURES / ENHANCEMENTS

* The ResourceTimeRanges feature has a new `tabIndex` config that lets you control if the ranges are focusable/reachable
  using tab or not ([#3391](https://github.com/bryntum/support/issues/3391))

### BUG FIXES

* [#3177](https://github.com/bryntum/support/issues/3177) – React custom-event-editor demo issues
* [#3208](https://github.com/bryntum/support/issues/3208) - Header is rendered incorrectly for monthAndYear preset
* [#3370](https://github.com/bryntum/support/issues/3370) - Recurring range performance issue if many ranges used
* [#3376](https://github.com/bryntum/support/issues/3376) - Drag create breaks group summary
* [#3383](https://github.com/bryntum/support/issues/3383) - Setting store.data throws if syncDataOnLoad:true while re-assigning data with custom fields
* [#3387](https://github.com/bryntum/support/issues/3387) - Group header incorrect when showing summary in header
* [#3388](https://github.com/bryntum/support/issues/3388) - GroupSummary counts wrong for the first tick if event ends in that tick
* [#3408](https://github.com/bryntum/support/issues/3408) - Updated typings to support spread operator for method parameters

## 4.2.5 - 2021-09-08

### FEATURES / ENHANCEMENTS

* ProjectModel now fires a `dataReady` event when the engine has finished its calculations and the result has been
  written back to the records ([#2019](https://github.com/bryntum/support/issues/2019))
* The API documentation now better communicates when a field or property accepts multiple input types but uses a single
  type for output. For example date fields on models, which usually accepts a `String` or `Date` but always outputs a
  `Date` ([#2933](https://github.com/bryntum/support/issues/2933))

### BUG FIXES

* [#223](https://github.com/bryntum/support/issues/223) - View preset should support any number of headers
* [#1482](https://github.com/bryntum/support/issues/1482) - Show a tooltip when drag an event from the grid to scheduler
* [#2756](https://github.com/bryntum/support/issues/2756) - Row height is not recalculated when collapsing group when using `collapseToHeader`
* [#3273](https://github.com/bryntum/support/issues/3273) - Follow cursor on event resize when using fillTicks
* [#3283](https://github.com/bryntum/support/issues/3283) - Resources grouping works incorrect with some data set
* [#3313](https://github.com/bryntum/support/issues/3313) - Allow `String`, `String[]` and `Object` in `cls` getter for subclassing `EventModel`
* [#3322](https://github.com/bryntum/support/issues/3322) - Add `dataChange` event to framework guides
* [#3323](https://github.com/bryntum/support/issues/3323) - Forward step button in toolbar not working
* [#3330](https://github.com/bryntum/support/issues/3330) - Syncing records with syncDataOnLoad throws an error
* [#3342](https://github.com/bryntum/support/issues/3342) - Bug when combining simpleEventEdit and eventEdit
* [#3345](https://github.com/bryntum/support/issues/3345) - AspNet demos use wrong `@bryntum` npm package version
* [#3355](https://github.com/bryntum/support/issues/3355) - Column cell tooltip misplaced with `hideDelay = 0`
* [#3356](https://github.com/bryntum/support/issues/3356) - `EventResize#showTooltip` config has no effect
* [#3357](https://github.com/bryntum/support/issues/3357) - `OnBeforeEventDrag` not working
* [#3374](https://github.com/bryntum/support/issues/3374) - Crash after filtering
* [#3377](https://github.com/bryntum/support/issues/3377) - Drag create first creates long bar, then hides it

## 4.2.4 - 2021-08-27

### FEATURES / ENHANCEMENTS

* The `EventDragCreate` feature has a new config called `lockLayout`. Set it to `true` to emulate the pre 4.2 drag
  create behaviour, locking events in place until user finishes the drag gesture. Also applies some styling to
  differentiate the event being created from the existing events when the config is used ([#3228](https://github.com/bryntum/support/issues/3228))
* ScheduleTooltip feature has a new config `hideForNonWorkingTime` which hides it when hovering weekends and other
  non-working time ranges
* Scheduler's project (that holds all of its stores) now triggers a `change` event when data in any of the stores
  changes. Useful to listen for to keep an external data model up to date for example. This event is also relayed by
  Scheduler as `dataChange`, to allow easier binding in frameworks ([#3281](https://github.com/bryntum/support/issues/3281))

### API CHANGES

* [DEPRECATED] The `store` property on the TimeRanges feature was deprecated. The corresponding config was deprecated in
  4.0, the property should have been flagged at the same time

### BUG FIXES

* [#794](https://github.com/bryntum/support/issues/794) - Dependency creation tooltip is initially misaligned
* [#1158](https://github.com/bryntum/support/issues/1158) - Filtering out all resources in vertical mode should show empty message
* [#1432](https://github.com/bryntum/support/issues/1432) - Scheduler doesn't take DST into account for event duration
* [#1702](https://github.com/bryntum/support/issues/1702) - Error if no value in the field used in dataSource paths
* [#2501](https://github.com/bryntum/support/issues/2501) - Scheduler in vertical mode should stretch foreground canvas as in horizontal mode
* [#2521](https://github.com/bryntum/support/issues/2521) - Not possible to set resourceTimeRangeStore on Scheduler
* [#2887](https://github.com/bryntum/support/issues/2887) - Changing event's data while resizing causes issues
* [#2971](https://github.com/bryntum/support/issues/2971) - ResourceTimeRangeStore updates not tracked by STM
* [#3116](https://github.com/bryntum/support/issues/3116) - Gantt throws on task terminal drag
* [#3150](https://github.com/bryntum/support/issues/3150) - Allow EventDragCreateFeature to opt out of finalizing by resizing to zero width
* [#3180](https://github.com/bryntum/support/issues/3180) - Drag create does not flip edges correctly
* [#3219](https://github.com/bryntum/support/issues/3219) - Replacing events is slow
* [#3231](https://github.com/bryntum/support/issues/3231) - Render event for resource time ranges does not fire anymore
* [#3251](https://github.com/bryntum/support/issues/3251) - Document recurrent time ranges for timeranges feature
* [#3253](https://github.com/bryntum/support/issues/3253) - Crash when dragging row in drag-from-grid demo in vertical mode
* [#3254](https://github.com/bryntum/support/issues/3254) - Vertical resourceColumns fillWidth & fitWidth configs have no effect
* [#3262](https://github.com/bryntum/support/issues/3262) - Vertical time axis column content overflows its cell
* [#3263](https://github.com/bryntum/support/issues/3263) - Deleted dependency still rendered
* [#3265](https://github.com/bryntum/support/issues/3265) - Docs are not scrolled to the referenced member
* [#3282](https://github.com/bryntum/support/issues/3282) - Dragging the thumb in infinite scroll causes overscrolling
* [#3283](https://github.com/bryntum/support/issues/3283) - Resources grouping works incorrect with some data set
* [#3290](https://github.com/bryntum/support/issues/3290) - Schedule tooltip should offer to hide itself when hovering non working time
* [#3291](https://github.com/bryntum/support/issues/3291) - Scheduler dependency tooltip should render the dependencyIdField rather than `task.id`
* [#3292](https://github.com/bryntum/support/issues/3292) - Events disappear in Scheduler on vertical scroll
* [#3297](https://github.com/bryntum/support/issues/3297) - Scheduler resource time range name (label) not visible
* [#3298](https://github.com/bryntum/support/issues/3298) - Existed in store events not assigned to new added resources if loaded on demand
* [#3300](https://github.com/bryntum/support/issues/3300) - Cannot use external URL for resourceImagePath
* [#3305](https://github.com/bryntum/support/issues/3305) - Guides look bad in the docs search results
* [#3306](https://github.com/bryntum/support/issues/3306) - Doc browser does not scroll to member
* [#3327](https://github.com/bryntum/support/issues/3327) - Not possible to combine eventEdit + simpleEventEdit features
* [#3332](https://github.com/bryntum/support/issues/3332) - [LWC] Exception when realigning popup

## 4.2.3 - 2021-08-05

### FEATURES / ENHANCEMENTS

* You can now define the default new event duration when double clicking schedule by setting
  config `createEventOnDblClick : { useEventModelDefaults : true }`. When setting config `useEventModelDefaults` to
  true, the default duration and durationUnit will be read from the default values of the `duration` and `durationUnit`
  fields of the EventModel. ([#3234](https://github.com/bryntum/support/issues/3234))
* CrudManager can now log warnings to the browser console when it detects an unexpected response format. To enable these
  checks please use the `validateResponse` config ([#2668](https://github.com/bryntum/support/issues/2668))
* Fixed a scroll performance regression introduced in version 4.2.2
* [NPM] Bryntum Npm server now supports remote private repository access for Artifactory with username and password
  authentication ([#2864](https://github.com/bryntum/support/issues/2864))
* [TYPINGS] Type definitions now contain typed `features` configs and properties ([#2740](https://github.com/bryntum/support/issues/2740))

### API CHANGES

* [DEPRECATED] PdfExport feature `export` event is deprecated and will be removed in 4.3.0. Use `export` event on the
  Scheduler instead
* [DEPRECATED] Scheduler `beforeExport` event signature is deprecated and will be removed in 4.3.0. New signature wraps
  config object to the corresponding key

### BUG FIXES

* [#2948](https://github.com/bryntum/support/issues/2948) - CrudManager should handle autoSync during sync
* [#3116](https://github.com/bryntum/support/issues/3116) - Gantt throws on task terminal drag
* [#3126](https://github.com/bryntum/support/issues/3126) - `timeAxisSubGrid` is missing from Scheduler typings
* [#3199](https://github.com/bryntum/support/issues/3199) - Setting partner to vertical scheduler in runtime throws
* [#3203](https://github.com/bryntum/support/issues/3203) - Crud Manager not sending assignment record
* [#3205](https://github.com/bryntum/support/issues/3205) - Scheduler: Summaries not "counted" when event ends outside of current date range
* [#3210](https://github.com/bryntum/support/issues/3210) - Drag to create render issue
* [#3232](https://github.com/bryntum/support/issues/3232) - EventModel.set() and normalization bug - event moves instead of resizing

## 4.2.2 - 2021-07-21

### FEATURES / ENHANCEMENTS

* You can now distinguish new events being created using drag create (or double clicking in the schedule) by checking
  the Model#isCreating flag. In the DOM, a new CSS class b-sch-creating has been added to all events that are being
  created
* Added a new `hideRangesOnZooming` config to `NonWorkingTime` feature ([#2788](https://github.com/bryntum/support/issues/2788)). The config allows to disable the
  feature default behavior when it hides ranges shorter than the base timeaxis unit on zooming out
* TimeRange feature can now show a tooltip when hovering a time range header element, by using the new `tooltipTemplate`
  config ([#3194](https://github.com/bryntum/support/issues/3194))
* [NPM] Bryntum Npm server now supports `npm token` command for managing access tokens for CI/CD ([#2703](https://github.com/bryntum/support/issues/2703))

### BUG FIXES

* [#201](https://github.com/bryntum/support/issues/201) - Line event styles should go from top to bottom in vertical mode
* [#2071](https://github.com/bryntum/support/issues/2071) - Support configuring eventeditor / taskeditor child items with 'true' value
* [#2661](https://github.com/bryntum/support/issues/2661) - DateTime field in EventEditor does not allow selecting a date same as max value
* [#2666](https://github.com/bryntum/support/issues/2666) - Sticky events content positioning issue while scrolling
* [#3141](https://github.com/bryntum/support/issues/3141) - Event store optimization
* [#3146](https://github.com/bryntum/support/issues/3146) - Scheduler renders too many events for single resource
* [#3147](https://github.com/bryntum/support/issues/3147) - Drag create finalization code should not throw when scheduler instance is destroyed
* [#3148](https://github.com/bryntum/support/issues/3148) - [ANGULAR] Icon misrendered in dependency demo
* [#3149](https://github.com/bryntum/support/issues/3149) - Event drag tooltip misrendered after dragging task out of schedule then back in
* [#3154](https://github.com/bryntum/support/issues/3154) - Engine in Scheduler takes too much time to handle the data
* [#3167](https://github.com/bryntum/support/issues/3167) - LWC bundle is missing from trial packages
* [#3178](https://github.com/bryntum/support/issues/3178) - Syntax highlighter messes up code snippets in docs
* [#3181](https://github.com/bryntum/support/issues/3181) - Partnered scheduler does not update after assigning a task in Gantt assignment column
* [#3200](https://github.com/bryntum/support/issues/3200) - showTooltip config of EventDragCreate has no effect

## 4.2.1 - 2021-07-07

### FEATURES / ENHANCEMENTS

* Added throttle/buffer options for event listeners ([#2590](https://github.com/bryntum/support/issues/2590))
* [FRAMEWORKS] Added `scheduleContextFeature` to frameworks wrappers ([#3135](https://github.com/bryntum/support/issues/3135))

### BUG FIXES

* [#3046](https://github.com/bryntum/support/issues/3046) - Events being dragged with the StickyEvents feature enabled should keep event inner text in view
* [#3117](https://github.com/bryntum/support/issues/3117) - Improve the docs to show how to access `eventRecord` in `beforeShow` listener
* [#3125](https://github.com/bryntum/support/issues/3125) - Error when summary feature enabled event starts at time axis end
* [#3131](https://github.com/bryntum/support/issues/3131) - Browser unresponsive with large data set
* [#3134](https://github.com/bryntum/support/issues/3134) - ScheduleContext should be off by default
* [#3136](https://github.com/bryntum/support/issues/3136) - [NPM] Running `npm install` twice creates modified `package-lock.json` file
* [#3139](https://github.com/bryntum/support/issues/3139) - Support `on` and `un` methods for `eventTooltip` feature instance

## 4.2.0 - 2021-06-30

### FEATURES / ENHANCEMENTS

* Scheduler has a new config option `infiniteScroll` meaning that as the user scrolls the timeline back or forward in
  time, the "window" of time encapsulated by the TimeAxis is moved and the EventStore fires a `loadDateRange` event
  ([#1114](https://github.com/bryntum/support/issues/1114))
* Dependencies can now be created by dropping on the target event without hitting the terminal circle element. The
  defaultValue of the DependencyModel `type` field will be used in this case. ([#3003](https://github.com/bryntum/support/issues/3003))
* Dependency creation can now be finalized asynchronously, for example after showing the user a confirmation dialog
* The `EventResize` feature now uses the task's data to change the appearance by updating `endDate` or `startDate` live
  but in batched mode so that the changes are not available for server sync until the operation is finished
  ([#2541](https://github.com/bryntum/support/issues/2541))
* EventResize now allows resizing an event to be zero duration, enable this behavior with the new `allowResizeToZero`
  config. ([#2945](https://github.com/bryntum/support/issues/2945))
* Added "Upgrade Font Awesome icons to Pro version" guide
* Updated "Replacing Font Awesome with Material Icons" guide

### API CHANGES

* [DEPRECATED] The `resources` param of the `beforeEventAdd` event fired by Scheduler was renamed to `resourceRecords`
  and will be removed in 5.0
* [DEPRECATED] The `newEventRecord` param of the `dragCreateEnd` event fired by Scheduler was renamed to `eventRecord`
  and will be removed in 5.0

### LOCALE UPDATES

* `removeRows` label of CellMenu & GridBase was removed
* Value of `removeRow` label of CellMenu & GridBase was updated to say just 'Remove'
* RowCopyPaste locales were updated to just say 'Copy', 'Cut' & 'Paste'. `copyRows`, `cutRows` & `pasteRows` keys were
  removed
* EventCopyPaste locales were updated to just say 'Copy', 'Cut' & 'Paste'. `copyRows`, `cutRows` & `pasteRows` keys were
  removed

### BUG FIXES

* [#2366](https://github.com/bryntum/support/issues/2366) - Drag to Create - Selection Spans entire resource row instead of an event block
* [#2706](https://github.com/bryntum/support/issues/2706) - Drag and drop is not accurate when scrolling vertically
* [#3044](https://github.com/bryntum/support/issues/3044) - Dragged event misplaced on scroll
* [#3047](https://github.com/bryntum/support/issues/3047) - Time axis header formatting broken
* [#3064](https://github.com/bryntum/support/issues/3064) - Vertical demo summary is empty after zooming
* [#3099](https://github.com/bryntum/support/issues/3099) - Setting eventStore.data with enabled syncDataOnLoad doesn't update rendered events
* For more details, see [What's new](https://bryntum.com/products/scheduler/docs/guide/Scheduler/whats-new/4.2.0)
  and [Upgrade guide](https://bryntum.com/products/scheduler/docs/guide/Scheduler/upgrades/4.2.0) in docs

## 4.1.6 - 2021-06-23

### BUG FIXES

* [#110](https://github.com/bryntum/support/issues/110) - Group and Sort features should support custom sorting functions
* [#2756](https://github.com/bryntum/support/issues/2756) - Row height is not recalculated when collapsing group
* [#2977](https://github.com/bryntum/support/issues/2977) - Summary feature and Filter feature work slow together
* [#3005](https://github.com/bryntum/support/issues/3005) - [VUE-3] Problem with Critical Paths due to Vue Proxy and double native events firing bug
* [#3021](https://github.com/bryntum/support/issues/3021) - Event editor should not allow end date before start date
* [#3026](https://github.com/bryntum/support/issues/3026) - [VUE-2] and [VUE-3] typescript type declarations are missing
* [#3078](https://github.com/bryntum/support/issues/3078) - Avatars initials not rendering inside perfect circle

## 4.1.5 - 2021-06-09

### FEATURES / ENHANCEMENTS

* The behaviour when dragging unselected events has changed slightly. Scheduler now selects the event from which a drag
  originates, whereas previously it did not
* [TYPINGS] API singleton classes are correctly exported to typings ([#2752](https://github.com/bryntum/support/issues/2752))
* Added a new ResourceCollapse column to toggle `eventLayout` of a resource between overlap and stack. A new
  `resource-collapsing` demo has been added to showcase the feature ([#2979](https://github.com/bryntum/support/issues/2979))
* Scheduler now has a `minHeight` of `10em` by default. This assures that the Scheduler will get a size even if no other
  sizing rules are applied for the element it is rendered to. When the default `minHeight` is driving the height, a
  warning is shown on the console to let the dev know that sizing rules are missing. The warning is not shown if a
  `minHeight` is explicitly configured ([#2915](https://github.com/bryntum/support/issues/2915))

### BUG FIXES

* [#1358](https://github.com/bryntum/support/issues/1358) - EventTooltip configs are missing
* [#2949](https://github.com/bryntum/support/issues/2949) - Schedule context menu should not be shown when clicking empty area below rows
* [#2953](https://github.com/bryntum/support/issues/2953) - UndoRedo buttons always disabled if used in event context menu
* [#2958](https://github.com/bryntum/support/issues/2958) - Weekly Repeat event editor doesn't fit day names
* [#2961](https://github.com/bryntum/support/issues/2961) - Recurring event rule is not working correctly for Week/Day view
* [#2974](https://github.com/bryntum/support/issues/2974) - eventRecord property not available in onBeforeShow listener
* [#2990](https://github.com/bryntum/support/issues/2990) - [ANGULAR] Preventable async events don't work
* [#2991](https://github.com/bryntum/support/issues/2991) - Events disappear after scrolling
* [#3000](https://github.com/bryntum/support/issues/3000) - Scheduler pro scrolling with touchpad not working properly on Firefox

## 4.1.4 - 2021-05-28

### FEATURES / ENHANCEMENTS

* TypeScript definitions updated to use typed `Partial<>` parameters where available
* Buttons now has a new style `b-transparent` that renders them without background or borders ([#2853](https://github.com/bryntum/support/issues/2853))
* [NPM] repository package `@bryntum/scheduler` now includes source code ([#2723](https://github.com/bryntum/support/issues/2723))
* [NPM] repository package `@bryntum/scheduler` now includes minified versions of bundles ([#2842](https://github.com/bryntum/support/issues/2842))
* [FRAMEWORKS] Frameworks demos packages dependencies updated to support Node v12

### API CHANGES

* [DEPRECATED] The `eventRecord` and `assignmentRecord` params of the `eventKeyDown` & `eventKeyUp` events fired by
  Scheduler were renamed to `eventRecords` and `assignmentRecords` to match the type (array)

### BUG FIXES

* [#31](https://github.com/bryntum/support/issues/31) - Bugs with selection state and scroll position after crudManager.load()
* [#2104](https://github.com/bryntum/support/issues/2104) - "Core" code not isomorphic
* [#2519](https://github.com/bryntum/support/issues/2519) - Vertical mode resourceStore.filter does not hide all resources even if filter result is empty
* [#2520](https://github.com/bryntum/support/issues/2520) - Events are misaligned when changing to summer time
* [#2575](https://github.com/bryntum/support/issues/2575) - Memory leak when replacing project instance
* [#2783](https://github.com/bryntum/support/issues/2783) - CellMenu not triggered on iPhone's with 3D touch enabled
* [#2834](https://github.com/bryntum/support/issues/2834) - Core should not use b-fa for icon prefix
* [#2875](https://github.com/bryntum/support/issues/2875) - Selected events cleared after aborted drag drop
* [#2880](https://github.com/bryntum/support/issues/2880) - Undoing a deleted event inserts two events
* [#2882](https://github.com/bryntum/support/issues/2882) - Snapping not enabled when dragging multiple events
* [#2898](https://github.com/bryntum/support/issues/2898) - eventKeyDown / eventKeyUp missing event param
* [#2901](https://github.com/bryntum/support/issues/2901) - Focus is lost when scrolling using native scrollbar
* [#2903](https://github.com/bryntum/support/issues/2903) - Event Edit modal closes on iPhone when user taps "Done" on the keyboard
* [#2919](https://github.com/bryntum/support/issues/2919) - Crash when moving mouse after mouse down and all events are removed before starting drag
* [#2928](https://github.com/bryntum/support/issues/2928) - Drag drop not finalized properly if dragged events are removed while dragging
* [#2935](https://github.com/bryntum/support/issues/2935) - Error when scrolled vertically and reducing data set size

## 4.1.3 - 2021-05-13

### FEATURES / ENHANCEMENTS

* Bumped the built-in version of FontAwesome Free to 5.15.3 and added missing imports to allow stacked icons etc
* Bumped the `@babel/preset-env` config target to `chrome: 75` for the Module bundle. This decreased bundle sizes and
  improved performance for modern browsers
* Vertical scroll performance was improved by limiting how far out of view events are drawn. Should especially help for
  scenarios where stacking leads to large row heights
* Updated Angular Wrappers to be compatible with Angular 6-7 in production mode for target `es2015`
* EventResize now has a configurable `tooltipTemplate` so you can easily show custom contents in the resizing tooltip
  See updated 'tooltips' demo to try it out ([#2244](https://github.com/bryntum/support/issues/2244))
* Added new `encoder.requestData` config for Crud Manager allowing to put static info into request data object
  ([#541](https://github.com/bryntum/support/issues/541))

### API CHANGES

* [DEPRECATED] EventDrag#dragTipTemplate was renamed to `tooltipTemplate` to better match the naming scheme of other
  features
* [DEPRECATED] The `startText`, `endText`, `startClockHtml`, `endClockHtml`, `dragData` params of the EventDrag
  dragTipTemplate / tooltipTemplate methods have been deprecated and will be removed in 5.0

### BUG FIXES

* [#509](https://github.com/bryntum/support/issues/509) - Drag from Grid demo should take in account allowOverlap
* [#1974](https://github.com/bryntum/support/issues/1974) - Not possible to add event listeners to EventTooltip feature
* [#2566](https://github.com/bryntum/support/issues/2566) - Committing CSS class not cleared correctly
* [#2646](https://github.com/bryntum/support/issues/2646) - Resource time zones are not exported correctly
* [#2690](https://github.com/bryntum/support/issues/2690) - [ANGULAR] Scheduler can't use custom fields in production build
* [#2704](https://github.com/bryntum/support/issues/2704) - setTimeSpan works incorrect if workingTime hours defined
* [#2705](https://github.com/bryntum/support/issues/2705) - Loading tree data first time with children true for the first node makes other nodes to ignore their
  children
* [#2754](https://github.com/bryntum/support/issues/2754) - Vue error appeared on create new event in custom editor if dependencies created before
* [#2770](https://github.com/bryntum/support/issues/2770) - Column lines misaligned when switching locale
* [#2771](https://github.com/bryntum/support/issues/2771) - Non-working days demo crash
* [#2774](https://github.com/bryntum/support/issues/2774) - Drag drop not finalized if eventStore data is cleared when dragging multiple events
* [#2778](https://github.com/bryntum/support/issues/2778) - Wrong module declaration in typings file
* [#2797](https://github.com/bryntum/support/issues/2797) - Crash when deleting a selected event using highlightSuccessors
* [#2800](https://github.com/bryntum/support/issues/2800) - Delete event menu action does not remove all selected events
* [#2829](https://github.com/bryntum/support/issues/2829) - Recurrence editor does not filter its UI according to recurrence type until the recurrence type field
  is *changed*
* [#2857](https://github.com/bryntum/support/issues/2857) - Not possible to pass timeAxis column in columns array
* [#2866](https://github.com/bryntum/support/issues/2866) - Missing method return value type for `EventSelection.isEventSelected` and
  `EventSelection.isAssignmentSelected`
* [#2867](https://github.com/bryntum/support/issues/2867) - Issue after dragging and aborting multiple events with Escape key

### API CHANGES

* [DEPRECATED] `TimeRanges#store` + `TimeRanges#timeRanges` configs have been deprecated in favor of supplying data on
  Scheduler or its project

## 4.1.2 - 2021-04-27

### BUG FIXES

* [#895](https://github.com/bryntum/support/issues/895) - Date in ScheduleTooltip does not update when scrolling

## 4.1.1 - 2021-04-23

### FEATURES / ENHANCEMENTS

* Scheduler / Gantt / Calendar will now react when CTRL-Z key to undo / redo recent changes made. Behavior can be
  controlled with the new `enableUndoRedoKeys` config ([#2532](https://github.com/bryntum/support/issues/2532))
* Added a new "Non-working days" demo
* Summary feature is now supported in vertical mode ([#2555](https://github.com/bryntum/support/issues/2555))
* Summary feature now supports summing only selected rows ([#2631](https://github.com/bryntum/support/issues/2631))
* Vertical mode now supports zooming using mouse wheel or when double clicking a time axis header cell ([#823](https://github.com/bryntum/support/issues/823))
* Added a new Angular 11 Routing demo

### API CHANGES

* Scheduler has a new public property `visibleResources` that returns the range of currently visible resources
* [DEPRECATED] Arguments of `beforeEventDrag`, `eventDragStart`, `eventDrag`, `eventDragAbort` listeners of the
  EventDrag feature have been updated. `context` argument has been deprecated. See the upgrade guide for more
  information
* [DEPRECATED] The events fired by Scheduler.column.TimeAxisColumn (`timeaxisheaderclick`, `timeaxisheadercontextmenu`,
  `timeaxisheaderdblclick`) were deprecated and should instead be listened to on the owning Scheduler / Gantt component

### BUG FIXES

* [#318](https://github.com/bryntum/support/issues/318) - Wrong Event and TimeRange durations when dragging over DST period
* [#868](https://github.com/bryntum/support/issues/868) - Should be possible to show all available context menus programmatically
* [#1083](https://github.com/bryntum/support/issues/1083) - Summary not updated after filtering with filter bar
* [#1152](https://github.com/bryntum/support/issues/1152) - TimeRange with empty label produces empty label element
* [#1554](https://github.com/bryntum/support/issues/1554) - Export demo problems
* [#1987](https://github.com/bryntum/support/issues/1987) - DOCS: React guide needs a section on how to listen for events
* [#2151](https://github.com/bryntum/support/issues/2151) - Wrong context is passed to the beforeEventDrag listener
* [#2365](https://github.com/bryntum/support/issues/2365) - scrollToDate call increases date range period
* [#2380](https://github.com/bryntum/support/issues/2380) - eventKeyDown and eventKeyUp events are not documented
* [#2428](https://github.com/bryntum/support/issues/2428) - Events disappear on reload if resource store is a tree
* [#2542](https://github.com/bryntum/support/issues/2542) - selectionMode with checkbox column does not handle selection mutating inside selectionChange listener
* [#2626](https://github.com/bryntum/support/issues/2626) - Last time axis column headers text alignment issue when cropped
* [#2630](https://github.com/bryntum/support/issues/2630) - Sticky headers not enabled
* [#2635](https://github.com/bryntum/support/issues/2635) - Milestone Resize Error
* [#2636](https://github.com/bryntum/support/issues/2636) - [WRAPPERS] Features are not updated at runtime
* [#2644](https://github.com/bryntum/support/issues/2644) - timeRangeStore property doesn't work for recurring time ranges
* [#2663](https://github.com/bryntum/support/issues/2663) - [ANGULAR] Scheduler crashes on 2nd create after destroy
* [#2664](https://github.com/bryntum/support/issues/2664) - Crash when using showCurrentTimeLine with headers hidden
* [#2673](https://github.com/bryntum/support/issues/2673) - Unsynced current timeline in partnered schedulers
* [#2675](https://github.com/bryntum/support/issues/2675) - Delete key should delete all selected events
* [#2679](https://github.com/bryntum/support/issues/2679) - on-owner events should be added to owner too in docs
* [#2681](https://github.com/bryntum/support/issues/2681) - Yarn. Package trial alias can not be installed

## 4.1.0 - 2021-04-02

### FEATURES / ENHANCEMENTS

* We are happy to announce that Bryntum Scheduler now can be directly installed using our npm registry. We've updated
  all our frameworks demos to use `@bryntum` npm packages. See them in `examples/frameworks` folder. Please refer to "
  Npm packages" guide in docs for registry login and usage information
* Added a new "Non-working days" demo
* Bryntum demos were updated with XSS protection code. `StringHelper.encodeHtml` and `StringHelper.xss` functions were
  used for this
* Model fields can now be marked with `alwaysWrite` to ensure important data fields are always included when updates are
  committed by a CrudManager ([#848](https://github.com/bryntum/support/issues/848))
* CrudManager now exposes a `changes` property returning an object with the current changes in its stores
* Added new Vue Cell Renderer demo to show Vue Components as cell renderers (Partially fixed [#946](https://github.com/bryntum/support/issues/946) - Vue: Support
  components in renderers)
* Schedulers performance was improved compared to version 4.0, mainly by shortening critical code paths such as getting
  record field values and by reducing the amount of work performed during the engines initial commit
* Summary feature now offers a `refresh` method to update summaries. See updated summary demo for sample usage
* Custom rendered HTML for events is no longer wrapped in an element unless there are other elements (such as icon) to
  also render
* Added new Vue 3 Simple demo to show integration of Bryntum Scheduler with Vue 3 ([#1315](https://github.com/bryntum/support/issues/1315))
* `eventColor` can now be specified as any valid CSS style (hex, hsl, rgba etc) ([#2314](https://github.com/bryntum/support/issues/2314))
* The Labels feature can now be configured to make event labels take part in the event layout process, preventing them
  from being overlapped by other events ([#2147](https://github.com/bryntum/support/issues/2147))
* Added new React 17 demo for Scheduler in vertical mode. The example also implements theme switching ([#1823](https://github.com/bryntum/support/issues/1823) and
  [#2213](https://github.com/bryntum/support/issues/2213))
* ResourceInfoColumn now shows resource initials if no avatar image exists ([#2202](https://github.com/bryntum/support/issues/2202))

### API CHANGES

* [BREAKING] Removed RequireJS demos and integration guides in favor of modern ES6 Modules technology ([#1963](https://github.com/bryntum/support/issues/1963))
* [BREAKING] `init` method is no longer required in Lightning Web Components and was removed from the LWC bundle
* [DEPRECATED] CrudManager `commit` was deprecated in favor of `acceptChanges`
* [DEPRECATED] CrudManager `commitCrudStores` was deprecated in favor of `acceptChanges`
* [DEPRECATED] CrudManager `reject` was deprecated in favor of `revertChanges`
* [DEPRECATED] CrudManager `rejectCrudStores` was deprecated in favor of `revertChanges`
* [DEPRECATED] In the `DependencyCreation` feature, the `data` param of all events was deprecated. All events now have
  useful documented top level params
* Value of `store` config defined on `TimeRanges` feature is no longer passed to Crud Manager instance. Instead please
  use `timeRangeStore` config on the project. That will both register the store on Crud Manager and used by the feature
  automatically

### BUG FIXES

* [#394](https://github.com/bryntum/support/issues/394) - ScrollManager does not start vertical scrolling if mouse leaves scheduler element
* [#695](https://github.com/bryntum/support/issues/695) - Dependency line not redrawn during resize
* [#893](https://github.com/bryntum/support/issues/893) - Scrolling scheduler while dragging event makes dragged event go away from cursor
* [#1489](https://github.com/bryntum/support/issues/1489) - Copy / Cut / Paste event API + context menu entries
* [#1525](https://github.com/bryntum/support/issues/1525) - Improve Localization guide
* [#1689](https://github.com/bryntum/support/issues/1689) - Investigate sharing static resource between multiple LWC on the same page
* [#1742](https://github.com/bryntum/support/issues/1742) - Misleading visual feedback when clicking between multi assigned events
* [#1752](https://github.com/bryntum/support/issues/1752) - Error if startDate field is hidden in EventEditor
* [#1873](https://github.com/bryntum/support/issues/1873) - Virtual event rendering derenders too eagerly
* [#1893](https://github.com/bryntum/support/issues/1893) - [REACT] JSX renderer not supported for TreeColumn
* [#2021](https://github.com/bryntum/support/issues/2021) - Adding event when all resources missing fails
* [#2067](https://github.com/bryntum/support/issues/2067) - Vertical Scheduler does not update view when undoing actions
* [#2056](https://github.com/bryntum/support/issues/2056) - Setting resourceId to newly created event record before it is saved by the event editor fails
* [#2084](https://github.com/bryntum/support/issues/2084) - Loading empty assignments does not refresh UI
* [#2163](https://github.com/bryntum/support/issues/2163) - Icon is not shown for resource time ranges when iconCls is specified
* [#2166](https://github.com/bryntum/support/issues/2166) - Buttons in bottom toolbar of a Popup should be right aligned
* [#2204](https://github.com/bryntum/support/issues/2204) - EventEdit docs should show how configure the buttons
* [#2211](https://github.com/bryntum/support/issues/2211) - Add test coverage for XSS
* [#2309](https://github.com/bryntum/support/issues/2309) - Scheduler weekends are not configurable
* [#2323](https://github.com/bryntum/support/issues/2323) - Dependency drag creation fails
* [#2329](https://github.com/bryntum/support/issues/2329) - Processing records by the Engine makes CrudManager to load data slowly
* [#2331](https://github.com/bryntum/support/issues/2331) - Cursor isn't changed to ew-resize when resizing event
* [#2333](https://github.com/bryntum/support/issues/2333) - Dependencies not cleared after setting an empty array
* [#2337](https://github.com/bryntum/support/issues/2337) - Disabling recurrenceCombo in Editor fails with exception
* [#2338](https://github.com/bryntum/support/issues/2338) - Time axis misrendered if changing scheduler element size
* [#2346](https://github.com/bryntum/support/issues/2346) - Drag drop not finalized properly if event is deleted during drag drop
* [#2358](https://github.com/bryntum/support/issues/2358) - Scheduler 4.x is 2 times slower than Scheduler 3.x
* [#2359](https://github.com/bryntum/support/issues/2359) - Update readme files in all framework demos in all products
* [#2364](https://github.com/bryntum/support/issues/2364) - Adding a new event triggers 'update'
* [#2379](https://github.com/bryntum/support/issues/2379) - Add minified version of *.lite.umd.js to the bundle
* [#2381](https://github.com/bryntum/support/issues/2381) - Unable to Drag from left corner of event when Event#resizable set to 'end'
* [#2386](https://github.com/bryntum/support/issues/2386) - Events disappear after setting resources twice
* [#2400](https://github.com/bryntum/support/issues/2400) - Sync failure messages displayed in `syncMask` where not auto-closing
* [#2402](https://github.com/bryntum/support/issues/2402) - assignmentStore add function ignores `silent` param
* [#2407](https://github.com/bryntum/support/issues/2407) - Grid/Scheduler not working in IE11
* [#2414](https://github.com/bryntum/support/issues/2414) - Header cell rendering leaves some space on the right when expand the browser window fast
* [#2418](https://github.com/bryntum/support/issues/2418) - Project does not respect suspendEvents
* [#2426](https://github.com/bryntum/support/issues/2426) - Double clicking tree expander icon should not start editing
* [#2429](https://github.com/bryntum/support/issues/2429) - GroupSummary redraws excessively
* [#2430](https://github.com/bryntum/support/issues/2430) - Summary redraws excessively
* [#2433](https://github.com/bryntum/support/issues/2433) - Time picker doesn't display AM/PM switch properly
* [#2441](https://github.com/bryntum/support/issues/2441) - Demo control sizes and styling issues
* [#2450](https://github.com/bryntum/support/issues/2450) - Sorting demo breaks when trying to change sort order
* [#2453](https://github.com/bryntum/support/issues/2453) - Multiple rebuilds of indices when adding events
* [#2468](https://github.com/bryntum/support/issues/2468) - Add a public way to refresh summaries
* [#2474](https://github.com/bryntum/support/issues/2474) - Empty text not shown when using autoHeight
* [#2480](https://github.com/bryntum/support/issues/2480) - Race condition and me.nextAnimationFrame is not a function error
* [#2486](https://github.com/bryntum/support/issues/2486) - Month/year picker is not aligned to date picker properly
* [#2492](https://github.com/bryntum/support/issues/2492) - Removed dependency is rendered
* [#2497](https://github.com/bryntum/support/issues/2497) - Event derendered on resize
* [#2505](https://github.com/bryntum/support/issues/2505) - Clicking tree node expander icon should not focus row
* [#2509](https://github.com/bryntum/support/issues/2509) - Docs missing for DependencyCreation events
* [#2511](https://github.com/bryntum/support/issues/2511) - Applying empty store state doesn't clear filters/sorters/groupers
* [#2522](https://github.com/bryntum/support/issues/2522) - Percent column never displays a value
* [#2526](https://github.com/bryntum/support/issues/2526) - Grid: CheckAll checkbox un-checks after drag and drop
* [#2527](https://github.com/bryntum/support/issues/2527) - Inconsistent Behaviour with Select All when Collapsed Groups
* [#2528](https://github.com/bryntum/support/issues/2528) - Snapping not working when using a custom time axis
* [#2530](https://github.com/bryntum/support/issues/2530) - Event disappears after drag drop if timeaxis is filtered
* [#2554](https://github.com/bryntum/support/issues/2554) - Vue demo styling issues
* [#2557](https://github.com/bryntum/support/issues/2557) - Double click resource histogram header fails
* [#2561](https://github.com/bryntum/support/issues/2561) - Drag from grid demo styling bugs
* [#2564](https://github.com/bryntum/support/issues/2564) - [LWC] Dependency lines are not created
* [#2577](https://github.com/bryntum/support/issues/2577) - Crash after dragging newly created event
* [#2593](https://github.com/bryntum/support/issues/2593) - Changes are saved immediately when beforeEventSave listener is async
* [#2598](https://github.com/bryntum/support/issues/2598) - Should be possible to detect in DOM what ViewPreset is used

## 4.0.8 - 2021-01-27

### FEATURES / ENHANCEMENTS

* You can now position milestone text inside the diamond or outside (default) with the new `milestoneTextPosition`
  config
* You can now opt out of sticky event behavior for individual Events, using the EventModel#stickyContents field
* Crud Manager now supports less strict `sync` response format allowing to respond only server side changes
  See `supportShortSyncResponse` config for details

### API CHANGES

* [BREAKING] Crud Manager default behaviour has been changed to allow `sync` response to include only server-side
  changes. Previously it was mandatory to mention each updated/removed record in the response to confirm the changes
  With this release the Crud Manager automatically confirms changes of all updated/removed records mentioned in
  corresponding request. To revert to previous strict behaviour please use `supportShortSyncResponse` config

### BUG FIXES

* [#1970](https://github.com/bryntum/support/issues/1970) - Infinite requests if wrong response received
* [#2241](https://github.com/bryntum/support/issues/2241) - PDF export fails with certain column combination

## 4.0.7 - 2021-01-12

### FEATURES / ENHANCEMENTS

* Scheduler now supports per resource row height, by setting `resource.rowHeight`. The value is used as the actual row
  height for pack and overlap event layouts, and as input for the row height calculation with stack layout. It is also
  possible to control the setting from a column renderer. If no value is supplied, the height configured on the
  Scheduler is used ([#2158](https://github.com/bryntum/support/issues/2158))
* Also added per resource event layout support, by setting the new corresponding `resource.eventLayout` field. It
  accepts the same options as `scheduler.eventLayout` (stack, pack, none), and if the field is unspecified it will use
  the layout configured on the Scheduler ([#176](https://github.com/bryntum/support/issues/176))

### BUG FIXES

* [#410](https://github.com/bryntum/support/issues/410) - Resized element goes invisible if dragged to be zero width
* [#1220](https://github.com/bryntum/support/issues/1220) - Scheduler time axis is empty after switching between schedulers
* [#1764](https://github.com/bryntum/support/issues/1764) - Reordering inserts at the wrong position when the store is filtered
* [#1929](https://github.com/bryntum/support/issues/1929) - Drag drop not finalized if eventStore data is updated during dragging
* [#2140](https://github.com/bryntum/support/issues/2140) - WebSocket demo shows incorrect action info in Toast messages
* [#2157](https://github.com/bryntum/support/issues/2157) - Recreating Scheduler Angular component when resources are bound fails in production mode with build
  optimizer enabled
* [#2182](https://github.com/bryntum/support/issues/2182) - Virtual scroller jumps to 0 on first zoom
* [#2184](https://github.com/bryntum/support/issues/2184) - zoomToLevel doesn't return current zoom level
* [#2185](https://github.com/bryntum/support/issues/2185) - Responsive tickSize is not applied to the timeline
* [#2197](https://github.com/bryntum/support/issues/2197) - Broken styles in React demos
* [#2200](https://github.com/bryntum/support/issues/2200) - scrollEventIntoView throws error when event belongs to resource in a collapsed parent

## 4.0.6 - 2020-12-29

### BUG FIXES

* [#1741](https://github.com/bryntum/support/issues/1741) - Modifying assigned resources of Recurring events does not update UI
* [#1821](https://github.com/bryntum/support/issues/1821) - Events multi drag&drop via schedulers works incorrect
* [#2108](https://github.com/bryntum/support/issues/2108) - Update of recurring event creates another repeat of event
* [#2120](https://github.com/bryntum/support/issues/2120) - Filterable function not able to access "property"
* [#2121](https://github.com/bryntum/support/issues/2121) - Zooming in configuration demo breaks time axis

## 4.0.5 - 2020-12-15

### FEATURES / ENHANCEMENTS

* You can now change partnership of Scheduler panels at runtime using `addPartner` / `removePartner` APIs ([#2042](https://github.com/bryntum/support/issues/2042))
* EventTooltip now updates itself if its event record updates while tooltip is visible ([#2077](https://github.com/bryntum/support/issues/2077))

### BUG FIXES

* [#1314](https://github.com/bryntum/support/issues/1314) - Fix for ASPNET demo build in Windows cmd environment
* [#1369](https://github.com/bryntum/support/issues/1369) - Simpleeditor is not aligned with record after create
* [#2082](https://github.com/bryntum/support/issues/2082) - Not possible to configure a config object or Tooltip instance as EventResize#tip

## 4.0.4 - 2020-12-09

### FEATURES / ENHANCEMENTS

* A new Scheduler feature `StickyEvents` enables the textual content of event bars to "stick" within the scrolling
  viewport until the event itself is out of view. ([#390](https://github.com/bryntum/support/issues/390))
* Added `groupRecord`, `groupField`, `groupValue` to `GroupSummary.renderer` config and `SummaryFormatter.generateHtml`
  method ([#1897](https://github.com/bryntum/support/issues/1897))
* A new config `discardPortals` on the React wrapper, that controls the behaviour of cell renderers using React
  components. Set to `false` (default) to enhance performance. Set to `true` to limit memory consumption
* With the TimeRanges feature, you can now easily configure current time indicator to show any text using the updated
  `showCurrentTimeLine` object config
* New fields `resourceMargin` and `barMargin` was added to `ResourceModel`, allowing for per row adjustment of the
  resource margin and the bar margin respectively ([#2014](https://github.com/bryntum/support/issues/2014))

### API CHANGES

* EventEdit feature now exposes an 'isEditing' boolean to detect if the editor is currently visible ([#1935](https://github.com/bryntum/support/issues/1935))
* You can now specify the date to scroll into view initially, using the new `visibleDate` config
* Task and event renderings that return HTML are now placed in a `<span>`. Previously, such text was placed inside a
  `<div>` but the block-level element caused undesirable wrapping. This applies to simple cases such as names with an
  ampersand (`'&'`) character. Simple text is still rendered as a text node. ([#1989](https://github.com/bryntum/support/issues/1989))
* [DEPRECATED] The `getSourceEvent()` and `getTargetEvent()` functions in `DependencyModel` was deprecated in favor of
  the `fromEvent` and `toEvent` getters

### BUG FIXES

* [#70](https://github.com/bryntum/support/issues/70) - Summary and GroupSummary column lines misaligned when autoAdjustTimeAxis is set to false
* [#1303](https://github.com/bryntum/support/issues/1303) - Store sorting improvements
* [#1374](https://github.com/bryntum/support/issues/1374) - Dark theme tab bar has wrong background
* [#1398](https://github.com/bryntum/support/issues/1398) - Error when update current timeline if scheduler is hidden
* [#1763](https://github.com/bryntum/support/issues/1763) - Excel exporter demo doesn't really customize exported columns
* [#1812](https://github.com/bryntum/support/issues/1812) - Make tables look better in docs
* [#1880](https://github.com/bryntum/support/issues/1880) - Crash when dragging right demo splitter
* [#1889](https://github.com/bryntum/support/issues/1889) - Settings not applied for scheduler configured with ViewPreset config object
* [#1892](https://github.com/bryntum/support/issues/1892) - beforeRemove event doesn't cancel Event removal
* [#1906](https://github.com/bryntum/support/issues/1906) - Scheduler resourceTimeRangeStore config doesn't work
* [#1907](https://github.com/bryntum/support/issues/1907) - ResourceTimeRanges feature doesn't support recurring ranges
* [#1911](https://github.com/bryntum/support/issues/1911) - Runtime error with disabled startTimeField or endTimeField for EventEdit
* [#1930](https://github.com/bryntum/support/issues/1930) - Scheduler vertical cell borders missing in vertical mode
* [#1944](https://github.com/bryntum/support/issues/1944) - relayAll targets not cleaned up on destroy
* [#1986](https://github.com/bryntum/support/issues/1986) - Pan feature should be able to coexist with other mouse input features
* [#2030](https://github.com/bryntum/support/issues/2030) - Event edit breaks rendering if beforeEventAdd listener returns false
* [#2036](https://github.com/bryntum/support/issues/2036) - Strange drag behavior when using eventDragSelect with multi assignments

## 4.0.3 - 2020-11-17

### FEATURES / ENHANCEMENTS

* A new Scheduler widget type `undoredo` has been added which, when added to the `tbar` of a scheduling widget
  (such as a `Scheduler`, `Gantt`, or `Calendar`), provides undo and redo functionality
* A new config, `collapseToHeader` on the `GroupSummary` feature makes the headers row of a collapsed group contain the
  summary data for the group. Be aware that the group title is limited in width in a collapsed group header with this
  set so that it does not overflow into summary cells. ([#1355](https://github.com/bryntum/support/issues/1355))
* Added example to columns localization on guide. ([#1846](https://github.com/bryntum/support/issues/1846))
* New `suspendAutoSync()` and `resumeAutoSync()` methods added `ProjectModel` to prevent CrudManager sync operations
  temporarily. ([#1853](https://github.com/bryntum/support/issues/1853))

### BUG FIXES

* [#1286](https://github.com/bryntum/support/issues/1286) - Event Drag/Drop not working for very small unresizable events
* [#1856](https://github.com/bryntum/support/issues/1856) - Scheduler is not defined in menu customization guide
* [#1870](https://github.com/bryntum/support/issues/1870) - Vertical mode example UX issues
* [#1879](https://github.com/bryntum/support/issues/1879) - Incorrect request URL when CrudManager URL contains query string

## 4.0.2 - 2020-11-04

### BUG FIXES

* [#1307](https://github.com/bryntum/support/issues/1307) - Localization for topDateFormat doesn't apply in dayAndWeek and weekAndDay mode
* [#1529](https://github.com/bryntum/support/issues/1529) - Task Editor fields should not marked invalid at initial show

## 4.0.1 - 2020-11-03

### BUG FIXES

* [#1706](https://github.com/bryntum/support/issues/1706) - Toolbar should not be exported
* [#1712](https://github.com/bryntum/support/issues/1712) - Skip non-exportable columns in export dialog window
* [#1740](https://github.com/bryntum/support/issues/1740) - Event name is not shown in Scheduler when using dataSource for the name field
* [#1744](https://github.com/bryntum/support/issues/1744) - eventEdit `items` config should not be of type Array
* [#1747](https://github.com/bryntum/support/issues/1747) - Crash when long pressing splitter on touch devices
* [#1759](https://github.com/bryntum/support/issues/1759) - eventColor in eventRenderer is buggy with HEX colors

## 4.0.0 - 2020-10-19

### FEATURES / ENHANCEMENTS

* [BREAKING] Dropped Support for Edge 18 and older. Our Edge <=18 fixes are still in place and active, but we will not
  be adding more fixes. Existing fixes will be removed in a later version
* [BREAKING] Parts of the Scheduler data layer now use async operations, matching how Scheduler Pro and Gantt works
  This affects manipulations of dates and durations, where the UI will not be updated immediately after data
  manipulations but instead moments later. See the upgrade guide for more information
* Scheduler now optionally can be configured with a `project`. A project is an entity that holds all the stores used by
  the Scheduler, a concept moved down from Gantt & Scheduler Pro. If no project is supplied, one is created internally
  Please see the upgrade guide for more details
* [BREAKING] Multi-assignment was made a first class feature of Scheduler. The Scheduler now always uses an
  AssignmentStore internally. If none is assigned one will be created automatically. This change enables
  multi-assignment to work with more features, since it is now the only mode of operation internally. It still supports
  single assignment using the `resourceId` field on events, by automatically creating assignment records in an internal
  AssignmentStore on load/add/change. We recommend transitioning to always use assignments, as
  `resourceId` might get deprecated in the future
* [BREAKING] The `Core/adapter` directory has been removed. There are no longer any Widget adapters. All Widget classes
  register themselves with the `Widget` class, and the `Widget` class is the source of Widget `type` mapping and Widget
  registration and lookup by `id`
* [BREAKING] The way recurring events are inserted into a Scheduler's timeline has changed. Instead of occurrences being
  dynamically generated upon every data change and change of a scheduler's time axis, no extra events are added into the
  store. Occurrences of recurring events are ephemeral and are returned from the new `EventStore.getEvents` API when
  necessary. This should not affect the default operations of apps, but the differences may be apparent in more
  sophisticated apps. To change an occurrence use `occurrence.beginBatch`, then make changes to including setting its
  `recurrence` to null if it's to be a one-off exception, then use `occurrence.endBatch`. That will update the data and
  the UI. See the upgrade guide in the documentation
* [BREAKING] The `Default`, `Light` and `Dark` themes were renamed to `Classic`, `Classic-Light` and `Classic-Dark`
  This change highlights the fact that they are variations of the same theme, and that it is not the default theme
  (Stockholm is our default theme since version 2.0)
* Context menu features refactoring, please see the upgrade guide for details ([#128](https://github.com/bryntum/support/issues/128)):
    - naming was simplified by removing the word "Context" in feature names and in event names
    - introduced named objects for menu items, allowing easier customization
    - split context menu features by area of responsibility
    - introduced TimeAxisHeaderMenu feature and made it responsible for header menu of TimeAxis column
* Added support for toggling `constrainDragToResource` dynamically ([#542](https://github.com/bryntum/support/issues/542))
* The HeaderContextMenu feature was refactored and renamed to TimeAxisHeaderMenu ([#8783](https://github.com/bryntum/support/issues/8783))
* Column lines are now drawn using divs instead of images + divs. Only divs for lines in view are available in DOM. This
  allows for easier styling and testing of column lines, while only having a very minor impact on performance
* TimeRanges can now show an icon using the `iconCls` field in the data model
* A new event style "rounded" was added, try the updated `eventstyles` demo to see it in action
* Added new config `verticalTimeAxisColumn` that allows configuring the `VerticalTimeAxisColumn` instance used in
  vertical mode with any Column options that apply to it. Changed "vertical" example to use the new
  `verticalTimeAxisColumn` configuration with a field to search values ([#1136](https://github.com/bryntum/support/issues/1136))
* Added a new demo + guide showing how to create a custom event editor ([#957](https://github.com/bryntum/support/issues/957))
* Events have acquired an extra internal element, `.b-sch-event-content`. It is used to allow `text-overflow: ellipsis`,
  padding without affecting minimum width and to allow us to much easier place labels for milestones. It also gives you
  more styling options for your custom look, having an additional element to leverage. Note though that it might affect
  any custom event styling you are using
* Scheduler CrudManager PHP demo now supports multiple resource assignment
* The 3d-bars demo was removed. It has a history of being broken in many releases and was deemed not worth keeping
* Scheduler now extends `Panel` instead of `Container`. This allows you to easily add toolbars to it ([#1417](https://github.com/bryntum/support/issues/1417))
* Added XSS protection to default renderers (based on `StringHelper.encodeHtml` and `StringHelper.xss`)
* Added support to export events to ICS format with the new `TimeSpan#exportToICS` method. Demonstrated in the new
  `exporttoics` example
* Added `scheduler.lite.umd.js` module that does not include `Promise` polyfill. This module is primarily intended to be
  used with Angular to prevent `zone.js` polyfills overwrite
* Added experimental support for Salesforce Locking Service ([#359](https://github.com/bryntum/support/issues/359)). The distributed bundle only supports modern
  browsers (no IE11 or non-chromium based Edge), since Salesforce drops support for these in January 1st 2021 too
* Added Lightning Web Component demo, see `examples/salesforce/src/lwc`
* Dependencies feature has a new public method to get a dependency record from the corresponding DOM element. See
  `resolveDependencyRecord` docs for details

### API CHANGES

* [BREAKING] The `dependencies` feature no longer holds its own store, instead it is configured on Scheduler or in a
  project along with the other stores used by Scheduler. The same applies if configuring it with inline data, the
  `dependencies` config was moved to Scheduler to match how inline data is supplied for other stores
* [BREAKING] Events triggered by the EventDrag feature now always supplies assignment records and event records. If you
  currently use multi-assignment, you might need to adjust your listeners
* [BREAKING] `RecurringEvents` feature was removed. Use the `enableRecurringEvents` boolean config on the Scheduler
* [BREAKING] `RecurringTimeSpans` feature was removed as no longer needed for displaying recurring events
* [BREAKING] Event selection now more clearly distinguishes between selected assignments and selected events. Previously
  for example `scheduler.selectedEvents` would return events or assignments depending on mode. Now it always returns
  events, and assignments are returned by `scheduler.selectedAssignments`. The same thinking applies to the events
  triggered by selection, there is now a new `assignmentSelectionChange` event in addition to the existing
  `eventSelectionChange`
* [BREAKING] The `removeUnassignedEvent` config was moved from Scheduler to EventStore. If you have it explicitly
  configured with `false` or are using a standalone EventStore you might have to add/move it in your code. If you rely
  on an event record being available after being unassigned, you should configure with `removeUnassignedEvent: false`
* [BREAKING] An EventStore is no longer directly linked to a ResourceStore or an AssignmentStore. Nor does it handle the
  date normalization on its own. If you are using standalone stores (not connected to a Scheduler), you have to use a
  project to hold the stores. See the upgrade guide for more information
* [BREAKING] Event records can no longer be shared between multiple stores. The stores can still be shared
* [BREAKING] Field `serialize` function `this` has been changed to refer the field definition (it used to refer the
  model instance before)
* [BREAKING] A clarification to changes in alpha-1, regarding async date manipulation: Dates and durations are also
  calculated async when data is loaded or new events are added. To simplify the transition to this approach new
  awaitable `addAsync()` and `loadDataAsync()` functions were added to project stores. See upgrade guide for more
  information ([#1505](https://github.com/bryntum/support/issues/1505))
* [DEPRECATED] `context.draggedRecords` argument of `Scheduler.feature.EventDrag.validatorFn` function is deprecated
  Use `context.eventRecords` instead
* [DEPRECATED] The `tplData` param in the `eventRenderer` function was deprecated in favor of the new `renderData` param
* [DEPRECATED] abstract `TimeSpanRecordContextMenuBase` class was deprecated, in favor of `TimeSpanMenuBase`
* [DEPRECATED] `HeaderContextMenu` feature was deprecated. `TimeAxisHeaderMenu` was introduced instead
* [DEPRECATED] `EventContextMenu` feature was renamed to `EventMenu`
* [DEPRECATED] `ScheduleContextMenu` feature was renamed to `ScheduleMenu`
* [DEPRECATED] `occurrencesready` event has been removed
* Event elements no longer use cryptic ids (like `id="scheduler-57-r2-x"`). If you need a CSS selector for a specific
  event, you can instead use `[data-event-id="myid"]`. Following this simplification, the `getResourceRecordFromDomId()`
  and `getEventRecordFromDomId()` functions has been removed
* The `WidgetColumn.onBeforeWidgetSetValue` and `WidgetColumn.onAfterWidgetSetValue` functions was made public to allow
  greater control
* Model fields in derived classes are now merged with corresponding model fields (by name) in super classes. This allows
  serialization and other attributes to be inherited when a derived class only wants to change the `defaultValue` or
  other attribute of the field
* The `dateFormat` config for `type='date'` model fields has been simplified to `format`
* Model date fields are serialized by default according to the field `format` ([#273](https://github.com/bryntum/support/issues/273))
* Schedulers "main" stores (EventStore, ResourceStore, AssignmentStore and DependencyStore) has had their event
  triggering modified to make sure data is in a calculated state when relevant events are triggered. This affects the
  timing of the `add`, `remove`, `removeAll`, `change` and `refresh` events. Please see the upgrade guide for more
  information ([#1486](https://github.com/bryntum/support/issues/1486))
* The following previously deprecated members/classes were removed:
    - `ResourceImageColumn.imagePath` and `ResourceImageColumn.defaultImageName`
    - `EditBase.extraWidgets`
    - `ViewPreset`, compatibility layer introduced in 3.0 was removed
    - `TimelineDateMapper.getDateFromX()`
    - `TimelineEventRendering.tickWidth`
    - `beforeZoomChange` and `zoomChange` events for `TimelineViewPresets`

### BUG FIXES

* [#520](https://github.com/bryntum/support/issues/520) - Preventing sync request throws uncatchable exception
* [#592](https://github.com/bryntum/support/issues/592) - Row disappear when scrolling a lot
* [#911](https://github.com/bryntum/support/issues/911) - React custom event editor demo improvements
* [#996](https://github.com/bryntum/support/issues/996) - Type of EditBase#items config docs are wrong
* [#1009](https://github.com/bryntum/support/issues/1009) - Time axis misaligned in vertical mode if scheduler is scrolled
* [#1087](https://github.com/bryntum/support/issues/1087) - Events disappear after a vertical scroll
* [#1199](https://github.com/bryntum/support/issues/1199) - Vertical bold tick line is missing when show only working time and Sunday is filtered out
* [#1266](https://github.com/bryntum/support/issues/1266) - Gantt+Scheduler demo: First scheduler resource row animates into view
* [#1227](https://github.com/bryntum/support/issues/1227) - Crash after undoing event deletion
* [#1337](https://github.com/bryntum/support/issues/1337) - Export columns look strange in demo
* [#1342](https://github.com/bryntum/support/issues/1342) - Scheduler throws when dragging event out of the view on filtered time axis
* [#1345](https://github.com/bryntum/support/issues/1345) - Assignment store changes are not in sync request
* [#1365](https://github.com/bryntum/support/issues/1365) - Editing two events, second edit affects first
* [#1371](https://github.com/bryntum/support/issues/1371) - Possible to change event start date with readonly mode enabled
* [#1373](https://github.com/bryntum/support/issues/1373) - EventEditor demo event styling broken
* [#1376](https://github.com/bryntum/support/issues/1376) - Drag create breaks leaving visible proxy
* [#1378](https://github.com/bryntum/support/issues/1378) - Recurring time ranges missing from recurring time ranges demo
* [#1384](https://github.com/bryntum/support/issues/1384) - Dependency not redrawn on new assignment
* [#1391](https://github.com/bryntum/support/issues/1391) - Scheduler throws when trying to navigate a filtered event store
* [#1392](https://github.com/bryntum/support/issues/1392) - Scheduler throws when trying to remove recurrent event
* [#1396](https://github.com/bryntum/support/issues/1396) - eventStore.getEvents could go into infinite loop if recurrence feature is enabled
* [#1399](https://github.com/bryntum/support/issues/1399) - Improve EventEdit docs* [#1375](https://github.com/bryntum/support/issues/1375) - Vertical mode does not fill viewport correctly
* [#1418](https://github.com/bryntum/support/issues/1418) - Fields missing from AssignmentModel docs
* [#1419](https://github.com/bryntum/support/issues/1419) - An error when using custom renderer for schedulerTooltip
* [#1431](https://github.com/bryntum/support/issues/1431) - Recurring events don't render on load
* [#1447](https://github.com/bryntum/support/issues/1447) - Scheduler big data set example doesn't sort on column click
* [#1462](https://github.com/bryntum/support/issues/1462) - BigDataset demo fails when few resources
* [#1464](https://github.com/bryntum/support/issues/1464) - Bug on Unassign action in Drag from grid demo
* [#1466](https://github.com/bryntum/support/issues/1466) - Newly created event has bad top label in Labels demo
* [#1473](https://github.com/bryntum/support/issues/1473) - Scheduler validation example no longer validates properly
* [#1483](https://github.com/bryntum/support/issues/1483) - Fixed time format with AM/PM removing the "0" changing from 09:00 PM to 9:00 PM. Changed viewPreset
  `hourAndDay` on `middleDateFormat` to `K` for en-US locale
* [#1487](https://github.com/bryntum/support/issues/1487) - Dependency lines are not removed when regenerating dataset
* [#1497](https://github.com/bryntum/support/issues/1497) - Event added using Plus button on the TopBar loses some data
* [#1499](https://github.com/bryntum/support/issues/1499) - Cannot edit standalone event having startDate + duration
* [#1542](https://github.com/bryntum/support/issues/1542) - Scheduler put inside of panel gets narrow with overlay scrollbar
* [#1546](https://github.com/bryntum/support/issues/1546) - Cannot drag drop narrow events
* [#1548](https://github.com/bryntum/support/issues/1548) - [ANGULAR] Investigate zone.js loading order and set it to Angular default
* [#1552](https://github.com/bryntum/support/issues/1552) - ExtJS Scheduler demo: Uncaught TypeError: Cannot read property 'getTime' of null
* [#1564](https://github.com/bryntum/support/issues/1564) - scrollToNow() results in wrong timeline headers
* [#1570](https://github.com/bryntum/support/issues/1570) - Events disappear when scrolling
* [#1576](https://github.com/bryntum/support/issues/1576) - Setting resourceId via set method does not update assignment
* [#1582](https://github.com/bryntum/support/issues/1582) - Next valid drag after invalid drag is broken in Safari
* [#1590](https://github.com/bryntum/support/issues/1590) - Summary feature redundant refreshing
* [#1607](https://github.com/bryntum/support/issues/1607) - constrainDragToTimeSlot does not maintain event start date while dragging
* [#1642](https://github.com/bryntum/support/issues/1642) - Scheduler.scrollToNow() during paint broken when part of TabPanel

## 3.1.9 - 2020-08-26

### BUG FIXES

* [#779](https://github.com/bryntum/support/issues/779) - Working time: Crash when dragging event starting & ending outside timeaxis
* [#1351](https://github.com/bryntum/support/issues/1351) - EventStore + syncDataOnLoad = crash
* [#1353](https://github.com/bryntum/support/issues/1353) - Exporting scheduler with groups to excel crashes

## 3.1.8 - 2020-08-11

### BUG FIXES

* [#1244](https://github.com/bryntum/support/issues/1244) - Initial export options are shown incorrectly in the export dialog
* [#1263](https://github.com/bryntum/support/issues/1263) - eventStyle 'colored' not populated for hex color codes

## 3.1.7 - 2020-07-24

### FEATURES / ENHANCEMENTS

* Added new exporter: MultiPageVertical. It fits content horizontally and then generates vertical pages to fit vertical
  content. ([#1092](https://github.com/bryntum/support/issues/1092))

### BUG FIXES

* [#402](https://github.com/bryntum/support/issues/402) - Export UI should validate date range fields
* [#460](https://github.com/bryntum/support/issues/460) - Make RecurrenceConfirmationPopup buttons handlers public
* [#563](https://github.com/bryntum/support/issues/563) - Tick size cannot be set less than certain value
* [#910](https://github.com/bryntum/support/issues/910) - Crash when exporting to PDF if schedule area has no width
* [#953](https://github.com/bryntum/support/issues/953) - Load mask appearing on top of export progress
* [#969](https://github.com/bryntum/support/issues/969) - Multi page export of more than 100 tasks fails
* [#972](https://github.com/bryntum/support/issues/972) - Export feature does not export dependencies unless visible first
* [#973](https://github.com/bryntum/support/issues/973) - Export feature does not respect left grid section width
* [#1093](https://github.com/bryntum/support/issues/1093) - DatePicker should respect weekStartDay timeline config
* [#1172](https://github.com/bryntum/support/issues/1172) - Wrapper should not relay store events to the instance
* [#1175](https://github.com/bryntum/support/issues/1175) - Resize cursor stuck after clicking event resize handle
* [#1180](https://github.com/bryntum/support/issues/1180) - Exported grid should end with the last row
* [#1198](https://github.com/bryntum/support/issues/1198) - Resizing left handle outside schedule area to the left stretches event width
* [#1201](https://github.com/bryntum/support/issues/1201) - Event not refreshed if dropping it back in same position in Websocket demo
* [#1249](https://github.com/bryntum/support/issues/1249) - Columns lines are not exported correctly
* [#1252](https://github.com/bryntum/support/issues/1252) - Adding predecessor removes dependency line to the successor
* [#1256](https://github.com/bryntum/support/issues/1256) - Initial animation aborted
* [#1260](https://github.com/bryntum/support/issues/1260) - Scheduler freezes after drag drop with many events

## 3.1.6 - 2020-07-10

### FEATURES / ENHANCEMENTS

* Added Docker image of the PDF Export Server. See server README for details. ([#905](https://github.com/bryntum/support/issues/905))

### API CHANGES

* [DEPRECATED] To avoid risk of confusing the Scheduler instance with the calculation engine,  `schedulerEngine` has
  been deprecated in favor of `schedulerInstance` in all framework wrappers (Angular, React, Vue). ([#776](https://github.com/bryntum/support/issues/776))

### BUG FIXES

* [#897](https://github.com/bryntum/support/issues/897) - Splitter does not work on iPads
* [#974](https://github.com/bryntum/support/issues/974) - Cannot hide Delete button in EventEditor
* [#1005](https://github.com/bryntum/support/issues/1005) - Vertical mode not working in Vue
* [#1067](https://github.com/bryntum/support/issues/1067) - VerticalTimeAxisColumn header should be not focusable
* [#1095](https://github.com/bryntum/support/issues/1095) - Time header get blank when changing view preset after export

## 3.1.5 - 2020-06-09

### FEATURES / ENHANCEMENTS

* Updated Font Awesome Free to v5.13.0
* Updated ScheduleTooltip docs to show how to customize the tip content ([#809](https://github.com/bryntum/support/issues/809))
* ScheduleTooltip is now shown also when Scheduler is readOnly, set the feature to disabled to hide it completely
* [DEPRECATED] ScheduleTooltip#getHoverTipHtml is now deprecated in favor of the new `generateTipContent` method
  allowing you to completely customize the markup shown inside it
* Removed React and Vue CDN demos in favor of existing framework examples ([#840](https://github.com/bryntum/support/issues/840))
* Moved localization from `'GridBase.serverResponseLabel` to `'CrudManagerView.serverResponseLabel`
* Renamed localization from `RecurrenceCombo.Custom...` to `RecurrenceCombo.Custom`

### BUG FIXES

* [#780](https://github.com/bryntum/support/issues/780) - removeRow text missing
* [#791](https://github.com/bryntum/support/issues/791) - Dependency creation tooltip is always invalid in angular when module bundle is used instead of umd
* [#846](https://github.com/bryntum/support/issues/846) - No scheduleclick event triggered in IE in area next to splitter
* [#865](https://github.com/bryntum/support/issues/865) - afterEventDrop is not fired when event is dropped outside the timeline
* [#881](https://github.com/bryntum/support/issues/881) - Tooltip is blinking in Firefox when hoverDelay is specified
* [#886](https://github.com/bryntum/support/issues/886) - commit triggered twice after event dragged from partner
* [#896](https://github.com/bryntum/support/issues/896) - Event element is left when reassign is used on the event model and autoCommit is enabled

## 3.1.4 - 2020-05-19

### BUG FIXES

* [#772](https://github.com/bryntum/support/issues/772) - undefined query parameter in CrudManager URLs

## 3.1.3 - 2020-05-14

### FEATURES / ENHANCEMENTS

* Scrolling in a dataset with varying row heights has been improved. Scheduler now pre-calculates heights up to a
  configurable row count limit and populates a row height map used to estimate the total scroll height better

### BUG FIXES

* [#322](https://github.com/bryntum/support/issues/322) - Fields with complex mapping are not updated properly on sync
* [#539](https://github.com/bryntum/support/issues/539) - Scrollbar changes position during scroll when row heights vary greatly in a small dataset
* [#553](https://github.com/bryntum/support/issues/553) - Loadmask not hidden after load fails
* [#554](https://github.com/bryntum/support/issues/554) - Safari shows wrong dates in event editor
* [#565](https://github.com/bryntum/support/issues/565) - Scheduler Export to PDF failed with grouping enabled
* [#570](https://github.com/bryntum/support/issues/570) - Scrolling with touch doesn't work on events
* [#583](https://github.com/bryntum/support/issues/583) - CrudManager should load URL provided in requestConfig
* [#603](https://github.com/bryntum/support/issues/603) - Resource images in ResourceInfoColumn flicker after record update
* [#638](https://github.com/bryntum/support/issues/638) - constrainToTimeSlot setting not cleared when drag starts

## 3.1.2 - 2020-04-17

### FEATURES / ENHANCEMENTS

* The scheduler.module.js bundle is now lightly transpiled to ECMAScript 2015 using Babel to work with more browsers out
  of the box
* The PDF Export feature scrolls through the dataset in a more efficient manner. [#578](https://github.com/bryntum/support/issues/578)

### BUG FIXES

* [#443](https://github.com/bryntum/support/issues/443) - Failed CrudManager load/sync should show failure message just like Store loading does
* [#464](https://github.com/bryntum/support/issues/464) - Dependencies are not refreshed after filtering with schedule region collapsed
* [#471](https://github.com/bryntum/support/issues/471) - CrudManager + AjaxHelper sends wrong content type
* [#515](https://github.com/bryntum/support/issues/515) - Dependencies cannot be created in scheduler web component
* [#572](https://github.com/bryntum/support/issues/572) - CrudMananger load GET request has Content-Type header set to json

## 3.1.1 - 2020-03-27

### BUG FIXES

* [#120](https://github.com/bryntum/support/issues/120) - Vertical mode misses 'renderTimeSpan' method
* [#314](https://github.com/bryntum/support/issues/314) - Load mask is not hidden after receiving unsuccessful response
* [#369](https://github.com/bryntum/support/issues/369) - Resource time range title changes on scrolling in vertical mode
* [#404](https://github.com/bryntum/support/issues/404) - Crash in CrudManager demo after saving updated event
* [#409](https://github.com/bryntum/support/issues/409) - Crash when clicking next time arrow in event editor if end date is cleared
* [#441](https://github.com/bryntum/support/issues/441) - Recurrence dialog is too narrow
* [#445](https://github.com/bryntum/support/issues/445) - React: Scheduler crashes when features object passed as prop
* [#454](https://github.com/bryntum/support/issues/454) - "No records to display" shown during loading
* [#457](https://github.com/bryntum/support/issues/457) - Docker container with gantt ASP.NET Core demo cannot connect to MySQL container
* [#459](https://github.com/bryntum/support/issues/459) - Event editor should be scrollable if it does not fit in viewport
* [#466](https://github.com/bryntum/support/issues/466) - `constrainDragToResource` should be supported in vertical mode

## 3.1.0 - 2020-03-10

### FEATURES / ENHANCEMENTS

* New Recurring Events React+TypeScript demo ([#655](https://github.com/bryntum/support/issues/655))
* New Recurring Events Angular 9 demo ([#654](https://github.com/bryntum/support/issues/654))
* Added new demos showing integration with .NET backend and .NET Core backend ([#299](https://github.com/bryntum/support/issues/299))
* Font Awesome 5 Pro was replaced with Font Awesome 5 Free as the default icon font (MIT / SIL OFL license)

### BUG FIXES

* [#083](https://github.com/bryntum/support/issues/083) - Drag selection element position wrong if page is scrolled
* [#320](https://github.com/bryntum/support/issues/320) - Resource margin does not affect milestone size
* [#346](https://github.com/bryntum/support/issues/346) - Cascading combo box not editable
* [#347](https://github.com/bryntum/support/issues/347) - Crash if starting timerange drag while previous drag operation is finalizing
* [#348](https://github.com/bryntum/support/issues/348) - Tooltip misaligned after clicking add in tasks demo
* [#380](https://github.com/bryntum/support/issues/380) - Vue custom event editor shows editor only once
* [#384](https://github.com/bryntum/support/issues/384) - Dependencies not repainted after group collapse / expand
* [#385](https://github.com/bryntum/support/issues/385) - Ghost event element remains in view after adding new event/resource and syncing changes to backend
* [#403](https://github.com/bryntum/support/issues/403) - Aborted fetch should not create exception in console

## 3.0.4 - 2020-02-24

### FEATURES / ENHANCEMENTS

* Compressed non-working time was added to TimeAxis demo ([#319](https://github.com/bryntum/support/issues/319))

### BUG FIXES

* [#198](https://github.com/bryntum/support/issues/198) - Promise not resolved when showing a shown Popup
* [#203](https://github.com/bryntum/support/issues/203) - Events stay selected after other events selection if they are not in the viewport
* [#288](https://github.com/bryntum/support/issues/288) - Add recurringTimeSpans to framework wrappers and update guides
* [#292](https://github.com/bryntum/support/issues/292) - Crash when using arrow key in simple event editor
* [#295](https://github.com/bryntum/support/issues/295) - Scroll is reset to top after clicking time axis in vertical mode
* [#333](https://github.com/bryntum/support/issues/333) - Crash when creating dependency in web components demo

## 3.0.3 - 2020-02-13

### FEATURES / ENHANCEMENTS

* Added a new demo using cellGenerator + improved cellGenerator docs  ([#250](https://github.com/bryntum/support/issues/250))
* Added new `resourceheaderclick`, `resourceheaderdblclick`, `resourceheadercontextmenu` events fired when interacting
  with resource header in vertical mode ([#282](https://github.com/bryntum/support/issues/282))

### API CHANGES

* [DEPRECATED] The `beforeZoomChange` and `zoomChange` events are deprecated. These are synonyms for
  `beforePresetChange` and `presetChange`

### BUG FIXES

* [#194](https://github.com/bryntum/support/issues/194) - fillTicks fills the next day if time is 00:00:00
* [#243](https://github.com/bryntum/support/issues/243) - Scheduler doesn't properly render rows for resource tree loaded on demand
* [#245](https://github.com/bryntum/support/issues/245) - timeRanges not refreshed if its store uses beginBatch/endBatch
* [#260](https://github.com/bryntum/support/issues/260) - Cannot enter negative lag in dependency editor
* [#263](https://github.com/bryntum/support/issues/263) - Scrolling breaks after event resize
* [#276](https://github.com/bryntum/support/issues/276) - Event disappears after drag drop (Angular Drag from Grid demo)

## 3.0.2 - 2020-01-30

### FEATURES / ENHANCEMENTS

* PDF export server was refactored. Removed websocket support until it is implemented on a client side. Added logging
  Added configuration file (see `app.config.js`) which can be overridden by CLI options. Multipage export performance
  was increased substantially (see `max-workers` config in server readme)
  ([#112](https://github.com/bryntum/support/issues/112))

### API CHANGES

* Added `image` field for `ResourceModel`

### BUG FIXES

* [#195](https://github.com/bryntum/support/issues/195) - ExtJS modern demo: not possible to create more than one instance dynamically
* [#207](https://github.com/bryntum/support/issues/207) - EventDrag constraint wrong when constrainDragToTimeline is false
* [#210](https://github.com/bryntum/support/issues/210) - Assignment store does not fire `change` event when editing resources
* [#220](https://github.com/bryntum/support/issues/220) - Load mask with CrudManager not working
* [#226](https://github.com/bryntum/support/issues/226) - columnLinesFor config is ignored when switching between view presets
* [#233](https://github.com/bryntum/support/issues/233) - Assignments updated when just changing event dates in event editor
* [#234](https://github.com/bryntum/support/issues/234) - Missing "Recurring events" demo resource image

## 3.0.1 - 2020-01-17

### FEATURES / ENHANCEMENTS

* PDF Export feature uses *Scheduler* as the default file name ([#117](https://github.com/bryntum/support/issues/117))
* Added new Grid methods `enableScrollingCloseToEdges` / `disableScrollingCloseToEdges` to activate automatic scrolling
  of a SubGrid when mouse is close to the edges. Demonstrated in the updated scheduler 'dragfromgrid' demo
* Added support to show async tooltips ([#148](https://github.com/bryntum/support/issues/148)). Showcased in updated `tooltips` demo. See EventTooltip feature docs
  for information

### API CHANGES

* [BREAKING] (for those who build from sources): "Common" package was renamed to "Core", so all our basic classes should
  be imported from `lib/Core/`
* Added `resourceImageExtension` config to `SchedulerEventRendering` mixin to support setting resource image extension
* EventNavigation#navigator config changed from public to internal. This config should not be needed in normal use of
  the Scheduler

### BUG FIXES

* [#25](https://github.com/bryntum/support/issues/25) - eventContextMenu triggered when right clicking summary bar
* [#45](https://github.com/bryntum/support/issues/45) - Event not derendered after setting future dates in event editor of new event
* [#59](https://github.com/bryntum/support/issues/59) - EventDragSelect feature selects events even if drag happens on locked grid
* [#62](https://github.com/bryntum/support/issues/62) - Event disappears after drag cancelled with ESC and followed by ZoomIn/Out
* [#96](https://github.com/bryntum/support/issues/96) - Drag create proxy not removed if autoClose is false on EventEdit feature
* [#97](https://github.com/bryntum/support/issues/97) - weekStartDay not updated after localization
* [#104](https://github.com/bryntum/support/issues/104) - Calendar icon should be shown in tooltips if date format doesn't include hour info
* [#105](https://github.com/bryntum/support/issues/105) - Time axis breaks after scrolling leftwards a long way bug high-priority resolved
* [#119](https://github.com/bryntum/support/issues/119) - Infinite image requests in vertical demo
* [#129](https://github.com/bryntum/support/issues/129) - Crash when exporting scheduler with no dependencies
* [#130](https://github.com/bryntum/support/issues/130) - Crash when export Scheduler with columnLines disabled
* [#136](https://github.com/bryntum/support/issues/136) - PresetManager methods not declared as static in gantt.d.ts
* [#137](https://github.com/bryntum/support/issues/137) - Drag drop of multiple selected events in vertical mode does not work
* [#146](https://github.com/bryntum/support/issues/146) - Recurring event not rendering occurrences
* [#163](https://github.com/bryntum/support/issues/163) - Recurrence UI should be disabled by default
* [#168](https://github.com/bryntum/support/issues/168) - Broken Vue CDN demo
* [#169](https://github.com/bryntum/support/issues/169) - Features disabled in Vue demos
* [#189](https://github.com/bryntum/support/issues/189) - DOCS: Public configs should not link to private configs/classes

## 3.0.0 - 2019-12-20

### FEATURES / ENHANCEMENTS

* New Ionic Themes demo which shows using and changing included themes. (#9394)
* Added support for exporting the Scheduler to PDF and PNG. It is showcased in several examples, pdf-export for Angular,
  React and Vue frameworks, as well as in examples/export. The feature requires a special export server, which you can
  find in the examples/_shared/server folder. You will find more instructions in the README.md file in each new demo. (
  #6268)
* Added public config to disable recurring event fields in event editor UI ([#71](https://github.com/bryntum/support/issues/71))

### API CHANGES

* [BREAKING] The `ViewPreset` now uses a `headers` array instead of named header levels in a `headerConfig` property. So
  the `columnLinesFor` property is now an index into that array. (#9325, #4469)
* ViewPresets and zoom levels were refactored for easier usage. `ViewPresets` are now contained in a `PresetStore` and
  zooming steps between them, removing the need of manually defining `zoomLevels`
* TimeSpan (and its subclasses such as EventModel) now uses `DateHelper.defaultFormat` as the default format for parsing
  strings to dates (applies to `startDate` and `endDate`). The actual format used by default is still the same, but now
  more easily configurable ([#32](https://github.com/bryntum/support/issues/32))
* Scheduler now also uses `DateHelper.defaultFormat` as its default format for the timeaxis start and end dates. This
  change makes it behave slightly different, previously it would expect milliseconds in its format and now it does not
* Scheduler#getDateFromX is deprecated because it is orientation dependent. Scheduler#getDateFromCoordinate should be
  used if you have the position on the correct axis, or Scheduler.getDateFromXY if you have a coordinate pair

### BUG FIXES

* [#6](https://github.com/bryntum/support/issues/6) - hideHeaders in combination with timeRanges causes crash
* [#18](https://github.com/bryntum/support/issues/18) - onEventCommit triggers too many row refreshes
* [#58](https://github.com/bryntum/support/issues/58) - Timeline is broken when event is scrolled into view
* [#65](https://github.com/bryntum/support/issues/65) - Event is not repainted to the updated time if its resource has been changed too
* [#72](https://github.com/bryntum/support/issues/72) - Drop date is resolved based on cursor position instead of proxy element
* #8569 - Scheduler doesn't paint events for resource with id 0
* #8570 - Dependencies with id: null are reusing one dependency line
* #9456 - Event editor recurring UI should be hidden when RecurringEvents feature is disabled

## 2.3.1 - 2019-11-20

### BUG FIXES

* [#3](https://github.com/bryntum/support/issues/3) - Crash when using recurrence custom field

## 2.3.0 - 2019-11-06

### FEATURES / ENHANCEMENTS

* Scheduler now supports recurring events (#8305). See new `recurrence` demo and `recurringEvents` feature in the
  docs for details
* Added a thinner version of Scheduler called `SchedulerBase`. It is a Scheduler without default features, allowing
  smaller custom builds using for example WebPack. See the new `custom-build` demo for a possible setup (#7883)
* Event removal using keyboard and the event editor is now both preventable through the `beforeEventDelete` event
  triggered on Scheduler (#8681)
* The horizontal time axis header now only renders ticks in view, reducing the performance impact of displaying long
  time ranges (#9022)
* Added `dragHelperConfig` to EventDrag feature to be able to easily configure the internal DragHelper instance
  (#9276)
* `mode` property is supported by Angular/React/Vue wrappers by default now (#9320)
* `scheduleClick`, `scheduleDblClick` and `scheduleContextmenu` events now also include information about the current
  tickStartDate and tickEndDate of the timeAxis
* New `scheduleMouseMove` event added with same event signature as `scheduleClick`
* Support for disabling features at runtime has been improved, all features except Tree can now be disabled at any time
* Widgets may now adopt a preexisting DOM node to use as their encapsulating `element`. This reduces DOM footprint when
  widgets are being placed inside existing applications, or when used inside UI frameworks which provide a DOM node. See
  the `adopt` config option. (#9414)
* The `dragfromgrid` demo was updated with toggling between vertical and horizontal mode (#8985)
* The `drag-between-schedulers` and `partners` demos uses a new Splitter widget to allow adjusting the size of the
  Schedulers (#9138)
* Experimental: The React wrapper has been updated to support using React components (JSX) in cell renderers and as cell
  editors. Please check out the updated React demos to see how it works (#7334, #9043)
* React Integration Guide updated with information on new JSX and React Components renderers and editors support
  (#9245)
* Added new Angular 8 demo (#9336)

### BUG FIXES

* #7998 - DOCS: Links are wrong if open grid docs from scheduler docs
* #8272 - Dep lines can be orphaned when multiassigned event shares resource with single assigned
* #8522 - STYLING: Line header element and body element should have same color
* #8642 - Custom event sorting is not supported
* #8660 - DOCS: Column lines major ticks are not thicker
* #8702 - TimeRanges feature throws an exception when Scheduler is in a Popup
* #8898 - Resizing should work also when events are small
* #9036 - Assigning to a resource which is filtered out doesn't move event to the resource
* #9234 - Event disappears on drag/drop between multiple schedulers
* #9236 - Dependency store changes are not empty after initialization
* #9249 - Tooltip End Date wrong if event ends on midnight
* #9254 - draggable field not respected for multi-event drag
* #9258 - VUE: Custom Event Editor demo does not use the full screen height on iPad
* #9270 - Crash after creating event in vertical mode after sync
* #9307 - eventDragSelect feature missing from react wrappers
* #9316 - Should be possible to specify renderer for ResourceInfoColumn
* #9395 - Code shown in ResourceInfoColumn after few changes to events

## 2.2.5 - 2019-09-16

### FEATURES / ENHANCEMENTS

* Added example that shows how to use Vue popup as a custom event editor and (Partial fix #8721)
* Added example that shows how to use Angular popup as a custom event editor (#8721)

### BUG FIXES

* #9110 - Crash if undoing change to event which is inside collapsed parent
* #9199 - TimelineZoomable passes level: -1 in the zoomChange event
* #9202 - ResourceInfo column reloads non-existing image instantly
* #9210 - Crash when opening eventEditor programmatically in vertical mode
* #9215 - CrudManager only syncs featured stores
* #9216 - DOCS: Nested configs look broken
* #9218 - TimeRanges feature doesn't update element properly on id change
* #9224 - CrudManager doesn't commit records on sync
* #9232 - getStartEndDatesFromRectangle not implemented for vertical mode
* #9241 - EventTooltip hides on left/right scroll with magic mouse while still over an event

## 2.2.4 - 2019-09-09

### FEATURES / ENHANCEMENTS

* Added a customization guide about switching to Material Icons (#8969)
* New example that shows how to use React popup form as a custom event editor (partial fix of #8721)
* Added `triggerEvent` config for TimeSpanRecordContextMenuBase (inherited in ScheduleContextMenu, EventContextMenu), to
  set event which triggers context menu (#8757)
* Scheduler now fires `eventDragAbort` in case of an aborted drag operation (#9195)

### BUG FIXES

* #7809 - eventType field should update visibility of the other EventEditor fields
* #8658 - STYLING: Milestone layout demo renders incorrectly
* #9067 - Crud manager should support fetchOptions
* #9111 - Unexpected transitions for existing events when adding new events
* #9149 - Crash when dragging many tasks and some end up outside time axis, then dragged back
* #9150 - TimeAxis#round off for distant months
* #9151 - Event bars of multi week events not visible at extreme zoom in levels
* #9168 - Default image not shown after scrolling
* #9192 - Crash in vertical mode if calling store.endBatch

## 2.2.3 - 2019-08-27

### FEATURES / ENHANCEMENTS

* A new `resourceMargin` config was added to Scheduler, to allow more control over the event layout. Use it to specify
  the margin between the first/last stacked/packed event within a resource and the resources edges (row or column
  depending on mode). Defaults to use the configured `barMargin`, making it backwards compatible (#7888)
* A `readOnly` mode was added to the event editor (#8343)

### API CHANGES

* The default region for new columns has changed to be the first region (usually "locked") in Scheduler (#7423)

### BUG FIXES

* #6357 - Dependency creation tooltip prevents creating dependecies in some cases
* #7816 - Investigate performance when changing start/end dates
* #8093 - No need to redraw other rows on changes with eventLayout: 'none'
* #8764 - Partner timelines out of sync after zooming
* #8772 - ScheduleTooltip should reposition itself upon hover over it
* #8947 - VERTICAL: Scroll to date not functioning
* #8998 - ResourceTimeRanges not drawn after clearing and repopulating resource store
* #9004 - Resource images reloaded upon every Resource change
* #9017 - zoomchange event signature doesn't match doc
* #9032 - Adding event when no rows to display fails with exception
* #9046 - Angular-N demos are broken
* #9073 - vue drag-from-grid demo cannot be built with yarn
* #9090 - Resource images reloaded when resource column width changes
* #9098 - Warn users if scrollEventIntoView is not possible
* #9105 - STYLING: Change major tick column lines to use Grid's cell border color, minor tick lines slightly
  faded
* #9112 - Crash when modifying number of resources in bigdataset demo
* #9115 - Timerange header position is incorrect after scroll
* #9120 - Vertical scheduler throws exception when autoHeight is true
* #9127 - ResourceInfoColumn.validNames null disallows all names

## 2.2.2 - 2019-08-15

### FEATURES / ENHANCEMENTS

* Support for dragging multiple events at once was added, check it out in the `dragselection` demo (#8289)
* New Ext Scheduler to Bryntum Scheduler migration guide (#8595)

### BUG FIXES

* #7697 - Milestone position wrong in Custom Event Styling demo
* #8456 - Dependencies feature not working in nested events demo
* #8722 - No context menu shown when dependencies initialized as disabled or get disabled
* #8842 - beforeclose event not fired consistently for EventEditor
* #8939 - HeaderContextMenu range setting does not handle sub-day ticks
* #8965 - Resource time ranges missing after filtering + zooming
* #8972 - Crash in vertical mode if a resource has no name defined
* #8994 - Advanced Angular demo (angular 8) fails to run production build
* #9009 - Dependency terminals visible after event resize with 'allowCreate' set to false

## 2.2.1 - 2019-07-24

### BUG FIXES

* #8730 - Dependencies are not redrawn after change
* #8877 - Crash in Tasks demo when typing arrow right on an event
* #8893 - PHP demo: doesn't save changes for newly created events
* #8894 - PHP demo: fails when try to edit an event after another is created
* #8923 - Child nodes not shown for newly added resource in a tree
* #8933 - Vue trial demos don't work in IE11
* #8942 - Crash when starting vertical mode demo on touch device
* #8943 - Crash when dragging newly created event
* #8944 - Crash when clicking next arrow in start date field of date range menu
* #8946 - VERTICAL: Resizing small event starts both resize + drag

## 2.2.0 - 2019-07-19

### FEATURES / ENHANCEMENTS

* New vertical rendering mode added showing resources on the horizontal axis and time on the vertical axis. The vertical
  mode compatible with most Scheduler features, be sure to check out the new `vertical` demo (#7504)
* New integration example Filtering Scheduler for React with TypeScript (#7408)
* Scheduler now supports zooming by dragging a range in the time axis header. Use the new HeaderZoom feature to enable
  this behavior (#8747)
* Added a `resourceImagePath` to Scheduler, for shared usage by features that displays resource miniatures (such as
  ResourceInformationColumn and the header in vertical mode)
* [BREAKING] The Bryntum Scheduler wrapper for React and Angular has been rewritten to support passing different values
  to features and config options with same names. Property names must be now suffixed with `Feature` to differentiate
  features and config options, for example `timeRangesFeature`. In this example, `timeRangesFeature` would be propagated
  to Scheduler features and `timeRanges` property would go to Scheduler itself

### API CHANGES

* [DEPRECATED] ResourceInfoColumns `imagePath` and `defaultImageName` configs was deprecated in favour of the new
  `resourceImagePath` and `defaultResourceImageName` configs on Scheduler
* [DEPRECATED] Scheduler's `tickWidth` property is deprecated, it is called `tickSize` now

### BUG FIXES

* #8694 - Touch drag on events should only start after a small delay
* #8736 - nonWorkingTime feature highlights wrong zones when scheduler shows only working time
* #8867 - React drag onto tasks demo in full screen
* #8873 - VUE Localization demo: Locales are hardcoded
* #8878 - Specifying listeners for event editor breaks drag create feature and tooltip
* #8918 - ResourceTimeRanges not rendered when filtering tasks

## 2.1.3 - 2019-07-04

### FEATURES / ENHANCEMENTS

* The integration guides for Angular, React and Vue have been updated to reflect the latest versions of our examples and
  wrappers

### BUG FIXES

* #8746 - Drag and drop breaks row rendering when the view is scrolled and drop makes events overlapped
* #8750 - Scheduler shouldn't fire beforeEventAdd event if eventEdit feature exists
* #8804 - Error / warnings in console of web components demo
* #8818 - PHP demo: creating a new event fails
* #8819 - PHP demo: changing assignment to a different resource duplicates the event
* #8843 - Drag between schedulers: Bottom scheduler header bug
* #8868 - Crash when zooming in narrow screensize
* #8871 - Exception thrown when removing event under mouse pointer

## 2.1.2 - 2019-06-27

### BUG FIXES

* #8667 - GroupSummary sometimes not rendering
* #8705 - Not possible to disable dependency creation
* #8719 - Clean up public configs that were removed in 2.1 release (showAddEventInContextMenu,
  showRemoveEventInContextMenu, showUnassignEventInContextMenu)
* #8720 - REGRESSION: readOnly mode should disable default context menu items
* #8726 - DependencyEdit editDependency crashes when called programmatically
* #8761 - Grid vertical scroll height not updated after event add
* #8762 - Time range elements are sized incorrectly when zooming out

## 2.1.1 - 2019-06-14

### BUG FIXES

* Unfortunately we broke event animations in 2.1.0, this release re-enables them

## 2.1.0 - 2019-06-12

### FEATURES / ENHANCEMENTS

* Bumped built in FontAwesome to version 5.8.2
* Demos now have a built in code editor that allows you to edit their code (Chrome only) and CSS (#7210)
* Scheduler now supports selecting multiple events using drag drop (#8647)
* Scheduler now has a new SimpleEventEdit feature for editing the name of an event (#8648)
* Multiple new Angular demos added, see the `examples/angular` folder

### API CHANGES

* The `cls` property of `Scheduler.model.Event` is now an instance of `Common.helper.util.DomClassList`. Code which uses
  it as a string will continue to work as the class has a `toString` implementation, and the `set Cls` setter will
  promote incoming strings. But using the `DomClassList` API allows easy adding and removal of individual CSS classes,
  easy testing for presence of a CSS class and more accurate comparisons of two Events' classes. The
  `DomClassList#isEqual` method will work regardless of the _order_ that class names were added
* Scheduler repaints dependencies asynchronously when dependency, assignment or event is changed. Use
  `dependenciesDrawn` event to know when dependency lines are actually painted. `draw`, `drawDependency` and
  `drawForEvent` are still synchronous
* [BREAKING] Context menu Features are configured in a slightly different way in this version. If you have used the
  `extraItems` or `processItems` options to change the contents of the shown menu, this code must be updated. Instead of
  using `extraItems`, use `items`

  The `items` config is an *`Object`* rather than an array. The property values are your new submenu configs, and the
  property name is the menu item name. In this way, you may add new items easily, but also, you may override the
  configuration of the default menu items that we provide

  The default menu items now all have documented names (see the `defaultItems` config of the Feature), so you may apply
  config objects which override default config. To remove a provided default completely, specify the config value as
  `false`

  This means that the various `showXxxxxxxInContextMenu` configs in the Scheduler are now ineffective. Simply use for
  example, `items : { deleteEvent : false }` to remove a provided item by name

  `processItems` now recieves its `items` parameter as an `Object`, so finding predefined named menu items to mutate is
  easier. Adding your own entails adding a new named config object. Use the `weight` config to affect the menu item
  order. Provided items are `weight : 0`. Weight values may be negative to cause your new items to gravitate to the top
* [DEPRECATED] EventEdit's `extraWidgets` config was deprecated and will be removed in a future version. Please use
  `extraItems` instead
* [BREAKING] EventSelection#deselectEvent now always maintains current selected events. (#8646)

### BUG FIXES

* #8063 - Drag resize ignores allowOverlap set to false
* #8205 - Dependencies can be rendered wrong for out of view events/tasks
* #8245 - Aborting task drag with ESC does not redraw dependency
* #8258 - Scheduler/examples/multiassign-with-dependencies/ throws error when dragging event and mouse moves over
  splitter
* #8380 - Non working time should highlight header time axis cells
* #8393 - CrudManager tries to sync invalid record
* #8544 – React: drag from grid freeze bug
* #8546 - scrollEventIntoView/scrollResourceEventIntoView should focus event element
* #8584 - ColumnLines feature misrendering
* #8600 - Zoom to fit not functioning correctly
* #8601 - Nested demo: nested event styles
* #8657 - Presets should have column lines defined for the lowest header level by default
* #8663 - Rendering broken in drag from grid demo

## 2.0.3 - 2019-05-23

### FEATURES / ENHANCEMENTS

* EventDrag feature can now be programmatically disabled

### API CHANGES

* CrudManager would previously when used with a tree store erroneously append new records from the backend without
  specified `parentId` to the first record in the store, whereas it now will append them to the root

### BUG FIXES

* #7561 - Should be able to use Grid & Scheduler & Gantt bundles on the same page
* #8350 - Pan feature should also scroll the view by clicking on an event when drag and drop is disabled
* #8369 - ResourceInfoColumn should show default image if loading fails
* #8392 - 'cls' CSS class not added to rendered dependency
* #8398 - Event not selected if clicking the resize handle
* #8403 - Workingtime demo: Drag create out the right side of the time axis
* #8411 - Scheduler redrawn twice on EventStore dataset
* #8431 - Drag between schedulers demo not working with mobile device
* #8484 - New events not saved in CrudManager demo
* #8487 - Unchanged events in row are animated upon event add

## 2.0.2 - 2019-05-10

### FEATURES / ENHANCEMENTS

* Scheduler now only redraws affected rows if events change, greatly speeding up cases where a change does not affect
  the height of the row (#8303)
* Labels for TimeRanges are now rendered in the time axis header to not be covered by task elements in the timeline
  (`showHeaderElements` config of the feature switched to `true` by default)
* New initial animation 'zoom-in' added
* Animations demo extended to showcase initial animations, also includes a custom animation

### API CHANGES

* Dependency hover and creation tooltips can now be enabled separately (`showTooltip` vs `showCreationTooltip`)

### BUG FIXES

* #7496 - Allow aborting event resize with ESC
* #7968 - zoomToSpan should take centerDate config into account
* #8069 - Provide public timeRanges property on CrudManager
* #8307 - Context menu should work on whole scheduling area
* #8319 - Current timeline header element not initially shown
* #8337 - Subclasses of TimeRanges remove each others elements
* #8346 - TimeRange with startDate == endDate not rendered properly
* #8355 - Selection of next event upon deletion bugged by implementation of non working time
* #8365 - Event style not cleaned up properly on reuse

## 2.0.1 - 2019-05-03

### BUG FIXES

* #7906 - RoughJS demo not running in IE11
* #7932 - Crash if timeRange lacks start or end date
* #7947 - Dependencies feature sets up its store listeners too early
* #7956 - EventNavigation fires an incorrect event signature for the navigate event
* #7974 - Having leaf item at the top of the tree makes the whole tree broken
* #7976 - Should not highlight timeaxis column on hover
* #7977 - Dependency drag terminals wrong colour after mouseup of event resize drag
* #7981 - When moving an event into the far future, dep lines are redrawn wrong and not kept up to date
* #7989 - Timeaxis filter field width overflows its container
* #7997 - Mouseout of event through dep terminal leaves resizing class present on inner
* #8005 - Resource timeranges not rendering correctly with eventLayout 'none'
* #8006 - Investigate poor scrolling performance on partnered schedulers with many events
* #8041 - Normal header is not correctly stretched inside flex layout
* #8046 - "event(s)" in ResourceInfoColumn template should be localized
* #8066 - Working time demo: Column lines for middle day viewpreset out of sync
* #8084 - Scheduler view not reacting to 'refresh' event after endBatch()
* #8128 - getDateFromDomEvent doesn't work with non-local mouse events
* #8144 - Header menu items duplicated if using multiple instances of TimeRanges
* #8161 - TimeRanges doesn't work in React Typescript demo
* #8221 - Drag proxy misplaced if page is scrolled
* #8263 - Event selection should be cleared if drag starts without CTRL pressed

## 2.0.0 - 2019-03-28

### FEATURES / ENHANCEMENTS

* New demo using WebSockets added (client + server)
* New demo using Ionic added (#7426)
* New demo showing integration to the Vuestic web app (IE11 is not supported) (#7831)
* New demo showing cascading combos in Event Editor (#7755)
* New demo using Rough.js for custom sketched event styling added (#7493)
* Demos ported to vue: drag-from-grid, drag-onto-tasks (TypeScript, [#756](https://github.com/bryntum/support/issues/756))
* Included a new default theme called "stockholm"
* Added animation for first display of events (#7550)
* Scheduler now supports filtering the time axis ticks and/or defining a custom tick generator to create a
  non-continuous time axis. Try the new `timeaxis` demo to see it in action (#6597)
* Added support for specifying working days and hours, which will be used to either filter the time axis or stretch the
  rendered events depending on zoom level (#7536)
* Removed flatpickr as our time picker for `TimeField` and replaced with our own implementation (#7396)
* Made it possible to manipulate items of HeaderContextMenu before show (#7544)
* Added support for using dependencies with multi assigned events (#6749)
* Added API to show context menu for event record (#7621)
* Scheduler now supports multiple regions for columns, as opposed to only two previously (locked and normal). Check out
  the new columns demo to see how it works (#7642)
* Add support for dashed and dotted lines to the ColumnLines feature (#7653)
* Events can now be split in pieces using the new `split` API. Demonstrated in tooltips demo and eventcontextmenu demo
* Angular demos no longer use `autoHeight`, instead they get their height from CSS as most of other demos do. This makes
  code from them a bit easier to reuse outside of our demos (#7767)
* EventEdit feature now triggers a `beforeEventEditShow` event on scheduler after constructing the editor and loading
  the event, but before being shown. Allows you to hook in to for example filter the resources combo (#7520)
* Added a `style` field to the `TimeSpan` model. Can be used to apply custom styling to events, time ranges and resource
  time ranges (#7596)
* New `getVisibleDateRange()` API added (#7876)
* The CrudManager `AjaxTransport` mixin now uses our internal AjaxHelper and the fetch API for transport,
  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### API CHANGES

* Previously private field accessors on the event editor feature were made public (nameField, resourceField etc.) to for
  example allow manipulation of shown resources when displaying the editor (#7519)
* TimeAxisViewModel was made public, it handles mapping between the data based time axis and the UI. You can access it
  using `scheduler.timeAxisViewModel` to find out the date at a specific pixel etc
* EventContextMenu#onElementContextMenu is private now, use EventContextMenu#showContextMenuFor instead
* 'beforeEventDrag' is no longer fired on mousedown, but on the first mousemove following a mousedown (#7723)
* [BREAKING] The `renderEventsAsContainers` has been removed, and the rendering simplified. All Events are rendered
  inside their own wrapper element. _This will only affect you if you have custom styling applying to event elements and
  were not using `renderEventsAsContainers: true`_
* [BREAKING] TimeField's and DateField's `pickerFormat` config was removed in favour of using `format` also for the
  picker
* [BREAKING] EventEditors resource field was renamed from `resourceIdField` -> `resourceField` to reflect the fact that
  it might involve multi assignment (#7518)
* [BREAKING] Scheduler now renders it contents on `paint` instead of on `render`, to allow it to initialize correct when
  embedded in tab panels and similar. Because of this change, the `render` event was removed
* [BREAKING] `idField` config was removed from `Store`, it was not used in the codebase and did not work as intended
  The config is still available and working on `Model`, set it on your subclass (`MyModelClass.idField = 'MyId'`). If
  you really want to remap id to another field in your data without subclassing `Model` you can still do it using the
  `fields` config on `Store`: `new Store({ fields : [{ name : 'id', dataSource : 'MyId' }] });`

### BUG FIXES

* #7422 - Cannot read property 'atob' of undefined
* #7483 - finalize method called twice when cancelling event resizing
* #7500 - Crash in CrudManager demo if making changes while sync is in progress
* #7599 - Event rendering in month is a bit off
* #7669 - TimeField in EventEditor left/right buttons should use same increment as current viewPreset
  timeResolution
* #7675 - EditBase should check field validity in a more precise manner
* #7719 - Assignment cannot be moved correctly if it overlaps with itself and allowOverlap is false
* #7708 - ScheduleTip and EventTip disabled after dragging en event out of view
* #7726 - DOCS: Complete list of defaults
* #7732 - Event selection lost after loading new dataset which contains previously selected event id
* #7733 - Old selected events not cleaned up when a dataset changes
* #7735 - TimeSpan.normalize should respect mapping
* #7758 - ViewPreset headerConfig "align" has no effect
* #7760 - ViewPreset headerConfig "headerCls" has no effect
* #7761 - Some feature methods, exposed to scheduler, are not typed properly
* #7770 - Events not deleted when parent tree node deleted
* #7802 - Incorrect dates on the timeaxis when resolution unit is month
* #7810 - Filterable timeaxis doesn't work with DAY shift unit
* #7863 - Crash after drag drop when scrolled to bottom and replacing events dataset
* #7869 - Setting showCurrentTimeLine to false doesn't work

## 1.2.5 - 2019-02-26

### FEATURES / ENHANCEMENTS

* Updated the React guide to reflect the change of bundle used in the demo (it uses scheduler.module.transpiled.js to
  allow the demo to run in IE11)

### BUG FIXES

* Renamed event relay prefix in the vue wrapper to avoid naming collisions (eventStore -> events etc.)
* Fixed react_typescript build

## 1.2.4 - 2019-02-19

### FEATURES / ENHANCEMENTS

* Updated `readme.md` to better describe the projects folder structure and different included bundles

### BUG FIXES

* #7560 - Crash in GroupSummary demo
* #7629 - Error when building Angular demos

## 1.2.3 - 2019-02-14

### FEATURES / ENHANCEMENTS

* Added a date picker to EventEditor, Angular, and Vue demos (#7584)

### BUG FIXES

* #7547 - STYLING: Wrong selection style for group header rows
* #7563 - Scroll reset in partners demo
* #7590 - STYLING: Headers missing padding in IE11
* #7608 - react_build demo is broken
* #7609 - passStartEndParameters config has no effect
* #7619 - Dblclicking a summary row should not create a new event
* #7620 - Incorrect position for events below collapsed group in groupsummary demo

## 1.2.2 - 2019-01-28

### API CHANGES

* ANGULAR: The Scheduler component was previously relaying events from EventStore and ResourceStore by prefixing them
  with `eventStore` and `resourceStore`, making it possible to listen for example `eventStoreAdd` or
  `resourceStoreRemove`. The prefix was causing naming collisions internally and have now been changed to `events`
  and `resources` -> `eventsAdd` / `resourcesRemove`. In case you rely on this in your code, you need to rename to match
  the new pattern

### BUG FIXES

* #7529 - After a drag on empty calendar spot, the scheduleClick event is no more fired
* #7541 - Crash when updating rendered timerange to be nonrendered
* #7558 - Error during dragdrop in angular demo
* #7555 - Drag from grid example throws error

## 1.2.1 - 2019-01-17

### API CHANGES

* The behaviour when setting `startDate` after initialization on Scheduler has changed from modifying the length of the
  displayed time range to instead shift it backwards or forwards, keeping its duration. `endDate` still modifies the
  length of the time range. To allow control over this behaviour `setStartDate` and `setEndDate` methods have been added
  to the Scheduler, both accepting a `keepDuration` flag (#7410)

### BUG FIXES

* #6576 - AjaxTransport does not honour headers config
* #7194 - Crash when exporting schedule with grouped column
* #7354 - Angular demo doesn't work in IE11
* #7370 - [EDGE] Investigate Angular + trial bundle
* #7400 - Drag between schedulers demo: Cannot read property 'isMilestone' of undefined
* #7402 - Bundle aliases for angular demos not updated
* #7409 - React Typescript demo doesn't work in IE11
* #7413 - Crash when creating new event in multi-assignment mode
* #7421 - Unexpected animation after event add
* #7440 - Crash in WebComponents demo after drag drop
* #7441 - Crash when updating resourceTimeRange of non-existing resource
* #7443 - Scroll bars showing/hiding indefinitely
* #7444 - Crash when deleting new multiassigned task
* #7448 - Crash in drag-between-schedulers demo
* #7452 - Trial demos do not work in Edge
* #7466 - Can't access dropped record when dragging between schedulers
* #7482 - Should not fire 'eventclick' after resizing
* #7485 - allowOverlap is not taken into account when dragging from another Scheduler
* #7492 - Column lines do not match headers if autoAdjustTimeAxis is false
* #7495 - End dates mismatch in resize tooltip
* #7502 - Timeaxis rendering not consistent in drag from grid demo
* #7503 - Drag drop breaks if event start is aligned with viewport left edge
* #7511 - Group summary rows visible in resource combo of event editor
* #7516 - Typings generation misses `implements` if no `extends`

## 1.2.0 - 2018-12-19

### FEATURES / ENHANCEMENTS

* React wrapper changed to use `shouldComponentUpdate()` to prevent unnecessary re-renders
* Added React + TypeScript demo (#7283)
* Full TypeScript typings included as `build/scheduler.d.ts`. Typings define module `bryntum-scheduler` to avoid
  possible name collisions, so we had to also rename import in the angular demo
* Vue wrapper now adds watchers for all props
* New demo using Vue CLI added (#7121)
* New feature + demo ResourceTimeRanges added. Renders time ranges per resource, displayed behind events (#7176)
* Built in version of FontAwesome was bumped to 5.5.0
* New demo showing drag drop of tasks between two Scheduler instances (#7069)
* Improved the "drag from grid" demo, adding new behavior to automatically reschedule overlapping tasks (#7355)
* Added a new guide on how to listen for events (#7196)
* Docs updated to state that locales should be included before the umd bundle to have effect (#7205)
* Scheduler.feature.HeaderContextMenu now accepts an `extraItems` array to add extra items to the header context menu
* The context menu for events now accepts a `processItems` function that allows processing of the items before the menu
  is shown (#6887)
* A context menu for empty parts of the schedule was added, ScheduleContextMenu (#6724)
* Built in version of FontAwesome was bumped to 5.5.0

### API CHANGES

* [BREAKING] AssignmentModels `getEvent()`, `getResource()`, `getEventName()` and `getResourceName()` removed in favor
  of properties `event`, `resource`, `eventName` and `resourceName`
* [BREAKING] TimeRanges `rangeCls` and `lineCls` were made private
* `DependencyStore#getEventIncomingDependencies` renamed to `getEventpredecessors`
* `DependencyStore#getEventOutgoingDependencies` renamed to `getEventsuccessors`
* The `resourceRecord` parameter of the Scheduler.feature.EventEdit#beforeeventsave event object was deprecated in favor
  of `resourceRecords` to better support multiple assignments

### BUG FIXES

* #7195 - Production build broken in angular demo
* #7224 - Store filter is not getting applied again when it's supposed to
* #7243 - Dependency lines misplaced
* #7246 - Salesforce demo doesn't work
* #7259 - React demo doesn't work in IE11
* #7267 - Dependency Tooltip width increases while moving (Firefox only)
* #7293 - Event is not visible in monthAndYear preset if end date is out of scheduler timespan
* #7307 - Dragging event to the right makes it disappear
* #7311 - Angular demo does not work in Edge
* #7315 - UI not refreshed when finalizing resize flow with `false` to cancel it
* #7316 - EventEdit endTimeConfig has no effect
* #7324 - Crash when deleting event in multassign demo
* #7325 - Angular production buid doesn't work with trial sources
* #7344 - Setting a new dataset crashes when using AssignmentStore
* #7346 - react_build demo is missing .babelrc config

## 1.1.2 - 2018-11-23

### FEATURES / ENHANCEMENTS

* EventTooltip docs updated to show that you can use Tooltip configs to affect the tooltip

### API CHANGES

* CSS class `b-sch-minuteIndicator` renamed to `b-sch-minute-indicator`
* CSS class `b-sch-hourIndicator` renamed to `b-sch-hour-indicator`

### BUG FIXES

* #7153 - Adding 100 records in a loop does not extend the scroll range of the grid
* #7167 - End date icon inconsistent with the date it's shown next to
* #7174 - record.imageUrl should have a priority and stay as it is
* #7185 - Readding a removed resource renders events after scroll
* #7191 - STYLING: Wrong color in dark theme for nbr events text in resource info column
* #7217 - group summary demo misrendering

## 1.1.1 - 2018-11-16

### FEATURES / ENHANCEMENTS

* New drag drop demo showing how to drag objects from outside the scheduler onto scheduled tasks (fixed #7139)
* The Angular wrapper now includes @Input for `eventBodyTemplate`, `crudManager`, `eventStore`, `resourceStore`,
  `assignmentStore` and `dependencyStore`
* New pan feature added (#6665)
* New `drag-between-schedulers` demo showing how you can drag and drop tasks between multiple Schedulers

### API CHANGES

* Calling TimeSpan#startDate setter and TimeSpan#setStartDate will now move the span in time as opposed to earlier where
  it would modify the duration of the event

### BUG FIXES

* #7003 - Vue wrapper naming collision
* #7120 - Cannot use ids containing "-" on events or resources
* #7125 - Export feature doesn't export correct data by default
* #7129 - Crash when localizing time units
* #7130 - Web Components demo throws 404s
* #7132 - Setting start date > end date results in negative duration
* #7136 - Duration field should spin on up/down keys
* #7143 - Strange scroller behavior in dragfromgrid demo
* #7147 - When record is removed from context menu focus should move to next event

## 1.1.0 - 2018-11-09

### FEATURES / ENHANCEMENTS

* React demo bumped to latest react and styling improved
* Built in FontAwesome version bumped to 5.4.1, scope changed from .fa -> .b-fa to not affect icons outside of our
  widgets
* New `tooltips` demo showing how to customize the event tooltip
* New `validation` demo showing how to validate drag drop & resizing operations
* New Export to Excel demo (#6961)

### API CHANGES

* `Scheduler` has a new `parter` config which pairs the `Scheduler` with the passed `Scheduler`, sharing the
  `TimeAxis`, and synchronizing the horizontal scroll positions
* Scheduler now defaults to remove the event when removing its last assignment. This behaviour can be changed using the
  `removeUnassignedEvent` config
* Scheduler has a new `triggerSelectionChangeOnRemove` config that determines if `eventSelectionChange` should trigger
  or not when removing a selected event
* [BREAKING] ViewPresets property `timeColumnWidth` and related getters and setters was renamed to `tickWidth`
  `timeColumnWidth` can still be used for backwards compatibility, but if you are using a custom ViewPreset we recommend
  that you rename to be future proof
* [BREAKING] EventDrag#validatorFn now receives the drag context in one context object (similar to dragCreate and
  eventResize features), instead of multiple params
* [DEPRECATED] In the context object parameter (first param) of the EventResize#validatorFn, 'start' and 'end' were
  deprecated in favor of 'startDate' + 'endDate'
* [DEPRECATED] In the context object parameter (first param) of the EventDragCreate#validatorFn, 'start' and 'end' were
  deprecated in favor of 'startDate' + 'endDate'
* [DEPRECATED] In the `eventpartialresize` context object, the 'start' and 'end' were deprecated in favor of 'startDate'
    + 'endDate'
* [DEPRECATED] TimeSpan#shift method now has switched position of the `amount` and `unit` params (#7031)
* [DEPRECATED] Scheduler#viewportresize event was deprecated in favor of #timelineviewportresize (#7046)
* [BREAKING] In the SchedulerEventRendering#eventRenderer template method, the `columnIndex` property of the `detail`
  object was made private
* [BREAKING] In the SchedulerEventRendering#eventRenderer template method, the following properties of the
  `detail.tplData` object were made private: `start`, `end`, `startMs`, `endMs`, `startsOutsideView`, `endOutsideView`,
  `resourceId`, `resource`, `id` and `eventId`. A new `height` property was added to `tplData` which lets your read the
  event height

### BUG FIXES

* #6098 - Scheduler may be partnered with another Scheduler to share TimeAxis and scroll position
* #6720 - Schedule and timeaxis out of sync after calling scrollEventIntoView
* #6723 - Dependency lines for events which have been deleted reappear when the scheduler subgrid is scrolled
* #6731 - Our CSS rules should be all scoped to apply inside .b-widget
* #6814 - Editing an event's startDate to make it outside of the rendered event zone doesn't hide the event
* #6906 - Theme demo not rendering correctly
* #6980 - Maximum value violation warning seen in event editor
* #6990 - When resize triggers multiple events update, extra terminals got rendered into resized element, growing
  uncontrollably
* #7000 - Hardcoded z-index for focused event
* #7005 - Hover should not be triggered on events during drag create
* #7006 - Calling dependencyStore.removeAll() does not remove dependency lines from view
* #7009 - New dependency gets removed from the view on scroll
* #7019 - DST transition problem
* #7021 - Copy DST fix + test from ExtScheduler 6.x
* #7024 - Dependency lines are missing after zoom in/out
* #7029 - Selected event styling not working when using labels
* #7037 - Events rendered slightly off their start dates
* #7050 - EventEdit feature should pass false to extendTimeAxis option to scrollResourceEventIntoView
* #7048 - Scheduler: Drag/drop resizes task when task is small
* #7070 - Crash when assigning from unexisting resourceId back to valid resourceId
* #7072 - eventStore#removeAll doesn't refresh UI
* #7074 - Deleting row does not repaint events properly

## 1.0.4 - 2018-10-08

### FEATURES / ENHANCEMENTS

* Angular demo improved: relays more events from the engine, added eventLayout config
* Vue demo improved: added more configs and improved styling
* Functions for shifting time in the time axis documented and exposed on Scheduler: `shift()`, `shiftNext()`,
  `shiftPrev()`and `setTimespan()`. These functions are used in the timeresolution demo

### BUG FIXES

* #6770 - Loadmask not working when using crudManager
* #6803 - EventEditor setting end date/time does not adjust the duration field
* #6848 - Should create new record even if resource field is not shown in Editor
* #6852 - Hovered event has wrong z-index when dragging
* #6856 - "Container is not defined" in docs
* #6857 - Crash in docs when collapsing group
* #6860 - online webcomponents demo doesn't load polyfill for firefox
* #6871 - ExtraWidgets position is wrong in EventEdit feature
* #6889 - Missing APIs in docs
* #6912 - Changing event start time via typing should move the event

## 1.0.3 - 2018-10-01

### FEATURES / ENHANCEMENTS

* Added a new demo - "Nested events"
* Added demos for Angular 1, 2, 4, 5 and 6

### BUG FIXES

* #6787 - Invalid drop should make no influence on event changing
* #6816 - Add polyfills to webcomponents demo to make it work in all browsers
* #6820 - Crash in filter demo when typing regex chars
* #6826 - Cache buster needed for docs app.js

## 1.0.2 - 2018-09-24

### BUG FIXES

* #6779 - Link to react_build demo gives 404
* #6783 - Date picker in header context menu produces inconsistent results
* #6788 - Event editor doesn't allow setting a start date greater than end date
* #6795 - Examples online do not work in edge
* #6798 - Scheduler doc 404 on Scheduler/column/ResourceInfoColumn
* #6801 - Grid vs Scheduler feature collision in docs
* #6808 - Locales broken in react demo

## 1.0.1 - 2018-09-20

### BUG FIXES

* #6706 - Modification date in guides restyled
* #6735 - Name not shown in newly added task
* #6774 - Enter key in an event editor triggers side effect

## 1.0.0 - 2018-09-13

* We're happy to announce the first v1.0.0 release of our new Scheduler component. The Scheduler is a modern and high
  performance scheduling UI component. Built from the ground up with pure JavaScript, supporting any framework you are
  already using (incl. React, Angular and Vue). Please see our website and documentation for a full presentation

### FEATURES / ENHANCEMENTS

* Multi assignment support added, see multiassign demo (#4460)
* Localization guide must show how to localize all date formats (#6448)
* `scheduler.modules.js` bundle and related demos are now included in trial

### BUG FIXES

* #6459 - Group header z-index and background adjusted
* #6487 - Event Editor doesn't fit text of date fields
* #6489 - Milestone outline styling fixed for event style "line"
* #6528 - Dependency rendering broken when scrolling
* #6605 - Cannot read property 'start' of null
* #6607 - Crash in column header context menu date picker
* #6638 - Create angular demo for trial bundle
* #6660 - Demos should shown "unknown" generic image for names not known
* #6682 - Drag drop not working on iPhone



<p class="last-modified">Last modified on 2023-06-30 10:24:57</p>