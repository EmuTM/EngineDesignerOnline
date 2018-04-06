import { IComparable } from './IComparable';
import { IPart } from './IPart';
import { Utilities } from '../common/Utilities';
import { Settings } from '../common/Settings';

// Represents a flywheel unit for the engine.
export class Flywheel implements IPart, IComparable {
    constructor(diameter_mm: number = Flywheel.DefaultFlywheel.diameter_mm, mass_g: number = Flywheel.DefaultFlywheel.mass_g) {
        this.diameter_mm = diameter_mm;
        this.mass_g = mass_g;

        this.Validate();
    }
    // IComparable Members
    private guid: string = Utilities.NewGuid();
    public get Guid(): string {
        return this.guid;
    }

    public Equals(flywheel: Flywheel): boolean {
        if (this.guid === flywheel.guid) {
            return true;
        } else {
            return false;
        }
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
            return Math.abs(maxLength);
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
        return -(this.diameter_mm / 2);
    }
    public get Bound_Y_Min(): number {
        return -(this.diameter_mm / 2);
    }
    public get Bound_Z_Min(): number {
        return -((this.diameter_mm / Settings.FlywheelDiameterVsFlywheelWidth) / 2);
    }
    public get Bound_X_Max(): number {
        return (this.diameter_mm / 2);
    }
    public get Bound_Y_Max(): number {
        return (this.diameter_mm / 2);
    }
    public get Bound_Z_Max(): number {
        return ((this.diameter_mm / Settings.FlywheelDiameterVsFlywheelWidth) / 2);
    }

    public Validate() {
        if (this.diameter_mm < 0) {
            throw new Error('this.diameter_mm < 0');
        }
        if (this.mass_g < 0) {
            throw new Error('this.mass_g < 0');
        }

        // this.OnValidated();
    }
    // IPart Members



    // 'System-defined flywheels'
    public static get DefaultFlywheel(): Flywheel {
        return new Flywheel(
            Settings.DefaultFlywheelDiameter_mm,
            Settings.DefaultFlywheelMass_g);
    }
    // 'System-defined flywheels'



    private diameter_mm: number;
    private mass_g: number;



    // 'Public properties'
    // Defines the flywheel's diameter, in milimeters.
    public get Diameter_mm(): number {
        return this.diameter_mm;
    }
    public set Diameter_mm(value: number) {
        this.diameter_mm = value;
        this.Validate();
    }

    // Defines the total mass of the flywheel, in grams.
    public get Mass_g(): number {
        return this.mass_g;
    }
    public set Mass_g(value: number) {
        this.mass_g = value;
        this.Validate();
    }
    // 'Public properties'

}
