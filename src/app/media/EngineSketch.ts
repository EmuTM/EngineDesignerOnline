import { Defaults } from '../common/Defaults';
import { Engine } from '../machine/Engine';
import { IPart } from '../machine/IPart';
import { Utilities } from '../common/Utilities';
import { Stroke } from '../machine/Stroke';
import { Settings } from '../common/Settings';
import { PositionedCylinder } from '../machine/PositionedCylinder';
import * as THREE from 'three';
import { Conversions } from '../common/Conversions';
import { IPartSketch } from './IPartSketch';
import { RenderMode } from './RenderMode';
import * as THREEX from 'three-text2d';
import { textAlign, MeshText2D } from 'three-text2d';
import { Cycle } from '../machine/Cycle';

export class EngineSketch extends IPartSketch {
    private crankshaftRotation_deg: number = 0;
    public get CrankshaftRotation_deg(): number {
        return this.crankshaftRotation_deg;
    }
    public set CrankshaftRotation_deg(value: number) {
        this.crankshaftRotation_deg = value;
        this.Refresh();
    }

    private cylinderColor: number = Defaults.BlackColor;
    public get CylinderColor(): number {
        return this.cylinderColor;
    }
    public set CylinderColor(value: number) {
        this.cylinderColor = value;
        this.Refresh();
    }

    private pistonColor: number = Defaults.BlackColor;
    public get PistonColor(): number {
        return this.pistonColor;
    }
    public set PistonColor(value: number) {
        this.pistonColor = value;
        this.Refresh();
    }

    private connectingRodColor: number = Defaults.BlackColor;
    public get ConnectingRodColor(): number {
        return this.connectingRodColor;
    }
    public set ConnectingRodColor(value: number) {
        this.connectingRodColor = value;
        this.Refresh();
    }

    private crankshaftColor: number = Defaults.BlackColor;
    public get CrankshaftColor(): number {
        return this.crankshaftColor;
    }
    public set CrankshaftColor(value: number) {
        this.crankshaftColor = value;
        this.Refresh();
    }

    private flywheelColor: number = Defaults.BlackColor;
    public get FlywheelColor(): number {
        return this.flywheelColor;
    }
    public set FlywheelColor(value: number) {
        this.flywheelColor = value;
        this.Refresh();
    }

    private cylinderRenderMode: RenderMode = RenderMode.WIRE_FRAME;
    public get CylinderRenderMode(): RenderMode {
        return this.cylinderRenderMode;
    }
    public set CylinderRenderMode(value: RenderMode) {
        this.cylinderRenderMode = value;
        this.Refresh();
    }

    private pistonRenderMode: RenderMode = RenderMode.WIRE_FRAME;
    public get PistonRenderMode(): RenderMode {
        return this.pistonRenderMode;
    }
    public set PistonRenderMode(value: RenderMode) {
        this.pistonRenderMode = value;
        this.Refresh();
    }

    private connectingRodRenderMode: RenderMode = RenderMode.WIRE_FRAME;
    public get ConnectingRodRenderMode(): RenderMode {
        return this.connectingRodRenderMode;
    }
    public set ConnectingRodRenderMode(value: RenderMode) {
        this.connectingRodRenderMode = value;
        this.Refresh();
    }

    private crankshaftRenderMode: RenderMode = RenderMode.WIRE_FRAME;
    public get CrankshaftRenderMode(): RenderMode {
        return this.crankshaftRenderMode;
    }
    public set CrankshaftRenderMode(value: RenderMode) {
        this.crankshaftRenderMode = value;
        this.Refresh();
    }

    private combustionChamberRenderMode: RenderMode = RenderMode.SOLID;
    public get CombustionChamberRenderMode(): RenderMode {
        return this.combustionChamberRenderMode;
    }
    public set CombustionChamberRenderMode(value: RenderMode) {
        this.combustionChamberRenderMode = value;
        this.Refresh();
    }

    private intakeColor: number = Defaults.IntakeColor;
    public get IntakeColor(): number {
        return this.intakeColor;
    }
    public set IntakeColor(value: number) {
        this.intakeColor = value;
    }

    private compressionColor: number = Defaults.CompressionColor;
    public get CompressionColor(): number {
        return this.compressionColor;
    }
    public set CompressionColor(value: number) {
        this.compressionColor = value;
    }

    private combustionColor: number = Defaults.CombustionColor;
    public get CombustionColor(): number {
        return this.combustionColor;
    }
    public set CombustionColor(value: number) {
        this.combustionColor = value;
    }

    private exhaustColor: number = Defaults.ExhaustColor;
    public get ExhaustColor(): number {
        return this.exhaustColor;
    }
    public set ExhaustColor(value: number) {
        this.exhaustColor = value;
    }

    private showSpark: boolean = true;
    public get ShowSpark(): boolean {
        return this.showSpark;
    }
    public set ShowSpark(value: boolean) {
        this.showSpark = value;
    }

    private sparkColor: number = Defaults.RedColor;
    public get SparkColor(): number {
        return this.sparkColor;
    }
    public set SparkColor(value: number) {
        this.sparkColor = value;
    }

    private sparkAdvance_degs: number = 25;
    public get SparkAdvance_degs(): number {
        return this.sparkAdvance_degs;
    }
    public set SparkAdvance_degs(value: number) {
        this.sparkAdvance_degs = value;
    }

    private sparkDuration_degs: number = 50;
    public get SparkDuration_degs(): number {
        return this.sparkDuration_degs;
    }
    public set SparkDuration_degs(value: number) {
        this.sparkDuration_degs = value;
    }

    private showCylinderPositions: boolean = true;
    public get ShowCylinderPositions(): boolean {
        return this.showCylinderPositions;
    }
    public set ShowCylinderPositions(value: boolean) {
        this.showCylinderPositions = value;
    }

    private cylinderPositionColor: number = Defaults.BlackColor;
    public get CylinderPositionColor(): number {
        return this.cylinderPositionColor;
    }
    public set CylinderPositionColor(value: number) {
        this.cylinderPositionColor = value;
    }

    // private cylinderPositionFont: System.Drawing.Font = Defaults.DefaultFont;
    // public get CylinderPositionFont(): System.Drawing.Font
    // {
    //    return this.cylinderPositionFont;
    // }
    // public set CylinderPositionFont(value: System.Drawing.Font)
    // {
    //    this.cylinderPositionFont = value;
    // }

    private selectedIPartColor: number = Defaults.SelectedIPartColor;
    public get SelectedIPartColor(): number {
        return this.selectedIPartColor;
    }
    public set SelectedIPartColor(value: number) {
        this.selectedIPartColor = value;
    }

    // public get Animated(): boolean
    // {
    //    return this.rpmTimer1.Enabled;
    // }
    // public set Animated(value: boolean)
    // {
    //    this.rpmTimer1.Enabled = value;
    // }

    private engine: Engine = null;
    public get IPart(): Engine {
        return this.engine;
    }
    public set IPart(value: Engine) {
        this.engine = value;
        this.SetIPart(this.engine);
        // this.rpmTimer1.Engine = this.engine;

        this.CreateEngine(this.Scene, this.Meshes, this.engine);
    }

    private selectedParts: Array<IPart> = new Array<IPart>();
    public get SelectedParts(): Array<IPart> {
        return this.selectedParts;
    }
    public set SelectedParts(value: Array<IPart>) {
        this.selectedParts = value;
        this.Refresh();
    }

