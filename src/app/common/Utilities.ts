export class Utilities {
    public static get NUMBER(): string {
        return 'number';
    }
    public static get STRING(): string {
        return 'string';
    }



    public static Exists(object: any): boolean {
        if ((object !== null)
            && (object !== undefined)) {
            if (typeof object === Utilities.STRING) {
                if ((<string>object).length > 0) {
                    return true;
                }
            } else {
                return true;
            }
        }

        return false;
    }

    public static ForceValue(object: any, defaultValue: any): any {
        if (Utilities.Exists(object) === false) {
            object = defaultValue;
        }

        return object;
    }

    // TODO:
    public static NewGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    public static GetInterpolatedColor(color1: number, color2: number, interpolationPercentage: number): number {
        if ((interpolationPercentage < 0) || (interpolationPercentage > 1)) {
            throw new Error('prevelik ali premajhen procent');
        }


        const b1 = color1 & 0xFF;
        const g1 = (color1 & 0xFF00) >>> 8;
        const r1 = (color1 & 0xFF0000) >>> 16;
        const a1 = ((color1 & 0xFF000000) >>> 24) / 255;

        const b2 = color2 & 0xFF;
        const g2 = (color2 & 0xFF00) >>> 8;
        const r2 = (color2 & 0xFF0000) >>> 16;
        const a2 = ((color2 & 0xFF000000) >>> 24) / 255;

        const a: number = a2 - a1;
        const r: number = r2 - r1;
        const g: number = g2 - g1;
        const b: number = b2 - b1;

        const interpolatedA: number = a1 + <number>(a * interpolationPercentage);
        const interpolatedR: number = r1 + <number>(r * interpolationPercentage);
        const interpolatedG: number = g1 + <number>(g * interpolationPercentage);
        const interpolatedB: number = b1 + <number>(b * interpolationPercentage);

        const interpolatedColor: number = (interpolatedA << 24) + (interpolatedR << 16) + (interpolatedG << 8) + interpolatedB;
        return interpolatedColor;
    }
    public static GetInterpolatedColorLogaritmic1(color1: number, color2: number, interpolationPercentage: number): number {
        let log: number = Math.abs(Math.log(interpolationPercentage));
        if (isFinite(log) === false) {
            log = 0;
        }

        let logaritmicPercentage: number = interpolationPercentage - log;

        if (logaritmicPercentage < 0) {
            logaritmicPercentage = 0;
        }

        return Utilities.GetInterpolatedColor(color1, color2, logaritmicPercentage);
    }
    public static GetInterpolatedColorLogaritmic2(color1: number, color2: number, interpolationPercentage: number): number {
        let logaritmicPercentage: number = interpolationPercentage + (interpolationPercentage * 0.5);

        if (logaritmicPercentage > 1) {
            logaritmicPercentage = 1;
        }

        return Utilities.GetInterpolatedColor(color1, color2, logaritmicPercentage);
    }

    public static NotImplemented(): void {
        throw new Error('Not implemented.');
    }

    public static GetMin(_array: Array<any>, _callback?: (_element: any) => number, _callbackContext?: any): number {
        let _let: number = Number.POSITIVE_INFINITY;

        if (_callback) {
            for (const _elementTmp of _array) {
                const _letTmp: number = _callback.call(_callbackContext, _elementTmp);
                if (_letTmp <= _let) {
                    _let = _letTmp;
                }
            }
        } else {
            for (const _elementTmp of _array) {
                if (_elementTmp <= _let) {
                    _let = _elementTmp;
                }
            }
        }

        return _let;
    }

    public static GetMax(_array: Array<any>, _callback?: (_element: any) => number, _callbackContext?: any): number {
        let _let: number = Number.NEGATIVE_INFINITY;

        if (_callback) {
            for (const _elementTmp of _array) {
                const _letTmp: number = _callback.call(_callbackContext, _elementTmp);
                if (_letTmp >= _let) {
                    _let = _letTmp;
                }
            }
        } else {
            for (const _elementTmp of _array) {
                if (_elementTmp >= _let) {
                    _let = _elementTmp;
                }
            }
        }

        return _let;
    }

}
