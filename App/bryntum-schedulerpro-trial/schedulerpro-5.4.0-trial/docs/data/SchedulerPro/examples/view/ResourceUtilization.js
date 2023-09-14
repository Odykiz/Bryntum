const resourceUtilization = new ResourceUtilization({
    project : {
        transport : {
            load : {
                url : 'data/SchedulerPro/examples/view/ResourceUtilization.json'
            }
        },
        autoLoad : true
    },
    columns : [
        { type : 'tree', text : 'Name', field : 'name', width : 150 }
    ],
    startDate  : new Date(2020, 3, 26),
    endDate    : new Date(2020, 4, 15),
    appendTo   : targetElement,
    rowHeight  : 40,
    tickSize   : 40,
    minHeight  : '20em',
    // display tooltip
    showBarTip : true
});
