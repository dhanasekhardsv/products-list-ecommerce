import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './searchedProductParent.css'
import SearchedVariant from './SearchedVariant';
import { setSelectedProducts } from '../store/products/productsSlice';

const SearchedProductParent = ({ product }) => {
    const dispatch = useDispatch();
    const [parentChecked, setParentChecked] = useState(false);
    const [checkedChildren, setCheckedChildren] = useState([]);

    const handleProductSelection = (checked, product) => {
        setParentChecked(prev => !prev);
        let allChildrenIds;
        if (checked) {
            allChildrenIds = product.variants.map(variant => variant.id);
        }
        else {
            allChildrenIds = [];
        }
        setCheckedChildren(allChildrenIds);
        dispatch(setSelectedProducts({ prodId: product.id, variantIds: allChildrenIds }));
    }
    const handleChildrenCheck = (variantId) => {
        let newChildren = [];
        if (checkedChildren.includes(variantId)) {
            newChildren = checkedChildren.filter(cId => cId !== variantId);
        }
        else {
            newChildren = [...checkedChildren, variantId];
        }

        if (product.variants?.length === newChildren.length) {
            setParentChecked(true);
        }
        else if (newChildren.length === 0) {
            setParentChecked(false);
        }

        setCheckedChildren(newChildren);
        dispatch(setSelectedProducts({ prodId: product.id, variantIds: newChildren }));
    }
    return (
        <div>
            <div className='parent-container'>
                <input type="checkbox" id={"parent-prod-" + product.id} name='parent-prod' checked={parentChecked} onChange={(e) => handleProductSelection(e.target.checked, product)} />
                <img src={product.image?.src} width={20} height={20} alt="Product" />
                <span>{product.title}</span>
            </div>
            <div className="variants">
                {
                    product.variants && product.variants.map(variant => <SearchedVariant key={variant.id} variant={variant} isChecked={checkedChildren.includes(variant.id)} handleChildrenCheck={handleChildrenCheck} />)
                }
            </div>
        </div>
    )
}

export default SearchedProductParent
