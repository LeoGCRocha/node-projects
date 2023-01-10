import { api, requestConfig } from '../utils/config'

// Get user details
const profile = async (data, token) => {
    const config = requestConfig("GET", data, token)
    
    try {
        const response = await fetch(`${api}/users/profile`, config)
                        .then(res => res.json())
                        .catch(err => { throw err })
        return response
    } catch (error) {
        console.log(error)
    }
}

// Update user details
const updateProfile = async (data, token) => {
    // true to set content type to multipart/form-data
    const config = requestConfig("PUT", data, token, true)
    
    try {
        console.log(data)
        const response = await fetch(`${api}/users/update`, config)
                        .then(res => res.json())
                        .catch(err => { throw err })
        return response
    } catch (error) {
        console.log(error)
    }
}

// Get user details
const getUserDetails = async (id) => {
    const config = requestConfig("GET")

    try {
        const response = await fetch(`${api}/users/${id}`, config)
                        .then((res) => res.json())
                        .catch(err => { throw err })
        return response
    } catch(error) {
        console.log(error)
    }
}

const userService = {
    profile,
    updateProfile,
    getUserDetails
}

export default userService