import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removefromwishlist } from '../slice/WishlistSlice';
import { addToCart } from '../slice/Cartslice';


function Wishlist() {
  const dispatch=useDispatch()
  const{ wishlist} = useSelector((state) => state.WishlistReducer);
 const handleCart=(product)=>{
 
  dispatch(removefromwishlist(product.id))
  dispatch(addToCart(product))
 }
  return (
    <div style={{ marginTop: '70px' }}>
      <Row className='mt-5 container'>
        { wishlist?.length>0?wishlist.map(product=>(
          <Col className='mt-5' sm={12} md={6} lg={4} xl={3}>
          <Card style={{ width: '18rem' }}>
            <Link to={`/view/${product.id}`}>
              <Card.Img 
                variant="top" 
                style={{ width: '100%' }} 
                src={product.thumbnail} 
              />
            </Link>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <div className='d-flex justify-content-between'>
                <Button className='btn btn-light' onClick={()=>dispatch(removefromwishlist(product.id))}>
                  <i className="fa-solid fa-trash"></i>
                </Button>
                <Button className='btn btn-light' onClick={()=>handleCart(product)}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        )):
        <div className='d-flex align-items-center mt-5'>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt=""/>
            <h1 className='text-danger'>your whishlist is empty...</h1>
          </div>
}
      </Row>
      
    </div>
  );
}

export default Wishlist;
