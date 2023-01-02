import { Link } from 'react-router-dom'
import styles from './postDetails.module.css'

const PostDetails = ({ post }) => {
  return (
    <div className={styles.posts_details}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className={styles.createdby}>{post.createdBy}</p>
        <div className={styles.tags}>
            {post.tagsArray.map(tag => (
                <p key={tag}>
                    <span>#</span>
                    {tag}
                </p>
            ))}
        </div>
        <Link to={`/posts/${post.id}`}>
            <p className='btn btn-outline'>Ler</p>
        </Link>
    </div>
  )
}

export default PostDetails