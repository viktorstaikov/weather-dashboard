const axios = require('axios');
const querystring = require('querystring');
const moment = require('moment');

class WeatherSeries {
  constructor() {
    this.uvUrl = 'http://api.openweathermap.org/data/2.5/uvi/forecast';
    this.url = 'http://api.openweathermap.org/data/2.5/forecast';
    this.appid = 'd5a332c2fd770645632f720a59006d58';

    this._weatherRequest = null;
    this._weatherData = null;

    this._uvRequest = null;
    this._uvData = null;
  }

  get uvData() {
    // weather data gets old more frequently that uv data
    if (!this._uvRequest || (this._uvData && this.isDataOld())) {
      this._uvData = null;
      this._uvRequest = axios
        .get(this.uvUrl, {
          params: { lat: '42.6979', lon: '23.3222', appid: 'd5a332c2fd770645632f720a59006d58' }
        })
        .then(r => {
          this._uvData = r.data;
          return this._uvData;
        });
    }
    return this._uvRequest;
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

  async getPressureSeries() {
    return this.data.then(({ list }) => {
      const mapped = list.map(i => this.mapItem(i));
      const series = mapped.map(item => {
        return { timestamp: item.timestamp, value: item.pressure };
      });
      return series;
    });
  }

  async getHumiditySeries() {
    return this.data.then(({ list }) => {
      const mapped = list.map(i => this.mapItem(i));
      const series = mapped.map(item => {
        return { timestamp: item.timestamp, value: item.humidity };
      });
      return series;
    });
  }

  async getRainSeries() {
    return this.data.then(({ list }) => {
      const mapped = list.map(i => this.mapItem(i));
      const series = mapped.map(item => {
        return { timestamp: item.timestamp, value: item.rain };
      });
      return series;
    });
  }

  async getForecast(date) {
    const m = moment(date);
    return Promise.all([this.data, this.uvData]).then(([data, uvData]) => {
      const list = data.list;
      const forTheDay = list.filter(item => {
        const itemDate = moment(item.dt * 1000);
        return m.isSame(itemDate, 'day');
      });

      // handle when the method is called just before Midnight and no data is available for today
      if (!forTheDay.length) {
        forTheDay.push(list[0]);
      }
      const mapped = forTheDay.map(i => this.mapItem(i));
      const avgItem = this.getAvg(mapped);

      const uvItem = uvData.find(item => {
        const itemDate = moment(item.date * 1000);
        return m.isSame(itemDate, 'day');
      });

      const r = {
        temp: avgItem.temp,
        temp_min: avgItem.temp_min,
        temp_max: avgItem.temp_max,
        pressure: avgItem.pressure,
        humidity: avgItem.humidity,
        weather: avgItem.weather,
        clouds: avgItem.clouds,
        wind: avgItem.wind,
        rain: avgItem.rain,
        uvIndex: uvItem ? uvItem.value : 0
      };
      return r;
    });
  }

  mapItem(item) {
    return {
      timestamp: item.dt * 1000,
      temp: item.main.temp,
      temp_min: item.main.temp_min,
      temp_max: item.main.temp_max,
      pressure: item.main.pressure,
      humidity: item.main.humidity,
      weather: item.weather[0],
      clouds: item.clouds.all,
      wind: item.wind,
      rain: item.rain ? item.rain['3h'] : 0
    };
  }

  getAvg(items) {
    const count = items.length;

    const totalItem = items.reduce(
      (res, curr, idx, arr) => {
        if (idx === Math.floor(arr.length / 2)) {
          res.weather = curr.weather;
        }
        return {
          temp: res.temp + curr.temp,
          temp_min: res.temp_min + curr.temp_min,
          temp_max: res.temp_max + curr.temp_max,
          pressure: res.pressure + curr.pressure,
          humidity: res.humidity + curr.humidity,
          weather: res.weather,
          clouds: res.clouds + curr.clouds,
          wind: {
            speed: res.wind.speed + curr.wind.speed,
            deg: res.wind.deg + curr.wind.deg
          },
          rain: res.rain + (curr.rain || 0)
        };
      },
      {
        temp: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
        weather: null,
        clouds: 0,
        wind: {
          speed: 0,
          deg: 0
        },
        rain: 0
      }
    );

    const avgItem = {
      temp: totalItem.temp / count,
      temp_min: totalItem.temp_min / count,
      temp_max: totalItem.temp_max / count,
      pressure: totalItem.pressure / count,
      humidity: totalItem.humidity / count,
      weather: totalItem.weather,
      clouds: totalItem.clouds / count,
      wind: {
        speed: totalItem.wind.speed / count,
        deg: totalItem.wind.deg / count
      },
      rain: totalItem.rain / count
    };
    return avgItem;
  }
}

module.exports = new WeatherSeries();
