import { Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';


export class CustomInputBase implements ControlValueAccessor {
  @Input()
  public caption: string;

  @Input()
  public tooltip: string;

  @Input()
  public showTooltip: boolean;

  @Input()
  public disabled: boolean;

  // tukaj lahko damo callback, kjer poskrbimo za custom pretvorbo (ker imamo sicer value kot string zaradi angular/html fint!)
  @Input()
  public converter: (value: string) => any;

  @Output()
  public valueChanged: EventEmitter<any> = new EventEmitter();


  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;


  private _value: any = '';
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    if (value) {
      value = this.converter(value.toString());
    }

    if (value !== this._value) {
      this._value = value;
      this.onChangeCallback(value);

      this.valueChanged.emit(this.value);
    }
  }


  constructor() {
    // če ni drugega konverterja, velja ta
    this.converter = (value: string): any => value;
  }


  // ne vem, če to rabimo?!
  // private onBlur() {
  //   this.onTouchedCallback();
  // }
  public writeValue(value: any) {
    if (value !== this._value) {
      this._value = value;
    }
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}
