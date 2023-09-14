const menu = new Menu({
    anchor   : true,
    autoShow : false,
    items    : [
        {
            text      : 'Color',
            icon      : 'b-fa b-fa-palette',
            separator : true,
            menu      : {
                colorMenu : {
                    type : 'eventcolorpicker'
                }
            }
        }
    ]
});

new Button({
    appendTo : targetElement,
    cls      : 'b-raised',
    text     : 'Show menu',
    menu
});
