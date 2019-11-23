const controller = require('./weather.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/weather`
  });

  router.get('/hi', controller.hi);
  router.get('/temp_series', controller.temp_series);

  return router;
};
