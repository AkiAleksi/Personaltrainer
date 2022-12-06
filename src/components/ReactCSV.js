import React from "react";
import { CSVLink } from 'react-csv';






const ReactCSV = (props) => {

  const headers = [
    { label: 'Firstname', key: 'firstname' },
    { label: 'Lastname', key: 'lastname' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' }

  ];




  return (

    <div className="App">
      <CSVLink
        data={props.customers}
        headers={headers}
        filename={"CustomerCSV"}
        target="_blank">
        Download customer CSV
      </CSVLink>
    </div>
  );
}

export default ReactCSV;