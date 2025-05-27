import { createAction, props } from '@ngrx/store';

export const setSearchInput = createAction('[Blog Component] SetSearchInput', props<{ input: string }>());
export const setOrderInput = createAction('[Blog Component] SetOrderInput', props<{ input: string }>());

export const setBothInputs = createAction(
    '[Blog Filter] Set Both Inputs',
    props<{ search: string; order: string }>()
);