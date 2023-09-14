import { BryntumScheduler } from '@bryntum/scheduler-react';
import { useCallback, useState } from 'react';
import './App.css';

function App() {
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
    ])

    const handleChanges = useCallback(({ source }) => {
        const { changes } = source;

        // In a real app you would send the changes to the server here.
        console.log(changes);

        // Then you would call `source.acceptChanges()` to clear local changes
        source.acceptChanges();
    }, []);

    return (
        <>
            <BryntumScheduler
                width={800}
                height={600}
                startDate="2023-04-16"
                endDate="2023-05-15"
                crudManager={crudManagerConfig}
                columns={columnsConfig}
            />
        </>
    );
}

export default App;
