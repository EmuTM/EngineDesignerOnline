import { Component, Input } from '@angular/core';
import { NgValueAccessorProvider } from '../../../app';
import { CustomInputBase } from '../custom-input-base';


@Component({
  selector: 'app-custom-input-dropdown',
  templateUrl: './custom-input-dropdown.component.html',
  // styleUrls: ['./custom-input-dropdown.component.css']
  providers: [NgValueAccessorProvider(CustomInputDropdownComponent)]
})
export class CustomInputDropdownComponent extends CustomInputBase {
  @Input()
  public items: any[];

  // ta filed bo vzelo za prikaz v dropdownu, če so itemi neki objekti
  @Input()
  public itemFieldAsLabel: string;

}
