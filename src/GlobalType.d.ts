// this file hold all type definations
interface IContactState {
    id: string;
    firstName: string;
    lastName: string;
    status: boolean;
}

interface ICovidCountryAPI {
    country: string;
    countryInfo: {
        lat: number;
        long: number;
    };
    active: number;
    deaths: number;
    recovered: number;
}

interface IApiData {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
}

interface ILineChartData {
    truncatedCases: number[];
    truncatedRecovery: number[];
    truncatedDeaths: number[];
    labels: string[];
}