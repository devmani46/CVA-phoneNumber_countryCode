import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PhoneInputComponent, PhoneNumberValue } from './shared/phone-input/phone-input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PhoneInputComponent],
  templateUrl:'./app.html',
  styleUrl:'./app.scss',
})
export class AppComponent {
  form = new FormGroup({
    phone: new FormControl<PhoneNumberValue | null>(
      {
        countryIso: '',
        countryCode: '',
        nationalNumber: '',
      },
      { validators: [this.requiredNationalNumber] }
    )
  });

  requiredNationalNumber(control: AbstractControl): ValidationErrors | null {
    const v = control.value as PhoneNumberValue | null;
    return v && v.nationalNumber?.length ? null : { required: true };
  }

  submit() {
    console.log('Submitted value:', this.form.value.phone);
    alert('Check console for submitted value');
  }

}
