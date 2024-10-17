import { createSlice } from "@reduxjs/toolkit";


const cartslice = createSlice({
  name: "cart",
  initialState: {
    cart: [] // This stores your cart items
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(item => item.id === action.payload.id);

      if (existingProduct) {
        // Update the quantity and total price of the existing product
        existingProduct.quantity += 1;
        existingProduct.totalprice = existingProduct.price * existingProduct.quantity;
      } else {
        // Add new product to the cart with initial quantity and total price
        state.cart.push({ 
          ...action.payload, 
          quantity: 1, 
          totalprice: action.payload.price 
        });
      }
    },
    removefromcart: (state, action) => {
      // Filter out the product from the cart by id
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    emptycart:(state)=>{
      return state=[]
    }
  }
});

export const { addToCart, removefromcart,emptycart } = cartslice.actions;
export default cartslice.reducer;
