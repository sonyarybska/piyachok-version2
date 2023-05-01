import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {authService} from "../../services/";
import {IClientId, IUser} from "../../interfaces/";


interface IState {
    user: IUser | null,
    error: any | null
}

let initialState: IState = {
    user: null,
    error: null,
}

const getLoginUser = createAsyncThunk(
    'userSlice/getLoginUser',
    async (arg: IClientId, {rejectWithValue}) => {
        try {
            const {data} = await authService.login(arg);
            localStorage.setItem('access_token', data.tokens.access_token)

            return data.user;
        } catch (e: any) {
            return rejectWithValue(e.response.data);
        }
    }
)

const logoutUser = createAsyncThunk(
    'userSlice/logoutUser',
    async (_, {rejectWithValue}) => {
        try {

            await authService.logout();

            localStorage.removeItem('access_token');
            return null;
        } catch (e: any) {
            return rejectWithValue(e.response.data);
        }
    }
)

const refreshUser = createAsyncThunk(
    'userSlice/refreshUser',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.refresh();

            localStorage.setItem('access_token', data.tokens.access_token);

            return data.user;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(e.response.data);
        }
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getLoginUser.fulfilled, (state, {payload}) => {
                state.user = payload
            })
            .addCase(logoutUser.fulfilled, (state, {payload}) => {
                state.user = payload;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.error.message;
            })

    },

});

const {reducer: userReducer} = userSlice;

const userActions = {
    getLoginUser,
    logoutUser,
    refreshUser
}

export {userReducer, userActions}