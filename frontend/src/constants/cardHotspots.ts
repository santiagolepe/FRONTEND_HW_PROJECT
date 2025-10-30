import { CardType } from "../types";

export const SPRITE_W = 237;
export const SPRITE_H = 42;
export const ROW_H = 21;

// helper: left edge of a 6-column grid (roughly evenly spaced)
const colLeft = (i: number) => Math.round((SPRITE_W / 6) * i);

export const cardHotspots: Record<CardType, { left: number; width: number }> = {
  star: { left: colLeft(0) + 2, width: 35 },
  plus: { left: colLeft(1) + 2, width: 35 },
  amex: { left: colLeft(2) + 2, width: 34 },
  mastercard: { left: colLeft(3) + 2, width: 36 },
  discover: { left: colLeft(4) + 2, width: 36 },
  visa: { left: colLeft(5), width: 40 }
};
