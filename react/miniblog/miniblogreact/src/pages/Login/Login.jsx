import { useEffect, useState } from 'react'
import { useAutentication } from '../../hooks/useAutentication'

import styles from './login.module.css'


const Login = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [error, setError] = useState('')


  const { login, error: authError, load: loading } = useAutentication()

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    await login({ email, password })

    // const user = {
    //   displayName,
    //   email,
    //   password,
    //   confirmPassword
    // }

    // if (password !== confirmPassword) {
    //   setError('As senhas precisam ser iguais!')
    //   return
    // }

    // await createUser(user)
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Faça login para poder utilizar o sistema.</p>
        <h2>
          <form onSubmit={ submit }>

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

            {!loading && <button className='btn' type="submit">Entrar</button>}
            {loading && <button className='btn' type="submit" disabled>Aguarde...</button>}
            {error && <p className="error">{error}</p>}
          </form>
        </h2>
    </div>
  )
}

export default Login