import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import generateRandomId from "../../utils/generateRandomId";
import axios from "axios";

const initialState = {
    products: [
        {
            id: generateRandomId(),
        }
    ],
    searchedProducts: {
        loading: true,
        data: [],
        error: ''
    },
    selectedProducts: {
        productIds: [],
        mappings: {}
    },
    currentEditingProduct: null,
    dummyProds: {
        loading: true,
        data: [],
        error: ''
    }
}

export const fetchSearchedProducts = createAsyncThunk('products/fetchSearchedProducts', async () => {
    return axios.get('https://jsonplaceholder.typicode.com/comments').then(res => res.data).catch(err => err.message);
})

const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        addProducts: (state, action) => {
            state.products = [...state.products, ...action.payload];
        },
        setSearchedProducts: (state, action) => {
            state.searchedProducts.loading = false;
            state.searchedProducts.error = '';
            state.searchedProducts.data = action.payload;
        },
        setSelectedProducts: (state, action) => {
            const { prodId, variantIds } = action.payload;
            if (!state.selectedProducts.productIds.includes(prodId)) {
                state.selectedProducts.productIds = [...state.selectedProducts.productIds, prodId];
            }
            else {
                if (variantIds.length === 0) {
                    state.selectedProducts.productIds = state.selectedProducts.productIds.filter(pId => pId !== prodId);
                }
            }
            state.selectedProducts.mappings[prodId] = variantIds;
        },
        setCurrentEditingProduct: (state, action) => {
            state.currentEditingProduct = action.payload;
        },
        addSelectedProductsToProducts: (state, action) => {
            let newProds = state.selectedProducts.productIds.map(prodId => {
                let newProd = state.searchedProducts.data.find(p => p.id === prodId);
                let newVariants = newProd.variants.filter(variant => state.selectedProducts.mappings[prodId].includes(variant.id));
                newProd.variants = newVariants;
                return newProd;
            });
            let indexNo = state.products.findIndex(prod => prod.id === action.payload);
            state.products.splice(indexNo, 1, ...newProds);
        },
        resetSelectedProducts: (state) => {
            state.selectedProducts = {
                productIds: [],
                mappings: {}
            };
        },
        removeProduct: (state, action) => {
            let newProds = state.products.filter(prod => prod.id !== action.payload);
            state.products = newProds;
        },
        removeVariant: (state, action) => {
            const { prodId, variantId } = action.payload;
            let selProd = state.products.find(prod => prod.id === prodId);
            let newVariants = selProd.variants.filter(variant => variant.id !== variantId);
            selProd.variants = newVariants;
            let newProds = state.products.map(prod => {
                if (prod.id === prodId) {
                    return selProd;
                }
                return prod;
            });
            state.products = newProds;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchedProducts.pending, (state, action) => {
            state.dummyProds.loading = true;
        }).addCase(fetchSearchedProducts.fulfilled, (state, action) => {
            state.dummyProds.data = action.payload;
            state.dummyProds.loading = false;
        }).addCase(fetchSearchedProducts.rejected, (state, action) => {
            state.dummyProds.error = action.error.message;
            state.dummyProds.loading = false;
        })
    }
});

export const { addProducts, setSearchedProducts, setSelectedProducts, setCurrentEditingProduct, addSelectedProductsToProducts, resetSelectedProducts, removeProduct, removeVariant } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;