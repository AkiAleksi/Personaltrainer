import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Traininglist from './Traininglist';
import Customerlist from './Customerlist';
import Trainingcalendar from './Trainingcalendar';
import Trainingchart from './Trainingchart';

function TabApp() {
    const [tab, setTab] = useState('Training');

    const handleChange = (e, value) => {
        setTab(value);
    };

    return (
        <div>
            <Tabs value={tab} onChange={handleChange}>
                <Tab value="Training" label="Training list" />
                <Tab value="Customer" label="Customer list" />
                <Tab value="Calendar" label="Training calendar" />
                <Tab value="Chart" label="Training chart" />
            </Tabs>
            {tab === 'Training' && <Traininglist/>}
            {tab === 'Customer' && <Customerlist/>}
            {tab === 'Calendar' && <Trainingcalendar/>}
            {tab === 'Chart' && <Trainingchart/>}
        </div>
    )
    
}
export default TabApp;