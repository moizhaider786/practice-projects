import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  _categories = signal<string[]>([])
  categories = this._categories.asReadonly()
  constructor(){
    const jsonCategories = window.localStorage.getItem('categories')||'[]';
    const categories: string[] = JSON.parse(jsonCategories)
    this._categories.set(categories);
  }
  addCategory(category: string){
      const jsonCategories = window.localStorage.getItem('categories')||'[]';
      const categories: string[] = JSON.parse(jsonCategories)
      categories.push(category);
      window.localStorage.setItem('categories', JSON.stringify(categories));
      this._categories.set(categories)
  }
  deleteCategory(category: string){
    const jsonCategories = window.localStorage.getItem('categories')||'[]';
    const categories: string[] = JSON.parse(jsonCategories);
    const idx = categories.findIndex(c=>c===category)
    if(idx<0) return;
    categories.splice(idx, 1);
    window.localStorage.setItem('categories', JSON.stringify(categories));
    this._categories.set(categories)
  } 
}
