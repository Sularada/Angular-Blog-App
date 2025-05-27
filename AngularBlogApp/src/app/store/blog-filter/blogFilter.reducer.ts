import { createReducer, on } from '@ngrx/store';
import { setBothInputs, setOrderInput, setSearchInput } from './blogFilter.actions';



export interface BlogFilterState {
    search: string;
    order: string;
}
export const initialState: BlogFilterState = { search: '', order: '' };
export const blogReducer = createReducer(
    initialState,
    on(setSearchInput, (state, { input }) => ({
        ...state,
        search: input
    })),

    on(setOrderInput, (state, { input }) => ({
        ...state,
        order: input
    })),

    on(setBothInputs, (state, { search, order }) => ({
        ...state,
        search,
        order
    }))
);