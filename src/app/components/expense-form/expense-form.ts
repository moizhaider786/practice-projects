import { Component, inject, model } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { ExpenseService } from '../../services/expense-service';
import { numberRangeValidator } from '../../validators';
@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm {
  categoryService = inject(CategoryService)
  expenseService = inject(ExpenseService)
  isFormOpen = model<boolean>()
  expenseForm = new FormGroup({
    description: new FormControl(''),
    amount: new FormControl<number|null>(null, [
      Validators.required,
      numberRangeValidator(0),
    ]),
    category: new FormControl('', [
      Validators.required
    ]),
    date: new FormControl(new Date(), [
      Validators.required
    ])
  })

  onSubmit(e: SubmitEvent){
    e.preventDefault();
    if(this.expenseForm.invalid) window.alert("Invalid Form")
    this.expenseService.addExpense({
      description: this.expenseForm.value.description!,
      amount: this.expenseForm.value.amount!,
      category: this.expenseForm.value.category!,
      date: this.expenseForm.value.date!
    })
  }

  get amount(){
    return this.expenseForm.controls.amount;
  }
  get category(){
    return this.expenseForm.controls.category;
  }
  get date(){
    return this.expenseForm.controls.date;
  }
}
