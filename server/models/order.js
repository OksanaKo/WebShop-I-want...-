var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({

  username: {
    type: String,
    required: true
  },  
  orders: {
    type:  String,
    required: true
  },
  state: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.statics.addOrder = function(username, ordersList, callback) {
  var Order = this;

//console.log(ordersList[0][1]);
var myOrdersList = JSON.stringify(ordersList);
  async.waterfall([
    function(callback) {
      Order.findOne({state: 0, username: username}, callback);
    },
    function(order, callback) {
      if (order) {     
        var orders = JSON.parse(order.orders);
         

        var isNew = true;
        for (var i = 0; i <orders.length; i++) {
          if(orders[i][0]===ordersList[0][0])
          {
            orders[i][2]+=1;
       //     console.log("same: " + orders[i][2]);
            isNew = false;
            break;
          }
        }

      var newOrdersList = [];
      if(isNew == true) {
        // console.log("newService");        
        for (var i = 0; i < orders.length+1; i++) {
          newOrdersList[i]=[]         
          if(i===orders.length){
            newOrdersList[i][0]=ordersList[0][0];         
            newOrdersList[i][1]=ordersList[0][1];         
            newOrdersList[i][2]=ordersList[0][2];                    
          }
          else{
            newOrdersList[i][0]=orders[i][0];         
            newOrdersList[i][1]=orders[i][1];         
            newOrdersList[i][2]=orders[i][2];                  
          }
        }
       // console.log(newOrdersList[0]);
       }
       else {
        newOrdersList=orders;
        // console.log("oldService");
       }
    
  //   console.log(newOrdersList[0][3]);
        var totalPrice=0;
        for (var i = 0; i < newOrdersList.length; i++) {
          totalPrice+= newOrdersList[i][1]*newOrdersList[i][2];
        }    
        var newOrders = JSON.stringify(newOrdersList);
        // console.log(newOrders)

        Order.update({
          username: username, state: 0}, 
          {orders: newOrders, totalPrice: totalPrice}, 
          function(err, result){  
            if(err) return callback(err);
            //console.log("all ok");
            callback(null, result);
        });        
      } 
      else {
        var order = new Order({
          username: username, 
          orders: myOrdersList, 
          state: 0, 
          totalPrice: ordersList[0][1]
        });
       // console.log("Додаю order");  
        order.save(function(err) {
          if (err) return callback(err);
          callback(null, order);
        });
      }
    }
  ], callback);
};


schema.statics.getOrder = function(username, callback) {
  var Order = this;

  Order.findOne({username: username, state: 0}, function(err, order){
        
      if(err) return callback(err);
       
      //console.log("Sssss: "+services);
      callback(null, order); 
  });
};

schema.statics.payOrder = function(username, callback) {
  var Order = this;

        Order.update({
          username: username, state: 0}, 
          {state: 1}, 
          function(err, result){  
            if(err) return callback(err);
           // console.log("all ok");
            callback(null, result);
        }); 
};

schema.statics.cancelOrder = function(username, callback) {
  var Order = this;

        Order.update({
          username: username, state: 0}, 
          {state: 2}, 
          function(err, result){  
            if(err) return callback(err);
           // console.log("all ok");
            callback(null, result);
        }); 
};

schema.statics.getOrders = function(username, state,callback) {
  var Order = this;

  Order.find({username: username, state: state}, function(err, orders){
        
      if(err) return callback(err);
       
      //console.log("Sssss: "+services);
      callback(null, orders); 
  });
};

schema.statics.deleteOrder = function(username,callback) {
  var Order = this;

  Order.findOneAndRemove({username: username, state: 0}, function(err, order){
        
      if(err) return callback(err);
       
      //console.log("Sssss: "+services);
      callback(null, order); 
  });
};

exports.Order = mongoose.model('Order', schema);

function OrderError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, OrderError);

  this.message = message;
}

util.inherits(OrderError, Error);

OrderError.prototype.name = 'OrderError';

exports.OrderError = OrderError;