# Binding Bryntum Scheduler data

Bryntum Scheduler is a data intensive component that uses several datasets. These datasets usually come from the server
and are held in `Scheduler` project during the lifetime of the `Scheduler` view. There are several ways of populating the
project data stores.

## Using CrudManager transport

[CrudManager](#Scheduler/data/CrudManager) is a built-in class that implements loading and saving of data in multiple
stores with [transport](#Scheduler/data/CrudManager#config-transport) config. Loading the stores and saving all
changes is done in one request.

Configuring `crudManager` with `transport` is the simplest way of binding data to the `Scheduler` project stores as seen
from the client side, but it does require following a specific protocol on the backend.

The configuration of `crudManager` can be as simple as:

```javascript
crudManager : {
    transport : {
        load : {
            url : '/server/load/url'
        },
        sync : {
            url : '/server/save/url'
        }
    },
    autoLoad : true
}
```

With this configuration, the data is loaded and saved from and to the above URLs and the data `transport` is handled
automatically.

## Binding existing data to the component

When the application already has a server transport layer then the data for Scheduler is available in application code and
it needs to be passed (bound) to the component. One approach is to make the data available as state variables and set
these as properties of the React component:

**App.js:**

```typescript
import React, { useState } from 'react';

import { schedulerConfig } from './AppConfig';
import { projectData } from './AppData';

import './App.scss';

function App() {
    const [events, setEvents] = useState(projectData.events);
    const [assignments, setAssignments] = useState(projectData.assignments);
    const [dependencies, setDependencies] = useState(projectData.dependencies);
    const [resources, setResources] = useState(projectData.resources);

    return (
        <BryntumScheduler
            ref = {scheduler}
            events = {events}
            assignments = {assignments}
            dependencies = {dependencies}
            resources = {resources}
            {...schedulerConfig}
        />
    );
}

export default App;
```

Here we have state variables, one per data set, together with their setters so whenever a change of data is needed the
setter needs to be called with new data as the argument and the change will be immediately reflected in the `Scheduler`.

For example:

```javascript
setEvents(newEvents);
setResources(newResources);
```



<p class="last-modified">Last modified on 2023-06-30 10:09:06</p>