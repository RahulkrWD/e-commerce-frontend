import React from "react";
import { FaFilter } from "react-icons/fa";

function FilterItems({ filter }) {
  return (
    <div>
      <button
        className="btn btn-dark w-100 p-2 fw-bolder fs-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <FaFilter /> Filters
      </button>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body text-center">
          <div className="sort filter m-5">
            <h6>Sort Price</h6>
            <select className="w-75 text-center ">
              <option>-Sort-</option>
              <option>price High to Low</option>
              <option>Price Low to High</option>
            </select>
          </div>
          <div className="Brand filter m-5">
            <h6>Brand Filter</h6>
            <select className="w-75 text-center">
              <option>-Choose-</option>

              {filter
                ? filter.map((data, index) => (
                    <option key={index}>{data.brand}</option>
                  ))
                : ""}
            </select>
          </div>
          <div className="sort filter m-5">
            <h6>Price Range</h6>
            <select className="w-75 text-center">
              <option>-Select-</option>
              <option>Less than 100</option>
              <option>101 to 200</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterItems;
