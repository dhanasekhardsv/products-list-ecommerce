import React from 'react'
import './dashboard.css';
import { useDispatch } from 'react-redux';
import { addProducts } from '../store/products/productsSlice';
import ProductList from '../components/ProductList';
import generateRandomId from '../utils/generateRandomId';

const Dashboard = () => {
    const dispatch = useDispatch();
    return (
        <div className='app-container'>
            <div>
                <h3>Add Products</h3>
                <ProductList />
                <button type="button" className='add-product-btn' onClick={() => dispatch(addProducts([{ id: generateRandomId() }]))}>Add Product</button>
            </div>
        </div>
    )
}

export default Dashboard;
