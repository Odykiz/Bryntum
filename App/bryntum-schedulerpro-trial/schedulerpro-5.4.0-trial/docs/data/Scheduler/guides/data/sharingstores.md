# Sharing data between Bryntum components

Many applications need to share data between multiple components, for example between two partnered schedulers on a
single page. This guides describes some scenarios, and how to best handle sharing data in those cases.

## Sharing all data

Sharing data is easiest when two components are going to display the very same dataset at all times. Filtering in one of
the components should filter the other and so on. In these cases, it is easiest to share the project that holds the
stores:

```javascript
const topScheduler = new Scheduler({
    // Events & Resources are added to a backing project, 
    // which is created automatically
    events    : [/*...*/],
    resources : [/*...*/]
});

// Second scheduler shares project with the first
const bottomScheduler = new Scheduler({
    project : topScheduler.project
});
```

It is also possible to define the project standalone and then share it:

```javascript
const project = new ProjectModel({
    eventsData      : [/*...*/],
    resourcesData   : [/*...*/]
});

const topScheduler = new Scheduler({
    project
});

const bottomScheduler = new Scheduler({
    project
});
```

This way of sharing is not limited to using two of the same product, it works fine between Bryntum components that
consume a project of the same kind. For Scheduler, this includes Calendar and TaskBoard:

```javascript
const project = new ProjectModel({
    eventsData      : [/*...*/],
    resourcesData   : [/*...*/]
});

const scheduler = new Scheduler({
    project
});

const taskBoard = new TaskBoard({
    project
});
```

## Sharing some data

In many cases, you only want to share **some** data between components. For example, you might want to show only the 
unassigned events from a Scheduler in a Grid. In these cases, you should use [chained](#Core/data/Store#function-chain)
stores. That allows filtering the stores separately from each other:
 
```javascript
const scheduler = new Scheduler({
    events    : [/*...*/],
    resources : [/*...*/]
});

const unassignedGrid = new Grid({
    // Chain the event store to only show unassigned events
    store : scheduler.eventStore.chain(event => event.resources.length === 0)
});
```

Similarly, you might only want to show a subset of resources in one Scheduler sharing data with another. In this case,
you should also use chained stores. Note that you should then chain all shared stores - An `EventStore` is linked to a
`ResourceStore`, chaining the `ResourceStore` without chaining the `EventStore` also means linking between them won't 
wire up correctly:

```javascript
const topScheduler = new Scheduler({
    events    : [/*...*/],
    resources : [/*...*/]
});

const bottomScheduler = new Scheduler({
    // Chain the resource store to only show resources with id < 10
    resourceStore : topScheduler.resourceStore.chain(resource => resource.id < 10),
    // Also chain the event store, to not break assignments
    eventStore    : topScheduler.eventStore.chain()
});
```

<div class="note">To simplify the above, Scheduler will chain the stores if it detects it is passed a mix of chained
stores and original stores from another Scheduler/project. Note that this applies to EventStore, ResourceStore, 
AssignmentStore and DepencendyStore</div>


<p class="last-modified">Last modified on 2023-06-30 9:53:47</p>