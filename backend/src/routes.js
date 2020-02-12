//Obtendo o módulo de rotas do express
const { Router } = require('express');
const routes = Router();
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

//List End-point
routes.get('/devs', DevController.index);

//Create End-point
routes.post('/devs', DevController.store);

//Update End-point
routes.put('/updateDev',DevController.update);

//Rota de busca mobile
routes.get('/search',SearchController.index);


module.exports = routes;