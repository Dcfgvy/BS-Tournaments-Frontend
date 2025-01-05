import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-wrapper',
  imports: [FormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: './form-wrapper.component.html',
  styleUrl: './form-wrapper.component.scss'
})
export class FormWrapperComponent {

}
