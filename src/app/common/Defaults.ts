export class Defaults {
    public static get BlackColor(): number {
        return 0x000000;
    }
    public static get GrayColor(): number {
        return 0xa9a9a9; // DarkGray
    }
    public static get RedColor(): number {
        return 0xff0000;
    }
    public static get LightRedColor(): number {
        return 0xffa07a; // LightSalmon
    }
    public static get GreenColor(): number {
        return 0x008000;
    }
    public static get LightGreenColor(): number {
        return 0x98fb98; // PaleGreen
    }
    public static get IntakeColor(): number {
        return 0xafeeee; // PaleTurquoise
    }
    public static get CompressionColor(): number {
        return 0xd8bfd8; // Thistle
    }
    public static get CombustionColor(): number {
        return 0xffb6c1; // LightPink
    }
    public static get ExhaustColor(): number {
        return 0xd3d3d3; // LightGray
    }
    public static get WashCompressionColor(): number {
        return 0xda70d6; // Orchid
    }
    public static get CombustionExhaustColor(): number {
        return 0xffdab9; // PeachPuff
    }

    public static get SelectedIPartColor(): number {
        return 0x4169e1; // RoyalBlue
    }

    public static get CylinderSegments(): number {
        return 32;
    }
    public static get SphereSegments(): number {
        return 32;
    }

    public static get FoV(): number {
        return 75;
    }
    public static get NearPlane(): number {
        return 0.1;
    }
    public static get FarPlane(): number {
        return 10000;
    }
    public static get RendererBackgroundColor(): number {
        return 0xf8f8f8; // LightGray
    }
    public static get ZoomSpeed(): number {
        return 1;
    }
    public static get RotateSpeed(): number {
        return 1;
    }
    public static get CameraDistance(): number {
        return 1000;
    }
    public static get ShowAxesHelper(): boolean {
        return true;
    }

}
