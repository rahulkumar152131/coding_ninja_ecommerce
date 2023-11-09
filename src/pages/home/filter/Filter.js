import React, { useEffect, useState } from 'react'
import "./style.scss";
import { useVaue } from '../../../context/productContext';
import axios from 'axios';

const Filter = () => {

  const { setProducts, products, originalProducts, setOriginalProducts } = useVaue();
  const [range, setRange] = useState(100000);
  const [category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleChecked = async (e) => {
    if (e.target.checked) {
      setCategory([...category, e.target.value]);
      const filteredProduct = await axios.get(`https://fakestoreapi.com/products/category/${e.target.value}`);
      filteredProduct.data.map((product) => {
        return product.price *= 80
      });
      setFilteredProducts([...filteredProduct.data, ...filteredProducts]);
    } else {
      setCategory(category.filter((cat) => cat !== e.target.value));
      setFilteredProducts(filteredProducts.filter((cat) => cat.category !== e.target.value));
    }
  }

  useEffect(() => {
    if (category.length > 0) {
      setProducts(filteredProducts)
      setOriginalProducts(filteredProducts);
    } else {
      async function getProduct() {
        const allproduct = await axios.get("https://fakestoreapi.com/products");
        allproduct.data.map((product) => {
          return product.price *= 80
        });
        setOriginalProducts(allproduct.data);
        setProducts(allproduct.data);
      }
      getProduct();
    }
  }, [filteredProducts])

  useEffect(() => {
    setProducts(originalProducts.filter((product) => product.price < range));
  }, [range])


  return (

    <div className="content">
      <div className="title">
        Filter
      </div>
      <div className="input-container">
        <div className="input-title">

          Price:   &#x20B9;{" "} {range}
        </div>
        <div className="range-input">
          <input value={range} type="range" min='0' max='100000' onChange={(e) => setRange(e.target.value)} />
        </div>
      </div>
      <div className="catogorytitle">
        Category
      </div>
      <div className="catogary">

        <div className="men-clothing">
          <input type="checkbox" id="men-clothing-radio" value="men's clothing" onChange={(e) => handleChecked(e)} />
          <label htmlFor="men-clothing-radio" className="radio-label"> Men's Clothing</label>
        </div>
        <div className="women-clothing">
          <input type="checkbox" id="women-clothing-radio" value="women's clothing" onChange={(e) => handleChecked(e)} />
          <label htmlFor="women-clothing-radio" className="radio-label"> Women's Clothing</label>
        </div>
        <div className="jewelery">
          <input type="checkbox" id="jewellery-radio" value="jewelery" onChange={(e) => handleChecked(e)} />
          <label htmlFor="jewellery-radio" className="radio-label"> Jewelery</label>
        </div>
        <div className="electronic">
          <input type="checkbox" id="electronics-radio" value="electronics" onChange={(e) => handleChecked(e)} />
          <label htmlFor="electronics-radio" className="radio-label"> Electronics</label>
        </div>

      </div>
    </div>


  )
}

export default Filter