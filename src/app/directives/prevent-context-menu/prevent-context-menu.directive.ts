import { Directive, Input } from '@angular/core';
import { ContextMenu } from 'primeng/primeng';

@Directive({
  selector: '[appPreventContextMenu]'
})
export class PreventContextMenuDirective {
  @Input()
  private appPreventContextMenu: boolean;


  constructor(contextMenu: ContextMenu) {
    (<any>contextMenu).showBase = contextMenu.show;

    contextMenu.show = function (event?: MouseEvent) {
      if (!this.appPreventContextMenu) {
        (<any>contextMenu).showBase(event);
      }
    }.bind(this);
  }

}
