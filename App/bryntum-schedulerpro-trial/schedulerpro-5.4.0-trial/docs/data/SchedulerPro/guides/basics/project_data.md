# The Project model and data entities

## Logical structure

Bryntum Scheduler Pro operates on a top-level entity called a "Project". A Project consists of several collections of
other entities. Collections are created as instances of the [Store](#Core/data/Store) class in the Bryntum Core package
and individual entities are represented by [Model](#Core/data/Model) instances.

Bryntum Scheduler Pro manages its project data using a [Scheduling Engine](scheduling engine). The engine is a separate
project written in TypeScript. Scheduler Pro makes use of mixins defined in the Scheduling Engine to build actual
classes that are used to store and manage the data. If you are new to the mixin concept, you can check
this [blog post](https://bryntum.com/blog/the-mixin-pattern-in-typescript-all-you-need-to-know/)
to become familiar with it. The main idea is that you can freely combine several mixins and not be tied to a single
superclass in the hierarchy (as you would be when using classic single superclass inheritance).

The "Project" itself is represented by a [ProjectModel](#SchedulerPro/model/ProjectModel). It is a
regular [Model](#Core/data/Model), capable of storing any project-wide configuration options.

The primary collections of the Project are:

* [Calendar manager store](#SchedulerPro/model/ProjectModel#property-calendarManagerStore). This is a tree store
  containing all the calendars of the Project. The collection is represented by
  a [CalendarManagerStore](#SchedulerPro/data/CalendarManagerStore). The entity is represented by
  a [CalendarModel](#SchedulerPro/model/CalendarModel). Please refer to
  the [calendars guide](#SchedulerPro/guides/basics/calendars.md) for more information about the calendars system in
  Bryntum Scheduler Pro.

* [Resources store](#SchedulerPro/model/ProjectModel#property-resourceStore). This is a flat store, keeping all
  resources of the Project. The collection is represented by a [ResourceStore](#SchedulerPro/data/ResourceStore). The
  entity is represented by a [ResourceModel](#SchedulerPro/model/ResourceModel).

* [Event store](#SchedulerPro/model/ProjectModel#property-eventStore). This is a flat store, keeping all events of the
  Project. The collection is represented by a [EventStore](#SchedulerPro/data/EventStore). The entity is represented by
  a [EventModel](#SchedulerPro/model/EventModel).

* [Assignment store](#SchedulerPro/model/ProjectModel#property-assignmentStore). This is a flat store, keeping all
  assignments of the Project. The collection is represented by a [AssignmentStore](#SchedulerPro/data/AssignmentStore).
  The entity is represented by a [AssignmentModel](#SchedulerPro/model/AssignmentModel).

* [Dependency store](#SchedulerPro/model/ProjectModel#property-dependencyStore). This is a flat store, keeping all
  dependencies of the Project. The collection is represented by a [DependencyStore](#SchedulerPro/data/DependencyStore).
  The entity is represented by a [DependencyModel](#SchedulerPro/model/DependencyModel).

Please refer to the documentation of mentioned classes above for detailed lists of available fields and methods.

## Creating a project

A project can be created as any other regular [Model](#Core/data/Model) instance. For example, here we create a project
with a specified start date and inlined data for the internal stores :

```javascript
const project = new ProjectModel({
    startDate  : '2020-01-01',

    eventsData : [
        { id : 1, name : 'Proof-read docs', startDate : '2020-01-02', endDate : '2020-01-09' },
        { id : 2, name : 'Release docs', startDate : '2020-01-09', endDate : '2020-01-10' }
    ],

    dependenciesData : [
        { fromEvent : 1, toEvent : 2 }
    ]
});
```

All project stores are created from scratch, and they will remain empty if no data is provided to them.

## Working with inline data

The project provides an [inlineData](#Scheduler/crud/AbstractCrudManager#property-inlineData) getter/setter that can
be used to manage data from all Project stores at once. Populating the stores this way can
be useful if you do not want to use the CrudManager for server communication but instead load data using Axios
or similar.

<div class="note">
Please supply assignments in the `assignmentsData` section. Scheduler Pro differs from Scheduler in that it does not support single assignment using `event.resourceId`.
</div>

### Getting data
```javascript
const data = scheduler.project.inlineData;

/*
Structure of inlineData:

data = {
    resourcesData : [/*...*/],
    eventsData : [/*...*/],
    dependenciesData : [/*...*/],
    assignmentsData : [/*...*/]
}
/*

// use the data in your application
```

### Setting data
```javascript
// Get data from server manually
const data = await axios.get('/project?id=12345');

// Feed it to the project
scheduler.project.inlineData = data;
```

See also [loadInlineData](#Scheduler/model/mixin/ProjectModelMixin#function-loadInlineData)

### Getting changed records

You can access the changes in the current Project dataset anytime using the [changes](#SchedulerPro/model/ProjectModel#property-changes) property. It
returns an object with all changes:

```javascript
const changes = project.changes;

console.log(changes);

> {
tasks : {
    updated : [{
        name : 'My task',
        id   : 12
    }]
},
assignments : {
    added : [{
        event      : 12,
        resource   : 7,
        units      : 100,
        $PhantomId : 'abc123'
    }]
    }
};
```

## Monitoring data changes

While it is possible to listen for data changes on the projects individual stores, it is sometimes more convenient
to have a centralized place to handle all data changes. By listening for the
[change event](#SchedulerPro/model/ProjectModel#event-change) your code gets notified when data in any of the stores
changes. Useful for example to keep an external data model up to date:

```javascript
const scheduler = new SchedulerPro({
    project: {
        listeners : {
            change({ store, action, records }) {
                const { $name } = store.constructor;

                if (action === 'add') {
                    externalDataModel.add($name, records);
                }

                if (action === 'remove') {
                    externalDataModel.remove($name, records);
                }
            }
        }
    }
});
```

Depending on your use case, listening to the `hasChanges` event is also an option. This event is fired whenever a change
to any store leads to the project having persistable changes. It does not supply any info on the actual changes, see
"Getting changed records" above for that.

## Adding custom fields to entities

You can add any number of custom fields to any entity of the project (including the project itself). To do this, simply
subclass the entity and add any additional fields in the accessor for
static [fields](#Core/data/Model#property-fields-static) property. For example, to add a `company` field to
the [ResourceModel](#SchedulerPro/model/ResourceModel):

```javascript
class MyResourceModel extends ResourceModel {
    static get fields() {
        return [
            { field: 'company', type: 'string' }
        ]
    }
}
```

When creating the project, configure to use the newly defined model class using the 
[resourceModelClass](#SchedulerPro/model/ProjectModel#config-resourceModelClass) config. There are analogous configs for
the other entities managed by the project.

```javascript
class MyResourceModel extends ResourceModel {
    static get fields() {
        return [
            { field: 'company', type: 'string' }
        ]
    }
}

const project = new ProjectModel({
    resourceModelClass  : MyResourceModel
});
```

See the API docs for [Model](#Core/data/Model) for more information on defining and mapping fields.

If you want to use a custom store type for some collection, do it in the same way - first subclass the store class, then
use [resourceStoreClass](#SchedulerPro/model/ProjectModel#config-resourceStoreClass) config or similar during the
project creation.

## Updating the project data

The [Model](#Core/data/Model) class lets you define special properties of the class, called "fields". Defining a field
will auto-create accessors to get/set its value, so the usage looks very much like a regular JS object property:

```javascript
class MyModel extends Model {
    static get fields() {
        return [
            { name : 'myField', type : 'string' }
        ]
    }
}

const myModel = new MyModel({ myField : 'someValue' })

// read
const lowerCased = myModel.someValue.toLowerCase()
// write
myModel.someValue = 'anothervalue'
```

## Data consistency

One important thing to understand is that the scheduling of events is performed asynchronously. So if you have assigned
a new value for the `startDate` field of some event, the corresponding update of the `endDate` field will not happen
immediately:

```javascript
const event1        = project.eventStore.add({ id : 'event1', startDate : new Date(2020, 1, 1), duration : 1 })

event1.startDate    = new Date(2020, 2, 1)

// still `null` or previous value
event1.endDate
```

Instead, all data changes are batched together in a single transaction and an "auto-commit" is scheduled (using a
0ms `setTimeout()`). During the commit, consistent values for all fields across the project will be calculated. When the
updated values for all entity fields are available, an [update](#Core/data/Store#event-update) event on the
corresponding Store collection will be triggered.

You can also trigger a commit immediately, using the `project.commitAsync()` method call:

```javascript
const event1        = project.eventStore.add({ id : 'event1', startDate : new Date(2020, 1, 1), duration : 1 })

event1.startDate    = new Date(2020, 2, 1)

await project.commitAsync()

// contains consistent value now
event1.endDate
```

For convenience, there are also generated setter methods for many fields, which performs an update and triggers the
commit immediately. A setter method is a regular method whose name starts with `set` and ends with the uppercased field
name. For example, for the
[startDate](#SchedulerPro/model/EventModel#field-startDate) field, the setter method will
be: [setStartDate](#SchedulerPro/model/EventModel#function-setStartDate).

Let's say that we want to change the start date of a event. Using `async/await` (wrapped with an extra function, since
global `async/await` is still in the proposal stage) it will look like:

```javascript
const updateStartDate = async () => {
    const eventStore    = project.eventStore
    const event         = eventStore.getById(1)

    await event.setStartDate(new Date(2020, 3, 25))

    ... // continue after start date update
}
```

Such asynchronous setters methods are explicitly marked as returning `Promise` in the documentation.

<img src="SchedulerPro/propagating.png" style="max-width:70%" alt="Propagating method">

## Updating data on event change

Sometime it you may want to update an event based on changes done to another event. To do this, you can subscribe to
the [change](#SchedulerPro/data/EventStore#event-change) event, then assure that the action is correct (`update`). You
should also ensure that [State Tracking Manager](#Core/data/stm/StateTrackingManager)
is not [restoring](#Core/data/stm/StateTrackingManager#property-isRestoring) data, otherwise restoring will trigger
recalculation again.

For example, if you need to set all predecessors to 100% done when some reaches gets 100%, or reset them to 0%
otherwise:

```javascript
eventStore.on({
    change : ({ action, record, changes }) => {
        const project = record.project;

        if (action === 'update' && changes && changes.percentDone != null && !project.getStm().isRestoring) {
            record.predecessors.forEach(event => event.percentDone = changes.percentDone.value === 100 ? 100 : 0);
        }
    }
});
```

## Persisting the project data

The [ProjectModel](#SchedulerPro/model/ProjectModel) class implements a 
[AbstractCrudManagerMixin](#Scheduler/crud/AbstractCrudManagerMixin) mixin, specialized for Scheduler Pro. It uses the 
[JsonEncoder](#Scheduler/crud/encoder/JsonEncoder) for serialization and 
[AjaxTransport](#Scheduler/crud/transport/AjaxTransport) for communication with the server.

The crud manager mixin provides two additional methods for the project instance:

- [load](#Scheduler/crud/AbstractCrudManagerMixin#function-load) Loads a new data package from server. The data package
  will contain data for all stores, used in the project.
- [sync](#Scheduler/crud/AbstractCrudManagerMixin#function-sync) Persists the changes from all project stores to the
  server.

For more general information about the Crud manager architecture please refer to
[this guide](#Scheduler/guides/data/crud_manager.md).


<p class="last-modified">Last modified on 2023-06-30 9:53:56</p>