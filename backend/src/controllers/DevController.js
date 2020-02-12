const axios = require('axios');
const Dev = require('../models/modelDev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//métodos padrão de qualquer api:
//index(lista), show(apenas um), store, update, destroy

module.exports = {

  async index(request, response){
    //find no mongodb sem filtro    
    const devs = await Dev.find({});
    //retorna os devs recuperados na resposta
    return response.json(devs);
  },

  async store(request, response) {
    //Obtem dados a partir do body da request
    const { github_username, techs, latitude, longitude } = request.body;

    //Antes de persistir validamos se já está cadastrado
    //Query no mongo retornando resultado da busca usando username
    let persistedDev = await Dev.findOne({ github_username });

    //caso seja null, ou seja, se a busca acima NÃO retornar valores persite um novo dev
    if(!persistedDev){

      //Com nome de usuario GitHub obtido na request solicitamos os dados do dev para a API do github
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
      //Desestruturação dos dados do apiResponse object
      const { name = login, avatar_url, bio} = apiResponse.data;
    
      //Desestruturação das tecnologias vindas do request
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    
      //persiste o dev no bd
        persistedDev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
        location
      });
    }
    else
    {
      return response.json({"response" : "O dev já está cadastrado!"});
    }    
  
    //retorna dados persistidos
    return response.json(persistedDev);      
  },

  //TO-DO async show (request, resposse)

  //TO-DO async update (request, resposse)
  async update(request, response){
    
    //obter dados a serem alterados a partir do request
    const {techs, latitude, longitude, github_username} = request.body;
    const techsArray = parseStringAsArray(techs);

    console.log(request.body);

    //Update apenas se _id true
    if(github_username)
    {
      var update = {
        $set : { 
          techs: techsArray ,
          latitude,
          longitude
        } };

      const updatedDev = await Dev.findOneAndUpdate(github_username, update, {new : true});

      return response.json(updatedDev);
    }
    else
    {
      return response.json({"response" : "Nada a atualizar"});
    }   

  }

  //TO-DO async destroy (request, resposse)

};