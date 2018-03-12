var Order = require('../models/order').Order;
var HttpError = require('../error/index').HttpError;
var OrderError = require('../models/order').OrderError;
var async = require('async');

exports.get = function(req, res) {
	var username = req.user.username;
	Order.getOrder(username, function(err, order) {
	    if (err) {
	      if (err instanceof ServiceError) {
	        return next(new HttpError(403, err.message));
	      } else {
	    return next(err);
	  }
	}
  	res.render('shoppingCart.hbs', {order: order});
	});
};

exports.post = function(req, res,next) {
  var orders = req.body.orders;
  Order.addOrder(req.user.username, orders, function(err, service) {
    if (err) {
      if (err instanceof OrderError) {
        return next(new HttpError(403, err.message));
      } else {
        return next(err);
      }
    }
	res.send({});
  });
};

exports.put = function(req, res,next) {
	var type = req.params.type;
	if(type==="pay")
	{
	  Order.payOrder(req.user.username, function(err, service) {
	    if (err) {
	      if (err instanceof OrderError) {
	        return next(new HttpError(403, err.message));
	      } else {
	        return next(err);
	      }
	    }
		res.send({});
	  });
	}
	else if(type==="cancel")
	{
		Order.cancelOrder(req.user.username, function(err, service) {
	    if (err) {
	      if (err instanceof OrderError) {
	        return next(new HttpError(403, err.message));
	      } else {
	        return next(err);
	      }
	    }
		res.send({});
	  });
	}
};

exports.delete = function(req, res,next) {

  Order.deleteOrder(req.user.username,  function(err, service) {
    if (err) {
      if (err instanceof OrderError) {
        return next(new HttpError(403, err.message));
      } else {
        return next(err);
      }
    }
    
	res.send({});
  });
};