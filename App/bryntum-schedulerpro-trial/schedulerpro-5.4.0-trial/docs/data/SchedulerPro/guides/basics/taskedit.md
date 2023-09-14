# Customizing the task editor

Bryntum Scheduler Pro ships with a built in [TaskEditor](#SchedulerPro/widget/SchedulerTaskEditor),
double-click the task in the demo below to see it in action:

<div class="external-example" data-file="SchedulerPro/guides/taskedit/basic.js"></div>

The editor can be customized, turned off or replaced with your own editor.

## Turning the editor off entirely

The task editor is supplied by a feature called [TaskEdit](#SchedulerPro/feature/TaskEdit), which is enabled by default.
To turn it off, configure the feature with `false`:

```javascript
const scheduler = new SchedulerPro({
    features : {
        taskEdit : false
    }
});
```

## Enabling or disabling the editor

You can also enable or disable the editor programmatically, perhaps as a response to a login:

```javascript
const scheduler = new SchedulerPro({
    features : {
        taskEdit : {
            // Start disabled
            disabled : true
        }
    }
});

// To enable
scheduler.features.taskEdit.disabled = false;

// To disable again
scheduler.features.taskEdit.disabled = true;
```

Try it in the demo below:

<div class="external-example" data-file="SchedulerPro/guides/taskedit/disable.js"></div>

## Customizing the tabs and the fields

The Task editor contains tabs by default. Each tab is a container with built in widgets: text fields, grids, etc.
Existing tabs can be changed or removed and new tabs can be added, as well as existing fields in the tabs can be changed
or removed and new fields can be added. This is handled using the [`items`](#SchedulerPro/feature/TaskEdit#config-items)
config of the feature.

### Default tabs and fields

Here is the list of the built in tabs

| Tab ref           | Text         | Weight | Description                                                                          |
|-------------------|--------------|--------|--------------------------------------------------------------------------------------|
| `generalTab`      | General      | 100    | Shows basic configuration: name, resources, start/end dates, duration, percent done. |
| `predecessorsTab` | Predecessors | 200    | Shows a grid with incoming dependencies                                              |
| `successorsTab`   | Successors   | 300    | Shows a grid with outgoing dependencies                                              |
| `advancedTab`     | Advanced     | 500    | Shows advanced configuration: constraints and manual scheduling mode                 |
| `notesTab`        | Notes        | 600    | Shows a text area to add notes to the selected task                                  |

### General tab

General tab contains fields for basic configurations

| Field ref          | Type          | Text       | Weight | Description                                           |
|--------------------|---------------|------------|--------|-------------------------------------------------------|
| `nameField`        | TextField     | Name       | 100    | Task name                                             |
| `resourcesField`   | Combo         | Resources  | 200    | Shows a list of available resources for this task     |
| `startDateField`   | DateTimeField | Start      | 300    | Shows when the task begins                            |
| `endDateField`     | DateTimeField | Finish     | 400    | Shows when the task ends                              |
| `durationField`    | NumberField   | Duration   | 500    | Shows how long the task is                            |
| `percentDoneField` | NumberField   | % Complete | 600    | Shows what part of task is done already in percentage |

### Predecessors tab

Predecessors tab contains a grid with incoming dependencies and controls to remove/add dependencies

| Widget ref | Type    | Weight | Description                                                                                      |
|------------|---------|--------|--------------------------------------------------------------------------------------------------|
| `grid`     | Grid    | 100    | Shows predecessors task name, dependency type and lag                                            |
| `toolbar`  | Toolbar | 200    | Shows control buttons                                                                            |
| \>`add`    | Button  | 210    | Adds a new dummy predecessor. Then need to select a task from the list in the name column editor |
| \>`remove` | Button  | 220    | Removes selected incoming dependency                                                             |

\> - nested items

### Successors tab

Successors tab contains a grid with outgoing dependencies and controls to remove/add dependencies

| Widget ref | Type    | Weight | Description                                                                                    |
|------------|---------|--------|------------------------------------------------------------------------------------------------|
| `grid`     | Grid    | 100    | Shows successors task name, dependency type and lag                                            |
| `toolbar`  | Toolbar | 200    | Shows control buttons                                                                          |
| \>`add`    | Button  | 210    | Adds a new dummy successor. Then need to select a task from the list in the name column editor |
| \>`remove` | Button  | 220    | Removes selected outgoing dependency                                                           |

\> - nested items

### Advanced tab

Advanced tab contains additional task scheduling options

| Field ref                | Type      | Weight | Description                                                                             |
|--------------------------|-----------|--------|-----------------------------------------------------------------------------------------|
| `calendarField`          | Combo     | 100    | Shows a list of available calendars for this task. Shown when calendars are downloaded. |
| `constraintTypeField`    | Combo     | 200    | Shows a list of available constraints for this task                                     |
| `constraintDateField`    | DateField | 300    | Shows a date for the selected constraint type                                           |
| `manuallyScheduledField` | Checkbox  | 400    | If checked, the task is not considered in scheduling                                    |

### Notes tab

Notes tab contains a text area to show notes

| Field ref   | Type          | Weight | Description                                     |
|-------------|---------------|--------|-------------------------------------------------|
| `noteField` | TextAreaField | 100    | Shows a text area to add text notes to the task |

### Removing default tabs and fields

To remove a built in tab or field, specify its `ref` as `false` in the `items` config:

```javascript
const scheduler = new SchedulerPro({
    features : {
        taskEdit : {
            items : {
                generalTab      : {
                    items : {
                        // Remove "Duration" and "% Complete" fields in the "General" tab
                        durationField    : false,
                        percentDoneField : false
                    }
                },
                // Remove all tabs except the "General" tab
                notesTab        : false,
                predecessorsTab : false,
                successorsTab   : false,
                advancedTab     : false
            }
        }
    }
})
```

This demo has "Duration" and "% Complete" fields removed in the "General" tab, as well as
"Predecessors", "Successors", "Advanced", and "Notes" tabs removed:

<div class="external-example" data-file="SchedulerPro/guides/taskedit/remove.js"></div>

### Customize default tabs and fields

To customize a built in tab or field, use its `ref` as the key in the `items` config and specify the configs you want
to change (they will be merged with the tabs or fields default configs correspondingly).

The order of the default fields is determined by a `weight`. The higher the `weight`, the further down they are
displayed. See the tables above for the default weights.

For example to change the label of the `percentDone` and rename "General" tab:

```javascript
const scheduler = new SchedulerPro({
    features : {
        taskEdit : {
            items : {
                generalTab      : {
                    // Rename "General" tab
                    title : 'Main',
                    items : {
                        // Rename "% Complete" field to "Status"
                        percentDoneField : {
                            label : 'Status'
                        }
                    }
                }
            }
        }
    }
})
```

Try it out in this demo:

<div class="external-example" data-file="SchedulerPro/guides/taskedit/label.js"></div>

### Add custom tabs and fields

Custom fields are added in the same way as you used to customize the built in ones, add new properties to the `items`
config of the feature to add new tabs. Add new properties to the `items` config of the tab to add new fields.
The key you choose to use for your tabs and fields will be used as its `ref`, through
which it can be accessed later.

Here we add a custom field to "General" tab and create a custom tab with a field that shows the task name:

```javascript
const scheduler = new SchedulerPro({
    features : {
        taskEdit : {
            items : {
                generalTab : {
                    items : {
                        // Add new field to the last position
                        newGeneralField : {
                            type   : 'textfield',
                            weight : 610,
                            label  : 'New field in General Tab',
                            // Name of the field matches data field name, so value is loaded/saved automatically
                            name   : 'custom'
                        }
                    }
                },
                // Add a custom tab to the first position
                newTab     : {
                    // Tab is a FormTab by default
                    title  : 'New tab',
                    weight : 90,
                    items  : {
                        newTabField : {
                            type   : 'textfield',
                            weight : 10,
                            label  : 'New field in New Tab',
                            // Name of the field matches data field name, so value is loaded/saved automatically.
                            // In this case it is equal to the Task "name" field.
                            name   : 'name'
                        }
                    }
                }
            }
        }
    }
})
```

Try the custom tab here:

<div class="external-example" data-file="SchedulerPro/guides/taskedit/tab.js"></div>

## Replacing the Task editor

The easiest way to show a custom editor is to leave the built-in editor enabled, listen for when it is about to open,
prevent that and show your own instead. Using this approach, you will catch the different paths leading to the editor
being shown without having to address them one by one (double-click, enter, drag create etc.).

Here is a simple implementation of the Task editor using our basic Popup component with a TextField and a Button inside.
We set the task name to the text field and write it back to the record on the button click:

```javascript
const scheduler = new SchedulerPro({
    listeners : {
        beforeTaskEdit({ taskRecord, taskElement }) {
            // Show custom editor here!
            const editor = WidgetHelper.openPopup(taskElement, {
                closeAction : 'destroy',
                items       : {
                    name : {
                        type  : 'textfield',
                        label : 'Name',
                        value : taskRecord.name
                    },
                    save : {
                        type    : 'button',
                        text    : 'Save',
                        color   : 'b-green',
                        onClick : () => {
                            taskRecord.name = editor.widgetMap.name.value;
                            editor.close();
                        }
                    }
                }
            });

            // Prevent built in editor
            return false;
        }
    }
})
```

This custom task editor is shown in action here:

<div class="external-example" data-file="SchedulerPro/guides/taskedit/replace.js"></div>

## Update custom fields state and data

Task Editor uses [items](#SchedulerPro/feature/TaskEdit#config-items) configuration only once during first initialization. If you need to refresh data in `Combo` or hide/show `Field` depending on your business logic when editor is shown, use [beforeTaskEditShow](#SchedulerPro/feature/TaskEdit#event-beforeTaskEditShow) event:

```javascript
const scheduler = new SchedulerPro({
    features : {
        taskEdit : {
            items : {
                equipment : {
                    // custom field configuration
                },
                volume : {
                    // custom field configuration
                }
            }
        }
    },
    listeners : {
        beforeTaskEditShow({ editor, taskRecord }) {
            const
                equipmentCombo = editor.widgetMap.equipment,
                volumeField = editor.widgetMap.volume;

            // update data in combo list
            equipmentCombo.items = this.equipmentStore.getRange();
            // update field visibility state
            volumeField.hidden = !taskRecord.hasVolume;
        }
    }
});
```


<p class="last-modified">Last modified on 2023-06-30 9:53:56</p>