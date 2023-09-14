# Displaying data in a Grid

Bryntum Grid uses a `Store` to hold and manage data in JSON format. The store in turn uses a `Model` for each row
(called record) it holds. The `Model` defines which fields the data contains. This guide is meant to give an overview of
how you work with stores and models.

## Creating a Grid with data

This sections describes the different options you have out of the box to create a grid with inline data or by loading
remote data using Ajax.

### Using inline data

If you have inline data, you can supply it directly when creating a grid:

<div class="framework-tabs">
<div data-name="js">

```javascript
const grid = new Grid({
    columns : [/*...*/],
    data : [
        { id : 1, name : 'Batman' },
        { id : 2, name : 'Wolverine' },
        /*...*/
    ] 
});
```

</div>
<div data-name="react">

```jsx
const App = props => {
    const [data, setData] = useState([
        { id : 1, name : 'Batman' },
        { id : 2, name : 'Wolverine' },
        ...
    ]);

    return <bryntum-grid data={data} />
}
```

</div>
<div data-name="vue">

```html
<bryntum-grid :data="data" />
```

```javascript
export default {
  setup() {
    return {
      data : reactive([
        { id : 1, name : 'Batman' },
        { id : 2, name : 'Wolverine' },
        ...
      ])
    };
  }
}
```

</div>
<div data-name="angular">

```html
<bryntum-grid [data]="data"></bryntum-grid>
```

```typescript
@Component()
export class AppComponent {
    data = [
        { id : 1, name : 'Batman' },
        { id : 2, name : 'Wolverine' },
        ...
    ]
}
```

</div>
</div>

This will create a store holding the data. The store can be accessed through the store property:

<div class="framework-tabs">
<div data-name="js">

```javascript
grid.store.sort('name');
```

</div>
<div data-name="react">

```javascript
grid.gridInstance.store.sort('name');
```

</div>
<div data-name="vue">

```javascript
grid.gridInstance.store.sort('name');
```

</div>
<div data-name="angular">

```typescript
grid.gridInstance.store.sort('name');
```

</div>
</div>

