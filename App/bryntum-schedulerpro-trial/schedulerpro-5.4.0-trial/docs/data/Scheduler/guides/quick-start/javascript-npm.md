# Getting Started with Bryntum Scheduler in JavaScript with npm package manager

## Try JavaScript demos

Bryntum Scheduler is delivered with a variety of JavaScript demo applications showing its functionality.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/scheduler/examples/" class="b-card"><i class="fas b-fa-globe"></i>View online JS demos</a>
<a href="#Scheduler/guides/download.md#javascript-demos" class="b-card"><i class="fab b-fa-js"></i>View local JS demos</a>
</div>

## Create JavaScript application

In this guide we will explain how to get started using the npm CLI. If you prefer to not use
npm, [please visit the dedicated Quick Start here](#Scheduler/guides/quick-start/javascript.md).

To get started, the broad steps are as follows:

1. [Access to npm registry](##access-to-npm-registry)
2. [Create Application](##create-application)
3. [Bryntum bundles](##bryntum-bundles)
4. [Install component](##install-component)
5. [Add component to Application](##add-component-to-application)
6. [Apply styles](##apply-styles)
7. [Run Application](##run-application)

The application we are about to build together is pretty simple, and will look like the live demo below:
<div class="external-example" data-file="Scheduler/guides/readme/basic.js"></div>

## Access to npm registry

The quickest way to use our products is to use npm (Node Package Manager). If you do not have npm installed on your
computer, please visit [nodejs.org](https://nodejs.org).

Bryntum packages are hosted in a private Bryntum registry. Run the following command to locate the registry:

```shell
$ npm config set "@bryntum:registry=https://npm.bryntum.com"
```

You will then need to login into the registry using authentication details. Please note that these details differ
depending on if you are running the **trial** or the **licensed** version. Please choose the appropriate option below:

Run the following command to login:

<div class="docs-tabs" data-name="npm">
<div>
    <a>NPM v6, v7, v8</a>
    <a>NPM v9</a>
</div>
<div>

```shell
$ npm login --registry=https://npm.bryntum.com
```

</div>
<div>

```shell
npm login --auth-type=legacy --registry=https://npm.bryntum.com
```

<div class="note">

Bryntum repository does not support new login protocol used by NPM v9. Please use <code>--auth-type=legacy</code>
option to authenticate

</div>
</div>
</div>

You will be required to provide a username, password and email address.

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed Version</a>
</div>
<div>

```shell
Username: user..yourdomain.com
Password: trial
Email: (this IS public) user@yourdomain.com
```

<div class="note">

As username, use your email address, but make sure you replace <code>@</code> with <code>..</code> (double dot). Use <code>trial</code> as password.

</div>

<p>
Please note that after the trial period or as soon as you are ready to go on production, you will be required to acquire
a commercial license from the <a href="https://customerzone.bryntum.com">Bryntum Customer Zone</a>. You will then be
required to re-login to the Bryntum private registry with your customer details.
</p>

</div>
<div>

```shell
Username: user..yourdomain.com
Password: 
Email: (this IS public) user@yourdomain.com
```

<div class="note">

As username, use your Bryntum <strong>Customer Zone email</strong> but make sure you replace <code>@</code> with <code>..</code> (double dot).
Use your <strong>Bryntum Customer Zone</strong> password.

</div>
</div>
</div>

For more information, visit our [Npm Repository Guide](#Scheduler/guides/npm-repository.md).

## Create Application

To create an application, let's create a folder and initialize our **package.json** file
using [npm CLI](https://docs.npmjs.com/cli):

First create a folder and move into it:

```shell
$ mkdir my-app
$ cd my-app
```

<div class="note">

Please feel free to change <code>my-app</code> to your preferred application folder name

</div>

Then initialize your application using the npm CLI `npm init` command:

```shell
$ npm init
```

You will get a series of questions:

* To the question `Package name`, let's consider we answered `my-app` consistently with the folder name, but feel free
  to use another name if preferred.
* To the question `entry point: (index.js)` let's call our file `app.js`, but feel free to use another file name if preferred.

Then just answer the next questions as usual. If you are not familiar with npm init, please visit
the [official npm CLI documentation here](https://docs.npmjs.com/cli).

Create a JavaScript file according to the entry point file name, let's say **app.js**, for instance.

You'll likely create an HTML page called `index.html`, and load your application script(s), let's say `index.js`, at the
end of the body section.

```html
<body>
    <script type = "module" src = "app.js"></script>
</body>
```

## Bryntum bundles

The Bryntum Scheduler distribution provides pre-build JavaScript bundles.
All bundles are transpiled with `chrome: 75` babel preset.

In distribution zip they are located under the **/build** folder.

| File                    | Contents                                                        |
|-------------------------|-----------------------------------------------------------------|
| `scheduler.module.js`     | Modules format bundle without WebComponents                     |
| `scheduler.lwc.module.js` | Modules format bundle with Lightning WebComponents (Salesforce) |
| `scheduler.wc.module.js`  | Modules format bundle with WebComponents                        |
| `scheduler.umd.js`        | UMD format bundle with WebComponents                            |

Typings for TypeScripts can be found in files with a `.d.ts` file extension.

Minified bundles are available for Licensed product version and delivered with `.min.js` suffix.

## Install component

From your terminal, update project dependencies using the following commands:

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed version</a>
</div>
<div>

```shell
$ npm install @bryntum/scheduler@npm:@bryntum/scheduler-trial@5.4.0 

```

</div>
<div>

```shell
$ npm install @bryntum/scheduler@5.4.0 

```
</div>
</div>

## Add component to Application

Once you have the classes imported in one of the ways listed above, you can proceed to the next step - configure your Scheduler.

Assuming the use of an EcmaScript module bundle:

```javascript
import { Scheduler } from './node_modules/@bryntum/scheduler/scheduler.module.js';

const scheduler = new Scheduler({
    appendTo : document.body,

    startDate : new Date(2022, 0, 1),
    endDate   : new Date(2022, 0, 10),

    resources : [
        { id : 1, name : 'Dan Stevenson' },
        { id : 2, name : 'Talisha Babin' }
    ],

    events : [
        { resourceId : 1, startDate : '2022-01-01', endDate : '2022-01-10' },
        { resourceId : 2, startDate : '2022-01-02', endDate : '2022-01-09' }
    ],

    columns : [
        { text : 'Name', field : 'name', width : 160 }
    ]
});
```

Here data is provided inline, but feel free to use the most appropriate data store.
[Learn more on stores...](#Core/guides/data/storebasics.md)

<div class="note">

Note that the <code>startDate</code> and <code>endDate</code> configs passed to the <code>Scheduler</code> instance denote the currently accessible 
timespan.

</div>

<div class="note">

We have referenced the module directly from the <code>node_modules</code> folder for simplicity in this code example.
Consider using your preferred build tool instead.

</div>

[More on EcmaScript modules...](#Scheduler/guides/gettingstarted/es6bundle.md)

Hundreds of companies covering various industries praise Bryntum products. However, not everyone uses them the same way,
so we have made them fully customizable.

If you want to discover how flexible the Bryntum Scheduler Component is right now, please continue exploring the
documentation and visit the [API documentation](#Scheduler/view/Scheduler).

## Apply styles

### Stylesheet

A theme is required to render the Bryntum Scheduler correctly.

The following CSS files are provided with the Bryntum npm packages or in the `/build` folder of the distribution:

| File                        | Contents            |
|-----------------------------|---------------------|
| `scheduler.classic-dark.css`  | Classic-Dark theme  |
| `scheduler.classic.css`       | Classic theme       |
| `scheduler.classic-light.css` | Classic-Light theme |
| `scheduler.material.css`      | Material theme      |
| `scheduler.stockholm.css`     | Stockholm theme     |

You'll need to copy the selected CSS file into your project, let's say in the root folder.

<div class="note">

We also recommend you to copy onto your application the <code>.css.map</code> file paired with the css file you selected.

</div>

The selected CSS file will need to be loaded from your HTML `<HEAD>` section as follows (Example inclusion of Stockholm
theme):

```html
<link rel = "stylesheet" href = "node_modules/@bryntum/scheduler/scheduler.stockholm.css" id = "bryntum-theme">
```

<div class="note">

We have referenced the CSS file directly from the <code>node_modules</code> folder for simplicity in this code example.
Consider using your preferred build tool instead.

</div>

You'll also need to **copy** the **font** folder next to the CSS file.

### Sizing the component

Create a CSS file, let's say **main.css**, for instance.
This CSS file will need to be loaded from your HTML `<HEAD>` section as follows:

```html
<link rel = "stylesheet" href = "main.css">
```

By Default, the Component is configured to take `100%` of the parent DOM element with a min-height of `10em`.

For your application to show the Component with the appropriate size, you can for example make parent components take
the full height of the screen.

```css
body,
html {
    margin         : 0;
    display        : flex;
    flex-direction : column;
    height         : 100vh;
    font-family    : Poppins, "Open Sans", Helvetica, Arial, sans-serif;
    font-size      : 14px;
}
```

There are many other solutions depending on the situation. Feel free to adapt the code above regarding your application
layout. For more information on the topic, see this guide
[Sizing the component](https://bryntum.com/products/grid/docs/guide/Grid/basics/sizing).

## Run Application

Now you can start your JavaScript App as usual!

<div class="note">

Please note that you will need to host your application on a web server. Surf to the page in your browser, likely using
an URL similar to <code>http://localhost/scheduler</code>.

</div>

## What to do next?

### Tutorial

Now it is time to customize your application. To get familiar with the most common tasks developers perform, we have
designed an [engaging tutorial](#Scheduler/guides/tutorial/tutorial.md) that we are excited 
to see you follow.

### Learn about Data

Bryntum components often use multiple collections and entities.

The [Data guide](#Scheduler/guides/data/displayingdata.md) guide explains how they all fit together.

### Enabling features

Please refer to the
[Enabling extra features](#Scheduler/guides/basics/features.md)
guide to learn how to enhance your Scheduler chart with additional functionality (such as displaying labels for the tasks).

### Responsiveness

Scheduler can be configured to work well on many different screen sizes. This is achieved by specifying different
responsive "levels" (breakpoints) on Scheduler and then having per level configurations on the columns. If this is a
concern now, visit the
[Responsive](#Scheduler/guides/customization/responsive.md)
guide to learn how to configure responsiveness.

### Localization

Bryntum Scheduler uses locales for translations of texts, date formats and such. This
[Localization](#Scheduler/guides/customization/localization.md)
guide shows you how to use one of the locales that Bryntum Scheduler ships with and how to create your own.



<p class="last-modified">Last modified on 2023-06-30 10:09:06</p>