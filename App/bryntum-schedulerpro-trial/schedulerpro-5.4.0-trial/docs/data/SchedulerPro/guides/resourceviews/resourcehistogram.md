# Resource histogram

[ResourceHistogram](#SchedulerPro/view/ResourceHistogram) is a view that renders histogram charts in the time axis
column for each resource. The charts visualize resources working time allocation based on their assignments to events
and working time calendars.
The component subclasses [TimelineHistogram](#Scheduler/view/TimelineHistogram) and thus automatically adds a special
[scale column](#Scheduler/column/ScaleColumn) to match the plotted values.

<div class="external-example" data-file="SchedulerPro/view/ResourceHistogram.js"></div>

## The view series

Out of the box the component visualizes two series, `effort` and `maxEffort`.
The first one is charted with bars and represents the corresponding resource working time spent. The bars are colored
according to the resource allocation level: _green_ for fully allocated, _light-green_ for underallocated and _red_
if the resource is overallocated in the tick (see the ["Styling charts"](##styling-charts) chapter below for details on
how it's done and how to change the colors).
The values of the series are calculated based on the resource assignments.

And the second series is displayed as a pink outline and represents maximum working time the resource has in the
corresponding interval.

## Series values and zooming

The displayed values are calculated for ticks of the time axis and thus naturally depend on the view zoom level.
So if the view ticks represent days the values are collected for the days and if it shows quarters they are collected
for the quarters respectively.
That means the component automatically recalculates the displayed values after zooming in/out or changing the visible
timespan.

## Data calculation under the hood

The component uses <a href="engine" target="_blank">the Engine</a> to calculate resources allocation data. It creates
[ResourceAllocationInfo](#SchedulerPro/model/ResourceModel#typedef-ResourceAllocationInfo) class (or engine docs
[here](engine/classes/_lib_engine_quark_model_scheduler_pro_schedulerproresourcemixin_.resourceallocationinfo.html))
instances for each resource.
The class has a few input properties: `resource`, `ticks`, `includeInactiveEvents` and an output `allocation`
property that provides the allocation calculated for the provided input values. `allocation` has a `total` property
referencing an array of the resource allocation values and `byAssignments` which is a `Map` with the allocation
categorized for individual assignments. **This view renders `allocation.total`values.**

The class instances are added into the Engine _graph_. So they get calculated automatically as soon as
any related value changes (like a calendar, assignment, event or any other parameter involved in the resource
allocation calculation).
After the change happens the component updates the involved resources histogram data which in turn causes
the resource rows refresh.

## Scale column

A [scale column](#Scheduler/column/ScaleColumn) is added automatically to help reading the plotted values. The column
automatically sets its scale points to match the view's current zoom level. So for example if the time axis ticks
display days then the top value of the scale is set to _24 hours_ and if ticks display weeks then the scale top value
is _7 days_.

For group records the scale also depends on the current zoom level yet its calculation has a twist.
Basically a group record scale top value is calculated as a regular record top value but multiplied by the number of
the group members. So for example if the view time axis displays days then a group having 3 members will display a
scale with _3 days_ top value.

Every time the view adjusts the scale values it triggers
[generateScalePoints](#SchedulerPro/view/ResourceHistogram#event-generateScalePoints) which can be used to customize
the prepared scale points:

```javascript
new ResourceHistogram({
    ...
    listeners : {
        generateScalePoints(params) {
            // provide text for each scale point (if not provided already)
            params.scalePoints.forEach(point => {
                point.text = point.text || point.value;
            });
        }
    }
})
```

In case the column is not needed it can be easily disabled by providing `null` to the
[scaleColumn](#SchedulerPro/view/ResourceHistogram#config-scaleColumn) config:

```javascript
new ResourceHistogram({
    // do not add scale column
    scaleColumn : null,
    ...
});
```

## Displaying text values

The view can also display values as text. To enable this provide `true` to
[showBarText](#SchedulerPro/view/ResourceHistogram#config-showBarText) config. The component will render the values in
`TEXT` elements indicated with `b-bar-legend` CSS class.

To change the histogram bar texts, supply a [getBarText](#SchedulerPro/view/ResourceHistogram#config-getBarText)
function. Here for example the provided function displays resources time **left** instead of allocated time

```javascript
new ResourceHistogram({
    getBarText(datum, index, series, renderData) {
        const resourceHistogram = this.owner;
        // get default bar text
        let result = resourceHistogram.getBarTextDefault(...arguments);
        // and if some work is done in the tick
        if (result) {
            const unit = resourceHistogram.getBarTextEffortUnit();
            // display the resource available time
            result = resourceHistogram.getEffortText(datum.maxEffort - datum.effort, unit);
        }
        return result;
    },
    ...
});
```

**Please note** that the function will be injected into the underlying [Histogram](#Core/widget/graph/Histogram)
component that is used under the hood to render actual charts.
So `this` will refer to the [Histogram](#Core/widget/graph/Histogram) instance, not this class instance.
That's why in the above example `this.owner` is used to the class instance.

The function is called as part of a cell rendering and its `renderData` argument provides the cell render data
which allows to get the record being rendered (and some other data like cell element, row etc):

```javascript
new ResourceHistogram({
    getBarText(datum, index, series, renderData) {
        // render text for all records except the one with id=321
        if (renderData.record.id !== 321) {
            // default bar text
            return this.owner.getBarTextDefault(...arguments);
        }

        return '';
    },
    ...
});
```

## Displaying bar tooltips

The view has a couple of configs that enables displaying a tooltip when mouse hovering histogram bars:

- [showBarTip](#SchedulerPro/view/ResourceHistogram#config-showBarTip) a boolean flag allowing to toggle on/off the
  tooltip showing
- [barTooltipTemplate](#SchedulerPro/view/ResourceHistogram#config-barTooltipTemplate) a function implementing the
  tooltip template

Here is an example of the tooltip configuration:

```javascript
new ResourceHistogram({
    // enable bar tooltips showing
    showBarTip : true,

    barTooltipTemplate(tooltipContext) {
        const { datum, record } = tooltipContext;

        // do not display tooltip for record #321
        if (record.id === 321) {
            return '';
        }

        return `<div class="my-tooltip">${datum.effort}</div>`;
    },
    ...
});
```

## Customizing series data at runtime

The view triggers [beforeHistogramDataCacheSet](#SchedulerPro/view/ResourceHistogram#event-beforeHistogramDataCacheSet)
and [histogramDataCacheSet](#SchedulerPro/view/ResourceHistogram#event-histogramDataCacheSet) after a resource's
allocating gets calculated. So the events can be used for modifying the calculated data or injecting additional series
data.

```javascript
new ResourceHistogram({
    series : {
        // provide an extra series
        someValue : {
            type : 'bar'
        }
    },
    ...
    listeners : {
        histogramDataCacheSet({ data }) {
            // add our extra series value for each entry
            data.allocation.total.forEach(entry => {
                // someValue will have a random [0 .. effort] value
                entry.someValue = Math.floor(Math.random() * entry.effort);
            });
        },
    }
});
```

### Customizing series data and performance

The approach we used in the ["Customizing series data at runtime"](##customizing-series-data-at-runtime) chapter is the
most straightforward but it might have a major disadvantage - _performance_.
Series data collecting code iterates all the component time span intervals which could be quite expensive.
And if you want to change collected tick values you would have to iterate the ticks again.
If your calculations are quite complex that could be time consuming and hit the view performance badly.

If that's the case then the only way you have is overriding `ResourceAllocationInfo` class code.
The class has `calculateAllocation` generator method that is used to calculate `allocation` property value.
So the method code can be overridden and to avoid the above mentioned double iterating it's not enough to call
`super.calculateAllocation` and do some changes after but instead the existing `calculateAllocation` code
should be copied to your class and modified according to your needs.

```javascript
class MyResourceAllocationInfo extends ResourceAllocationInfo {

    * calculateAllocation() {
        const
            total = [],
            ticksCalendar = yield this.ticks,
            resource = yield this.$.resource,
            includeInactiveEvents = yield this.$.includeInactiveEvents,
            assignments = yield resource.$.assigned,
            calendar = yield resource.$.effectiveCalendar,
            assignmentsByCalendar = new Map(),
            eventRanges = [],
            assignmentTicksData = new Map(),
            byAssignments = new Map();

        ....
    }

}
```

The overridden class then should be provided to the project
[resourceAllocationInfoClass](#SchedulerPro/model/ProjectModel#config-resourceAllocationInfoClass) config:

```javascript
const project = new ProjectModel({
    resourceAllocationInfoClass : MyResourceAllocationInfo,
    ...
});

new ResourceHistogram({
    project,
    ....
});
```

## Changing individual rows content dynamically

Individual rows allocation rendering can be adjusted at runtime.
There is a [beforeRenderHistogramRow](#SchedulerPro/view/ResourceHistogram#event-beforeRenderHistogramRow) event
fired before a row is rendered.
The event data includes a `histogramConfig` configuration object that will be applied
to the underlying [Histogram](#Core/widget/graph/Histogram) widget used for rendering.
So the event allows changing the config in order to make changes to the displayed data, add or hide some series:

```javascript
new ResourceHistogram({
    ...
    listeners : {
        beforeRenderHistogramRow(renderData) {
            const { record, histogramConfig } = renderData;

            // hide "maxEffort" series for record #1
            if (record.id == 1) {
                histogramConfig.series.maxEffort = false;
            }
        }
    }
});
```

## Grouping support

The component supports [TreeGroup](#Grid/feature/TreeGroup) and [Group](#Grid/feature/Group) features and implements
automatic rendering of histograms for group records.
It's done by summing up group members data to their parents.

[TreeGroup](#Grid/feature/TreeGroup) usage example:

```javascript
const histogram = new ResourceHistogram({
    features : {
        treeGroup : {
            // group resources by city field
            levels : [
                'city'
            ]
        }
    },
    ...
});
```
[Group](#Grid/feature/Group) usage example:

```javascript
const histogram = new ResourceHistogram({
    features : {
        // group resources by city field
        group : {
            field : 'city'
        }
    },
    ...
});
```

### Disabling automatic aggregating

That automatic aggregating can be turned off by setting the
[aggregateHistogramDataForGroups](#SchedulerPro/view/ResourceHistogram#config-aggregateHistogramDataForGroups) config
to `false`:

```javascript
const histogram = new ResourceHistogram({
    // do not show histograms for groups
    aggregateHistogramDataForGroups : false,
    ...
});
```

### Customizing data aggregating

The component uses the following hooks to implement resource allocation data aggregating to parents:

- [aggregateDataEntry](#SchedulerPro/view/ResourceHistogram#config-aggregateDataEntry) - a function called for each
child data entry and is meant to aggregate the entry values to the corresponding parent entry. The config references
[aggregateAllocationEntry](#SchedulerPro/view/ResourceHistogram#function-aggregateAllocationEntry) method.
- [initAggregatedDataEntry](#SchedulerPro/view/ResourceHistogram#config-initAggregatedDataEntry) - a function that
returns a target parent entry to put aggregated values in. The config references
[initAggregatedAllocationEntry](#SchedulerPro/view/ResourceHistogram#function-initAggregatedAllocationEntry) method.

There is also a way to use few other aggregate functions instead of summing `effort` and `maxEffort` values. It can be
changed by providing the `aggregate` property to the corresponding series:

```javascript
new ResourceHistogram({
    series : {
        effort : {
            // display average children effort
            aggregate : 'avg'
        }
    },
    ...
});
```

Currently the `aggregate` config supports the following values/operations:

- `sum` or `add` (default) - sum of group member values
- `min` - minimum of group member values
- `max` - maximum of group member values
- `count` - count of group member values (effectively count of the group child records)
- `avg` - average of group member values


## Styling charts

Charts are rendered with [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) tags.
Effort bars are rendered as separate `RECT` elements and max allocation outline is rendered as a single `PATH` element.

By default each bar and path element is decorated with `b-series-*` CSS-class where `*` matches the identifier of the
series.
Additionally the component indicated `effort` series bars with `b-underallocated` and `b-overallocated` CSS classes in
case the resource is underallocated/overallocated in that tick respectively.

Then changing the component default styling can be done with the following CSS:

```css
/* normally allocated bar color */
.b-resourcehistogram rect.b-series-effort {
    fill: #0f0;
}
/* overallocated mouse hovered bar color */
.b-resourcehistogram rect.b-series-effort:hover {
    fill: #9f9;
}
/* underallocated bar color */
.b-resourcehistogram rect.b-series-effort.b-underallocated {
    fill: #ff0;
}
/* overallocated mouse hovered bar color */
.b-resourcehistogram rect.b-series-effort.b-underallocated:hover {
    fill: #ff9;
}
/* overallocated bar color */
.b-resourcehistogram rect.b-series-effort.b-overallocated {
    fill: #f00;
}
/* overallocated mouse hovered bar color */
.b-resourcehistogram rect.b-series-effort.b-overallocated:hover {
    fill: #f99;
}
```

And if those CSS classes are not enough there is a
[getRectClass](#SchedulerPro/view/ResourceHistogram#config-getRectClass) function that can be used to return CSS
classes for a bar.
For example in the following snippet we decorate `effort` bars having 8 hours working time allocated
with `eight-hours-effort` CSS class:

```javascript
new ResourceHistogram({
    getRectClass(series, _rectConfig, datum) {
        // indicate bars entries having 8 hrs effort with "eight-hours-effort" CSS class
        // values are expressed in milliseconds so we convert 8hrs to milliseconds here
        if (datum.effort === 8*3600000) {
            return 'eight-hours-effort';
        }

        return '';
    }
})
```

Outline path element classes can also be configured dynamically with
[getOutlineClass](#SchedulerPro/view/ResourceHistogram#config-getOutlineClass) function:

```javascript
new ResourceHistogram({
    getOutlineClass(series, data) {
        // highlight the line there is an overallocation case found
        if (data.some(datum => datum.isOverallocated)) {
            return 'has-overallocation';
        }

        return '';
    }
});
```

## Toggling series visibility

The component has a special [showMaxEffort](#SchedulerPro/view/ResourceHistogram#config-showMaxEffort) config allowing
to toggle displaying the `maxEffortSeries` series.

Alternatively toggling any individual series visibility can be done with CSS help based on the fact that
all bars have `b-series-*` CSS-class (where `*` is identifier of the series the bar represents).

For `effort` series for example it's enough to add a CSS-rule like this:

```css
.b-resourcehistogram.b-hide-effort rect.b-series-effort {
    display: none;
}
```

Then hiding the series can be done by this code:

```javascript
histogram.element.classList.add('b-hide-effort');
```

And this code can be used to display the series back:

```javascript
histogram.element.classList.remove('b-hide-effort');
```


<p class="last-modified">Last modified on 2023-06-30 9:53:56</p>