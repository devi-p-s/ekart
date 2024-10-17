import {createSlice } from "@reduxjs/toolkit";
const WishlistSlice=createSlice({
    name:"wishlist",
    initialState:{
        wishlist:[]
    },
    reducers:{
        addtowishlist:(state,action)=>{
          state.wishlist.push(action.payload)
        },
        removefromwishlist:(state,action)=>{
            state.wishlist= state.wishlist.filter(item=>item.id!=action.payload)
        }
    }
})
export const{addtowishlist,removefromwishlist}=WishlistSlice.actions

export default WishlistSlice.reducer