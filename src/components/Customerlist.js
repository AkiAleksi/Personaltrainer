import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material'



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
        <MaterialTable columns={columns} data={customers} title='Customer list' editable= {{
            onRowAdd:(newRow)=> new Promise((resolve,reject) => {
                console.log(newRow)
                setCustomers([...customers,newRow])
                resolve()
                
            }),
            onRowUpdate:(newRow, oldRow) => new Promise((resolve,reject) => {
                const updatedData=[...customers] 
                updatedData[oldRow.tableData.id]=newRow
                setCustomers(updatedData)
                 resolve()
                
            }),

            onRowDelete:(selectedRow)=>new Promise((resolve,reject)=>{
                const updatedData=[...customers]
                updatedData.splice(selectedRow.tableData.id,1)
                setCustomers(updatedData)
                resolve()

            })
        }}
        options={{
            addRowPosition: 'first', actionsColumnIndex: -1
        }}/>
        </ThemeProvider>
      </div>
    );
}
