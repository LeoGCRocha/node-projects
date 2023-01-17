import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import photoService from '../services/photoService'

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

// functions
export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(publishPhoto.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(publishPhoto.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.photo = action.payload
                state.photos.unshift(state.photo)
                state.message = 'Photo was been published successfully'
            })
            .addCase(publishPhoto.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.photo = {}
            })
            .addCase(getUserPhotos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserPhotos.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.photos = action.payload
            })
            .addCase(deletePhoto.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.photos = state.photos.filter((photo) => { 
                    return photo._id !== action.payload.id
                })
                state.message = action.payload.message
            })

            .addCase(updatePhoto.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.photos.map((photo) => {
                    if (photo._id === action.payload.id) {
                        photo.title = action.payload.title
                    }
                    return photo
                })
                state.message = action.payload.message
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.photo = {}
            })
            .addCase(getPhotoById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPhotoById.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.photo = action.payload
            })
            .addCase(like.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(like.fulfilled, (state, action) => {
                state.loading = false 
                state.success = true 
                state.error = null 

                if (state.photo.likes) {
                    state.photo.likes.push({ userId: action.payload.userId })   
                }

                state.photos.map((photo) => {
                    if (photo._id === action.payload.photoId) {
                        photo.likes.push(action.payload.userId)
                    }
                    return photo
                })
                state.message = action.payload.message
            })
            .addCase(comment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(comment.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.photo.comments.push(action.payload.comment)
                state.message = action.payload.message
            })
            .addCase(getAllPhotos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllPhotos.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.photos = action.payload
            })
            .addCase(photoByTitle.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(photoByTitle.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.photos = action.payload
            })
    }
})

// publish user photo
export const publishPhoto = createAsyncThunk(
    'photo/publishPhoto',
    async(photo, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await photoService.publishPhoto(photo, token)
        
        // check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    },
)

// get user photos
export const getUserPhotos = createAsyncThunk(
    'photo/userphotos',
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await photoService.getUserPhotos(id, token)
        return data
    }
)

export const updatePhoto = createAsyncThunk(
    'photo/updatephoto',
    async(photoData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        // update photo
        let data
        try { 
            data = await photoService.updatePhoto({
                title: photoData.title,
            }, photoData.id, token)
        } catch (error) {
            console.log(error)
        }
        
        // check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

export const getPhotoById = createAsyncThunk(
    'photo/getphotobyid',
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await photoService.getPhotoById(id, token)
        return data
    }
)

export const deletePhoto = createAsyncThunk(
    'photo/deletephoto',
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await photoService.deletePhoto(id, token)

        // check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

export const like = createAsyncThunk(
    'photo/like',
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await photoService.like(id, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

export const comment = createAsyncThunk(
    'photo/comment',
    async(commentData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token   
        const data = await photoService.comment({ comment: commentData.comment }, commentData.id, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

export const getAllPhotos = createAsyncThunk(
    'photo/getallphotos',
    async(_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await photoService.getAllPhotos(token)
        return data
    }
)

export const photoByTitle = createAsyncThunk(
    'photo/search',
    async(query, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await photoService.photoByTitle(query, token)
        return data
    }
)

export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer