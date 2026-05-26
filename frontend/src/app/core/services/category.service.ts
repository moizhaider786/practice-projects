import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category, CreateCategoryDto } from '../models/category.model';
import { Observable } from 'rxjs';

export interface ApiResponse<T = undefined> {
  message: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/getAll`);
  }

  create(category: CreateCategoryDto): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(this.apiUrl, category);
  }

  update(id: number, name: string): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.apiUrl}/${id}`, { name });
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  getChildren(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/${id}/children`);
  }
}
