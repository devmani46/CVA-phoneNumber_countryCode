import {
  Component,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface PhoneNumberValue {
  countryIso: string;       // ISO code like 'NP'
  countryCode: string;      // dialing code like '977'
  nationalNumber: string;   // local number
}

type Country = { iso: string; name: string; code: string; flag: string };

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PhoneInputComponent),
    },
  ],
  templateUrl : './phone-input.html',
  styleUrl : './phone-input.scss',


})
export class PhoneInputComponent implements ControlValueAccessor {
  countries: Country[] = [
    { iso: 'NP', name: 'Nepal',         flag: '🇳🇵', code: '977' },
    { iso: 'US', name: 'United States', flag: '🇺🇸', code: '1'   },
    { iso: 'IN', name: 'India',         flag: '🇮🇳', code: '91'  },
  ];

  countryIso = 'NP';
  nationalNumber = '';
  disabled = false;


  private onChange: (val: PhoneNumberValue | null) => void = () => {};
  private touchedCb: () => void = () => {};

  get countryCode(): string {
    return this.countries.find(c => c.iso === this.countryIso)?.code ?? '';
  }

  writeValue(value: PhoneNumberValue | null): void {
    if (!value) {
      this.countryIso = 'NP';
      this.nationalNumber = '';
      return;
    }
    this.countryIso = value.countryIso || 'NP';
    this.nationalNumber = (value.nationalNumber ?? '').replace(/\D/g, '');
  }

  registerOnChange(fn: (val: PhoneNumberValue | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.touchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ---- UI handlers ----
  onCountryChange(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.countryIso = selectEl.value;
    this.propagate();
  }

  onNumberInput(event: Event) {
    const inputEl = event.target as HTMLInputElement;
    this.nationalNumber = inputEl.value.replace(/\D/g, '');
    this.propagate();
  }

  markTouched() {
    this.touchedCb();
  }

  private propagate() {
    const val: PhoneNumberValue = {
      countryIso: this.countryIso,
      countryCode: this.countryCode,
      nationalNumber: this.nationalNumber,
    };
    this.onChange(val);
  }
}
