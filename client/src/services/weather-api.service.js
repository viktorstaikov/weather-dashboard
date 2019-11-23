import axios from 'axios';

class WeatherService {
  constructor() {
    this.url = process.env.REACT_APP_BACKEND_URL;
  }
  static getTemperatureSeries() {
    return axios.get(this.url + '/api/weather/temp_series');
  }
}
export default WeatherService;