Another option if you need to configure the store is to supply a store config object (for info on available configs, see
API docs for [Store](#Core/data/Store#configs)):

<div class="framework-tabs">
<div data-name="js">

```javascript
const grid = new Grid({
    store : {
        sorters : [
            { field : 'name' }      
        ],
        data : [
            { id : 1, name : 'Batman' },
            ...
        ] 
    }
});
```

</div>
<div data-name="react">

```jsx
const App = props => {
    const [store, setStore] = useState({
        sorters : [
            { field : 'name' }      
        ],
        data : [
            { id : 1, name : 'Batman' },
            ...
        ] 
    });

    return <bryntum-grid store={store} />
}
```

</div>
<div data-name="vue">

```html
<bryntum-grid :store="store" />
```

```javascript
export default {
  setup() {
    return {
      store : reactive({
          sorters : [
              { field : 'name' }
          ],
          data : [
              { id : 1, name : 'Batman' },
              ...
          ]
      })
    };
  }
}
```

</div>
<div data-name="angular">

```html
<bryntum-grid [store]="store"></bryntum-grid>
```

```typescript
@Component()
export class AppComponent {
    store = {
        sorters : [
            { field : 'name' }      
        ],
        data : [
            { id : 1, name : 'Batman' },
            ...
        ] 
    }
}
```

</div>
</div>

A third option is to supply an already existing `Store` instance:

<div class="framework-tabs">
<div data-name="js">

```javascript
const store = new Store({
   someConfig : "...",
   data : [
       { id : 1, name : 'Batman' },
       /*...*/
   ]  
});

const grid = new Grid({
   store
});
```

</div>
<div data-name="react">

```jsx
const App = props => {
    const myStore = new Store({
       someConfig : "...",
       data : [
           { id : 1, name : 'Batman' },
           /*...*/
       ]
    });

    const [store, setStore] = useState(myStore);

    return <bryntum-grid store={store} />
}
```

</div>
<div data-name="vue">

```html
<bryntum-grid :store="store" />
```

```javascript
export default {
  setup() {
    const myStore = new Store({
       someConfig : "...",
       data : [
           { id : 1, name : 'Batman' },
           /*...*/
       ]
    });

    return {
      store : myStore
    };
  }
}
```

</div>
<div data-name="angular">

```html
<bryntum-grid [store]="store"></bryntum-grid>
```

```typescript
@Component()
export class AppComponent {
    store = new Store({
        sorters : [
            { field : 'name' }      
        ],
        data : [
            { id : 1, name : 'Batman' },
            ...
        ] 
    })
}
```

</div>
</div>


Inline data is expected to be an array of JavaScript objects. If no model/fields are defined for the store (more info
below) the properties of the first entry in the array are used as fields (`id` and `name` in the examples above).

### Using remote data

The base Store class only handles inline data. If you want to load remote data, use an `AjaxStore` in its place. As with
inline data you have different options on how to set it up. Either supply a store config containing a `readUrl`:

<div class="framework-tabs">
<div data-name="js">

```javascript
const grid = new Grid({
    store : {
        // When Grid finds readUrl in the store config it will create an AjaxStore
        readUrl : 'backend/load.php',
        // Load upon creation
        autoLoad : true 
    }
});
```

</div>
<div data-name="react">

```jsx
const App = props => {
    const [store, setStore] = useState({
        // When Grid finds readUrl in the store config it will create an AjaxStore
        readUrl : 'backend/load.php',
        // Load upon creation
        autoLoad : true 
    });

    return <bryntum-grid store={store} />
}
```

</div>
<div data-name="vue">

```html
<bryntum-grid :store="store" />
```

```javascript
export default {
  setup() {
    return {
      store : reactive({
         // When Grid finds readUrl in the store config it will create an AjaxStore
         readUrl : 'backend/load.php',
         // Load upon creation
         autoLoad : true
      })
    };
  }
}
```

</div>
<div data-name="angular">

```html
<bryntum-grid [store]="store"></bryntum-grid>
```

```typescript
@Component()
export class AppComponent {
    store = {
        // When Grid finds readUrl in the store config it will create an AjaxStore
        readUrl : 'backend/load.php',
        // Load upon creation
        autoLoad : true 
    }
}
```

</div>
</div>

Or create the store prior to creating the grid:

<div class="framework-tabs">
<div data-name="js">

```javascript
const store = new AjaxStore({
   readUrl : 'backend/load.aspx'
});

const grid = new Grid({
   store
});

store.load();
```

</div>
<div data-name="react">

```jsx
const App = props => {
    const myStore = new AjaxStore({
        readUrl : 'backend/load.aspx'
    });

    return <bryntum-grid store={myStore} />
}
```

</div>
<div data-name="vue">

```html
<bryntum-grid :store="store" />
```

```javascript
export default {
  setup() {
    const myStore = new AjaxStore({
        readUrl : 'backend/load.aspx'
    });

    return {
      store : myStore
    };
  }
}
```

</div>
<div data-name="angular">

```html
<bryntum-grid [store]="store"></bryntum-grid>
```

```typescript
@Component()
export class AppComponent {
    store = new AjaxStore({
        readUrl : 'backend/load.aspx'
    })
}
```

</div>
</div>

The data returned from the backend is expected to have the following format:

```json
{
    "success" : true,
    "data" : [  
        { "id" : 1, "name" : "Batman" },
        { "..." : "..." }
    ]
}
```

If `AjaxStore` does not suite your needs you can of course load data any custom way you want and then plug it into an 
inline store:

```javascript
const grid = new Grid({
    columns : [/*...*/]
});

// Using native fetch to load data
const response = await fetch('backend/load.php');
const data = await response.json();

// Maybe do some custom processing before plugging into grids store
data.forEach((row, index) => {
    row.index = index;
    row.someValue = Math.random();
    /*...*/
});

// Plug it in as inline data
grid.store.data = data;
```

## Model, field and record

As mentioned above, a store holds instances of a Model. Each instance is called a record (a row in the Grid). The Model,
among other things, specifies which fields the data contains.

### Autogenerated Model

If you do not specify any model, one will be created for you. The properties of the first record in your data will be
turned into fields:

```javascript
const store = new Store({
    data : [
        { name : 'Wolverine', powers : 'Regeneration' },
        { name : 'Deadpool', powers : 'Yes I have, great powers' }   
    ]
});
```

The code above will create a store with two records, based on a generated Model containing the two fields `name` and
`powers`.

<div class="note">Note that this approach is risky, if your backend for example uses a JSON serializer that optimizes
away null values, or your rows have varying fields, the model might end up with an incorrect set of fields. For all but
the very basic scenarios we recommend using a Custom Model (see below)</div>

### Custom Model

If you need more control over the fields a model contains, you have two options. If you do not need to reuse the Model
you can simply specify the fields when creating the store:

```javascript
const store = new Store({
    fields : ['name', 'powers', 'affiliation'],
    data : [
        { name : 'Wolverine', powers : 'Regeneration' },
        /*...*/
    ]
});
```

You can also create a subclass of `Model` and define the fields you need on it:

```javascript
class SuperHero extends Model {
    static fields = ['name', 'powers', 'affiliation' ]
}

const store = new Store({
    modelClass : SuperHero,
    data : [/*...*/]
}); 
```

See the API docs for [Model](#Core/data/Model) for more information on defining and mapping fields.

### Models are reactive!

Fields are turned into setters on the records, which makes them reactive. For example doing this ...

<div class="framework-tabs">
<div data-name="js">

```javascript
const grid = new Grid({
    data : [
        { name : 'Wolverine', powers : 'Regeneration' },
        { name : 'Deadpool', powers : 'Yes I have, great powers' }   
    ]
});

grid.store.first.name = 'Logan';
```

</div>
<div data-name="react">

```javascript
// Grid data: [{ name : 'Wolverine', powers : 'Regeneration' }]
grid.gridInstance.store.first.name = 'Logan';
```

</div>
<div data-name="vue">

```javascript
// Grid data: [{ name : 'Wolverine', powers : 'Regeneration' }]
grid.gridInstance.store.first.name = 'Logan';
```

</div>
<div data-name="angular">

```javascript
// Grid data: [{ name : 'Wolverine', powers : 'Regeneration' }]
grid.gridInstance.store.first.name = 'Logan';
```

</div>
</div>

... will update the grid on the fly to display `'Logan'` instead of `'Wolverine'`.


<p class="last-modified">Last modified on 2023-06-30 9:53:39</p>