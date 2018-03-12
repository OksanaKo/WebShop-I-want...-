var News = require('../models/news').News;
var HttpError = require('../error/index').HttpError;
var NewsError = require('../models/news').NewsError;
var async = require('async');

exports.get = function(req, res) {
	News.getNews(function(err, news) {
	    if (err) {
	      if (err instanceof ServiceError) {
	        return next(new HttpError(403, err.message));
	      } else {
	    return next(err);
	  }
	}
  	res.render('news.hbs', {news: news});
	});
};