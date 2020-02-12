/* Anotações aula
>Métodos HTTP: GET, POST, PUT, DELETE
>Tipos de parâmetro:
Query Params : request.query (filtros, ordenação, paginação, etc)
Route Params : request.params (indentificar um recurso na alteração ou remoção)
Body : Dados para criação ou alteração de um registro
*/

//Importando express e mongose
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

//instanciado express
const app = express();

//Conexao com MongoDb
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

//Faz com que as rotas entendam JSON - .use significa todas as rotas.
app.use(express.json());
//Importa rotas para este arquivo
app.use(routes);

//Usando cors
app.use(cors({origin: 'http://localhost:3000'}));

//definindo porta a ser usada pelo app
app.listen(3333);