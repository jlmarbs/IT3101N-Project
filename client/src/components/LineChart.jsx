import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

function LineChart({ summaries, setTotal }) {
    const [userData, setUserData] = useState([])
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            label: "Total Saved",
            data: [],
        }]
    })

    useEffect(() => {
        if (summaries) {
            let total = 0;
            const newData = []
            const newLabels = []
            const newDataPoints = []

            for (let x = 0; x < summaries.data.length; x++) {
                const date = new Date(summaries.data[x].Month)
                const month = date.getMonth() + 1
                const year = date.getFullYear();
                const saved = parseFloat(summaries.data[x].End_Value) - parseFloat(summaries.data[x].Init_Value);
                const newSummary = {
                    month: `${month}/${year}`,
                    saved: saved,
                }
                total += saved;
                newLabels.push(newSummary.month);
                newDataPoints.push(newSummary.saved);

                newData.push(newSummary);
            }
            console.log(newData)
            setTotal(total)
            console.log(total)
            setUserData(newData)
            setData({
                labels: newLabels,
                datasets: [{
                    label: "Total Saved",
                    data: newDataPoints,
                }]
            })
        }
    }, [summaries])

    return (
        <>
            <Line data={data} />
        </>
    )
}

export default LineChart;