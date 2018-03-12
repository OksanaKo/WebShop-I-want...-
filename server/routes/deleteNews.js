var News = require('../models/news').News;
var HttpError = require('../error/index').HttpError;
var NewsError = require('../models/news').NewsError;
var async = require('async');

exports.delete = function(req, res,next) {
var id = req.params.id;
console.log(id);
  News.deleteNews(id,  function(err, service) {
    if (err) {
      if (err instanceof NewsError) {
        return next(new HttpError(403, err.message));
      } else {
        return next(err);
      }
    }
    
  res.send({});
  });
};