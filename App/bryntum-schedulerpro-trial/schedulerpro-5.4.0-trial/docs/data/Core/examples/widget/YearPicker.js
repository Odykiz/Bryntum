const picker = new YearPicker({
    appendTo : targetElement,
    tbar     : {
        items : {
            // Move the title to the centre
            title : {
                weight : 250
            }
        }
    },
    width    : '24em',
    onChange : ({ value }) => {
        Toast.show(`You picked ${value}`);
    }
});
