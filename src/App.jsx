
import './App.css'
import View from './pages/View'
import Cart from './pages/Cart'
import Whishlist from './pages/Whishlist'
import Home from './pages/Home'


import {  Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'






function App() {
 

  return (
    <>
     <Header/>
<Routes> 
<Route path='/' element={<Home/>}/> 
<Route path='/whishlist' element={<Whishlist/>}/> 
<Route path='/cart' element={<Cart/>}/> 
<Route path='/view/:id' element={<View/>}/> 
 {/* //redirect */}
<Route path='/*' element={<Navigate to={'/'}/>}/>



</Routes>
<Footer/>

    </>
  )
}

export default App
