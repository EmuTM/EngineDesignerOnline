import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Panel, MenuItem, Menu } from 'primeng/primeng';
import { AccordionTab } from 'primeng/primeng';

@Component({
  selector: 'app-custom-panel',
  templateUrl: './custom-panel.component.html',
  styleUrls: ['./custom-panel.component.css']
})
export class CustomPanelComponent implements OnInit {
  @Input()
  public tooltip: string;

  @Input()
  public showTooltip: string;

  @Input()
  public caption: string;

  @Input()
  public collapsed: boolean;

  @Input()
  public menuModel: MenuItem[];

  @Input()
  public menuState: any;

  @Input()
  public disabled: boolean;


  @Output()
  public menuOpening: EventEmitter<any> = new EventEmitter();



  @ViewChild('accordionTab')
  public accordionTab: AccordionTab;

  @ViewChild('menu')
  public menu: Menu;


  public get icon(): string {
    return this.accordionTab.selected ? 'fa fa-fw fa-caret-down' : 'fa fa-fw fa-caret-right';
  }


  constructor(public el: ElementRef) { }
  ngOnInit() {
    this.accordionTab.selectedChange.subscribe(
      () => {
        if (this.menu) {
          this.menu.hide();
        }
      });
  }


  public toggleMenu($event: any): void {
    this.menu.toggle($event);
    $event.stopPropagation();
  }

  public onMenuOpening($event: any) {
    this.menuOpening.emit($event);
  }

}
