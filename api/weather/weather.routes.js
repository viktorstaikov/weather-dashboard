const controller = require('./weather.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/weather`
  });

  router.get('/hi', controller.hi);

  router.get('/humidity_series', controller.humidity_series);
  router.get('/pressure_series', controller.pressure_series);
  router.get('/rain_series', controller.rain_series);
  router.get('/temp_series', controller.temp_series);

  router.get('/forecast', controller.forecast);

  return router;
};
