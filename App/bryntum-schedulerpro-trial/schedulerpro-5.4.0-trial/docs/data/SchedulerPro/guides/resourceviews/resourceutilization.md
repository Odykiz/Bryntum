# Resource utilization

[ResourceUtilization](#SchedulerPro/view/ResourceUtilization) is a view showing the utilization levels of the project
resources. By default the resources are displayed in a summary list where each row can be expanded to show the events
assigned for the resource.

<div class="external-example" data-file="SchedulerPro/view/ResourceUtilization.js"></div>

## The view data

### Values series

The component subclasses [resource histogram](#SchedulerPro/view/ResourceHistogram), but unlike the histogram which
visualizes two series `effort` (resource working time spent) and `maxEffort` (maximum time the resource can
work), this view visualizes `effort` series only.

A resource row and tick cell displays the resource working time spent text and highlights background based on to the
resource allocation level: **green** if it's fully occupied, **light-green** if it's underallocated and **red** if
it's overallocated.
The values of the series are calculated based on the resource assignments.

### The view store and model

The view store is an instance of the [ResourceUtilizationStore](#SchedulerPro/data/ResourceUtilizationStore) class.
The component does not need a store to be provided. It builds it automatically and just needs a project to be provided.

```javascript
new ResourceUtilization({
    project : new ProjectModel({
        loadUrl : 'https://some.cool.url'
    }),
    ...
});
```

The store implements a two level hierarchy, having resources on the root level with resource assignments as child
records.
Yet it does not contain real resource and assignment records, but creates new records wrapping actual resources
and assignments. [ResourceUtilizationModel](#SchedulerPro/model/ResourceUtilizationModel) is the class implementing
that "wrapping". So all the store records are instances of that class.

In order to access actual resources and assignments each record has an
[origin](#SchedulerPro/model/ResourceUtilizationModel#config-origin) property:

```javascript
// get view store record
const record = resourceUtilization.store.getById(123);
// get the actual record it wraps
const actualRecord = record.origin;
```

Another way to access an "actual" record is using the
[resolveRecordToOrigin](#SchedulerPro/view/ResourceUtilization#function-resolveRecordToOrigin) method:

```javascript
// get view store record
const record = resourceUtilization.store.getById(123);
// get actual record
const actualRecord = resourceUtilization.resolveRecordToOrigin(record);
```

The benefit of the method is it also resolves [links](#Core/data/mixin/ModelLink) which are used when the store is
grouped with the [TreeGroup](#Grid/feature/TreeGroup) feature.

### Data calculations under the hood

The component uses <a href="engine" target="_blank">the Engine</a> to calculate resources allocation data. It creates
[ResourceAllocationInfo](#SchedulerPro/model/ResourceModel#typedef-ResourceAllocationInfo) class
instances for all displayed resources.
The class has a few input properties: `resource`, `ticks`, `includeInactiveEvents` and an output `allocation`
property that provides the allocation calculated for the provided input values. The `allocation` has a `total` property
referencing an array of the resource allocation values and `byAssignments` which is a `Map` with the allocation
categorized for individual assignments. This view renders `allocation.total` values for rows representing resources
and `allocation.total` values for assignment rows.

The class instances are added into the Engine _graph_ and they get calculated automatically as soon as
any related values change (like a calendar, assignment, event or any other parameter involved in the resource
allocation calculation).
After the change happens the component updates the involved resources histogram data which in turn causes
the resource rows to refresh.

### Series values and zooming

The displayed values are calculated for ticks of the time axis and thus naturally depend on the view zoom level.
So if the view ticks represent days the values are collected for days and if it shows quarters they are collected
for quarters respectively.
That means the component automatically recalculates the displayed values after zooming in/out or changing the visible
timespan.

## Grouping support

The component uses a fixed two level hierarchy of resources in the root with nested assignments by default,
but it also supports the [TreeGroup](#Grid/feature/TreeGroup) and the [Group](#Grid/feature/Group) features, and
implements automatic rendering of utilization values for group records.
It's done by summing up group members data to their parents.

<div class="external-example" data-file="SchedulerPro/view/ResourceUtilizationTreeGrouping.js"></div>

### Tree grouping complexities

There are a couple of things that add complexity when using [TreeGroup](#Grid/feature/TreeGroup) feature for this view:

- All records are just wrappers so need to reach the original record to be able to group by its fields.
  Here for example we first group by resource city and then by resource. Since the feature groups only leaf
  records we assume `record.origin` is an assignment (since the view store has assignments on the second level):

```javascript
new ResourceUtilization({
    features : {
        treeGroup : {
            levels : [
                // 1st level of grouping is resource city
                ({ origin }) => origin.resource.city,
                // 2nd level is resource
                ({ origin }) => origin.resource
            ]
        }
    },
    ...
});
```

- The view store has two level structure with resources in the root and assignments on the second level.
  But in case a resource has no assignments it won't have any child records and thus will also be passed for grouping.
  So the above code should take into account such possibility too. Then the code will get more complex:

```javascript
new ResourceUtilization({
    features : {
        treeGroup : {
            levels : [
                // 1st level of grouping is resource city
                ({ origin }) => {
                    // If record is a resource means it has no assignments ..since this function is called for leaves only.
                    // So further grouping makes no sense for this record - stop it.
                    if (origin.isResourceModel) {
                        return Store.StopBranch;
                    }

                    return origin.resource;
                },
                // 2nd level is assignment resource
                ({ origin }) => origin.resource;
            ]
        }
    },
    ...
});
```

### Disabling automatic aggregation

That automatic aggregation can be turned off by setting the
[aggregateHistogramDataForGroups](#SchedulerPro/view/ResourceUtilization#config-aggregateHistogramDataForGroups) config
to `false`:

```javascript
const histogram = new ResourceUtilization({
    // do not show histograms for groups
    aggregateHistogramDataForGroups : false,
    ...
});
```

In that case group rows will not be served automatically, and thus won't display any values unless you provide data for
them with the approach described in ["Customizing series data at runtime"](##customizing-series-data-at-runtime)
chapter or with help of the [dataModelField](#SchedulerPro/view/ResourceUtilization#config-dataModelField).
The [getRecordData](#SchedulerPro/view/ResourceUtilization#config-getRecordData) config is another way to customize data
providing and it's actually already used by the component for that purpose. The component has the config referencing
[getRecordAllocationData](#SchedulerPro/view/ResourceUtilization#function-getRecordAllocationData) method so you can
simply override the method.

### Customizing data aggregation

The component uses the following hooks to implement resource allocation data aggregation to parents:

- [aggregateDataEntry](#SchedulerPro/view/ResourceUtilization#config-aggregateDataEntry) - a function called for each
child data entry, meant to aggregate the entry values to the corresponding parent entry. The config references the
[aggregateAllocationEntry](#SchedulerPro/view/ResourceUtilization#function-aggregateAllocationEntry) method.
- [initAggregatedDataEntry](#SchedulerPro/view/ResourceUtilization#config-initAggregatedDataEntry) - a function that
returns a target parent entry to put aggregated values in. The config references the
[initAggregatedAllocationEntry](#SchedulerPro/view/ResourceUtilization#function-initAggregatedAllocationEntry) method.

There is also a way to use some other aggregate functions instead of summing effort values. It can be
changed by providing the `aggregate` property to the corresponding series:

```javascript
new ResourceUtilization({
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


## Changing displayed text

To change the displayed texts, supply a [getBarText](#SchedulerPro/view/ResourceUtilization#config-getBarText)
function. Here for example the provided function displays resources time **left** instead of allocated time

```javascript
new ResourceUtilization({
    getBarText(datum) {
        const view = this.owner;

        // get default bar text
        let result = view.getBarTextDefault();

        // For resource records we will display the time left for allocation
        if (result && datum.resource) {

            const unit = view.getBarTextEffortUnit();

            // display the resource available time
            result = view.getEffortText(datum.maxEffort - datum.effort, unit);
        }

        return result;
    },
    ...
});
```

**Please note** that the function will be injected into the underlying [Histogram](#Core/widget/graph/Histogram)
component that is used under the hood to render actual bars.
So `this` will refer to the [Histogram](#Core/widget/graph/Histogram) instance, not this class instance.
That's why in the above example `this.owner` is used to the class instance.

The function is called as part of a cell rendering and has `renderData` argument providing the cell render data
which allows to get the record being rendered (and some other data like cell element, row etc):

```javascript
new ResourceUtilization({
    getBarText(datum, index, series, renderData) {
        // do not display texts for TreeGroup built parents
        if (!renderData.record.generatedParent) {
            // default bar text
            return this.owner.getBarTextDefault(...arguments);
        }

        return '';
    },
    ...
});
```

## Configuring bar tooltips

The view has a couple of configs that enables displaying a tooltip when hovering histogram bars:

- [showBarTip](#SchedulerPro/view/ResourceUtilization#config-showBarTip) a boolean flag to toggle showing the
  tooltip on/off
- [barTooltipTemplate](#SchedulerPro/view/ResourceUtilization#config-barTooltipTemplate) a function implementing the
  tooltip template

Here is an example of the tooltip configuration:

```javascript
new ResourceUtilization({
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

The view triggers the [histogramDataCacheSet](#SchedulerPro/view/ResourceUtilization#event-histogramDataCacheSet) event
after a resource allocating is calculated.
So event listeners can be used for modifying the calculated data or injecting additional series data.

```javascript
new ResourceUtilization({
    series : {
        // provide an extra series
        someValue : {
            type : 'outline'
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
most straightforward, but it might have a major disadvantage - _performance_.
Series data collection code iterates all the component time span intervals, which can be quite expensive.
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

new ResourceUtilization({
    project,
    ....
});
```

## Affecting individual rows rendering

Individual rows allocation rendering can be adjusted at runtime.
There is a [beforeRenderHistogramRow](#SchedulerPro/view/ResourceUtilization#event-beforeRenderHistogramRow) event
fired before a row is rendered. The event data includes a `histogramConfig` configuration object that will be applied
to the underlying [Histogram](#Core/widget/graph/Histogram) widget used for rendering bars.
The event allows changing the config in order to make changes to the displayed data, add or hide some series:

```javascript
new ResourceUtilization({
    ...
    listeners : {
        beforeRenderHistogramRow(renderData) {
            const { record, histogramConfig } = renderData;

            // hide allocation for record #1
            if (record.id == 1) {
                histogramConfig.series.effort = false;
            }
        }
    }
});
```

## Back to the histogram look and feel

The component subclasses [resource histogram](#SchedulerPro/view/ResourceHistogram) and adjusts some of its configs to
represent the data in a bit different way.

Here is some view changes it applies (besides of the above mentioned using a different auto-generated store):

- It stretches effort bars to take the whole row height since it relies on text representation of effort values.
- It disables [scale column](#SchedulerPro/view/ResourceUtilization#config-scaleColumn) automatic adding which makes no
  sense if we have the bars stretched.
- it also disables resource `maxEffort` line showing which also makes no sense if bar heights do not express values.

Switching back to a histogram alike look and feel is possible with little help of the
[scaleColumn](#SchedulerPro/view/ResourceUtilization#config-scaleColumn),
[showMaxEffort](#SchedulerPro/view/ResourceUtilization#config-showMaxEffort) and
[series](#SchedulerPro/view/ResourceUtilization#config-series) configs:

```javascript
new ResourceUtilization({
    // add the scale column back
    scaleColumn   : {},
    // display max working time line
    showMaxEffort : true,
    series        : {
        effort : {
            // do not stretch bars ..let them represents values
            stretch : false
        }
    },
    ...
});
```

The above snippet will make it **almost** work, but displaying the max working time line for assignment rows will throw
exceptions since `maxEffort` values are not collected for them. This can be fixed with the approach shown in the
["Affecting individual rows rendering"](##affecting-individual-rows-rendering) chapter.
We just need to disable `maxEffort` series showing for assignment rows:

```javascript
new ResourceUtilization({
    // add the scale column back
    scaleColumn   : {},
    // display max working time line
    showMaxEffort : true,
    series        : {
        effort : {
            // do not stretch bars ..let them represent values
            stretch : false
        }
    },

    listeners : {
        beforeRenderHistogramRow(renderData) {
            const { source, record, histogramConfig } = renderData;

            // do not show max working time line for assignment rows
            if (source.resolveRecordToOrigin(record).isAssignmentModel) {
                histogramConfig.series.maxEffort = false;
            }
        }
    },
    ...
});
```

## Styling bars

Since the component subclasses [resource histogram](#SchedulerPro/view/ResourceHistogram) row bars are rendered with
[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) tags. Each bar is rendered as a separate `RECT` element.

By default bar elements are decorated with `b-series-*` CSS-class where `*` matches the identifier of the
series. For this view it means `RECT` elements are decorated with `b-series-effort` class.
Additionally the elements are indicated with `b-underallocated` and `b-overallocated` CSS classes in
case the corresponding resource is underallocated or overallocated respectively.

Then changing the component default styling can be done with the following basic CSS:

```css
/* normally allocated bar color */
.b-resourceutilization rect.b-series-effort {
    fill: #0f0;
}
/* overallocated mouse hovered bar color */
.b-resourceutilization rect.b-series-effort:hover {
    fill: #9f9;
}
/* underallocated bar color */
.b-resourceutilization rect.b-series-effort.b-underallocated {
    fill: #ff0;
}
/* overallocated mouse hovered bar color */
.b-resourceutilization rect.b-series-effort.b-underallocated:hover {
    fill: #ff9;
}
/* overallocated bar color */
.b-resourceutilization rect.b-series-effort.b-overallocated {
    fill: #f00;
}
/* overallocated mouse hovered bar color */
.b-resourceutilization rect.b-series-effort.b-overallocated:hover {
    fill: #f99;
}
```

Since the view rows out of the box represent either an assignment or a resource then it decorates rows with
`b-resource-row` and `b-assignment-row` class respectively to allow styling only certain row types:

```css
/* override assignment row styling */
.b-resourceutilization .b-grid-row.b-assignment-row rect.b-series-effort {
    fill: purple;
}
```

And if those CSS classes are not enough there is the
[getRectClass](#SchedulerPro/view/ResourceUtilization#config-getRectClass) function that can be used to return CSS
classes for a bar.
For example in the following snippet we decorate `effort` bars having 8 hours working time allocated
with `eight-hours-effort` CSS class:

```javascript
new ResourceUtilization({
    getRectClass(series, _rectConfig, datum) {
        // indicate bars entries having 8 hrs effort with "eight-hours-effort" CSS class
        // values are expressed in milliseconds so we convert 8hrs to milliseconds here
        if (datum.effort === 8*3600000) {
            return 'eight-hours-effort';
        }

        return '';
    },
    ...
})
```



<p class="last-modified">Last modified on 2023-06-30 9:53:56</p>