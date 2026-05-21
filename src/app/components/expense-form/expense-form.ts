import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormSubmittedEvent } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm {
  categoryService = inject(CategoryService)
  expenseForm = new FormGroup({
    description: new FormControl(''),
    amount: new FormControl<number>(0),
    category: new FormControl(''),
    date: new FormControl(new Date())
  })
  onSubmit(e: SubmitEvent){
    e.preventDefault();
    console.log(this.expenseForm.value.description)
    console.log(this.expenseForm.value.amount)
    console.log(this.expenseForm.value.category)
    console.log(this.expenseForm.value.date)
  }
}
