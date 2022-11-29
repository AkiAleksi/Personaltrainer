import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material'
//import 'react-table/react-table.css';


export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    const defaultMaterialTheme = createTheme();
    const columns = [
        { title: 'Firstname', field: 'firstname' },
        { title: 'Lastname', field: 'lastname' },
        
      ];

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }



    return (
        <div style={{ maxWidth: '100%' }}>
        <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable columns={columns} data={customers} title='Customer list' />
        </ThemeProvider>
      </div>
    );
}
//<ReactTable filterable={true} data={customers} columns={columns} />