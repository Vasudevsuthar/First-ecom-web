import CartContext from "./Context";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import axios from "axios";

const CartContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const userEmail = authCtx.email;
  const cleanedEmail = userEmail.replace(/[@.]/g, "");

  const [items, setItems] = useState([]);

  const addToCart = async (product) => {
    try {
      const updatedItemsArray = [...items];
      const existingItemIndex = updatedItemsArray.findIndex(
        (existingItem) => existingItem.title === product.title
      );

      if (existingItemIndex !== -1) {
        updatedItemsArray[existingItemIndex].quantity += Number(
          product.quantity
        );

        try {
          const itemIdToUpdate = updatedItemsArray[existingItemIndex]._id;
          const updatedItem = {
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: updatedItemsArray[existingItemIndex].quantity,
          };
          await axios.put(
            `https://ecommerce-web-2b03d-default-rtdb.firebaseio.com/${cleanedEmail}/${itemIdToUpdate}.json`,
            updatedItem
          );
          fetchCartData();
        } catch (error) {
          console.error("Error updating item:", error);
        }
      } else {
        const response = await fetch(
          `https://ecommerce-web-2b03d-default-rtdb.firebaseio.com/${cleanedEmail}.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add product to cart.");
        }
        fetchCartData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await fetch(
        `https://ecommerce-web-2b03d-default-rtdb.firebaseio.com/${cleanedEmail}.json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart data.");
      }
      const data = await response.json();
      if (data) {
        const itemsArray = Object.entries(data).map(([id, item]) => ({
          _id: id,
          ...item
        }));
        setItems(itemsArray);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchCartData();
  }, [cleanedEmail]);

  const removeToCart = async (item) => {
    try {
      const updatedItemsArray = [...items];
      const existingItemIndex = updatedItemsArray.findIndex(
        (existingItem) => existingItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        if (updatedItemsArray[existingItemIndex].quantity > 1) {
          updatedItemsArray[existingItemIndex].quantity -= 1;

          const itemIdToUpdate = updatedItemsArray[existingItemIndex]._id;
          const updatedItem = {
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.price,
            quantity: updatedItemsArray[existingItemIndex].quantity,
          };
          await axios.put(
            `https://ecommerce-web-2b03d-default-rtdb.firebaseio.com/${cleanedEmail}/${itemIdToUpdate}.json`,
            updatedItem
          );

          fetchCartData();
        } else {
          const response = await fetch(
            `https://ecommerce-web-2b03d-default-rtdb.firebaseio.com/${cleanedEmail}/${item._id}.json`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to remove item from the cart.");
          }
          fetchCartData();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  const clearCart = async () => {
    try {
      const response = await fetch(
        `https://ecommerce-web-2b03d-default-rtdb.firebaseio.com/${cleanedEmail}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to clear the cart.")
      }
      fetchCartData();
    }
    catch (error) {
      console.error(error);
    }
  };
  const CartContextValue = {
    items: items,
    addToCart: addToCart,
    cleanedEmail,
    removeItem: removeToCart,
    clearCart: clearCart
  };
  return (
    <CartContext.Provider value={CartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
