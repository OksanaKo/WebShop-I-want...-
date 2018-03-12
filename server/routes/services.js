var Service = require('../models/service').Service;
var HttpError = require('../error/index').HttpError;
var ServiceError = require('../models/service').ServiceError;
var async = require('async');

exports.get = function(req, res) {
	Service.getServices(function(err, services) {
	    if (err) {
	      if (err instanceof ServiceError) {
	        return next(new HttpError(403, err.message));
	      } else {
	    return next(err);
	  }
	}
  	res.render('services.hbs', {services: services});
	});
};