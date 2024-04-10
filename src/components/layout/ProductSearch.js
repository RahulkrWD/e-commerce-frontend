import React, { useEffect, useState } from "react";
import styles from "./ProductSearch.module.css";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/product/allproduct`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleInputChange = (inputValue) => {
    if (!inputValue) {
      setFilteredOptions([]);
      return;
    }

    const filteredTypes = products
      .filter((product) =>
        product.type.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((product) => ({
        value: product.type,
        label: product.type,
        id: product.categoryId,
      }));

    const uniqueFilteredTypes = Array.from(
      new Set(filteredTypes.map((type) => type.label))
    )
      .map((label) => filteredTypes.find((type) => type.label === label))
      .filter((type) => type !== undefined);

    setFilteredOptions(uniqueFilteredTypes);
  };
  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      navigate(`/product/${selectedOption.id}&${selectedOption.label}`);
    }
  };

  return (
    <div>
      <Select
        className={styles.select_option}
        options={filteredOptions}
        onInputChange={handleInputChange}
        onChange={handleSelectChange}
        isClearable={true}
        placeholder="Search here..."
      />
    </div>
  );
}

export default ProductSearch;
