<h1 class="title-with-image"><img src="Core/logo/nodejs.svg" alt="Bryntum Scheduler Pro supports Node.js"/>
Using Bryntum Scheduler Pro with Node.js</h1>

## Node.js bundles

The Bryntum Scheduler Pro UI component has a lot of DOM references that naturally don't exist in the Node.js environment. To
be able to use Bryntum Scheduler Pro with Node.js we offer compatible Modules and CommonJS bundles that includes
[ProjectModel](#Scheduler/model/ProjectModel) and other required classes but no UI.

The bundles listed below can be found in the **build** folder in the distribution zip or as part of the
[**@bryntum/schedulerpro**](#SchedulerPro/guides/npm-repository.md) NPM package.

| _Bundle_             | Description                       |
|----------------------|-----------------------------------|
| **schedulerpro.node.cjs** | Node.js bundle in CommonJS format |
| **schedulerpro.node.mjs** | Node.js bundle in Modules format  |

<div class="note">

Node bundles are available for licensed Bryntum Scheduler Pro version only

</div>

## CommonJS bundle example

Code example for using `ProjectModel` in CommonJS code with `schedulerpro.node.cjs` from
[**@bryntum/schedulerpro**](#SchedulerPro/guides/npm-repository.md).

If you want to use bundle from the distribution zip then replace `@bryntum/schedulerpro` with path to the bundle.

```js
const { ProjectModel } = require('@bryntum/schedulerpro/schedulerpro.node.cjs'); 
new ProjectModel({
    // ProjectModel config
});
```

## Modules bundle example

Code example for using `ProjectModel` in Modules code with `schedulerpro.node.mjs` from
[**@bryntum/schedulerpro**](#SchedulerPro/guides/npm-repository.md).

If you want to use bundle from the distribution zip then replace `@bryntum/schedulerpro` with path to the bundle.

```js
import { ProjectModel } from '@bryntum/schedulerpro/schedulerpro.node.mjs'; 
new ProjectModel({
    // ProjectModel config
});
```


<p class="last-modified">Last modified on 2023-06-30 10:22:39</p>