import React, { useEffect, useState } from 'react';
import {Container,Badge,Nav,Navbar} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../slice/Productslice'
import { Link } from 'react-router-dom';


function Header({insideHome}) {
  const dispatch=useDispatch()
  const[wishlistCount,setWishlistCount]=useState(0)
  const{ wishlist} = useSelector((state) => state.WishlistReducer);
  
  const cart = useSelector((state) => state.cartReducer.cart);

const[cartCount,setCartCount]=useState(0)
  useEffect(()=>{
    setWishlistCount(wishlist.length)
    setCartCount(cart.length)
  
  },[wishlist,cart]
  )
  return (
    <div>
      <Navbar expand="lg" className="bg-primary position-fixed top-0 w-100" style={{ zIndex: 1 }}>
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}>
              <i className="fa-solid fa-cart-shopping"></i>E-cart
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {insideHome&&<Nav.Link >
                <input onChange={e=>dispatch(searchProducts(e.target.value.toLowerCase()))} type="text" className='form-control' placeholder='search products' style={{width:"500px"}}/>
              </Nav.Link>}
              <Nav.Link as={Link} to={'/whishlist'} className='btn btn-outline-light' style={{ color: "black", fontWeight: "bold", textDecoration: "none" }}>
                <i className="fa-solid fa-cart-shopping"></i>Whishlist
                <Badge bg="success rounded ms-2">{wishlistCount}</Badge>
              </Nav.Link>

              <Nav.Link as={Link} to={'/cart'} className='btn btn-outline-light ms-2' style={{ color: "black", fontWeight: "bold", textDecoration: "none" }}>
              <i className="fa-solid fa-cart-shopping"></i>cart
                <Badge bg="success rounded ms-2">{cartCount}</Badge>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
