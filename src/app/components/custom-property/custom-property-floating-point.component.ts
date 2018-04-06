import { Component, Input } from '@angular/core';
import { RoundPipe } from 'ngx-pipes';
import { CustomPropertyComponent } from './custom-property.component';

@Component({
  selector: 'app-custom-property-floating-point',
  templateUrl: './custom-property.component.html'
})
export class CustomPropertyFloatingPointComponent extends CustomPropertyComponent {
  @Input()
  public caption: string;

  @Input()
  public value: any;

  @Input()
  public tooltip: string;

  @Input()
  public showTooltip: boolean;


  constructor() {
    super();
  }


  public transform(value: any, args: string): any {
    const val: number = new RoundPipe().transform(value, 2);

    if (!isNaN(val)) {
      return val.toString();
    } else {
      return value;
    }
  }

}
