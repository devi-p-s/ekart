import React from 'react'
import { Link } from 'react-router-dom'

import {useSelector,useDispatch} from 'react-redux';
import { emptycart, removefromcart } from '../slice/Cartslice';
import { useState } from 'react';
import { useEffect } from 'react';


function Cart() {
 
  const cart = useSelector((state) => state.cartReducer.cart);

  const dispatch=useDispatch()
  const[total,setTotal]=useState(0)
  useEffect(()=>{
    if(cart?.length>0){
      setTotal(cart.map(product=>product?.totalprice).reduce((p1,p2)=>p1+p2))
    }
    else{
setTotal(0)
    }
  },[cart])
  return (
    <div className='container' style={{ marginTop: "100px" }}>
      {cart?.length>0?
        <div className='row mt-5'>
        <div className='col-lg-8'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  { 
    cart?.map((product, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{product?.title}</td>
        <td>
          <img 
            style={{ width: "300px", height: "300px" }} 
            src={product?.thumbnail}
            alt="Product Image" 
          />
        </td>
        <td><input type="text" readOnly value={product.quantity} style={{width:"25px"}}/></td>
        <td className='text-danger fw-bolder'>{product.totalprice}</td>
        <td>
          <button className="btn btn-danger" onClick={()=>dispatch(removefromcart(product.id))}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    ))
  }
</tbody>

          </table>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-danger' onClick={()=>dispatch(emptycart())}>Empty cart</button>
            <Link to={'/'} style={{ textDecoration: "none" }} className='btn btn-success'>
              Show more
            </Link>
          </div>
        </div>

        <div className='col-lg-1'></div>

        <div className='col-lg-3'>
          <div className='container border rounded shadow mt-5 p-5 w-100'>
            <h1>Cart Summary</h1>
            <h4>Total products: {cart?.length}</h4>
            <h5>Total: <span className='text-danger fw-bolder '>{total}</span></h5>
          </div>
          <div className='d-grid'>
            <button className='btn btn-success m-3 rounded'>Checkout</button>
          </div>
        </div>
      </div>: <div className='d-flex align-items-center mt-5'>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt=""/>
            <h1 className='text-danger'>your cart is empty...</h1>
          </div>
          }
    </div>
  )
}

export default Cart
