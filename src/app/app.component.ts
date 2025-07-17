import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  phoneForm: FormGroup;
  submittedValue: any = null;

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      phoneNumber: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.phoneForm.valid) {
      this.submittedValue = {
        phoneNumber: this.phoneForm.get('phoneNumber')?.value
      };
      console.log('Form submitted:', this.submittedValue);
    }
  }
} 