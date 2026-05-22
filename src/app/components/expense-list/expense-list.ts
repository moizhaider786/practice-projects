import { Component, inject, output } from '@angular/core';
import { ExpenseService } from '../../services/expense-service';
import { Expense } from '../../types';
@Component({
  selector: 'app-expense-list',
  imports: [],
  template: `
    <div>
      @for(exp of expenseService.expenses(); track exp.id){
        <li>
          <p>{{exp.id}}</p>
          <p>{{exp.category}}</p>
          <p>{{exp.description}}</p>
          <p>{{exp.amount}}</p>
          <button data-id={{exp.id}} (click)="editExpense.emit(exp)">Edit</button>
          <button (click)="removeExpense.emit(exp)">Delete</button>
        </li>
      }
    </div>
  `,
  styleUrl: './expense-list.css',
})
export class ExpenseList {
  editExpense=output<Expense>()
  removeExpense = output<Expense>();
  expenseService = inject(ExpenseService);
}
