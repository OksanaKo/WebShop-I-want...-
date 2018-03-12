var Service = require('../models/service').Service;
var HttpError = require('../error/index').HttpError;
var ServiceError = require('../models/service').ServiceError;
var async = require('async');

exports.get = function(req, res) {
var sortParam = req.params.sortParam;
var to = parseInt(req.params.to);

	Service.getServices(function(err, services) {
	    if (err) {
	      if (err instanceof ServiceError) {
	        return next(new HttpError(403, err.message));
	      } else {
	   		 return next(err);
		  }
		}
		var new_services=[];
		for (var i = 0; i < to; i++) {
	        new_services[i]=services[i];	       
      	}

	if(sortParam === 'ASK')
	{		
		new_services.sort(function (a, b) {
		  if (a.price > b.price) {
		    return 1;
		  }
		  if (a.price < b.price) {
		    return -1;
		  }
		  return 0;
		});
	}
	else if(sortParam === 'DSK')
	{	
		new_services.sort(function (a, b) {
		  if (a.price < b.price) {
		    return 1;
		  }
		  if (a.price > b.price) {
		    return -1;
		  }
		  return 0;
		});
	}
res.send({services: new_services});

  	
	});
};

function compare(a, b) {
  if (a<b) {
    return -1;
  }
  if (a>b) {
    return 1;
  }
  // a должно быть равным b
  return 0;
}