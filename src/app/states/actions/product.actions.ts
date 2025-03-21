import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/interfaces/products-interface';


export const loadProducts = createAction('[Product] Load Products');


export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);


export const loadProductsError = createAction(
  '[Product] Load Products Error',
  props<{ error: any }>()
);