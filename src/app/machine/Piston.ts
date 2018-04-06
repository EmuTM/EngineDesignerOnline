import { IComparable } from './IComparable';
import { IPart } from './IPart';
import { Utilities } from '../common/Utilities';
import { Settings } from '../common/Settings';

export class Piston implements IComparable, IPart {
    constructor(diameter_mm: number = Piston.DefaultPiston.diameter_mm, mass_g: number = Piston.DefaultPiston.mass_g, skirtLength_mm: number = Piston.DefaultPiston.skirtLength_mm, gudgeonPinDistanceFromTop_mm: number = Piston.DefaultPiston.gudgeonPinDistanceFromTop_mm) {
        this.diameter_mm = diameter_mm;
        this.mass_g = mass_g;
        this.skirtLength_mm = skirtLength_mm;
        this.gudgeonPinDistanceFromTop_mm = gudgeonPinDistanceFromTop_mm;

        this.Validate();
    }
    // IComparable Members
    private guid: string = Utilities.NewGuid();
    public get Guid(): string {
        return this.guid;
    }

    public Equals(piston: Piston): boolean {
        if (this.guid === piston.guid) {
            return true;
        } else {
            return false;
        }
    }
    // IComparable Members
    // IPart Members
    public get Length(): number {
        const minLength: number = this.Bound_Z_Min; // najmanjša dolžina (če je negativna, se upošteva)
        const maxLength: number = this.Bound_Z_Max; // največja dolžina

        if (minLength < 0) {
            return Math.abs(maxLength + Math.abs(minLength));
        } else {
            return Math.abs(maxLength);
        }
    }
    public get Width(): number {
        const minWidth: number = this.Bound_X_Min; // najmanjša širina (če je negativno, potem je to širina 'v levo' in se upošteva)
        const maxWidth: number = this.Bound_X_Max; // največja širina (širina 'v desno')

        if (minWidth < 0) {
            return Math.abs(maxWidth + Math.abs(minWidth));
        } else {
            return Math.abs(maxWidth);
        }
    }
    public get Height(): number {
        const minHeight: number = this.Bound_Y_Min; // najmanjša višina (če je negativno, potem je to največja globina in se upošteva)
        const maxHeight: number = this.Bound_Y_Max; // največja višina

        if (minHeight < 0) {
            return Math.abs(maxHeight + Math.abs(minHeight));
        } else {
            return Math.abs(maxHeight);
        }
    }

    public get Bound_X_Min(): number {
        return -(this.diameter_mm / 2);
    }
    public get Bound_Y_Min(): number {
        return -(this.skirtLength_mm / 2);
    }
    public get Bound_Z_Min(): number {
        return -(this.diameter_mm / 2);
    }
    public get Bound_X_Max(): number {
        return (this.diameter_mm / 2);
    }
    public get Bound_Y_Max(): number {
        return (this.skirtLength_mm / 2);
    }
    public get Bound_Z_Max(): number {
        return (this.diameter_mm / 2);
    }

    public Validate(): void {
        if (this.diameter_mm < 0) {
            throw new Error('this.diameter_mm < 0');
        }
        if (this.mass_g < 0) {
            throw new Error('this.mass_g < 0');
        }
        if (this.skirtLength_mm < 0) {
            throw new Error('this.skirtLength_mm < 0');
        }
        if (this.gudgeonPinDistanceFromTop_mm < 0) {
            throw new Error('this.gudgeonPinDistanceFromTop_mm < 0');
        }
        if (this.gudgeonPinDistanceFromTop_mm > this.skirtLength_mm) {
            throw new Error('this.gudgeonPinDistanceFromTop_mm > this.skirtLength_mm');
        }


        // this.OnValidated();
    }
    // IPart Members



    // 'System-defined pistons'
    // Gets the default piston (for UI integration).
    private static get DefaultPiston(): Piston {
        const skirtLength_mm: number = Settings.DefaultPistonDiameter_mm
            * Settings.PistonSkirtLengthVsCylinderBore;
        const gudgeonPinDistanceFromTop_mm: number = skirtLength_mm
            * Settings.GudgeonPinDistanceFromTopVsPistonSkirtLength;

        return new Piston(
            Settings.DefaultPistonDiameter_mm,
            Settings.DefaultPistonMass_g,
            skirtLength_mm,
            gudgeonPinDistanceFromTop_mm);
    }

    // Gets a simple piston based on given parameters.
    public static FromParameters(diameter_mm: number, mass_g: number): Piston {
        const skirtLength_mm: number = diameter_mm * Settings.PistonSkirtLengthVsCylinderBore;
        const gudgeonPinDistanceFromTop_mm: number = skirtLength_mm * Settings.GudgeonPinDistanceFromTopVsPistonSkirtLength;

        return new Piston(
            diameter_mm,
            mass_g,
            skirtLength_mm,
            gudgeonPinDistanceFromTop_mm);
    }
    // 'System-defined pistons'



    private diameter_mm: number;
    private mass_g: number;
    private skirtLength_mm: number;
    private gudgeonPinDistanceFromTop_mm: number;



    // 'Public properties'
    // Defines the piston's diameter (resulting in cylinder's bore), in millimeters.
    public get Diameter_mm(): number {
        return this.diameter_mm;
    }
    public set Diameter_mm(value: number) {
        this.diameter_mm = value;
        this.Validate();
    }

    // Defines the total mass of the piston (accessories included), in grams.
    public get Mass_g(): number {
        return this.mass_g;
    }
    public set Mass_g(value: number) {
        this.mass_g = value;
        this.Validate();
    }

    // Defines the total (max  measurable) length of the piston's skirt (from topmost point to lowest point), in millimeters.
    public get SkirtLength_mm(): number {
        return this.skirtLength_mm;
    }
    public set SkirtLength_mm(value: number) {
        this.skirtLength_mm = value;
        this.Validate();
    }

    // Defines the distance of the center of the gudgeon pin from the topmost point of the piston, in millimeters.
    public get GudgeonPinDistanceFromTop_mm(): number {
        return this.gudgeonPinDistanceFromTop_mm;
    }
    public set GudgeonPinDistanceFromTop_mm(value: number) {
        this.gudgeonPinDistanceFromTop_mm = value;
        this.Validate();
    }


    // Indicates the piston's area, in square millimeters.
    public get Area_mm2(): number {
        const r2: number = Math.pow((this.diameter_mm / 2), 2);
        return Math.PI * r2;
    }
    // 'Public properties'

}
