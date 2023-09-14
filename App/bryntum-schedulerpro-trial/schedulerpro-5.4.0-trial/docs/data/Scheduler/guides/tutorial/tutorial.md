# Tutorial - JS

Follow the steps in this tutorial to get this app up and running:

<div class="external-example" data-file="Scheduler/guides/tutorial/result.js"></div>

## 1. Minimal html page

In this first step we are going to create a basic index.html file with what we need to get started. Please add the
following:

```html
<html>

<head>
    <title>Tutorial</title>
    <!-- Include a theme -->
    <link rel="stylesheet" href="build/scheduler.material.css" data-bryntum-theme>
</head>

<body>
    <!-- Include the tutorial app -->
    <script type="module" src="app.js"></script>
</body>

</html>
```

Make sure that the path to the stylesheet is correct for your local setup.

## 2. Minimal Scheduler

Now we are going to add a minimal Scheduler to the `app.js` file:

```javascript
import { Scheduler } from 'scheduler.module.js';

const scheduler = new Scheduler({
    // Where to render to, accepts an element or an element id
    appendTo : document.body,
    
    // Normally sizing would be handled by CSS, but for simplicity
    // we use fixed with and height for the tutorial 
    width : 800,
    height : 600,

    // Dates that the time axis will span
    startDate : '2023-04-16',
    endDate   : '2023-05-15',
});
```

The page should now show something similar to this:

<div class="external-example" data-file="Scheduler/guides/tutorial/minimal.js"></div>

## 3. Loading data

The scheduler above is very empty, lets populate it with some data.

Scheduler accepts inline data, or it can use a `CrudManager` to load remote data. Depending on your setup you will
want to pick one or the other.

If you for example have multiple widgets on your page displaying the same data, you might  already have it available on
the client - supplying it as inline data can then be cheaper than remotely loading it also for Scheduler. But for most
cases loading it remotely will be the best fit.

To load data remotely, configure `crudManager` with an url to load from. Modify the previous snippet, adding the 
following:

```javascript
const scheduler = new Scheduler({
    // Code from the previous step omitted for brevity
    // ...

    // CrudManager handles data loading 
    // (and syncing, but not in this example)
    crudManager : {
        loadUrl  : 'data/data.json',
        autoLoad : true
    }
});
```

