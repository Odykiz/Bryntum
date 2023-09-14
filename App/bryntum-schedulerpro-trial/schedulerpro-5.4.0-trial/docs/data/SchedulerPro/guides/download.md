# Source and demos

## Distribution

### Trial distribution

Please visit [Download Free Trial](https://bryntum.com/download/?product=schedulerpro) page to request distribution zip with product
packages and demos for Bryntum Scheduler Pro.

### Licensed distribution

Licensed distribution zip with product packages, sources and demos for Bryntum Scheduler Pro can be downloaded from
[Bryntum Customer Zone](https://customerzone.bryntum.com/).

Bryntum Customer Zone contains nightly builds for Bryntum Scheduler Pro with the latest changes.

### Distribution archive

Distribution archive has the following folder structure:

| Folder       | Contents                                                                                                            |
|--------------|---------------------------------------------------------------------------------------------------------------------|
| `/build`     | Distribution folder, contains JS bundles, CSS themes, locales and fonts.                                            |
| `/docs`      | Documentation, open this in a browser (needs to be on a web server) to view guides & API docs.                      |
| `/examples`  | Demos, open this in a browser (needs to be on a web server)                                                         |
| `/lib`       | Source code, can be included in your ES6+ project using `import`.                                                   |
| `/resources` | SCSS files to build our themes or your own custom theme.                                                            |
| `/tests`     | Our complete test suite, including [Siesta Lite](https://bryntum.com/products/siesta/) to allow you to run them in a browser. |

## Bundles

The Bryntum Scheduler Pro distribution provides pre-build JavaScript bundles.
All bundles are transpiled with `chrome: 75` babel preset.

In distribution zip they are located under the **/build** folder.

| File                    | Contents                                                        |
|-------------------------|-----------------------------------------------------------------|
| `schedulerpro.module.js`     | Modules format bundle without WebComponents                     |
| `schedulerpro.lwc.module.js` | Modules format bundle with Lightning WebComponents (Salesforce) |
| `schedulerpro.wc.module.js`  | Modules format bundle with WebComponents                        |
| `schedulerpro.umd.js`        | UMD format bundle with WebComponents                            |

Bryntum Scheduler Pro also contains Non-UI bundles for usage with Node.JS.

| File                    | Contents                         |
|-------------------------|----------------------------------|
| `schedulerpro.node.cjs`      | Non-UI bundle in CommonJS format |
| `schedulerpro.node.mjs`      | Non-UI bundle in Modules format  |

Typings for TypeScripts can be found in files with a `.d.ts` file extension.

Minified bundles are available for Licensed product version and delivered with `.min.js` suffix.

## Themes

Distribution zip contains Bryntum Scheduler Pro themes which can be found in **/build** folder

| File                        | Contents            |
|-----------------------------|---------------------|
| `schedulerpro.classic-dark.css`  | Classic-Dark theme  |
| `schedulerpro.classic.css`       | Classic theme       |
| `schedulerpro.classic-light.css` | Classic-Light theme |
| `schedulerpro.material.css`      | Material theme      |
| `schedulerpro.stockholm.css`     | Stockholm theme     |

## JavaScript demos

All vanilla JavaScript demos for Bryntum Scheduler Pro are located in the **/examples** folder in the distribution zip.

We recommend unzipping the package and configuring your preferred webserver to serve the contents of the unzipped
folder. For example you may configure your webserver to serve the Bryntum Scheduler Pro folder as 
[http://localhost](http://localhost).

When this is done you can view the demos in your browser locally at 
[http://localhost/examples/](http://localhost/examples/).

## Framework demos

Framework demos are located in the **/examples/frameworks** folder.

| Framework            | Demo folder location          |
|----------------------|-------------------------------|
| Angular              | /examples/frameworks/angular/ |
| Ionic (with Angular) | /examples/frameworks/ionic/   |
| React                | /examples/frameworks/react/   |
| Vue 2.x              | /examples/frameworks/vue/     |
| Vue 3.x              | /examples/frameworks/vue-3/   |

We recommend unzip package and configure your preferred webserver to serve the contents of unzipped folder.
For example you may configure webserver to serve Bryntum Scheduler Pro folder as [http://localhost](http://localhost).
When this is done you will see demos in your local browser at this URL
[http://localhost/examples/frameworks/](http://localhost/examples/frameworks/).

<div class="note">

Before viewing a demo it requires building. Please check the <strong>README.md</strong> file in each demo's folder for instructions.

</div>



<p class="last-modified">Last modified on 2023-06-30 10:22:39</p>