import { IComparable } from './IComparable';
import { IPart } from './IPart';
import { Utilities } from '../common/Utilities';
import { Settings } from '../common/Settings';
import { Conversions } from '../common/Conversions';

// Represents a crank throw new Error unit for the cylinder.
export class CrankThrow implements IComparable, IPart {
    constructor(crankRotationRadius_mm: number = CrankThrow.DefaultCrankThrow.crankRotationRadius_mm, balancerMass_g: number = CrankThrow.DefaultCrankThrow.balancerMass_g, balancerRotationRadius_mm: number = CrankThrow.DefaultCrankThrow.balancerRotationRadius_mm, balancerAngle_deg: number = CrankThrow.DefaultCrankThrow.balancerAngle_deg, crankPinWidth_mm: number = CrankThrow.DefaultCrankThrow.CrankPinWidth_mm) {
        this.crankRotationRadius_mm = crankRotationRadius_mm;
        this.balancerMass_g = balancerMass_g;
        this.balancerRotationRadius_mm = balancerRotationRadius_mm;
        this.balancerAngle_deg = balancerAngle_deg;
        this.crankPinWidth_mm = crankPinWidth_mm;

        this.Validate();
    }
    // IComparable Members
    private guid: string = Utilities.NewGuid();
    public get Guid(): string {
        return this.guid;
    }

    public Equals(crankThrow: CrankThrow): boolean {
        if (this.guid === crankThrow.guid) {
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
        if ((this.balancerMass_g > 0)
            && (this.balancerRotationRadius_mm > 0)) {
            if (Settings.ConRodBigEndPinAndCrankshaftDiameter_mm >= Settings.CrankBalancerDiameter_mm) {
                return -(Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2);
            } else {
                return -(Settings.CrankBalancerDiameter_mm / 2);
            }
        } else {
            return -(Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2);
        }
    }
    public get Bound_Y_Min(): number {
        let double: number = 0;

        if ((this.balancerMass_g > 0)
            && (this.balancerRotationRadius_mm > 0)) {
            double +=
                (Math.cos(Conversions.DegToRad(this.balancerAngle_deg)) * this.balancerRotationRadius_mm)
                - (Settings.CrankBalancerDiameter_mm / 2);
        }

        return double;
    }
    public get Bound_Z_Min(): number {
        if ((this.balancerMass_g > 0)
            && (this.balancerRotationRadius_mm > 0)) {
            return -((this.crankPinWidth_mm / 2)
                + Settings.CrankBalancerWidth_mm);
        } else {
            return -(this.crankPinWidth_mm / 2);
        }
    }
    public get Bound_X_Max(): number {
        if ((this.balancerMass_g > 0)
            && (this.balancerRotationRadius_mm > 0)) {
            if (Settings.ConRodBigEndPinAndCrankshaftDiameter_mm >= Settings.CrankBalancerDiameter_mm) {
                return (Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2);
            } else {
                return (Settings.CrankBalancerDiameter_mm / 2);
            }
        } else {
            return (Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2);
        }
    }
    public get Bound_Y_Max(): number {
        return this.crankRotationRadius_mm
            + (Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2);
    }
    public get Bound_Z_Max(): number {
        if ((this.balancerMass_g > 0)
            && (this.balancerRotationRadius_mm > 0)) {
            return ((this.crankPinWidth_mm / 2)
                + Settings.CrankBalancerWidth_mm);
        } else {
            return (this.crankPinWidth_mm / 2);
        }
    }

    public Validate(): void {
        if (this.crankRotationRadius_mm < 0) {
            throw new Error('this.crankRotationRadius_mm < 0d');
        }
        if (this.balancerMass_g < 0) {
            throw new Error('this.balancerMass_g < 0d');
        }
        if (this.balancerRotationRadius_mm < 0) {
            throw new Error('this.balancerRotationRadius_mm < 0d');
        }
        if (this.balancerAngle_deg < 0) {
            throw new Error('this.balancerAngle_deg < 0d');
        }
        if (this.balancerAngle_deg >= 360) {
            throw new Error('this.balancerAngle_deg >= 360d');
        }
        if (this.crankPinWidth_mm < 0) {
            throw new Error('this.crankPinWidth_mm < 0d');
        }
    }
    // IPart Members



    // 'System-defined crank throw new Errors'
    // Gets the default crank throw new Error (for UI integration).
    private static get DefaultCrankThrow(): CrankThrow {
        const crankPinWidth_mm: number = (Settings.DefaultCrankThrowCrankRadius_mm * Settings.CrankThrowCrankPinWidthVsCrankRadius);
        return new CrankThrow(
            Settings.DefaultCrankThrowCrankRadius_mm,
            Settings.DefaultCrankThrowBalancerMass_g,
            (Settings.DefaultCrankThrowCrankRadius_mm * Settings.CrankThrowBalancerRadiusVsCrankThrowRadius),
            Settings.DefaultCrankThrowBalancerAngle_deg,
            crankPinWidth_mm);
    }

    // Gets a simple crank throw new Error based on given parameters.
    public static FromParameters(crankRotationRadius_mm: number, balancerMass_g?: number, balancerRotationRadius_mm?: number, balancerAngle_deg?: number): CrankThrow {
        balancerMass_g = Utilities.ForceValue(balancerMass_g, 0);
        balancerRotationRadius_mm = Utilities.ForceValue(balancerRotationRadius_mm, 0);
        balancerAngle_deg = Utilities.ForceValue(balancerAngle_deg, Settings.DefaultCrankThrowBalancerAngle_deg);

        return new CrankThrow(
            crankRotationRadius_mm,
            balancerMass_g,
            balancerRotationRadius_mm,
            balancerAngle_deg,
            (crankRotationRadius_mm * Settings.CrankThrowCrankPinWidthVsCrankRadius));
    }
    // 'System-defined crank throw new Errors'



    private crankRotationRadius_mm: number;
    private balancerMass_g: number;
    private balancerRotationRadius_mm: number;
    private balancerAngle_deg: number;
    private crankPinWidth_mm: number;



    // 'Public properties'
    // Defines the crank throw new Error's rotation radius (resulting in cylinder's stroke), in millimeters.
    public get CrankRotationRadius_mm(): number {
        return this.crankRotationRadius_mm;
    }
    public set CrankRotationRadius_mm(value: number) {
        this.crankRotationRadius_mm = value;
        this.Validate();
    }

    // Defines the mass of the crank balancer, in grams.
    public get BalancerMass_g(): number {
        return this.balancerMass_g;
    }
    public set BalancerMass_g(value: number) {
        this.balancerMass_g = value;
        this.Validate();
    }

    // Defines the rotation radius of the crank balancer, in millimeters.
    public get BalancerRotationRadius_mm(): number {
        return this.balancerRotationRadius_mm;
    }
    public set BalancerRotationRadius_mm(value: number) {
        this.balancerRotationRadius_mm = value;
        this.Validate();
    }

    // Defines the angle of the balancer with respect to the crank throw new Error, in degrees.
    public get BalancerAngle_deg(): number {
        return this.balancerAngle_deg;
    }
    public set BalancerAngle_deg(value: number) {
        this.balancerAngle_deg = value;
        this.Validate();
    }

    // Defines the width of the crank pin, in millimeters.
    public get CrankPinWidth_mm(): number {
        return this.crankPinWidth_mm;
    }
    public set CrankPinWidth_mm(value: number) {
        this.crankPinWidth_mm = value;
        this.Validate();
    }
    // 'Public properties'

}
