# Calendars

Bryntum Scheduler Pro has a powerful calendar system which defines when work on events can be performed.

The calendar implementation is very performant, even for a big number of calendars.
This is achieved by using extensive caching of all data and using fast internal data structures.

Calendars can be assigned to a project as well as events and resources. By default, if an event or resource has no explicitly
assigned calendar, it uses the calendar of the project. The default calendar of the project (which is used
if not configured explicitly) uses 24/7/365 availability.

Calendars are organized in a tree store (see below for "parent calendars"), which is called
[calendar manager store](#SchedulerPro/data/CalendarManagerStore). It is available as the
[calendarManagerStore](#SchedulerPro/model/ProjectModel#property-calendarManagerStore) property of the project.

Individual calendars are represented by the [CalendarModel](#SchedulerPro/model/CalendarModel) class.


## Availability intervals

Internally, a calendar consists of a collection of [availability intervals](#SchedulerPro/model/CalendarIntervalModel).
The intervals have an [isWorking](#SchedulerPro/model/CalendarIntervalModel#field-isWorking) field, which defines
whether it represents a working time period (`true` value, is default) or non-working (a holiday or other day off, `false` value).

The interval is either static, like `2019/05/01 - 2019/05/02` or recurrent (repeating in time) - `every year 05/01 - every year 05/02`.

A static interval should have [startDate](#SchedulerPro/model/CalendarIntervalModel#field-startDate) and
[endDate](#SchedulerPro/model/CalendarIntervalModel#field-endDate) values provided. A recurrent interval should fill the
[recurrentStartDate](#SchedulerPro/model/CalendarIntervalModel#field-recurrentStartDate) and
[recurrentEndDate](#SchedulerPro/model/CalendarIntervalModel#field-recurrentEndDate) fields. It is not valid to have all 4 fields filled
(and behavior is not defined for such case).

The value of the [recurrentStartDate](#SchedulerPro/model/CalendarIntervalModel#field-recurrentStartDate) / [recurrentEndDate](#SchedulerPro/model/CalendarIntervalModel#field-recurrentEndDate)
fields should be specified in the format defined by the excellent library for recurrent events: [later](http://bunkat.github.io/later/).
Please refer to its [documentation](http://bunkat.github.io/later/parsers.html#overview) on details.

The working status of a timespan, which does not belong to any availability interval, is defined with the
[unspecifiedTimeIsWorking](#SchedulerPro/model/CalendarModel#field-unspecifiedTimeIsWorking) field of the calendar.

## Defining project calendar

Usually calendars are loaded to the project together with other data, such as events, resources, etc.
```javascript
new SchedulerPro({
    // Project configuration
    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : 'loadUrl'
            }
        }
    },
    // other Scheduler configuration
});
```

The response format should be:
```
{
    "success": true,
    "project": {
        // Set default project calendar
        "calendar": "weekends"
    },
    "calendars": {
        "rows": [
            // Calendar definition
            {
                "id": "weekends",
                "name": "Weekends",
                // Intervals to define all SA and SU as non-working days
                "intervals": [
                    {
                        "recurrentStartDate": "on Sat at 0:00",
                        "recurrentEndDate": "on Mon at 0:00",
                        "isWorking": false
                    }
                ]
            }
        ]
    },
    // other project data, for example events, resources, assignments, etc
}
```

However, it is possible to define calendars as inline [data](#SchedulerPro/model/ProjectModel#config-calendarsData):
```javascript
new SchedulerPro({
    // Project configuration
    project : {
        // Set default project calendar
        calendar             : 'weekends',
        // Inline calendar tree
        calendarsData : [
            // Calendar definition
            {
                id        : 'weekends',
                name      : 'Weekends',
                // Intervals to define all SA and SU as non-working days
                intervals : [
                    {
                        recurrentStartDate : 'on Sat at 0:00',
                        recurrentEndDate   : 'on Mon at 0:00',
                        isWorking          : false
                    }
                ]
            }
        ]
        // other Project configs, for example eventStore, resourceStore, assignmentStore, etc
    },
    // other Scheduler configuration
});
```


## Parent calendars

Calendars are organized in a tree store, and thus a `CalendarModel` has a regular `parent` property inherited from the `TreeNode` mixin.
It denotes a "parent" calendar, from which the current calendar inherits availability intervals. The intervals,
defined in the current calendar overrides the intervals from any parent.

This structure allows very flexible definitions for calendars, from the most common ones at the top of
the hierarchy to more specific at the bottom. A more specific calendar will only need to define data that is different from its parent.

## Assigning a calendar through the API

To set the calendar of an entity using the data API, use the `calendar` field. It is available on the
[ProjectModel](#SchedulerPro/model/ProjectModel#field-calendar), [EventModel](#SchedulerPro/model/EventModel#field-calendar) and
[ResourceModel](#SchedulerPro/model/ResourceModel#field-calendar).


## Assigning a calendar through the UI

To give user the ability to change the calendar of the event using the UI, you can use a [ResourceCalendarColumn](#SchedulerPro/column/ResourceCalendarColumn)

<img src="SchedulerPro/calendarcolumn.png" style="max-width : 300px" alt="Calendar column">

Also the `TaskEditor` has a field for changing the calendar on the "Advanced" tab.

<img src="SchedulerPro/calendarfield.png" style="max-width : 500px" alt="Calendar field">

## Scheduling logic when using Project, Event and Resource calenders

In Scheduler Pro there are three types of calendars:

- Project calendar - Defines default availability.
- Event calendar - Defines availability intervals when it is possible to work on an event. Defaults to project calendar.
- Resource calendar - Defines availability intervals when a given resource can work. Defaults to project calendar.

When an event and a resource share the same calendar, it is very easy to tell working time from non-working time. But, if you
assign a custom calendar to an event, it gets a bit more complicated. The event will then be scheduled in intersecting time intervals
which are working in **both** calendars.

For example, let's say the project calendar defines Saturday and Sunday as non-working, the Event calendar says Mondays are non-working and the Resource
calendar defines Tuesdays as non-working. Now let's say we want to schedule an event starting Thursday which should last three
days. The event could be scheduled only on days allowed by both resource and event calendars. So it starts on Thursday,
continues on Friday, skips Sat and Sun, then continues Mon and Tue, and finishes at the end of Wednesday. In the scheduling
view it would appear that event lasts for 7 days. 

## Duration conversion

Previous versions of the Scheduler had properties responsible for duration conversions defined on calendars.
In the Scheduler Pro they are defined on the [project model](#SchedulerPro/model/ProjectModel)
(see [hoursPerDay](#SchedulerPro/model/ProjectModel#field-hoursPerDay), [daysPerWeek](#SchedulerPro/model/ProjectModel#field-daysPerWeek) and [daysPerMonth](#SchedulerPro/model/ProjectModel#field-daysPerMonth) for details).


<p class="last-modified">Last modified on 2023-06-30 9:53:56</p>