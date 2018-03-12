var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shop', {
      "server": {
        "socketOptions": {
          "keepAlive": 1
        }
      } 
  }, function(){
    console.log('MongoDB connected sucessfully')
}); // потім закоментувати

module.exports = mongoose;
