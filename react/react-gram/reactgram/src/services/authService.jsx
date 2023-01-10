// states
// http request
import { api, requestConfig } from '../utils/config'

// Register an user
const register = async (data) => {
   const config = requestConfig('POST', data)

   try {
        const response = await fetch(`${api}/users/register`, config)
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })

        if (response['token']) {
            localStorage.setItem('user',  JSON.stringify(response))
        }
        
        return response
   } catch (error) {
    console.log(error)
   }
}

// Logout an user
const logout = () => {
    localStorage.removeItem('user')
}

// Login an user
const login = async (data) => {
    const config = requestConfig('POST', data)

    try {
        const response = await fetch(`${api}/users/login`, config)
        .then((response) => response.json())
        .catch((error) => {
            throw error
        })

        if (response) {
            localStorage.setItem('user',  JSON.stringify(response))
        }
        return response
    } catch(error) {
        console.log(error)
    }
}

const authService = {
    register,
    logout,
    login
}

export default authService