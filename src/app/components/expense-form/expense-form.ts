import { Component, inject, input, model, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { ExpenseService } from '../../services/expense-service';
import { numberRangeValidator } from '../../validators';
import { Expense, FormTypes } from '../../types';
@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm implements OnInit {
  categoryService = inject(CategoryService)
  expenseService = inject(ExpenseService)
  isFormOpen = model<boolean>()
  formType = input<FormTypes>()
  expense = input<Expense>()
  expenseForm = new FormGroup({
    description: new FormControl(''),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      numberRangeValidator(0),
    ]),
    category: new FormControl('', [Validators.required]),
    date: new FormControl<Date | null>(null, [Validators.required])
  });
  formTypes = FormTypes;

  ngOnInit() {
    if (this.expense()) {
      this.expenseForm.patchValue({
        description: this.expense()!.description,
        amount: this.expense()!.amount,
        category: this.expense()!.category,
        date: this.expense()!.date,
      });
    }
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.expenseForm.invalid) return window.alert("Invalid Form");

    const formValue = {
      description: this.expenseForm.value.description!,
      amount: this.expenseForm.value.amount!,
      category: this.expenseForm.value.category!,
      date: this.expenseForm.value.date!
    };

    if (this.formType() === FormTypes.UPDATE && this.expense()) {
      this.expenseService.updateExpense({ id: this.expense()!.id, ...formValue });
    } else {
      this.expenseService.addExpense(formValue);
    }

    this.isFormOpen.set(false);
  }
  get amount() {
    return this.expenseForm.controls.amount;
  }
  get category() {
    return this.expenseForm.controls.category;
  }
  get date() {
    return this.expenseForm.controls.date;
  }
}
