import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {IEstablishment} from "../../interfaces/";
import {establishmentService} from "../../services/";


interface IState {
    data: { establishments: IEstablishment[], count: number, maxCheck: number },
    dataByUser: {establishments: IEstablishment[], count: 0}
}

let initialState: IState = {
    data: {establishments: [], count: 0, maxCheck: 0},
    dataByUser: {establishments: [], count: 0},
}

const getAllEstablishments = createAsyncThunk(
    'establishmentSlice/getAll',
    async (arg: {
        page?: number | null, limit?: number | null,
        title?: string | null,
        sort?: string | null,
        type?: string | null,
        filterByRating?: string | null,
        filterByCheck?: string | null,
        pending?: boolean | null,
        approved?: boolean | null,
        rejected?: boolean | null,
        prevData?: IEstablishment[] | null
    }, {rejectWithValue}) => {
        try {
            const {page,title,sort,type,filterByRating,filterByCheck,pending,approved,rejected, limit} = arg;
            const {data} = await establishmentService.getAll({page, limit, title,sort,type,filterByRating,filterByCheck,pending,approved,rejected});
            if(arg.prevData){
                return {...data, establishments:[...arg.prevData,...data.establishments]}
            }
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data);
        }
    }
)


const getAllEstablishmentsByUserID = createAsyncThunk(
    'establishmentSlice/getAllByUserId',
    async (arg: {
        page?: number | null,
        limit?: number | null,
        pending?: boolean | null,
        approved?: boolean | null,
        rejected?: boolean | null,
        id:number,
        prevData?: IEstablishment[] | null
    }, {rejectWithValue}) => {
        try {
            const {page, limit,pending,approved,rejected, id} = arg;
            const {data} = await establishmentService.getAllByUserId({page,pending,limit,approved,rejected}, id);
            if(arg.prevData){
                return {...data, establishments:[...arg.prevData,...data.establishments]}
            }
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data);
        }
    }
)


const establishmentSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllEstablishments.fulfilled, (state, {payload}) => {
                state.data = payload
            })
            .addCase(getAllEstablishmentsByUserID.fulfilled, (state, {payload}) => {
                state.dataByUser = payload
            })
    },

});

const {reducer: establishmentReducer} = establishmentSlice;

const establishmentActions = {
    getAllEstablishments,
    getAllEstablishmentsByUserID
}

export {establishmentReducer, establishmentActions}