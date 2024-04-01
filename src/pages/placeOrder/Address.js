import React from "react";

function Address() {
  return (
    <div className="w-100" style={{ minHeight: "40vh" }}>
      <input type="text" placeholder="Name" />
      <input type="Email" placeholder="Email" />
      <input type="text" placeholder="Phone" />
      <input type="text" placeholder="Pincode" />
      <input type="text" placeholder="City" />
      <input type="text" placeholder="State" />
      <input type="text" placeholder="Full Address" />
    </div>
  );
}

export default Address;
