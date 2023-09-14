# Loading using `<script>`

## Include script and CSS

To include Bryntum SchedulerPro on your page using a plain old script tag, just include a tag like the following before
including any script that uses the schedulerpro:

```html
<script type = "text/javascript" src = "path-to-scheduler-pro/schedulerpro.umd.js"></script>
```

Also include the CSS for the theme you want to use:

```html
<link rel = "stylesheet" type = "text/css" href = "path-to-scheduler-pro/schedulerpro.[theme].css" data-bryntum-theme>
```

## Use it in your code

From your scripts you can access our classes in the global bryntum namespace:

```javascript
var schedulerPro = new bryntum.schedulerpro.SchedulerPro();
```



<p class="last-modified">Last modified on 2023-06-30 10:22:39</p>