import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/products-interface';
import { selectAllProducts, selectError, selectLoading } from 'src/app/states/selectors/product.selectors';

@Component({
  selector: 'app-processed-products',
  templateUrl: './processed-products.component.html'
})
export class ProcessedProductsComponent implements OnInit {

  constructor(private store: Store<{ products: { products: Product[], loading: boolean, error: any } }>) { }
  products$ !: Observable<Product[]>;  
  loading$ !: Observable<boolean>;     
  error$ !: Observable<any>; 
  actions : string [] = ['accepted','refused'];
  acceptedProducts : Product[]=[];
  refusedProducts : Product[]=[];
  toShowProducts : Product[] = [];
  actionToShow !: string ;
  ngOnInit(): void {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    let checkedsIds : number[]=[];
    let uncheckedsIds : number[]=[];

    /*Aqui leemos del LocalStorage los productos aceptados y rechazados*/
    if(localStorage.getItem('checkedIds')!=null){
      const chkids = localStorage.getItem('checkedIds');
      checkedsIds = chkids ? JSON.parse(chkids) : [];
    }
       
    if(localStorage.getItem('uncheckedIds')!=null){
      const unckids = localStorage.getItem('uncheckedIds');
      uncheckedsIds = unckids ? JSON.parse(unckids) : [];
    }
    this.products$.subscribe(products=>{
      products.forEach(p => {
         if(checkedsIds.indexOf(p.id)!=-1)
            this.acceptedProducts.push(p);
         else
         if(uncheckedsIds.indexOf(p.id)!=-1)
          this.refusedProducts.push(p);
      });
    })

  }

   changeSelection(){
     if(this.actionToShow=='accepted')
      this.toShowProducts = this.acceptedProducts;
     else
      this.toShowProducts = this.refusedProducts;
   }

}
