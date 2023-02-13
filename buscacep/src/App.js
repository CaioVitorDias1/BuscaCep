
import "./index.css";
import "./style.css";
import {FiSearch} from "react-icons/fi";
import {useState} from "react";
import api from "./services/api";


function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({})

async function handleSearch () {
    if(input === ''){
      alert("Preencha com um cep")
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    }catch{
      alert("Erro de busca")
      setInput('')
    }
  }

  return (
    <div className="container">
      
      <h1 className="title">Buscador de CEP</h1>
      
      <div className="containerInput">
        <input type="text"
        placeholder="digite seu cep"
        value={input}
        onChange={(event) => setInput(event.target.value) }
        />
      
        <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && ( <main className="main">
        <h2>
          Cep: {cep.cep}
        </h2>

        <span>
          {cep.logradouro}
        </span>

        <span>
          complemento: {cep.complemento}
        </span>

        <span>
          {cep.bairro}
        </span>

        <span>
          {cep.localidade} - {cep.uf}
        </span>
      </main>)}
       
      
      
    </div>
  );
}

export default App;
