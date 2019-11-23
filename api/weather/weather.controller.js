const weatherService = require('./weather.service');

exports.hi = async ctx => {
  ctx.status = 200;
  ctx.body = 'hi, there :)';
};

exports.temp_series = async ctx => {
  ctx.body = await weatherService.getTemperatureSeries();
  ctx.status = 200;
};
