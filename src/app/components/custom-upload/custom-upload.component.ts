import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-custom-upload',
  templateUrl: './custom-upload.component.html'
})
export class CustomUploadComponent {
  @ViewChild('input')
  private input: ElementRef;


  @Input()
  public selectMany: boolean;

  @Input()
  public filter: string;


  private callback: (fileList: FileList) => void;


  public showModal(callback: (fileList: FileList) => void): void {
    this.callback = callback;

    // to mora bit, ker čene se ne zgodi change event, če izberemo isti fajl
    this.input.nativeElement.value = '';
    this.input.nativeElement.click();
  }


  public change($event: any) {
    this.callback($event.target.files);
  }

}
