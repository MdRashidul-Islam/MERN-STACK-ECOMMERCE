import React from "react";
import "./Newsletter.scss";

const Newsletter = () => {
  return (
    <div className="Newsletter">
      <div className="first">
        <h2>Sign up to Newsletter</h2>
      </div>
      <div className="second">
        <p>
          ...and receive <span>$20 coupon for first shopping</span>{" "}
        </p>
      </div>
      <div className="third">
        <input placeholder="Enter Your Email" type="email" />
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default Newsletter;
