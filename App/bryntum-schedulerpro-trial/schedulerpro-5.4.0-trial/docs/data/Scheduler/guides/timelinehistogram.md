# Timeline histogram

[TimelineHistogram](#Scheduler/view/TimelineHistogram) is a component that renders histogram charts in the time axis
column for each store record.
The charts are meant to visualize some values along the time axis.
The component also automatically shows a special [scale column](#Scheduler/column/ScaleColumn) to match
the plotted values and supports [TreeGroup](#Grid/feature/TreeGroup) and [Group](#Grid/feature/Group) features out
of the box:

<div class="external-example" data-file="Scheduler/view/TimelineHistogramTreeGroup.js"></div>

Please check ["Grouping support"](##grouping-support) chapter for more details on grouping.

## Configuring histogram series

Every record chart plots the distribution of numeric values as a series of bars.
The component can display multiple series if needed. There is a
[series](#Scheduler/view/TimelineHistogram#config-series) config used for specifying series to be displayed:

```javascript
new TimelineHistogram({
    series : {
        income : {
            type  : 'bar'
        },
        expenses : {
            type : 'bar'
        }
    }
});
```

A series can also be displayed not only as a set of bars but as an outline. This can be done by using the
corresponding `type`:

```javascript
new TimelineHistogram({
    series : {
        maxExpenses : {
            type : 'outline'
        }
    }
});
```

## Providing series data

The component subclasses [TimelineBase](#Scheduler/view/TimelineBase) and thus it's a [Grid](#Grid/view/Grid) with some
timeline APIs. As any grid it displays rows for its [store's](#Scheduler/view/TimelineHistogram#config-store) records.

But for this component each store record should additionally be accompanied with __histogram data__.
Histogram data in a nutshell is an array of objects with properties having series values.
For example the following histogram has two configured series `income` and `expenses`:

```javascript
const histogram = new TimelineHistogram({
    series : {
        income : {
            type  : 'bar'
        },
        expenses : {
            type : 'bar'
        }
    }
});
```

Then an individual record's histogram data might look like this:

```json
[
    {
        "income"   : 100,
        "expenses" : 55
    },
    {
        "income"   : 150,
        "expenses" : 189
    },
    {
        "income"   : 110,
        "expenses" : 115
    },
    {
        "income"   : 112,
        "expenses" : 70
    }
]
```

The property names above by default match the configured series identifiers, but that can be changed if needed by
specifying `field`:

```javascript
const histogram = new TimelineHistogram({
    series : {
        income : {
            type  : 'bar',
            field : 'f1'
        },
        expenses : {
            type : 'bar',
            field : 'f1'
        }
    }
});
```

and then the data would look like this:

```json
[
    {
        "f1" : 100,
        "f2" : 55
    },
    {
        "f1" : 150,
        "f2" : 89
    },
    {
        "f1" : 110,
        "f2" : 85
    },
    {
        "f1" : 112,
        "f2" : 70
    }
]
```

The above histogram data will result in displaying four bars stretched to fill the whole time axis width.

There are two main ways to provide the data to the component. The first way is using a record field and the second one
is using a custom function.
And besides these ways it's also possible to inject data in event listeners. Please see below chapters for
details.

## Providing series data in a record field

The series data can be provided in a record field, as configured with the
[dataModelField](#Scheduler/view/TimelineHistogram#config-dataModelField) config. In this case refreshing the histogram
is done by updating the field value.

The default field name is `histogramData`, so combining the above snippets the code could look like this:

```javascript
// making a store for the timeline histogram view
const store = new Store({
    // use inline data
    data : [
        {
            name          : 'John Smith',
            histogramData : [
                {
                    income   : 100,
                    expenses : 55
                },
                {
                    income   : 150,
                    expenses : 89
                },
                {
                    income   : 110,
                    expenses : 85
                },
                {
                    income   : 112,
                    expenses : 70
                }
            ]
        }
    ]
})

const histogram = new TimelineHistogram({
    appendTo : document.body,

    // use our store as data source
    store,

    // add extra name column
    columns : [
        {
            text  : 'Name',
            field : 'name'
        }
    ],

    series : {
        income : {
            type  : 'bar'
        },
        expenses : {
            type : 'bar'
        }
    }
});
```

The above snippet uses inline data loading which naturally can be replaced with loading via AJAX or some other appropriate way:

```javascript
const store = new AjaxStore({
    // URL of the script that should respond with the data (including the histogram one)
    readUrl  : 'https://my-cool-url',
    autoLoad : true
});

const histogram = new TimelineHistogram({
    // use our AJAX store as data source
    store,
    ...
});
```

## Providing series data with a function

If providing the data in a field is not flexible enough it can be done with a custom function.
There is a [getRecordData](#Scheduler/view/TimelineHistogram#config-getRecordData) config accepting a function that
should return histogram data for the provided record.
The function can be asynchronous if needed and in this case it should return a `Promise` resolved with the
requested histogram data. For example:

```javascript
new TimelineHistogram({
    // get the record histogram data dynamically from the server side
    async getRecordData(record) {
        const response = await fetch(`https://some.url/get-histogram-data?recordId=${record.$originalId}`);

        return response.json();
    },
    ...
});
```

## Injecting data in a listener

One more place to provide or customize a record's histogram data is using a listener for the
[beforeHistogramDataCacheSet](#Scheduler/view/TimelineHistogram#event-beforeHistogramDataCacheSet) or
the [histogramDataCacheSet](#Scheduler/view/TimelineHistogram#event-histogramDataCacheSet) event.

The [beforeHistogramDataCacheSet](#Scheduler/view/TimelineHistogram#event-beforeHistogramDataCacheSet) event is
triggered before the data is cached and
[histogramDataCacheSet](#Scheduler/view/TimelineHistogram#event-histogramDataCacheSet) right after it's done.
Besides the events triggering order the main difference is that the first event allows to completely replacing the data
to be cached

```javascript
new TimelineHistogram({
    series : {
        foo : {
            type  : 'bar',
            field : 'f1'
        }
    },
    ...
    listeners : {
        beforeHistogramDataCacheSet(eventData) {
            // completely replace the data for a specific record
            if (eventData.record.id === 123) {
                eventData.data = [
                    { f1 : 10 },
                    { f1 : 20 },
                    { f1 : 30 },
                    { f1 : 40 },
                    { f1 : 50 },
                    { f1 : 60 }
                ];
            }
        }
    }
});
```

And listening to [histogramDataCacheSet](#Scheduler/view/TimelineHistogram#event-histogramDataCacheSet) event doesn't
provide that ability but still allows customizing the data:

```javascript
new TimelineHistogram({
    series : {
        bar : {
            type : 'bar',
            field : 'bar'
        },
        halfOfBar : {
            type  : 'outline',
            field : 'half'
        }
    },
    ...
    listeners : {
        histogramDataCacheSet({ data }) {
            // add an extra series entry for each item
            data.forEach(entry => {
                entry.half = entry.bar / 2;
            });
        }
    }
});
```

## Displaying text values

The view can also display series values as text. To enable this supply a
[getBarText](#Scheduler/view/TimelineHistogram#config-getBarText) function.
The component will render the values in `TEXT` elements indicated with `b-bar-legend` CSS class.

```javascript
new TimelineHistogram({
    series : {
        foo : {
            type : 'bar'
        }
    },

    getBarText(datum, index, series, renderData) {
        return datum.foo;
    },

    ...
});
```

**Please note** that the function will be injected into the underlying [Histogram](#Core/widget/graph/Histogram)
component that is used under the hood to render actual charts.
So `this` will refer to the [Histogram](#Core/widget/graph/Histogram) instance, not this class instance.
Please use `this.owner` to get the view instance:

```javascript
new TimelineHistogram({
    series : {
        foo : {
            type : 'bar'
        }
    },
    getBarText(datum, index, series, renderData) {
        // get TimelineHistogram view instance
        const view = this.owner;

        ...
    },
    ...
});
```

The function is called as part of cell rendering and its `renderData` argument provides the cell render data,
which allows getting the record being rendered (and some other data like cell element, row etc):

```javascript
new TimelineHistogram({
    series : {
        foo : {
            type : 'bar'
        }
    },
    getBarText(datum, index, series, renderData) {
        // render text for all records except the one with id=321
        if (renderData.record.id !== 321) {
            // default bar text
            return datum.foo;
        }

        return '';
    },
    ...
});
```

## Displaying bar tooltips

The view has configs that allows displaying a tooltip when hovering histogram bars:

- [showBarTip](#Scheduler/view/TimelineHistogram#config-showBarTip) a boolean flag that allows toggling
  tooltip on/off
- [barTooltipTemplate](#Scheduler/view/TimelineHistogram#config-barTooltipTemplate) a function implementing the
  tooltip template

Here is an example of configuring the tooltip:

```javascript
new TimelineHistogram({
    series : {
        foo : {
            type : 'bar'
        }
    },

    showBarTip : true,

    barTooltipTemplate(tooltipContext) {
        const { datum, record } = tooltipContext;

        // do not display tooltip for record #321
        if (record.id === 321) {
            return '';
        }

        return `<div class="my-tooltip">${datum.foo}</div>`;;
    },
    ...
});
```

## Changing individual rows content dynamically

The component uses the [Histogram](#Core/widget/graph/Histogram) widget under the hood to render the charts.
The underlying histogram widget can be configured at runtime if needed.
There is a [beforeRenderHistogramRow](#Scheduler/view/TimelineHistogram#event-beforeRenderHistogramRow) event
fired before a row is rendered.
The event allows injecting custom logic to make changes to the displayed data, add an extra series or
to hide one of them. The event data includes a `histogramConfig` configuration object that will be applied
to the widget:

```javascript
new TimelineHistogram({
    ...
    listeners : {
        beforeRenderHistogramRow(renderData) {
            const { record, histogramConfig } = renderData;

            // hide "foo" series for record #1
            if (record.id == 1) {
                histogramConfig.series.foo = false;
            }
            // add new "extraLine" series for record #2
            if (record.id == 2) {
                histogramConfig.series.extraLine = {
                    type  : 'outline',
                    // the series should use data from "foo" field
                    field : 'foo'
                };
            }
        }
    }
});
```

## Grouping support

The components supports [TreeGroup](#Grid/feature/TreeGroup) and [Group](#Grid/feature/Group) features and implements
automatic rendering of histograms for group records.
It's done by aggregating group members data to their parents. All the configured series values are summed up and
corresponding histograms are displayed for group records.

That automatic aggregating can be turned off by setting the
[aggregateHistogramDataForGroups](#Scheduler/view/TimelineHistogram#config-aggregateHistogramDataForGroups) config
to `false`. Then group records histogram data is retrieved the same way it's done for regular records (either by
reading [dataModelField](#Scheduler/view/TimelineHistogram#config-dataModelField) field or by calling
[getRecordData](#Scheduler/view/TimelineHistogram#config-getRecordData) function).

## Customizing data aggregating

By default series values are summed up, but that can be changed by specifying the `aggregate` property on a series
definition. For example in the following snippet we configure the component so that groups `income` and `expenses`
collects the minimum and maximum of its group members `income` and `expenses` values
respectively:

```javascript
const histogram = new TimelineHistogram({
    series : {
        income : {
            type      : 'bar',
            aggregate : 'min'
        },
        expenses : {
            type      : 'bar',
            aggregate : 'max'
        }
    }
});
```

Currently supported `aggregate` config values are:

- `sum` or `add` (default) - sum of group member values
- `min` - minimum of group member values
- `max` - maximum of group member values
- `count` - count of group member values (effectively count of the group child records)
- `avg` - average of group member values

If that is not enough there are a few hooks allowing customization of the aggregation process:

- [aggregateDataEntry](#Scheduler/view/TimelineHistogram#config-aggregateDataEntry) - a function called for each child data entry, meant to aggregate the entry values to the corresponding parent entry
- [getDataEntryForAggregating](#Scheduler/view/TimelineHistogram#config-getDataEntryForAggregating) - a function that returns a child entry for aggregating
- [initAggregatedDataEntry](#Scheduler/view/TimelineHistogram#config-initAggregatedDataEntry) - a function that returns a target parent entry to put aggregated values in.

## Styling charts

Charts are rendered with [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) tags.
Each histogram bar is rendered as a separate `RECT` element and an outline is rendered as a single `PATH` element.
To provide custom styling for the bars one can provide a
[getRectClass](#Scheduler/view/TimelineHistogram#config-getRectClass) function. The function is meant to return CSS
classes for a bar.

For example in the following snippet we make a histogram showing two series called `income` an `expenses`.
And we decorate the bars having `expenses` value greater than `income` value with `too-much-spent` CSS class:

```javascript
new TimelineHistogram({
    series : {
        income : {
            type : 'bar'
        },
        expenses : {
            type : 'bar'
        }
    },
    getRectClass(series, _rectConfig, datum) {
        // indicate bars entries having expenses greater than income with "too-much-spent" CSS class
        if (datum.expenses > datum.income) {
            return 'too-much-spent';
        }

        return '';
    }
})
```

By default each bar element is also decorated with `b-series-*` CSS-class where `*` matches the identifier of the
bar series. Then we can make a rule to highlight `expenses` entries having `too-much-spent` class with red color:

```CSS
/* display expenses bar red if expenses > income */
rect.b-series-expenses.too-much-spent {
    fill : red;
}
```

Outline elements can also be styled:

```CSS
path.b-series-expenses {
    stroke : black;
}
```

And they also support a [getOutlineClass](#Scheduler/view/TimelineHistogram#config-getOutlineClass) function to provide
CSS-classes dynamically:

```javascript
new TimelineHistogram({
    series : {
        income : {
            type : 'bar'
        },
        expenses : {
            type : 'outline'
        }
    },
    getOutlineClass(series, data) {
        // indicate if some entry has expenses greater than income with "too-much-spent" CSS class
        if (data.some(datum => datum.expenses > datum.income)) {
            return 'too-much-spent';
        }

        return '';
    }
});
```

Since a single path element represents the whole series the function is called once and all the series data is passed
in its second argument.

## Toggling series visibility

Toggling an individual series visibility is easily achievable with some CSS help based on the fact that
all bars have a `b-series-*` CSS-class (where `*` is identifier of the series the bar represents).

For the `expenses` series mentioned above it's enough to add a CSS-rule like this:

```css
.b-timelinehistogram.b-hide-expenses rect.b-series-expenses {
    display: none;
}
```

Then hiding the series can be done by this code:

```javascript
histogram.element.classList.add('b-hide-expenses');
```

And this code can be used to display the series back:

```javascript
histogram.element.classList.remove('b-hide-expenses');
```

Of course this can also be achieved by removing certain series in a listener as described in the
["Changing individual rows content dynamically"](##changing-individual-rows-content-dynamically) chapter. But the
benefit of this approach is that it doesn't require refreshing the view rows, which means it's quicker.


<p class="last-modified">Last modified on 2023-06-30 9:53:47</p>