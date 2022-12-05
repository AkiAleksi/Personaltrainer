import React, { useEffect, useState } from "react";
import { CSVLink } from 'react-csv';






const ReactCSV = () => {
    
    const [customers, setCustomers] = useState([]);
   

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
    }

    const headers = [
        { label: 'Firstname', key: 'firstname' },
        { label: 'Lastname', key: 'lastname' },

    ];


  

  return (
    
    <div className="App">
    <button onClick={fetchData}>Download data into CSV</button>
    <CSVLink
        data={customers}
        headers={headers}
        filename={"CustomerCSV"}
        target="_blank">
    Download customer CSV
    </CSVLink>
    </div>
  );
}

export default ReactCSV;