var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;

  var schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },  
  price: {
    type:  Number,
    required: true
  },
  short_description: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  path: {
    type: String,
    required: true
  }
});

schema.statics.addService = function(name, price, short_description,path, callback) {
  var Service = this;

  async.waterfall([
    function(callback) {
      Service.findOne({name: name}, callback);
    },
    function(service, callback) {
      if (service) {       
          console.log("Така послуга вже існує");     
          callback(new ServiceError("Така послуга вже існує"));
        
      } else {

        var service = new Service({name: name, price: price, short_description:short_description, path: path});
              	  console.log("Додаю товар");  
        service.save(function(err) {
          if (err) return callback(err);
          callback(null, service);
        });
      }
    }
  ], callback);
};

schema.statics.getServices = function(callback) {
  var Service = this;

 	Service.find({}, function(err, services){
	      
	    if(err) return console.log(err);
	     
	    //console.log("Sssss: "+services);
	    callback(null, services); 
	});
};




exports.Service = mongoose.model('Service', schema);


function ServiceError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, ServiceError);

  this.message = message;
}

util.inherits(ServiceError, Error);

ServiceError.prototype.name = 'ServiceError';

exports.ServiceError = ServiceError;