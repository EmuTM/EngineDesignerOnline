import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-custom-step',
  templateUrl: './custom-step.component.html',
  styleUrls: ['./custom-step.component.css']
})
export class CustomStepComponent {
  @Input()
  public label: string;


  public active: boolean = false;

}
