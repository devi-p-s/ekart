import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

 export const fetchproducts=createAsyncThunk('allproducts/fetchproducts',async()=>{
const result=await axios.get('https://dummyjson.com/products')
localStorage.setItem("products",JSON.stringify(result.data.products))
return result.data.products
})
const Productslice =createSlice({
    name:"allproducts",
    initialState:{
        products:[],
        productsDummy:[],
        loading:false,
        error:""
    },
    reducers:{
        searchProducts:(state,action)=>{
            state.products=state.productsDummy.filter(item=>item.title.toLowerCase().includes(action.payload))
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchproducts.pending,(state)=>{
            state.loading=true
        }),
        builder.addCase(fetchproducts.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload 
            state.productsDummy=action.payload 

    }),
    builder.addCase(fetchproducts.rejected,(state)=>{
        state.loading=false
        state.products=[]
        state.productsDummy=[]

        state.error="api failed...please try after some time...."
})
    }
})
export const {searchProducts}=Productslice.actions
export default Productslice.reducer