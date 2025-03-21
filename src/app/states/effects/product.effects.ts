import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductsActions from 'src/app/states/actions/product.actions'
import { ProductsService } from 'src/app/services/products.service';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productsrv: ProductsService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.productsrv.getProducts().pipe(
          map(products => ProductsActions.loadProductsSuccess({products })), 
          catchError(error => of(ProductsActions.loadProductsError({ error }))) 
        )
      )
    )
  );
}