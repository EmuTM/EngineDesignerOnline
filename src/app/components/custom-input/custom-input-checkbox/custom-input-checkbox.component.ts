import { Component } from '@angular/core';
import { NgValueAccessorProvider } from '../../../app';
import { CustomInputBase } from '../custom-input-base';

@Component({
  selector: 'app-custom-input-checkbox',
  templateUrl: './custom-input-checkbox.component.html',
  styleUrls: ['./custom-input-checkbox.component.css'],
  providers: [NgValueAccessorProvider(() => CustomInputCheckboxComponent)]

})
export class CustomInputCheckboxComponent extends CustomInputBase {

}
