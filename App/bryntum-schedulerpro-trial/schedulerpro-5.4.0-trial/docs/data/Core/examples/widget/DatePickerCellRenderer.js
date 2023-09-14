CSSHelper.insertRule('#datePickerRenderer .b-calendar-cell .b-datepicker-cell-inner { padding:1.2em; line-height: 1.4;}');
CSSHelper.insertRule('.price { font-size: 0.6em;}');
CSSHelper.insertRule('.b-calendar-cell:not(.b-active-date) .price { opacity:0.65; }');

const prices = [
        110, 80, 0, 70, 120, 80, 90,
        90, 110, 80, 0, 0, 120, 80, 90,
        90, 130, 60, 0, 70, 80, 90
    ],
    picker = new DatePicker({
        id       : 'datePickerRenderer',
        appendTo : targetElement,
        width    : '24em',
        date     : new Date(),

        cellRenderer({ cell, date }) {
            const
                sameMonth = date.getMonth() === this.date.getMonth(),
                price     = prices[date.getDate()];

            cell.innerHTML += `<span class="price">${sameMonth && price ? ('$' + price) : '&nbsp;'}</span>`;

            if (sameMonth) {
                cell.dataset.btip = price ? `Flights available from: <strong>$${price}</strong>` : 'No flights available';
            }
        },

        onSelectionChange : ({ selection }) => {
            Toast.show(`You picked ${DateHelper.format(selection[0], 'MMM DD')}`);
        }
    });
