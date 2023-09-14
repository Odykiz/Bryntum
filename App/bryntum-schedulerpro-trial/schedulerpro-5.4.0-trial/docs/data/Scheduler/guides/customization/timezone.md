# Time zone support

As of version 5.3.0 there is built-in support for time zone conversions in all Bryntum scheduling products. This means
that a Scheduler, for example, can be configured to a different time zone and show time as it is *in* configured time
zone.

## Configuring

Set projects [timeZone](#Scheduler/model/ProjectModel#config-timeZone) config to a IANA time zone (i.e.
`Europe/Stockholm`) or a UTC offset in minutes (i.e. `-120`). This will convert all events, tasks and time ranges to the
configured time zone or offset. It will also affect the displayed timeline's headers as well at the start and end date
of it.

```javascript
 new Scheduler({
    project : {
        // This will convert time to CET (UTC+1) or
        // CEST (UTC+2) depending on DST 
        timeZone : 'Europe/Stockholm'
    }
});
```

There is also a referer [timeZone config](#Scheduler/view/TimelineBase#config-timeZone) available on the Scheduler,
SchedulerPro, Gantt and Calendar. This will set/get the `timeZone` config on the components project. Please note that if
switching to a new project, the timeZone configuration will need to be reset.

```javascript
 new Scheduler({
    // This will convert time to CST (UTC-6) or
    // CDT (UTC-5) depending on DST
    timeZone : 'America/Chicago'
});
```

Specifying a UTC offset in minutes is also possible. The provided number has no built-in limitations. The amount of
minutes relative to UTC will simply be added or subtracted from the date that is being converted. Please note that this
approach has no DST support at all.

```javascript
new Scheduler({
    // This will convert dates to UTC and 
    // then subracting 12 hours from them.
    timeZone : -60 * 12
});
```

## Data

The events, tasks and time ranges that are loaded or being loaded into the project will be put through a time zone
conversion function.

* A provided JavaScript Date will be interpreted as local to the client's system time zone. Please read the section
  about [JavaScript Dates](#Scheduler/guides/customization/timezone.md#javascript-dates) below.
* A provided string Date will be interpreted by JavaScript to a local Date and then converted to the configured time
  zone. Examples of different string dates:
    * `2022-10-26T14:28:01` - A date local to the client's system time zone.
    * `2022-12-24T14:00:00Z` - A UTC date
    * `2022-12-31T23:59:59+01:00` - A date in UTC+1 time zone
 
<div class="note">
Dates on events, tasks and time ranges that is added or inserted to a store will be treated as already in the currently
configured time zone. This means that no time zone conversion will be applied when adding or inserting records.
</div>

### Editing

After the Scheduler has been converted to a different time zone, editing or creating a record will be interpreted as
*in* the configured time zone. This also includes programmatically created records. There will therefore be no time zone
conversion on created or updated record's dates.

### Saving

When saving or syncing data, the dates will be restored to local system time and converted to JSON, in ISO format.

## JavaScript Dates

There is currently no native support for time zones in JavaScript. A JavaScript Date is *in* the client's system time
zone and also holds information about its UTC equivalent at that particular point in time. That means that a time zone
converted time technically is *in* the client's system time zone, but adjusted to match the configured time zone.

## Daylight Saving Time (DST)

When using a IANA time zone identifier there will be support for DST. But due to the fact that a JavaScript date is in
the client's system time zone, there are cases when the conversion gives a faulty result. These cases occur when the
client's system time zone has DST and the converted result date is exactly at the hour when DST adds an hour.

Example: Convert date time in `UTC+1` to `Antarctica/Casey` (UTC without any DST):

```javascript
TimeZoneHelper.toTimeZone(new Date('2022-03-27T03:00+01:00'), 'Antarctica/Casey');
```

This should return `2022-03-27T02:00`.

But when client's system time zone is `Europe/Stockholm` it returns `2022-03-27T03:00` instead, due to that
`Europe/Stockholm` enters DST at `2022-03-27T02:00` and therefore skips that hour.

## TimeZoneHelper

The [TimeZoneHelper](#Core/helper/TimeZoneHelper) is available for time zone conversion. It holds only 2
functions, `toTimeZone` and `fromTimeZone`.

What time is it now in `Asia/Nicosia`?

```javascript
TimeZoneHelper.toTimeZone(new Date(), 'Asia/Nicosia');
```

What is this date in client's system time zone if current time zone is `Atlantic/Reykjavik`?

```javascript
TimeZoneHelper.fromTimeZone(new Date('2022-02-06T12:00'), 'Atlantic/Reykjavik');
```


<p class="last-modified">Last modified on 2023-06-30 9:53:47</p>