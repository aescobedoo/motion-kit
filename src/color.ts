export const lerpColor = (a: string, b: string, t: number): string => {
  const toRgb = (hex: string) => {
    const value = Number.parseInt(hex.slice(1), 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
  };
  const from = toRgb(a);
  const to = toRgb(b);
  const mixed = from.map((value, index) => Math.round(value + (to[index] - value) * t));
  return `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`;
};
