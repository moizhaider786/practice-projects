import { Routes } from '@angular/router';
import { CategoriesPageComponent } from './features/categories/categories-page/categories-page.component';
import { ProductsPageComponent } from './features/products/products-page/products-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'categories', component: CategoriesPageComponent },
  { path: 'products', component: ProductsPageComponent }
];
