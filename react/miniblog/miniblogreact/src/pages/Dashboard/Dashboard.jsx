import styles from './dashboard.module.css'

import { Link } from 'react-router-dom'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

// hooks
import { useAuthValue } from '../../context/authContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'


const Dashboard = () => {

  const { user } = useAuthValue()
  const uuid = user.uid

  const { documents:posts } = useFetchDocuments('posts', null, uuid)

  const { deleteDocument } = useDeleteDocument('posts')

  return (
    <div>
        <h2>
          Dashboard
        </h2>
        <p> Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
          <>
            <p> Não foram encontrados posts.</p>
            <Link to="/posts/create" className='btn btn-outline'>
              Criar primeiro post
            </Link>
          </>
        ) :
        (
          <div className={styles.dashboard}>
            <div className={styles.post_header}>
              <span>Título</span>
              <span>Ações</span>
            </div>
            {posts && posts.map(post => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                  Ver
                </Link>
                <Link to={`/posts/${post.id}/edit`} className="btn btn-outline">
                  Editar
                </Link>
                <button className="btn btn-outline btn-danger" onClick={ () => deleteDocument(post.id) }>
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default Dashboard