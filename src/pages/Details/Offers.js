import React from "react";
import styles from "./Details.module.css";

function Offers() {
  return (
    <div className={styles.offer_container}>
      <h6 className="mt-2 ">Offer</h6>
      <span className="d-block">
        Use <strong className="text-primary">100DEP</strong> code to discount
        <strong className="text-primary"> &#8377; 100 </strong> minimum Order
        Value <strong className="text-primary"> &#8377; 400</strong>
      </span>
      <span className="d-block">
        Use <strong className="text-primary">50DEP</strong> code to discount
        <strong className="text-primary"> &#8377; 50 </strong>
        minimum Order Value{" "}
        <strong className="text-primary"> &#8377; 400</strong>
      </span>
      <span className="d-block">
        Use <strong className="text-primary">FIRSTDEP</strong> code to discount
        <strong className="text-primary"> &#8377; 200 </strong>
        minimum Order Value{" "}
        <strong className="text-primary"> &#8377; 400</strong>
      </span>
    </div>
  );
}

export default Offers;
