import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import _ from 'lodash';

export default function Trainingchart() {

    const [trainings, setTrainings] = useState([]);

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
            training.date = moment(training.date).format('DD.MM.YYYY hh:mm');
            trainingData.push(training)
        }




        let grouped = _.groupBy(trainingData, "activity")
        let sumActivity = []
        for (const [key, value] of Object.entries(grouped)) {
            let sum = 0;
            for (let i = 0; i < value.length; i++) {
                sum += value[i].duration
            }
            sumActivity.push({
                name: key,
                minutes: sum
            })
        }

        setTrainings(sumActivity)
    }
   

    return (
        <ResponsiveContainer width="100%" aspect={3}>
            <BarChart
                width={500}
                height={300}
                data={trainings}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="minutes" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}


