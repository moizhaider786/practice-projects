import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product, CreateProductDto } from '../models/product.model';
import { Observable } from 'rxjs';
import { ApiResponse } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`);
  }

  create(product: CreateProductDto): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(this.apiUrl, product);
  }

  update(id: number, product: CreateProductDto): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  getByCategory(categoryId: number): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/category/${categoryId}`);
  }
}
