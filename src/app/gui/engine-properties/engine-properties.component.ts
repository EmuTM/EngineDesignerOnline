import { Component, OnInit, Output, EventEmitter, ViewChild, QueryList } from '@angular/core';
import { Engine } from '../../machine/Engine';
import { Cycle } from '../../machine/Cycle';
import { Panel, MenuItem } from 'primeng/primeng';
import { CustomPanelComponent } from '../../components/custom-panel/custom-panel.component';
import { PositionedCylinder } from '../../machine/PositionedCylinder';
import { CustomDialogComponent, DialogAction, DialogIcon } from '../../components/custom-dialog/custom-dialog.component';
import { Utilities } from '../../common/Utilities';
import { Cylinder } from '../../machine/Cylinder';
import { Settings } from '../../common/Settings';
import { Menu } from 'primeng/components/menu/menu';
import { AddCylinderDialogComponent } from '../add-cylinder-dialog/add-cylinder-dialog.component';


@Component({
  selector: 'app-engine-properties',
  templateUrl: './engine-properties.component.html'
})
export class EnginePropertiesComponent implements OnInit {
  @ViewChild('generalDialog')
  public generalDialog: CustomDialogComponent;

  @ViewChild('addCylinderDialog')
  public addCylinderDialog: AddCylinderDialogComponent;

  public engine: Engine;

  public showTooltips: boolean = false;


  @Output()
  public enginePropertiesChanged: EventEmitter<Engine> = new EventEmitter<Engine>();


  private positionedCylinderTemplate: PositionedCylinder = null;


  constructor() {
  }
  public ngOnInit() {
  }


  public valueChanged(value: any) {
    this.enginePropertiesChanged.emit(this.engine);
  }


  public get crankThrowsAndFiringAngles() {
    const tuple: Array<any> = new Array<any>();

    for (let a = 0; a < this.engine.NumberOfCylinders; a++) {
      tuple.push({
        index: a,
        crankThrow_deg: this.engine.CrankThrows_deg[a],
        firingAngle_deg: this.engine.FiringAngles_deg[a]
      });
    }

    return tuple;
  }


  private onclick(): void {
    debugger;
    // this.TELE = 'bedak';
  }


  public positionedCylindersContextMenuItems: MenuItem[] =
    [
      {
        label: 'Add a cylinder...',
        icon: 'fas fa-plus',
        command: ($event: any) => {
          this.addCylinder();
        }
      }
    ];
  private addCylinder(): void {
    this.addCylinderDialog.showModal(this.engine,
      (dialogAction: DialogAction, positionedCylinder: PositionedCylinder) => {
        if (dialogAction === DialogAction.OK) {
          // naredimo nov array, ker ga bomo rabili za validacijo
          const positionedCylinders: Array<PositionedCylinder> = new Array<PositionedCylinder>();
          for (const positionedCylinderTmp of this.engine.PositionedCylinders) {
            positionedCylinders.push(positionedCylinderTmp);
          }
          positionedCylinders.push(positionedCylinder);

          this.engine.PositionedCylinders = positionedCylinders;
          this.enginePropertiesChanged.emit(this.engine);
        }
      }
    );
  }


