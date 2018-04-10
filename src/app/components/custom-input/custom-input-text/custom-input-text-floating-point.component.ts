import { Component } from '@angular/core';
import { NgValueAccessorProvider } from '../../../app';
import { RoundPipe } from 'ngx-pipes';
import { CustomInputTextComponent } from './custom-input-text.component';


@Component({
  selector: 'app-custom-input-text-floating-point',
  templateUrl: './custom-input-text.component.html',
  providers: [NgValueAccessorProvider(CustomInputTextFloatingPointComponent)]
})
export class CustomInputTextFloatingPointComponent extends CustomInputTextComponent {
  constructor() {
    super();

    // če ni drugega konverterja, velja ta
    this.converter = (value: string): any => parseFloat(value);
    // če ni drugega patterna, velja ta
    this.pattern = '[0-9]*\.?[0-9]+';
  }


  protected transform(value: any, args: string): any {
    const val: number = new RoundPipe().transform(value, 2);
    return val;
    // if (!isNaN(val)) {
    //   return val.toString();
    // } else {
    //   return value;
    // }
  }

}