    // private crankRotationInAnimation_deg: number = 0;

    private camera: THREE.PerspectiveCamera;
    private parentElement: HTMLElement;

    constructor(_scene: THREE.Scene, _camera: THREE.PerspectiveCamera, _parentElement: HTMLElement) {
        super(_scene);

        this.camera = _camera;
        this.parentElement = _parentElement;

        // this.Disposed.addEventListener(new EventHandler(this.EngineSketch_Disposed));
    }
    // private EngineSketch_Disposed(sender: Object, e: EventArgs)
    // {
    //    rpmTimer1.Dispose();
    // }



    private Refresh(): void {
    }



    public Render() {
        super.Render();

        if (Utilities.Exists(this.engine) === true) {
            this.UpdateEngine(this.Meshes, this.engine, this.crankshaftRotation_deg);

            // obsolete
            // this.DrawEngine(this.Scene, this.engine, this.crankshaftRotation_deg);
        }
    }



    private CreateEngine(_scene: THREE.Scene, _meshes: {}, _engine: Engine): void {
        if (_engine.PositionedCylinders.length > 0) {
            for (const _positionedCylinder of _engine.PositionedCylinders) {
                this.CreateCylinder(_scene, _meshes, _positionedCylinder);
                this.CreatePiston(_scene, _meshes, _positionedCylinder);
                this.CreateCombustionChamber(_scene, _meshes, _positionedCylinder);
                this.CreateConnectingRod(_scene, _meshes, _positionedCylinder);
                this.CreateSparkAndPosition(_scene, _meshes, _positionedCylinder);
            }

            this.CreateCrankshaft(_scene, _meshes, _engine);

            this.CreateFlywheel(_scene, _meshes, _engine);
        }
    }
    private UpdateEngine(_meshes: {}, _engine: Engine, _crankshaftRotation_deg: number): void {
        if (_engine.PositionedCylinders.length > 0) {
            for (const _positionedCylinder of _engine.PositionedCylinders) {
                // 'Cylinder'
                const _cylinderColor: number = this.GetColor(this.cylinderColor, _positionedCylinder);

                switch (this.CylinderRenderMode) {
                    case RenderMode.WIRE_FRAME:
                        this.UpdateCylinder(_meshes, _positionedCylinder, _cylinderColor, false);
                        break;
                    case RenderMode.SOLID:
                        this.UpdateCylinder(_meshes, _positionedCylinder, _cylinderColor, true);
                        break;
                    case RenderMode.COMBINED:
                        this.UpdateCylinder(_meshes, _positionedCylinder, _cylinderColor, true);
                        this.UpdateCylinder(_meshes, _positionedCylinder, _cylinderColor, false);
                        break;


                    default:
                        Utilities.NotImplemented();
                }
                // 'Cylinder'

                // 'Piston'
                const _pistonColor: number = this.GetColor(this.pistonColor, _positionedCylinder.Piston);

                switch (this.pistonRenderMode) {
                    case RenderMode.WIRE_FRAME:
                        this.UpdatePiston(_meshes, _positionedCylinder, _pistonColor, false, _crankshaftRotation_deg);
                        break;
                    case RenderMode.SOLID:
                        this.UpdatePiston(_meshes, _positionedCylinder, _pistonColor, true, _crankshaftRotation_deg);
                        break;
                    case RenderMode.COMBINED:
                        this.UpdatePiston(_meshes, _positionedCylinder, _pistonColor, true, _crankshaftRotation_deg);
                        this.UpdatePiston(_meshes, _positionedCylinder, _pistonColor, false, _crankshaftRotation_deg);
                        break;


                    default:
                        Utilities.NotImplemented();
                }
                // 'Piston'

                // 'CombustionChamber'
                const _stroke: Stroke = _positionedCylinder.GetStroke(_crankshaftRotation_deg);

                const _elapsedStroke_deg: number = _positionedCylinder.GetElapsedStroke(_stroke, _crankshaftRotation_deg);
                const _elapsedStroke_percentage: number = (_elapsedStroke_deg / Stroke.StrokeDuration_deg);

                let _strokeColor: number = 0;

                if (!isNaN(_elapsedStroke_percentage)) {
                    if (_stroke.Equals(Stroke.Intake)) {
                        _strokeColor = Utilities.GetInterpolatedColor(this.exhaustColor, this.intakeColor, _elapsedStroke_percentage);
                    } else if (_stroke.Equals(Stroke.Compression)) {
                        _strokeColor = Utilities.GetInterpolatedColorLogaritmic2(this.intakeColor, this.compressionColor, _elapsedStroke_percentage);
                    } else if (_stroke.Equals(Stroke.Combustion)) {
                        _strokeColor = Utilities.GetInterpolatedColorLogaritmic1(this.combustionColor, this.exhaustColor, _elapsedStroke_percentage);
                    } else if (_stroke.Equals(Stroke.Exhaust)) {
                        _strokeColor = this.exhaustColor;
                    } else if (_stroke.Equals(Stroke.WashCompression)) {
                        _strokeColor = Utilities.GetInterpolatedColor(this.intakeColor, this.compressionColor, _elapsedStroke_percentage);
                    } else if (_stroke.Equals(Stroke.CombustionExhaust)) {
                        _strokeColor = Utilities.GetInterpolatedColor(this.combustionColor, this.intakeColor, _elapsedStroke_percentage);
                    }
                    // else if (_stroke.Equals(Stroke.NaN))
                    // {

                    // }
                    else {
                        throw Utilities.NotImplemented;
                    }
                }

                _strokeColor = this.GetColor(_strokeColor, _positionedCylinder);

                switch (this.combustionChamberRenderMode) {
                    case RenderMode.WIRE_FRAME:
                        this.UpdateCombustionChamber(_meshes, _positionedCylinder, _strokeColor, false, _crankshaftRotation_deg);
                        break;
                    case RenderMode.SOLID:
                        this.UpdateCombustionChamber(_meshes, _positionedCylinder, _strokeColor, true, _crankshaftRotation_deg);
                        break;
                    case RenderMode.COMBINED:
                        this.UpdateCombustionChamber(_meshes, _positionedCylinder, _strokeColor, true, _crankshaftRotation_deg);
                        this.UpdateCombustionChamber(_meshes, _positionedCylinder, _strokeColor, false, _crankshaftRotation_deg);
                        break;


                    default:
                        Utilities.NotImplemented();
                }
                // 'CombustionChamber'

                // 'ConnectingRod'
                const _connectingRodColor: number = this.GetColor(this.connectingRodColor, _positionedCylinder.ConnectingRod);

                switch (this.connectingRodRenderMode) {
                    case RenderMode.WIRE_FRAME:
                        this.UpdateConnectingRod(_meshes, _positionedCylinder, _connectingRodColor, false, _crankshaftRotation_deg);
                        break;
                    case RenderMode.SOLID:
                        this.UpdateConnectingRod(_meshes, _positionedCylinder, _connectingRodColor, true, _crankshaftRotation_deg);
                        break;
                    case RenderMode.COMBINED:
                        this.UpdateConnectingRod(_meshes, _positionedCylinder, _connectingRodColor, true, _crankshaftRotation_deg);
                        this.UpdateConnectingRod(_meshes, _positionedCylinder, _connectingRodColor, false, _crankshaftRotation_deg);
                        break;


                    default:
                        Utilities.NotImplemented();
                }
                // 'ConnectingRod'

                // 'Spark'
                if (this.showSpark === true) {
                    let _showSpark: boolean = false;

                    if ((_stroke.Equals(Stroke.Combustion)) || (_stroke.Equals(Stroke.CombustionExhaust))) {
                        const _elapsedStroke_deg: number = _positionedCylinder.GetElapsedStroke(_stroke, _crankshaftRotation_deg);
                        if (_elapsedStroke_deg < (this.sparkDuration_degs - this.sparkAdvance_degs)) {
                            _showSpark = true;
                        }
                    } else if ((_stroke.Equals(Stroke.Compression)) || (_stroke.Equals(Stroke.WashCompression))) {
                        const _elapsedStroke_deg: number = _positionedCylinder.GetElapsedStroke(_stroke, _crankshaftRotation_deg);
                        if (_elapsedStroke_deg > (Stroke.StrokeDuration_deg - this.sparkAdvance_degs)) {
                            _showSpark = true;
                        }
                    }

                    this.UpdateSparkAndPosition(_meshes, _positionedCylinder, this.sparkColor, _showSpark);
                }
                // 'Spark'
            }

            // 'Crankshaft'
            switch (this.crankshaftRenderMode) {
                case RenderMode.WIRE_FRAME:
                    this.UpdateCrankshaft(_meshes, _engine, this.crankshaftColor, false, _crankshaftRotation_deg);
                    break;

                case RenderMode.SOLID:
                    this.UpdateCrankshaft(_meshes, _engine, this.crankshaftColor, true, _crankshaftRotation_deg);
                    break;

                case RenderMode.COMBINED:
                    this.UpdateCrankshaft(_meshes, _engine, this.crankshaftColor, true, _crankshaftRotation_deg);
                    this.UpdateCrankshaft(_meshes, _engine, this.crankshaftColor, false, _crankshaftRotation_deg);
                    break;


                default:
                    Utilities.NotImplemented();
            }
            // 'Crankshaft'


            if (_engine.Flywheel.Mass_g > 0) {
                const _flywheelColor: number = this.GetColor(this.flywheelColor, _engine.Flywheel);

                switch (this.crankshaftRenderMode) {
                    case RenderMode.WIRE_FRAME:
                        this.UpdateFlywheel(_meshes, _engine, _flywheelColor, false, _crankshaftRotation_deg);
                        break;
                    case RenderMode.SOLID:
                        this.UpdateFlywheel(_meshes, _engine, _flywheelColor, true, _crankshaftRotation_deg);
                        break;
                    case RenderMode.COMBINED:
                        this.UpdateFlywheel(_meshes, _engine, _flywheelColor, true, _crankshaftRotation_deg);
                        this.UpdateFlywheel(_meshes, _engine, _flywheelColor, false, _crankshaftRotation_deg);
                        break;


                    default:
                        Utilities.NotImplemented();
                }
            }
        }
    }

