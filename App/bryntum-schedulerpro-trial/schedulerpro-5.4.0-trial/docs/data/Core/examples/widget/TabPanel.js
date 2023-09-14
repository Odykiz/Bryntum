new TabPanel({
    appendTo : targetElement,
    height   : '25em',
    items    : {
        main : {
            title : 'Tab with widgets',
            items : {
                forename : { type : 'text', label : 'First name', style : 'margin:2em 1em' },
                surname  : { type : 'text', label : 'Last name', style : 'margin:2em 1em' }
            }

        },
        secondary : {
            title : 'Tab with basic HTML',
            items : {
                infoWidget : {
                    type  : 'widget',
                    style : 'padding:1em',
                    html  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                }
            }
        },
        tertiary : {
            title    : 'Images',
            style    : 'gap:3em;padding:4em',
            defaults : {
                flex : 1,
                type : 'widget',
                tag  : 'img'
            },
            items : {
                gantt     : { elementAttributes : { src : 'https://bryntum.com/products/gantt/examples/calendars/meta/thumb.stockholm.png' } },
                scheduler : { elementAttributes : { src : 'https://bryntum.com/products/calendar/examples/resource-avatars/meta/thumb.classic-dark.png' } },
                kanban    : { elementAttributes : { src : 'https://bryntum.com/products/taskboard/examples/task-drag/meta/thumb.stockholm.png' } }
            }
        }
    }
});
