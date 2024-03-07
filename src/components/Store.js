import React from "react";
import { Product } from "./ProdArray";
import SingleProduct from "./SingleProduct";
import "./Style.css";

const Store = () => {
  return (
    <div className="store">
      <div className="productContainer">
        {Product.map((prod, index) => (
          <SingleProduct
            key={index}
            title={prod.title}
            imageUrl={prod.imageUrl}
            price={prod.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Store;
