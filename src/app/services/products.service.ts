

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/products-interface';
import { ProductAdapter } from '../adapters/productAdapter';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  api_endPoint : string = "https://67da4af935c87309f52bd401.mockapi.io/prodschecker/products/products";

  getProducts() : Observable < Product []> {
    return this.http.get<any []>(this.api_endPoint).pipe(map((data: any[]) => data.map(ProductAdapter.productAdapterFromApi)));
  }
}
