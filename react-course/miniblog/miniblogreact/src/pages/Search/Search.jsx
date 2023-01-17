import { useQuery } from '../../hooks/useQuery'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { Link } from 'react-router-dom'
import PostDetails from '../../components/PostDetails'

import styles from './search.module.css'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const { documents: posts } = useFetchDocuments('posts', search)

    return (
        <div>
            <h1>Resultado da busca</h1>
            <div className={styles.posts}>
                {posts && posts.length === 0 && (
                    <>
                        <p>Não foram encontrados posts a partir da sua busca...</p>
                        <Link to="/" className="btn btn-dark">
                            Voltar
                        </Link>   
                    </>   
                )}
                {posts && posts.map(post => (
                    <PostDetails key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Search