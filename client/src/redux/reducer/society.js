import { createSlice } from "@reduxjs/toolkit";

const societySlice = createSlice({
    name: 'society',
    initialState: {
        isFetching: false,
        error: null,
        societies: [],
        archived: [],
        stats: [],
        currentSociety: null,
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null; },
        end: (state) => { state.isFetching = false },
        error: (state, action) => { state.isFetching = false; state.error = action.payload; },

        getSocietyReducer: (state, action) => { state.currentSociety = action.payload },
        getSocietiesReducer: (state, action) => { state.societies = action.payload },
        createSocietyReducer: (state, action) => { state.societies = [action.payload, ...state.societies] },
        updateSocietyReducer: (state, action) => { state.societies = state.societies.map(s => s = s._id == action.payload._id ? action.payload : s) },
        deleteSocietyReducer: (state, action) => { state.societies = state.societies.filter(s => s._id != action.payload._id) },
        archiveSocietyReducer: (state, action) => {
            const society = action.payload
            state.societies = state.societies.filter(p => p._id != society._id)
            state.archived = state.archived.concat(society);
        },
        unarchiveSocietyReducer: (state, action) => {
            const society = action.payload
            state.archived = state.archived.filter(p => p._id != society._id)
            state.societies = state.societies.concat(society);
        },
    }
})

export const { start, end, error, getSocietyReducer, getSocietiesReducer, archiveSocietyReducer, unarchiveSocietyReducer, getUserAssignedSocietiesStatsReducer, createSocietyReducer, updateSocietyReducer, deleteSocietyReducer, } = societySlice.actions
export default societySlice.reducer