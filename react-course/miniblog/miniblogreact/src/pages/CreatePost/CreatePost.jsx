import styles from './createPost.module.css'
import { useState } from 'react'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useAuthValue } from "../../context/authContext";
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const [ title, setTitle ] = useState('')
  const [ image, setImage ] = useState('')
  const [ body, setBody ] = useState('')
  const [ tags, setTags ] = useState([])
  const [ formError, setFormError ] = useState('')
  const navigate = useNavigate()

  const { insertDocument, response } = useInsertDocument('posts')
  const { user } = useAuthValue()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    // validate image url
    try {
      new URL(image)
    } catch (error) {
      setFormError('Insira uma URL válida')
      return
    } 
    
    // validate tags
    let tagsArray
    try {
      tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase())
      setTags(tagsArray)
    } catch (error) {
      setFormError('Insira as tags separadas por virgulas')
      return
    }

    // validate fields
    if (!title || !image || !body || !tags) {
      setFormError('Preencha todos os campos')
    }

    if (formError) return

    insertDocument({
      title,
      image,
      body,
      tagsArray, 
      uid: user.uid,
      createdBy: user.displayName  
    })

    // redirect to home page
    navigate('/')
  }

  return (
    <div className={styles.createPost}>
      <h1>Create POST</h1>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento.</p>
      <form onSubmit={ handleSubmit }>

        <label>
          <span>Título: </span>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder='Pense e mum bom titulo'
            onChange={ (e) => setTitle(e.target.value) }  
            value={title} 
          />
        </label>

        <label>
          <span>Imagem: </span>
          <input 
            type="text" 
            name="image" 
            required 
            placeholder='Insira a imagem'
            onChange={ (e) => setImage(e.target.value) } 
            value={image} 
          />
        </label>

        <label>
          <span>Conteúdo: </span>
          <textarea
            name="body"
            required
            placeholder='Escreva aqui'
            onChange={ (e) => setBody(e.target.value) }
            value={body}>
          </textarea>
        </label>

        <label>
          <span>Tags: </span>
          <input
            type="text"
            name="tags"
            required
            placeholder='Insira as tags separadas por virgulas'
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        { !response.loading && <button className='btn'> Publicar </button> }
        { response.loading && <button className='btn' disabled> Aguarde... </button> }
        { response.error && <p className='error'> {response.error} </p> } 
        { formError && <p className='error'> {formError} </p> } 
      </form>
    </div>
  )
}

export default CreatePost