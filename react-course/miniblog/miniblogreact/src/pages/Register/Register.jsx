import styles from './register.module.css'
import { useState, useEffect } from 'react'
import { useAutentication } from '../../hooks/useAutentication'

const Register = () => {

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [error, setError] = useState('')

  const { createUser, error: authError, load: loading } = useAutentication()

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    const user = {
      displayName,
      email,
      password,
      confirmPassword
    }

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais!')
      return 
    } 
    
    await createUser(user)
  }
  
  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usário compartilhe suas histórias...</p>
      <form onSubmit={submit} className={styles.register}>
        <label>
          <span>Nome: </span>
          <input 
            type="text" 
            name="display-name" 
            required 
            placeholder="Nome do usuário"
            onChange={(e) => { setDisplayName(e.target.value) }}
          />
        </label>

        <label>
          <span>Email: </span>
          <input 
            type="email" 
            name="email" 
            required 
            placeholder="Email do usuário" 
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </label>

        <label>
          <span>Senha: </span>
          <input 
            type="password" 
            name="password" 
            autoComplete="on" 
            required 
            placeholder="Senha do usuário" 
            onChange={(e) => { setPassword(e.target.value) }}
        />
        </label>

        <label>
          <span>Confirme a senha: </span>
          <input 
            type="password" 
            name="new-password" 
            autoComplete="on" 
            required 
            placeholder="Confirme a senha do usuário" 
            onChange={(e) => { setconfirmPassword(e.target.value) }}  
          />
        </label>

        {!loading && <button className='btn' type="submit">Cadastrar</button>}
        {loading && <button className='btn' type="submit" disabled>Aguarde...</button>}

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register