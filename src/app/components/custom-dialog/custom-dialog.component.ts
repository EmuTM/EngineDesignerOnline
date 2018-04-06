import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Dialog } from 'primeng/primeng';


@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent {
  // tukaj lahko navedemo disablane gumbe (to je bolj za extendanje mišljeno)
  public disabledActions: DialogAction;
  // tukaj lahko navedemo gumbe, ki ne ugasnejo dialoga (to je bolj za extendanje mišljeno)
  public noCloseActions: DialogAction;
  // tukaj lahko navedemo posebne gumbe  (to je bolj za extendanje mišljeno)
  public dialogCustomActions: DialogCustomAction[];


  public dialogVisible: boolean = false;
  public title: string;
  public text: string;
  public dialogIcon: string;


  private callback: (dialogAction: DialogAction, state?: any) => void = null;
  private dialogActions: DialogAction;
  private defaultAction: DialogAction;
  private state: any;


  public showModal(
    title: string, text?: string,
    callback?: (dialogAction: DialogAction, state?: any) => void,
    dialogActions?: DialogAction,
    dialogIcon?: DialogIcon,
    defaultAction?: DialogAction,
    state?: any): void {
    this.title = title;
    this.text = text;
    this.callback = callback;
    this.dialogActions = dialogActions;
    this.defaultAction = dialogActions;
    this.state = state;

    switch (dialogIcon) {
      case DialogIcon.ASTERISK:
        this.dialogIcon = 'fa fa-fw fa-asterisk';
        break;

      case DialogIcon.EXCLAMATION:
        this.dialogIcon = 'fa fa-fw fa-exclamation';
        break;

      case DialogIcon.QUESTION:
        this.dialogIcon = 'fa fa-fw fa-question-circle';
        break;

      case DialogIcon.WARNING:
        this.dialogIcon = 'fa fa-fw fa-warning';
        break;

      default:
        this.dialogIcon = null;
        break;
    }

    this.dialogVisible = true;
  }


  public getButtonVisible(dialogAction: DialogAction): boolean {
    return (this.dialogActions & dialogAction) === dialogAction;
  }
  public getButtonDisabled(dialogAction: DialogAction): boolean {
    return (this.disabledActions & dialogAction) === dialogAction;
  }


  public dialogOnHide($event): void {
    if (this.dialogVisible) {
      if (this.callback) {
        this.callback(this.defaultAction, this.state);
      }
    }
  }

  public dialogActionButtonClick($event, dialogAction: DialogAction) {
    // ugasne se samo, če gumb ni naveden v noCloseActions
    this.dialogVisible = (this.noCloseActions & dialogAction) === dialogAction;

    if (this.callback) {
      this.callback(dialogAction, this.state);
    }
  }

}

export enum DialogAction {
  CANCEL = 1,
  OK = 2,
  NO = 4,
  YES = 8
}

export enum DialogIcon {
  ASTERISK = 1,
  EXCLAMATION = 2,
  QUESTION = 4,
  WARNING = 8
}

// če spreminjamo fielde tu noter, se GUI seveda ne refresha; zato je najbolj praktično, da ob potrebovani spremembi ponastavimo vse gumbe
export interface DialogCustomAction {
  dialogAction: number;
  label: string;
  hidden?: boolean;
  disabled?: boolean;
}
