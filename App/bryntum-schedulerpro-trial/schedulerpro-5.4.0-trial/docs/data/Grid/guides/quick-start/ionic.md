# Getting Started with Bryntum Grid in Ionic

## Try Ionic demos

Bryntum Grid is delivered with a variety of Ionic demo applications showing its functionality.
All demo applications have been verified to be compatible with Node 16.

<div class="b-card-group-2">
<a href="https://bryntum.com/products/grid/examples/#Integration" class="b-card"><i class="fas b-fa-globe"></i>View online Ionic demos</a>
<a href="#Grid/guides/integration/ionic/guide.md#build-and-run-local-demos" class="b-card"><i class="b-logo b-ionic"></i>Build and run Ionic demos</a>
</div>

## Create Ionic application

To get started, the broad steps are as follows:

1. [Access to npm registry](##access-to-npm-registry)
2. [Create Application](##create-application)
3. [Install component](##install-component)
4. [Add component to Application](##add-component-to-application)
5. [Apply styles](##apply-styles)
6. [Run Application](##run-application)

The application we are about to build together is pretty simple, and will look like the illustration below:

<img src="Grid/getting-started-result.png" class="b-screenshot" alt="Getting Started on Bryntum Grid with Ionic Result">

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

For more information, visit our [Npm Repository Guide](#Grid/guides/npm-repository.md).

## Create Application

Similarly to all the examples shipped with the distribution, we will be using [Ionic CLI](https://cli.angular.io/) to
build Ionic applications.

Type the following command to install Ionic CLI:

```shell
$ npm install -g @ionic/cli
```

We will then create a basic application with Ionic CLI:

```shell
$ ionic start IonicApp blank --type=angular
```

Here we are using `blank`, the most simple starter template for the app.

Ionic can use Angular, React, or Vue. By `choosing --type=angular`, we tell Ionic CLI to generate an application using
Angular.

Feel free to select other defaults if needed following instruction provided in
the [Ionic Framework Documentation](https://ionicframework.com)

<div class="note">

Please feel free to change <code>IonicApp</code> to your preferred application name

</div>

You can then move to your application folder

```shell
$ cd IonicApp
```

## Install component

From your terminal, update project dependencies using the following commands:

<div class="docs-tabs" data-name="licensed">
<div>
    <a>Trial version</a>
    <a>Licensed version</a>
</div>
<div>

```shell
$ npm install @bryntum/grid@npm:@bryntum/grid-trial@5.4.0 
$ npm install @bryntum/grid-angular@5.4.0
```

</div>
<div>

```shell
$ npm install @bryntum/grid@5.4.0 
$ npm install @bryntum/grid-angular@5.4.0
```
</div>
</div>

## Add component to Application

Edit the **src/app/home/home.module.ts** file and add the following:

```typescript
import { BryntumGridModule } from '@bryntum/grid-angular';

@NgModule({
    imports : [
        BryntumGridModule
    ]
})
```

Then, edit the **src/app/home/home.page.ts** file and replace the content with the following:

```typescript
import { Component, ViewChild } from '@angular/core';
import { BryntumGridComponent } from '@bryntum/grid-angular';
import { gridConfig } from './home.config';

@Component({
    selector    : 'app-home',
    templateUrl : 'home.page.html',
    styleUrls   : ['home.page.scss']
})
export class HomePage {

    constructor() {}

    data = [
        { name : 'Dan Stevenson', city : 'Los Angeles' },
        { name : 'Talisha Babin', city : 'Paris' }
    ];

    gridConfig = gridConfig;

    @ViewChild('grid') gridComponent!: BryntumGridComponent;
}
```

**Create** a **src/app/home/home.config.ts** file with the following content:

```typescript
import { GridConfig } from '@bryntum/grid';

export const gridConfig: Partial<GridConfig> = {
    columns : [
        { field : 'name', text : 'Name', width : 200 },
        { field : 'city', text : 'City', flex : 1 }
    ]
};
```

And finally, edit the **src/app/home/home.page.html** file and replace the content with the following:

```html
<ion-content [fullscreen] = "true">
  <div id = "container">
    <bryntum-grid
        #grid
        [data] = "data"
        [columns] = "gridConfig.columns"
    ></bryntum-grid>
  </div>
</ion-content>
```

## Apply styles

### Stylesheet

A theme is required to render the Bryntum Grid correctly.

The following CSS files are provided with the Bryntum npm packages or in the `/build` folder of the distribution:

| File                        | Contents            |
|-----------------------------|---------------------|
| `grid.classic-dark.css`  | Classic-Dark theme  |
| `grid.classic.css`       | Classic theme       |
| `grid.classic-light.css` | Classic-Light theme |
| `grid.material.css`      | Material theme      |
| `grid.stockholm.css`     | Stockholm theme     |

You'll need to reference the selected CSS file into your project.

Edit the **src/global.scss** and **add** the following:

```scss
@import "~@bryntum/grid/grid.stockholm.css";
```

### Sizing the component

By Default, the Component is configured to take `100%` of the parent DOM element with a min-height of `10em`.

For your application to show the Component with the appropriate size, you can for example make parent components take
the full height of the screen.

In your **src/app/home/home.page.scss** file, **add** the following:

```scss
#container {
    height : 100vh;
}
```

There are many other solutions depending on the situation. Feel free to adapt the code above regarding your application
layout. For more information on the topic, see this guide
[Sizing the component](https://bryntum.com/products/grid/docs/guide/Grid/basics/sizing).

## Run Application

From your terminal:

```shell
$ ionic serve
```

Your application is now available under [http://localhost:8100](http://localhost:8100), and your browser should
automatically open it for you.

## Troubleshooting

Please refer to this [Troubleshooting guide](#Grid/guides/integration/ionic/troubleshooting.md).

## What to do next?

### Further on integration with Ionic

Do you want to know more about how Bryntum Grid integrates with Ionic and starts to customize your application? We
provide you with a [complete Ionic guide here](#Grid/guides/integration/ionic/guide.md).

### Learn about Data

Bryntum components often use multiple collections and entities.

The [Data guide](#Grid/guides/data/displayingdata.md) guide explains how they all fit together.



<p class="last-modified">Last modified on 2023-06-30 9:58:47</p>