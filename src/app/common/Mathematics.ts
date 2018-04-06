import { Utilities } from '../common/Utilities';

export class Mathematics {
    // Gets the absolute angle (scaled down by 'fullRotationsToGo' full-circle angles).
    public static GetAbsoluteAngle_deg(angle_deg: number, fullRotationsToGo?: number, forcePositive?: boolean): number {
        fullRotationsToGo = Utilities.ForceValue(fullRotationsToGo, 1);
        forcePositive = Utilities.ForceValue(forcePositive, false);

        if ((fullRotationsToGo < 1)) {
            throw new Error('At least one circle has to be completed.');
        }

        const repeatAngle: number = 360 * fullRotationsToGo;
        let double: number = (angle_deg % repeatAngle);
        if (((double < 0)
            && forcePositive)) {
            double = (repeatAngle + double);
        }

        return double;
    }

    // Computes an angle, in degrees, that is  the n-th cyclic angle between angleMindeg and angleMaxdeg.
    public static GetCyclicAngle_deg(angle_deg: number, angleMin_deg: number, angleMax_deg: number, cycle_deg: number): number {
        let angleAltereddeg: number = angle_deg;
        if ((angle_deg > angleMax_deg)) {
            const deltaOnChart: number = Math.abs((angleMax_deg - angleMin_deg));
            const combinedCyclesForOneDelta: number = (<number>(Math.ceil((deltaOnChart / cycle_deg))));
            const degreesToRollBackForOneDelta: number = (combinedCyclesForOneDelta * cycle_deg);
            let deltaToEnd: number = Math.abs((angle_deg - angleMax_deg));
            if ((deltaToEnd < degreesToRollBackForOneDelta)) {
                deltaToEnd = degreesToRollBackForOneDelta;
            }

            const timesToRollBack: number = (<number>(Math.ceil((deltaToEnd / degreesToRollBackForOneDelta))));
            angleAltereddeg = (angleAltereddeg
                - (degreesToRollBackForOneDelta * timesToRollBack));
        } else if ((angle_deg < angleMin_deg)) {
            const deltaOnChart: number = Math.abs((angleMax_deg - angleMin_deg));
            const combinedCyclesForOneDelta: number = (<number>(Math.ceil((deltaOnChart / cycle_deg))));
            const degreesToRollForthForOneDelta: number = (combinedCyclesForOneDelta * cycle_deg);
            let deltaToStart: number = Math.abs((angle_deg - angleMin_deg));
            if ((deltaToStart < degreesToRollForthForOneDelta)) {
                deltaToStart = degreesToRollForthForOneDelta;
            }

            const timesToRollForth: number = (<number>(Math.ceil((deltaToStart / degreesToRollForthForOneDelta))));
            angleAltereddeg = (angleAltereddeg
                + (degreesToRollForthForOneDelta * timesToRollForth));
        }

        return angleAltereddeg;
    }

    // Gets the number of full rotations of an angle (how many circles the angle described).
    public static GetFullRotations(angledeg: number): number {
        return angledeg / 360;
    }

    public static IsEven(number: number): boolean {
        if (number % 2 === 0) {
            return true;
        }
        return false;
    }
    public static IsOdd(number: number): boolean {
        if (number % 2 !== 0) {
            return true;
        }
        return false;
    }

}
