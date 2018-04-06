import { IPart } from '../machine/IPart';
import { Defaults } from '../common/Defaults';
import { Utilities } from '../common/Utilities';
import * as THREE from 'three';

export class IPartSketch {
    private scene: THREE.Scene = null;
    public get Scene(): THREE.Scene {
        return this.scene;
    }


    constructor(_scene: THREE.Scene) {
        this.scene = _scene;
    }


    private meshes: {} = {};
    public get Meshes(): {} {
        return this.meshes;
    }
    public set Meshes(value: {}) {
        this.meshes = value;
    }

    private iPart: IPart = null;
    public get IPart(): IPart {
        return this.iPart;
    }
    public set IPart(value: IPart) {
        this.SetIPart(value);
    }
    protected SetIPart(value: IPart) {
        // počistimo sceno
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        this.meshes = {};

        // naložimo novo sceno
        if (Defaults.ShowAxesHelper) {
            this.scene.add(new THREE.AxesHelper(Defaults.FarPlane - Defaults.NearPlane));
        }

        // potem naložimo nov ipart
        this.iPart = value;

        this.CreateBoundingBox(this.scene, this.meshes, this.iPart);
    }

    private showBoundingBox: boolean = true;
    public get ShowBoundingBox(): boolean {
        return this.showBoundingBox;
    }
    public set ShowBoundingBox(value: boolean) {
        this.showBoundingBox = value;
    }

    private boundingBoxColor: number = Defaults.BlackColor;
    public get BoundingBoxColor(): number {
        return this.boundingBoxColor;
    }
    public set BoundingBoxColor(value: number) {
        this.boundingBoxColor = value;
    }



    public ClearScene(): void {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }

        this.meshes = {};
    }
    public Render(): void {
        if (Utilities.Exists(this.iPart) === true) {
            this.UpdateBoundingBox(this.meshes, this.iPart, this.boundingBoxColor, this.showBoundingBox);
        }
    }



    private CreateBoundingBox(_scene: THREE.Scene, _meshes: {}, _iPart: IPart): void {
        const _mesh: THREE.Mesh = new THREE.Mesh(
            new THREE.BoxGeometry(
                this.iPart.Width,
                this.iPart.Height,
                this.iPart.Length),
            this.GetMaterial());

        _scene.add(_mesh);
        _meshes[_iPart.Guid + '_BOUNDING_BOX'] = _mesh;
    }
    private UpdateBoundingBox(_meshes: {}, _iPart: IPart, _color: number, _visible: boolean): void {
        const _mesh: THREE.Mesh = _meshes[_iPart.Guid + '_BOUNDING_BOX'];

        (<THREE.MeshBasicMaterial>_mesh.material).color = new THREE.Color(_color);
        (<THREE.MeshBasicMaterial>_mesh.material).wireframe = true;

        _mesh.visible = _visible;

        _mesh.position.set(
            (this.iPart.Width / 2) + this.iPart.Bound_X_Min,
            (this.iPart.Height / 2) + this.iPart.Bound_Y_Min,
            (-this.iPart.Length / 2) - this.iPart.Bound_Z_Min);
    }



    protected GetMaterial(_color?: number, _solid?: boolean): THREE.MeshBasicMaterial {
        _color = Utilities.ForceValue(_color, 0);
        _solid = Utilities.ForceValue(_solid, false);

        const _material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
        _material.color = new THREE.Color(_color);
        _material.wireframe = !_solid;

        return _material;
    }

}
