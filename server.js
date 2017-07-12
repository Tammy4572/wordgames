const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');

const indexController = require('./controllers/indexController');
const gameController = require('./controllers/gameController');
const endController = require('./controllers/endController');

const application = express();
application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use(express.static(__dirname + './public'));
application.use(bodyParser.urlencoded());

application.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: true
}));

application.use(indexController);
application.use(gameController);
application.use(endController);

application.listen(3000);