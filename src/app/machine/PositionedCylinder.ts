import { IComparable } from './IComparable';
import { IPart } from './IPart';
import { Cylinder } from './Cylinder';
import { Mathematics } from '../common/Mathematics';
import { Stroke } from './Stroke';
import { Settings } from '../common/Settings';
import { Conversions } from '../common/Conversions';

// Represents a cylinder unit positioned within the engine.
export class PositionedCylinder extends Cylinder implements IComparable, IPart {
    constructor(cylinder: Cylinder = PositionedCylinder.DefaultPositionedCylinder, position: number = PositionedCylinder.DefaultPositionedCylinder.position, offset_mm: number = PositionedCylinder.DefaultPositionedCylinder.offset_mm, tilt_deg: number = PositionedCylinder.DefaultPositionedCylinder.tilt_deg, firingAngle_deg: number = PositionedCylinder.DefaultPositionedCylinder.firingAngle_deg) {
        super(cylinder.Cycle, cylinder.Piston, cylinder.ConnectingRod, cylinder.CrankThrow);

        this.position = position;
        this.tilt_deg = Mathematics.GetAbsoluteAngle_deg(tilt_deg);
        this.offset_mm = offset_mm;
        this.firingAngle_deg = firingAngle_deg;

        this.Validate();
    }
    public toString(): string {
        let str: string = '';

        if (this.position) {
            str += this.position.toString();
        }

        if (this.firingAngle_deg) {
            str += ' (firing @ ' + this.firingAngle_deg.toFixed(2);
        }

        if (this.Cycle) {
            str += '; ' + this.Cycle.CycleId;
        }

        return str;
    }
    // IComparable Members
    public Equals(positionedCylinder: PositionedCylinder): boolean {
        return super.Equals(positionedCylinder);
    }
    // IComparable Members
    // IPart Members
    public get Length(): number {
        const minLength: number = this.Bound_Z_Min;
        // najmanjsa dolzina (ce je negativna, se uposteva)
        const maxLength: number = this.Bound_Z_Max;
        // najvecja dolzina
        if ((minLength < 0)) {
            return Math.abs((maxLength + Math.abs(minLength)));
        } else {
            // NOTE: to je po novem, vendar ne vem, ce je uredu za vse IParte, ma ocitno samo za tega, ker ostali vsi zacnejo z 0 ali pa v negativi
            return (Math.abs(maxLength) - Math.abs(minLength));
        }

    }
    public get Width(): number {
        const minWidth: number = this.Bound_X_Min;
        // najmanjsa sirina (ce je negativno, potem je to sirina 'v levo' in se uposteva)
        const maxWidth: number = this.Bound_X_Max;
        // najvecja sirina (sirina 'v desno')
        if ((minWidth < 0)) {
            return Math.abs((maxWidth + Math.abs(minWidth)));
        } else {
            return Math.abs(maxWidth);
        }

    }
    public get Height(): number {
        const minHeight: number = this.Bound_Y_Min;
        // najmanjsa visina (ce je negativno, potem je to najvecja globina in se uposteva)
        const maxHeight: number = this.Bound_Y_Max;
        // najvecja visina
        if ((minHeight < 0)) {
            return Math.abs((maxHeight + Math.abs(minHeight)));
        } else {
            return Math.abs(maxHeight);
        }

    }

