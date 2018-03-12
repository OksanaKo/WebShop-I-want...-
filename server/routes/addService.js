var Service = require('../models/service').Service;
var HttpError = require('../error/index').HttpError;
var ServiceError = require('../models/service').ServiceError;
var async = require('async');
var formidable = require('formidable');
var fs = require('fs');

exports.get = function(req, res) {
 res.render('admin.hbs', {addService: true, title: "додати послугу"});
};

/*exports.post = function(req, res, next) {
  var name = req.body.name;
  var price = req.body.price;
  var short_description = req.body.short_description;
  var fileImage = req.body.fileImage;
console.log("file"+fileImage);



};*/


exports.post = function(req, res, next) {
  console.log("post");
   var form = new formidable.IncomingForm();
   form.parse(req, function (err, fields, files) {
      var newFileImageName = "_"+(new Date()).getTime()+ files.fileImage.name;      
      var oldpath = files.fileImage.path;
      var newpath = 'C:/Users/KonTiK/Documents/GitHub/data/images/upload/' +newFileImageName;
      console.log(newFileImageName);
      var name = fields.serviceName;
      var price = fields.servicePrice;
      var short_description = fields.serviceShortDescription;


      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        Service.addService(name, price,short_description, newFileImageName, function(err, service) {
          if (err) {
            if (err instanceof ServiceError) {
              return next(new HttpError(403, err.message));
            } else {
              return next(err);
            }
          }
      res.redirect('/addService');
    /*    res.end();*/
  });


      });
    });
};