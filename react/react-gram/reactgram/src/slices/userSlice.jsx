import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    user: {},
    error: false,
    loading: false,
    success: false,
    message: null
}

export const profile = createAsyncThunk(
    'user/profile',
    async (user, thunkAPI) => {
        const token  = thunkAPI.getState().auth.user.token
        const data = await userService.profile(user, token)
        return data
    }
)

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (user, thunkAPI) => {
        const token  = thunkAPI.getState().auth.user.token
        const data = await userService.updateProfile(user, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }
        
        return data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(profile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = false
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
                state.message = 'Profile updated successfully'
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.user = {}
            })
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
            })
    }
})

export const getUserDetails = createAsyncThunk(
    'user/get',
    async (id, thunkAPI) => {
        const data = await userService.getUserDetails(id)
        return data
    }
)


export const { resetMessage } = userSlice.actions
export default userSlice.reducer    