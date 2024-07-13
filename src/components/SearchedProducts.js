import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './searchedProducts.css';
import SearchedProductParent from './SearchedProductParent';
import { fetchSearchedProducts } from '../store/products/productsSlice';
import { setProdResultsPage } from '../store/products/productsSlice';

const SearchedProducts = () => {
  const [searchText, setSearchText] = useState('');
  const { loading, error, data } = useSelector(state => state.products.searchedProducts);
  const currentResultPage = useSelector(state => state.products.prodResultsPage);
  const hasMore = useSelector(state => state.products.hadMoreProducts);
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
    dispatch(setProdResultsPage(0));
    dispatch(fetchSearchedProducts({ searchText: value.trim(), page: 0, textChange: true }));
    console.log(hasMore);
  };
  const optimizedFn = debounce(handleChange, 600);

  const handleSearchText = (val) => {
    setSearchText(val);
    optimizedFn(val);
  }

  const fetchMoreData = () => {
    let nextPage = currentResultPage + 1;
    dispatch(setProdResultsPage(nextPage));
    dispatch(fetchSearchedProducts({ searchText: searchText.trim(), page: nextPage, textChange: false }));
  }

  useEffect(() => {
    dispatch(fetchSearchedProducts({ searchText: '', page: 0, textChange: true }));
  }, [dispatch]);
  return (
    <>
      <div className="searchbar">
        <input type="text" placeholder='Search Product' id='dialog-product-search' name='dialog-product-search' value={searchText} onChange={(e) => handleSearchText(e.target.value)} />
      </div>
      <div className="products">
        {
          loading ? (<div className="loader"></div>) : (error.length ? (<div className='error'>{error}</div>) : (
            <>
              <div className='prods-container'>
                {
                  data?.length ?
                    data.map(prod => {
                      return (
                        <SearchedProductParent key={prod.id} product={prod} />
                      )
                    })
                    :
                    <div className='error'>No such products available</div>
                }
              </div>
              {
                hasMore ? <button type="button" className='load-more-btn cursor-pointer' onClick={fetchMoreData}>Load More...</button> : null
              }
            </>
          ))
        }
      </div>
    </>
  )
}

export default SearchedProducts