The response is expected in a specific format
(see [this guide](#Scheduler/guides/data/crud_manager.md#load-response-structure)). The data used for this tutorial is
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

Make sure the url points to where you placed your data. With the correct load url now in place, you should be seeing the
following:

<div class="external-example" data-file="Scheduler/guides/tutorial/load.js"></div>

## 4. Saving changes

As for loading data, you have multiple options for saving changes. You can use the `CrudManager` to sync changes 
automatically to the backend (by configuring it with a `syncUrl` and `autoSync`), which requires your backend to follow
the CrudManager protocol. Or you can listen for changes and send them to your backend manually, trading ease of use on
the client for flexibility on the server.

In this step we will use the latter approach. We will listen for changes, but since we have no backend in place we will
just log the changes to the console. Modify the previous snippet, adding the following:

```javascript
const scheduler = new Scheduler({
    // Code from the previous step omitted for brevity
    // ...

    crudManager : {
        loadUrl  : 'data/data.json',
        autoLoad : true,
        // New code ↓
        listeners : {
            // Listener for the `hasChanges` event, triggered when any store
            // handled by the crud manager has changes
            hasChanges() {
                console.log(scheduler.crudManager.changes);
                
                // In a real app you would send the changes to the server here.
                // Then you would call `scheduler.crudManager.acceptChanges()` to 
                // clear local changes.
            }
        }
    }
});
```

Try it out here (be sure to open the console to see the output):

<div class="external-example" data-file="Scheduler/guides/tutorial/save.js"></div>

## 5. Adding columns

A Scheduler by default consists of a left-hand side grid part with fixed width and a schedule part occupying the rest of 
the width. The grid part shows information about the resources. You can add an arbitrary number of columns to it (see 
the [Scheduler columns guide](#Scheduler/guides/basics/columns.md) for more info). In this step we add two columns:

```javascript
const scheduler = new Scheduler({
    // Code from the previous steps omitted for brevity
    // ...

    // Columns in the grid part
    columns : [
        {
            field : 'name',
            text  : 'Name'
        }, {
            field : 'role',
            text  : 'Role'
        }
    ]
});
```

The app should now look something like this:

<div class="external-example" data-file="Scheduler/guides/tutorial/columns.js"></div>

## 6. Enabling features

Scheduler ships with a set of features that can be enabled/disabled and configured to affect the functionality of the
component (see the [Scheduler features](#Scheduler/guides/basics/features.md) guide). We are going to enable
the `Stripe` feature (which gives every even row a gray background).

Alter your Scheduler config, add:

```javascript
const scheduler = new Scheduler({
    // Code from the previous steps omitted for brevity
    // ...

    // Configure Scheduler features
    features : {
        // Turn on the Strip feature, to stripe even rows
        stripe : true
    }
});
```

That change yields the following app:

<div class="external-example" data-file="Scheduler/guides/tutorial/features.js"></div>

## 7. Reacting to events

Scheduler, its features and data stores fire a number of events that you can listen to, for example Scheduler fires 
`eventClick` when clicking an event, the `resourceStore` fires `add` when a new resources is added, etc. See the API 
docs for each class for all events (Scheduler's events are for example [listed here](#Scheduler/view/Scheduler#events)).

To catch an event, you can either specify declarative `listeners` in the config, or add them programmatically using the 
`on` method. In this step we will add a declarative listener for the `eventClick` event, and a programmatic listener for
the `beforeEventEdit` event.

```javascript
const scheduler = new Scheduler({
    // Code from the previous steps omitted for brevity
    // ...

    // Declarative listener
    listeners : {
        eventClick({ eventRecord }) {
            Toast.show(`Clicked ${eventRecord.name}`);
        }
    }
});

// Programmatic listener
scheduler.on('beforeEventEdit', ({ eventRecord }) => {
    Toast.show(`Editing ${eventRecord.name}`);
});
```

<div class="external-example" data-file="Scheduler/guides/tutorial/events.js"></div>

## 8. Customizing the time axis

The cells in the schedule part are called "ticks". The size of these and the header above them can be customized using
a view preset. Scheduler ships with a number of presets, but you can also define your own or extend existing ones. See
the API docs for [PresetManager](#Scheduler/preset/PresetManager) for the full listing.

For this tutorial, we are going to extend the existing `weekAndDayLetter` preset to modify the top header to show the
week number instead of the first date of the week. Add the following to your app:

```javascript
const scheduler = new Scheduler({
    // Code from the previous steps omitted for brevity
    // ...

    // The view preset controls the time axis and its header
    viewPreset : {
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
    },
});
```

The header should now have changed in your app:

<div class="external-example" data-file="Scheduler/guides/tutorial/viewpreset.js"></div>

## 9. Adding some style and color

For the last step of this tutorial we are going to apply some color and styling to the Scheduler. For more info on the
topic, see the [Styling](#Scheduler/guides/customization/styling.md) guide.

An events color is derived from three sources: the scheduler, the resource and the event itself. As you might have 
noticed already, one of the events have a different color than the others. This is determined by the `eventColor` field
in its data. We are going to set an `eventColor` on the Scheduler, to change all others.

An events look is determined in a similar way, by using the `eventStyle` field. In addition to changing the color, we
are also going the change to another `eventStyle` for all events:

```javascript
const scheduler = new Scheduler({
    // Code from the previous steps omitted for brevity
    // ...

    // Event bar look and color
    eventStyle : 'border',
    eventColor : 'indigo'
});
```

The green events are now indigo instead, and the style has changed:

<div class="external-example" data-file="Scheduler/guides/tutorial/styling1.js"></div>

You can of course also use CSS to style the Scheduler and its events. For example, to add more border-radius for a
rounded look:

```css
.b-sch-event { 
    border-radius : 20px; 
}
```

Much rounder now:

<div class="external-example" data-file="Scheduler/guides/tutorial/result.js"></div>

That's it, you finished the tutorial 👍 Happy coding!


<p class="last-modified">Last modified on 2023-06-30 9:53:47</p>