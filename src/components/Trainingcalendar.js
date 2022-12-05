import React from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'

export default class Trainingcalendar extends React.Component {


render() {
    return (
        <FullCalendar
        initialView="dayGridMonth"
        plugins={[ dayGridPlugin ]}
        events={[
            { title: 'event 1', date: '2022-12-04 06:45' },
            { title: 'event 2', date: '2022-12-04 06:49' }
          ]}
      />
    )
  }
        
}
