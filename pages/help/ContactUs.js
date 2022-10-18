import React from "react";
import { useStateContext } from "../../context/StateContext";
import { toast } from "react-hot-toast";

import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Link from "next/link";

const ContactUs = () => {
  const { showSuceess, setShowSuceess } = useStateContext();

  const initialValues = {
    name: "",
    email: "",
    number: "",
    message: "",
  };
  const onSubmit = async (values) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    
    if (res.status === 200) {
      setShowSuceess(true);
    }

    if (res.message) {
      toast(res.message);
    }
  };

  const validator = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Name required.";
    else if (!values.email) errors.email = "Email required.";
    else if (!values.number) errors.number = "Contact number required.";
    else if (!values.message) errors.message = "Required to submit.";

    return errors;
  };

  return (
    <div>
      {showSuceess ? (
        <div>
          <section className="success-pg">
            <div className="container">
              <div className="content">
                <h2>
                  <span>Thank You</span>
                </h2>
                <p>
                  Your query has been successfully received. Our team will
                  contact you soon with further information.
                </p>
                <div className="btn" onClick={() => setShowSuceess(false)}>
                  <Link href={`/`} className="btn">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <section className="tech-sec contact-us-pg">
            <div className="container">
              <div className="frm-sec">
                <div className="row">
                  <div className="col-auto">
                    <h1>
                      Contact <span>Us</span>
                    </h1>
                    <p>
                      Any queries or feedback? Just write us a message, and
                      we will get back to you.
                    </p>
                    <div className="reviews row">
                      <AiOutlineMail
                        className=" col-1"
                        style={{ fontSize: "30px" }}
                      />
                      <a href="mailto:yourshop674@gmail.com" className="col">
                        qkart.vercel.app@gmail.com
                      </a>
                    </div>
                    {/* <div className="reviews row">
                      <AiOutlinePhone
                        className=" col-1"
                        style={{ fontSize: "30px" }}
                      />
                      <a href="callto:+918509097718" className="col">
                        8509097718
                      </a>
                    </div> */}
                  </div>
                  <div className="col-auto p-3">

                  <div className="card">
                    <div className="p-3">
                      <Formik
                        initialValues={initialValues}
                        validate={validator}
                        onSubmit={onSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <div className="form-group">
                              <Field
                                type="text"
                                name="name"
                                className="form-control login-input"
                                placeholder="Your name"
                              />
                              <ErrorMessage
                                name="name"
                                className="text-danger"
                                component="div"
                              />
                            </div>
                            <br />
                            <div className="form-group">
                              <Field
                                type="email"
                                name="email"
                                className="form-control login-input"
                                placeholder="Your email"
                              />
                              <ErrorMessage
                                name="email"
                                className="text-danger"
                                component="div"
                              />
                            </div>
                            <br />
                            <div className="form-group">
                              <Field
                                type="tel"
                                name="number"
                                className="form-control login-input"
                                placeholder="Contact number"
                              />
                              <ErrorMessage
                                name="number"
                                className="text-danger"
                                component="div"
                              />
                            </div>

                            <br />
                            <div className="form-group">
                              <Field
                                as="textarea"
                                type="text"
                                name="message"
                                className="form-control login-input"
                                placeholder="Your message..."
                              />
                              <ErrorMessage
                                name="message"
                                className="text-danger"
                                component="div"
                              />
                            </div>
                            <div className="col-auto">
                              <button
                                type="submit"
                                className="btn btn-sm"
                                // disabled={isSubmitting}
                              >
                                Submit
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="location-sec">
            <div className="container">
              <h2>
                Our <span>Location</span>
              </h2>
              <p>
                <b style={{ fontWeight: "600" }}>Canada</b> <br />
                1563 Hastings Street, Vancouver, British Columbia, V6C 1B4
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
