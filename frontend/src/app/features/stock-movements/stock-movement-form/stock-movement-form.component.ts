import { Component, input, output } from '@angular/core';
import {StockMovementReason, StockMovementType} from '../../../core/models/types';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/models/product.model';
interface FormModel {
  quantity: number | null,
  unitPrice: number | null,
  type: StockMovementType | null,
  reason: StockMovementReason | null,
  referenceNote: string | null
}
@Component({
  selector: 'app-stock-movement-form',
  imports: [FormsModule],
  templateUrl: './stock-movement-form.component.html',
  styleUrl: './stock-movement-form.component.css',
})
export class StockMovementFormComponent {
  stockMovementReasons: StockMovementReason[] = Object.values(StockMovementReason);
  product = input<Product>();
  closeStockForm = output();
  stockMovement: FormModel = {
    quantity: null,
    unitPrice: null,
    type: null,
    reason: null,
    referenceNote: null
  }
  onSubmit(){
    console.log("stock movements loggs: ", this.stockMovement)
  }
}
