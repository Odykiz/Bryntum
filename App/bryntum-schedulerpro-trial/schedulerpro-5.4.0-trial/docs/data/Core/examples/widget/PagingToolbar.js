const
    rowCount = 250,
    pageSize = 25;

let data = [];

AjaxHelper.mockUrl('/pagedMockUrl', (url, params) => {
    const
        page     = parseInt(params.page, 10),
        pageSize = parseInt(params.pageSize, 10),
        startIdx = (page - 1) * pageSize;

    if (data.length !== rowCount) {
        data = DataGenerator.generateData(
            rowCount,
            null,
            1
        );
    }

    let returnedData = data.slice();

    // Filter the data if filter parameter is passed
    if (params.filter) {
        returnedData = returnedData.filter(
            CollectionFilter.generateFiltersFunction(
                JSON.parse(params.filter).map(f => {
                    f.property = f.field;
                    return new CollectionFilter(f);
                })
            )
        );
    }

    // Sort the data if sort parameter is passed
    if (params.sort) {
        returnedData.sort(store.createSorterFn(JSON.parse(params.sort)));
    }

    return {
        responseText : JSON.stringify({
            success : true,
            total   : returnedData.length,
            data    : returnedData.slice(startIdx, startIdx + pageSize)
        })
    };
});

const store = new AjaxStore({
    modelClass      : GridRowModel,
    readUrl         : '/pagedMockUrl',
    pageParamName   : 'page',
    sortParamName   : 'sort',
    filterParamName : 'filter',
    pageSize,
    autoLoad        : true
});

if (window.Grid) {
    const grid = new Grid({
        height   : '30em',
        appendTo : targetElement,
        columns  : [
            {
                text  : 'First name',
                field : 'firstName',
                flex  : 1
            },
            {
                text  : 'Surname',
                field : 'surName',
                flex  : 1
            },
            {
                text  : 'Rank',
                field : 'rank',
                flex  : 1,
                type  : 'number'
            },
            {
                text  : 'Percent',
                field : 'percent',
                width : 150,
                type  : 'percent'
            }
        ],

        store,

        bbar : {
            type  : 'pagingtoolbar',
            items : {
                click : {
                    type   : 'button',
                    text   : 'Click me',
                    weight : 175 // Add after last item
                }
            }
        }
    });
}
// Use a List in TaskBoard, it is not built on Grid
else {
    const panel = new Panel({
        height     : '30em',
        appendTo   : targetElement,
        scrollable : true,
        items      : [
            {
                type         : 'list',
                store,
                displayField : 'name'
            }
        ],
        bbar : {
            type  : 'pagingtoolbar',
            store,
            items : {
                click : {
                    type   : 'button',
                    text   : 'Click me',
                    weight : 175 // Add after last item
                }
            }
        }
    });
}
