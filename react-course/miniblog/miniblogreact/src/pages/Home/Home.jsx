// css
import styles from './Home.module.css'

// react
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

// components
import PostDetails from '../../components/PostDetails'

const Home = () => {

  const Navigate = useNavigate()
  const [ query, setQuery ] = useState('')
  const { documents:posts } = useFetchDocuments('posts')


  const handleSubmit = (e) => {
    e.preventDefault()

    if (query) {
      return Navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>

      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Pesquise por tags" onChange={
          (e) => setQuery(e.target.value)
        } />
        <button type="submit" className='btn btn-dark'>Pesquisar</button>
      </form>

      <div className='posts'>
        {posts && posts.map(post => (
          <PostDetails key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <h2>Nenhum post encontrado...</h2>
            <Link to='/posts/create' className='btn'>
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home