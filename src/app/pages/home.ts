import { Component } from '@angular/core';
import { ExpenseForm } from '../components/expense-form/expense-form';

@Component({
  selector: 'app-home',
  imports: [ExpenseForm],
  template: `<app-expense-form></app-expense-form>`,
  styles: ``,
})
export class Home {}
