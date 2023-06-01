import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import Loading from './Loading';

const Maps = () => {
    const URL = 'https://disease.sh/v3/covid-19/countries'
    // react query is used here with axios to fetch data from the above url 
    const { isLoading, error, data: countriesData, isError } = useQuery({
        queryKey: ['Maps'],
        queryFn: async () => {
            const response = await axios.get(URL)
            return response.data
        }
    })

    // checking the loading state and rendering appropriate components
    if (isLoading) {
        return (
            <Loading />
        )
    } else if (isError) {
        return (
            <div>{JSON.stringify(error)}</div>
        )
    } else
        return (
            // center is set to India
            <MapContainer center={[20, 77]} zoom={5}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* passing countries covid data to the marker component which then uses latitude and longiture available in api */}
                {/* and other relevent data to display as required in assignemnt */}
                {countriesData.map((countryData: ICovidCountryAPI) => (
                    <Marker position={[countryData.countryInfo.lat, countryData.countryInfo.long]} key={countryData.country}>
                        <Popup>
                            Country name: {countryData.country}<br /> Active cases: {countryData.active}<br /> Recovered: {countryData.recovered}<br /> Deaths: {countryData.deaths}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        )
}

export default Maps
