import React, {useState, useEffect} from 'react';
import moment from 'moment';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material'
import { deleteTraining } from '../helper/api';



export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const columns = [
        { title: 'Training', field: 'activity' },
        { title: 'Date and time', field: 'date' },
        {title: 'Duration in minutes', field: 'duration'},
        {title: 'Customer firstname', field: 'customer.firstname'},
        {title: 'Customer lastname', field: 'customer.lastname'}
      ];

    const defaultMaterialTheme = createTheme();
    
    useEffect(() => fetchData(), []);
    
    const fetchCustomer = async(uri) => {
        try {
        let resp = await fetch(uri)
        if (resp.status === 200) {
            let json = await resp.json()
            return json
        }
        
        }catch(ex) {
            console.log(ex)
        }
    }


    const fetchData = async() => { 
        let resp = await fetch('https://customerrest.herokuapp.com/api/trainings')
        let data = await resp.json()
        
            const orgData = [...data.content]
            let trainingData = []
            for(let i = 0; i < orgData.length; i++) {
                let training = orgData[i]
                let uri = training.links.find(o => o.rel === 'customer')
                let customer = await fetchCustomer(uri.href)
                training.customer = customer
                training.date = moment(training.date).format('DD.MM.YYYY hh:mm');
                trainingData.push(training)
            }
            setTrainings(trainingData)
            console.log(trainingData)
            
      

    }
    const handleDeleteTraining = async(href) => {
        await deleteTraining(href)
    }

    return (
        <div style={{ maxWidth: '100%' }}>
        <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable columns={columns} data={trainings} title='Training list' editable={{
            onRowDelete:async(selectedRow) =>{
                const updatedData = [...trainings]
                        let trainingHref = selectedRow.links.find(i => i.rel === 'training').href 
                        await handleDeleteTraining(trainingHref)
                        fetchData()

            }

        }}
        options={{
            addRowPosition:"first",actionsColumnIndex:-1
        }}/>
        </ThemeProvider>
      </div>
    );
}
