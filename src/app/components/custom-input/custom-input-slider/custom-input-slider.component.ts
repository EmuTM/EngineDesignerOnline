import { Component, OnInit, Input } from '@angular/core';
import { NgValueAccessorProvider } from '../../../app';
import { CustomInputBase } from '../custom-input-base';


@Component({
  selector: 'app-custom-input-slider',
  templateUrl: './custom-input-slider.component.html',
  providers: [NgValueAccessorProvider(CustomInputSliderComponent)]
})
export class CustomInputSliderComponent extends CustomInputBase {
  @Input()
  public min: number;

  @Input()
  public max: number;


  constructor() {
    super();

    this.converter = (value: string): any => parseFloat(value);
  }

}
