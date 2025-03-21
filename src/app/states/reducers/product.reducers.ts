import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products-interface';
import * as ProductsActions from 'src/app/states/actions/product.actions'


export interface ProductState {
  products: Product[]; 
  loading: boolean; 
  error: any; 
}


export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
};


export const productReducer = createReducer(
  initialState,


  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),


  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false
  })),


  on(ProductsActions.loadProductsError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);