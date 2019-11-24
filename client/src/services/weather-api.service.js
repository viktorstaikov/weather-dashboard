import axios from 'axios';

class WeatherService {
  static getTemperatureSeries() {
    const url = process.env.REACT_APP_BACKEND_URL;
    return axios.get(`${url}/api/weather/temp_series`).then(r => {
      return r.data;
    });
  }

  static getDailyForecast(day) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          temp: 6.68,
          temp_min: 6.68,
          temp_max: 6.68,
          pressure: 1013,
          humidity: 88,
          weather: {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d',
          },
          clouds: 100,
          wind: {
            speed: 4.68,
            deg: 103,
          },
        });
      }, 2000);
    });
  }
}
export default WeatherService;
