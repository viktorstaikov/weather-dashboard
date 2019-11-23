const axios = require('axios');
const querystring = require('querystring');

class WeatherSeries {
  constructor() {
    this.url = 'http://api.openweathermap.org/data/2.5/forecast';
    this.appid = 'd5a332c2fd770645632f720a59006d58';
  }

  /**
   * @return {Promise<any[]>}
   */
  async getTemperatureSeries() {
    return axios
      .get(this.url, {
        params: {
          q: 'Sofia,bg',
          appid: this.appid,
          units: 'metric'
        }
      })
      .then(r => r.data)
      .then(
        ({ list }) => {
          const series = list.map(item => {
            return {
              timestamp: item.dt * 1000,
              temp_min: item.main.temp_min,
              temp_max: item.main.temp_max
            };
          });
          return series;
        },
        err => {
          return Promise.reject(err);
        }
      );
  }
}

module.exports = new WeatherSeries();
