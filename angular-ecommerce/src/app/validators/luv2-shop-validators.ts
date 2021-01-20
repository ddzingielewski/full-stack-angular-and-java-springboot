import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Luv2ShopValidators {
  //white space validation
  static notOnlyWhiteSigns(control: FormControl): ValidationErrors {
    if (control.value && control.value.trim().length === 0) {
      return { notOnlyWhiteSigns: true };
    }
    return null;
  }

  static onlyDigitsWithLength(lengthToBe: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors =>{
      if (control.value && !this.isNumber(control.value)) {
        return { notADigit: true };
      }
      if (control.value && control.value.trim().length !== lengthToBe) {
        return { requiredLengthNotSatisfied: true, requiredValueLength: lengthToBe };
      }
      return null;
    }
  }

  private static isNumber(value: string): boolean {
    return value != null && value.trim() !== '' && !isNaN(Number(value.toString()));
  }
}
