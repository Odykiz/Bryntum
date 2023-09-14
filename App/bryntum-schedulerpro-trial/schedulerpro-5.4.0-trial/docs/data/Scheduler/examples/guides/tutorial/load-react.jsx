import { BryntumScheduler } from '@bryntum/scheduler-react';
import { useState } from 'react';
import './App.css';

function App() {
    const [crudManagerConfig] = useState({
        loadUrl  : 'data/data.json',
        autoLoad : true
    });

    return (
        <>
            <BryntumScheduler
                width={800}
                height={600}
                startDate="2023-04-16"
                endDate="2023-05-15"
                crudManager={crudManagerConfig}
            />
        </>
    );
}

export default App;
