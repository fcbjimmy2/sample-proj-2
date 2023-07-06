// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    total: 0,
    rows: [],
};

const slice = createSlice({
    name: 'datatable',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET ROWS
        getRowsSuccess(state, action) {
            if (action.payload.total) {
                state.total = action.payload.total;
                state.rows = action.payload.rows;
            } else {
                state.rows = action.payload;
            }
        },
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getRows(url, params) {
    return async () => {
        try {
            const response = await axios.get(url, {params});
            if (Array.isArray(response.data) || typeof response.data === 'object') {
                dispatch(slice.actions.getRowsSuccess(response.data));
            } else {
                dispatch(slice.actions.hasError('An unexpected error occurred'));
            }
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
