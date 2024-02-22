// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import styles from "./HomePage.module.css";
// import { Link } from "react-router-dom";

// function Category() {
//   const [category, setCategory] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCategory() {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API}/product/category`
//         );
//         setCategory(response.data);
//         setLoading(false);
//       } catch (err) {
//         toast.error("server error please after some time");
//         setLoading(false);
//       }
//     }
//     fetchCategory();
//   });

//   return (
//     <>
//       <div className={`d-flex p-3 gap-4 ${styles.container}`}>
//         {loading ? (
//           <h4>Loading data..</h4>
//         ) : (
//           category.map((data, index) => (
//             <Link
//               key={index}
//               to={`category?${data.CategoryName}=${data.CategoryId}`}
//             >
//               <img className={styles.categoryImage} src={data.img} alt="" />

//               <h5 className={styles.categoryName}>{data.CategoryName}</h5>
//             </Link>
//           ))
//         )}
//       </div>
//     </>
//   );
// }

// export default Category;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton"; // Import the skeleton loading library

function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/product/category`
        );
        setCategory(response.data);
        setLoading(false);
      } catch (err) {
        toast.error("Server error. Please try again later.");
        setLoading(false);
      }
    }
    fetchCategory();
  }, []);

  return (
    <>
      <div className={`d-flex p-3 gap-4 ${styles.container}`}>
        {loading
          ? // Skeleton loading effect while data is being fetched
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={styles.skeletonContainer}>
                <Skeleton height={150} />
                <Skeleton height={20} style={{ marginTop: "10px" }} />
              </div>
            ))
          : category.map((data, index) => (
              <Link
                key={index}
                to={`category?${data.CategoryName}=${data.CategoryId}`}
              >
                <img className={styles.categoryImage} src={data.img} alt="" />
                <h5 className={styles.categoryName}>{data.CategoryName}</h5>
              </Link>
            ))}
      </div>
    </>
  );
}

export default Category;
