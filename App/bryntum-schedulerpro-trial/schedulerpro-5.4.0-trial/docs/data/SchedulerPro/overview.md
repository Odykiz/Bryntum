[//]: # (Links in this document only works when viewed in the documentation browser, surf to ./docs)

# Bryntum Scheduler Pro

## What is Bryntum Scheduler Pro?

Welcome to the Bryntum Scheduler Pro - the most **advanced** JavaScript Scheduler component.

Bryntum Scheduler Pro supercharges the Bryntum Scheduler with our powerful Gantt scheduling engine to deliver an
unparalleled experience.

For more general information on our Scheduler Pro product, please read on. This documentation provides you with
everything you need to get started.

If you are excited to have a go now, we suggest you to start with one of our **quick start guides** below:

<div class="framework-logos">
<a href="#SchedulerPro/guides/quick-start/react.md"><img src="Core/logo/react.svg" alt="React"><span>React</span></a>
<a href="#SchedulerPro/guides/quick-start/angular.md"><img src="Core/logo/angular.svg" alt="Angular"><span>Angular</span></a>
<a href="#SchedulerPro/guides/quick-start/vue-3.md"><img src="Core/logo/vue.svg" alt="Vue"><span>Vue</span></a>
<a href="#SchedulerPro/guides/quick-start/javascript.md"><img src="Core/logo/vanilla.svg" alt="Vanilla JS"><span>Vanilla JS</span></a>
</div>

Bryntum Scheduler Pro is an excellent choice for applications needing more than just a good visualisation, a few examples:
* Complex scheduling scenarios where tasks are dependent on other tasks (such as a Gantt project)
* Planning systems based on resource availability
* Manufacturing Execution System (MES) apps for production facilities

Bryntum Scheduler Pro is an extension of the [Scheduler](https://bryntum.com/products/scheduler) that can understand 
Gantt project data, making the component capable of managing *dependencies*, *resources*, *assignments* and *calendars*.

## Live demo

Try out some of the Bryntum Scheduler Pro features with the Live demo below.

<div class="external-example" data-file="SchedulerPro/guides/readme/intro.js"></div>

To get a complete view of Bryntum SchedulerPro Component capabilities, please read topic-specific guides from the menu,
visit our [API documentation](#SchedulerPro/view/SchedulerPro) and [examples browser](../examples).

## Integration

Bryntum Scheduler Pro runs in all modern browsers (Chrome, Firefox, Safari, and modern Edge), whatever is your target
technology.

You can use Bryntum Scheduler Pro out of the box or integrate it with the frameworks of your choice and many third-party solutions. Visit the integration section of our documentation for further details:
* <a href="#SchedulerPro/guides/integration/react/guide.md">React <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/react.svg" alt="React"></a>
* <a href="#SchedulerPro/guides/integration/angular/guide.md">Angular <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/angular.svg" alt="Angular"></a>
* <a href="#SchedulerPro/guides/integration/vue/guide.md">Vue <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/vue.svg" alt="Vue"></a>
* <a href="#SchedulerPro/guides/integration/ionic/guide.md">Ionic <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/ionic.svg" alt="Ionic"></a>
* <a href="#SchedulerPro/guides/integration/nodejs.md">Node.JS <img style="height: 1em;width: 1em;margin-top:0;" src="Core/logo/nodejs.svg" alt="Node.js"></a>

<div class="note">
If you have already downloaded Bryntum Scheduler Pro, please note that it ships with framework examples found in
the <code>examples/frameworks</code> folder. If you have not, you can <a href="https://bryntum.com/download">
download your free trial version from here</a>
</div>

## How does it work?

Bryntum Scheduler Pro differs from the [Scheduler](https://bryntum.com/products/scheduler/examples/) in many ways:

* Scheduler Pro always uses an AssignmentStore to manage event assignments, whereas Scheduler uses an EventStore,
  ResourceStore and **optionally** an AssignmentStore and a DependencyStore.
* Scheduler Pro uses the same data model as the Gantt and can visualise a Project side by side with the Gantt.
* In Scheduler Pro, adding a dependency between two tasks will affect the scheduling of the successor task. Scheduler
  only shows dependencies but they are just visual elements, they do not impact scheduling.

Thanks to this advanced data model, Scheduler Pro can display more project related information such as:
* Visualising a task completion progress bar.
* Showing a Timeline widget and a Resource Histogram widget.
* and more...

### Project Data

Scheduler Pro is one of a kind. Its scheduling engine matches Microsoft Project logic and supports projects of any size.
It is built on top of [ChronoGraph](https://github.com/bryntum/chronograph) - an open-source reactive computational
engine also developed by Bryntum.

<img src="SchedulerPro/chronograph.png" class="b-screenshot" alt="Scheduling engine">

The scheduling engine is self-contained/headless, designed to be compatible with a server-side Node.js environment. It
is a built-in dependency and should require no additional installation or configuration.
The documentation for this part of the codebase is available in [Bryntum Scheduling Engine API Docs](engine).

### Visualisation and UI

The visualisation and user interface part of the Scheduler Pro is based on
[Bryntum Scheduler](https://bryntum.com/products/scheduler), which in turn is based on the
[Bryntum Grid](https://bryntum.com/products/grid) and is written in plain JavaScript. So you can use most Scheduler and
Grid features too. For more information about Grid capabilities, please visit the 
[Grid Component documentation](https://bryntum.com/products/grid/docs/).

In a traditional setup, you will want to use **frozen grid** columns to the left and let the **Gantt Timeline** (which
is a specialised grid) occupy the rest of the available space with a horizontal scrollbar to scroll the timeline. You
can also associate as many extra grids as needed to improve even more the user experience.

<img src="SchedulerPro/schedulerpro-layout.png" class="b-screenshot" alt="Scheduler Pro layout">

[//]: # (do not change the title of the last section unless you adapt GA Tag tutorial_complete)
## What to do next?

The best way to learn how to use our Scheduler Pro component is to first select a quick start guide and after that
follow our tutorial. To get started, please choose your target technology below:

<div class="framework-logos">
<a href="#SchedulerPro/guides/quick-start/react.md"><img src="Core/logo/react.svg" alt="React"><span>React</span></a>
<a href="#SchedulerPro/guides/quick-start/angular.md"><img src="Core/logo/angular.svg" alt="Angular"><span>Angular</span></a>
<a href="#SchedulerPro/guides/quick-start/vue-3.md"><img src="Core/logo/vue.svg" alt="Vue"><span>Vue</span></a>
<a href="#SchedulerPro/guides/quick-start/javascript.md"><img src="Core/logo/vanilla.svg" alt="Vanilla JS"><span>Vanilla JS</span></a>
</div>

## Professional Services

Feeling you need help? Don’t hesitate to request support from our 
[Professional Services here](https://bryntum.com/services/).

## Copyright and license

Copyright © 2009 - {{YEAR}}, Bryntum

All rights reserved.

[License](https://bryntum.com/products/schedulerpro/license/)


<p class="last-modified">Last modified on 2023-06-30 9:53:56</p>