import './App.css';

import { useState } from 'react'
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3004/products"

function App() {
  // custom hook 
  const { data: items, httpConfig, loading, error } = useFetch(url)

  const [name,setName] = useState("")
  const [price,setPrice] = useState("")

  // delete
  const handleDelete = async (id) => {
    httpConfig(id, "DELETE")
  }

  // add new data
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price
    }

    httpConfig(product, "POST")

    setName("")
    setPrice("")
  }
  
  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      { loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p> }
      { !loading && 
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>{product.name} - {product.price} - 
          <button onClick={ (e) => handleDelete(product.id) }>Deletar</button></li>
        ))}
      </ul> }
      
      <div className='addProducts'>
        <form onSubmit={handleSubmit}>
          <label>
            Nome
            <input type="text" name="name" value={name} onChange={ (e) => setName(e.target.value) } />
          </label>
          <label>
            Preço
            <input type="number" name="price" value={price} onChange={ (e) => setPrice(e.target.value) } />
          </label>
          { !loading && <input type="submit" />}
        </form>
      </div>

    </div>
  );
}

export default App;
