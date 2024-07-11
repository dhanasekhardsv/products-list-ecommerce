import React from 'react';
import './searchedVariant.css';

const SearchedVariant = ({ variant, isChecked, handleChildrenCheck }) => {

    return (
        <div className='variant'>
            <div className='title-container'>
                <input type="checkbox" checked={isChecked} onChange={(e) => handleChildrenCheck(variant.id)} name="variant-checkbox" id={"variant-checkbox-" + variant.id} />
                <span>{variant.title}</span>
            </div>
            <div className='availability-container'>
                <span>{(variant.inventory_quantity && variant.inventory_quantity > 0) ? `${variant.inventory_quantity} available` : 'Unavailable'}</span>
                <span>$ {variant.price}</span>
            </div>
        </div>
    )
}

export default SearchedVariant
