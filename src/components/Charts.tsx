import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import LineChart from './LineChart';
import Loading from './Loading';

const Charts = () => {
    // 'https://disease.sh/v3/covid-19/countries' the end point can be used to create bar chart but the requirement is line chart
    // 'https://disease.sh/v3/covid-19/all' can't be used to create line chart from this endpoint

    const URL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
    const { isLoading, error, data: covidData, isError } = useQuery({
        queryKey: ['covidData'],
        queryFn: async () => {
            // limiting no of data points for better visualization of data and
            // besides the patients who have recovered at later dates equates to 0 making it unusable for use
            const limitDataSet = 50 // at length = 560 recovery datas are all zeros
            // using axios for get request
            const response = await axios.get(URL)
            // destructuring and slicing data to effectively serve to line chart component 
            const { cases, deaths, recovered } = response.data
            const noOfCases: number[] = Object.values(cases)
            const truncatedCases = noOfCases.slice(0, limitDataSet)
            const labels: string[] = Object.keys(cases).slice(0, limitDataSet)
            const noOfdeaths: number[] = Object.values(deaths)
            const truncatedDeaths = noOfdeaths.slice(0, limitDataSet)
            const noOfRecovery: number[] = Object.values(recovered)
            const truncatedRecovery = noOfRecovery.slice(0, limitDataSet)
            return { labels, truncatedCases, truncatedDeaths, truncatedRecovery }
        },
    })

    // checking loading or error and then passing deta to line chart to do the magic
    if (isLoading) {
        return (
            <Loading />
        )
    }
    else if (isError)
        return (
            <div>{JSON.stringify(error)}</div>
        )
    else {
        return (
            <div className='m-2 p-2 max-h-[90%] md:max-h-[80%] flex justify-center bg-gray-200 rounded border'>
                <LineChart data={covidData} />
            </div>
        )
    }


}

export default Charts
