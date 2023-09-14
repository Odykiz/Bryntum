const startDate = new Date(new Date().setDate(15));
while (startDate.getDay() !== 3) {
    startDate.setDate(startDate.getDate() - 1);
}
const endDate = new Date(startDate);
endDate.setDate(endDate.getDate() + 7);

const picker = new DatePicker({
    appendTo  : targetElement,
    width     : '24em',
    selection : [
        startDate,
        endDate
    ],
    multiSelect : 'range',
    bbar        : {
        items : {
            toggleMultiSelect : {
                type        : 'buttongroup',
                toggleGroup : true,
                items       : {
                    multi : {
                        text : 'Multi range'
                    },
                    single : {
                        text    : 'Single range',
                        pressed : true
                    }
                },
                onToggle({ source, pressed }) {
                    if (pressed) {
                        picker.multiSelect = source.ref === 'multi' ? true : 'range';

                        // Cut down range if we switch to a single range
                        if (picker.multiSelect === 'range') {
                            picker.selection.length && (picker.selection = picker.activeDate);
                        }
                    }
                }
            }
        }
    },
    onSelectionChange : ({ source, selection }) => {
        if (source.multiSelect === 'range') {
            Toast.show(`Date range ${DateHelper.format(selection[0], 'MMM DD')} to ${DateHelper.format(selection[1], 'MMM DD')}`);
        }
        else {
            Toast.show(`${selection.length} dates selected`);
        }
    }
});
