const axios = require('axios');
const querystring = require('querystring');
const moment = require('moment');

class WeatherSeries {
  constructor() {
    this.url = 'http://api.openweathermap.org/data/2.5/forecast';
    this.appid = 'd5a332c2fd770645632f720a59006d58';

    this._weatherRequest = null;
    this._weatherData = null;
  }

  get data() {
    if (!this._weatherRequest || (this._weatherData && this.isDataOld())) {
      this._weatherData = null;
      this._weatherRequest = axios
        .get(this.url, {
          params: {
            lat: 42.6979,
            lon: 23.3222,
            appid: this.appid,
            units: 'metric'
          }
        })
        .then(r => {
          this._weatherData = r.data;
          return this._weatherData;
        });
    }
    return this._weatherRequest;
  }

  isDataOld() {
    const firstItem = this._weatherData.list[0];
    const timestamp = firstItem.dt * 1000;
    const now = moment();

    return moment(timestamp).isBefore(now);
  }

  /**
   * @return {Promise<any[]>}
   */
  async getTemperatureSeries() {
    return this.data.then(
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
