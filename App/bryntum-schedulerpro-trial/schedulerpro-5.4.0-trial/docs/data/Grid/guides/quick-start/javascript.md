# Getting Started with Bryntum Grid in JavaScript

## Try JavaScript demos

Bryntum Grid is delivered with a variety of JavaScript demo applications showing its functionality.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/grid/examples/" class="b-card"><i class="fas b-fa-globe"></i>View online JS demos</a>
<a href="#Grid/guides/download.md#javascript-demos" class="b-card"><i class="fab b-fa-js"></i>View local JS demos</a>
</div>

## Create JavaScript application

In this guide we will explain how to get started if you are not using npm. If you prefer to use npm,
[please visit the dedicated Quick Start here](#Grid/guides/quick-start/javascript-npm.md).

To get started, the broad steps are as follows:

1. [Download Bryntum Grid](##download)
2. [Create Application](##create-application)
3. [Bryntum bundles](##bryntum-bundles)
4. [Add component to Application](##add-component-to-application)
5. [Apply styles](##apply-styles)
6. [Run Application](##run-application)

The application we are about to build together is pretty simple, and will look like the live demo below:
<div class="external-example" data-file="Grid/guides/readme/basic.js"></div>

## Download

Bryntum Grid is a commercial product, but you can access our free trial archive with bundles and examples by
[downloading it here](https://bryntum.com/download/?product=grid).

## Create Application

You can proceed as usual. The Bryntum Grid Component is compliant with the most popular Javascript Standards.

You'll likely create a folder with an HTML page called `index.html` and a JavaScript file for your application, let's
say `app.js`.

## Bryntum bundles

The Bryntum Grid distribution provides pre-build JavaScript bundles.
All bundles are transpiled with `chrome: 75` babel preset.

In distribution zip they are located under the **/build** folder.

| File                    | Contents                                                        |
|-------------------------|-----------------------------------------------------------------|
| `grid.module.js`     | Modules format bundle without WebComponents                     |
| `grid.lwc.module.js` | Modules format bundle with Lightning WebComponents (Salesforce) |
| `grid.wc.module.js`  | Modules format bundle with WebComponents                        |
| `grid.umd.js`        | UMD format bundle with WebComponents                            |

Typings for TypeScripts can be found in files with a `.d.ts` file extension.

Minified bundles are available for Licensed product version and delivered with `.min.js` suffix.

### Using EcmaScript module bundles

If you choose this option, **copy** the selected module file onto your application, in the root folder, for instance.

We recommend you load your application script(s) (for example **app.js**) at the end of the body section with the
following syntax.

```html
<body>
    <script type = "module" src = "app.js"></script>
</body>
```

From your script(s) (for example **app.js**) import the classes you need from the EcmaScript module bundle, you can then
use them as follows:

```javascript
import { Grid } from './grid.module.js';

const grid = new Grid({/*...*/ });
```

<div class="note">

We have copied the module directly from the <code>build</code> folder for simplicity in this code example. Consider
using your preferred build tool instead.

</div>

[More on EcmaScript modules...](#Grid/guides/gettingstarted/es6bundle.md)

### Using `<script>` tag and UMD files

Please consider this solution as legacy and use it only for compatibility. If you choose this option, **copy** the
selected UMD file onto your application, in the root folder, for instance.

To include Bryntum Grid on your page using a plain old script tag, add a `<script>` tag pointing to the UMD bundle
file in the `<HEAD>` of your HTML page. Example:

```html
<script src = "grid.umd.js"></script>
```

We recommend you load your application script(s) (for example **app.js**) at the end of the body section with the
following syntax.

```html
<body>
    <script src = "app.js"></script>
</body>
```

Within your application script(s), you will be able to access Grid classes in the global `bryntum` namespace as
follows:

```javascript
const grid = new bryntum.grid.Grid({/*...*/ });
```

<div class="note">

We also recommend you to copy onto your application the <code>.js.map</code> file paired with the umd file you selected.

</div>

<div class="note">

We have copied the module directly from the <code>build</code> folder for simplicity in this code example. Consider
using your preferred build tool instead.

</div>

[Read more on script tag and UMD modules...](#Grid/guides/gettingstarted/scripttag.md)

## Add component to Application

Assuming the use of an EcmaScript module bundle:

```javascript
import { Grid } from './grid.module.js';

const grid = new Grid({

    appendTo : document.body,

    height : 400,

    data : [
        { name : 'Dan Stevenson', city : 'Los Angeles' },
        { name : 'Talisha Babin', city : 'Paris' }
    ],

    columns : [
        { field : 'name', text : 'Name', width : 200 },
        { field : 'city', text : 'City', flex : 1 }
    ]

});
```

Here data is provided inline, but feel free to use the most appropriate data store.
[Learn more on stores...](#Core/guides/data/storebasics.md)

Hundreds of companies covering various industries praise Bryntum products. However, not everyone uses them the same way,
so we have made them fully customizable.

If you want to discover how flexible the Bryntum Grid Component is right now, please continue exploring the
documentation and visit the [API documentation](#Grid/view/Grid).

## Apply styles

### Stylesheet

A theme is required to render the Bryntum Grid correctly.

You'll find a complete list of available CSS files in the `/build` folder of the distribution:

| File                        | Contents            |
|-----------------------------|---------------------|
| `grid.classic-dark.css`  | Classic-Dark theme  |
| `grid.classic.css`       | Classic theme       |
| `grid.classic-light.css` | Classic-Light theme |
| `grid.material.css`      | Material theme      |
| `grid.stockholm.css`     | Stockholm theme     |

You'll need to copy the selected CSS file into your project, let's say in the root folder.

<div class="note">

We also recommend you to copy onto your application the <code>.css.map</code> file paired with the css file you selected.

</div>

The selected CSS file will need to be loaded from your HTML `<HEAD>` section as follows (Example inclusion of Stockholm
theme):

```html
<link rel = "stylesheet" href = "grid.stockholm.css" id = "bryntum-theme">
```

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

Please note that if you have chosen to use EcmaScript module bundles, you will need to host your application on a web
server to avoid CORS policy errors. Surf to the page in your browser, likely using an URL similar to 
<code>http://localhost/grid</code>.

</div>

## What to do next?

### Tutorial

Now it is time to customize your application. To get familiar with the most common tasks developers perform, we have
designed an [engaging tutorial](#Grid/guides/tutorial.md) that we are excited 
to see you follow.

### Learn about Data

Bryntum components often use multiple collections and entities.

The [Data guide](#Grid/guides/data/displayingdata.md) guide explains how they all fit together.

### Enabling features

Please refer to the
[Enabling extra features](#Grid/guides/basics/features.md)
guide to learn how to enhance your Grid chart with additional functionality (such as displaying labels for the tasks).

### Responsiveness

Grid can be configured to work well on many different screen sizes. This is achieved by specifying different
responsive "levels" (breakpoints) on Grid and then having per level configurations on the columns. If this is a
concern now, visit the
[Responsive](#Grid/guides/customization/responsive.md)
guide to learn how to configure responsiveness.

### Localization

Bryntum Grid uses locales for translations of texts, date formats and such. This
[Localization](#Grid/guides/customization/localization.md)
guide shows you how to use one of the locales that Bryntum Grid ships with and how to create your own.



<p class="last-modified">Last modified on 2023-06-30 9:58:47</p>