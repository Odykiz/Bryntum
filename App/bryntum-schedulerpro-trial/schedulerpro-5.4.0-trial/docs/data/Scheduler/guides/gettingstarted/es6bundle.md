# Loading using EcmaScript module bundle

## Include CSS

Include the CSS for the theme you want to use on page:

```html
<link rel = "stylesheet" type = "text/css" href = "path-to-scheduler/scheduler.[theme].css" data-bryntum-theme>
```

## Import from the module bundle

In your application code, import the classes you need from the bundle:

```javascript
import { Scheduler } from '../build/scheduler.module.js';
```

And then use them:

```javascript
const scheduler = new Scheduler({
    /* Scheduler configuration options */
})
```

For a complete example, check out the <a href="../examples/esmodule/" target="_blank">EcmaScript module example</a>.

## Troubleshooting

If you get a `The Bryntum Scheduler bundle was loaded multiple times by the application` error, it means that
the browser has imported the bundle more than once, but as different modules. 

The way the browser determines whether it is the same module or not is by comparing the URL of the module. If the URL is 
different, the browser will treat the module as a different one. This can lead to unexpected and hard to debug side
effects, so when we detect it happening we throw an error.

Common causes of getting this error are:

1. Imports from different types of the bundle (e.g. *.module.js and *.umd.js)

   **Not ok**

   ```javascript
   // File src/A.js
   import { Button } from 'scheduler.module.js';
   // File src/B.js
   import { TextField } from 'scheduler.umd.js';
   ```

   Make sure you use either `module` or `umd` (most likely `module`, `umd` is for legacy applications) consistently.

   **Ok**

   ```javascript
   // File src/A.js
   import { Button } from 'scheduler.module.js';
   // File src/B.js
   import { TextField } from 'scheduler.module.js';
   ```

2. Import do not use the shortest relative path to the bundle

   **Not ok**

   ```javascript
   // File src/A.js
   import { Button } from 'scheduler.module.js';
   // File src/B.js
   import { Button } from '../src/scheduler.module.js';
   ```

   Make sure a relative path never leads out of a folder and then back in again.

   **Ok**

   ```javascript
   // File src/A.js
   import { Button } from 'scheduler.module.js';
   // File src/B.js
   import { Button } from 'scheduler.module.js';
   ```

3. Imports missing file type, some web servers still serve files without file type (does not apply for some frameworks, 
   or when importing from the main module of a node package)

   **Not ok**

   ```javascript
   // File src/A.js
   import { Button } from 'scheduler.module.js';
   // File src/B.js
   import { TextField } from 'scheduler.module';
   ```

   Make sure all imports end with `.js`.

   **Ok**

   ```javascript
   // File src/A.js
   import { Button } from 'scheduler.module.js';
   // File src/B.js
   import { Button } from 'scheduler.module.js';
   ```

4. Cache busters that differs between imports

   **Not ok**

   ```javascript
   // File src/A.js
   import { Button } from 'scheduler.module.js?6781';
   // File src/B.js
   import { Button } from 'scheduler.module.js?9463';
   ```

   Make sure all imports use the same cache buster.

   **Ok**

   ```javascript
   // File src/A.js
   import { Button } from 'scheduler.module.js?6781';
   // File src/B.js
   import { Button } from 'scheduler.module.js?6781';
   ```

5. Imports from both Bryntum sources and bundle

   **Not ok**

   ```javascript
   // File src/A.js
   import Button from 'lib/Core/widget/Button.js';
   // File src/B.js
   import { TextField } from 'scheduler.module.js';
   ```

   Make sure you either import only from sources, or only from the bundle.

   **Ok**

   ```javascript
    // File src/A.js
   import Button from 'lib/Core/widget/Button.js';
   // File src/B.js
   import Button from 'lib/Core/widget/Button.js';
   ```


<p class="last-modified">Last modified on 2023-06-30 10:09:06</p>