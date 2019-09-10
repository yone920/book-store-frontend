import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import categoriesReducer from "./categoriesReducer";
import userReducer from "./userReducer";
import productsReducer from "./productsReducer";
import singleProductReducer from "./singleProductReducer"
import singleCategoryReducer from "./singleCategoryReducer"

export default combineReducers({
    cart: cartReducer,
    categories: categoriesReducer,
    current_site_user: userReducer,
    products: productsReducer,
    product: singleProductReducer,
    category: singleCategoryReducer
});
