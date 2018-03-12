var Service = require('../models/service').Service;
var HttpError = require('../error/index').HttpError;
var ServiceError = require('../models/service').ServiceError;
var async = require('async');

exports.get = function(req, res) {
var from = parseInt(req.params.from);
var countLoad = 1;
var to=from+countLoad;
var isAll=false;

	Service.getServices( function(err, services) {
	    if (err) {
	      if (err instanceof ServiceError) {
	        return next(new HttpError(403, err.message));
	      } else {
	   		 return next(err);
		  }
		}
	  var servicesMore = [];
      var j=0;
      if(to >= services.length)
      {
        to = services.length;
        isAll=true;
      }
     // console.log(to);
      for (var i = from; i < to; i++) {
        servicesMore[j]=services[i];
        j++;
      }

      res.send({services: servicesMore, to:to, isAll:isAll});

	});
}