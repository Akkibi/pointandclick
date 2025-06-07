const hexDistance = (hex1: string, hex2: string, distance: number) => {
    console.log(hex1, hex2, hex1 === hex2);
    if (hex1 === hex2) return true;
    const r1 = parseInt(hex1.slice(1, 3), 16);
    const g1 = parseInt(hex1.slice(3, 5), 16);
    const b1 = parseInt(hex1.slice(5, 7), 16);

    const r2 = parseInt(hex2.slice(1, 3), 16);
    const g2 = parseInt(hex2.slice(3, 5), 16);
    const b2 = parseInt(hex2.slice(5, 7), 16);

    const r = Math.abs(r1 - r2);
    const g = Math.abs(g1 - g2);
    const b = Math.abs(b1 - b2);

    const isInRange = r <= distance && g <= distance && b <= distance;

    return isInRange;
};

export default hexDistance;
