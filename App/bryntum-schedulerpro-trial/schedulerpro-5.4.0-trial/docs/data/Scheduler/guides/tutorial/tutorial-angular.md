# Tutorial - Angular

Follow the steps in this tutorial to get this app up and running:

<div class="external-example" data-file="Scheduler/guides/tutorial/result.js" data-source="Scheduler/guides/tutorial/result-angular.md"></div>

## 1. Create an Angular app

In this first step we are going to create a basic Angular app using
[this guide](https://angular.io/cli) from angular.io.

1. (Optional) If you have not yet installed Angular CLI, you need to do it now using the following command:

```shell
npm install -g @angular/cli
```

2. Run the following in a terminal:

```shell
ng new --skip-tests --view-encapsulation None --style scss --no-routing angular-tutorial
cd angular-tutorial
npm start
```

You should now have an "empty" Angular app up and running, time to include the Scheduler.

## 2. Include the Scheduler

Now we are going to add a minimal Scheduler to the app.

1. Install the Scheduler packages (if you have not already, first set up the repo as per
   [the quick start guide](#Scheduler/guides/quick-start/angular.md)):

```shell
npm install @bryntum/scheduler @bryntum/scheduler-angular
```
<div class="note">
Note that if you are using a trial, replace <code>@bryntum/scheduler</code> with 
<code>@bryntum/scheduler@npm:@bryntum/scheduler-trial</code>.
</div>

2. Import `BryntumSchedulerModule` in `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BryntumSchedulerModule } from '@bryntum/scheduler-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BryntumSchedulerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Replace content of `app.component.scss` with:

```css
@import "@bryntum/scheduler/scheduler.material.css";

body {
    font-family: sans-serif;
    font-size: 14px;
}
```

and the content of `app.component.html` with:

```html
<bryntum-scheduler
  [width]="800"
  [height]="600"
  startDate="2023-04-16"
  endDate="2023-05-15"
></bryntum-scheduler>
```

and the content of `app.component.ts` with:
```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class AppComponent {
  title = 'angular-tutorial';
}
```

The page should now show something similar to this:

<div class="external-example" data-file="Scheduler/guides/tutorial/minimal.js" data-source="Scheduler/guides/tutorial/minimal-angular.md"></div>

## 3. Loading data

The scheduler above is very empty, lets populate it with some data.

Scheduler accepts inline data by binding to `events`, `resources` etc., or it can use a
[CrudManager](#Scheduler/data/CrudManager) to load remote data. Depending on your setup you will want to pick
one or the other.

If you, for example, have multiple widgets on your page displaying the same data, you might already have it available on
the client - binding it as inline data can then be cheaper than remotely loading it also for Scheduler. But for most
cases loading it remotely will be the best fit.

To load data remotely, configure `crudManager` with an url to load from. Modify the previous snippet of `app.component.ts`:

```jsx
// Code from the previous steps omitted for brevity

export class AppComponent {
  title = 'angular-tutorial';

  crudManagerConfig = {
    loadUrl  : 'assets/data.json',
    autoLoad : true
  }
}
```

And modify `app.component.html` to show the following:

```html
<bryntum-scheduler
  [width]="800"
  [height]="600"
  startDate="2023-04-16"
  endDate="2023-05-15"
  [crudManager]="crudManagerConfig"
></bryntum-scheduler>
```

The response is expected in a specific format, see
[this guide](#Scheduler/guides/data/crud_manager.md#load-response-structure). The data used for this tutorial is
available here: [data.json](data/Scheduler/examples/guides/tutorial/data.json). An excerpt from that file:

```json
{
  "success" : true,
  "events" : {
    "rows" : [
      {
        "id"         : 1,
        "resourceId" : 1,
        "startDate"  : "2023-04-17",
        "duration"   : 7,
        "name"       : "Project Kickoff"
      },
      {
        "..." : "..."
      }
    ]
  }
}
```

Note that although not shown above, the response also contains a `resources` section. This is used as the row source
for the Scheduler. The `events` section is used as the event source. Also note that while events are defined with a
`startDate` and a `duration`, you can also instead supply a `startDate` and an `endDate`.

To match the url used in the snippet above, please copy the `data.json` file to `src/assets` folder. With the
correct load url now in place, you should be seeing the following:

<div class="external-example" data-file="Scheduler/guides/tutorial/load.js" data-source="Scheduler/guides/tutorial/load-angular.md"></div>

## 4. Saving changes

As for loading data, you have multiple options for saving changes. You can use the `CrudManager` to sync changes
automatically to the backend (by configuring it with a `syncUrl` and `autoSync`), which requires your backend to follow
the CrudManager protocol. Or you can listen for changes and handle them your preferred way manually, trading ease of use
on the client for flexibility on the server.

In this step we will use the latter approach. We will listen for changes, but since we have no backend in place we will
just log the changes to the console. Modify the previous snippet of `app.component.ts`:

```jsx
// Code from the previous steps omitted for brevity
import { CrudManager } from '@bryntum/scheduler';

// Code from the previous steps omitted for brevity
export class AppComponent {
  title = 'angular-tutorial';

  changesHandler = ({ source } : { source : CrudManager }) => {
    const { changes } = source;

    // In a real app you would send the changes to the server here.
    console.log(changes);

    // Then you would call `source.acceptChanges()` to clear local changes
    source.acceptChanges();
  }

  crudManagerConfig = {
    loadUrl   : 'assets/data.json',
    autoLoad  : true,
    listeners : {
      hasChanges: this.changesHandler
    }
  };

}
```

Try it out here (be sure to open the console to see the output):

<div class="external-example" data-file="Scheduler/guides/tutorial/save.js" data-source="Scheduler/guides/tutorial/save-angular.md"></div>

## 5. Adding columns

A Scheduler by default consists of a left-hand side grid part with fixed width and a schedule part occupying the rest of
the width. The grid part shows information about the resources. You can add an arbitrary number of columns to it (see
the [Scheduler columns guide](#Scheduler/guides/basics/columns.md) for more info). In this step we add two columns (`app.component.html`):

```html
  <!-- Code from previous steps omitted for brevity -->
<bryntum-scheduler
  [columns]="columnsConfig"
></bryntum-scheduler>
```

and `app.component.ts`:

```typescript
export class AppComponent {

  // Code from previous steps omitted for brevity
  columnsConfig = [
    {
        field : 'name',
        text  : 'Name'
    },
    {
        field : 'role',
        text  : 'Role'
    }
  ];
}
```

The app should now look something like this:

<div class="external-example" data-file="Scheduler/guides/tutorial/columns.js" data-source="Scheduler/guides/tutorial/columns-angular.md"></div>

## 6. Enabling features

Scheduler ships with a set of features that can be enabled/disabled and configured to affect the functionality of the
component (see the [Scheduler features](#Scheduler/guides/basics/features.md) guide). We are going to enable
the `Stripe` feature (which gives every even row a gray background).

Alter your `app.component.html`, add:

```html
<!-- Code from the previous steps omitted for brevity -->
<bryntum-scheduler
  [stripeFeature]="true"
></bryntum-scheduler>
```

That change yields the following app:

<div class="external-example" data-file="Scheduler/guides/tutorial/features.js" data-source="Scheduler/guides/tutorial/features-angular.md"></div>

## 7. Reacting to events

Scheduler, its features and data stores fire a number of events that you can listen to, for example Scheduler fires
`eventClick` when clicking an event, the `resourceStore` fires `add` when a new resources is added, etc. See the API
docs for each class for all events (Scheduler's events are for example [listed here](#Scheduler/view/Scheduler#events)).

To catch an event, you can add method handlers to the component using standard Angular syntax (`(onEventClick)` etc.), 
or specify declarative `listeners` in the Bryntum config object, or add them programmatically using the `on` method. In
this step we will add a handler for `eventClick`, and a programmatic listener for the `beforeEventEdit` event (see the
Saving changes section above for an example of using a `listeners` object).

First an Angular style handler for the `eventClick` event in `app.component.html`:

```html
<!-- Code from the previous steps omitted for brevity -->
<bryntum-scheduler
  (onEventClick)="eventClickHandler($event)"
></bryntum-scheduler>
```

and the handler in `app.component.ts`:

```typescript
// Code from the previous steps omitted for brevity
import { CrudManager, EventModel, Toast } from '@bryntum/scheduler';

export class AppComponent {
  // Code from the previous steps omitted for brevity
  eventClickHandler(event : { eventRecord? : EventModel }) : void {
    const { eventRecord } = event;
    Toast.show(`Clicked ${eventRecord!.name}`)
  }
}
```

And now a programmatic listener for the `beforeEventEdit` event (`app.component.html`):

```html
<!-- Code from the previous steps omitted for brevity -->
<bryntum-scheduler
  #scheduler
></bryntum-scheduler>
```

and `app.component.ts`:

```typescript
// Code from the previous steps omitted for brevity
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';
import { CrudManager, EventModel, Scheduler, Toast } from '@bryntum/scheduler';

// Code from the previous steps omitted for brevity
export class AppComponent implements AfterViewInit {

  @ViewChild('scheduler') schedulerComponent! : BryntumSchedulerComponent;
  private scheduler! : Scheduler;

  ngAfterViewInit(): void {
    this.scheduler = this.schedulerComponent.instance;
    this.scheduler.on({
      beforeEventEdit:this.beforeEventEditHandler
    });
  };

  beforeEventEditHandler({ eventRecord } : { eventRecord : EventModel }) : void {
    Toast.show(`Editing ${eventRecord.name}`);
  };

  // Code from the previous steps omitted for brevity
}
```

<div class="note">You can use <code>on...</code> handlers for all events triggered on the Scheduler, but for more advanced
use cases that require reaching into deeper parts of the API, you might have to use declarative / programmatic
listeners.</div>

<div class="external-example" data-file="Scheduler/guides/tutorial/events.js" data-source="Scheduler/guides/tutorial/events-angular.md"></div>

## 8. Customizing the time axis

The cells in the schedule part are called "ticks". The size of these and the header above them can be customized using
a view preset. Scheduler ships with a number of presets, but you can also define your own or extend existing ones. See
the API docs for [PresetManager](#Scheduler/preset/PresetManager) for the full listing.

For this tutorial, we are going to extend the existing `weekAndDayLetter` preset to modify the top header to show the
week number instead of the first date of the week. Add the following to your `app.component.html`:

```html
<!-- Code from the previous steps omitted for brevity -->
<bryntum-scheduler
  [viewPreset]="viewPresetConfig"
></bryntum-scheduler>
```

and `app.component.ts`:

```typescript
// Code from the previous steps omitted for brevity
export class AppComponent implements AfterViewInit {

  // Code from the previous steps omitted for brevity

  viewPresetConfig = {
    base : 'weekAndDayLetter',

    // Customize the header
    headers : [
       // Week 16 ... on the top level
       {
         unit       : 'week',
         dateFormat : 'Wp'
       },
       // M, T, W ... on the bottom level
       {
         unit       : 'day',
         dateFormat : 'd1'
       }
    ]
  };
}
```

The header should now have changed in your app:

<div class="external-example" data-file="Scheduler/guides/tutorial/viewpreset.js" data-source="Scheduler/guides/tutorial/viewpreset-angular.md"></div>

## 9. Adding some style and color

For the last step of this tutorial we are going to apply some color and styling to the Scheduler. For more info on the
topic, see the [Styling](#Scheduler/guides/customization/styling.md) guide.

An events color is derived from three sources: the scheduler, the resource and the event itself. As you might have
noticed already, one of the events have a different color than the others. This is determined by the `eventColor` field
in its data. We are going to set an `eventColor` on the Scheduler, to change all others.

An events look is determined in a similar way, by using the `eventStyle` field. In addition to changing the color, we
are also going the change to another `eventStyle` for all events:

```html
<!-- Code from the previous steps omitted for brevity -->
<bryntum-scheduler
  eventColor="indigo"
  eventStyle="border"
 ></bryntum-scheduler>
```

The green events are now indigo instead, and the style has changed:

<div class="external-example" data-file="Scheduler/guides/tutorial/styling1.js" data-source="Scheduler/guides/tutorial/styling1-angular.md"></div>

You can of course also use CSS to style the Scheduler and its events. For example, to add more border-radius for a
rounded look (in `app.component.scss`):

```css
.b-sch-event {
    border-radius : 20px;
}
```

Much rounder now:

<div class="external-example" data-file="Scheduler/guides/tutorial/result.js" data-source="Scheduler/guides/tutorial/result-angular.md"></div>

That's it, you finished the tutorial 👍 Happy coding!


<p class="last-modified">Last modified on 2023-06-30 9:53:47</p>