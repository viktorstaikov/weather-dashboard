import axios from 'axios';

class WeatherService {
  static getTemperatureSeries() {
    const url = process.env.REACT_APP_BACKEND_URL;
    return axios.get(url + '/api/weather/temp_series').then(r => r.data);
  }
}
export default WeatherService;
