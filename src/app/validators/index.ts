import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function numberRangeValidator(a: number = -Infinity, b:number = Infinity): ValidatorFn{
 return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = control.value < a || control.value > b;
    return forbidden ? {numberRange: {value: control.value}} : null;
  };
}