    public get Bound_X_Min(): number {
        let minX: number = 0;
        // vec kot 0, ne more bit, ker motor zacne v centru, torej 0
        const tilt_rad: number = Conversions.DegToRad(this.tilt_deg);
        let cylinderX: number = (Math.sin(tilt_rad) * this.GetPhysicalHeightAbovePiston_mm(0));
        if ((cylinderX <= 0)) {
            // koliko vrtina pripomore k sirini
            cylinderX = (cylinderX - Math.abs((Math.cos(tilt_rad)
                * (this.Bore_mm / 2))));
        }

        // ce je double od cilindra pozitiven ali pa ni 'dovolj negativen', potem rocica vpliva na sirino motojra
        if (((cylinderX > 0)
            || (Math.abs(cylinderX) < this.CrankThrow.CrankRotationRadius_mm))) {
            cylinderX = (this.CrankThrow.CrankRotationRadius_mm * -1);
        }

        if ((cylinderX < minX)) {
            minX = cylinderX;
        }

        return minX;
    }
    public get Bound_Y_Min(): number {
        let minY: number = 0;
        // vec kot 0, ne more bit, ker motor zacne v centru, torej 0
        // pozicija cilindra
        const tilt_rad: number = Conversions.DegToRad(this.tilt_deg);
        let cylinderY: number = (Math.cos(tilt_rad) * this.GetPhysicalHeightAbovePiston_mm(0));
        if ((cylinderY <= 0)) {
            // koliko vrtina pripomore k visini
            cylinderY = (cylinderY - Math.abs((Math.sin(tilt_rad)
                * (this.Bore_mm / 2))));
        }

        // ce je y od cilindra pozitiven ali pa ni 'dovolj negativen', potem rocica vpliva na visino motojra
        if (((cylinderY > 0)
            || (Math.abs(cylinderY) < this.CrankThrow.CrankRotationRadius_mm))) {
            cylinderY = (this.CrankThrow.CrankRotationRadius_mm * -1);
        }

        if ((cylinderY < minY)) {
            minY = cylinderY;
        }

        return minY;
    }
    public get Bound_Z_Min(): number {
        let minZ: number = Number.POSITIVE_INFINITY;
        const totalMinZ: number = (this.Offset_mm
            - (this.Bore_mm / 2));
        if ((totalMinZ < minZ)) {
            minZ = totalMinZ;
        }

        return minZ;
    }
    public get Bound_X_Max(): number {
        let maxX: number = 0;
        // manj kot 0, ne more bit, ker motor zacne v centru, torej 0
        const tilt_rad: number = Conversions.DegToRad(this.tilt_deg);
        let cylinderX: number = (Math.sin(tilt_rad) * this.GetPhysicalHeightAbovePiston_mm(0));
        if ((cylinderX >= 0)) {
            // koliko vrtina pripomore k sirini
            cylinderX = (cylinderX + Math.abs((Math.cos(tilt_rad)
                * (this.Bore_mm / 2))));
        }

        // ce je y od cilindra negativen ali pa ni 'dovolj pozitiven', potem rocica vpliva na sirino motojra
        if (((cylinderX < 0)
            || (Math.abs(cylinderX) < this.CrankThrow.CrankRotationRadius_mm))) {
            cylinderX = this.CrankThrow.CrankRotationRadius_mm;
        }

        if ((cylinderX > maxX)) {
            maxX = cylinderX;
        }

        return maxX;
    }
    public get Bound_Y_Max(): number {
        let maxY: number = 0;
        // manj kot 0, ne more bit, ker motor zacne v centru, torej 0
        const tilt_rad: number = Conversions.DegToRad(this.tilt_deg);
        let cylinderY: number = (Math.cos(tilt_rad) * this.GetPhysicalHeightAbovePiston_mm(0));
        if ((cylinderY >= 0)) {
            // koliko vrtina pripomore k visini
            cylinderY = (cylinderY + Math.abs((Math.sin(tilt_rad)
                * (this.Bore_mm / 2))));
        }

        // ce je y od cilindra negativen ali pa ni 'dovolj pozitiven', potem rocica vpliva na visino motojra
        if (((cylinderY < 0)
            || (Math.abs(cylinderY) < this.CrankThrow.CrankRotationRadius_mm))) {
            cylinderY = this.CrankThrow.CrankRotationRadius_mm;
        }

        if ((cylinderY > maxY)) {
            maxY = cylinderY;
        }

        return maxY;
    }
    public get Bound_Z_Max(): number {
        let maxZ: number = Number.NEGATIVE_INFINITY;
        const totalMaxZ: number = (this.Offset_mm
            + (this.Bore_mm / 2));
        if ((totalMaxZ > maxZ)) {
            maxZ = totalMaxZ;
        }

        return maxZ;
    }

    public Validate() {
        super.Validate();


        if (this.position < 1) {
            throw new Error('this.position < 1');
        } else if (this.offset_mm < 0) {
            throw new Error('this.offset_mm < 0');
        } else if (this.tilt_deg < -180 || this.tilt_deg > 180) {
            throw new Error('this.tilt_deg < -180 || this.tilt_deg > 180');
        }
        // else if (this.firingAngle_deg < 0 || this.firingAngle_deg > this.Cycle.Duration_deg) {
        //     throw new Error('this.firingAngle_deg < 0 || this.firingAngle_deg > this.Cycle.Duration_deg');
        // }
    }
    // IPart Members



    // 'System-defined cylinders'
    private static get DefaultPositionedCylinder(): PositionedCylinder {
        return new PositionedCylinder(
            new Cylinder(),
            Settings.PositionedCylinderDefaultPosition,
            Settings.PositionedCylinderDefaultOffset_mm,
            Settings.PositionedCylinderDefaultTilt_deg,
            Settings.PositionedCylinderDefaultFiringAngle_deg);
    }
    // 'System-defined cylinders'



    private position: number;
    private tilt_deg: number;
    private offset_mm: number;
    private firingAngle_deg: number;



    // 'Public properties'
    public get Position(): number {
        return this.position;
    }
    public set Position(value: number) {
        this.position = value;
        this.Validate();
    }

