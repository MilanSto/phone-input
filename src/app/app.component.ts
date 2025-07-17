import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxMaterialIntlTelInputComponent } from 'ngx-material-intl-tel-input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaterialIntlTelInputComponent
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Phone Input Example</mat-card-title>
          <mat-card-subtitle>Using ngx-material-intl-tel-input with Angular 19</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="phoneForm" class="example-form">
            <ngx-material-intl-tel-input
              tid="phone"
              [fieldControl]="proxyControl"
              [iconMakeCall]="false"
              [required]="true"
              [preferredCountries]="preferredCountries"
              [autoIpLookup]="true"
              [numberValidation]="false"
              [autoSelectCountry]="true"
              [textLabels]="textLabels"
              [initialValue]="phone()">
            </ngx-material-intl-tel-input>
            
            <div style="margin-top: 20px;">
              <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="phoneForm.invalid">
                Submit
              </button>
            </div>
          </form>
          
          <div style="margin-top: 20px;" *ngIf="submittedValue">
            <h3>Submitted Value:</h3>
            <pre>{{ submittedValue | json }}</pre>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .custom {
      width: 100%;
    }
  `]
})
export class AppComponent {
  proxyControl = new FormControl('', [Validators.required]);
  phoneForm: FormGroup;
  submittedValue: any = null;
  
  preferredCountries = ['us', 'gb', 'ca'];
  
  textLabels = {
    mainLabel: 'Phone number',
    codePlaceholder: 'Code',
    searchPlaceholderLabel: 'Search',
    noEntriesFoundLabel: 'No countries found',
    nationalNumberLabel: 'Number',
    hintLabel: 'Select country and type your phone number',
    invalidNumberError: 'Number is not valid',
    requiredError: 'This field is required'
  };
  
  phone = () => '';

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      phone: this.proxyControl
    });
  }

  onSubmit() {
    if (this.phoneForm.valid) {
      this.submittedValue = {
        phone: this.proxyControl.value
      };
      console.log('Form submitted:', this.submittedValue);
    }
  }
} 