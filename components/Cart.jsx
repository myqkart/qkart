import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { Formik, Form, Field, ErrorMessage } from "formik";

// import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
    loadScript,
    setCartItems,
  } = useStateContext();

  // const handleCheckout = async () => {
  //   const stripe = await getStripe();

  //   const response = await fetch("/api/stripe", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(cartItems),
  //   });

  //   if (response.statusCode === 500) return;

  //   const data = await response.json();

  //   toast.loading("Redirecting...");

  //   stripe.redirectToCheckout({ sessionId: data.id });
  // };

  const initialValues = {
    add1: "",
    add2: "",
    city: "",
    state: "",
    pinCode: "",
  };
  const onSubmit = (t) => {
    displayRazorPay(t);
  };

  const validator = (values) => {
    const errors = {};
    if (!values.add1) errors.add1 = "Address required.";
    else if (!values.city) errors.city = "City required.";
    else if (!values.state) errors.state = "State required.";
    else if (!values.pinCode) errors.pinCode = "Pincode required.";

    return errors;
  };

  const addressStep = () => {
    toast(
      (t) => (
        <span>
          <div>
            <h3>Your Address</h3>
            <div className="col-lg-12 login-form">
              <Formik
                initialValues={initialValues}
                validate={validator}
                onSubmit={() => onSubmit(t)}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <Field
                        type="text"
                        name="add1"
                        className="form-control login-input"
                        placeholder="Address line 1"
                      />
                      <ErrorMessage
                        name="add1"
                        className="text-danger"
                        component="div"
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <Field
                        type="text"
                        name="add2"
                        className="form-control login-input"
                        placeholder="Address line 2"
                      />
                      <ErrorMessage
                        name="add2"
                        className="text-danger"
                        component="div"
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <Field
                        type="text"
                        name="city"
                        className="form-control login-input"
                        placeholder="City"
                      />
                      <ErrorMessage
                        name="city"
                        className="text-danger"
                        component="div"
                      />
                    </div>

                    <br />
                    <div className="form-group">
                      <Field
                        type="text"
                        name="state"
                        className="form-control login-input"
                        placeholder="State"
                      />
                      <ErrorMessage
                        name="state"
                        className="text-danger"
                        component="div"
                      />
                    </div>

                    <br />
                    <div className="form-group">
                      <Field
                        type="text"
                        name="pinCode"
                        className="form-control login-input"
                        placeholder="Pincode"
                      />
                      <ErrorMessage
                        name="pinCode"
                        className="text-danger"
                        component="div"
                      />
                    </div>

                    <div className="col-lg-12 loginbttm">
                      <div className="row login-btm login-button">
                        <div className="col-auto">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => toast.dismiss(t.id)}
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="col-auto">
                          <button
                            type="submit"
                            className="btn btn-sm"
                            disabled={isSubmitting}
                          >
                            Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </span>
      ),
      { duration: Infinity, position: "bottom-center" }
    );
  };

  const displayRazorPay = async (t) => {
    toast.dismiss(t.id);
    toast.loading("Redirecting...");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay failed to load.");
      return;
    }

    const resData = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({ totalPrice }),
    });

    const data = await resData.json();
    console.log("data : ", data);

    toast.dismiss();
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
      amount: data.amount.toString(),
      currency: data.currency,
      name: "Q-Kart",
      description: "Thanks for shopping.",
      image: "https://qkart.vercel.app/favicon.ico",
      order_id: data.id,
      handler: function (response) {
        setCartItems([]);
        toast.success("Your order received successfully.");
      },
      prefill: {
        name: "Q-Ka",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>₹{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>₹{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={addressStep}>
                PAY VIA CARD/OTHERS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
