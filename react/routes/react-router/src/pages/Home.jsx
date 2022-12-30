import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

import './Home.css'

const Home = () => {
  const url = 'http://localhost:3004/products'
  const { data: items, error } = useFetch(url)

  return (
    <div>
      <h1>Products</h1>
      { error && <p>{ error} </p> }
      <ul className='products'>
        { items && items.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <Link to={`/products/${product.id}`} >Detalhes</Link>
          </li>
        )) }
      </ul>
    </div>
  )
}

export default Home