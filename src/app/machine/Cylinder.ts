import { IComparable } from './IComparable';
import { IPart } from './IPart';
import { Utilities } from '../common/Utilities';
import { Conversions } from '../common/Conversions';
import { Mathematics } from '../common/Mathematics';
import { Cycle } from './Cycle';
import { Piston } from './Piston';
import { ConnectingRod } from './ConnectingRod';
import { CrankThrow } from './CrankThrow';
import { Settings } from '../common/Settings';
import { Stroke } from './Stroke';

// Represents a cylinder unit for the engine.
export class Cylinder implements IComparable, IPart {
    private static get VALIDATION_INTERSECTION_ACCURACY_deg(): number {
        return 10;
    }



    constructor(cycle: Cycle = new Cycle(), piston: Piston = new Piston(), connectingRod: ConnectingRod = new ConnectingRod(), crankThrow: CrankThrow = new CrankThrow()) {
        this.cycle = cycle;
        this.piston = piston;
        this.connectingRod = connectingRod;
        this.crankThrow = crankThrow;

        this.Validate();
    }
    // IComparable Members
    private guid: string = Utilities.NewGuid();
    public get Guid(): string {
        return this.guid;
    }

    public Equals(cylinder: Cylinder): boolean {
        if (this.guid === cylinder.guid) {
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
        let cylinderX: number = this.Bore_mm / 2;

        const crankThrow: number = this.crankThrow.CrankRotationRadius_mm
            + (Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2);
        if (crankThrow > cylinderX) {
            cylinderX = crankThrow;
        }

        if ((this.crankThrow.BalancerMass_g > 0)
            && (this.crankThrow.BalancerRotationRadius_mm > 0)) {
            const crankBalancer: number =
                (this.crankThrow.BalancerRotationRadius_mm / 2)
                + (Settings.CrankBalancerDiameter_mm / 2);
            if (crankBalancer > cylinderX) {
                cylinderX = crankBalancer;
            }
        }


        return -cylinderX;
    }
    public get Bound_Y_Min(): number {
        let cylinderY: number = this.crankThrow.CrankRotationRadius_mm
            + (Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2);

        if ((this.crankThrow.BalancerMass_g > 0)
            && (this.crankThrow.BalancerRotationRadius_mm > 0)) {
            const crankBalancer: number =
                (this.crankThrow.BalancerRotationRadius_mm / 2)
                + (Settings.CrankBalancerDiameter_mm / 2);
            if (crankBalancer > cylinderY) {
                cylinderY = crankBalancer;
            }
        }

        return -cylinderY;
    }
    public get Bound_Z_Min(): number {
        let cylinderZ: number = this.Bore_mm / 2;

        const double: number =
            (this.crankThrow.CrankPinWidth_mm / 2)
            + Settings.CrankBalancerWidth_mm;
        if (double > cylinderZ) {
            cylinderZ = double;
        }

        return -cylinderZ;
    }
    public get Bound_X_Max(): number {
        let cylinderX: number = this.Bore_mm / 2;

        const crankThrow: number = this.crankThrow.CrankRotationRadius_mm
            + (Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2);
        if (crankThrow > cylinderX) {
            cylinderX = crankThrow;
        }

        if ((this.crankThrow.BalancerMass_g > 0)
            && (this.crankThrow.BalancerRotationRadius_mm > 0)) {
            const crankBalancer: number =
                (this.crankThrow.BalancerRotationRadius_mm / 2)
                + (Settings.CrankBalancerDiameter_mm / 2);
            if (crankBalancer > cylinderX) {
                cylinderX = crankBalancer;
            }
        }

        return cylinderX;
    }
    public get Bound_Y_Max(): number {
        const cylinderY: number = this.GetPhysicalHeightAbovePiston_mm(0);

        return cylinderY;
    }
    public get Bound_Z_Max(): number {
        let cylinderZ: number = this.Bore_mm / 2;

        const double: number =
            (this.crankThrow.CrankPinWidth_mm / 2)
            + Settings.CrankBalancerWidth_mm;
        if (double > cylinderZ) {
            cylinderZ = double;
        }

        return cylinderZ;
    }

    public Validate(): void {
        // this.OnValidated(); return;
        // 'RLRatio mora biti manjši od 1'
        if (this.RLRatio > 1) {
            throw new Error('RLRatio cannot be less than 1.');
        }
        // 'RLRatio mora biti manjši od 1'

        // 'pod batom mora ostat vsaj za ročično gred'
        if (this.GetPhysicalHeightUnderPiston_mm(Stroke.StrokeDuration_deg) < (Settings.ConRodBigEndPinAndCrankshaftDiameter_mm / 2)) {
            throw new Error('Piston skirt intersects with crankshaft.');
        }
        // 'pod batom mora ostat vsaj za ročično gred'

        // TODO:
        // 'utež od ročice se ne sme zaletavat u bat'
        {
            // // dobimo funkcijo gibanja 'pod batom'
            // Function physicalHeightUnderPiston_mm = Function.Compute(
            //    0d, 360d, VALIDATION_INTERSECTION_ACCURACY_deg,
            //    delegate(double x) { return this.GetPhysicalHeightUnderPiston_mm(x); });

            // // in funkcijo gibanja uteži
            // Function crankThrowBalancerRotationY_mm = Function.Compute(
            //    0d, 360d, VALIDATION_INTERSECTION_ACCURACY_deg,
            //    delegate(double x) { return this.crankThrow.BalancerRotationRadius_mm * Math.Cos(Conversions.DegToRad(x + this.crankThrow.BalancerAngle_deg)); });

            // if (crankThrowBalancerRotationY_mm.HasBiggerMagnitudeY(physicalHeightUnderPiston_mm))
            // {
            //    // če se prekrivata, pomeni, da se bo utež zaletela v bat
            //    throw new Error ('The crank throw new Error balancer intersects with piston.');
            // }
        }
        // 'utež od ročice se ne sme zaletavat u bat'

        // TODO:
        // 'ojnica ne sme sekat cilindra'
        {
            // // računa samo za center ojnice; širine ne upošteva!!!

            // Function pistonDiameter_mm = Function.Compute(
            //    0d, 360d, VALIDATION_INTERSECTION_ACCURACY_deg,
            //    delegate(double x)
            //    {
            //        return this.Piston.Diameter_mm / 2;
            //    });

            // Function conrodIntersection_mm = Function.Compute(
            //    0d, 360d, VALIDATION_INTERSECTION_ACCURACY_deg,
            //    delegate(double x)
            //    {
            //        double conRodAngle_rad = Conversions.DegToRad(this.GetConRodAngle_deg(x));
            //        // dolžina ojnice na tej velikosti cilindra (hipotenuza)
            //        double cylinderLowerPortion_mm = this.GetPistonTravelFromCrankCenter_mm(x) - this.GetPhysicalHeightUnderPiston_mm(180d);
            //        double conRodLength_mm = cylinderLowerPortion_mm / Math.Cos(conRodAngle_rad);
            //        // odmik od navpične premice (centra cilindra); to potem primerjamo s polmerom cilindra
            //        double double = Math.Sin(conRodAngle_rad) * conRodLength_mm;
            //        // samo pozitivna stran!
            //        return Math.Abs(double);
            //    });


            // if (pistonDiameter_mm.ToPolygon().IntersectsWith(conrodIntersection_mm.ToPolygon()))
            // {
            //    throw new Error ('The connecting rod intersects with cylinder wall.');
            // }
        }
        // 'ojnica ne sme sekat cilindra'


        // this.OnValidated();
    }
    // IPart Members



    // 'System-defined cylinders'
    // private static get DefaultCylinder(): Cylinder {
    //     return new Cylinder(
    //         Cycle.NaN,
    //         Piston.DefaultPiston,
    //         ConnectingRod.DefaultConnectingRod,
    //         CrankThrow.DefaultCrankThrow);
    // }

    // Gets a cylinder based on given parameters. 
    public static FromParameters(cycle: Cycle, bore_mmOrDisplacement_cm3?: number, stroke_mm?: number): Cylinder {
        if (Utilities.Exists(stroke_mm) === false) {
            const displacement_mm3: number = Conversions.Cm3ToMm3(bore_mmOrDisplacement_cm3);
            const boreStroke_mm: number = Math.pow(((4 * displacement_mm3) / Math.PI), 1 / 3);

            bore_mmOrDisplacement_cm3 = boreStroke_mm;
            stroke_mm = boreStroke_mm;
        }

        return new Cylinder(
            cycle,
            Piston.FromParameters(
                bore_mmOrDisplacement_cm3,
                new Piston().Mass_g),
            ConnectingRod.FromParameters(
                new ConnectingRod().Mass_g,
                (stroke_mm * Settings.DefaultConnectingRodLengthVsStroke)),
            CrankThrow.FromParameters(
                stroke_mm / 2));
    }
    // 'System-defined cylinders'



    private cycle: Cycle;
    private piston: Piston;
    private connectingRod: ConnectingRod;
    private crankThrow: CrankThrow;



    // 'Public properties'
    // Defines the cylinder's working cycle.
    public get Cycle(): Cycle {
        return this.cycle;
    }
    public set Cycle(value: Cycle) {
        this.cycle = value;
    }

    // Defines the piston unit to be used with this cylinder.
    public get Piston(): Piston {
        return this.piston;
    }

    // Defines the connecting rod unit to be used with this cylinder.
    public get ConnectingRod(): ConnectingRod {
        return this.connectingRod;
    }

    // Defines the crank throw new Error unit to be used with this cylinder.
    public get CrankThrow(): CrankThrow {
        return this.crankThrow;
    }

    // Indicates the cylinder's bore (based on piston's diameter), in millimeters.
    public get Bore_mm(): number {
        return this.piston.Diameter_mm;
    }

    // Indicates the cylinder's stroke (based on crank throw new Error's crank radius), in millimeters.
    public get Stroke_mm(): number {
        return (this.crankThrow.CrankRotationRadius_mm * 2);
    }

    // Indicates the cylinder's total displacement (resulting from defined bore and stroke), in cubic centimeters.
    public get Displacement_cm3(): number {
        return Conversions.Mm3ToCm3((this.piston.Area_mm2 * this.Stroke_mm));
    }

    // Indicates the cylinder's stroke to bore ratio.
    public get StrokeToBoreRatio(): number {
        return (this.Stroke_mm / this.Bore_mm);
    }

    // Indicates the cylinder's bore to stroke ratio.
    public get BoreToStrokeRatio(): number {
        return (this.Bore_mm / this.Stroke_mm);
    }

    // Indicates the cylinder's crank radius vs. connecting rod length.
    public get RLRatio(): number {
        return (this.crankThrow.CrankRotationRadius_mm / this.connectingRod.Length_mm);
    }

    // Indicates the cylinder's connecting rod length vs. crank radius.
    public get LRRatio(): number {
        return (this.connectingRod.Length_mm / this.crankThrow.CrankRotationRadius_mm);
    }

    // Indicates the required cylinder's height to accommodate the piston within it's stroke, in millimeters.
    public get CylinderHeight_mm(): number {
        return Math.abs((this.GetPhysicalHeightAbovePiston_mm(0) - this.GetPhysicalHeightUnderPiston_mm(Stroke.StrokeDuration_deg)));
    }
    // 'Public properties'



    // 'Kinematika'
    public GetPhysicalHeightAbovePiston_mm(crankThrowRotation_deg: number): number {
        // najdaljša razdalja od centra
        let double: number = this.GetPistonTravelFromCrankCenter_mm(crankThrowRotation_deg);
        double = (double + this.piston.GudgeonPinDistanceFromTop_mm);
        return double;
    }
    public GetPhysicalHeightUnderPiston_mm(crankThrowRotation_deg: number): number {
        // najkrajša razdalja od centra
        let double: number = this.GetPistonTravelFromCrankCenter_mm(crankThrowRotation_deg);
        double = (double
            - (this.piston.SkirtLength_mm - this.piston.GudgeonPinDistanceFromTop_mm));
        return double;
    }
    public GetConRodAngle_deg(crankThrowRotation_deg: number): number {
        const n: number = (Math.sin(Conversions.DegToRad(crankThrowRotation_deg)) * this.crankThrow.CrankRotationRadius_mm);
        const radians: number = Math.asin((n / this.connectingRod.Length_mm));
        return Conversions.RadToDeg(radians);
    }
    public GetMeanPistonVelocity_mps(rpm: number): number {
        return (Conversions.MmToM((2 * this.Stroke_mm)) * Conversions.RpmToRps(rpm));
    }
    public GetCompressionRatio(clearanceVolume_cm3: number): number {
        const double: number = ((this.Displacement_cm3 + clearanceVolume_cm3) / clearanceVolume_cm3);
        return double;
    }
    public GetCombustionChamberHeight_mm(crankThrowRotation_deg: number): number {
        return (this.GetPhysicalHeightAbovePiston_mm(0) - this.GetPhysicalHeightAbovePiston_mm(crankThrowRotation_deg));
    }
    public GetPistonTravelFromCrankCenter_mm(crankThrowRotation_deg: number): number {
        const crankThrowRotation_rad: number = Conversions.DegToRad(Mathematics.GetAbsoluteAngle_deg(crankThrowRotation_deg));
        const r2sin2A: number = (Math.pow(this.crankThrow.CrankRotationRadius_mm, 2) * Math.pow(Math.sin(crankThrowRotation_rad), 2));
        const sqrRoot: number = Math.sqrt((Math.pow(this.connectingRod.Length_mm, 2) - r2sin2A));
        const rcosA: number = (this.crankThrow.CrankRotationRadius_mm * Math.cos(crankThrowRotation_rad));
        return (rcosA + sqrRoot);
    }
    public GetDisplacement_cm3(crankThrowRotation_deg: number): number {
        return Conversions.Mm3ToCm3((this.piston.Area_mm2 * Math.abs((this.GetPistonTravelFromCrankCenter_mm(Stroke.StrokeDuration_deg) - this.GetPistonTravelFromCrankCenter_mm(Stroke.StrokeDuration_deg)))));
        // GetPistonTravelFromTop_units(GetPistonTravelFromCrankCenter_mm(crankThrowRotation_deg), TotalHeight_mm));
    }
    public GetPistonVelocity_mpdeg(crankThrowRotation_deg: number): number {
        const crankThrowRotation_rad: number = Conversions.DegToRad(Mathematics.GetAbsoluteAngle_deg(crankThrowRotation_deg));
        const sinCrankThrowRotation: number = Math.sin(crankThrowRotation_rad);
        const crankRadius_m: number = Conversions.MmToM(this.crankThrow.CrankRotationRadius_mm);
        const connectingRodLength_m: number = Conversions.MmToM(this.connectingRod.Length_mm);
        const rsinA: number = (crankRadius_m * sinCrankThrowRotation);
        const r2sinAcosA: number = (Math.pow(crankRadius_m, 2)
            * (sinCrankThrowRotation * Math.cos(crankThrowRotation_rad)));
        const r2sin2A: number = (Math.pow(crankRadius_m, 2) * Math.pow(sinCrankThrowRotation, 2));
        const sqrRoot: number = Math.sqrt((Math.pow(connectingRodLength_m, 2) - r2sin2A));
        const xTmp: number = (r2sinAcosA / sqrRoot);
        return ((rsinA - xTmp)
            * -1);
    }
    public GetPistonVelocity_mps(crankThrowRotation_deg: number, rpm: number): number {
        return (this.GetPistonVelocity_mpdeg(crankThrowRotation_deg) * Conversions.RpmToDegps(rpm));
    }
    public GetPistonAcceleration_mpdeg2(crankThrowRotation_deg: number): number {
        const crankThrowRotation_rad: number = Conversions.DegToRad(Mathematics.GetAbsoluteAngle_deg(crankThrowRotation_deg));
        const sinCrankThrowRotation: number = Math.sin(crankThrowRotation_rad);
        const cosCrankThrowRotation: number = Math.cos(crankThrowRotation_rad);
        const crankRadius_m: number = Conversions.MmToM(this.crankThrow.CrankRotationRadius_mm);
        const connectingRodLength_m: number = Conversions.MmToM(this.connectingRod.Length_mm);
        const rcosA: number = (crankRadius_m * cosCrankThrowRotation);
        const r2cos2A_sin2A: number = (Math.pow(crankRadius_m, 2)
            * (Math.pow(cosCrankThrowRotation, 2) - Math.pow(sinCrankThrowRotation, 2)));
        const r2sin2A: number = (Math.pow(crankRadius_m, 2) * Math.pow(sinCrankThrowRotation, 2));
        const sqrRoot1: number = Math.sqrt((Math.pow(connectingRodLength_m, 2) - r2sin2A));
        const r4sin2Acos2A: number = (Math.pow(crankRadius_m, 4)
            * (Math.pow(sinCrankThrowRotation, 2) * Math.pow(cosCrankThrowRotation, 2)));
        const sqrRoot2: number = Math.pow(Math.sqrt((Math.pow(connectingRodLength_m, 2) - r2sin2A)), 3);
        const _1: number = (r2cos2A_sin2A / sqrRoot1);
        const _2: number = (r4sin2Acos2A / sqrRoot2);
        return (-rcosA - _1 - _2);
    }
    public GetPistonAcceleration_mps2(crankThrowRotation_deg: number, rpm: number): number {
        return (this.GetPistonAcceleration_mpdeg2(crankThrowRotation_deg) * Math.pow(Conversions.RpmToDegps(rpm), 2));
    }
    // 'Kinematika'



    public GetStroke(crankThrowRotation_deg: number): Stroke {
        if (this.Cycle.RevolutionsToCompleteCycle > 0) {
            crankThrowRotation_deg = Mathematics.GetAbsoluteAngle_deg(crankThrowRotation_deg, this.cycle.RevolutionsToCompleteCycle, true);

            for (const stroke of this.cycle.Strokes) {
                if (stroke.IsWithin(crankThrowRotation_deg)) {
                    return stroke;
                }
            }

            throw new Error('Failed to find stroke.');
        } else {
            return Stroke.NaN;
        }
    }

}
