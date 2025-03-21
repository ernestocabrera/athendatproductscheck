import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { productReducer } from './states/reducers/product.reducers';
import { ProductEffects } from './states/effects/product.effects';
import { MaterialModule } from './material/material.module';
import { ProductComponent } from './pages/product/product.component';
import { FormsModule } from '@angular/forms';
import { NotCheckedProductsComponent } from './pages/not-checked-products/not-checked-products-component';
import { ProcessedProductsComponent } from './pages/processed-products/processed-products.component';

@NgModule({
  declarations: [
    AppComponent,
    NotCheckedProductsComponent,
    ProductComponent,
    ProcessedProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([ProductEffects]),
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
