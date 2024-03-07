import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Store from "./components/Store";
import About from "./components/About";
import "./App.css";
import Cart from "./components/Cart";
import "./components/Style.css";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import Signup from "./components/Sing";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import CartContextProvider from "./context/CartProvider";

function App() {
  const authCtx = useContext(AuthContext);
  const loggedIn = authCtx.isLoggedIn;

  return (
    <CartContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/cart" element={Cart} />
          <Route path="/store" element={<Store />} />
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </CartContextProvider>
  );
}

export default App;
