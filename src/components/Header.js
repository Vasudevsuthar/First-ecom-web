import React, { Fragment, useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import CartContext from "../context/Context";
import AuthContext from "../store/auth-context";

const Header = () => {
  const ctx = useContext(CartContext);
  const cartItems = ctx.items;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let newTotal = 0;
    cartItems.forEach((item) => {
      newTotal += item.quantity * item.price;
    });
    setTotal(newTotal);
  }, [cartItems]);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = authCtx.isLoggedIn;

  const removeToCartHandler = (item) => {
    ctx.removeItem(item);
  };
  const handlePurchase = () => {
    ctx.clearCart();
  };

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" style={{ height: 50 }}>
        <Container>
          <Nav className="me-auto">
            <NavLink className="text-white mx-5 justify-content-center" to="/">
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink
                className="text-white mx-5 justify-content-center"
                to="/store"
              >
                Store
              </NavLink>
            )}
            {!isLoggedIn && (<NavLink
              className="text-white mx-5 justify-content-center"
              to="/login"
            >
              Login
            </NavLink>)}
            <NavLink
              className="text-white mx-5 justify-content-center"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className="text-white mx-5 justify-content-center"
              to="/contactus"
            >
              Contact Us
            </NavLink>
          </Nav>
          <nav>
            <Dropdown>
              {isLoggedIn && (<Dropdown.Toggle variant="success" id="dropdown-basic">
                <HiMiniShoppingCart color="white" fontSize="25px" />
                <Badge>{cartItems.length}</Badge>
              </Dropdown.Toggle>)}

              <Dropdown.Menu style={{ left: "auto", right: 0 }}>
                {cartItems.length > 0 ? (
                  <>
                    <div
                      className="card_details"
                      style={{ width: "24rem", padding: "10" }}
                    >
                      <Table>
                        <thead>
                          <tr>
                            <th>ITEM</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((prod) => {
                            return (
                              <React.Fragment key={prod.title}>
                                <tr>
                                  <td>
                                    <img
                                      className="cartItemImg"
                                      src={prod.imageUrl}
                                      alt=""
                                      style={{ width: "5rem", height: "5rem" }}
                                    />
                                    <p>{prod.title}</p>
                                  </td>
                                  <td>
                                    <span>₹{prod.price}</span>
                                  </td>
                                  <td>{prod.quantity}</td>
                                  <td>
                                    <MdDeleteForever
                                      fontSize="20px"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => removeToCartHandler(prod)}
                                    />
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </>
                ) : (
                  <span style={{ padding: 10 }}>Cart is Empty</span>
                )}

                {cartItems.length > 0 && (
                  <span className="centered-text">Total: ₹{total}</span>
                )}
                <div className="buttonItem">
                  {cartItems.length == 0 && (
                    <Button disabled>Add items to Cart</Button>
                  )}
                </div>
                <div style={{display:"flex"}}>
                </div>
              </Dropdown.Menu>
              {isLoggedIn && (
                <Button
                  style={{ margin: "20px" }}
                  variant="danger"
                  onClick={logoutHandler}
                >
                  LOGOUT
                </Button>
              )}
            </Dropdown>
          </nav>
        </Container>
      </Navbar>
      <div>
        <header>
          <h1 style={{ fontSize: "100px" }}>The Generics</h1>
        </header>
      </div>
    </Fragment>
  );
};

export default Header;
