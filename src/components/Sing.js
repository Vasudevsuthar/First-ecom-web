import React, { useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthContext from "../store/auth-context";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAYFEF5InzJ-FOrwWVY6_IJ3zMV_ne8Oc",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        navigate("/login");

        alert("Account created successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Form
        onSubmit={submitHandler}
        className="p-4 rounded shadow text-center"
        style={{ backgroundColor: "#6DA5C0" }}
      >
        <h1 className="mb-4" style={{ color: "#0C7075", fontWeight: "bold" }}>
          Sign up
        </h1>
        <h3 style={{ color: "#294D61" }}>
          Email
        </h3>
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Control
            ref={emailInputRef}
            type="email"
            placeholder="Enter email"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#2a9d8f",
              color: "#2a9d8f",
            }}
          />
        </Form.Group>
        <h3  style={{ color: "#294D61" }}>
          Password
        </h3>
        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Control
            ref={passwordInputRef}
            type="password"
            placeholder="Password"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#2a9d8f",
              color: "#2a9d8f",
            }}
          />
        </Form.Group>

        {!isLoading && (
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{ backgroundColor: "#0C7075", borderColor: "#0C7075" }}
          >
            Submit
          </Button>
        )}
        {isLoading && <p>Sending request...</p>}
        <br />
        <br />
        <p>
          Have an account? <Link to="/login">Login here</Link>
        </p>
      </Form>
    </div>
  );
};

export default Signup;
