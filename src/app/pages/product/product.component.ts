import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/products-interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {

  constructor() { }
  @Input() product !: Product;
  @Input() productIndex !: number;
  @Output() eventCheckedChange : EventEmitter<{checked: boolean,index : number}> = new EventEmitter();
  checked : boolean =false ;
  
  ngOnInit(): void {
     
  }
  updateCheckedEvent(){
     this.eventCheckedChange.emit({
       checked: this.checked,
       index: this.productIndex
     });
  }

}
