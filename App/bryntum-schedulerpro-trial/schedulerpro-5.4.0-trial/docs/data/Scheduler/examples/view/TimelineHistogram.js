const histogram = new TimelineHistogram({
    appendTo : targetElement,

    startDate : new Date(2023, 0, 1),
    endDate   : new Date(2023, 0, 6),

    autoHeight : true,

    columns : [{
        text  : 'Name',
        field : 'name'
    }],

    // define histogram value series
    series : {
        work : {
            // display work values as bars
            type : 'bar'
        },
        maxWork : {
            // display maxWork values as outline
            type : 'outline'
        }
    },

    // grid data
    store : new Store({
        data : [
            {
                name          : 'Mats',
                // the record histogram data
                histogramData : [
                    { work : 8, maxWork : 16 },
                    { work : 18, maxWork : 12 },
                    { work : 12, maxWork : 10 },
                    { work : 13, maxWork : 16 },
                    { work : 15, maxWork : 16 },
                    { work : 1, maxWork : 6 }
                ]
            },
            {
                name          : 'Johan',
                histogramData : [
                    { work : 15, maxWork : 16 },
                    { work : 8, maxWork : 26 },
                    { work : 12, maxWork : 6 },
                    { work : 13, maxWork : 16 },
                    { work : 18, maxWork : 16 },
                    { work : 8, maxWork : 16 }
                ]
            },
            {
                name          : 'Arcady',
                histogramData : [
                    { work : 15, maxWork : 16 },
                    { work : 18, maxWork : 9 },
                    { work : 8, maxWork : 11 },
                    { work : 12, maxWork : 16 },
                    { work : 13, maxWork : 16 },
                    { work : 10, maxWork : 5 }
                ]
            }
        ]
    })
});
