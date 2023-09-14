# Tutorial
When you have followed the steps in this tutorial you will have the following grid up and running:

<div class="external-example" data-file="Grid/guides/tutorial/result.js"></div>

## 1. Index.html with scripts and theme
In this first step we are going to create a basic index.html file with what we need to get started. Please add the
following:

```html
<html>
<head>
    <!-- Theme for the grid must be included -->
    <link rel="stylesheet" href="build/grid.material.css" data-bryntum-theme>
</head>
<body>
    <div id="target"></div>
    <!--
        Script file which we will create in the next step
        Added to end of body to keep code simple while being
        sure that page is ready
    -->
    <script type="module" src="app.js"></script>
</body>
</html>
```

## 2. Add an empty grid
We are going to add the grid in a separate script file, called app.js as declared in step 1. Add the following code to
it to get an empty grid:

```javascript
import { Grid } from 'grid.module.js';

const grid = new Grid({
    appendTo: 'target'
});
```

When creating a new Grid you supply a config object (a normal JavaScript object) with the settings you want to use for
the grid. The code above contains a single such setting, `appendTo`, which tells the grid to which element on page it
should render itself. As the name suggests it will be appended to that element, it will not overwrite the contents of
the element.

If you where to test the code at this point, it would run but you would not see much.
We need to populate the grid with columns and data.

## 3. Add columns
Columns are initially added as part of the config object we used above, in a property called `columns`. For example to
add a single column showing names:

```javascript
const grid = new Grid({
    // Code from the previous steps omitted for brevity
    // ...

    columns: [
        { field: 'name', text: 'Name' }
    ]
});
```

The `columns` property takes an array of column configs. In this case we have specified a single column which will get
its data from a field in a data record (row) called 'name' and will display the text 'Name' in its header.

## 4. Add some data
The grid consumes data in JSON format. In this tutorial we will for simplicity plug the data directly into the grid:

```javascript
const grid = new bryntum.grid.Grid({
    // Code from the previous steps omitted for brevity
    // ...
    
    data: [
        { name: 'Dan Stevenson' }
    ]
});
```

Now we have a basic, although quite empty, grid up and running:

<div class="external-example" data-file="Grid/guides/tutorial/step4.js"></div>

## 5. More data
In this step we add some more columns and more data. It is strongly recommended that you have a unique id field in
your data, especially if you are going to save any changes. If no id is supplied the grid will assign a generated id
to each row. Grid with some more data (and ids):

```javascript
const grid = new bryntum.grid.Grid({
    // Code from the previous steps omitted for brevity
    // ...

    data: [
        { id : 1, name : 'Dan Stevenson', city : 'Los Angeles', age : 24 },
        { id : 2, name : 'Talisha Babin', city : 'Paris', age : 27 },
        { id : 3, name : 'Maxim Gagarin', city : 'Moscow', age : 34 },
        { id : 4, name : 'Linda Johansson', city : 'Stockholm', age : 29 }
    ]
});
```

## 6. More columns
Now we have a grid with a single column and 4 rows. Lets add some more columns. The grid supports predefined column
types, such as NumberColumn and RatingColumn. To use a predefined type, specify `type` in the column config. You can
also specify a fixed width (called `width`) or a flex number (`flex`) Columns with flex share the available space after
subtracting fixed widths. The flex number determines how large part of that space the column occupies (CSS FlexBox).

```javascript
const grid = new bryntum.grid.Grid({
    // Code from the previous steps omitted for brevity
    // ...

    columns: [
        { field : 'name', text : 'Name', flex : 1 },
        { field : 'city', text : 'City', flex : 1 },
        { type  : 'number', field : 'age', text : 'Age', flex : 1 }
    ]
});
```

Since all the columns in the code above have flex 1 they will have equal width. The third column (age) has a type
specified, it is a NumberColumn. Column types affect how data is displayed and edited. Current result:

<div class="external-example" data-file="Grid/guides/tutorial/step6.js"></div>

## 7. A custom renderer
Only one step left now, to affect how data is displayed. This can be achieved using a renderer function, which is
defined on a column in the column's config. This function will be called when the cells contents are rendered to
screen, and it can be used to manipulate styling and contents. Modify the age column to look like this:

```javascript
{
    type       : 'number',
    field      : 'age',
    text       : 'Age',
    flex       : 1,
    htmlEncode : false,
    renderer({ value }) {
        if (value > 30) {
            return `<span style="color: red; font-weight: bold">${value}</span>`
        }
        return value;
    }
}
```

The renderer function gets called with a single object as parameter, in this case we chose to only use `value` (text to
display). The renderer does in this case return html, and to have that to be actual html and not text we have also
specified `htmlEncode: false` on the column.

<div class="external-example" data-file="Grid/guides/tutorial/result2.js"></div>

## 7. Reacting to events

Grid, its features and its store fire a number of events that you can listen to, for example Grid fires `cellClick` when 
clicking a cell, the `store` fires `add` when a new record is added, etc. See the API docs for each class for all events 
(Grid's events are for example [listed here](#Grid/view/Grid#events)).

To catch an event, you can either specify declarative `listeners` in the config, or add them programmatically using the
`on` method. In this step we will add a declarative listener for the `cellClick` event, and a programmatic listener for
the `beforeColumnDragStart` event.

```javascript
const grid = new Grid({
    // Code from the previous steps omitted for brevity
    // ...

    // Declarative listener
    listeners : {
        cellClick({ record, column }) {
            Toast.show(`Clicked ${record[column.field]}`);
        }
    }
});

// Programmatic listener
grid.on('beforeColumnDragStart', ({ column }) => {
    Toast.show(`Dragging ${column.text}`);
});
```

<div class="external-example" data-file="Grid/guides/tutorial/events.js"></div>

Done!


<p class="last-modified">Last modified on 2023-06-30 9:53:39</p>