import React from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import './productList.css';
import Product from './Product';
import DialogBox from './DialogBox';

const ProductList = () => {
    const products = useSelector(state => state.products.products);
    const showDialog = useSelector(state => state.config.dialogBoxOpen);
    return (
        <>
            <div className='grid-container'>
                <div></div>
                <div></div>
                <div className="product-title-label">
                    Product
                </div>
                <div className="product-discount-label">
                    Discount
                </div>
                {
                    products.map((product, index) => {
                        return <Product key={product.id} id={index + 1} prod={product} />
                    })
                }
            </div>
            {showDialog && createPortal(
                <DialogBox />,
                document.getElementById('portal')
            )}
        </>
    )
}

export default ProductList
