// Using default look
new SlideToggle({
    appendTo : targetElement,
    text     : 'Off'
});

// Using default look
new SlideToggle({
    appendTo : targetElement,
    checked  : true,
    text     : 'On'
});

// Using blue color
new SlideToggle({
    appendTo : targetElement,
    color    : 'b-green',
    checked  : true,
    text     : 'Green'
});

// Using orange color, initially checked
new SlideToggle({
    appendTo : targetElement,
    color    : 'b-orange',
    checked  : true,
    text     : 'Orange (toggled)'
});

// Starting disabled
new SlideToggle({
    appendTo : targetElement,
    disabled : true,
    text     : 'Disabled'
});
