import React, { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchproducts } from '../slice/Productslice';
import { addtowishlist } from '../slice/WishlistSlice';
import { addToCart } from '../slice/Cartslice';
import Header from '../components/Header';

function Home() {
  const dispatch=useDispatch()
  const{loading,products,error}=useSelector((state)=>state.productReducer)
  const wishlist = useSelector((state) => state.WishlistReducer.wishlist);
  const cart = useSelector((state) => state.cartReducer.cart);



  // console.log('Loading:', loading);
  // console.log('Products:', products);
  // console.log('Error:', error);
  

  useEffect(()=>{
    dispatch(fetchproducts())
  },[])
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
  
  return (
   <>
   <Header insideHome={true}/>
    <div style={{ marginTop: "70px" }}>
    {
  loading ? (
    <div className='text-center mt-5'>
      <Spinner animation="border" variant="warning" /> loading...
    </div>
  ) : (
    <Row className='mt-5 container'>
      {
        products?.length >0?products.map((product, index) => (
            <Col key={index} className='mt-5' sm={12} md={6} lg={4} xl={3}>
              <Card style={{ width: '18rem', height: "370px" }}>
                <Link to={`/view/${product.id}`}>
                  <Card.Img 
                    variant="top" 
                    style={{ width: '100%', height: "200px" }} 
                    src={product.thumbnail}
                  />
                </Link>
                <Card.Body>
                  <Card.Title >{product.title.slice(0,10)}</Card.Title>
                  <Card.Text>
                    {product.description.slice(0,20)}
                       </Card.Text>
                  <div className='d-flex justify-content-between'>
                    <Button className='btn btn-light' onClick={()=>handlewishlist(product)}>
                      <i 
                        className="fa-solid fa-heart" 
                        style={{ color: '#af1d04' }}
                      ></i>
                    </Button>
                    <Button className='btn btn-light' onClick={()=>handleCart(product)}> 
                      <i className="fa-solid fa-cart-shopping"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        : 
          <div className='fw-bolder mt-5 mb-5'>
            <p className='text-danger'>nothing to display</p>
          </div>
        
      }
    </Row>
  )


    }
    </div>
   </>
  );
}

export default Home;
