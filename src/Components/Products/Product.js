import React,{useEffect, useState} from "react";
import { FaMinusSquare, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
//Link roter dom
import {Link} from "react-router-dom";

import "./Product.css";

const Product = ({ product, addToCart, removeFromCart, incrementItem, decrementItem }) => {
    const [productItem, setProductItem] = useState([]);
    useEffect(()=>{
        setProductItem(product)
    },[product])

    
  return (
    <div className="shadow flex flex-col items-center p-3 bg-light">
      <img src={productItem.smallImage} className="w-64 h-48" alt="productItem"/>
      <h2 className="font-medium capitalize">{productItem.productName}</h2>
      <h2 className="m-2">${productItem.productPrice}</h2>
      {productItem.isAddedtoCart ? (
        <div className="flex grid-cols-2 gap-2 grid w-4/5">
          <div className="flex items-center">
           <button  onClick={()=> decrementItem(productItem)} disabled={productItem.count <= 1 } className="disabled:opacity-50 disabled:cursor-text focus:outline-none"><FaMinusSquare className="w-5 h-5" /> </button>
            <span className="mx-2">{productItem.count}</span>
            {productItem.count >= 1 ? <button onClick={()=>incrementItem(productItem)} className="focus:outline-none"><FaPlusSquare  className="w-5 h-5"/></button> : null}
          </div>
          <button onClick={() => removeFromCart(productItem)} className="btn btn-red">
            <FaTrashAlt  />
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => addToCart(productItem)}
            className="btn btn-green"
          >
          <FaPlusSquare  className="w-5 h-5"/>
          </button>
        </div>
        
      )}
      <div className="btn btn-red m-1">
      <Link to={`/detail/${productItem.id}`} >
          Detail
       </Link>
      </div>
    </div>
  );
};

export default Product;
