import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './dialogBox.css';
import crossIcon from '../images/cross-large.png';
import SearchedProducts from './SearchedProducts';
import { closeDialogBox } from '../store/config/configSlice';
import { addSelectedProductsToProducts, resetSelectedProducts, setCurrentEditingProduct } from '../store/products/productsSlice';

const DialogBox = () => {
    const currentProdId = useSelector(state => state.products.currentEditingProduct);
    const selProds = useSelector(state => state.products.selectedProducts.productIds);
    const dispatch = useDispatch();
    const handleCloseDialogBox = () => {
        dispatch(closeDialogBox());
        dispatch(setCurrentEditingProduct(null));
        dispatch(resetSelectedProducts());
    }
    const addSelectedProds = () => {
        dispatch(addSelectedProductsToProducts(currentProdId));
        dispatch(resetSelectedProducts());
        handleCloseDialogBox();
    }
    return (
        <div className="dialog">
            <div className='dialog-container'>
                <div className="dialog-header">
                    <h3>Select Products</h3>
                    <img src={crossIcon} alt="close" width={15} height={15} onClick={handleCloseDialogBox} />
                </div>
                <div className="dialog-body">
                    <SearchedProducts />
                </div>
                <div className="dialog-footer">
                    <span>{selProds.length} product selected</span>
                    <div className="action-buttons">
                        <button type="button" className='cancel-btn' onClick={handleCloseDialogBox}>Cancel</button>
                        <button type="button" className='add-btn' onClick={addSelectedProds}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogBox
