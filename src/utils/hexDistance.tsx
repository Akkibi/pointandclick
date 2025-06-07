const hexDistance = (hex1: string, hex2: string, distance: number) => {
    console.log(hex1, hex2, hex1 === hex2);
    if (hex1 === hex2) return true;
    const r1 = parseInt(hex1.slice(0, 2), 16);
    const g1 = parseInt(hex1.slice(2, 4), 16);
    const b1 = parseInt(hex1.slice(4, 6), 16);

    const r2 = parseInt(hex2.slice(0, 2), 16);
    const g2 = parseInt(hex2.slice(2, 4), 16);
    const b2 = parseInt(hex2.slice(4, 6), 16);

    const r = Math.abs(r1 - r2);
    const g = Math.abs(g1 - g2);
    const b = Math.abs(b1 - b2);

    return r <= distance && g <= distance && b <= distance;
};

export default hexDistance;
