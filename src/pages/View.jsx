import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Spinner } from 'react-bootstrap'; // Properly import Row and Col
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addtowishlist } from '../slice/WishlistSlice';
import { addToCart } from '../slice/Cartslice';

function View() {
  const {id}=useParams()
  console.log(id);
  const{loading}=useSelector((state)=>state.productReducer)
  const cart = useSelector((state) => state.cartReducer.cart);
  const[product,setProducts]=useState({})
  const dispatch=useDispatch()
  const handlewishlist=(product)=>{
    const existingproducts = wishlist.find(item => item?.id === product?.id)
 
     if(existingproducts){
       alert("product already exist")
     }
     else{
       dispatch(addtowishlist(product))
     }
   }

   const handleCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    // Ensure you're accessing cart array correctly
  
    if (existingProduct) {
      dispatch(addToCart(product)); // Increase quantity if already in cart
      alert("Item quantity updated");
    } else {
      dispatch(addToCart(product)); // Add new product to cart
      alert("Item added to cart");
    }
  }
  
  useEffect(()=>{
    const products=JSON.parse(localStorage.getItem("products"))
    setProducts(products?.find(product=>product?.id==id))
  },[])
console.log(product);
  return (
  
   <div className='mt-5'>
    {
      loading?<div>
    
      <Spinner animation="border" variant="warning" /> loading...
    
      </div>: <div className='container' style={{ marginTop: '100px' }}> {/* Use Bootstrap's container class */}
      <Row>
        {/* First Column with Image */}
        <Col lg={4}>
          <img
            style={{ width: '100%', height: '400px' }}
            src={product.thumbnail}
            alt=""
          />
        </Col>
        
        {/* Empty Column for spacing */}
        <Col lg={2}></Col>

        {/* Product Details Column */}
        <Col lg={6}>
          <p>pid:{product?.id}</p>
          <h1>{product?.title}</h1>
          <h5 className='fw-bolder'>
            Price: <span style={{ color: 'red' }}>{product.price}</span>
          </h5>
          <p>
            {product?.description}   </p>

          <div className='d-flex justify-content-between mt-4'>
            {/* Wishlist Button */}
            <Button  onClick={()=>handlewishlist(product)} className='btn btn-outline-dark'>
              <i className="fa-solid fa-trash"></i> Wishlist
            </Button>
            
            {/* Cart Button */}
            <Button className='btn btn-outline-light'  onClick={()=>handleCart(product)} >
              <i className="fa-solid fa-cart-shopping"></i> Cart
            </Button>
          </div>
        </Col>
      </Row>
    </div>
    }
   </div>

  );
}

export default View;
