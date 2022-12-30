import { useParams, Link } from "react-router-dom"
import { useFetch } from '../hooks/useFetch'

const Product = () => {
    const { id:productId } = useParams()
    const url = 'http://localhost:3004/products/'+productId
    const { data:product, loading, error } = useFetch(url)

    return (
    <div>
        { error && <p>Ocorreu um erro...</p> }
        { loading && <p>Carregando dados....</p> }
        { product && (
            <div>
                <h1>{product.name}</h1>
                <h3>R${product.price}</h3>
                {/* nested routes */}
                <Link to={`/products/${product.id}/info`}>Mais informacoes</Link>
            </div>
        )}
    </div>
    )
}

export default Product