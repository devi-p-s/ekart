import { configureStore } from "@reduxjs/toolkit";
import Productslice from "../slice/Productslice";

import WishlistSlice from "../slice/WishlistSlice";
import Cartslice from "../slice/Cartslice";

const Cartstore=configureStore({
    reducer:{
productReducer:Productslice,
WishlistReducer:WishlistSlice,
cartReducer:Cartslice
    }
})
export default Cartstore