    // Defines the cylinder's tilt angle within the engine (measured from engine's vertical line, clockwise), in degrees.
    public get Tilt_deg(): number {
        return this.tilt_deg;
    }
    public set Tilt_deg(value: number) {
        this.tilt_deg = value;
        this.Validate();
    }

    // Defines the cylinder's center physical position within the engine (measured from engine's front plane), in millimeters.
    public get Offset_mm(): number {
        return this.offset_mm;
    }
    public set Offset_mm(value: number) {
        this.offset_mm = value;
        this.Validate();
    }

    // Defines the cylinder's firing angle within the engine, in (crankshaft!) degrees.
    public get FiringAngle_deg(): number {
        return this.firingAngle_deg;
    }
    public set FiringAngle_deg(value: number) {
        this.firingAngle_deg = value;
        this.Validate();
    }
    // 'Public properties'



    // 'Kinematika'
    public GetCylinderRelativeCrankThrowRotation_deg(crankshaftRotation_deg: number): number {
        if (isNaN(this.Cycle.DefaultFiringAngle_deg) === false) {
            return ((crankshaftRotation_deg - this.firingAngle_deg)
                + this.Cycle.DefaultFiringAngle_deg);
            // default kot vziga za cikel
        } else {
            return (crankshaftRotation_deg - this.firingAngle_deg);
        }

    }
    public GetCylinderRelativeCrankshaftRotation_deg(cylinderRelativeCrankThrowRotation_deg: number): number {
        if (isNaN(this.Cycle.DefaultFiringAngle_deg) === false) {
            return (cylinderRelativeCrankThrowRotation_deg
                + (this.firingAngle_deg - this.Cycle.DefaultFiringAngle_deg));
            // default kot vziga za cikel
        } else {
            return (cylinderRelativeCrankThrowRotation_deg + this.firingAngle_deg);
        }

    }
    // vrne absolutni kot rocice
    public GetAbsoluteCrankThrowRotation_deg(crankshaftRotation_deg: number): number {
        if (isNaN(this.Cycle.DefaultFiringAngle_deg) === false) {
            return ((crankshaftRotation_deg - this.firingAngle_deg)
                + (this.tilt_deg + this.Cycle.DefaultFiringAngle_deg));
            // default kot vziga za cikel
        } else {
            return ((crankshaftRotation_deg - this.firingAngle_deg)
                + this.tilt_deg);
        }

    }
    public GetAbsoluteCrankshaftRotation_deg(absoluteCrankThrowRotation_deg: number): number {
        if (isNaN(this.Cycle.DefaultFiringAngle_deg) === false) {
            return (absoluteCrankThrowRotation_deg
                + (this.firingAngle_deg
                    - (this.tilt_deg - this.Cycle.DefaultFiringAngle_deg)));
            // default kot vziga za cikel
        } else {
            return (absoluteCrankThrowRotation_deg
                + (this.firingAngle_deg - this.tilt_deg));
        }

    }
    public GetStroke(crankshaftRotation_deg: number): Stroke {
        if (this.Cycle.RevolutionsToCompleteCycle > 0) {
            return super.GetStroke(Mathematics.GetAbsoluteAngle_deg(this.GetCylinderRelativeCrankThrowRotation_deg(crankshaftRotation_deg), this.Cycle.RevolutionsToCompleteCycle, true));
        } else {
            return Stroke.NaN;
        }

    }
    // TODO: to bo moralo ratat virtual v Cylinder
    public GetElapsedStroke(stroke: Stroke, crankshaftRotation_deg: number): number {
        if ((this.Cycle.RevolutionsToCompleteCycle > 0)) {
            // izracunamo koliko takta je ze preteklo
            return Mathematics.GetAbsoluteAngle_deg((this.GetCylinderRelativeCrankThrowRotation_deg(crankshaftRotation_deg) - stroke.Begin_deg), this.Cycle.RevolutionsToCompleteCycle, true);
        } else {
            return Number.NaN;
        }

    }
    // 'Kinematika'



    public IsMatedWith(positionedCylinder: PositionedCylinder): boolean {
        if ((positionedCylinder.offset_mm === this.offset_mm)) {
            return true;
        } else if ((positionedCylinder.offset_mm > this.offset_mm)) {
            // ce je njegov offset najvec ta offset + ta pin width
            if ((positionedCylinder.Offset_mm
                <= (this.offset_mm + this.CrankThrow.CrankPinWidth_mm))) {
                return true;
            }

        } else {
            // ce je njegov offset najvec ta offset - ta pin width
            if ((positionedCylinder.Offset_mm
                >= (this.offset_mm - this.CrankThrow.CrankPinWidth_mm))) {
                return true;
            }

        }

        return false;
    }

}
