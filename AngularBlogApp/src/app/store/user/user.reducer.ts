import { createReducer, on } from '@ngrx/store';
import { login, logout } from './user.actions';




export const initialState = !!localStorage.getItem("accessToken");

export const userReducer = createReducer(
  initialState,
  on(login, () => { return true }),
  on(logout, () => { return false }),
);