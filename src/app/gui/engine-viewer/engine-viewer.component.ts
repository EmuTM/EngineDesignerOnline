import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, Input } from '@angular/core';
import * as THREE from 'three';
import './js/EnableThreeExamples'; // to MORA bit zaradi orbitControls
import 'three/examples/js/controls/OrbitControls';
import { Defaults } from '../../common/Defaults';
import { MenuItem } from 'primeng/components/common/menuitem';
import { ContextMenu } from 'primeng/components/contextmenu/contextmenu';
import { EngineSketch } from '../../media/EngineSketch';
import { Engine } from '../../machine/Engine';
import { Cycle } from '../../machine/Cycle';


@Component({
  selector: 'app-engine-viewer',
  templateUrl: './engine-viewer.component.html'
})

export class EngineViewerComponent implements AfterViewInit {
  private _engine: Engine;
  public get engine(): Engine {
    return this._engine;
  }
  public set engine(value: Engine) {
    this._engine = value;

    if (this.engineSketch) {
      this.engineSketch.IPart = this._engine;
    }
  }


  @ViewChild('canvas')
  public canvasRef: ElementRef;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild('contextMenu')
  public contextMenu: ContextMenu;


  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private controls: THREE.OrbitControls;
  private engineSketch: EngineSketch;

  // koordinate, da vemo, ali se je premaknila miš, da lahko disablamo context menu
  private mouseDownX: number;
  private mouseDownY: number;
  public preventContextMenu: boolean = false;


  public contextMenuItems: MenuItem[] =
    [
      {
        label: 'Reset',
        icon: 'fas fa-street-view',
        command: () => {
          this.reset();
        }
      }
    ];


  constructor() {
  }
  public ngAfterViewInit() {
    // scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(Defaults.RendererBackgroundColor);

    // camera
    this.camera = new THREE.PerspectiveCamera(Defaults.FoV, this.canvas.clientWidth / this.canvas.clientHeight, Defaults.NearPlane, Defaults.FarPlane);

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    // this.canvas.appendChild(this.renderer.domElement);
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setClearColor(Defaults.RendererBackgroundColor, 1);
    this.renderer.autoClear = true;

    // controls
    this.controls = new THREE.OrbitControls(this.camera, this.canvas);
    this.controls.rotateSpeed = Defaults.RotateSpeed;
    this.controls.zoomSpeed = Defaults.ZoomSpeed;

    this.reset();

    this.engineSketch = new EngineSketch(this.scene, this.camera, this.canvas);
    if (this._engine) {
      this.engineSketch.IPart = this._engine;
    }

    // render loop
    const self: EngineViewerComponent = this;
    (function renderLoop() {
      requestAnimationFrame(renderLoop);
      self.render();
    }());
  }


  public onMouseDown(event: MouseEvent) {
    this.mouseDownX = event.x;
    this.mouseDownY = event.y;

    // skrijemo meni za desni gumb
    if (event.button === 2) {
      this.contextMenu.hide();
    }
  }
  public onMouseUp(event: MouseEvent) {
    this.preventContextMenu = (event.x !== this.mouseDownX || event.y !== this.mouseDownY);
  }


  private render() {
    // naredimo primerno velik canvas, da se prilega parentu
    const parent = this.canvas.parentElement.parentElement;
    this.canvas.style.width = (parent.clientWidth - 0).toString() + 'px';
    this.canvas.style.height = (parent.clientHeight - 5).toString() + 'px';

    // poskrbimo za točen aspect ratio
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.renderEngine();

    this.renderer.render(this.scene, this.camera);
  }
  private renderEngine(): void {
    this.engineSketch.CrankshaftRotation_deg += 1;
    // this.engineSketch.CrankshaftRotation_deg = 90;
    this.engineSketch.Render();
  }

  private reset(): void {
    this.controls.reset();

    this.camera.position.set(Defaults.CameraDistance, Defaults.CameraDistance, Defaults.CameraDistance);
    this.camera.lookAt(this.scene.position);
  }

}
