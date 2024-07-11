import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './product.css'
import dragIcon from '../images/drag.png';
import editIcon from '../images/edit.png';
import crossIcon from '../images/cross.png';
import upArrow from '../images/up-arrow.png';
import { openDialogBox } from '../store/config/configSlice';
import { removeProduct, removeVariant, setCurrentEditingProduct } from '../store/products/productsSlice';

const Product = ({ id, prod }) => {
    const [discountEnabled, setDiscountEnabled] = useState(false);
    const [showVariants, setShowVariants] = useState(false);
    const prods = useSelector(state => state.products.products);
    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(openDialogBox());
        dispatch(setCurrentEditingProduct(prod.id));
    }
    const showHideVariants = () => {
        setShowVariants(prev => !prev);
    }
    const removeProd = (id) => {
        if (prods.length > 1) {
            dispatch(removeProduct(prod.id));
        }
    }
    const removeProdVariant = (prod, variantId) => {
        if (prod.variants) {
            if ((prods.length === 1) && (prod.variants.length === 1)) {
                return;
            }
            else if ((prods.length === 1) && (prod.variants.length > 1)) {
                dispatch(removeVariant({ prodId: prod.id, variantId: variantId }));
            }
            else if ((prods.length > 1) && (prod.variants.length === 1)) {
                dispatch(removeProduct(prod.id));
            }
            else if ((prods.length > 1) && (prod.variants.length > 1)) {
                dispatch(removeVariant({ prodId: prod.id, variantId: variantId }));
            }
            else {
                dispatch(removeVariant({ prodId: prod.id, variantId: variantId }));
            }
        }
    }
    return (
        <>
            <img src={dragIcon} alt="drag-icon" width={10} height={15} className='drag-icon prod' />
            <span className='id-label prod'>{id}.</span>
            <div className='product-details prod'>
                <input type="text" placeholder='Select Product' value={prod.title ? prod.title : ''} name="prod-input" id={"prod-input-" + id} readOnly />
                <img src={editIcon} alt="Edit" className='prod-edit' height={20} width={15} onClick={() => handleEdit(prod.id)} />
            </div>
            {
                discountEnabled && (
                    <>
                        <input type="number" max={100} name="discount-qty" id={"discount-qty-" + id} className='discount-qty prod' />
                        <select name="discount-type" id={"discount-type" + id} className='discount-type prod'>
                            <option value="percentage-off">% Off</option>
                            <option value="flat-off">Flat Off</option>
                        </select>
                        <img src={crossIcon} alt="Close" className='remove-prod' width={15} height={15} onClick={removeProd} />
                    </>
                )
            }
            {
                !discountEnabled && <button type="button" className='add-discount-btn prod' onClick={() => setDiscountEnabled(true)}>Add Discount</button>
            }
            {
                prod.variants && prod.variants.length && (
                    <>
                        <div className='variant-label'>
                            <span onClick={showHideVariants} className='variant-show-label'>{showVariants ? 'Hide' : 'Show'} variants</span>
                            <img src={upArrow} alt="Arrow" width={10} height={12} onClick={showHideVariants} className={`variant-show-icon ${showVariants ? 'hide' : 'show'}`} />
                        </div>
                        {
                            showVariants && prod.variants.length && (
                                prod.variants.map(variant => {
                                    return (
                                        <React.Fragment key={variant.id}>
                                            <div className='product-details prod-variant'>
                                                <img src={dragIcon} alt="drag-icon" width={10} height={15} className='drag-icon prod-variant' />
                                                <input type="text" placeholder='Select Product' value={variant.title ? variant.title : ''} className='prod-variant' name="prod-input" id={"prod-input-" + variant.id} readOnly />
                                            </div>
                                            {
                                                discountEnabled && (
                                                    <>
                                                        <input type="number" name="discount-qty" id={"discount-qty-" + variant.id} className='discount-qty prod-variant' />
                                                        <select name="discount-type" id={"discount-type" + variant.id} className='discount-type prod-variant'>
                                                            <option value="percentage-off">% Off</option>
                                                            <option value="flat-off">Flat Off</option>
                                                        </select>
                                                        <img src={crossIcon} alt="Close" className='remove-prod prod-variant' width={15} height={15} onClick={() => removeProdVariant(prod, variant.id)} />
                                                    </>
                                                )
                                            }
                                            {
                                                !discountEnabled && <button type="button" className='add-discount-btn prod-variant' onClick={() => setDiscountEnabled(true)}>Add Discount</button>
                                            }
                                        </React.Fragment>
                                    )
                                })
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default Product
