# Scheduler Pro event scheduling

## Manually and automatically scheduled events

An event can be scheduled either **automatically** (default) or **manually**. This is defined by the [manuallyScheduled](#SchedulerPro/model/EventModel#field-manuallyScheduled) event flag.
The difference between these two types is that automatically scheduled events are affected by the automatic rescheduling process
while manually scheduled are not.
Manually scheduled events are meant to be adjusted manually by a user.

## Automatic event scheduling

The Scheduler Pro scheduling engine updates start and end dates of automatically scheduled events based on their _constraints_, _dependencies_ and working time settings.
This means that the [startDate](#SchedulerPro/model/EventModel#field-startDate) and [endDate](#SchedulerPro/model/EventModel#field-endDate) are revalidated and
might be recalculated as soon as the event is added or loaded to a project.

Events having no incoming dependencies nor constraints tend to keep their [start date](#SchedulerPro/model/EventModel#field-startDate) intact.
The only factor that could cause such events automatic rescheduling is changes affecting their working time
(happens for example when the event calendar or assignments are changed).

## Propagating changes through event dependencies

When an Event changes, its linked events (successors) will be rescheduled automatically.

How dependent events will be updated after a modification depends on the [dependency type](#SchedulerPro/model/DependencyModel#field-type).
The Scheduler Pro engine supports the following four types of dependencies:

- Finish-to-Start (default)
- Start-to-Start
- Finish-to-Finish
- Start-to-Finish

### Finish-to-Start

<img src="engine/media/dependency-fs.png" alt="Finish-to-Start dependency" class="b-">

The default type of a dependency is "Finish-to-Start" (FS). This type of dependency restricts the dependent event
to not start earlier than the end date of the preceding event.

### Start-to-Start

<img src="engine/media/dependency-ss.png" alt="Start-to-Start dependency" class="b-">

With this dependency type, the succeeding event is delayed to not start earlier than the start of the preceding event.

### Finish-to-Finish

<img src="engine/media/dependency-ff.png" alt="Finish-to-Finish dependency" class="b-">

The succeeding event cannot finish before the completion of the preceding event.

### Start-to-Finish

<img src="engine/media/dependency-sf.png" alt="Start-to-Finish dependency" class="b-">

The finish of the succeeding event is constrained by the start of the preceding event. The successor cannot finish
before the predecessor starts.

### Dependency lead and lag

A [dependency](#SchedulerPro/model/DependencyModel) can have a [lag (or lead)](#SchedulerPro/model/DependencyModel#field-lag) value which
can delay the succeeding event by the number of [lag units](#SchedulerPro/model/DependencyModel#field-lagUnit) specified.

<img src="engine/media/dependency-lag.png" alt="Dependency lag" class="b-">

Lead (or "negative lag") will accelerate the succeeding event by the number of time units specified.

<img src="engine/media/dependency-lead.png" alt="Dependency lead" class="b-">

**Please note**, the [lag](#SchedulerPro/model/DependencyModel#field-lag) value specifies the amount of **working time**. The
calendar controlling which time to use is defined by the [calendar](#SchedulerPro/model/DependencyModel#field-calendar) field. By
 default, the successor calendar is used.

## Event constraint effect on the scheduling

An event constraint defines boundaries for the schedulable date range of an event and it is taken into account
when the engine schedules the event.

A constraint is a combination of two event properties: [constraintType](#SchedulerPro/model/EventModel#field-constraintType) and [constraintDate](#SchedulerPro/model/EventModel#field-constraintDate).
The date range specified by a constraint, restricts the event start / end dates to be **not earlier than**,
**not later than** or **equal** to the provided [constraintDate](#SchedulerPro/model/EventModel#field-constraintDate).

When an event is manually dragged by a user in a Scheduler Pro chart,
the Scheduler Pro enforces the position by setting a constraint on the event.
It uses [Start no earlier than](#SchedulerPro/model/EventModel#field-constraintType) (SNET) constraint when the event is moved by changing its [start date](#SchedulerPro/model/EventModel#field-startDate) (and [Finish no earlier than](#SchedulerPro/model/EventModel#field-constraintType) (FNET) constraint when the event is moved by changing its [end date](#SchedulerPro/model/EventModel#field-endDate)).

The way a constraint affects an event depends on its [type](#SchedulerPro/model/EventModel#field-constraintType). There are two group of
constraints available:

- Inflexible constraints.
- Semi-flexible constraints.

### Inflexible constraints

There are two constraints in this group [Must start on](#SchedulerPro/model/EventModel#field-constraintType) (MSO) and [Must finish on](#SchedulerPro/model/EventModel#field-constraintType) (MFO).
They force an event to start / finish exactly on the [date](#SchedulerPro/model/EventModel#field-constraintDate) provided.

### Semi-flexible constraints

These constraints share the same priority with event dependencies. They all work together respecting the event working time:

- [Start no earlier than](#SchedulerPro/model/EventModel#field-constraintType) (SNET) - restricts the event to start on or after the specified date.
- [Finish no earlier than](#SchedulerPro/model/EventModel#field-constraintType) (FNET) - restricts the event to finish on or after the specified date.
- [Start no later than](#SchedulerPro/model/EventModel#field-constraintType) (SNLT) - restricts the event to start before (or on) the specified date.
- [Finish no later than](#SchedulerPro/model/EventModel#field-constraintType) (FNLT) - restricts the event to finish before (or on) the specified date.

Effectively, the event start/end dates are calculated as aggregated values taking into account both dependencies
and such constraints. The earliest start date for an event is computed as the latest of the earliest start allowed by
its constraint and the earliest start allowed by its dependencies.

An example: Event _A_ has two incoming dependencies which don't allow it to start earlier than _01/18/2017_ and the event
has a _SNET_ constraint which forces it to start not earlier than _01/17/2017_. In this case, the resulting earliest
start date of the event is _01/18/2017_. If we change the constraint date to _01/19/2017_ the resulting earliest start
date will become _01/19/2017_.

## Working time effect on the scheduling

By default an event's _working time_ is defined by combination of its own [calendar](#SchedulerPro/model/EventModel#field-calendar)
and the [assigned resource calendars](#SchedulerPro/model/ResourceModel#field-calendar).
Technically an event can be performed in periods calculated as intersection of the [event calendar](#SchedulerPro/model/EventModel#field-calendar)
and some of [assigned resource calendars](#SchedulerPro/model/ResourceModel#field-calendar).

The above logic can be changed with the [ignoreResourceCalendar](#SchedulerPro/model/EventModel#field-ignoreResourceCalendar) field.
After setting the field to `true` the event stops taking resource calendars into account and gets scheduled by its own [calendar](#SchedulerPro/model/EventModel#field-calendar) only.

That means that an event can get rescheduled when it changes its own calendar and
if the event's [ignoreResourceCalendar](#SchedulerPro/model/EventModel#field-ignoreResourceCalendar) is `false` (default)
it reacts on changing its assigned resource calendars and its assignments (adding/removing an assignment etc) since that might add or remove a calendar.


<p class="last-modified">Last modified on 2023-06-30 10:24:14</p>