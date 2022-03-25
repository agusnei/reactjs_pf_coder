import React, {useEffect, useContext } from "react";
//Link roter dom
import {Link} from "react-router-dom";
import { useParams } from 'react-router';

import './Detail.css'

import { CartContext } from "../../Services/Cart/CartContext";
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM_COUNT,
} from "../../Services/Cart/action-types";
import { ProductContext } from "../../Services/Product/ProductContext";

//Firebase firestore
import {db} from '../../Services/Firebase/FirebaseConfig'
import {  collection, query, where, getDocs, documentId  } from "firebase/firestore";

import { FETCH_PRODUCTS } from "../../Services/Product/action-types";
import SyncLoader from "react-spinners/SyncLoader";
import "../Products/ProductList.css"


const CardDetail = () => {
  
  const { cartItem, dispatch } = useContext(CartContext);
  
  const {products, productDispatch} = useContext(ProductContext);

  let useparams = useParams();

	let id = useparams.id;

	useEffect(() =>{
		const fetchProducts = async () => {
			const q = query(collection(db, 'ecommerce'),where (documentId(),"==", id));
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
        productCategory: docs.category,
        productDescription: docs.description,
      }));
      productDispatch({
        type: FETCH_PRODUCTS,
        payload: allProduct,
      });
    };
		fetchProducts();
	},[id]);

    return (
      <div>
        <div >
          {products.items !== undefined
            ? products.items.map((item) => {
              return(
              <div className="shadow flex flex-col bg-light m-10 items-center p-3 " key={item.id}> 
                      <img src={item.smallImage} className="w-64 h-48" alt="productItem"/>
                      <h2>Product</h2>
                      <h3 className="font-medium capitalize">{item.productName}</h3>
                      <h2>Description</h2>
                    <p className="bg-light">{item.productDescription}</p>
                    <Link to='/' className="btn btn-green m-2">Back to home</Link>
                    </div>
                        )}
                        )
                        :  <div  className="spinner-container"><SyncLoader color="#10b981"/></div>}
        </div>
      </div>
    );
};

export default CardDetail;