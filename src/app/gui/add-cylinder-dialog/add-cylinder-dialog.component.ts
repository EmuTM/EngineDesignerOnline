import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CustomDialogComponent, DialogAction } from '../../components/custom-dialog/custom-dialog.component';
import { Cycle } from '../../machine/Cycle';
import { PositionedCylinder } from '../../machine/PositionedCylinder';
import { Cylinder } from '../../machine/Cylinder';
import { Engine } from '../../machine/Engine';
import { Utilities } from '../../common/Utilities';
import { Settings } from '../../common/Settings';

@Component({
  selector: 'app-add-cylinder-dialog',
  templateUrl: './add-cylinder-dialog.component.html',
  styleUrls: ['./add-cylinder-dialog.component.css']
})
export class AddCylinderDialogComponent implements OnInit {
  @ViewChild('dialog')
  public dialog: CustomDialogComponent;


  @Input()
  public showTooltips: boolean;


  public cycles: Cycle[] =
    [
      Cycle.NaN,
      Cycle.TwoStroke,
      Cycle.FourStroke
    ];

  public selectedCycle: Cycle;
  public selectedBore_mm: number;
  public selectedStroke_mm: number;
  public selectedTilt_deg: number;
  public selectedFiringAngle_deg: number;


  constructor() {
  }
  public ngOnInit() {
  }


  public showModal(engine: Engine, callback: (dialogAction: DialogAction, positionedCylinder: PositionedCylinder) => void): void {
    this.setDefaults();

    this.dialog.showModal(
      'Add cylinder...',
      null,
      (dialogAction: DialogAction, state?: any) => {
        if (dialogAction === DialogAction.OK) {
          let position: number = 1;
          let offset_mm: number = 0;

          if (engine.PositionedCylinders.length > 0) {
            position = Utilities.GetMax(
              engine.PositionedCylinders,
              (item: PositionedCylinder) => item.Position) + 1;

            offset_mm = Utilities.GetMax(
              engine.PositionedCylinders,
              (item: PositionedCylinder) => item.Offset_mm) + this.selectedBore_mm + Settings.DefaultOffsetDivisor;
          }

          const positionedCylinder: PositionedCylinder = new PositionedCylinder(
            Cylinder.FromParameters(
              this.selectedCycle,
              this.selectedBore_mm,
              this.selectedStroke_mm),
            position,
            offset_mm,
            this.selectedTilt_deg,
            this.selectedFiringAngle_deg);
          callback(dialogAction, positionedCylinder);
        } else {
          callback(dialogAction, null);
        }
      },
      DialogAction.OK | DialogAction.CANCEL);

    return null;
  }


  private setDefaults(): void {
    this.selectedCycle = this.cycles[0];
    this.selectedBore_mm = Settings.DefaultPistonDiameter_mm;
    this.selectedStroke_mm = Settings.DefaultCrankThrowCrankRadius_mm * 2;
    this.selectedTilt_deg = Settings.PositionedCylinderDefaultTilt_deg;
    this.selectedFiringAngle_deg = Settings.PositionedCylinderDefaultFiringAngle_deg;
  }

  public selectedCycleChanged(value: any): void {
    if (this.selectedFiringAngle_deg > value.Duration_deg) {
      this.selectedFiringAngle_deg = value.Duration_deg;
    }
  }
  public convertCycle(value: string) {
    return this.cycles.find((element: Cycle) => element.CycleId === value.toString());
  }

}
