import './Auth.css'

// components
import { Link } from 'react-router-dom'
import Message from '../../components/Message'

// hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../../slices/authSlice'
 
const Register = () => {

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')

  // allow to use redux functions
  const dispatch = useDispatch()
  // get states from specific state
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      passwordConfirmation: confirmPassword
    }

    dispatch(register(user))
  }

  // every time dispatch run update to solve problems
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id="register">
      <h2>React Gram</h2>
      <p>Cadastre-se para ver as fotos dos seus amigos.</p>
      
      <form onSubmit={ handleSubmit }>
        <input 
          type="text" 
          placeholder='Nome' 
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />
        <input 
          type="email" 
          placeholder='E-mail' 
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input 
          type="password" 
          placeholder='Senha' 
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          autoComplete='off'
        />
        <input 
          type="password" 
          placeholder='Confirme a senha' 
          value={ confirmPassword }
          onChange={ (e) => setConfirmPassword(e.target.value) }
          autoComplete='off'
        />
        {!loading && <button type='submit'>Cadastrar</button>}
        {loading && <button disabled type='submit'>Aguarde...</button>}
        {error && <Message msg={error} type='error' />}
      </form>

      <p>Já tem conta? 
        <Link to="/">&nbsp;Clique aqui</Link>
      </p>
    </div>
  )
}

export default Register