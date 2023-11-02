import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Nav.module.css";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContent";

function SearchBar() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { getAllProducts } = useAuth();
  const [products, setProducts] = useState([]); 

  const handleGetAllProducts = async () => {
    try {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.log(error.message + "this is the error");
    }
  };

  useEffect(() => {
    // Fetch products when the component loads
    handleGetAllProducts();
  }, []);

  // Update suggestions based on user input
  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setInputValue(searchTerm);

    if (searchTerm.length >= 2) {
      // Filter products that match the search term
      const filteredSuggestions = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      setSuggestions(filteredSuggestions);
    } else {
      // Clear suggestions when input length is less than 2
      setSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (selectedProduct) => {
    // Navigate to the selected product's page using Next.js Link
    const productSlug = selectedProduct.name
      .toLowerCase()
      .replace(/\s+/g, "-");
    const productPageUrl = `/products/${productSlug}`;

    // Use the router to navigate to the product's page
    router.push(productPageUrl);
  };

  return (
    <>
      <div className={styles.input__container}>
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.input}
        />
        {suggestions.length > 0 && inputValue.length >= 2 && (
          <div className={styles.suggestions}>
            {suggestions.map((product) => (
              <div
                key={product.id}
                className={styles.suggestion}
                onClick={() => handleSuggestionClick(product)}
              >
                {product.name}{" "}
                - ${product.price}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
