const Dev = require('../models/modelDev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response){
    //Buscar todos os devs num raio de 10km
    const { latitude, longitude, techs } = request.query;

    const techsArrays = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs : {$in : techsArrays}, 
      location : {
        $near:{
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },     
    });

    //Filtrar por tecnologias
    return response.json({ devs });
  }
}