var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },  
  text: {
    type:  String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  auther: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.statics.addNews = function(title, text, auther, path, callback) {
  var News = this;
   async.waterfall([
    function(callback) {
      News.findOne({title: title}, callback);
    },
     function(news, callback) {    
      if (news) {
          callback(new NewsError("Така новина уже існує!"));
      } else {      
        var news = new News({title: title, text: text, path:path, auther:auther});
        console.log("Додаю новину");
        news.save(function(err) {
          if (err) return callback(err);
          callback(null, news);
        });
      }
    }
  ], callback);
};

schema.statics.getNews = function(callback) {
  var News = this;

  News.find({}, function(err, news){
        
      if(err) return console.log(err);
       
      //console.log("Sssss: "+services);
      callback(null, news); 
  });
};

schema.statics.deleteNews = function(id, callback) {
  var News = this;

  News.findOneAndRemove({_id: id}, function(err, news){
        
      if(err) return console.log(err);
       
      callback(null, news); 
  });
};

exports.News = mongoose.model('News', schema);

function NewsError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, NewsError);

  this.message = message;
}

util.inherits(NewsError, Error);

NewsError.prototype.name = 'NewsError';

exports.NewsError = NewsError;