import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../services/authService"

const user = JSON.parse(localStorage.getItem('user'))

// first state of the redux
const initialState = {

    //states
    user: user ? user : null,
    error: false,
    success: false,
    loading: false
}

// Register an user and sigin
export const register  = createAsyncThunk('auth/register', 
    async (user, thunkAPI) => {
        const data = await authService.register(user)
        // check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[1])
        }
        return data
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // actions
        reset: (state) => {
            state.loading = false
            state.error = false
            state.success = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer