import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './searchedProducts.css';
import { fetchSearchedProducts } from '../store/products/productsSlice';
import SearchedProductParent from './SearchedProductParent';
import { setProdResultsPage } from '../store/config/configSlice';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchedProducts = () => {
  const [searchText, setSearchText] = useState('');
  const { loading, error, data } = useSelector(state => state.products.searchedProducts);
  const currentResultPage = useSelector(state => state.config.prodResultsPage);
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
    dispatch(fetchSearchedProducts({ searchText: value.trim(), page: currentResultPage, limit: 10 }));
  };
  const optimizedFn = debounce(handleChange, 600);

  const handleSearchText = (val) => {
    setSearchText(val);
    optimizedFn(val);
  }

  const fetchDataOnScroll = () => {
    dispatch(setProdResultsPage(currentResultPage + 1));
    console.log(currentResultPage);
    dispatch(fetchSearchedProducts({ searchText: searchText.trim(), page: currentResultPage, limit: 10 }));
  }

  useEffect(() => {
    dispatch(fetchSearchedProducts({ searchText: '', page: 0, limit: 10 }));
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
                  data?.length ? data.map(prod => {
                    return (
                      <SearchedProductParent key={prod.id} product={prod} />
                    )
                  }) : <div className='error'>No such products available</div>
                }
              </div>
              <InfiniteScroll
                dataLength={data?.length}
                next={fetchDataOnScroll}
                hasMore={true}
                loader={<h4>Loading...</h4>} />
            </>
          ))
        }
      </div>
    </>
  )
}

export default SearchedProducts
