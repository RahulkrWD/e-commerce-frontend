import React from "react";
import { TfiMenuAlt } from "react-icons/tfi";

function Darwer() {
  return (
    <>
      <div>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
        >
          <TfiMenuAlt />
        </button>
        <div
          className="offcanvas offcanvas-start "
          style={{ width: "250px" }}
          data-bs-scroll="true"
          tabIndex={-1}
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
              {/* Backdrop with scrolling */}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            {/* <p>
              Try scrolling the rest of the page to see this option in action.
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Darwer;
