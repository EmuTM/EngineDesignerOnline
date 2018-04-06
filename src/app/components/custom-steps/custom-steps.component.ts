import { Component, OnInit, AfterContentInit, OnChanges, Input, Output, EventEmitter, ContentChildren, QueryList, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MenuItem, MenuItemContent } from 'primeng/primeng';
import { CustomStepComponent } from './custom-step/custom-step.component';


@Component({
  selector: 'app-custom-steps',
  templateUrl: './custom-steps.component.html',
  styleUrls: ['./custom-steps.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomStepsComponent implements AfterContentInit, OnChanges {
  @Input()
  public currentStep: number = 0;

  @Input()
  public readonly: boolean = false;

  @Output()
  public currentStepChanged: EventEmitter<number> = new EventEmitter();


  public items: MenuItem[] = [];

  @ContentChildren(CustomStepComponent)
  public customSteps: QueryList<CustomStepComponent>;


  ngAfterContentInit() {
    // naredimo menuIteme za vse definirane stepe
    this.customSteps.toArray().forEach((step: CustomStepComponent, index: number) => {

      // če je trenutni, je viden
      if (index === this.currentStep) {
        step.active = true;
      }

      this.items[index] = /* MenuItem */{
        id: index.toString(),
        label: step.label,
        command: (event: any) => {
          this.itemClicked(step, index);
        }
      };
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.customSteps) {
      return;
    }

    for (const prop in changes) {
      if (prop === 'currentStep') {
        const curIndex = changes[prop].currentValue;

        if ((curIndex < 0)
          || (curIndex >= this.customSteps.length)) {
          throw new Error('Step out of range: ' + curIndex.toString());
        }

        this.customSteps.toArray().forEach((step: CustomStepComponent, index: number) => {
          const selected = index === curIndex;
          step.active = selected;

          if (selected) {
            this.currentStepChanged.next(index);
          }
        });
      }
    }
  }


  private itemClicked(step: CustomStepComponent, index: number): void {
    // nastavimo vsem active na false
    this.customSteps.toArray().forEach((s: CustomStepComponent) => s.active = false);

    // samo kliknjenemu na true
    step.active = true;
    this.currentStep = index;

    // emit currently selected index (two-way binding)
    this.currentStepChanged.emit(index);
  }

}
