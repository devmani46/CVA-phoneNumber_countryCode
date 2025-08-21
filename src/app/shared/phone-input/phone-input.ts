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
  countryIso: any;
  countryCode: any;
  nationalNumber: string;
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
  { iso: 'CA', name: 'Canada',        flag: '🇨🇦', code: '1'   },
  { iso: 'GB', name: 'United Kingdom', flag: '🇬🇧', code: '44'  },
  { iso: 'AU', name: 'Australia',      flag: '🇦🇺', code: '61'  },
  { iso: 'DE', name: 'Germany',        flag: '🇩🇪', code: '49'  },
  { iso: 'FR', name: 'France',         flag: '🇫🇷', code: '33'  },
  { iso: 'JP', name: 'Japan',          flag: '🇯🇵', code: '81'  },
  { iso: 'BR', name: 'Brazil',         flag: '🇧🇷', code: '55'  },
  { iso: 'ZA', name: 'South Africa',   flag: '🇿🇦', code: '27'  },
  { iso: 'IT', name: 'Italy',          flag: '🇮🇹', code: '39'  },
  { iso: 'ES', name: 'Spain',          flag: '🇪🇸', code: '34'  },
  { iso: 'CN', name: 'China',          flag: '🇨🇳', code: '86'  },
  { iso: 'MX', name: 'Mexico',         flag: '🇲🇽', code: '52'  },
  { iso: 'KR', name: 'South Korea',    flag: '🇰🇷', code: '82'  },
  { iso: 'SG', name: 'Singapore',      flag: '🇸🇬', code: '65'  },

  ];

  countryIso = 'NP';
  nationalNumber = '';
  disabled = false;


  private onChange: (val: PhoneNumberValue | null) => void = () => {};
  private touchedCb: () => void = () => {};
  c: any;

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
