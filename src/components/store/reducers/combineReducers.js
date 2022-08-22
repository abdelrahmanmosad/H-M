import { combineReducers } from "redux";

import favReducre from './fav';
import cartReducer from "./cart";

export default combineReducers({
    fav:favReducre,
    cart:cartReducer
})