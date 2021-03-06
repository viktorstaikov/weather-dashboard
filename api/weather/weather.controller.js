const weatherService = require('./weather.service');

exports.hi = async ctx => {
  ctx.status = 200;
  ctx.body = 'hi, there :)';
};

exports.temp_series = async ctx => {
  ctx.body = await weatherService.getTemperatureSeries();
  ctx.status = 200;
};

exports.pressure_series = async ctx => {
  ctx.body = await weatherService.getPressureSeries();
  ctx.status = 200;
};

exports.humidity_series = async ctx => {
  ctx.body = await weatherService.getHumiditySeries();
  ctx.status = 200;
};
exports.rain_series = async ctx => {
  ctx.body = await weatherService.getRainSeries();
  ctx.status = 200;
};

exports.forecast = async ctx => {
  const q = ctx.request.query;
  if (!q.date) {
    throw new Error('date is missing in the query string');
  }
  ctx.body = await weatherService.getForecast(q.date);
  ctx.status = 200;
};
