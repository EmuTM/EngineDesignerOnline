import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EnginePropertiesComponent } from '../engine-properties/engine-properties.component';
import { EngineViewerComponent } from '../engine-viewer/engine-viewer.component';
import { Engine } from '../../machine/Engine';
import { Cycle } from '../../machine/Cycle';
import { PositionedCylinder } from '../../machine/PositionedCylinder';
import { Cylinder } from '../../machine/Cylinder';
import { CreateEngineDialogComponent } from '../create-engine-dialog/create-engine-dialog.component';
import { DialogAction, CustomDialogComponent, DialogIcon } from '../../components/custom-dialog/custom-dialog.component';
import { saveAs } from 'file-saver';
import { FileUpload, MenuItem } from 'primeng/primeng';
import { CustomUploadComponent } from '../../components/custom-upload/custom-upload.component';
import { Stroke } from '../../machine/Stroke';
import { Piston } from '../../machine/Piston';
import { ConnectingRod } from '../../machine/ConnectingRod';
import { CrankThrow } from '../../machine/CrankThrow';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @ViewChild('engineProperties')
  private engineProperties: EnginePropertiesComponent;

  @ViewChild('engineViewer')
  private engineViewer: EngineViewerComponent;

  @ViewChild('generalDialog')
  public generalDialog: CustomDialogComponent;

  @ViewChild('createEngineDialog')
  private createEngineDialog: CreateEngineDialogComponent;

  @ViewChild('customUpload')
  private customUpload: CustomUploadComponent;


  private engine: Engine;
  private filename: string = 'Untitled.json';



  constructor() {
  }


  public showTooltips: boolean = false;
  public exception: string = '';
  public menuItems: MenuItem[];

  ngOnInit() {
    this.engine = Engine.Vee(
      Cycle.FourStroke,
      8000,
      90,
      0, 90, 270, 360, 450, 540, 180, 630);

    const positionedCylinder1: PositionedCylinder = new PositionedCylinder(
      Cylinder.FromParameters(
        Cycle.NaN,
        500),
      1,
      0, -45, 0);
    positionedCylinder1.CrankThrow.BalancerRotationRadius_mm = 100;
    positionedCylinder1.CrankThrow.BalancerMass_g = 100;

    const positionedCylinder2: PositionedCylinder = new PositionedCylinder(
      Cylinder.FromParameters(
        Cycle.NaN,
        500),
      2,
      10, 45, 0.123456789);
    positionedCylinder2.CrankThrow.BalancerRotationRadius_mm = 100;
    positionedCylinder2.CrankThrow.BalancerMass_g = 100;

    // this.engine = new Engine(
    //   [positionedCylinder1, positionedCylinder2]);


    this.engineProperties.engine = this.engine;
    this.engineViewer.engine = this.engine;


    this.menuItems = [
      {
        label: 'File',
        items: [{
          label: 'New',
          items: [
            {
              label: 'Engine (wizard)',
              command: ($event: any) => { this.newEngine(true); }
            },
            {
              label: 'Engine (empty)',
              command: ($event: any) => { this.newEngine(false); }
            }
          ]
        },
        { separator: true },
        {
          label: 'Open (upload)',
          command: ($event: any) => { this.openEngine(true); }
        },
        {
          label: 'Save (download)',
          command: ($event: any) => { this.saveEngine(true); }
        }
        ]
      }
    ];
  }

  private enginePropertiesChanged(engine: Engine) {
    // samo zato, da obnovimo create enginea
    this.engineViewer.engine = this.engine;
  }



  public newEngine(wizard: boolean): void {
    this.generalDialog.showModal(
      'Are you sure?',
      'The current engine will be discarded.',
      (dialogAction: DialogAction) => {
        if (dialogAction === DialogAction.OK) {
          if (wizard) {
            this.createEngineDialog.showModal((dialogAction2: DialogAction, engine: Engine) => {
              if (dialogAction2 === DialogAction.OK) {
                this.engine = engine;
                this.engineProperties.engine = this.engine;
                this.engineViewer.engine = this.engine;
              }
            });
          } else {
            this.engine = new Engine();
            this.engineProperties.engine = this.engine;
            this.engineViewer.engine = this.engine;
          }
        }
      },
      DialogAction.OK | DialogAction.CANCEL,
      DialogIcon.WARNING);
  }
  public openEngine($event): void {
    this.customUpload.showModal((fileList: FileList) => {
      if (fileList.length > 0) {
        const fileReader: FileReader = new FileReader();
        fileReader.onload = () => {
          try {
            // zaradi json fint, moramo poskrbeti za deserializacijo na roke (morda bo sčasoma boljša rešitev?); pomembno je tudi to, da nimamo na razpolago propertijev, saj se funkcije ne serializirajo
            const loadedEngine: any = JSON.parse(fileReader.result);

            const newPositionedCylinders: PositionedCylinder[] = [];
            for (const loadedPositionedCylinder of loadedEngine.PositionedCylinders) {
              const newStrokes: Stroke[] = [];
              for (const loadedStroke of loadedPositionedCylinder.cycle.strokes) {
                const newStroke: Stroke = new Stroke(
                  loadedStroke.strokeId,
                  loadedStroke.begin_deg);
                newStrokes.push(newStroke);
              }

              const newCycle: Cycle = new Cycle(
                loadedPositionedCylinder.cycle.cycleId,
                newStrokes,
                loadedPositionedCylinder.cycle.defaultFiringAngle_deg);

              const newPiston: Piston = new Piston(
                loadedPositionedCylinder.piston.diameter_mm,
                loadedPositionedCylinder.piston.mass_g,
                loadedPositionedCylinder.piston.skirtLength_mm,
                loadedPositionedCylinder.piston.gudgeonPinDistanceFromTop_mm);

              const newConnectingRod: ConnectingRod = new ConnectingRod(
                loadedPositionedCylinder.connectingRod.rotatingMass_g,
                loadedPositionedCylinder.connectingRod.rotatingMassDistanceFromCenterOfGravity_mm,
                loadedPositionedCylinder.connectingRod.reciprocatingMass_g,
                loadedPositionedCylinder.connectingRod.reciprocatingMassDistanceFromCenterOfGravity_mm);

              const newCrankThrow: CrankThrow = new CrankThrow(
                loadedPositionedCylinder.crankThrow.crankRotationRadius_mm,
                loadedPositionedCylinder.crankThrow.balancerMass_g,
                loadedPositionedCylinder.crankThrow.balancerRotationRadius_mm,
                loadedPositionedCylinder.crankThrow.balancerAngle_deg,
                loadedPositionedCylinder.crankThrow.crankPinWidth_mm);

              const newCylinder: Cylinder = new Cylinder(
                newCycle,
                newPiston,
                newConnectingRod,
                newCrankThrow);

              const newPositionedCylinder: PositionedCylinder = new PositionedCylinder(
                newCylinder,
                loadedPositionedCylinder.position,
                loadedPositionedCylinder.offset_mm,
                loadedPositionedCylinder.tilt_deg,
                loadedPositionedCylinder.firingAngle_deg);
              newPositionedCylinders.push(newPositionedCylinder);
            }

            const newEngine: Engine = new Engine(newPositionedCylinders);

            // če smo tukaj, pomeni, da je deserializacija (in validacija) uspela
            this.engine = newEngine;
            this.engineProperties.engine = this.engine;
            this.engineViewer.engine = this.engine;
          } catch (exception) {
            this.exception = exception.stack ? exception.stack : exception;

            this.generalDialog.showModal(
              'Engine could not be opened',
              'Errors in file ' + fileList[0].name + ':',
              null,
              DialogAction.OK,
              DialogIcon.EXCLAMATION);
          }
        };

        fileReader.readAsText(fileList[0]);
      }
    });
  }
  public saveEngine($event): void {
    saveAs(new Blob([JSON.stringify(this.engine)], <BlobPropertyBag>{ type: 'application/json' }), this.filename);
  }

}
