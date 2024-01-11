export type CoreMask = string;

export const FULL_MASK = "0xFFFFFFFFFFFFFFFFFFFF"; // hex encoded 80 bit bitmap.
export const HALF_FULL_MASK = "0xFFFFFFFFFF0000000000"; // hex encoded 80 bit bitmap.

export type Instruction =
  | { kind: 'Partition'; pivot: number; ownPart: 0 | 1 }
  | { kind: 'Interlace'; ownMask: CoreMask };