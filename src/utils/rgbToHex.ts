interface RgbToHexType {
    r: number;
    g: number;
    b: number;
}

export default function rgbToHex({ r, g, b }: RgbToHexType): string {
    return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}
