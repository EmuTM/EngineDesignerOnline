import { IComparable } from './IComparable';

// Represents well-known piston movement within the cylinder's cycle.
export class Stroke implements IComparable {
    constructor(strokeId: string = Stroke.NaN.StrokeId, begin_deg: number = Stroke.NaN.begin_deg) {
        this.strokeId = strokeId;
        this.begin_deg = begin_deg;
    }
    // IComparable Members
    public Equals(stroke: Stroke): boolean {
        if ((this.strokeId === stroke.strokeId)
            && ((this.begin_deg === stroke.begin_deg) || (isNaN(this.begin_deg) && isNaN(stroke.begin_deg)))) {
            return true;
        } else {
            return false;
        }
    }
    // IComparable Members



    // Provides the value for standard (by definition) stroke duration, in degrees.
    public static get StrokeDuration_deg(): number {
        return 180;
    }
    // Provides the value for standard (by definition) number of strokes in one engine revolution.
    public static get StrokesPerRevolution(): number {
        return 2;
    }



    // 'System-defined strokes'
    // Gets the Intake stroke for the four-stroke cycle.
    public static get Intake(): Stroke {
        return new Stroke('Intake', 0);
    }

    // Gets the Compression stroke for the four-stroke cycle.
    public static get Compression(): Stroke {
        return new Stroke('Compression', 180);
    }

    // Gets the Combustion stroke for the four-stroke cycle.
    public static get Combustion(): Stroke {
        return new Stroke('Combustion', 360);
    }

    // Gets the Exhaust stroke for the four-stroke cycle.
    public static get Exhaust(): Stroke {
        return new Stroke('Exhaust', 540);
    }


    // Gets the Combustion-exhaust stroke for the two-stroke cycle.
    public static get CombustionExhaust(): Stroke {
        return new Stroke('Combustion-Exhaust', 0);
    }

    // Gets the Wash-compression stroke for the two-stroke cycle.
    public static get WashCompression(): Stroke {
        return new Stroke('Wash-Compression', 180);
    }


    // Gets a default undefined stroke.
    public static get NaN(): Stroke {
        return new Stroke('NaN', Number.NaN);
    }


    // Gets the proper stroke for a given angle.
    private static FromAngle_deg(currentAngle_deg: number): Stroke {
        const intake: Stroke = Stroke.Intake;
        if (intake.IsWithin(currentAngle_deg)) {
            return intake;
        }

        const compression: Stroke = Stroke.Compression;
        if (compression.IsWithin(currentAngle_deg)) {
            return compression;
        }

        const combustion: Stroke = Stroke.Combustion;
        if (combustion.IsWithin(currentAngle_deg)) {
            return combustion;
        }

        const exhaust: Stroke = Stroke.Exhaust;
        if (exhaust.IsWithin(currentAngle_deg)) {
            return exhaust;
        }

        const washCompression: Stroke = Stroke.WashCompression;
        if (washCompression.IsWithin(currentAngle_deg)) {
            return washCompression;
        }

        const combustionExhaust: Stroke = Stroke.CombustionExhaust;
        if (combustionExhaust.IsWithin(currentAngle_deg)) {
            return combustionExhaust;
        }

        throw new Error('No suitable stroke.');
    }
    // 'System-defined strokes'



    private strokeId: string;
    private begin_deg: number;



    // 'Public properties'
    public get StrokeId(): string {
        return this.strokeId;
    }

    // Defines the crank throw new Error angle for the beginning of the stroke, in degrees.
    public get Begin_deg(): number {
        return this.begin_deg;
    }

    // Defines the crank throw new Error angle for the end of the stroke, in degrees.
    public get End_deg(): number {
        return (this.begin_deg + Stroke.StrokeDuration_deg);
    }
    // 'Public properties'



    public IsWithin(angle_deg: number): boolean {
        if (((angle_deg >= this.begin_deg)
            && (angle_deg < this.End_deg))) {
            return true;
        } else {
            return false;
        }
    }
}

