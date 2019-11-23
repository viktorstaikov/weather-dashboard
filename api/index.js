const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Logger = require('koa-logger');
const cors = require('koa-cors');
const serve = require('koa-static');
const mount = require('koa-mount');
const HttpStatus = require('http-status');
const errorHandler = require('./middleware/error.middleware');
const weatherRoutes = require('./weather/index');

const app = new Koa();

const PORT = process.env.PORT || 1337;

app.use(BodyParser());
app.use(Logger());
app.use(cors());
app.use(errorHandler);

const router = new Router({ prefix: '/api' });
const weatherRouter = weatherRoutes(Router);

router.use(weatherRouter.routes()).use(weatherRouter.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, function() {
  console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/', PORT, PORT);
});
