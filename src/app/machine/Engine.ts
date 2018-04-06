import { IComparable } from './IComparable';
import { IPart } from './IPart';
import { Utilities } from '../common/Utilities';
import { PositionedCylinder } from './PositionedCylinder';
import { Cycle } from './Cycle';
import { Flywheel } from './Flywheel';
import { Cylinder } from './Cylinder';
import { Mathematics } from '../common/Mathematics';
import { Conversions } from '../common/Conversions';
import { Settings } from '../common/Settings';

// Represents an engine, resulting from combination of various cylinders and their setups.
export class Engine implements IComparable, IPart {
    constructor(positionedCylinders: Array<PositionedCylinder> = []) {
        this.flywheel = Flywheel.DefaultFlywheel;
        this.positionedCylinders = positionedCylinders;

        this.Validate();
    }
    // IComparable Members
    private guid: string = Utilities.NewGuid();
    public get Guid(): string {
        return this.guid;
    }

    public Equals(engine: Engine): boolean {
        if (this.guid === engine.guid) {
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
            // NOTE: to je po novem, vendar ne vem, ce je uredu za vse IParte, ma ocitno samo za tega, ker ostali vsi zacnejo z 0 ali pa v negativi
            return (Math.abs(maxLength) - Math.abs(minLength));
            // return Math.Abs(maxLength);
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
        let minX: number = 0; // vec kot 0, ne more bit, ker motor zacne v centru, torej 0
        for (const positionedCylinder of this.positionedCylinders) {
            const tilt_rad: number = Conversions.DegToRad(positionedCylinder.Tilt_deg);
            let cylinderX: number = (Math.sin(tilt_rad) * positionedCylinder.GetPhysicalHeightAbovePiston_mm(0));
            if ((cylinderX <= 0)) {
                // koliko vrtina pripomore k sirini
                cylinderX = (cylinderX - Math.abs((Math.cos(tilt_rad)
                    * (positionedCylinder.Bore_mm / 2))));
            }

            // ce je double od cilindra pozitiven ali pa ni 'dovolj negativen', potem rocica vpliva na sirino motojra
            if (((cylinderX > 0)
                || (Math.abs(cylinderX) < positionedCylinder.CrankThrow.CrankRotationRadius_mm))) {
                cylinderX = (positionedCylinder.CrankThrow.CrankRotationRadius_mm * -1);
            }

            if ((cylinderX < minX)) {
                minX = cylinderX;
            }

        }

        if ((this.flywheel.Mass_g > 0)) {
            const flywheelDiameterBound: number = -(this.flywheel.Diameter_mm / 2);
            if ((flywheelDiameterBound < minX)) {
                minX = flywheelDiameterBound;
            }

        }

        return minX;
    }
    public get Bound_Y_Min(): number {
        let minY: number = 0; // vec kot 0, ne more bit, ker motor zacne v centru, torej 0
        for (const positionedCylinder of this.positionedCylinders) {
            // pozicija cilindra
            const tilt_rad: number = Conversions.DegToRad(positionedCylinder.Tilt_deg);
            let cylinderY: number = (Math.cos(tilt_rad) * positionedCylinder.GetPhysicalHeightAbovePiston_mm(0));
            if ((cylinderY <= 0)) {
                // koliko vrtina pripomore k visini
                cylinderY = (cylinderY - Math.abs((Math.sin(tilt_rad)
                    * (positionedCylinder.Bore_mm / 2))));
            }

            // ce je y od cilindra pozitiven ali pa ni 'dovolj negativen', potem rocica vpliva na visino motojra
            if (((cylinderY > 0)
                || (Math.abs(cylinderY) < positionedCylinder.CrankThrow.CrankRotationRadius_mm))) {
                cylinderY = (positionedCylinder.CrankThrow.CrankRotationRadius_mm * -1);
            }

            if ((cylinderY < minY)) {
                minY = cylinderY;
            }

        }

        if ((this.flywheel.Mass_g > 0)) {
            const flywheelDiameterBound: number = -(this.flywheel.Diameter_mm / 2);
            if ((flywheelDiameterBound < minY)) {
                minY = flywheelDiameterBound;
            }

        }

        return minY;
    }
    public get Bound_Z_Min(): number {
        let minZ: number = 0;

        const firstPositionedCylinder: PositionedCylinder = this.GetFirstPositionedCylinder();
        if ((firstPositionedCylinder !== null)) {
            minZ = -(firstPositionedCylinder.Offset_mm + firstPositionedCylinder.Bore_mm / 2);
        }

        if ((this.flywheel.Mass_g > 0)) {
            minZ = (minZ - this.flywheel.Length);
        }

        return minZ;
    }

    public get Bound_X_Max(): number {
        let maxX: number = 0; // manj kot 0, ne more bit, ker motor zacne v centru, torej 0
        for (const positionedCylinder of this.positionedCylinders) {
            const tilt_rad: number = Conversions.DegToRad(positionedCylinder.Tilt_deg);
            let cylinderX: number = (Math.sin(tilt_rad) * positionedCylinder.GetPhysicalHeightAbovePiston_mm(0));
            if ((cylinderX >= 0)) {
                // koliko vrtina pripomore k sirini
                cylinderX = (cylinderX + Math.abs((Math.cos(tilt_rad)
                    * (positionedCylinder.Bore_mm / 2))));
            }

            // ce je y od cilindra negativen ali pa ni 'dovolj pozitiven', potem rocica vpliva na sirino motojra
            if (((cylinderX < 0)
                || (Math.abs(cylinderX) < positionedCylinder.CrankThrow.CrankRotationRadius_mm))) {
                cylinderX = positionedCylinder.CrankThrow.CrankRotationRadius_mm;
            }

            if ((cylinderX > maxX)) {
                maxX = cylinderX;
            }

        }

        if ((this.flywheel.Mass_g > 0)) {
            const flywheelDiameterBound: number = (this.flywheel.Diameter_mm / 2);
            if ((flywheelDiameterBound > maxX)) {
                maxX = flywheelDiameterBound;
            }

        }

        return maxX;
    }
    public get Bound_Y_Max(): number {
        let maxY: number = 0; // manj kot 0, ne more bit, ker motor zacne v centru, torej 0
        for (const positionedCylinder of this.positionedCylinders) {
            const tilt_rad: number = Conversions.DegToRad(positionedCylinder.Tilt_deg);
            let cylinderY: number = (Math.cos(tilt_rad) * positionedCylinder.GetPhysicalHeightAbovePiston_mm(0));
            if ((cylinderY >= 0)) {
                // koliko vrtina pripomore k visini
                cylinderY = (cylinderY + Math.abs((Math.sin(tilt_rad)
                    * (positionedCylinder.Bore_mm / 2))));
            }

            // ce je y od cilindra negativen ali pa ni 'dovolj pozitiven', potem rocica vpliva na visino motojra
            if (((cylinderY < 0)
                || (Math.abs(cylinderY) < positionedCylinder.CrankThrow.CrankRotationRadius_mm))) {
                cylinderY = positionedCylinder.CrankThrow.CrankRotationRadius_mm;
            }

            if ((cylinderY > maxY)) {
                maxY = cylinderY;
            }

        }

        if ((this.flywheel.Mass_g > 0)) {
            const flywheelDiameterBound: number = (this.flywheel.Diameter_mm / 2);
            if ((flywheelDiameterBound > maxY)) {
                maxY = flywheelDiameterBound;
            }

        }

        return maxY;
    }
    public get Bound_Z_Max(): number {
        let maxZ: number = 0;

        const lastPositionedCylinder: PositionedCylinder = this.GetLastPositionedCylinder();
        if ((lastPositionedCylinder !== null)) {
            maxZ = (lastPositionedCylinder.Offset_mm + lastPositionedCylinder.Bore_mm / 2);
        }

        return maxZ;
    }

    public Validate() {
        if ((this.positionedCylinders.length > 0)) {
            // ce je minimum 1...
            const minPosition = Utilities.GetMin(
                this.positionedCylinders,
                (item) => item.position);
            if (minPosition !== 1) {
                throw new Error('No cylinder positioned as 1 found.');
            }

            // če pozicija zadnjega cilindra ni enaka številu cilindrov
            const maxPosition: number = Utilities.GetMax(
                this.positionedCylinders,
                (item: PositionedCylinder) => item.Position);
            if (maxPosition !== this.positionedCylinders.length) {
                throw new Error(
                    'The last cylinder position is not the same as the number of cylinders ('
                    + this.positionedCylinders.length.toString()
                    + ').');
            }

            // sortiramo po poziciji
            this.positionedCylinders.sort(function (a: PositionedCylinder, b: PositionedCylinder) {
                if (a.Position < b.Position) {
                    return -1;
                } else if (a.Position === b.Position) {
                    return 0;
                } else { // if (a.Position > b.Position)
                    return 1;
                }
            });

            // pogledamo, če si pozicije sledijo po vrsti
            for (let a: number = 0; a < this.positionedCylinders.length - 1; a++) {
                if (this.positionedCylinders[(a + 1)].Position - this.positionedCylinders[a].Position !== 1) {
                    throw new Error('Cylinder positions are not in sorted order (1, 2, 3, n).');
                }
            }

            // pogledamo, če si offseti sledijo po vrsti
            for (let a: number = 0; a < this.positionedCylinders.length - 1; a++) {
                if (this.positionedCylinders[(a + 1)].Offset_mm <= this.positionedCylinders[a].Offset_mm) {
                    throw new Error('A cylinder\'s longitudinal offset must be greater than the longitudinal offset of the previous cylinder.');
                }
            }

            // TODO: preverjanje intersekcije
        }

        // this.OnValidated();
    }
    // po starem smo delali s klonom; ne vem, če je potrebno
    // public Validate() {
    //     // delamo s klonom
    //     const positionedCylindersToBeValidated: Array<PositionedCylinder> = Object.create(this.positionedCylinders);

    //     if ((positionedCylindersToBeValidated.length > 0)) {
    //         // 'pogledamo pozicije'
    //         positionedCylindersToBeValidated.sort(function (a: PositionedCylinder, b: PositionedCylinder) {
    //             if (a.Position < b.Position) {
    //                 return -1;
    //             } else if (a.Position === b.Position) {
    //                 return 0;
    //             } else { // if (a.Position > b.Position)
    //                 return 1;
    //             }
    //         });

    //         // ce je minimum 1...
    //         if (positionedCylindersToBeValidated[0].Position !== 1) {
    //             throw new Error('No cylinder positioned as 1 found.');
    //         }

    //         // če pozicija zadnjega cilindra ni enaka številu cilindrov
    //         if (positionedCylindersToBeValidated[positionedCylindersToBeValidated.length - 1].Position !== positionedCylindersToBeValidated.length) {
    //             throw new Error(
    //                 'The last cylinder position is not the same as the number of cylinders ('
    //                 + positionedCylindersToBeValidated.length.toString()
    //                 + ').');
    //         }

    //         // ...in si cilindri sledijo po vrsti...
    //         for (let a: number = 0; a < positionedCylindersToBeValidated.length - 1; a++) {
    //             if (positionedCylindersToBeValidated[(a + 1)].Position - positionedCylindersToBeValidated[a].Position !== 1) {
    //                 throw new Error('Cylinder positions are not in sorted order (1, 2, 3, n).');
    //             }

    //         }
    //         // 'pogledamo pozicije'

    //         // ce je vse ok...
    //         this.positionedCylinders = positionedCylindersToBeValidated;
    //     }

    //     // this.OnValidated();
    // }
    // IPart Members



    public static InLine(cycle: Cycle, totalDisplacement_cm3: number, ...firingAngles_deg: number[]): Engine {
        const numberOfCylinders: number = firingAngles_deg.length;
        const cylinderDisplacement: number = totalDisplacement_cm3 / numberOfCylinders;
        const cylinderFiringAngle: number = cycle.Duration_deg / numberOfCylinders;
        const positionedCylinders: Array<PositionedCylinder> = new Array<PositionedCylinder>();

        let longitudinalOffset: number = 0;
        for (let a: number = 0; a < numberOfCylinders; a++) {
            const cylinder: Cylinder = Cylinder.FromParameters(cycle, cylinderDisplacement);

            if (a > 0) {
                longitudinalOffset += cylinder.Bore_mm + (cylinder.Bore_mm / Settings.DefaultOffsetDivisor);
            }

            const positionedCylinder: PositionedCylinder = new PositionedCylinder(cylinder,
                a + 1,
                longitudinalOffset,
                0,
                firingAngles_deg[a]);
            positionedCylinders.push(positionedCylinder);
        }

        return new Engine(positionedCylinders);
    }
    public static Vee(cycle: Cycle, totalDisplacement_cm3: number, veeAngle_deg: number, ...firingAngles_deg: number[]): Engine {
        const numberOfCylinders: number = firingAngles_deg.length;
        const cylinderDisplacement: number = totalDisplacement_cm3 / numberOfCylinders;
        const cylinderFiringAngle: number = cycle.Duration_deg / numberOfCylinders;
        const positionedCylinders: Array<PositionedCylinder> = new Array<PositionedCylinder>();

        let longitudinalOffset: number = 0;
        for (let a: number = 0; a < numberOfCylinders; a++) {
            const cylinder: Cylinder = Cylinder.FromParameters(cycle, cylinderDisplacement);

            if (a > 0) {
                longitudinalOffset += cylinder.Bore_mm + (cylinder.Bore_mm / Settings.DefaultOffsetDivisor);
            }

            const positionedCylinder: PositionedCylinder = new PositionedCylinder(cylinder,
                a + 1,
                longitudinalOffset,
                0,
                firingAngles_deg[a]);
            positionedCylinders.push(positionedCylinder);
        }

        const engine: Engine = new Engine(positionedCylinders);

        for (let a: number = 0; a < engine.NumberOfCylinders; a++) {
            if (Mathematics.IsOdd(a + 1)) {
                engine.PositionedCylinders[a].Tilt_deg = -(veeAngle_deg / 2);
            } else {
                engine.PositionedCylinders[a].Tilt_deg = (veeAngle_deg / 2);
            }
        }
        return engine;
    }



    private positionedCylinders: Array<PositionedCylinder>;
    public get PositionedCylinders(): Array<PositionedCylinder> {
        return this.positionedCylinders;
    }
    public set PositionedCylinders(value: Array<PositionedCylinder>) {
        this.positionedCylinders = value;
        this.Validate();
    }

    private flywheel: Flywheel;
    // Defines the flywheel unit for this engine.
    public get Flywheel(): Flywheel {
        return this.flywheel;
    }



    // 'Public properties'
    // Indicates the engine's total displacement, in cubic centimeters.
    public get TotalDisplacement_cm3(): number {
        let double: number = 0;
        for (const positionedCylinder of this.positionedCylinders) {
            double = (double + positionedCylinder.Displacement_cm3);
        }

        return double;
    }

    // Indicates the engine's crank throw new Errors angles (resulting from defined cylinder setups), in degrees per array position, where the array position is the cylinder number (0 = first).
    public get CrankThrows_deg(): Array<number> {
        const crankThrows_deg: Array<number> = new Array<number>();
        for (const positionedCylinder of this.positionedCylinders) {
            crankThrows_deg.push(Mathematics.GetAbsoluteAngle_deg(positionedCylinder.GetAbsoluteCrankThrowRotation_deg(0), 1, true));
        }

        return crankThrows_deg;
    }

    // Indicates the engine's firing order, in cylinder positions (resulting from defined cylinder setups).
    public get FiringOrder(): string {
        const list: Array<PositionedCylinder> = new Array<PositionedCylinder>();
        for (const positionedCylinderTmp of this.positionedCylinders) {
            list.push(positionedCylinderTmp);
        }

        // MORE bit z lambdo, ker ni predviden kontekst, lambda pa ga že sama ulovi
        list.sort((a: PositionedCylinder, b: PositionedCylinder) => {
            if ((a.FiringAngle_deg > b.FiringAngle_deg)) {
                return 1;
            } else if ((a.FiringAngle_deg < b.FiringAngle_deg)) {
                return -1;
            } else if ((a.Position > b.Position)) {
                return 1;
            } else if ((a.Position < b.Position)) {
                return -1;
            } else {
                return 0;
            }
        });

        let string: string = '';
        for (let a: number = 0; (a < list.length); a++) {
            if ((a === 0)) {
                string += '[';
            }

            string += list[a].Position.toString();

            if ((a < (list.length - 1))) {
                if ((list[(a + 1)].FiringAngle_deg === list[a].FiringAngle_deg)) {
                    string += ', ';
                } else {
                    string += '] - [';
                }

            } else {
                string += ']';
            }

        }

        return string;
    }

    // Indicates the engine's firing angles (resulting from defined cylinder setups), in degrees per array position, where the array position is the cylinder number (0 = first).
    public get FiringAngles_deg(): Array<number> {
        const firingAngles: Array<number> = new Array<number>();
        for (const positionedCylinder of this.positionedCylinders) {
            if (!positionedCylinder.Cycle.Equals(Cycle.NaN)) {
                firingAngles.push(Mathematics.GetAbsoluteAngle_deg(positionedCylinder.FiringAngle_deg, positionedCylinder.Cycle.RevolutionsToCompleteCycle));
            } else {
                firingAngles.push(Mathematics.GetAbsoluteAngle_deg(positionedCylinder.FiringAngle_deg));
            }

        }

        return firingAngles;
    }

    // Indicates the total number of cylinders in this engine (resulting from defined cylinder setups).
    public get NumberOfCylinders(): number {
        return this.positionedCylinders.length;
    }

    // Indicates the duration, in degrees, of the engine's combined cycle (important when an engine has cylinder with different cycles).
    public get CombinedCycleDuration_deg(): number {
        let double: number = 0;
        for (const positionedCylinder of this.positionedCylinders) {
            if ((positionedCylinder.Cycle.Duration_deg > double)) {
                double = positionedCylinder.Cycle.Duration_deg;
            }

        }

        return double;
    }

    // Indicates the number of revolutions needed to complete the engine's combined cycle.
    public get RevolutionsToCompleteCombinedCycle(): number {
        return (Mathematics.GetFullRotations(this.CombinedCycleDuration_deg));
    }

    // dolzina motorja, brez vztrajnika
    public get Length_mm(): number {
        const minZ: number = 0;
        // najmanjsa dolzina (ce je negativna, se uposteva)
        const firstPositionedCylinder: PositionedCylinder = this.GetFirstPositionedCylinder();
        if ((firstPositionedCylinder !== null)) {

        }

        const maxZ: number = 0;
        // najvecja dolzina
        const lastPositionedCylinder: PositionedCylinder = this.GetLastPositionedCylinder();
        if ((lastPositionedCylinder !== null)) {

        }

        if ((minZ < 0)) {
            return Math.abs((maxZ + Math.abs(minZ)));
        } else {
            return (Math.abs(maxZ) - Math.abs(minZ));
        }

    }
    // 'Public properties'



    // 'Mates'
    public GetMatedPositionedCylinders(): Array<Array<PositionedCylinder>> {
        const allMatedPositionedCylinders: Array<Array<PositionedCylinder>> = new Array<Array<PositionedCylinder>>();

        for (const positionedCylinder of this.positionedCylinders) {
            let skipCylinder: boolean = false;

            // 'ugotovimo ali smo ta cilinder ze obravnavali'
            for (const matedPositionedCylinders of allMatedPositionedCylinders) {
                for (const positionedCylinderTmp of matedPositionedCylinders) {
                    if ((positionedCylinder.Equals(positionedCylinderTmp) === true)) {
                        skipCylinder = true;
                        break;
                    }

                }

                if (skipCylinder === true) {
                    break;
                }
            }
            // 'ugotovimo ali smo ta cilinder ze obravnavali'

            if (skipCylinder === false) {
                const matedPositionedCylinders: Array<PositionedCylinder> = new Array<PositionedCylinder>();

                this.GetMatedPositionedCylindersRecursive(positionedCylinder, matedPositionedCylinders);

                // ce je count 1, pomeni, da ni matanih
                if ((matedPositionedCylinders.length > 1)) {
                    allMatedPositionedCylinders.push(matedPositionedCylinders);
                }
            }
        }

        return allMatedPositionedCylinders;
    }
    private GetMatedPositionedCylindersRecursive(positionedCylinderAsReference: PositionedCylinder, matedPositionedCylinders: Array<PositionedCylinder>) {
        matedPositionedCylinders.push(positionedCylinderAsReference);

        for (const positionedCylinder of this.positionedCylinders) {
            if (positionedCylinder.Position > positionedCylinderAsReference.Position) {
                if (positionedCylinderAsReference.IsMatedWith(positionedCylinder) === true) {
                    this.GetMatedPositionedCylindersRecursive(positionedCylinder, matedPositionedCylinders);
                }
            }
        }
    }
    public GetNonMatedPositionedCylinders(): Array<PositionedCylinder> {
        const allMatedPositionedCylinders: Array<PositionedCylinder> = new Array<PositionedCylinder>();

        const allMatedPositionedCylindersTmp: Array<Array<PositionedCylinder>> = this.GetMatedPositionedCylinders();
        for (const matedPositionedCylinders of allMatedPositionedCylindersTmp) {
            for (const positionedCylinder of matedPositionedCylinders) {
                allMatedPositionedCylinders.push(positionedCylinder);
            }
        }

        const nonMatedPositionedCylinders: Array<PositionedCylinder> = new Array<PositionedCylinder>();
        for (const positionedCylinder of this.positionedCylinders) {
            const boolean: boolean = allMatedPositionedCylinders.some((positionedCylinderTmp: PositionedCylinder) => {
                if (positionedCylinder.Equals(positionedCylinderTmp) === true) {
                    return true;
                } else {
                    return false;
                }
            }, this);

            if (boolean === false) {
                nonMatedPositionedCylinders.push(positionedCylinder);
            }
        }

        return nonMatedPositionedCylinders;
    }
    public IsPositionedCylinderMated(positionedCylinder: PositionedCylinder): boolean {
        const allMatedPositionedCylinders: Array<Array<PositionedCylinder>> = this.GetMatedPositionedCylinders();

        for (const matedPositionedCylinders of allMatedPositionedCylinders) {
            const boolean: boolean = matedPositionedCylinders.some((positionedCylinderTmp: PositionedCylinder) => {
                if (positionedCylinder.Equals(positionedCylinderTmp) === true) {
                    return true;
                } else {
                    return false;
                }
            }, this);

            if (boolean === true) {
                return true;
            }
        }

        return false;
    }
    public GetMatedPositionedCylindersOf(positionedCylinder: PositionedCylinder): Array<PositionedCylinder> {
        const allMatedPositionedCylinders: Array<Array<PositionedCylinder>> = this.GetMatedPositionedCylinders();

        for (const matedPositionedCylinders of allMatedPositionedCylinders) {
            const boolean: boolean = matedPositionedCylinders.some((positionedCylinderTmp: PositionedCylinder) => {
                if (positionedCylinder.Equals(positionedCylinderTmp) === true) {
                    return true;
                } else {
                    return false;
                }
            }, this);

            if (boolean === true) {
                return matedPositionedCylinders;
            }
        }

        return null;
    }

    public GetFirstPositionedCylinder(positionedCylinders?: Array<PositionedCylinder>): PositionedCylinder {
        positionedCylinders = Utilities.ForceValue(positionedCylinders, this.positionedCylinders);

        let currentOffset: number = Number.POSITIVE_INFINITY;
        let currentPositionedCylinder: PositionedCylinder = null;

        for (const positionedCylinder of positionedCylinders) {
            if ((positionedCylinder.Offset_mm < currentOffset)) {
                currentPositionedCylinder = positionedCylinder;
                currentOffset = positionedCylinder.Offset_mm;
            }
        }

        return currentPositionedCylinder;
    }

    public GetLastPositionedCylinder(positionedCylinders?: Array<PositionedCylinder>): PositionedCylinder {
        positionedCylinders = Utilities.ForceValue(positionedCylinders, this.positionedCylinders);

        let currentOffset: number = Number.NEGATIVE_INFINITY;
        let currentPositionedCylinder: PositionedCylinder = null;

        for (const positionedCylinder of positionedCylinders) {
            if ((positionedCylinder.Offset_mm >= currentOffset)) {
                currentPositionedCylinder = positionedCylinder;
                currentOffset = positionedCylinder.Offset_mm;
            }
        }

        return currentPositionedCylinder;
    }

    public GetNextPositionedCylinder(currentPositionedCylinder: PositionedCylinder, positionedCylinders?: Array<PositionedCylinder>): PositionedCylinder {
        positionedCylinders = Utilities.ForceValue(positionedCylinders, this.positionedCylinders);

        // delamo s klonom in sortiramo po poziciji
        const sortedPositionedCylinders: Array<PositionedCylinder> = <Array<PositionedCylinder>>Object.create(positionedCylinders);
        sortedPositionedCylinders.sort(function (a: PositionedCylinder, b: PositionedCylinder) {
            if (a.Position < b.Position) {
                return -1;
            } else if (a.Position === b.Position) {
                return 0;
            } else { // if (a.Position > b.Position)

                return 1;
            }
        });

        for (const sortedPositionedCylinder of sortedPositionedCylinders) {
            if ((sortedPositionedCylinder.Offset_mm > currentPositionedCylinder.Offset_mm)) {
                return sortedPositionedCylinder;
            }
        }

        return null;
    }

    public GetPreviousPositionedCylinder(currentPositionedCylinder: PositionedCylinder, positionedCylinders?: Array<PositionedCylinder>): PositionedCylinder {
        positionedCylinders = Utilities.ForceValue(positionedCylinders, this.positionedCylinders);

        // delamo s klonom in sortiramo po poziciji (obrnjeno)
        const sortedPositionedCylinders: Array<PositionedCylinder> = <Array<PositionedCylinder>>Object.create(positionedCylinders);
        sortedPositionedCylinders.sort(function (a: PositionedCylinder, b: PositionedCylinder) {
            if (a.Position < b.Position) {
                return 1;
            } else if (a.Position === b.Position) {
                return 0;
            } else /* if (a.Position > b.Position) */ {
                return -1;
            }
        });

        for (const sortedPositionedCylinder of sortedPositionedCylinders) {
            if (sortedPositionedCylinder.Offset_mm < currentPositionedCylinder.Offset_mm) {
                return sortedPositionedCylinder;
            }
        }

        return null;
    }
    // 'Mates'

}
