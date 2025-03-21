import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotCheckedProductsComponent } from './pages/not-checked-products/not-checked-products-component';
import { ProcessedProductsComponent } from './pages/processed-products/processed-products.component';

const routes: Routes = [{
  path: 'notchecked',
  component:NotCheckedProductsComponent
},{
  path : 'processed',
  component : ProcessedProductsComponent
},
{
  path:'**',
  redirectTo:'notchecked'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
