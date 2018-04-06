// Provides functionality for conversions between different quantities.
export class Conversions {
    // Gets radians from degrees.
    public static DegToRad(deg: number): number {
        const oneRadian: number = (Math.PI / 180);
        return (oneRadian * deg);
    }

    // Gets degrees from radians.
    public static RadToDeg(rad: number): number {
        const oneDegree: number = (180 / Math.PI);
        return (oneDegree * rad);
    }

    // Gets rotations per second from rotations per minute.
    public static RpmToRps(rpm: number): number {
        return (rpm / 60);
    }

    // Gets rotations per minute from rotations per seconds.
    public static RpsToRpm(rps: number): number {
        return (rps * 60);
    }

    // Gets kilograms from grams.
    public static GToKg(g: number): number {
        return (g / 1000);
    }

    // Gets grams from kilograms.
    public static KgToG(Kg: number): number {
        return (Kg * 1000);
    }

    // Gets meters from millimeters.
    public static MmToM(mm: number): number {
        return mm / 1000;
    }

    // Gets millimeters from meters.
    public static MToMM(m: number): number {
        return m * 1000;
    }

    // Gets cubic centimeters from cubic millimeters.
    public static Mm3ToCm3(mm3: number): number {
        return mm3 / 1000;
    }

    // Gets the cubic millimeters from cubic centimeters.
    public static Cm3ToMm3(cm3: number): number {
        return cm3 * 1000;
    }

    // Gets square meters from square millimeters.
    public static Mm2ToM2(mm2: number): number {
        return mm2 / 1000000;
    }

    // Gets square millimeters from square meters.
    public static M2ToMM2(m2: number): number {
        return m2 * 1000000;
    }

    // Gets the angular velocity, in degrees per second.
    public static RpmToDegps(rpm: number): number {
        const radians: number = ((2 * Math.PI) * Conversions.RpmToRps(rpm));
        return Conversions.RadToDeg(radians);
    }

    // Gets the rotations per minute.
    public static DegspsToRpm(angularVelocitydegps: number): number {
        const rps: number = (Conversions.DegToRad(angularVelocitydegps) / (2 * Math.PI));
        return Conversions.RpsToRpm(rps);
    }


    public static get HalfPiRad(): number {
        return 1.5708;
    }
}