    private CreateFlywheel(_scene: THREE.Scene, _meshes: {}, _engine: Engine): void {
        const _flywheelRadius_mm: number = (_engine.Flywheel.Diameter_mm / 2);
        const _flywheelWidth_mm: number = (_engine.Flywheel.Diameter_mm / Settings.FlywheelDiameterVsFlywheelWidth);
        const _firstPositionedCylinder: PositionedCylinder = _engine.GetFirstPositionedCylinder();
        const _flywheelPosition: number = ((_firstPositionedCylinder.Offset_mm - (_firstPositionedCylinder.Bore_mm / 2)) - (_flywheelWidth_mm / 2));

        const _mesh: THREE.Mesh = new THREE.Mesh(
            new THREE.CylinderGeometry(
                _flywheelRadius_mm,
                _flywheelRadius_mm,
                _flywheelWidth_mm,
                Defaults.CylinderSegments),
            super.GetMaterial());

        _mesh.translateZ(-_flywheelPosition);
        _mesh.rotateX(Conversions.HalfPiRad);

        _scene.add(_mesh);
        _meshes[_engine.Flywheel.Guid] = _mesh;
    }
    private UpdateFlywheel(_meshes: {}, _engine: Engine, _color: number, _solid: boolean, _crankshaftRotation_deg: number): void {
        const _mesh: THREE.Mesh = _meshes[_engine.Flywheel.Guid];

        (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
        (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

        const _crankshaftRotation_Rad: number = -Conversions.DegToRad(_crankshaftRotation_deg);
        _mesh.rotation.set(_mesh.rotation.x, _crankshaftRotation_Rad, _mesh.rotation.z);
    }

    private CreateCylinder(_scene: THREE.Scene, _meshes: {}, _positionedCylinder: PositionedCylinder): void {
        const _cylinderHeight: number = _positionedCylinder.CylinderHeight_mm;
        const _cylinderRadius: number = _positionedCylinder.Bore_mm / 2;

        const _mesh: THREE.Mesh = new THREE.Mesh(
            new THREE.CylinderGeometry(
                _cylinderRadius,
                _cylinderRadius,
                _cylinderHeight,
                Defaults.CylinderSegments),
            super.GetMaterial());

        _mesh.rotateZ(-Conversions.DegToRad(_positionedCylinder.Tilt_deg));

        _mesh.translateY((_positionedCylinder.GetPhysicalHeightAbovePiston_mm(0) - _cylinderHeight / 2));
        _mesh.translateZ(-_positionedCylinder.Offset_mm); // cilindri grejo v globino

        _scene.add(_mesh);
        _meshes[_positionedCylinder.Guid] = _mesh;
    }
    private UpdateCylinder(_meshes: {}, _positionedCylinder: PositionedCylinder, _color: number, _solid: boolean): void {
        const _mesh: THREE.Mesh = _meshes[_positionedCylinder.Guid];

        (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
        (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;
    }

    private CreatePiston(_scene: THREE.Scene, _meshes: {}, _positionedCylinder: PositionedCylinder): void {
        const _pistonRadius: number = _positionedCylinder.Bore_mm / 2 * Settings.PistonVsCylinderClearance;

        const _mesh: THREE.Mesh = new THREE.Mesh(
            new THREE.CylinderGeometry(
                _pistonRadius,
                _pistonRadius,
                _positionedCylinder.Piston.SkirtLength_mm,
                Defaults.CylinderSegments),
            super.GetMaterial());

        _scene.add(_mesh);
        _meshes[_positionedCylinder.Piston.Guid] = _mesh;
    }
    private UpdatePiston(_meshes: {}, _positionedCylinder: PositionedCylinder, _color: number, _solid: boolean, _crankshaftRotation_deg: number): void {
        const _mesh: THREE.Mesh = _meshes[_positionedCylinder.Piston.Guid];

        (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
        (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

        const _cylinderRelativeCrankThrowRotation_deg: number = _positionedCylinder.GetCylinderRelativeCrankThrowRotation_deg(_crankshaftRotation_deg);
        const _pistonTravelFromCrankCenter: number = _positionedCylinder.GetPistonTravelFromCrankCenter_mm(_cylinderRelativeCrankThrowRotation_deg) - _positionedCylinder.Piston.SkirtLength_mm / 2 + _positionedCylinder.Piston.GudgeonPinDistanceFromTop_mm;

        _mesh.position.set(0, 0, 0);
        _mesh.rotation.set(0, 0, 0);

        _mesh.rotateZ(-Conversions.DegToRad(_positionedCylinder.Tilt_deg));

        _mesh.translateY(_pistonTravelFromCrankCenter);
        _mesh.translateZ(-_positionedCylinder.Offset_mm); // cilindri grejo v globino
    }

    private CreateCombustionChamber(_scene: THREE.Scene, _meshes: {}, _positionedCylinder: PositionedCylinder): void {
        const _cylinderRelativeCrankThrowRotation_deg: number = _positionedCylinder.GetCylinderRelativeCrankThrowRotation_deg(0); // _crankshaftRotation_deg
        const _combustionChamberRadius: number = _positionedCylinder.Bore_mm / 2 * Settings.PistonVsCylinderClearance;

        const _mesh: THREE.Mesh = new THREE.Mesh(
            new THREE.CylinderGeometry(
                _combustionChamberRadius,
                _combustionChamberRadius,
                1, // _combustionChamberHeight_mm // moramo imeti 1 zaradi skaliranja!
                Defaults.CylinderSegments),
            super.GetMaterial());

        _scene.add(_mesh);
        _meshes[_positionedCylinder.Guid + '_COMBUSTION_CHAMBER'] = _mesh;
    }
    private UpdateCombustionChamber(_meshes: {}, _positionedCylinder: PositionedCylinder, _color: number, _solid: boolean, _crankshaftRotation_deg: number): void {
        const _mesh: THREE.Mesh = _meshes[_positionedCylinder.Guid + '_COMBUSTION_CHAMBER'];

        (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
        (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

        const _cylinderRelativeCrankThrowRotation_deg: number = _positionedCylinder.GetCylinderRelativeCrankThrowRotation_deg(_crankshaftRotation_deg);
        const _combustionChamberHeight_mm: number = _positionedCylinder.GetCombustionChamberHeight_mm(_cylinderRelativeCrankThrowRotation_deg);
        const _combustionChamberPosition: number = _positionedCylinder.GetPhysicalHeightAbovePiston_mm(_cylinderRelativeCrankThrowRotation_deg) + (_combustionChamberHeight_mm / 2);

        _mesh.position.set(0, 0, 0);
        _mesh.rotation.set(0, 0, 0);

        _mesh.scale.setY(_combustionChamberHeight_mm);

        _mesh.rotateZ(-Conversions.DegToRad(_positionedCylinder.Tilt_deg));

        _mesh.translateY(_combustionChamberPosition);
        _mesh.translateZ(-_positionedCylinder.Offset_mm); // cilindri grejo v globino
    }

    private CreateConnectingRod(_scene: THREE.Scene, _meshes: {}, _positionedCylinder: PositionedCylinder): void {
        const _mesh: THREE.Mesh = new THREE.Mesh(
            new THREE.BoxGeometry(
                Settings.ConRodBigEndPinAndCrankshaftDiameter_mm,
                _positionedCylinder.ConnectingRod.Length_mm,
                _positionedCylinder.CrankThrow.CrankPinWidth_mm),
            super.GetMaterial());

        _scene.add(_mesh);
        _meshes[_positionedCylinder.ConnectingRod.Guid] = _mesh;
    }
    private UpdateConnectingRod(_meshes: {}, _positionedCylinder: PositionedCylinder, _color: number, _solid: boolean, _crankshaftRotation_deg: number): void {
        const _mesh: THREE.Mesh = _meshes[_positionedCylinder.ConnectingRod.Guid];

        (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
        (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

        var _crankThrowRotation_Rad: number = -Conversions.DegToRad(_positionedCylinder.GetAbsoluteCrankThrowRotation_deg(_crankshaftRotation_deg));
        // SEE: PositionedCylinder.SLDPRT
        var _conRodAngle_deg: number = <number>(-_positionedCylinder.Tilt_deg + _positionedCylinder.GetConRodAngle_deg(_positionedCylinder.GetCylinderRelativeCrankThrowRotation_deg(_crankshaftRotation_deg)));

        _mesh.position.set(0, 0, 0);
        _mesh.rotation.set(0, 0, 0);

        _mesh.translateX(Math.sin(-_crankThrowRotation_Rad) * _positionedCylinder.CrankThrow.CrankRotationRadius_mm);
        _mesh.translateY(Math.cos(-_crankThrowRotation_Rad) * _positionedCylinder.CrankThrow.CrankRotationRadius_mm);

        _mesh.rotateZ(Conversions.DegToRad(_conRodAngle_deg));

        _mesh.translateY(_positionedCylinder.ConnectingRod.Length_mm / 2);
        _mesh.translateZ(-_positionedCylinder.Offset_mm);
    }

    private CreateSparkAndPosition(_scene: THREE.Scene, _meshes: {}, _positionedCylinder: PositionedCylinder): void {
        const _sparkRadius: number = (_positionedCylinder.Bore_mm * Settings.SparkVsCylinderFactor);
        const _sparkPosition: number = (_positionedCylinder.GetPhysicalHeightAbovePiston_mm(0) + _sparkRadius + Settings.SparkVsCylinderClearance);

        const _meshSpark: THREE.Mesh = new THREE.Mesh(
            new THREE.SphereGeometry(
                _sparkRadius,
                Defaults.SphereSegments,
                Defaults.SphereSegments),
            super.GetMaterial());

        (<THREE.MeshBasicMaterial>_meshSpark.material).wireframe = false;
        // najprej rotiramo in potem premaknemo, da spravimo nad cilinder
        _meshSpark.rotateZ(-Conversions.DegToRad(_positionedCylinder.Tilt_deg));
        _meshSpark.translateY(_sparkPosition);
        _meshSpark.translateZ(-_positionedCylinder.Offset_mm); // cilindri grejo v globino
        _scene.add(_meshSpark);
        _meshes[_positionedCylinder.Guid + '_SPARK'] = _meshSpark;

        const _positionPosition: number = (_positionedCylinder.GetPhysicalHeightAbovePiston_mm(0) + _sparkRadius + Settings.PositionVsCylinderClearance);

        const _textCylinderPosition = new MeshText2D(
            _positionedCylinder.Position.toString(),
            {
                align: textAlign.center,
                font: Settings.CylinderPositionFont,
                fillStyle: '#' + Settings.CylinderPositionColor,
                antialias: true
            });
        // najprej rotiramo in potem premaknemo, da spravimo nad cilinder
        _textCylinderPosition.rotateZ(-Conversions.DegToRad(_positionedCylinder.Tilt_deg));
        _textCylinderPosition.translateY(_positionPosition);
        _textCylinderPosition.translateZ(-_positionedCylinder.Offset_mm); // cilindri grejo v globino
        _scene.add(_textCylinderPosition);
        _meshes[_positionedCylinder.Guid + '_CYLINDER_POSITION'] = _textCylinderPosition;
    }
    private UpdateSparkAndPosition(_meshes: {}, _positionedCylinder: PositionedCylinder, _color: number, _visible: boolean): void {
        const _meshSpark: THREE.Mesh = _meshes[_positionedCylinder.Guid + '_SPARK'];

        (<THREE.MeshBasicMaterial>_meshSpark.material).color = new THREE.Color(_color);

        _meshSpark.visible = _visible;

        const _textCylinderPosition = _meshes[_positionedCylinder.Guid + '_CYLINDER_POSITION'];
        _textCylinderPosition.rotation.set(this.camera.rotation.x, this.camera.rotation.y, this.camera.rotation.z);
    }

    private CreateCrankshaft(_scene: THREE.Scene, _meshes: {}, _engine: Engine): void {
        let _mesh: THREE.Mesh;

        // 'narišemo ročice in morebitne povezave med njimi'
        // 'non-mated cylinders'
        const _allNonMatedPositionedCylinders: Array<PositionedCylinder> = _engine.GetNonMatedPositionedCylinders();

        for (const _positionedCylinder of _allNonMatedPositionedCylinders) {
            this.CreateCrankThrow(_scene, _meshes, _positionedCylinder, true, true);
        }
        // 'non-mated cylinders'

        // 'mated cylinders'
        const _allMatedPositionedCylinders: Array<Array<PositionedCylinder>> = _engine.GetMatedPositionedCylinders();

        for (const _matedPositionedCylinders of _allMatedPositionedCylinders) {
            const _firstMatedPositionedCylinder: PositionedCylinder = _engine.GetFirstPositionedCylinder(_matedPositionedCylinders);
            const _lastMatedPositionedCylinder: PositionedCylinder = _engine.GetLastPositionedCylinder(_matedPositionedCylinders);

            for (const _currentMatedPositionedCylinder of _matedPositionedCylinders) {
                if (_currentMatedPositionedCylinder === _firstMatedPositionedCylinder) {
                    this.CreateCrankThrow(_scene, _meshes, _currentMatedPositionedCylinder, true, false);
                } else if (_currentMatedPositionedCylinder === _lastMatedPositionedCylinder) {
                    this.CreateCrankThrow(_scene, _meshes, _currentMatedPositionedCylinder, false, true);
                }

                const _previousMatedPositionedCylinder: PositionedCylinder = _engine.GetPreviousPositionedCylinder(_currentMatedPositionedCylinder, _matedPositionedCylinders);
                if (Utilities.Exists(_previousMatedPositionedCylinder) === true) {
                    const _currentCrankThrowRotation_deg: number = _currentMatedPositionedCylinder.GetAbsoluteCrankThrowRotation_deg(0);
                    const _previousCrankThrowRotation_deg: number = _previousMatedPositionedCylinder.GetAbsoluteCrankThrowRotation_deg(0);

                    if ((_currentCrankThrowRotation_deg !== _previousCrankThrowRotation_deg)
                        || (_currentMatedPositionedCylinder.CrankThrow.CrankRotationRadius_mm !== _previousMatedPositionedCylinder.CrankThrow.CrankRotationRadius_mm)) {
                        // 'povezava med matanimi cilindri'
                        // SEE: BindedCrankThrows.SLDPRT (_a, _b, _c = stranice trikotnika, _A, _B = notranji koti trikotnika)

                        const _currentCrankThrowRotation_Rad: number = Conversions.DegToRad(_currentCrankThrowRotation_deg);
                        const _previousCrankThrowRotation_Rad: number = Conversions.DegToRad(_previousCrankThrowRotation_deg);

                        const _b: number = _previousMatedPositionedCylinder.CrankThrow.CrankRotationRadius_mm;
                        const _c: number = _currentMatedPositionedCylinder.CrankThrow.CrankRotationRadius_mm;

                        const _A_Rad: number = _previousCrankThrowRotation_Rad - _currentCrankThrowRotation_Rad;
                        const _a: number = Math.sqrt(
                            Math.pow(_b, 2)
                            + Math.pow(_c, 2)
                            - 2 * _b * _c * Math.cos(_A_Rad));

                        const _C_Rad: number = Math.asin(_c * Math.sin(_A_Rad) / _a);


                        _mesh = new THREE.Mesh(
                            new THREE.BoxGeometry(
                                _a,
                                Settings.ConRodBigEndPinAndCrankshaftDiameter_mm,
                                0),
                            super.GetMaterial());

                        _mesh.translateZ((-_currentMatedPositionedCylinder.Offset_mm + (_currentMatedPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2)));

                        _scene.add(_mesh);
                        _meshes[_currentMatedPositionedCylinder.Guid + '_CRANKTHROW_CONNECTION'] = _mesh;
                        // 'povezava med matanimi cilindri'
                    }
                }
            }
        }
        // 'mated cylinders'
        // 'narišemo ročice in morebitne povezave med njimi'

        // 'narišemo gred'
        const _firstPositionedCylinder: PositionedCylinder = _engine.GetFirstPositionedCylinder();
        let _lastPositionedCylinder: PositionedCylinder = _engine.GetLastPositionedCylinder();
        if ((Utilities.Exists(_lastPositionedCylinder) === false)
            && (_engine.PositionedCylinders.length === 1)) {
            _lastPositionedCylinder = _firstPositionedCylinder;
        }

        const _crankshaftRadius_mm: number = Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2;

        // 'podaljšek gredi blizu'
        if (Utilities.Exists(_firstPositionedCylinder) === true) {
            const _shaftExtensionLength: number = ((_firstPositionedCylinder.Bore_mm / 2) - (_firstPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2));

            _mesh = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    _crankshaftRadius_mm,
                    _crankshaftRadius_mm,
                    _shaftExtensionLength,
                    Defaults.CylinderSegments),
                super.GetMaterial());

            _mesh.translateZ(-(_firstPositionedCylinder.Offset_mm - (_shaftExtensionLength / 2) - (_firstPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2)));
            _mesh.rotateX(Conversions.HalfPiRad);

            _scene.add(_mesh);
            _meshes[_engine.Guid + '_CRANSHAFT_NEAR'] = _mesh;
        }
        // 'podaljšek gredi blizu'

        // 'podaljšek gredi daleč'
        if (Utilities.Exists(_lastPositionedCylinder) === true) {
            const _shaftExtensionLength: number = ((_lastPositionedCylinder.Bore_mm / 2) - (_lastPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2));

            _mesh = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    _crankshaftRadius_mm,
                    _crankshaftRadius_mm,
                    _shaftExtensionLength,
                    Defaults.CylinderSegments),
                super.GetMaterial());
            _scene.add(_mesh);

            _mesh.translateZ(-(_lastPositionedCylinder.Offset_mm + _lastPositionedCylinder.CrankThrow.CrankPinWidth_mm + (_shaftExtensionLength / 2) + -(_lastPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2)));
            _mesh.rotateX(Conversions.HalfPiRad);

            _scene.add(_mesh);
            _meshes[_engine.Guid + '_CRANSHAFT_FAR'] = _mesh;
        }
        // 'podaljšek gredi daleč'

        // 'med ročicami'
        let _currentPositionedCylinder: PositionedCylinder = _firstPositionedCylinder;
        let _nextPositionedCylinder: PositionedCylinder = _engine.GetNextPositionedCylinder(_currentPositionedCylinder);

        let _crankshaftIndex: number = 0;
        while (Utilities.Exists(_nextPositionedCylinder) === true) {
            const _currentBigEndPinWidthHalf_mm: number = (_currentPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2);
            const _nextBigEndPinWidthHalf_mm: number = (_nextPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2);
            const _shaftFragmentStart: number = (_currentPositionedCylinder.Offset_mm + _currentBigEndPinWidthHalf_mm);
            const _shaftFragmentEnd: number = (_nextPositionedCylinder.Offset_mm - _nextBigEndPinWidthHalf_mm);
            const _shaftFragmentLength_mm: number = _shaftFragmentEnd - _shaftFragmentStart;

            if (_shaftFragmentLength_mm > 0) {
                const _shaftFragmentPosition: number = (_currentPositionedCylinder.Offset_mm + _currentBigEndPinWidthHalf_mm + (_shaftFragmentLength_mm / 2));

                _mesh = new THREE.Mesh(
                    new THREE.CylinderGeometry(
                        _crankshaftRadius_mm,
                        _crankshaftRadius_mm,
                        _shaftFragmentLength_mm,
                        Defaults.CylinderSegments),
                    super.GetMaterial());

                _mesh.translateZ(-_shaftFragmentPosition);
                _mesh.rotateX(Conversions.HalfPiRad);

                _scene.add(_mesh);
                _meshes[_engine.Guid + '_CRANSHAFT_BETWEEN_' + _crankshaftIndex.toString()] = _mesh;
            }
            _currentPositionedCylinder = _nextPositionedCylinder;
            _nextPositionedCylinder = _engine.GetNextPositionedCylinder(_currentPositionedCylinder);

            _crankshaftIndex++;
        }
        // 'med ročicami'
        // 'narišemo gred'
    }
    private CreateCrankThrow(_scene: THREE.Scene, _meshes: {}, _positionedCylinder: PositionedCylinder, _nearHalf: boolean, _farHalf: boolean): void {
        let _mesh: THREE.Mesh;

        // 'big pin'
        const _bigPinRadius_mm: number = Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2;

        _mesh = new THREE.Mesh(
            new THREE.CylinderGeometry(
                _bigPinRadius_mm,
                _bigPinRadius_mm,
                _positionedCylinder.CrankThrow.CrankPinWidth_mm,
                Defaults.CylinderSegments),
            super.GetMaterial());

        _mesh.translateZ(-_positionedCylinder.Offset_mm);
        _mesh.rotateX(Conversions.HalfPiRad);

        _scene.add(_mesh);
        _meshes[_positionedCylinder.CrankThrow.Guid] = _mesh;
        // 'big pin'

        // 'narišemo ročice in protiuteži'
        const _conRodBigEndPinWidthHalf_mm: number = (_positionedCylinder.CrankThrow.CrankPinWidth_mm / 2);
        const _balancerRadius_mm: number = Settings.CrankBalancerDiameter_mm / 2;

        if (_nearHalf === true) {
            const _crankThrowNear_mm: number = (_positionedCylinder.Offset_mm - _conRodBigEndPinWidthHalf_mm);

            // 'ročica blizu'
            _mesh = new THREE.Mesh(
                new THREE.BoxGeometry(
                    Settings.ConRodBigEndPinAndCrankshaftDiameter_mm,
                    _positionedCylinder.CrankThrow.CrankRotationRadius_mm,
                    0),
                super.GetMaterial());

            _mesh.translateZ(-_crankThrowNear_mm);

            _scene.add(_mesh);
            _meshes[_positionedCylinder.CrankThrow.Guid + '_NEAR'] = _mesh;
            // 'ročica blizu'

            if ((_positionedCylinder.CrankThrow.BalancerMass_g > 0)
                && (_positionedCylinder.CrankThrow.BalancerRotationRadius_mm > 0)) {
                // 'ročica uteži blizu'
                _mesh = new THREE.Mesh(
                    new THREE.BoxGeometry(
                        Settings.ConRodBigEndPinAndCrankshaftDiameter_mm,
                        _positionedCylinder.CrankThrow.BalancerRotationRadius_mm,
                        0),
                    super.GetMaterial());

                _mesh.translateZ(-_crankThrowNear_mm);

                _scene.add(_mesh);
                _meshes[_positionedCylinder.CrankThrow.Guid + '_BALANCER_THROW_NEAR'] = _mesh;
                // 'ročica uteži blizu'

                // 'utež blizu'
                _mesh = new THREE.Mesh(
                    new THREE.CylinderGeometry(
                        _balancerRadius_mm,
                        _balancerRadius_mm,
                        Settings.CrankBalancerWidth_mm,
                        Defaults.CylinderSegments),
                    super.GetMaterial());

                _mesh.translateZ(-_crankThrowNear_mm);

                _scene.add(_mesh);
                _meshes[_positionedCylinder.CrankThrow.Guid + '_BALANCER_NEAR'] = _mesh;
                // 'utež blizu'
            }
        }

        if (_farHalf === true) {
            const _crankThrowFar_mm: number = (_positionedCylinder.Offset_mm + _conRodBigEndPinWidthHalf_mm);

            // 'ročica daleč'
            _mesh = new THREE.Mesh(
                new THREE.BoxGeometry(
                    Settings.ConRodBigEndPinAndCrankshaftDiameter_mm,
                    _positionedCylinder.CrankThrow.CrankRotationRadius_mm,
                    0),
                super.GetMaterial());

            _mesh.translateZ(-_crankThrowFar_mm);

            _scene.add(_mesh);
            _meshes[_positionedCylinder.CrankThrow.Guid + '_FAR'] = _mesh;
            // 'ročica daleč'

            if ((_positionedCylinder.CrankThrow.BalancerMass_g > 0)
                && (_positionedCylinder.CrankThrow.BalancerRotationRadius_mm > 0)) {
                // 'ročica uteži daleč'
                _mesh = new THREE.Mesh(
                    new THREE.BoxGeometry(
                        Settings.ConRodBigEndPinAndCrankshaftDiameter_mm,
                        _positionedCylinder.CrankThrow.BalancerRotationRadius_mm,
                        0),
                    super.GetMaterial());

                _mesh.translateZ(-_crankThrowFar_mm);

                _scene.add(_mesh);
                _meshes[_positionedCylinder.CrankThrow.Guid + '_BALANCER_THROW_FAR'] = _mesh;
                // 'ročica uteži daleč'

                // 'utež daleč'
                _mesh = new THREE.Mesh(
                    new THREE.CylinderGeometry(
                        _balancerRadius_mm,
                        _balancerRadius_mm,
                        Settings.CrankBalancerWidth_mm,
                        Defaults.CylinderSegments),
                    super.GetMaterial());

                _mesh.translateZ(-_crankThrowFar_mm);

                _scene.add(_mesh);
                _meshes[_positionedCylinder.CrankThrow.Guid + '_BALANCER_FAR'] = _mesh;
                // 'utež daleč'
            }
        }
        // 'narišemo ročice in protiuteži'
    }
    private UpdateCrankshaft(_meshes: {}, _engine: Engine, _color: number, _solid: boolean, _crankshaftRotation_deg: number): void {
        const _material: THREE.MeshBasicMaterial = super.GetMaterial(_color, _solid);
        let _mesh: THREE.Mesh;

        // 'narišemo ročice in morebitne povezave med njimi'
        // 'non-mated cylinders'
        const _allNonMatedPositionedCylinders: Array<PositionedCylinder> = _engine.GetNonMatedPositionedCylinders();

        for (const _positionedCylinder of _allNonMatedPositionedCylinders) {
            const _crankThrowColor: number = this.GetColor(_color, _positionedCylinder, _positionedCylinder.CrankThrow);
            this.UpdateCrankThrow(_meshes, _positionedCylinder, _crankThrowColor, _solid, _crankshaftRotation_deg, true, true);
        }
        // 'non-mated cylinders'

        // 'mated cylinders'
        const _allMatedPositionedCylinders: Array<Array<PositionedCylinder>> = _engine.GetMatedPositionedCylinders();

        for (const _matedPositionedCylinders of _allMatedPositionedCylinders) {
            const _firstMatedPositionedCylinder: PositionedCylinder = _engine.GetFirstPositionedCylinder(_matedPositionedCylinders);
            const _lastMatedPositionedCylinder: PositionedCylinder = _engine.GetLastPositionedCylinder(_matedPositionedCylinders);

            let _crankThrowColor: number = _color;
            for (const _currentMatedPositionedCylinder of _matedPositionedCylinders) {
                _crankThrowColor = this.GetColor(_color, _currentMatedPositionedCylinder, _currentMatedPositionedCylinder.CrankThrow);

                // če je izbran, ne smemo preverjati naprej, ker bi se spet lahko prepisalo z originalno barvo
                if (_crankThrowColor !== _color) {
                    break;
                }
            }

            for (const _currentMatedPositionedCylinder of _matedPositionedCylinders) {
                if (_currentMatedPositionedCylinder === _firstMatedPositionedCylinder) {
                    this.UpdateCrankThrow(_meshes, _currentMatedPositionedCylinder, _crankThrowColor, _solid, _crankshaftRotation_deg, true, false);
                } else if (_currentMatedPositionedCylinder === _lastMatedPositionedCylinder) {
                    this.UpdateCrankThrow(_meshes, _currentMatedPositionedCylinder, _crankThrowColor, _solid, _crankshaftRotation_deg, false, true);
                }

                const _previousMatedPositionedCylinder: PositionedCylinder = _engine.GetPreviousPositionedCylinder(_currentMatedPositionedCylinder, _matedPositionedCylinders);
                if (Utilities.Exists(_previousMatedPositionedCylinder) === true) {
                    const _currentCrankThrowRotation_deg: number = _currentMatedPositionedCylinder.GetAbsoluteCrankThrowRotation_deg(_crankshaftRotation_deg);
                    const _previousCrankThrowRotation_deg: number = _previousMatedPositionedCylinder.GetAbsoluteCrankThrowRotation_deg(_crankshaftRotation_deg);

                    if ((_currentCrankThrowRotation_deg !== _previousCrankThrowRotation_deg)
                        || (_currentMatedPositionedCylinder.CrankThrow.CrankRotationRadius_mm !== _previousMatedPositionedCylinder.CrankThrow.CrankRotationRadius_mm)) {
                        // 'povezava med matanimi cilindri'
                        // SEE: BindedCrankThrows.SLDPRT (_a, _b, _c = stranice trikotnika, _A, _B = notranji koti trikotnika)

                        const _currentCrankThrowRotation_Rad: number = -Conversions.DegToRad(_currentCrankThrowRotation_deg);
                        const _previousCrankThrowRotation_Rad: number = -Conversions.DegToRad(_previousCrankThrowRotation_deg);

                        const _b: number = _previousMatedPositionedCylinder.CrankThrow.CrankRotationRadius_mm;
                        const _c: number = _currentMatedPositionedCylinder.CrankThrow.CrankRotationRadius_mm;

                        const _A_Rad: number = _previousCrankThrowRotation_Rad - _currentCrankThrowRotation_Rad;
                        const _a: number = Math.sqrt(
                            Math.pow(_b, 2)
                            + Math.pow(_c, 2)
                            - 2 * _b * _c * Math.cos(_A_Rad));

                        const _C_Rad: number = Math.asin(_c * Math.sin(_A_Rad) / _a);

                        const _mesh: THREE.Mesh = _meshes[_currentMatedPositionedCylinder.Guid + '_CRANKTHROW_CONNECTION'];

                        (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
                        (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

                        _mesh.position.set(0, 0, 0);
                        _mesh.rotation.set(0, 0, 0);

                        _mesh.translateX(Math.sin(-_previousCrankThrowRotation_Rad) * _previousMatedPositionedCylinder.CrankThrow.CrankRotationRadius_mm);
                        _mesh.translateY(Math.cos(-_previousCrankThrowRotation_Rad) * _previousMatedPositionedCylinder.CrankThrow.CrankRotationRadius_mm);

                        _mesh.rotateZ(_previousCrankThrowRotation_Rad + Conversions.HalfPiRad + _C_Rad);

                        _mesh.translateX(-_a / 2);
                        _mesh.translateZ((-_currentMatedPositionedCylinder.Offset_mm + (_currentMatedPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2)));
                        // 'povezava med matanimi cilindri'
                    }
                }
            }
        }
        // 'mated cylinders'
        // 'narišemo ročice in morebitne povezave med njimi'

        // 'narišemo gred'
        const _firstPositionedCylinder: PositionedCylinder = _engine.GetFirstPositionedCylinder();
        let _lastPositionedCylinder: PositionedCylinder = _engine.GetLastPositionedCylinder();
        if ((Utilities.Exists(_lastPositionedCylinder) === false)
            && (_engine.PositionedCylinders.length === 1)) {
            _lastPositionedCylinder = _firstPositionedCylinder;
        }
        const _crankshaftRadius_mm: number = Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2;
        const _crankshaftRotation_Rad: number = -Conversions.DegToRad(_crankshaftRotation_deg);

        // 'podaljšek gredi blizu'
        if (Utilities.Exists(_firstPositionedCylinder) === true) {
            const _shaftExtensionLength: number = ((_firstPositionedCylinder.Bore_mm / 2) - (_firstPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2));

            const _mesh: THREE.Mesh = _meshes[_engine.Guid + '_CRANSHAFT_NEAR'];

            (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
            (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

            _mesh.rotation.set(0, 0, 0);

            _mesh.rotateX(Conversions.HalfPiRad);
            _mesh.rotateY(_crankshaftRotation_Rad);
        }
        // 'podaljšek gredi blizu'

        // 'podaljšek gredi daleč'
        if (Utilities.Exists(_lastPositionedCylinder) === true) {
            const _shaftExtensionLength: number = ((_lastPositionedCylinder.Bore_mm / 2) - (_lastPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2));

            const _mesh: THREE.Mesh = _meshes[_engine.Guid + '_CRANSHAFT_FAR'];

            (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
            (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

            _mesh.rotation.set(0, 0, 0);

            _mesh.rotateX(Conversions.HalfPiRad);
            _mesh.rotateY(_crankshaftRotation_Rad);
        }
        // 'podaljšek gredi daleč'

        // 'med ročicami'
        let _currentPositionedCylinder: PositionedCylinder = _firstPositionedCylinder;
        let _nextPositionedCylinder: PositionedCylinder = _engine.GetNextPositionedCylinder(_currentPositionedCylinder);

        let _crankshaftIndex: number = 0;
        while (Utilities.Exists(_nextPositionedCylinder) === true) {
            const _currentBigEndPinWidthHalf_mm: number = (_currentPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2);
            const _nextBigEndPinWidthHalf_mm: number = (_nextPositionedCylinder.CrankThrow.CrankPinWidth_mm / 2);
            const _shaftFragmentStart: number = (_currentPositionedCylinder.Offset_mm + _currentBigEndPinWidthHalf_mm);
            const _shaftFragmentEnd: number = (_nextPositionedCylinder.Offset_mm - _nextBigEndPinWidthHalf_mm);
            const _shaftFragmentLength_mm: number = _shaftFragmentEnd - _shaftFragmentStart;

            if (_shaftFragmentLength_mm > 0) {
                const _shaftFragmentPosition: number = (_currentPositionedCylinder.Offset_mm + _currentBigEndPinWidthHalf_mm + (_shaftFragmentLength_mm / 2));

                const _mesh: THREE.Mesh = _meshes[_engine.Guid + '_CRANSHAFT_BETWEEN_' + _crankshaftIndex.toString()];

                (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
                (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

                _mesh.rotation.set(0, 0, 0);

                _mesh.rotateX(Conversions.HalfPiRad);
                _mesh.rotateY(_crankshaftRotation_Rad);

            }
            _currentPositionedCylinder = _nextPositionedCylinder;
            _nextPositionedCylinder = _engine.GetNextPositionedCylinder(_currentPositionedCylinder);

            _crankshaftIndex++;
        }
        // 'med ročicami'
        // 'narišemo gred'
    }
    private UpdateCrankThrow(_meshes: {}, _positionedCylinder: PositionedCylinder, _color: number, _solid: boolean, _crankshaftRotation_deg: number, _nearHalf: boolean, _farHalf: boolean): void {
        let _mesh: THREE.Mesh;
        const _crankThrowRotation_Rad: number = -Conversions.DegToRad(_positionedCylinder.GetAbsoluteCrankThrowRotation_deg(_crankshaftRotation_deg));


        // 'narišemo big pin'
        _mesh = _meshes[_positionedCylinder.CrankThrow.Guid];

        (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
        (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

        _mesh.position.set(0, 0, 0);
        _mesh.rotation.set(0, 0, 0);

        _mesh.translateZ(-_positionedCylinder.Offset_mm); // cilindri grejo v globino

        _mesh.rotateX(Conversions.HalfPiRad);
        _mesh.rotateY(_crankThrowRotation_Rad + Conversions.HalfPiRad);

        _mesh.translateX(_positionedCylinder.CrankThrow.CrankRotationRadius_mm);
        // 'narišemo big pin'

        // 'narišemo ročice in protiuteži'
        const _crankThrowCenterOfRotation_mm: number = -((_positionedCylinder.CrankThrow.CrankRotationRadius_mm / 2) - _positionedCylinder.CrankThrow.CrankRotationRadius_mm);
        const _conRodBigEndPinWidthHalf_mm: number = (_positionedCylinder.CrankThrow.CrankPinWidth_mm / 2);
        const _balancerThrowCenterOfRotation_mm: number = -((_positionedCylinder.CrankThrow.BalancerRotationRadius_mm / 2) - _positionedCylinder.CrankThrow.BalancerRotationRadius_mm);
        const _balancerRotation_Rad: number = -Conversions.DegToRad(_positionedCylinder.GetAbsoluteCrankThrowRotation_deg(_crankshaftRotation_deg + _positionedCylinder.CrankThrow.BalancerAngle_deg));

        if (_nearHalf === true) {
            const _crankThrowNear_mm: number = (_positionedCylinder.Offset_mm - _conRodBigEndPinWidthHalf_mm);

            // 'ročica blizu'
            _mesh = _meshes[_positionedCylinder.CrankThrow.Guid + '_NEAR'];

            (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
            (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

            _mesh.position.set(0, 0, 0);
            _mesh.rotation.set(0, 0, 0);

            _mesh.rotateZ(_crankThrowRotation_Rad);

            _mesh.translateY(_crankThrowCenterOfRotation_mm);
            _mesh.translateZ(-_crankThrowNear_mm);
            // 'ročica blizu'

            if ((_positionedCylinder.CrankThrow.BalancerMass_g > 0)
                && (_positionedCylinder.CrankThrow.BalancerRotationRadius_mm > 0)) {
                // 'ročica uteži blizu'
                _mesh = _meshes[_positionedCylinder.CrankThrow.Guid + '_BALANCER_THROW_NEAR'];

                (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
                (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

                _mesh.position.set(0, 0, 0);
                _mesh.rotation.set(0, 0, 0);

                _mesh.rotateZ(_balancerRotation_Rad);

                _mesh.translateY(_balancerThrowCenterOfRotation_mm);
                _mesh.translateZ(-_crankThrowNear_mm);
                // 'ročica uteži blizu'

                // 'utež blizu'
                _mesh = _meshes[_positionedCylinder.CrankThrow.Guid + '_BALANCER_NEAR'];

                (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
                (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

                _mesh.position.set(0, 0, 0);
                _mesh.rotation.set(0, 0, 0);

                _mesh.translateZ(-_crankThrowNear_mm);

                _mesh.rotateX(Conversions.HalfPiRad);
                _mesh.rotateY(_balancerRotation_Rad + Conversions.HalfPiRad);

                _mesh.translateX(_positionedCylinder.CrankThrow.BalancerRotationRadius_mm);
                // 'utež blizu'
            }
        }

        if (_farHalf === true) {
            const _crankThrowFar_mm: number = (_positionedCylinder.Offset_mm + _conRodBigEndPinWidthHalf_mm);

            // 'ročica daleč'
            _mesh = _meshes[_positionedCylinder.CrankThrow.Guid + '_FAR'];

            (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
            (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

            _mesh.position.set(0, 0, 0);
            _mesh.rotation.set(0, 0, 0);

            _mesh.rotateZ(_crankThrowRotation_Rad);

            _mesh.translateY(_crankThrowCenterOfRotation_mm);
            _mesh.translateZ(-_crankThrowFar_mm);
            // 'ročica daleč'

            if ((_positionedCylinder.CrankThrow.BalancerMass_g > 0)
                && (_positionedCylinder.CrankThrow.BalancerRotationRadius_mm > 0)) {
                // 'ročica uteži daleč'
                _mesh = _meshes[_positionedCylinder.CrankThrow.Guid + '_BALANCER_THROW_FAR'];

                (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
                (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

                _mesh.position.set(0, 0, 0);
                _mesh.rotation.set(0, 0, 0);

                _mesh.rotateZ(_balancerRotation_Rad);

                _mesh.translateY(_balancerThrowCenterOfRotation_mm);
                _mesh.translateZ(-_crankThrowFar_mm);
                // 'ročica uteži daleč'

                // 'utež daleč'
                _mesh = _meshes[_positionedCylinder.CrankThrow.Guid + '_BALANCER_FAR'];

                (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
                (<THREE.MeshBasicMaterial>_mesh.material).wireframe = !_solid;

                _mesh.position.set(0, 0, 0);
                _mesh.rotation.set(0, 0, 0);

                _mesh.translateZ(-_crankThrowFar_mm);

                _mesh.rotateX(Conversions.HalfPiRad);
                _mesh.rotateY(_balancerRotation_Rad + Conversions.HalfPiRad);

                _mesh.translateX(_positionedCylinder.CrankThrow.BalancerRotationRadius_mm);
                // 'utež daleč'
            }
        }
        // 'narišemo ročice in protiuteži'
    }

    private GetColor(_baseColor: number, ..._iParts: Array<IPart>): number {
        let _color: number = _baseColor;

        if (Utilities.Exists(this.selectedParts) === true) {
            for (const _iPart of _iParts) {
                if (this.selectedParts.some(function (_iPartTmp: IPart) {
                    if (_iPartTmp.Equals(_iPart)) {
                        return true;
                    } else {
                        return false;
                    }
                })) {
                    _color = this.selectedIPartColor;
                }
            }
        }

        return _color;
    }

}
