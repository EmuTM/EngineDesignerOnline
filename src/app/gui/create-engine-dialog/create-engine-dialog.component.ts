import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { CustomDialogComponent, DialogCustomAction, DialogAction } from '../../components/custom-dialog/custom-dialog.component';
import { MenuItem, TreeNode, Dialog } from 'primeng/primeng';
import { Cycle } from '../../machine/Cycle';
import { Utilities } from '../../common/Utilities';
import { Conversions } from '../../common/Conversions';
import { Engine } from '../../machine/Engine';
import { PositionedCylinder } from '../../machine/PositionedCylinder';
import { Piston } from '../../machine/Piston';
import { ConnectingRod } from '../../machine/ConnectingRod';
import { CrankThrow } from '../../machine/CrankThrow';
import { Cylinder } from '../../machine/Cylinder';
import { Mathematics } from '../../common/Mathematics';
import { Settings } from '../../common/Settings';

@Component({
  selector: 'app-create-engine-dialog',
  templateUrl: './create-engine-dialog.component.html',
  styleUrls: ['./create-engine-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateEngineDialogComponent implements OnInit {
  @ViewChild('dialog')
  public dialog: CustomDialogComponent;


  constructor() { }
  ngOnInit() {
    // nastavimo noCloseActions za Back in Next
    this.dialog.noCloseActions = CustomDialogAction.BACK | CustomDialogAction.NEXT | CustomDialogAction.FINISH;
  }


  public currentStep;
  public progress: number;
  public engineValidationOutcome: EngineValidationOutcome;
  public engineValidationErrorMessage: string;

  public selectedCycle: string;
  private get selectedCycleCycle(): Cycle {
    if (this.selectedCycle === Cycle.TwoStroke.CycleId) {
      return Cycle.TwoStroke;
    } else /* if (this.selectedCycle === Cycle.FourStroke.CycleId) */ {
      return Cycle.FourStroke;
    }
  }

  public engineLayouts: TreeNode[];
  public selectedEngineLayout: TreeNode;
  public selectedEngineLayoutChanged($event) {
    // spet nastavimo nove akcije, ker se lahko disablajo gumbi, če izberemo "napačen" node
    this.setDialogCustomActions();
  }
  private get selectedEngineLayoutData(): CylinderLayout[] {
    return (<TreeNodeData>this.selectedEngineLayout.data).cylinderLayouts;
  }
  private setEngineLayouts(): void {
    switch (this.selectedCycle) {
      case Cycle.TwoStroke.CycleId:
        this.engineLayouts = [
          {
            label: 'Single cylinder',
            data: <TreeNodeData>{
              toolTip: 'The simplest possible engine configuration.',
              cylinderLayouts: [
                <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 }
              ]
            }
          },
          {
            label: 'Inline',
            data: <TreeNodeData>{
              toolTip: 'Cylinders arranged in the same plane. Usually found in two, three and four cylinder configurations.'
            },
            children: [
              {
                label: 'Two',
                data: <TreeNodeData>{
                  toolTip: 'Two cylinders are arranged in the same plane.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 180, tilt: 0 }
                  ]
                }
              },
              {
                label: 'Three',
                data: <TreeNodeData>{
                  toolTip: 'Three cylinders are arranged in the same plane.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 120, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 240, tilt: 0 }
                  ]
                }
              },
              {
                label: 'Four',
                data: <TreeNodeData>{
                  toolTip: 'Four cylinders are arranged in the same plane.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 180, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 90, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 270, tilt: 0 }
                  ]
                }
              },
              {
                label: 'Five',
                data: <TreeNodeData>{
                  toolTip: 'Five cylinders are arranged in the same plane.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 144, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 216, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 288, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 5, firingAngle: 72, tilt: 0 }
                  ]
                }
              },
              {
                label: 'Six',
                data: <TreeNodeData>{
                  toolTip: 'Six cylinders are arranged in the same plane.'
                },
                children: [
                  {
                    label: 'Single firing',
                    data: <TreeNodeData>{
                      toolTip: 'Crank throws are split by 60 degrees.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 120, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 240, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 180, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 5, firingAngle: 300, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 6, firingAngle: 60, tilt: 0 }
                      ]
                    }
                  },
                  {
                    label: 'Double firing',
                    data: <TreeNodeData>{
                      toolTip: 'Crank throws are split by 120 degrees which in a two stroke cycle results in double firing.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 240, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 120, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 120, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 5, firingAngle: 240, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 6, firingAngle: 0, tilt: 0 }
                      ]
                    }
                  }
                ]
              },
              {
                label: 'Eight',
                data: <TreeNodeData>{
                  toolTip: 'Eight cylinders are arranged in the same plane.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 90, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 270, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 180, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 5, firingAngle: 225, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 6, firingAngle: 135, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 7, firingAngle: 315, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 8, firingAngle: 45, tilt: 0 }
                  ]
                }
              }
            ]
          },
          {
            label: 'Vee',
            data: <TreeNodeData>{
              toolTip: 'Cylinders arranged in two planes with respect to an angle between cylinder banks. Suitable for larger engines, but also found in 2 cylinder layouts.'
            },
            children: [
              {
                label: 'Two, 90°',
                data: <TreeNodeData>{
                  toolTip: 'Two cylinders are arranged in two separate planes.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -45 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 90, tilt: 45 }
                  ]
                }
              },
              {
                label: 'Four, 90°',
                data: <TreeNodeData>{
                  toolTip: 'Four cylinders are arranged in two separate planes.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -45 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 90, tilt: 45 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 180, tilt: -45 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 270, tilt: 45 }
                  ]
                }
              },
              {
                label: 'Six, 60°',
                data: <TreeNodeData>{
                  toolTip: 'Six cylinders are arranged in two separate planes.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -30 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 60, tilt: 30 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 120, tilt: -30 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 180, tilt: 30 },
                    <CylinderLayout>{ cylinderPosition: 5, firingAngle: 240, tilt: -30 },
                    <CylinderLayout>{ cylinderPosition: 6, firingAngle: 300, tilt: 30 }
                  ]
                }
              },
              {
                label: 'Eight, 45°',
                data: <TreeNodeData>{
                  toolTip: 'Eight cylinders are arranged in two separate planes.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -22.5 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 45, tilt: 22.5 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 180, tilt: -22.5 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 225, tilt: 22.5 },
                    <CylinderLayout>{ cylinderPosition: 5, firingAngle: 90, tilt: -22.5 },
                    <CylinderLayout>{ cylinderPosition: 6, firingAngle: 135, tilt: 22.5 },
                    <CylinderLayout>{ cylinderPosition: 7, firingAngle: 270, tilt: -22.5 },
                    <CylinderLayout>{ cylinderPosition: 8, firingAngle: 315, tilt: 22.5 }
                  ]
                }
              }
            ]
          },
          {
            label: 'Boxer',
            data: <TreeNodeData>{
              toolTip: 'A special configuration in which each pair of pistons moves simultaneously in and out. Mechanical balance is excellent.'
            },
            children: [
              {
                label: 'Two (Double firing)',
                data: <TreeNodeData>{
                  toolTip: 'Seldom seen in two stroke cycle, this configuration cancels out unbalanced forces.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -90 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 0, tilt: 90 }
                  ]
                }
              },
              {
                label: 'Four (Double firing)',
                data: <TreeNodeData>{
                  toolTip: 'Low centre of gravity, and a very short engine length.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -90 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 0, tilt: 90 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 180, tilt: -90 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 180, tilt: 90 }
                  ]
                }
              }
            ]
          }
        ];
        break;

      case Cycle.FourStroke.CycleId:
        this.engineLayouts = [
          {
            label: 'Single cylinder',
            data: <TreeNodeData>{
              toolTip: 'The simplest possible engine configuration.',
              cylinderLayouts: [
                <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 }
              ]
            }
          },
          {
            label: 'Inline',
            data: <TreeNodeData>{
              toolTip: 'Cylinders arranged in the same plane. Usually found in four, six and eight cylinder configurations.'
            },
            children: [
              {
                label: 'Two',
                data: <TreeNodeData>{
                  toolTip: 'Two cylinders are arranged in the same plane.'
                },
                children: [
                  {
                    label: '360° (pistons move simultaneously)',
                    data: <TreeNodeData>{
                      toolTip: 'Pistons move simultaneously, firing one at the time.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 360, tilt: 0 }
                      ]
                    }
                  },
                  {
                    label: '270° (crank pins are split)',
                    data: <TreeNodeData>{
                      toolTip: 'Pistons are set appart by 270 degrees, resulting in uneven firing pattern.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 270, tilt: 0 }
                      ]
                    }
                  },
                ]
              },
              {
                label: 'Three',
                data: <TreeNodeData>{
                  toolTip: 'Three cylinders are arranged in the same plane.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 480, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 240, tilt: 0 }
                  ]
                }
              },
              {
                label: 'Four',
                data: <TreeNodeData>{
                  toolTip: 'Four cylinders are arranged in the same plane.'
                },
                children: [
                  {
                    label: 'Flat plane',
                    data: <TreeNodeData>{
                      toolTip: 'The standard configuration for the inline four engine.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 180, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 540, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 360, tilt: 0 }
                      ]
                    }
                  },
                  {
                    label: 'Cross plane',
                    data: <TreeNodeData>{
                      toolTip: 'An alternative configuration, found mostly in motorsports.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 450, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 270, tilt: 0 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 540, tilt: 0 }
                      ]
                    }
                  },
                ]
              },
              {
                label: 'Five',
                data: <TreeNodeData>{
                  toolTip: 'Five cylinders are arranged in the same plane.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 144, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 576, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 288, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 5, firingAngle: 432, tilt: 0 }
                  ]
                }
              },
              {
                label: 'Six',
                data: <TreeNodeData>{
                  toolTip: 'Six cylinders are arranged in the same plane.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 480, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 240, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 600, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 5, firingAngle: 120, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 6, firingAngle: 360, tilt: 0 }
                  ]
                }
              },
              {
                label: 'Eight',
                data: <TreeNodeData>{
                  toolTip: 'Eight cylinders are arranged in the same plane.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 180, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 450, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 630, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 5, firingAngle: 270, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 6, firingAngle: 90, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 7, firingAngle: 540, tilt: 0 },
                    <CylinderLayout>{ cylinderPosition: 8, firingAngle: 360, tilt: 0 }
                  ]
                }
              }
            ]
          },
          {
            label: 'Vee',
            data: <TreeNodeData>{
              toolTip: 'Cylinders arranged in two planes with respect to an angle between cylinder banks. Suitable for larger engines, but also found in 2 cylinder layouts.'
            },
            children: [
              {
                label: 'Two',
                data: <TreeNodeData>{
                  toolTip: 'Two cylinders are arranged in two separate planes.'
                },
                children: [
                  {
                    label: '45°',
                    data: <TreeNodeData>{
                      toolTip: 'Typically used by Harley-Davidson, resulting in uneven firing, if not split.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -22.5 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 405, tilt: 22.5 }
                      ]
                    }
                  },
                  {
                    label: '60°',
                    data: <TreeNodeData>{
                      toolTip: 'Found in Aprilia-Rotax engines, resulting in uneven firing, if not split.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -30 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 420, tilt: 30 }
                      ]
                    }
                  },
                  {
                    label: '90°',
                    data: <TreeNodeData>{
                      toolTip: 'Many applications, inherently uneven firing.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -45 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 450, tilt: 45 }
                      ]
                    }
                  }
                ]
              },
              {
                label: 'Four, 90°',
                data: <TreeNodeData>{
                  toolTip: 'Four cylinders are arranged in two separate planes.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -45 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 90, tilt: 45 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 180, tilt: -45 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 270, tilt: 45 }
                  ]
                }
              },
              {
                label: 'Six',
                data: <TreeNodeData>{
                  toolTip: 'Six cylinders are arranged in two separate planes.'
                },
                children: [
                  {
                    label: '60° (even firing)',
                    data: <TreeNodeData>{
                      toolTip: 'The most common choice for a V6 engine. Even firing pattern is obtained with split crank pins.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -30 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 120, tilt: 30 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 240, tilt: -30 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 360, tilt: 30 },
                        <CylinderLayout>{ cylinderPosition: 5, firingAngle: 480, tilt: -30 },
                        <CylinderLayout>{ cylinderPosition: 6, firingAngle: 600, tilt: 30 }
                      ]
                    }
                  },
                  {
                    label: '90°',
                    data: <TreeNodeData>{
                      toolTip: 'Usually derrived from a V8, has inherently uneven firing.'
                    },
                    children: [
                      {
                        label: 'Shared crank pin (odd firing)',
                        data: <TreeNodeData>{
                          toolTip: 'With no countermeasures taken, this engine has uneven firing pattern.',
                          cylinderLayouts: [
                            <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -45 },
                            <CylinderLayout>{ cylinderPosition: 2, firingAngle: 90, tilt: 45 },
                            <CylinderLayout>{ cylinderPosition: 3, firingAngle: 240, tilt: -45 },
                            <CylinderLayout>{ cylinderPosition: 4, firingAngle: 330, tilt: 45 },
                            <CylinderLayout>{ cylinderPosition: 5, firingAngle: 480, tilt: -45 },
                            <CylinderLayout>{ cylinderPosition: 6, firingAngle: 570, tilt: 45 }
                          ]
                        }
                      },
                      {
                        label: 'Split crank pin (even firing)',
                        data: <TreeNodeData>{
                          toolTip: 'This type of engine has even firing due to split crank pins.',
                          cylinderLayouts: [
                            <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -45 },
                            <CylinderLayout>{ cylinderPosition: 2, firingAngle: 120, tilt: 45 },
                            <CylinderLayout>{ cylinderPosition: 3, firingAngle: 240, tilt: -45 },
                            <CylinderLayout>{ cylinderPosition: 4, firingAngle: 360, tilt: 45 },
                            <CylinderLayout>{ cylinderPosition: 5, firingAngle: 480, tilt: -45 },
                            <CylinderLayout>{ cylinderPosition: 6, firingAngle: 600, tilt: 45 }
                          ]
                        }
                      }
                    ]
                  },
                  {
                    label: '120°',
                    data: <TreeNodeData>{
                      toolTip: 'Wide and low configuration. Firing is even.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -60 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 120, tilt: 60 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 240, tilt: -60 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 360, tilt: 60 },
                        <CylinderLayout>{ cylinderPosition: 5, firingAngle: 480, tilt: -60 },
                        <CylinderLayout>{ cylinderPosition: 6, firingAngle: 600, tilt: 60 }
                      ]
                    }
                  }
                ]
              },
              {
                label: 'Eight, 90°',
                data: <TreeNodeData>{
                  toolTip: 'Eight cylinders are arranged in two separate planes.'
                },
                children: [
                  {
                    label: 'Cross plane',
                    data: <TreeNodeData>{
                      toolTip: 'Typical firing pattern; good mechanical balance, also loved for its exhaust note.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -45 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 90, tilt: 45 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 270, tilt: -45 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 360, tilt: 45 },
                        <CylinderLayout>{ cylinderPosition: 5, firingAngle: 450, tilt: -45 },
                        <CylinderLayout>{ cylinderPosition: 6, firingAngle: 540, tilt: 45 },
                        <CylinderLayout>{ cylinderPosition: 7, firingAngle: 180, tilt: -45 },
                        <CylinderLayout>{ cylinderPosition: 8, firingAngle: 630, tilt: 45 }
                      ]
                    }
                  },
                  {
                    label: 'Flat plane',
                    data: <TreeNodeData>{
                      toolTip: 'Found in sport cars where its poorer mechanical balance is offset by a more convenient firing order.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -45 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 90, tilt: 45 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 180, tilt: -45 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 270, tilt: 45 },
                        <CylinderLayout>{ cylinderPosition: 5, firingAngle: 540, tilt: -45 },
                        <CylinderLayout>{ cylinderPosition: 6, firingAngle: 630, tilt: 45 },
                        <CylinderLayout>{ cylinderPosition: 7, firingAngle: 360, tilt: -45 },
                        <CylinderLayout>{ cylinderPosition: 8, firingAngle: 450, tilt: 45 }
                      ]
                    }
                  }
                ]
              },
              {
                label: 'Ten, 72° (Shared crank pins)',
                data: <TreeNodeData>{
                  toolTip: 'Ten cylinders are arranged in two separate planes.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -36 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 72, tilt: 36 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 144, tilt: -36 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 216, tilt: 36 },
                    <CylinderLayout>{ cylinderPosition: 5, firingAngle: 576, tilt: -36 },
                    <CylinderLayout>{ cylinderPosition: 6, firingAngle: 648, tilt: 36 },
                    <CylinderLayout>{ cylinderPosition: 7, firingAngle: 288, tilt: -36 },
                    <CylinderLayout>{ cylinderPosition: 8, firingAngle: 360, tilt: 36 },
                    <CylinderLayout>{ cylinderPosition: 9, firingAngle: 432, tilt: -36 },
                    <CylinderLayout>{ cylinderPosition: 10, firingAngle: 504, tilt: 36 }
                  ]
                }
              },
              {
                label: 'Twelve',
                data: <TreeNodeData>{
                  toolTip: 'Twelve cylinders are arranged in two separate planes.'
                },
                children: [
                  {
                    label: '60°',
                    data: <TreeNodeData>{
                      toolTip: 'The most common V12 layout, resulting in even firing pattern.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -30 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 60, tilt: 30 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 480, tilt: -30 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 540, tilt: 30 },
                        <CylinderLayout>{ cylinderPosition: 5, firingAngle: 240, tilt: -30 },
                        <CylinderLayout>{ cylinderPosition: 6, firingAngle: 300, tilt: 30 },
                        <CylinderLayout>{ cylinderPosition: 7, firingAngle: 600, tilt: -30 },
                        <CylinderLayout>{ cylinderPosition: 8, firingAngle: 660, tilt: 30 },
                        <CylinderLayout>{ cylinderPosition: 9, firingAngle: 120, tilt: -30 },
                        <CylinderLayout>{ cylinderPosition: 10, firingAngle: 180, tilt: 30 },
                        <CylinderLayout>{ cylinderPosition: 11, firingAngle: 360, tilt: -30 },
                        <CylinderLayout>{ cylinderPosition: 12, firingAngle: 420, tilt: 30 }
                      ]
                    }
                  },
                  {
                    label: '65°',
                    data: <TreeNodeData>{
                      toolTip: 'Usually found in Ferraris, this configuration has slightly uneven firring pattern.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -32.5 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 65, tilt: 32.5 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 480, tilt: -32.5 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 545, tilt: 32.5 },
                        <CylinderLayout>{ cylinderPosition: 5, firingAngle: 240, tilt: -32.5 },
                        <CylinderLayout>{ cylinderPosition: 6, firingAngle: 305, tilt: 32.5 },
                        <CylinderLayout>{ cylinderPosition: 7, firingAngle: 600, tilt: -32.5 },
                        <CylinderLayout>{ cylinderPosition: 8, firingAngle: 665, tilt: 32.5 },
                        <CylinderLayout>{ cylinderPosition: 9, firingAngle: 120, tilt: -32.5 },
                        <CylinderLayout>{ cylinderPosition: 10, firingAngle: 185, tilt: 32.5 },
                        <CylinderLayout>{ cylinderPosition: 11, firingAngle: 360, tilt: -32.5 },
                        <CylinderLayout>{ cylinderPosition: 12, firingAngle: 425, tilt: 32.5 }
                      ]
                    }
                  }
                ]

              },
              {
                label: 'Sixteen',
                data: <TreeNodeData>{
                  toolTip: 'Sixteen cylinders are arranged in two separate planes.'
                },
                children: [
                  {
                    label: '45°',
                    data: <TreeNodeData>{
                      toolTip: 'A common choice for even firing pattern.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -22.5 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 405, tilt: 22.5 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 180, tilt: -22.5 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 585, tilt: 22.5 },
                        <CylinderLayout>{ cylinderPosition: 5, firingAngle: 90, tilt: -22.5 },
                        <CylinderLayout>{ cylinderPosition: 6, firingAngle: 495, tilt: 22.5 },
                        <CylinderLayout>{ cylinderPosition: 7, firingAngle: 270, tilt: -22.5 },
                        <CylinderLayout>{ cylinderPosition: 8, firingAngle: 675, tilt: 22.5 },
                        <CylinderLayout>{ cylinderPosition: 9, firingAngle: 630, tilt: -22.5 },
                        <CylinderLayout>{ cylinderPosition: 10, firingAngle: 315, tilt: 22.5 },
                        <CylinderLayout>{ cylinderPosition: 11, firingAngle: 450, tilt: -22.5 },
                        <CylinderLayout>{ cylinderPosition: 12, firingAngle: 135, tilt: 22.5 },
                        <CylinderLayout>{ cylinderPosition: 13, firingAngle: 540, tilt: -22.5 },
                        <CylinderLayout>{ cylinderPosition: 14, firingAngle: 225, tilt: 22.5 },
                        <CylinderLayout>{ cylinderPosition: 15, firingAngle: 360, tilt: -22.5 },
                        <CylinderLayout>{ cylinderPosition: 16, firingAngle: 45, tilt: 22.5 }
                      ]
                    }
                  },
                  {
                    label: '135°',
                    data: <TreeNodeData>{
                      toolTip: 'A wider and lower configuration. Firing is even.',
                      cylinderLayouts: [
                        <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -67.5 },
                        <CylinderLayout>{ cylinderPosition: 2, firingAngle: 495, tilt: 67.5 },
                        <CylinderLayout>{ cylinderPosition: 3, firingAngle: 180, tilt: -67.5 },
                        <CylinderLayout>{ cylinderPosition: 4, firingAngle: 675, tilt: 67.5 },
                        <CylinderLayout>{ cylinderPosition: 5, firingAngle: 90, tilt: -67.5 },
                        <CylinderLayout>{ cylinderPosition: 6, firingAngle: 585, tilt: 67.5 },
                        <CylinderLayout>{ cylinderPosition: 7, firingAngle: 270, tilt: -67.5 },
                        <CylinderLayout>{ cylinderPosition: 8, firingAngle: 45, tilt: 67.5 },
                        <CylinderLayout>{ cylinderPosition: 9, firingAngle: 630, tilt: -67.5 },
                        <CylinderLayout>{ cylinderPosition: 10, firingAngle: 405, tilt: 67.5 },
                        <CylinderLayout>{ cylinderPosition: 11, firingAngle: 450, tilt: -67.5 },
                        <CylinderLayout>{ cylinderPosition: 12, firingAngle: 225, tilt: 67.5 },
                        <CylinderLayout>{ cylinderPosition: 13, firingAngle: 540, tilt: -67.5 },
                        <CylinderLayout>{ cylinderPosition: 14, firingAngle: 315, tilt: 67.5 },
                        <CylinderLayout>{ cylinderPosition: 15, firingAngle: 360, tilt: -67.5 },
                        <CylinderLayout>{ cylinderPosition: 16, firingAngle: 135, tilt: 67.5 }
                      ]
                    }
                  }
                ]
              }
            ]
          },
          {
            label: 'Boxer',
            data: <TreeNodeData>{
              toolTip: 'A special configuration in which each pair of pistons moves simultaneously in and out. Mechanical balance is excellent.'
            },
            children: [
              {
                label: 'Two',
                data: <TreeNodeData>{
                  toolTip: 'Mostly used in motorcycles this configuration cancels out unbalanced forces.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -90 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 360, tilt: 90 }
                  ]
                }
              },
              {
                label: 'Four',
                data: <TreeNodeData>{
                  toolTip: 'Very good balance of the reciprocating parts, a low centre of gravity, and a very short engine length.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -90 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 540, tilt: 90 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 360, tilt: -90 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 180, tilt: 90 }
                  ]
                }
              },
              {
                label: 'Six',
                data: <TreeNodeData>{
                  toolTip: 'Mostly used by Porsche, this engine has excellent mechanical balance and low center of gravity.',
                  cylinderLayouts: [
                    <CylinderLayout>{ cylinderPosition: 1, firingAngle: 0, tilt: -90 },
                    <CylinderLayout>{ cylinderPosition: 2, firingAngle: 360, tilt: 90 },
                    <CylinderLayout>{ cylinderPosition: 3, firingAngle: 120, tilt: -90 },
                    <CylinderLayout>{ cylinderPosition: 4, firingAngle: 480, tilt: 90 },
                    <CylinderLayout>{ cylinderPosition: 5, firingAngle: 240, tilt: -90 },
                    <CylinderLayout>{ cylinderPosition: 6, firingAngle: 600, tilt: 90 }
                  ]
                }
              }
            ]
          }

        ];
        break;


      default:
        Utilities.NotImplemented();
    }

    // selektamo prvega
    this.selectedEngineLayout = this.engineLayouts[0];
  }

  public selectedBore_mm: number;
  public selectedBoreFixed: boolean;
  public selectedBoreFixedChanged(checked: boolean): void {
    if (checked) {
      this.selectedStrokeFixed = false;
    }
  }
  public selectedStroke_mm: number;
  public selectedStrokeFixed: boolean;
  public selectedStrokeFixedChanged(checked: boolean): void {
    if (checked) {
      this.selectedBoreFixed = false;
    }
  }
  public selectedDisplacement_cm3: number;
  public selectedDisplacementChanged(value: number): void {
    const displacement_mm3: number = Conversions.Cm3ToMm3(value);
    const pi4: number = Math.PI / 4;

    if (this.selectedBoreFixed) {
      const bore2: number = Math.pow(this.selectedBore_mm, 2);
      this.selectedStroke_mm = displacement_mm3 / (pi4 * bore2 * this.selectedEngineLayoutData.length);
    } else if (this.selectedStrokeFixed) {
      this.selectedBore_mm = Math.sqrt(displacement_mm3 / (pi4 * this.selectedStroke_mm * this.selectedEngineLayoutData.length));
    } else {
      const double: number = displacement_mm3 / (pi4 * this.selectedEngineLayoutData.length);
      const boreStroke: number = Math.pow(double, 1 / 3);
      this.selectedBore_mm = boreStroke;
      this.selectedStroke_mm = boreStroke;
    }
  }
  private setDisplacement(): void {
    const pi4: number = Math.PI / 4;
    const bore2: number = Math.pow(this.selectedBore_mm, 2);

    const displacement: number = pi4 * bore2 * this.selectedStroke_mm * this.selectedEngineLayoutData.length;
    this.selectedDisplacement_cm3 = Conversions.Mm3ToCm3(displacement);
  }

  public selectedPistonMass_g: number;

  public selectedConnectingRodLength_mm: number;
  public selectedConnectingRodMass_g: number;
  public selectedConnectingRodMassDistribution: number;
  public get rotatingDistributionPercentage(): number {
    return (100 - this.selectedConnectingRodMassDistribution) / 100;

  }
  public get reciprocatingDistributionPercentage(): number {
    return this.selectedConnectingRodMassDistribution / 100;
  }

  public selectedBalancerMass_g: number;
  public selectedBalancerRotationRadius_mm: number;

  public selectedFlywheelMass_g;
  public selectedFlywheelDiameter_mm;

  private engine: Engine;


  public showModal(callback: (dialogAction: DialogAction, engine: Engine) => void): void {
    this.setDefaults();
    this.setDialogCustomActions();

    this.dialog.showModal(
      'Create engine wizard',
      null,
      (dialogAction: any, state?: any) => {
        // rečemo, da je dialogAction: any in kastamo na svoj DialogAction
        switch (dialogAction as CustomDialogAction) {
          case CustomDialogAction.CANCEL:
            break;

          case CustomDialogAction.BACK:
            this.currentStep--;
            break;

          case CustomDialogAction.FINISH:
            this.currentStep = 9;
            this.buildEngine();
            break;

          case CustomDialogAction.NEXT:
            this.currentStep++;

            // engine layoute nastavimo glede na cikel, zato se ob vsakem prehodu na step 2 ponastavijo
            if (this.currentStep === 2) /* engine layouts */ {
              this.setEngineLayouts();
              // in displacement, ki se mora preračunati
              this.setDisplacement();
            } else if (this.currentStep === 9) /* finish */ {
              this.buildEngine();
            }
            break;

          case CustomDialogAction.CLOSE:
            // customDialogAction ni extern; vrnemo OK
            callback(DialogAction.OK, this.engine);
            break;


          default:
            // customDialogAction ni extern; vrnemo Cancel
            callback(DialogAction.CANCEL, null);
        }

        // spet nastavimo nove akcije, glede na trenutno stanje (to v praksi enabla, disabla, skrije gumbe)
        this.setDialogCustomActions();
      });

    return null;
  }


  private setDefaults(): void {
    this.currentStep = 0;

    this.selectedCycle = Cycle.TwoStroke.CycleId;
    this.setEngineLayouts();

    this.selectedBore_mm = Settings.DefaultPistonDiameter_mm;
    this.selectedBoreFixed = false;
    this.selectedStroke_mm = Settings.DefaultCrankThrowCrankRadius_mm * 2;
    this.selectedStrokeFixed = false;
    this.setDisplacement();

    this.selectedPistonMass_g = Settings.DefaultPistonMass_g;

    this.selectedConnectingRodLength_mm = Settings.DefaultConnectingRodLength_mm;
    this.selectedConnectingRodMass_g = Settings.DefaultConnectingRodTotalMass_g;
    this.selectedConnectingRodMassDistribution = Settings.DefaultConnectingRodWeightAndDistanceDistribution * 100;

    this.selectedBalancerMass_g = Settings.DefaultCrankThrowBalancerMass_g;
    this.selectedBalancerRotationRadius_mm = Settings.DefaultCrankThrowCrankRadius_mm * Settings.CrankThrowBalancerRadiusVsCrankThrowRadius;

    this.selectedFlywheelMass_g = Settings.DefaultFlywheelMass_g;
    this.selectedFlywheelDiameter_mm = Settings.DefaultFlywheelDiameter_mm;

    this.engine = null;
  }

  private setDialogCustomActions(): void {
    this.dialog.dialogCustomActions = [
      <DialogCustomAction>{
        label: '<< Back',
        dialogAction: CustomDialogAction.BACK,
        disabled: this.currentStep < 1
      },
      <DialogCustomAction>{
        label: 'Finish',
        dialogAction: CustomDialogAction.FINISH,
        disabled: (this.currentStep < 2) || (this.currentStep === 2 && !this.selectedEngineLayoutData),
        hidden: this.currentStep > 8
      },
      <DialogCustomAction>{
        label: 'Close',
        dialogAction: CustomDialogAction.CLOSE,
        disabled: !this.engine,
        hidden: this.currentStep < 9
      },
      <DialogCustomAction>{
        label: 'Next >>',
        dialogAction: CustomDialogAction.NEXT,
        disabled: (this.currentStep > 8) || (this.currentStep === 2 && !this.selectedEngineLayoutData)
      },
      <DialogCustomAction>{
        label: 'Cancel',
        dialogAction: CustomDialogAction.CANCEL
      }
    ];
  }

  private buildEngine(): void {
    this.progress = 0;
    this.engineValidationOutcome = null;

    // to delamo samo zato, da je lep GUI (delay); na koncu moramo posodobiti setDialogCustomActions, ker se lahko disablajo gumbi, če ni validiran engine
    this.validateEngine(0, [], () => this.setDialogCustomActions());
  }

  private validateEngine(index: number, positionedCylinders: PositionedCylinder[], callback: () => void): void {
    try {
      if (index < this.selectedEngineLayoutData.length) {
        const cylinderLayout: CylinderLayout = this.selectedEngineLayoutData[index];

        // piston
        const piston: Piston = Piston.FromParameters(
          this.selectedBore_mm,
          this.selectedPistonMass_g);

        // connrod
        const connectingRod: ConnectingRod = new ConnectingRod(
          this.selectedConnectingRodMass_g * this.rotatingDistributionPercentage,
          this.selectedConnectingRodLength_mm * this.reciprocatingDistributionPercentage,
          this.selectedConnectingRodMass_g * this.reciprocatingDistributionPercentage,
          this.selectedConnectingRodLength_mm * this.rotatingDistributionPercentage);

        // crank throw
        const crankThrow: CrankThrow = CrankThrow.FromParameters(
          this.selectedStroke_mm / 2,
          this.selectedBalancerMass_g,
          this.selectedBalancerRotationRadius_mm);

        // cylinder
        const cylinder: Cylinder = new Cylinder(
          this.selectedCycleCycle,
          piston,
          connectingRod,
          crankThrow);

        // positioned cylinder
        let offset: number = 0;

        if (this.GetTiltSpan_deg(this.selectedEngineLayoutData) === 0) /* motor je inline */ {
          offset = (cylinderLayout.cylinderPosition - 1)
            * (this.selectedBore_mm + (this.selectedBore_mm / Settings.DefaultOffsetDivisor));
        } else {
          if (Mathematics.IsOdd(cylinderLayout.cylinderPosition)) {
            if (positionedCylinders.length > 0) {
              offset = (positionedCylinders[positionedCylinders.length - 1].Offset_mm
                + (this.selectedBore_mm + (this.selectedBore_mm / Settings.DefaultOffsetDivisor)));
            }
          } else {
            offset = positionedCylinders[positionedCylinders.length - 1].Offset_mm;
            offset += crankThrow.CrankPinWidth_mm;
          }
        }

        const positionedCylinder: PositionedCylinder = new PositionedCylinder(
          cylinder,
          cylinderLayout.cylinderPosition,
          offset,
          cylinderLayout.tilt,
          cylinderLayout.firingAngle);
        positionedCylinders.push(positionedCylinder);

        // javimo progress
        this.progress = (100 / this.selectedEngineLayoutData.length) * (index + 1);

        setTimeout(() => {
          this.validateEngine(index + 1, positionedCylinders, callback);
        }, 100);
      } else {
        this.engine = new Engine(positionedCylinders);
        this.engine.Flywheel.Mass_g = this.selectedFlywheelMass_g;
        this.engine.Flywheel.Diameter_mm = this.selectedFlywheelDiameter_mm;

        this.progress = 100;
        this.engineValidationOutcome = EngineValidationOutcome.SUCCESS;

        callback();
      }
    } catch (exception) {
      this.engine = null;
      this.engineValidationOutcome = EngineValidationOutcome.ERROR;
      this.engineValidationErrorMessage = exception;

      callback();
    }
  }

  private GetTiltSpan_deg(cylinderLyouts: CylinderLayout[]): number {
    let offset_deg: number = 0;

    for (const cylinderLayout of cylinderLyouts) {
      if (cylinderLayout.tilt !== 0) {
        offset_deg = Math.abs(cylinderLayout.tilt);
        offset_deg *= 2;

        break;
      }
    }

    return offset_deg;
  }

}


enum CustomDialogAction {
  CANCEL = 1,
  BACK = 2,
  FINISH = 4,
  NEXT = 8,
  CLOSE = 16
}

interface TreeNodeData {
  toolTip: string;
  cylinderLayouts: CylinderLayout[];
}
interface CylinderLayout {
  cylinderPosition: number;
  firingAngle: number;
  tilt: number;
}

enum EngineValidationOutcome {
  SUCCESS = 1,
  ERROR = 2
}
