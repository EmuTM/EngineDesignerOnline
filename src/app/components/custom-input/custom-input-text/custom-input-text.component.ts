import { Component, Input } from '@angular/core';
import { NgValueAccessorProvider } from '../../../app';
import { CustomInputBase } from '../custom-input-base';


@Component({
  selector: 'app-custom-input-text',
  templateUrl: './custom-input-text.component.html',
  // styleUrls: ['./custom-input-text.component.css'],
  providers: [NgValueAccessorProvider(() => CustomInputTextComponent)]
})
export class CustomInputTextComponent extends CustomInputBase {
  // pattern za validacijo vnosa
  @Input()
  protected pattern: string;


  // ker v HTMLju podamo referenco na funkcijo, moramo imeti tukaj stalno funkcijo, ki potem kliče ustrezen override (v htmlju ne smemo pozabiti na bind, ali pa mora biti ta funkcija lambda, ki že ima this context)
  public transformReference(value: any, args: string): any {
    return this.transform(value, args);
  }
  // to pa lahko overridamo
  protected transform(value: any, args: string): any {
    return value;
  }

}
