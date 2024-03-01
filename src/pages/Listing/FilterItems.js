import React from "react";
import styles from "./Filter.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

function FilterItems({ filter }) {
  const { search } = useLocation();
  let value = search.split("=")[0].split("?")[1].toLowerCase();

  async function filterData(event) {
    try {
      let sort = event.target.value;
      const response = await axios.get(
        `${process.env.REACT_APP_API}/product/${value}?sort=${sort}`
      );
      filter(response.data);
    } catch (err) {
      filter([]);
    }
  }
  return (
    <div className={`${styles.filterContainer}`}>
      <h4 className="fw-bold ">filter</h4>
      <div className="sort filter mt-3">
        <h6>Sort Price</h6>
        <select onChange={filterData}>
          <option>- Sort -</option>
          <option value="asc">Low to hight</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <div className="rating mt-5">
        <h6>Customer ratings</h6>
        <input type="checkbox" id="4" />
        <label htmlFor="4" className="p-1 fw-bold">
          4<i className={`fa-solid fa-star ${styles.starIcons}`}></i> & above
        </label>
        <br />
        <input type="checkbox" id="3" />
        <label htmlFor="3" className="p-1 fw-bold">
          3<i className={`fa-solid fa-star ${styles.starIcons}`}></i> & above
        </label>
        <br />
        <input type="checkbox" id="2" />
        <label htmlFor="2" className="p-1 fw-bold">
          2<i className={`fa-solid fa-star ${styles.starIcons}`}></i> & above
        </label>
        <br />
        <input type="checkbox" id="1" />
        <label htmlFor="1" className="p-1 fw-bold">
          1<i className={`fa-solid fa-star ${styles.starIcons}`}></i> & above
        </label>
      </div>
      <div className="rating mt-5">
        <h6>Dicount Price</h6>
        <input type="checkbox" id="80" />
        <label htmlFor="80" className="p-1 fw-bold">
          80% & more
        </label>
        <br />
        <input type="checkbox" id="60" />
        <label htmlFor="60" className="p-1 fw-bold">
          60% & more
        </label>
        <br />
        <input type="checkbox" id="40" />
        <label htmlFor="40" className="p-1 fw-bold">
          40% & more
        </label>
        <br />
        <input type="checkbox" id="20" />
        <label htmlFor="20" className="p-1 fw-bold">
          20% & more
        </label>
      </div>
      <div className="mt-5">
        <h6>Range Filter</h6>
      </div>
    </div>
  );
}

export default FilterItems;
