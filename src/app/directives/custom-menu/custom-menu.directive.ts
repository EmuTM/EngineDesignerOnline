import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from 'primeng/components/menu/menu';
import { MenuItem } from 'primeng/components/common/menuitem';

@Directive({
  selector: '[appCustomMenu]'
})
export class CustomMenuDirective {
  @Input()
  private menuState: any;

  @Output()
  public menuOpening: EventEmitter<any> = new EventEmitter();


  constructor(menu: Menu) {
    (<any>menu).itemClickBase = menu.itemClick;

    menu.itemClick = function ($event: any, item: MenuItem) {
      if (!this.menuState) {
        (<any>menu).itemClickBase($event, item);
      } else {
        if (item.disabled) {
          $event.preventDefault();
          return;
        }

        if (!item.url) {
          $event.preventDefault();
        }

        if (item.command) {
          item.command({
            original$event: $event,
            item: item,
            menu,
            state: this.menuState
          });
        }

        if (menu.popup) {
          menu.hide();
        }
      }
    }.bind(this);

    (<any>menu).showBase = menu.show;
    menu.show = function ($event: any) {
      this.menuOpening.emit({
        original$event: $event,
        menu,
        state: this.menuState
      });

      (<any>menu).showBase($event);
    }.bind(this);
  }

}
