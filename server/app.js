var express = require('express');
var http = require('http');
var path = require('path');
// var config = require('./config/config');
// var log = require('./lib/log')(module);
var mongoose = require('./lib/mongoose');
var HttpError = require('./error/index').HttpError;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const hbsHelpers = require('./middleware/hbsHelpers');
var hbs = require("hbs");

  var app = express();


app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs"); 

hbs.registerHelper("ifUser", hbsHelpers.ifUser);
hbs.registerHelper("getServices", hbsHelpers.getServices);
hbs.registerHelper("getOrder", hbsHelpers.getOrder);
hbs.registerHelper("getOrders", hbsHelpers.getOrders);
hbs.registerHelper("getNews", hbsHelpers.getNews);
hbs.registerHelper("getNewsTitle", hbsHelpers.getNewsTitle);

/*app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');*/

// app.use(express.favicon());

// if (app.get('env') == 'development') {
 app.use(morgan('dev'));
// } else {
//   app.use(express.logger('default'));
// }

// app.use(bodyParser.json()) basically tells the system that you want json to be used.
// bodyParser.urlencoded({extended: ...}) basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) or complex algorithm for deep parsing that can deal with nested objects (i.e. true).
 
 app.use(cookieParser());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false })); 

 var MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: "update",
  key: "sid",
  cookie: {
      "path": "/",
      "httpOnly": true,
      "maxAge": null
    },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));

//app.use(app.router);

 require('./routes')(app);

 app.use(express.static(path.join(__dirname, 'public')));


app.use(function(err, req, res, next) {

  if (typeof err == 'number') { // next(404);
    err = new HttpError(err);

  }

  if (err instanceof HttpError) {

    res.sendHttpError(err);
  } else {
    // if (app.get('env') == 'development') {
    //   express.errorHandler()(err, req, res, next);
    // } else {
      console.log(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    // }
  }
});


http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port ' + 3000);
});

