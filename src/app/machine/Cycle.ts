import { IComparable } from './IComparable';
import { Stroke } from './Stroke';
import { Mathematics } from '../common/Mathematics';

//  Represents a complete cycle for a cylinder.
export class Cycle implements IComparable {
    constructor(cycleId: string = Cycle.NaN.cycleId, strokes: Array<Stroke> = Cycle.NaN.strokes, defaultFiringAngle_deg: number = Cycle.NaN.defaultFiringAngle_deg) {
        this.cycleId = cycleId;
        this.strokes = strokes;
        this.defaultFiringAngle_deg = defaultFiringAngle_deg;
    }
    public toString(): string {
        return this.cycleId;
    }
    // IComparable Members
    public Equals(cycle: Cycle): boolean {
        let boolean1: boolean = (this.cycleId === cycle.cycleId);
        if ((!isNaN(this.defaultFiringAngle_deg)
            && !isNaN(cycle.defaultFiringAngle_deg))) {
            boolean1 = (boolean1
                && (this.defaultFiringAngle_deg === cycle.defaultFiringAngle_deg));
        }

        let boolean2: boolean = true;
        if ((this.strokes.length === cycle.strokes.length)) {
            for (let a: number = 0; (a < cycle.strokes.length); a++) {
                if (!cycle.strokes[a].Equals(this.strokes[a])) {
                    boolean2 = false;
                    break;
                }

            }

        } else {
            boolean2 = false;
        }

        if ((boolean1 === true)
            && (boolean2 === true)) {
            return true;
        } else {
            return false;
        }
    }
    // IComparable Members



    // 'System-defined cycles'
    // Gets the default two-stroke cycle.
    public static get TwoStroke(): Cycle {
        const cycle: Cycle = new Cycle('Two-Stroke', [
            Stroke.CombustionExhaust,
            Stroke.WashCompression], 0);
        return cycle;
    }

    // Gets the default four-stroke cycle.
    public static get FourStroke(): Cycle {
        const cycle: Cycle = new Cycle('Four-Stroke', [
            Stroke.Intake,
            Stroke.Compression,
            Stroke.Combustion,
            Stroke.Exhaust], 360);
        return cycle;
    }

    // Gets a default undefined cycle.
    public static get NaN(): Cycle {
        const cycle: Cycle = new Cycle('NaN', new Array(0), Number.NaN);
        return cycle;
    }
    // 'System-defined cycles'



    private cycleId: string;
    private strokes: Array<Stroke>;
    private defaultFiringAngle_deg: number;



    // 'Public properties'
    // Defines the unique name of the cycle.
    public get CycleId(): string {
        return this.cycleId;
    }

    // Defines the duration (in crank throw new Error angle) required for cycle completion, in degrees.
    public get Duration_deg(): number {
        return (this.strokes.length * Stroke.StrokeDuration_deg);
    }

    // Defines the strokes taking place within this cycle.
    public get Strokes(): Array<Stroke> {
        return this.strokes;
    }

    // Defines the strokes taking place within this cycle.
    public set Strokes(value: Array<Stroke>) {
        this.strokes = value;
    }

    // Defines the crank throw new Error angle, in degrees, where the power stroke is to take place.
    public get DefaultFiringAngle_deg(): number {
        return this.defaultFiringAngle_deg;
    }

    // Indicates the number of revolutions needed to complete the cycle.
    public get RevolutionsToCompleteCycle(): number {
        return (this.strokes.length / 2);
    }
    // 'Public properties'



    public GetPreviousStroke(stroke: Stroke): Stroke {
        if (!this.Contains(this.strokes, stroke)) {
            throw new Error('This cycle does not contain the given stroke.');
        }

        const strokes: Array<Stroke> = this.strokes.filter(function (strokeTmp: Stroke) {
            let angle_deg: number = (stroke.Begin_deg - Stroke.StrokeDuration_deg);
            angle_deg = Mathematics.GetAbsoluteAngle_deg(angle_deg, this.RevolutionsToCompleteCycle, true);

            if ((strokeTmp.Begin_deg === angle_deg)) {
                return true;
            } else {
                return false;
            }
        });

        if (strokes.length > 0) {
            return strokes[0];
        } else {
            throw new Error('Could not find previous stroke.');
        }
    }
    public GetNextStroke(stroke: Stroke): Stroke {
        if (!this.Contains(this.strokes, stroke)) {
            throw new Error('This cycle does not contain the given stroke.');
        }

        const strokes: Array<Stroke> = this.strokes.filter(function (strokeTmp: Stroke) {
            let angle_deg: number = (stroke.Begin_deg + Stroke.StrokeDuration_deg);
            angle_deg = Mathematics.GetAbsoluteAngle_deg(angle_deg, this.RevolutionsToCompleteCycle, true);

            if ((strokeTmp.Begin_deg === angle_deg)) {
                return true;
            } else {
                return false;
            }
        });

        if (strokes.length > 0) {
            return strokes[0];
        } else {
            throw new Error('Could not find next stroke.');
        }
    }



    private Contains(strokes: Array<Stroke>, stroke: Stroke): boolean {
        return strokes.some((strokeTmp: Stroke) => {
            if (strokeTmp.Equals(stroke)) {
                return true;
            } else {
                return false;
            }
        }, this);
    }

}
