import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockMovement, StockMovementDto } from '../models/stock-movement.model';
import {ApiResponse} from '../models/types';
@Injectable({
  providedIn: 'root',
})
export class StockMovements {
  private apiUrl = `${environment.apiUrl}/products`;
  constructor(private http: HttpClient) {}
  stockIn(stockMovement: StockMovementDto): Observable<ApiResponse<StockMovement>> {
    return this.http.post<ApiResponse<StockMovement>>(`${this.apiUrl}/in`, stockMovement);
  }
  stockOut(stockMovement: StockMovementDto): Observable<ApiResponse<StockMovement>> {
    return this.http.post<ApiResponse<StockMovement>>(`${this.apiUrl}/out`, stockMovement);
  }
}
