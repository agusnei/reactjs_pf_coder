import {useReducer, useState, useEffect} from "react";
import { BrowserRouter as BR, Routes, Route } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import './App.css';
import CartList from "./Components/Cart/CartList";
import ProductList from './Components/Products/ProductList';
import {CartContext} from "./Services/Cart/CartContext";
import CartReducer from "./Services/Cart/reducer";
import ProductReducer from "./Services/Product/reducer";
import {ProductContext} from "./Services/Product/ProductContext";
import NavBar from './Components/NavBar';
import Buy from './Components/views/Buy';
import Error from "./Components/views/Error";
import CardDetail from "./Components/views/CardDetail";
import Category from "./Components/views/Category/Category";


function App() {
  
  const [cartItem, dispatch] = useReducer(CartReducer,[]);
  
  const [products, productDispatch] = useReducer(ProductReducer,[]);

  const [cartModal, setCartModal] = useState({show:false});
  
  const [totalCartItems, setTotalCartItems] = useState(0);

  const openCart = () => {
      setCartModal({show:true});
    };
  
  const closeCarts = () => {
      setCartModal({show:false});
    };
  
  const calculateCartItems = ()=>{
      let totalCart = 0;
      cartItem.map(item=>{
          totalCart = totalCart + item.count;
      })
      setTotalCartItems(totalCart);
    }

  useEffect(()=>{
      calculateCartItems();
  },[cartItem]);

  return (
    <div className='App'>
        <BR>
          <ProductContext.Provider value={{products, productDispatch }}>
            <CartContext.Provider value={{cartItem, dispatch}}>
                    <NavBar/>
                    <Routes>
                      <Route path='*' element={<Error />} />
                      <Route path='/category/:category' element={<Category/>} />
                      <Route path='/buy' element={<Buy/>} />
                      <Route path='/' element={<ProductList/>} />
                      <Route path='/detail/:id' element={<CardDetail/>} />
                    </Routes>
                    <header className="p-5 mb-4 border-b-2">
                      <button className="right-4 top-3 absolute focus:outline-none m-2" onClick={openCart}>
                        <FaCartPlus className="w-5 h-5 " />
                        <span className="cart-badge">
                          {totalCartItems}
                        </span>
                      </button>
                    </header>
              <CartList closeCart={closeCarts} show={cartModal.show} />
            </CartContext.Provider>
          </ProductContext.Provider>
        </BR>
    </div>
  );
}

export default App;
