const toolbar = new Toolbar({
    appendTo : targetElement,
    height   : '4em',
    items    : {
        button1 : { text : 'A button', icon : 'b-fa b-fa-plus' },
        button2 : { text : 'Right button 1', icon : 'b-fa b-fa-trash', style : 'margin-left:auto' },
        button3 : { icon : 'b-fa b-fa-gear' }
    }
});
