import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme, Modal, Box, Typography, TextField, Button, Stack } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { saveCustomer, editCustomer, deleteCustomer, saveTrainingSession } from '../helper/api';
import ReactCSV from './ReactCSV';
import moment from 'moment';



//style for modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    //for showing modal
    const [open, setOpen] = useState(false);
    //Training session 
    const [addTraining, setAddTraining] = useState({});
    //values added to training session
    const [trainingDate, setTrainingDate] = useState(moment());
    const [duration, setDuration] = useState();
    const [training, setTraining] = useState();
    //Theme for material-table
    const defaultMaterialTheme = createTheme();

    const columns = [
        { title: 'Firstname', field: 'firstname' },
        { title: 'Lastname', field: 'lastname' },
        { title: 'Email', field: 'email' },
        { title: 'Phone', field: 'phone' }

    ];

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))

    }
    //handle CRUD
    const handleAddNewCustomer = async (rowData) => {
        await saveCustomer(rowData)
    }

    const handleEditCustomer = async (href, rowData) => {
        await editCustomer(rowData, href)
    }

    const handleDeleteCustomer = async (href) => {
        await deleteCustomer(href)
    }

    //handle modal input
    const handleAddTraining = (rowData) => {
        setAddTraining(rowData)
        setOpen(true)
    }

    const handleTrainingDate = (e) => {
        setTrainingDate(e)

    }

    const handleDuration = (e) => {
        setDuration(e.target.value)

    }

    const handleSave = async () => {
        let customerHref = addTraining.links.find(i => i.rel === 'customer').href
        if (!customerHref || !duration || !training || !trainingDate) return
        const data = {
            customer: customerHref,
            date: trainingDate.toISOString(),
            duration: duration,
            activity: training

        }

        await saveTrainingSession(data)
        handleCancel()

    }

    const handleCancel = () => {
        setOpen(false)
        setAddTraining({})
        setTrainingDate(undefined)

    }

    return (

        <div style={{ maxWidth: '100%' }}>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable columns={columns} data={customers} title='Customer list' editable={{
                    onRowAdd: async (newRow) => {
                        await handleAddNewCustomer(newRow)
                        fetchData()


                    },
                    onRowUpdate: async (newRow, oldRow) => {
                        const updatedData = [...customers]
                        updatedData[oldRow.tableData.id] = newRow
                        let customerHref = oldRow.links.find(i => i.rel === 'customer').href
                        await handleEditCustomer(customerHref, newRow)
                        setCustomers(updatedData)


                    },

                    onRowDelete: async (selectedRow) => {
                        let customerHref = selectedRow.links.find(i => i.rel === 'customer').href
                        await handleDeleteCustomer(customerHref)
                        fetchData()


                    }

                }}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Add training',
                            onClick: (event, rowData) => handleAddTraining(rowData)
                        }
                    ]}
                    options={{
                        addRowPosition: 'first', actionsColumnIndex: -1
                    }} />
                <Modal
                    open={open}
                    onClose={() => setOpen(!open)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Stack spacing={2}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add a new training session for a customer
                            </Typography>
                            <TextField hiddenLabel id="filled-hidden-label-small" defaultValue={addTraining.firstname} variant="filled" size="small" disabled />
                            <TextField hiddenLabel id="filled-hidden-label-small" defaultValue={addTraining.lastname} variant="filled" size="small" disabled />
                            <TextField label="Add a training session" id="filled-hidden-label-small" variant="standard" size="small" onChange={e => setTraining(e.target.value)} />
                            <TextField label="Duration in minutes" id="filled-hidden-label-small" type="number" variant="standard" size="small" onChange={handleDuration} />
                            <LocalizationProvider dateAdapter={AdapterMoment}>

                                <DateTimePicker
                                    label="Date desktop"
                                    inputFormat="MM/DD/YYYY hh:mm"
                                    value={trainingDate}
                                    onChange={handleTrainingDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <Button variant="text" onClick={() => handleSave()}>Save</Button>
                            <Button variant="text" onClick={() => handleCancel()} >Cancel</Button>
                        </Stack>
                    </Box>
                </Modal>
            </ThemeProvider>
            <ReactCSV customers={customers} />
        </div>
    );
}

