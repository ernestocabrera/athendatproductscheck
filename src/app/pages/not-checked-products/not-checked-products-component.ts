import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/products-interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllProducts, selectError, selectLoading } from '../../states/selectors/product.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'not-checked-products-component',
  templateUrl: './not-checked-products-component.html',
  styles: [
  ]
})
export class NotCheckedProductsComponent implements OnInit {

  constructor(private route : Router, private store: Store<{ products: { products: Product[], loading: boolean, error: any } }>) { }
  products$ !: Observable<Product[]>;  
  loading$ !: Observable<boolean>;     
  error$ !: Observable<any>;  
  
  toShowProducts !: Product[] ;
  checkedProducts : boolean [] = [];
  ngOnInit(): void {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.updateProductsToShow();
    
  }
  updateProductsToShow(){
    this.products$.subscribe(res=>{
      let acceptedIds = this.getIdsFromLocalStorage('checkedIds');
      let refusedIds = this.getIdsFromLocalStorage('uncheckedIds');
      let productsNotProcess = res.filter(p => acceptedIds.indexOf(p.id)==-1 && refusedIds.indexOf(p.id)==-1)
      this.toShowProducts  =productsNotProcess.slice(0,10);
      this.checkedProducts = new Array(10).fill(false);
    });
  }
  updateCheckedProduct(data : any){
    this.checkedProducts[data.index] = data.checked;
  }
  processedNavigate(){
    this.route.navigate(['processed']);
  }
  
   getIdsFromLocalStorage(label : string) : number[]{
     let ids : number[]=[];
     if(localStorage.getItem(label)!=null){
      const data = localStorage.getItem(label);
      ids = data ? JSON.parse(data) : [];
    }
     return ids;
   }


  /*Esta funcion hace una verificacion para no repetir ids en los datos. Dado que en la prueba no se especifica como proceder en caso de 
  volver a cargar la pagina y los datos sean leidos nuevamente de la api. De todas formas, al cargar la pagina, eliminamos de los productos a mostrar
  aquellos que ya se encuentran chequeados o rechazados*/
  saveCheckSelection(){
    let checkedsIds : number[]=this.getIdsFromLocalStorage('checkedIds');
    let uncheckedsIds : number[]=this.getIdsFromLocalStorage('uncheckedIds');
    /* if(localStorage.getItem('checkedIds')!=null){
      const chkids = localStorage.getItem('checkedIds');
      checkedsIds = chkids ? JSON.parse(chkids) : [];
    }
       
    if(localStorage.getItem('uncheckedIds')!=null){
      const unckids = localStorage.getItem('uncheckedIds');
      uncheckedsIds = unckids ? JSON.parse(unckids) : [];
    } */
    console.log(checkedsIds);
    console.log(uncheckedsIds);
    for(let i = 0 ; i < this.toShowProducts.length ; i++){
      if(this.checkedProducts[i]==true){
        if(checkedsIds.indexOf(this.toShowProducts[i].id)==-1){
          checkedsIds.push(this.toShowProducts[i].id);
        }
      }else{
        if(uncheckedsIds.indexOf(this.toShowProducts[i].id)==-1){
          uncheckedsIds.push(this.toShowProducts[i].id);
        }
      }
    }
    localStorage.setItem('checkedIds',JSON.stringify(checkedsIds));
    localStorage.setItem('uncheckedIds',JSON.stringify(uncheckedsIds));
    this.updateProductsToShow();
  }
}
