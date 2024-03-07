import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import CartContext from "../context/Context";


const SingleProduct = ( product ) => {
  const ctx = useContext(CartContext);
  const cartItems = ctx.items;

  const item = {
    title: product.title,
    imageUrl: product.imageUrl,
    price: product.price,
    quantity:Number(1)
}

  const addToCartHandler = (e) => {
    e.preventDefault();
    ctx.addToCart(item);
  }

  const removeToCartHandler = () => {
    ctx.removeItem(item);
  }


  return (
    <div className="productContainer">
      <Card>
        <Card.Title>{product.title}</Card.Title>
        <Card.Img variant="top" src={product.imageUrl} alt={product.title} />
        <Card.Body>
          <span>₹{product.price}</span>
          
            <Button
              style={{ float: "right" }}
              onClick={(e) => addToCartHandler(e)}
            >
              Add To Cart
            </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
