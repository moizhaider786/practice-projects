import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Expense } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  _expenses = signal<Expense[]>([]);
  expenses = this._expenses.asReadonly();

  constructor(){
    const jsonExpenses = localStorage.getItem('expenses')||'[]';
    const expenses = JSON.parse(jsonExpenses);
    this._expenses.set(expenses);
  }

  addExpense(expense: Omit<Expense, 'id'>){
    this._expenses.update(exp=>[...exp, {id: this._expenses().length, ...expense}]);
    localStorage.setItem('expenses', JSON.stringify(this._expenses));
  }
  updateExpense(expense: Expense){
    this._expenses.update((exp)=>{
      const idx = exp.findIndex(e=>e.id===expense.id);
      const arr = [...exp];
      arr[idx] = expense;
      return arr;
    });
    localStorage.setItem('expenses', JSON.stringify(this._expenses));
  }
  removeExpense(expense: Expense){
    this._expenses.update((exp)=>{
      const idx = exp.findIndex(e=>e.id===expense.id);
      const arr = [...exp];
      arr.splice(idx, 1);
      return arr;
    });
    localStorage.setItem('expenses', JSON.stringify(this._expenses));
  }
}
