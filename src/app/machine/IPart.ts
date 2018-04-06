import { IComparable } from './IComparable';

export interface IPart extends IComparable {
    Guid: string;

    Width: number;
    Height: number;
    Length: number;

    Bound_X_Min: number;
    Bound_Y_Min: number;
    Bound_Z_Min: number;
    Bound_X_Max: number;
    Bound_Y_Max: number;
    Bound_Z_Max: number;


    Validate(): void;

    // event IPartDelegate Validated;

    Equals(ipart: IPart): boolean;

}

