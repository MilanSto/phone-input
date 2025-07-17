import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal, WritableSignal, Optional } from '@angular/core';
import { ValidatorFn, AbstractControl, FormControl, FormGroupDirective, UntypedFormControl } from '@angular/forms';
import { CountryISO, TextLabels } from 'ngx-material-intl-tel-input';
import { PhoneNumberUtil, PhoneNumberType } from 'google-libphonenumber';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const validPhoneTypes = [PhoneNumberType.MOBILE, PhoneNumberType.FIXED_LINE_OR_MOBILE];
export function IsMobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let validNumber = false;
    try {
      const phoneNumberUtil = PhoneNumberUtil.getInstance();
      const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(control.value);
      const phoneType = phoneNumberUtil.getNumberType(phoneNumber);
      validNumber = validPhoneTypes.includes(phoneType);
    } catch (e) {}

    return validNumber ? null! : { notAMobile: { value: control.value } };
  };
}

@UntilDestroy()
@Component({
  selector: 'app-international-mobile-phone',
  templateUrl: './international-mobile-phone.component.html',
  styleUrl: './international-mobile-phone.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class InternationalMobilePhoneComponent implements OnInit {
  preferredCountries: CountryISO[] = [CountryISO.UnitedKingdom, CountryISO.UnitedStates];

  proxyControl = new FormControl();

  textLabels = <TextLabels>{
    mainLabel: 'Mobile number',
    codePlaceholder: 'Code',
    searchPlaceholderLabel: 'Search',
    noEntriesFoundLabel: 'No countries found',
    nationalNumberLabel: 'Number',
    hintLabel: 'Select a country and enter a mobile number. A mobile that can receive SMS is required to login.',
    invalidNumberError: 'Number is not valid',
    requiredError: 'This field is required'
  };

  private formGroupDirective: FormGroupDirective | null = inject(FormGroupDirective, { optional: true });

  @Input() formPropertyName = 'phoneNumber';

  phone: WritableSignal<string | undefined> = signal(undefined);

  ngOnInit() {
    console.log('FormGroupDirective:', this.formGroupDirective);
    
    if (!this.formGroupDirective) {
      console.error('FormGroupDirective not found. Component may not be inside a form group.');
      return;
    }
    
    const formGroup = this.formGroupDirective.control;
    console.log('FormGroup:', formGroup);
    
    const formControl = formGroup.get(this.formPropertyName) as UntypedFormControl;
    console.log('FormControl:', formControl, 'PropertyName:', this.formPropertyName);
    
    if (!formControl) {
      console.error(`FormControl with name '${this.formPropertyName}' not found in parent form group.`);
      return;
    }

    this.phone.update((_) => formControl.value);

    const validator = IsMobileNumberValidator();

    this.proxyControl.addValidators(validator);
    formControl.addValidators(validator);

    this.proxyControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value: string) => {
      if (formControl) {
        formControl.setValue(value?.replace(/\s|-/g, ''));
      }
    });
  }
} 