  public positionedCylinderContextMenuItems: MenuItem[] = [
    {
      id: 'CopyAsTemplate',
      label: 'Copy as template',
      icon: 'fas fa-copy',
      command: ($event: any) => {
        this.copyAsTemplate($event.state as PositionedCylinder);
      }
    },
    {
      id: 'PasteFromTeplate',
      label: 'Paste from teplate',
      icon: 'fas fa-paste',
      command: ($event: any) => {
        this.pastFromTemplate($event.state as PositionedCylinder);
      }
    },
    { separator: true },
    {
      label: 'Remove this cylinder',
      icon: 'fas fa-minus',
      command: ($event: any) => {
        this.removeThisCylinder($event.state as PositionedCylinder);
      }
    }
  ];
  private copyAsTemplate(positionedCylinder: PositionedCylinder): void {
    this.positionedCylinderTemplate = positionedCylinder;
  }
  private pastFromTemplate(positionedCylinder: PositionedCylinder): void {
    switch (this.positionedCylinderTemplate.Cycle.CycleId) {
      case Cycle.NaN.CycleId:
        positionedCylinder.Cycle = Cycle.NaN;
        break;

      case Cycle.TwoStroke.CycleId:
        positionedCylinder.Cycle = Cycle.TwoStroke;
        break;

      case Cycle.FourStroke.CycleId:
        positionedCylinder.Cycle = Cycle.FourStroke;
        break;

      default:
        Utilities.NotImplemented();
    }

    positionedCylinder.Piston.Diameter_mm = this.positionedCylinderTemplate.Piston.Diameter_mm;
    positionedCylinder.Piston.Mass_g = this.positionedCylinderTemplate.Piston.Mass_g;
    positionedCylinder.Piston.SkirtLength_mm = this.positionedCylinderTemplate.Piston.SkirtLength_mm;
    positionedCylinder.Piston.GudgeonPinDistanceFromTop_mm = this.positionedCylinderTemplate.Piston.GudgeonPinDistanceFromTop_mm;

    positionedCylinder.ConnectingRod.RotatingMass_g = this.positionedCylinderTemplate.ConnectingRod.RotatingMass_g;
    positionedCylinder.ConnectingRod.RotatingMassDistanceFromCenterOfGravity_mm = this.positionedCylinderTemplate.ConnectingRod.RotatingMassDistanceFromCenterOfGravity_mm;
    positionedCylinder.ConnectingRod.ReciprocatingMass_g = this.positionedCylinderTemplate.ConnectingRod.ReciprocatingMass_g;
    positionedCylinder.ConnectingRod.ReciprocatingMassDistanceFromCenterOfGravity_mm = this.positionedCylinderTemplate.ConnectingRod.ReciprocatingMassDistanceFromCenterOfGravity_mm;

    positionedCylinder.CrankThrow.CrankRotationRadius_mm = this.positionedCylinderTemplate.CrankThrow.CrankRotationRadius_mm;
    positionedCylinder.CrankThrow.BalancerMass_g = this.positionedCylinderTemplate.CrankThrow.BalancerMass_g;
    positionedCylinder.CrankThrow.BalancerRotationRadius_mm = this.positionedCylinderTemplate.CrankThrow.BalancerRotationRadius_mm;
    positionedCylinder.CrankThrow.BalancerAngle_deg = this.positionedCylinderTemplate.CrankThrow.BalancerAngle_deg;
    positionedCylinder.CrankThrow.CrankPinWidth_mm = this.positionedCylinderTemplate.CrankThrow.CrankPinWidth_mm;

    positionedCylinder.Tilt_deg = this.positionedCylinderTemplate.Tilt_deg;
    positionedCylinder.FiringAngle_deg = this.positionedCylinderTemplate.FiringAngle_deg;

    this.enginePropertiesChanged.emit(this.engine);
  }
  private removeThisCylinder(positionedCylinder: PositionedCylinder): void {
    this.generalDialog.showModal(
      'Are you sure you want to remove this cylinder?',
      positionedCylinder.toString(),
      (dialogAction: DialogAction, state?: any) => {
        if (dialogAction === DialogAction.YES) {
          const positionedCylinderIndex = this.engine.PositionedCylinders.indexOf(positionedCylinder, 0);
          if (positionedCylinderIndex > -1) {
            this.engine.PositionedCylinders.splice(positionedCylinderIndex, 1);
          }

          this.enginePropertiesChanged.emit(this.engine);
        }
      },
      DialogAction.YES | DialogAction.NO,
      DialogIcon.WARNING);
  }


  public cycleContextMenuItems: MenuItem[] =
    [
      {
        id: Cycle.NaN.CycleId,
        label: 'NaN',
        icon: 'fas fa-cogs',
        command: ($event) => {
          this.changeCycle($event.state as PositionedCylinder, Cycle.NaN);
        }
      },
      {
        id: Cycle.TwoStroke.CycleId,
        label: 'Two stroke',
        icon: 'fas fa-cogs',
        command: ($event) => {
          this.changeCycle($event.state as PositionedCylinder, Cycle.TwoStroke);
        }
      },
      {
        id: Cycle.FourStroke.CycleId,
        label: 'Four stroke',
        icon: 'fas fa-cogs',
        command: ($event) => {
          this.changeCycle($event.state as PositionedCylinder, Cycle.FourStroke);
        }
      }
    ];

  private changeCycle(positionedCylinder: PositionedCylinder, newCycle: Cycle): void {
    positionedCylinder.Cycle = newCycle;
    if (positionedCylinder.FiringAngle_deg > newCycle.Duration_deg) {
      positionedCylinder.FiringAngle_deg = newCycle.Duration_deg;
    }

    this.enginePropertiesChanged.emit(this.engine);
  }


  public positionedCylinderMenuOpening($event: any): void {
    ($event.menu as Menu).model.find((item) => item.id === 'PasteFromTeplate').disabled = !this.positionedCylinderTemplate;
  }

  public cycleMenuOpening($event: any): void {
    const positionedCylinder: PositionedCylinder = $event.state as PositionedCylinder;

    for (const menuItem of ($event.menu as Menu).model) {
      menuItem.disabled = menuItem.id === positionedCylinder.Cycle.CycleId;
    }
  }


}
