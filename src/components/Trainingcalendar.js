import React, { useState, useEffect } from 'react';
import FullCalendar, { preventContextMenu } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';


export default function Trainingcalendar() {

  const [trainings, setTrainings] = useState([]);
  const [trainingSessions, setTrainingSessions] = useState([]);



  useEffect(() => fetchData(), []);

  const fetchCustomer = async (uri) => {
    try {
      let resp = await fetch(uri)
      if (resp.status === 200) {
        let json = await resp.json()
        return json
      }

    } catch (ex) {
      console.log(ex)
    }
  }


  const fetchData = async () => {
    let resp = await fetch('https://customerrest.herokuapp.com/api/trainings')
    let data = await resp.json()

    const orgData = [...data.content]
    let trainingData = []
    for (let i = 0; i < orgData.length; i++) {
      let training = orgData[i]
      let uri = training.links.find(o => o.rel === 'customer')
      let customer = await fetchCustomer(uri.href)
      training.customer = customer
      training.date = moment(training.date).format('YYYY-MM-DD HH:mm');
      trainingData.push(training)
    }
    let modifiedTrainingData = []
    for (let i = 0; i < trainingData.length; i++) {
      let training = trainingData[i]
      let obj = {
        title: training.activity + " " + training.customer.firstname,
        start: training.date,
        end: training.date
      }
      modifiedTrainingData.push(obj)
    }
    setTrainings(modifiedTrainingData)

  }

  return (
    <FullCalendar
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev, next, today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      }}
      plugins={[dayGridPlugin, interactionPlugin]}
      events={trainings}
      eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false
      }}
    />
  )
}


