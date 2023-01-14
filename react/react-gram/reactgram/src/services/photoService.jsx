import { api, requestConfig } from '../utils/config'

// Publish an user photo
const publishPhoto = async (data, token) => {
    const config = requestConfig("POST", data, token, true)
    try {
        const response = await fetch(`${api}/photos`, config)
                         .then(res => res.json())
                         .catch((error) => { throw error })
        return response
    } catch (error) {
        console.log(error)
    }
}

// Get user photos
const getUserPhotos = async(id, token) => {
    const config = requestConfig('GET', null, token)

    try {
        const response = await fetch(`${api}/photos/user/${id}`, config)
                        .then((res) => res.json())
                        .catch((error) => { throw error })
        return response
    } catch (error) {
        console.log(error)
    }
}

const deletePhoto = async(id, token) => {
    const config = requestConfig('DELETE', null, token)
    try {
        const response = await fetch(`${api}/photos/${id}`, config)
                        .then((res) => res.json())
                        .catch((error) => { throw error })
        return response
    } catch(error) {
        console.log(error)
    }
}

const updatePhoto = async(data, id, token) => {
    const config = requestConfig('PUT', data, token)
    try {
        const response = await fetch(`${api}/photos/${id}`, config)
                        .then((res) => res.json())
                        .catch((error) => { throw error })
        return response
    } catch (error) {
        console.log(error)
    }
}

const getPhotoById = async(id, token) => {
    const config = requestConfig('GET', null, token)
    try {
        const response = await fetch(`${api}/photos/${id}`, config)
                        .then((res) => res.json())
                        .catch((error) => { throw error })
        return response
    } catch (error) {
        console.log(error)
    }
}

const like = async(id, token) => {
    const config = requestConfig('PUT', null, token)
    try {
        const response = await fetch(`${api}/photos/like/${id}`, config)
                                .then((res) => res.json())
                                .catch((err) => { throw err })
        return response
    } catch(error) {
        console.log(error)
    }
}

const comment = async(data, id, token) => {
    const config = requestConfig('PUT', data, token)
    try {
        const response = await fetch(`${api}/photos/comment/${id}`, config)
                        .then((res) => res.json())
                        .catch((err) => { throw err })
        return response
    } catch (error) {
        console.log(error)
    }
}

const getAllPhotos = async(token) => {
    const config = requestConfig('GET', null, token)
    try {

        const response = await fetch(`${api}/photos`, config)
                        .then((res) => res.json())
                        .catch((err) => { throw err })
        return response
    } catch (error) {
        console.log(error)
    }
}

const photoByTitle = async(query, token) => {
    const config = requestConfig('GET', null, token)

    try {
        const response = await fetch(`${api}/photos/search?q=${query}`, config)
                        .then((res) => res.json())
                        .catch((err) => { throw err })
        return response
    } catch (error) {
        console.log(error)
    }
}

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhotoById,
    like,
    comment,
    getAllPhotos,
    photoByTitle
}
export default photoService