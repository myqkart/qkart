import React from "react";
import { useStateContext } from "../../context/StateContext";

import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import Link from "next/link";

const ContactUs = () => {
  const { showSuceess, setShowSuceess } = useStateContext();
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
                <div className="btn" onClick={()=>setShowSuceess(false)}>
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
                <div className="d-flex">
                  <div className="col">
                    <h1>
                      Contact <span>Us</span>
                    </h1>
                    <p>
                      Any queries or feedback? Just write us a message, and
                      we'll get back to you.
                    </p>
                    <div className="reviews row">
                      <AiOutlineMail
                        className=" col-1"
                        style={{ fontSize: "30px" }}
                      />
                      <a href="mailto:yourshop674@gmail.com" className="col">
                        yshop674@gmail.com
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
                  <div className="card col-4">
                    <div className="p-3">
                      <form id="contactForm">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            trim="blur"
                          />
                        </div>
                        <br />
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your Email"
                            trim="blur"
                          />
                        </div>
                        <br />
                        <div className="form-group">
                          <div className="d-flex mobile_number">
                            <input
                              type="tel"
                              placeholder="Contact Number"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <br />
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            placeholder="Your Message"
                            trim="blur"
                          ></textarea>
                        </div>
                        <br />
                        <div className="form-group">
                          <button
                            className="btn"
                            type="button"
                            onClick={() => setShowSuceess(true)}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
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
                <b style={{ fontWeight: "600" }}>India</b> <br />
                Jodhpur, Rajasthan 342006
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
