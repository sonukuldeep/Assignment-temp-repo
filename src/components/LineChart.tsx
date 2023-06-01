// line chart are as per chartjs documentation with basic options and data passed to it
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function LineChart({ data }: { data: ILineChartData }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Covid19 Chart',
                font: {
                    size: 24
                }
            },
        },
        scales: {
            x: {
                grid: {
                    drawOnChartArea: false
                }
            },
            y: {
                beginAtZero: true
            }
        }
    };


    const lineChartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Total cases',
                data: data.truncatedCases,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Recovered',
                data: data.truncatedRecovery,
                borderColor: 'rgb(90, 206, 90)',
                backgroundColor: 'rgba(90, 206, 90, 0.5)',
            },
            {
                label: 'Deaths',
                data: data.truncatedDeaths,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Line options={options} data={lineChartData} />
    )
}