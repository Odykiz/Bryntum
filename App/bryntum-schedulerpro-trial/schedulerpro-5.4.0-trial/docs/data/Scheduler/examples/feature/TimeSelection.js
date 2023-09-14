const scheduler = new Scheduler({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    features : {
        timeSelection : {
            headerRenderer({ timeRange }) {
                return `<span class="b-selection-start">${DateHelper.format(timeRange.startDate, 'LST')}</span>
                        <span class="b-selection-end">${DateHelper.format(timeRange.endDate, 'LST')}</span>
                        <i class='b-fa b-fa-close' data-ref="closeButton" data-btip="Close"></i>`;
            }
        }
    },
    viewPreset : 'hourAndDay',
    startDate  : new Date(2022, 4, 8, 8),
    endDate    : new Date(2022, 4, 8, 16),

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    resources : [
        { id : 1, name : 'Bernard' },
        { id : 2, name : 'Bianca' },
        { id : 3, name : 'Rolf' },
        { id : 4, name : 'Bengt' },
        { id : 5, name : 'Penny' }
    ],

    events : [
        { id : 1, resourceId : 1, name : 'Interview', startDate : '2022-05-08T09:00:00', endDate : '2022-05-08T10:00:00' },
        { id : 2, resourceId : 2, name : 'Meeting', startDate : '2022-05-08T13:00:00', endDate : '2022-05-08T15:00:00' },
        { id : 3, resourceId : 3, name : 'Future task', startDate : '2022-05-08T09:00:00', endDate : '2022-05-08T11:30:00' }
    ],

    bbar : [
        {
            ref  : 'selectionLabel',
            type : 'widget'
        }
    ],

    getAvailableResources(startDate, endDate) {
        return this.resourceStore.query(resource => this.isDateRangeAvailable(startDate, endDate, null, resource));
    },

    onTimeSelectionChange({ startDate, endDate }) {
        const availableResources = startDate ? this.getAvailableResources(startDate, endDate).length : this.resourceStore.count;

        this.widgetMap.selectionLabel.html = `${availableResources} resources available`;
    }
});

scheduler.features.timeSelection.selectedTimeSpan = {
    startDate : new Date(2022, 4, 8, 10),
    endDate   : new Date(2022, 4, 8, 13)
};
