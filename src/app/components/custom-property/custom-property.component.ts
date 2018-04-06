import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-property',
  templateUrl: './custom-property.component.html'
})
export class CustomPropertyComponent {
  @Input()
  public caption: string;

  @Input()
  public value: any;

  @Input()
  public tooltip: string;

  @Input()
  public showTooltip: boolean;


  constructor() { }


  // ker v HTMLju podamo referenco na funkcijo, moramo imeti tukaj stalno funkcijo, ki potem kliče ustrezen override (v htmlju ne smemo pozabiti na bind, ali pa mora biti ta funkcija lambda, ki že ima this context)
  public transformReference(value: any, args: string): any {
    return this.transform(value, args);
  }
  // to pa lahko overridamo
  protected transform(value: any, args: string): any {
    return value;
  }

}
