import React from "react";

const CartContext = React.createContext({
  items: [],
  addItem:(prod)=>{},
  removeItem:(id)=>{},
  clearCart:()=>{}
});

export default CartContext;
