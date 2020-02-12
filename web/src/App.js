/*Conceitos básicos do React: 
> Componente : Bloco isolado de HTML CSS e JavaScript o qual não interfere no restante da aplicação.

> Propriedade : Informações que um componente pai passa para o componente filho

> Estado : Informações mantidas pelo componente (lembrar imutabilidade)
*/

import React, { useState, useEffect } from 'react';
import './services/api';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './Components/DevForm';
import DevItem from './Components/DevItem';

function App() {
  //Usamos o useState para gerenciar o estado das propriedades
  const [devs, setDevs] = useState([]);  

  //Usamos o UseEffect para gerenciar o comportamento do componente
  //O primeiro arumento é uma função, o segundo o espaço de tempo
  //No qual queremos que as ações da função sejam executadas, um array vazio
  //significa que só ira executar apenas uma vez dentro do ciclo de vida do componente

  //Este useEffect está carregando os dados dos devs para montar a lista
  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  /* Função asíncrona faz chamada para API passando os estados
  preenchidos para o end-point de cadastro de Dev */
  async function handleAddDev(data){    
    
    //Chamada a API para cadastro do Dev
    const response = await api.post('/devs',data);    

    /*Considerando o conceito de imutabilidade, temos que re-criar
    a informação, abaixo mantemos o conteúdo atual do array de devs e incluímos
    o dev recém cadastrado no final do mesmo */
    setDevs([...devs, response.data]);
  }

  //Esta marcação abaixo é JSX
  return (
    <div id="app">      
      <aside>      
        <strong>Cadastrar Dev</strong>
        {/*Componente DevItem*/}
        <DevForm onSubmit={handleAddDev}/>
      </aside>      
      
      <main>
        <ul>
          {devs.map(dev => (
            //Componente DevItem
             <DevItem key={dev._id} dev ={dev} />
          ))}          
        </ul>
      </main>
    
    </div>
  );
}

export default App;
