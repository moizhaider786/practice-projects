import { Component, signal } from '@angular/core';
import { ExpenseForm } from '../components/expense-form/expense-form';
import { ExpenseList } from '../components/expense-list/expense-list';
import { Expense, FormTypes } from '../types';
@Component({
  selector: 'app-home',
  imports: [ExpenseForm, ExpenseList],
  template: `
  @if(isExpFormOpen()){
    <app-expense-form [(isFormOpen)]="isExpFormOpen"></app-expense-form>
  }
  <button (click)="isExpFormOpen.set(true)">Add Expense</button>

  <app-expense-list (editExpense)="editExpense"></app-expense-list>
  `,
  styles: ``,
})
export class Home {
  isExpFormOpen = signal<boolean>(false)
  expFormType = signal<FormTypes | null >(null);
  editExpense(expense: Expense){
    this.expFormType.set(FormTypes.UPDATE);
    this.isExpFormOpen.set(true);
    
  }
}
