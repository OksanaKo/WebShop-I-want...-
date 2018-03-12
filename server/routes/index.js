var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {

  app.get('/', require('./mainpage').get);



  app.get('/login', checkAuth.isUnAuth, require('./login').get);
  app.post('/login', checkAuth.isUnAuth, require('./login').post);

  app.get('/logout', require('./logout').get);

  app.get('/register', checkAuth.isUnAuth, require('./register').get);
  app.post('/register', checkAuth.isUnAuth, require('./register').post);

	app.get('/services', require('./services').get);  
	app.get('/news', require('./news').get);  

	app.get('/addService', checkAuth.isAdmin, require('./addService').get);  
	app.post('/addService', checkAuth.isAdmin, require('./addService').post);

	app.get('/adminNews', checkAuth.isAdmin, require('./adminNews').get);    
	app.post('/adminNews', checkAuth.isAdmin, require('./adminNews').post);    
	app.delete('/adminNews/:id', checkAuth.isAdmin, require('./adminNews').delete);    

	app.get('/shoppingCart', checkAuth.isAuth, require('./shoppingCart').get);  
	app.post('/shoppingCart', checkAuth.isAuth, require('./shoppingCart').post);  
	app.put('/shoppingCart/:type', checkAuth.isAuth, require('./shoppingCart').put);  
	app.delete('/shoppingCart', checkAuth.isAuth, require('./shoppingCart').delete);  


	app.get('/history/:state', checkAuth.isAuth, require('./history').get);  
	
	app.get('/sortBy/:sortParam/:to',  require('./sortBy').get);  
	app.get('/getMoreServices/:from',  require('./getMoreServices').get);  
};
