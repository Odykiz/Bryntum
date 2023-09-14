import { BryntumScheduler } from '@bryntum/scheduler-react';
import './App.css';

function App() {
    return (
        <>
            <BryntumScheduler
                width={800}
                height={600}
                startDate="2023-04-16"
                endDate="2023-05-15"
            />
        </>
    );
}

export default App;