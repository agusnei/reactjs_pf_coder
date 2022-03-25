import React, {useEffect, useContext } from "react";
import Product from "./Product";
import SortBy from "../SortBy/SortBy";
import { CartContext } from "../../Services/Cart/CartContext";
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM_COUNT,
} from "../../Services/Cart/action-types";
import { ProductContext } from "../../Services/Product/ProductContext";
//Firebase firestore
import {db} from '../../Services/Firebase/FirebaseConfig'
import { collection, query, getDocs } from "firebase/firestore";
import { FETCH_PRODUCTS } from "../../Services/Product/action-types";
import SyncLoader from "react-spinners/SyncLoader";
import "./ProductList.css"

const ProductList = () => {
  
  const { cartItem, dispatch } = useContext(CartContext);
  
  const {products, productDispatch} = useContext(ProductContext);

  console.log(products)
	useEffect(() =>{
    const fetchProducts = async () => {
      const q = query(collection(db, 'ecommerce'));
      const docs = []
      const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// console.log(doc.id, " => ", doc.data());
			docs.push({...doc.data(), id: doc.id});
			});
			productDispatch(docs);

      const allProduct = docs.map((docs) => ({
        smallImage: docs.image,
        productName: docs.title,
        productPrice: docs.price,
        count: 0,
        id: docs.id,
      }));
      productDispatch({
        type: FETCH_PRODUCTS,
        payload: allProduct,
      });
    };
		fetchProducts();
	},[]);


  useEffect(()=>{
    console.log("Cart item updated")
  },[cartItem])
  const addToCart = (item) => {
    item.isAddedtoCart = true;
    item.count = 1;
    dispatch({
      type: ADD_CART_ITEM,
      payload: item,
    });
  };

  const removeFromCart = (item) => {
    item.isAddedtoCart = false;
    item.count = 0;
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: item,
    });
  };
  
  const incrementItem = (item) => {
    item.isAddedtoCart = true;
    if (item.count > 0) {
      item.count = item.count + 1;
    }
    dispatch({
      type: UPDATE_CART_ITEM_COUNT,
      payload: item,
    });
  };

  const decrementItem = (item) => {
    item.isAddedtoCart = true;
    if (item.count > 0) {
      item.count = item.count - 1;
    }
    dispatch({
      type: UPDATE_CART_ITEM_COUNT,
      payload: item,
    });
  };


    return (
      <div> 
            <h1 className="m-3 ">Products</h1>
            <div className="product-filter">
                <SortBy/>
            </div>
        <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2 px-4">
          {products.items !== undefined ? products.items.map((item) => {
              return( 
                <div  key={item.id} >
                        <Product 
                          key={item.id}
                          product={item}
                          addToCart={addToCart}
                          removeFromCart={removeFromCart}
                          incrementItem={incrementItem}
                          decrementItem={decrementItem}
                        />
                </div>
              )
            })
            :  <div  className="spinner-container"><SyncLoader color="#10b981"/></div>} 
        </div>
      </div>
    );
};

export default ProductList;
