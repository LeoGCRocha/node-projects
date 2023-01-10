import './Auth.css'

import { Link } from 'react-router-dom'
import Message from '../../components/Message'

// hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login,reset } from '../../slices/authSlice'

const Login = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const { loading, error } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email, password
    }

    dispatch(login(user))
  }

  // Clear all states
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id="login">
      <h2>React Gram</h2>
      <p className='subtitle'>Faça login para ver o que há de novo.</p>

      <form onSubmit={handleSubmit}>
        <input type="email" 
          placeholder="E-mail" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          value={email}
        />

        <input type="password" 
          autoComplete='false' 
          placeholder="Senha" 
          required
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
        {!loading && <button type='submit'>Entrar</button>}
        {loading && <button disabled type='submit'>Aguarde...</button>}
        {error && <Message msg={error} type='error' />}
      </form>
      <p>Não tem uma conta? <Link to={`/register`}> Cliquei aqui </Link></p>
    </div>
  )
}

export default Login