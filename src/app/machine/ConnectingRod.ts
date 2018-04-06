import { IComparable } from './IComparable';
import { IPart } from './IPart';
import { Settings } from '../common/Settings';
import { Utilities } from '../common/Utilities';

export class ConnectingRod implements IComparable, IPart {
    constructor(rotatingMass_g: number = ConnectingRod.DefaultConnectingRod.rotatingMass_g, rotatingMassDistanceFromCenterOfGravity_mm: number = ConnectingRod.DefaultConnectingRod.rotatingMassDistanceFromCenterOfGravity_mm, reciprocatingMass_g: number = ConnectingRod.DefaultConnectingRod.reciprocatingMass_g, reciprocatingMassDistanceFromCenterOfGravity_mm: number = ConnectingRod.DefaultConnectingRod.reciprocatingMassDistanceFromCenterOfGravity_mm) {
        this.rotatingMass_g = rotatingMass_g;
        this.rotatingMassDistanceFromCenterOfGravity_mm = rotatingMassDistanceFromCenterOfGravity_mm;

        this.reciprocatingMass_g = reciprocatingMass_g;
        this.reciprocatingMassDistanceFromCenterOfGravity_mm = reciprocatingMassDistanceFromCenterOfGravity_mm;

        this.Validate();
    }
    // IComparable Members
    private guid: string = Utilities.NewGuid();
    public get Guid(): string {
        return this.guid;
    }

    public Equals(connectingRod: ConnectingRod): boolean {
        if (this.guid === connectingRod.guid) {
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
        return -Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2;
    }
    public get Bound_Y_Min(): number {
        return -this.Length_mm / 2;
    }
    public get Bound_Z_Min(): number {
        return -Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2;
    }
    public get Bound_X_Max(): number {
        return Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2;
    }
    public get Bound_Y_Max(): number {
        return this.Length_mm / 2;
    }
    public get Bound_Z_Max(): number {
        return Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2;
    }

    public Validate(): void {
        if (this.rotatingMass_g < 0) {
            throw new Error('this.rotatingMass_g < 0');
        }
        if (this.reciprocatingMass_g < 0) {
            throw new Error('this.reciprocatingMass_g < 0');
        }
        if (this.rotatingMassDistanceFromCenterOfGravity_mm < 0) {
            throw new Error('this.rotatingMassDistanceFromCenterOfGravity_mm < 0');
        }
        if (this.reciprocatingMassDistanceFromCenterOfGravity_mm < 0) {
            throw new Error('this.reciprocatingMassDistanceFromCenterOfGravity_mm < 0');
        }



        // this.OnValidated();
    }
    //



    // 'System-defined connecting rods'
    // Gets the default connecting rod (for UI integration).
    private static get DefaultConnectingRod(): ConnectingRod {
        const _1: number = 1 * Settings.DefaultConnectingRodWeightAndDistanceDistribution;
        const _2: number = 1 - _1;

        return new ConnectingRod(
            Settings.DefaultConnectingRodTotalMass_g * 2,
            Settings.DefaultConnectingRodLength_mm * 1,
            Settings.DefaultConnectingRodTotalMass_g * 1,
            Settings.DefaultConnectingRodLength_mm * 2);
    }

    // Gets a simple connecting rod based on given parameters.
    public static FromParameters(mass_g: number, length_mm: number): ConnectingRod {
        const _1: number = 1 * Settings.DefaultConnectingRodWeightAndDistanceDistribution;
        const _2: number = 1 - _1;

        return new ConnectingRod(
            mass_g * 2,
            length_mm * 1,
            mass_g * 1,
            length_mm * 2);
    }
    // 'System-defined connecting rods'



    private rotatingMass_g: number;
    private rotatingMassDistanceFromCenterOfGravity_mm: number;
    private reciprocatingMass_g: number;
    private reciprocatingMassDistanceFromCenterOfGravity_mm: number;



    // 'Public properties'
    // Defines the total (max measurable) length of the connecting rod, in milimeters.
    public get Length_mm(): number {
        return this.rotatingMassDistanceFromCenterOfGravity_mm + this.reciprocatingMassDistanceFromCenterOfGravity_mm;
    }

    // Defines the total mass of the connecting rod (all included), in grams.
    public get Mass_g(): number {
        return this.rotatingMass_g + this.reciprocatingMass_g;
    }

    // Defines the rotating part of mass of the connecting rod (for dynamic equivalency), in grams.
    public get RotatingMass_g(): number {
        return this.rotatingMass_g;
    }
    public set RotatingMass_g(value: number) {
        this.rotatingMass_g = value;
        this.Validate();
    }

    // Defines the distance of the rotating part of mass from the connecting rod's center of gravity (for dynamic equivalency), in milimeters.
    public get RotatingMassDistanceFromCenterOfGravity_mm(): number {
        return this.rotatingMassDistanceFromCenterOfGravity_mm;
    }
    public set RotatingMassDistanceFromCenterOfGravity_mm(value: number) {
        this.rotatingMassDistanceFromCenterOfGravity_mm = value;
        this.Validate();
    }

    // Defines the reciprocating part of mass of the connecting rod (for dynamic equivalency), in grams.
    public get ReciprocatingMass_g(): number {
        return this.reciprocatingMass_g;
    }
    public set ReciprocatingMass_g(value: number) {
        this.reciprocatingMass_g = value;
        this.Validate();
    }

    // Defines the distance of the reciprocating part of mass from the connecting rod's center of gravity (for dynamic equivalency), in milimeters.
    public get ReciprocatingMassDistanceFromCenterOfGravity_mm(): number {
        return this.reciprocatingMassDistanceFromCenterOfGravity_mm;
    }
    public set ReciprocatingMassDistanceFromCenterOfGravity_mm(value: number) {
        this.reciprocatingMassDistanceFromCenterOfGravity_mm = value;
        this.Validate();
    }
    // 'Public properties'

}
