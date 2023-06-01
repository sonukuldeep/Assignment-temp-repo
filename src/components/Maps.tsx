import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useQuery } from '@tanstack/react-query'
import axios from "axios";

const Maps = () => {
    const URL = 'https://disease.sh/v3/covid-19/countries'
    const { isLoading, error, data: countriesData, isError } = useQuery({
        queryKey: ['Maps'],
        queryFn: async () => {
            const response = await axios.get(URL)
            return response.data
        }
    })

    if (isLoading) {
        return (
            <div className="absolute left-1/2 top-1/2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em]">
            </div>
        )
    } else if (isError) {
        return (
            <div>{JSON.stringify(error)}</div>
        )
    } else
        return (
            <MapContainer center={[20, 77]} zoom={5}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
