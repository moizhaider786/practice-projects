import { Component, signal, inject } from '@angular/core';
import { ExpenseForm } from '../components/expense-form/expense-form';
import { ExpenseList } from '../components/expense-list/expense-list';
import { ExpenseService } from '../services/expense-service';
import { Expense, FormTypes } from '../types';
@Component({
  selector: 'app-home',
  imports: [ExpenseForm, ExpenseList],
  template: `
  @if(isExpFormOpen()){
  <app-expense-form
    [(isFormOpen)]="isExpFormOpen"
    [formType]="expFormType()"
    [expense]="expenseToEdit()">
  </app-expense-form>
  }
  <button (click)="addExpBtnClick()">Add Expense</button>

  <app-expense-list
    (editExpense)="editExpense($event)"
    (removeExpense)="removeExpense($event)"
    >
  </app-expense-list> 
 `,
  styles: ``,
})
export class Home {
  isExpFormOpen = signal<boolean>(false)
  expFormType = signal<FormTypes|undefined>(undefined);
  expenseToEdit = signal<Expense|undefined>(undefined);
  expenseService = inject(ExpenseService);
  formTypes = FormTypes;

  addExpBtnClick(){
    if(this.isExpFormOpen()) this.isExpFormOpen.set(false);
    this.expenseToEdit.set(undefined);
    this.expFormType.set(FormTypes.CREATE);
    this.isExpFormOpen.set(true);
  }
  
  editExpense(expense: Expense){
    if(this.isExpFormOpen()) this.isExpFormOpen.set(false);
    this.expenseToEdit.set(expense);
    this.expFormType.set(FormTypes.UPDATE);
    this.isExpFormOpen.set(true);
  }

  removeExpense(expense: Expense){
  this.expenseService.removeExpense(expense);
  }
}
