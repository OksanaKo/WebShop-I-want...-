var HttpError = require('../error/index').HttpError;

function isAuth(req, res, next) {
  if (!req.session.user) {
    return next(new HttpError(401, "Ви не авторизовані"));
  }

  next();
};

function isUnAuth(req, res, next) {
  	if (req.session.user) {
  		console.log("Ви авторизовані");
    return next(new HttpError(401, "Ви авторизовані"));
 	
 	}
	else{
	  next();
	}
};

function isAdmin(req, res, next) {
  	if (req.user.isAdmin === false) {
  		console.log("Ви не адмін");
    return next(new HttpError(401, "Ви не адмін"));
 	
 	}
	else{
		
	  next();
	}
};

module.exports = {
	isAuth,
	isUnAuth,
	isAdmin
};