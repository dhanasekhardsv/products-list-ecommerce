import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './searchedProducts.css';
import { setSearchedProducts } from '../store/products/productsSlice';
import SearchedProductParent from './SearchedProductParent';
import data from '../data';

const SearchedProducts = () => {
  const [searchText, setSearchText] = useState('');
  const searchedProds = useSelector(state => state.products.searchedProducts?.data);
  const loading = false;
  const error = '';
  const dispatch = useDispatch();

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delay);
    };
  };
  const handleChange = (value) => {
    dispatch(setSearchedProducts(data));
  };
  const optimizedFn = debounce(handleChange, 600);

  const handleSearchText = (val) => {
    setSearchText(val);
    optimizedFn(val);
  }

  useEffect(() => {
    dispatch(setSearchedProducts(data));
  }, [dispatch]);
  return (
    <>
      <div className="searchbar">
        <input type="text" placeholder='Search Product' id='dialog-product-search' name='dialog-product-search' value={searchText} onChange={(e) => handleSearchText(e.target.value)} />
      </div>
      <div className="products">
        {
          loading ? (<div className="loader"></div>) : (error.length ? (<div className='error'>{error}</div>) : (
            <div className='prods-container'>
              {
                searchedProds && searchedProds.map(prod => {
                  return (
                    <SearchedProductParent key={prod.id} product={prod} />
                  )
                })
              }
            </div>
          ))
        }
      </div>
    </>
  )
}

export default SearchedProducts
