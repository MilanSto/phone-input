import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxMaterialIntlTelInputComponent } from 'ngx-material-intl-tel-input';

import { AppComponent } from './app.component';
import { InternationalMobilePhoneComponent } from './international-mobile-phone/international-mobile-phone.component';

@NgModule({
  declarations: [
    AppComponent,
    InternationalMobilePhoneComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    NgxMaterialIntlTelInputComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 