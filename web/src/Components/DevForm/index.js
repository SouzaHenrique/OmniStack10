import React, { useState, useEffect } from 'react';

import './style.css'
import DevItem from '../DevItem';

function DevForm({ onSubmit }){
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  //Este useEffect está obtendo os dados de geolocalização
  useEffect(() => {

    //Acessando API de geolocalização nativa do browser para obter latitude e longitude
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude} = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    },
    (err) =>{
      console.log(err); //Tratamento de erro.
    },
    {
      timeout: 30000, //Parâmetro opcional, timeout para aguardar o tempo especificado
    },
    ); 
  }, []);
  
//Esta função manipula a funlçao handleAddDev que está vindo do componente pai
async function handleSubmit(e){
  e.preventDefault();

  await onSubmit({
    github_username,
    techs,
    latitude,
    longitude,
  });

  //Limpa os campos
  setGithub_username('');
  setTechs('');

}

//JSX
return (
  <form onSubmit={handleSubmit}>
    <div className='input-block'>
      <label htmlFor="github_username">Usuário do Git</label>
      <input 
      name="github_username" 
      id="github_username" 
      required
      value={github_username}
      onChange={e => setGithub_username(e.target.value)}
      />
    </div>

    <div className="input-block">
      <label htmlFor="techs">Tecnologias</label>
      <input 
      name="techs" 
      id="techs" 
      required
      value={techs}
      onChange={e => setTechs(e.target.value)}
      />
    </div>       

    <div className="input-group">
      <div className="input-block">
        <label htmlFor="latitude">Latitude</label>
        <input 
        name="latitude" 
        id="latitude" 
        required 
        value={latitude}
        onChange={e => setLatitude(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="longitude">Longitude</label>
        <input 
        name="longitude" 
        id="longitude" 
        required 
        value={longitude}
        onChange={e => setLatitude(e.target)}
        />                
      </div>
    </div>          
    <button type="submit">Salvar</button>
  </form>
);
}

export default DevForm;