var News = require('../models/news').News;
var HttpError = require('../error/index').HttpError;
var NewsError = require('../models/news').NewsError;
var async = require('async');
var formidable = require('formidable');
var fs = require('fs');

exports.get = function(req, res) {
  News.getNews(function(err, news) {
      if (err) {
        if (err instanceof ServiceError) {
          return next(new HttpError(403, err.message));
        } else {
      return next(err);
    }
  }
    res.render('admin.hbs', {addNews: true, title: "новини", news: news});
  });
 
};

exports.post = function(req, res, next) {
	console.log("post");
   var form = new formidable.IncomingForm();
   form.parse(req, function (err, fields, files) {
      var newFileImageName = "_"+(new Date()).getTime()+ files.fileImage.name;      
      var oldpath = files.fileImage.path;
      var newpath = 'C:/Users/KonTiK/Documents/GitHub/data/images/upload/' +newFileImageName;
      console.log(newFileImageName);
      var title = fields.newsTitle;
      var text = fields.newsText;
      var auther = req.user.username;
console.log(auther);
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        News.addNews(title, text, auther, newFileImageName, function(err, service) {
          if (err) {
            if (err instanceof NewsError) {
              return next(new HttpError(403, err.message));
            } else {
              return next(err);
            }
          }
      res.redirect('/adminNews');
    /*    res.end();*/
  });
      });
    });
};


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