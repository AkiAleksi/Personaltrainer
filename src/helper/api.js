const saveCustomer = async (data) => {
    let response = await fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

const editCustomer = async (data, href) => {
    let response = await fetch(href, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

const deleteCustomer = async (href) => {
    let response = await fetch(href, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

}

const saveTrainingSession = async (data) => {
    let response = await fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

const deleteTraining = async (href) => {
    let response = await fetch(href, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

}


export { saveCustomer, editCustomer, deleteCustomer, saveTrainingSession, deleteTraining }