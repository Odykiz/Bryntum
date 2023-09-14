# Binding Bryntum Scheduler Pro data

Bryntum Scheduler Pro is a data intensive component that uses several datasets. These datasets usually come from the server
and are held in `SchedulerPro` project during the lifetime of the `SchedulerPro` view. There are several ways of populating the
project data stores.

## Using project transport

[ProjectModel](#SchedulerPro/model/ProjectModel) supports loading and saving of data in multiple stores with
[transport](#SchedulerPro/model/ProjectModel#config-transport) config. Loading the stores and saving all changes is done in
one request.

Configuring `project` with `transport` is the simplest way of binding data to the `SchedulerPro` project stores as seen from
the client side, but it does require following a specific protocol on the backend.

The configuration of `project` can be as simple as:

```javascript
project : {
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

When the application already has a server transport layer then the data for `SchedulerPro` is available in application code
and it needs to be passed (bound) to the component. One approach is to make the data available as Angular component
class variables and then use them in templates:

**app.component.ts:**

```typescript
import { Component, OnInit } from '@angular/core';
import { schedulerProConfig } from './app.config';
import { DataService } from './data.service';

@Component({
    selector    : 'app-root',
    templateUrl : './app.component.html',
    styleUrls   : ['./app.component.scss'],
    providers   : [DataService]
})
export class AppComponent implements OnInit {

    events = [];
    dependencies = [];
    resources = [];
    assignments = [];
    calendars = [];
    timeRanges = [];

    schedulerProConfig = schedulerProConfig;

    // Inject data service
    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        // Get initial data
        Object.assign(this, this.dataService.getData());
    }
}
```

**app.component.html:**

```html
<bryntum-scheduler-pro
    #schedulerpro
    [viewPreset] = "schedulerProConfig.viewPreset"
    [columns] = "schedulerProConfig.columns"
    [assignments] = "assignments"
    [calendars] = "calendars"
    [dependencies] = "dependencies"
    [events] = "events"
    [resources] = "resources"
    [timeRanges] = "timeRanges"
></bryntum-scheduler-pro>
```

`DataService` is a placeholder name in this example and it would be replaced by the service that provides data in your
application.

The key is to supply existing data to the class variables and then use these variables in the template.

## Binding existing data to the project

This approach bind data to a standalone `ProjectModel` and then uses this project in `SchedulerPro`. Project has its own
markup in the template and it must be assigned to the `SchedulerPro` during initialization.

This approach is suitable for more complex applications that use more than one Bryntum component that share a common
`project`:

**app.component.ts:**

```typescript
import { Component, OnInit } from '@angular/core';
import { schedulerProConfig, projectConfig } from './app.config';
import { DataService } from './data.service';

@Component({
    selector    : 'app-root',
    templateUrl : './app.component.html',
    styleUrls   : ['./app.component.scss'],
    providers   : [DataService]
})
export class AppComponent implements OnInit {

    events = [];
    dependencies = [];
    resources = [];
    assignments = [];
    calendars = [];
    timeRanges = [];

    schedulerProConfig = schedulerProConfig;
    projectConfig = projectConfig;

    // Inject data service
    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        // Get initial data
        Object.assign(this, this.dataService.getData());
    }
}
```

**app.component.html:**

```html
<bryntum-project-model
    #project
    [startDate] = "projectConfig.startDate"
    [assignments] = "assignments"
    [calendars] = "calendars"
    [dependencies] = "dependencies"
    [events] = "events"
    [resources] = "resources"
    [timeRanges] = "timeRanges"
></bryntum-project-model>

<bryntum-scheduler-pro
    #schedulerpro
    [columns] = "schedulerProConfig.columns"
    [project] = "project"
></bryntum-scheduler-pro>
```

<div class="note">

Note that <code>bryntum-project-model</code> tag must come before all other components that use it.
Otherwise the <code>#project</code> reference is not valid to these components.

</div>

`DataService` is a placeholder name in this example and it would be replaced by the service that provides data in your
application.

Check implementation in [inline-data](../examples/frameworks/angular/inline-data/) Angular demo.



<p class="last-modified">Last modified on 2023-06-30 10:22:39</p>