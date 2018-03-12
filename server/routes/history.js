var Order = require('../models/order').Order;
var HttpError = require('../error/index').HttpError;
var OrderError = require('../models/order').OrderError;
var async = require('async');

exports.get = function(req, res) {
	var username = req.user.username;
	var state = req.params.state;

	Order.getOrders(username, state,function(err, orders) {
	    if (err) {
	      if (err instanceof ServiceError) {
	        return next(new HttpError(403, err.message));
	      } else {
	    return next(err);
	  }
	}
	//console.log('Get: ' + services);
	var historyTitle="";
	if(state==='1')
	{
		historyTitle=" покупок";
	}
	else if(state==='2')
	{
		historyTitle=" відмов";
	}

  	res.render('history.hbs', {orders: orders, historyTitle: historyTitle});
	});
};