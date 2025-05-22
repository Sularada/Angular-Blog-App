import { createReducer, on } from '@ngrx/store';
import { login, logout} from './user.actions';



    
export const initialState =  localStorage.getItem("accessToken") !==''?true:  false;

export const userReducer = createReducer(
  initialState,
  on(login, (state:Boolean) =>{ return  true} ),
  on(logout, (state:Boolean) =>{ return false }),
);