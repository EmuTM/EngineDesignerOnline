import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { Tooltip } from 'primeng/primeng';
import { DomHandler } from 'primeng/components/dom/domhandler';

@Directive({
  selector: '[appCustomTooltip]',
  providers: [DomHandler]
})

export class CustomTooltipDirective extends Tooltip implements OnInit, OnChanges {
  @Input()
  public tooltipText: string;

  @Input()
  public showTooltip: boolean;


  constructor(el: ElementRef, domHandler: DomHandler, zone: NgZone) {
    super(el, domHandler, zone);

    this.life = 3000;
  }


  public ngOnInit() {
    this.text = this.tooltipText;
    this.disabled = !this.showTooltip;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.showTooltip) {
      this.disabled = !this.showTooltip;
    }
  }

}
