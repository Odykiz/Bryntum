import { BryntumScheduler } from '@bryntum/scheduler-react';
import { Toast } from '@bryntum/scheduler';
import { useCallback, useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
    const schedulerRef = useRef();

    const [crudManagerConfig] = useState({
        loadUrl  : 'data/data.json',
        autoLoad : true,
        listeners : {
            // Bryntum API listener for the `hasChanges` event, triggered when any store
            // handled by the crud manager has changes
            hasChanges: bryntumEvent => handleChanges(bryntumEvent)
        }
    });

    // Columns in the grid part
    const [columnsConfig] = useState([
        {
            field : 'name',
            text  : 'Name'
        },
        {
            field : 'role',
            text  : 'Role'
        }
    ]);

    const [viewPresetConfig] = useState({
        base : 'weekAndDayLetter',

        // Customize the header
        headers : [
           // Week 16 ... on the top level
           {
             unit       : 'week',
             dateFormat : 'Wp'
           },
           // M, T, W ... on the bottom level
           {
             unit       : 'day',
             dateFormat : 'd1'
           }
        ]
    });

    const handleChanges = useCallback(({ source }) => {
        const { changes } = source;

        // In a real app you would send the changes to the server here.
        console.log(changes);

        // Then you would call `source.acceptChanges()` to clear local changes
        source.acceptChanges();
    }, []);

    const handleEventClick = useCallback(({eventRecord}) => {
        Toast.show(`Clicked ${eventRecord.name}`)
    }, []);

    const handleBeforeEventEdit = useCallback(({eventRecord}) =>{
        Toast.show(`Editing ${eventRecord.name}`);

    }, [])

    useEffect(() => {
        schedulerRef.current?.instance.on('beforeEventEdit', handleBeforeEventEdit);
    }, [schedulerRef, handleBeforeEventEdit])

    return (
        <>
            <BryntumScheduler
                ref={schedulerRef}
                width={800}
                height={600}
                startDate="2023-04-16"
                endDate="2023-05-15"
                crudManager={crudManagerConfig}
                columns={columnsConfig}
                stripeFeature={true}
                onEventClick={handleEventClick}
                viewPreset={viewPresetConfig}
            />
        </>
    );
}

export default App;
