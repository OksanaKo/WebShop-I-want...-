var hbs = require("hbs");


//hbs.registerHelper("ifUser", function(user){
function ifUser(user) {    
    if(user)
    {
      if(user.isAdmin === true)
      {
        return new hbs.SafeString('<div class="dropdown">'+
        '<button onclick="myCabinet()" class="dropbtn">Адмін кабінет</button>'+
        '<div id="myDropdown" class="dropdown-content">'+
        '<a href="/addService">Додати послугу</a>'+
        '<a href="/adminNews">Новини</a>'+
        '<a href="/logout">Вийти</a>'+
        '</div></div>'
        );    
      }
      return new hbs.SafeString('<div class="dropdown">'+
        '<button onclick="myCabinet()" class="dropbtn">Мій кабінет</button>'+
        '<div id="myDropdown" class="dropdown-content">'+
        '<a href="/history/1">Історія покупок</a>'+
        '<a href="/history/2">Історія відмов</a>'+
        '<a href="/shoppingCart">Корзина</a>'+
        '<a href="/logout">Вийти</a>'+
        '</div></div>'
        );  
    }
    else
    {
      return new hbs.SafeString('<div class="dropdown">'+
        '<button class="dropbtn"onclick="enter()">Вхід</button>'+
        '</div>'
        );     
    }   
};
//http://localhost/images/serviseTest.jpg
//http://localhost/images/gerb.png
//hbs.registerHelper("getServices", function(services){
function getServices(services) { 
     if(services)
     {
        var temp='';
        var countServices = 4;
        //data-count="'+countServices+'"

        for (var i = 0; i < countServices; i++) {
          temp+='<div class="serviceContainer" >'+
          '<img src="http://localhost/images/upload/'+services[i].path+'" alt="Послуга">'+
          '<p class="serviceName" > '+services[i].name+'</p>'+
          '<hr/>'+
          '<div class="servicePrice" >Ціна: '+ services[i].price +'грн</div>'+
          '<div class="overlay">'+
          '<div class="text">'+ services[i].short_description +'</div>'+
          '</div>'+
          '<button type="submit" class="buttons buyButton" onclick="buyService(this)"'+
          'data-id="'+services[i].id+'" data-name="'+services[i].name+'" data-price="'+ services[i].price +'">Купити</button>'+
          '</div>';
        }
        // console.log("App: "+ temp);
         return new hbs.SafeString(temp);
     }    
};


function getOrder(order) { 
  
     if(order)
     {
      var ordersList = JSON.parse(order.orders);

        var temp='';
         temp+='<table id="choppingCartTable"><tr class="cartTh"><th>Назва</th><th>К-сть</th><th>Ціна за шт</th></tr>';
        for (var i = 0; i < ordersList.length; i++) {
         
          temp+=
          '<tr class="cartTr">'+
          '<td>'+ordersList[i][0]+'</td>'+
          '<td>'+ordersList[i][2]+'</td>'+
          '<td>'+ordersList[i][1]+'</td>'+
          '</tr>';
          
        }
        temp+=
        '<tr>'+
        '<td colspan="1">Сума: '+ order.totalPrice +'грн </td>'+
        '<td><button type="submit" class="buttons" onclick="cancelOrder()">Очистити</button></td>'+
        '<td><button type="submit" class="buttons" onclick="toOrder()">Замовити</button></td>'+
        '</tr>'+
        '</table>';
        // console.log("App: "+ temp);
         return new hbs.SafeString(temp);
     } 
     else
     {
      return new hbs.SafeString("<h2>Корзина пуста!</h2>")
     }   
};

function getOrders(orders) { 
  
     if(orders)
     {
      //var ordersList = JSON.parse(orders.orders);

        var temp='';
        temp+='<table id="historyTable">';

        for (var i = orders.length-1; i >= 0; i--) {         
          temp+='<table class="historyBlock"> <tr><td class="dateHistory" colspan="3">'+
          orders[i].created.getDate()+'.'+parseInt(orders[i].created.getMonth()+1) +'.'+orders[i].created.getFullYear()+'</td></tr>'

          var ordersList = JSON.parse(orders[i].orders);
          for (var j = 0; j < ordersList.length; j++) {     
            temp+= '<tr class="">'+
            '<td>'+ordersList[j][0]+'</td>'+
            '<td>'+ordersList[j][2]+' шт</td>'+
            '<td>'+ordersList[j][1]*ordersList[j][2]+'</td>'+
            '</tr>';
            
          }
          temp+='</table>';
          /*temp+=
          '<tr>'+
          '<td colspan="2">Сума: '+ orders.totalPrice +'грн </td>'+
          '<td><button type="submit" class="buttons" onclick="toOrder()">Замовити</button></td>'+
          '</tr>';*/
        }
        temp+='</table>';
        // console.log("App: "+ temp);
         return new hbs.SafeString(temp);
     } 
     else
     {
      return new hbs.SafeString("<h2>Ви ще не сформували жодного замовлення!</h2>")
     }   
};

function getNews(news)
{
  if(news)
  {
    var temp='';
    for (var i = 0; i < news.length; i++) {
      temp+=
      '<div class="newsBlock">'+
      '<h3>'+news[i].title+'<h3>'+
      '<img src="http://localhost/images/upload/'+news[i].path+'"/>'+
      '<p>'+ news[i].text +'</p>'+
      '</div>';
    }
    return new hbs.SafeString(temp);
  } 
  else
  {
    return new hbs.SafeString("<h2>Ви ще не сформували жодного замовлення!</h2>")
  }  
}

function getNewsTitle(news)
{
  if(news)
  {
    var temp='<form id="deleteNewsForm" class="forms">'+
    '<select id="deleteNews" name="deleteNews">';
    for (var i = 0; i < news.length; i++) {
      temp+='<option value="'+news[i]._id+'">'+news[i].title+'</option>';
    }

    temp+='</select>'+
    '<div class="formButton">'+
    '<button type="submit" class="buttons" onclick="deleteMyNews()">Видалити новину</button>'+
    '</div>'+
    '</form>';
    return new hbs.SafeString(temp);
  }
}

module.exports = {
  ifUser,
  getServices,
  getOrder,
  getOrders,
  getNews,
  getNewsTitle
};