export const VOID_MASK = '0x00000000000000000000'; // hex encoded 80 bit bitmap.
export const COMPLETE_MASK = '0xffffffffffffffffffff'; // hex encoded 80 bit bitmap.

export function completeMask(): string {
  return COMPLETE_MASK;
}

export function voidMask(): string {
  return VOID_MASK;
}

export function maskFromChunk(from: number, to: number): string {
  if (from < 0 || to >= 80 || from > to) {
    throw new Error('Invalid bit range');
  }

  let mask = 0n;
  for (let i = from; i < to; i++) {
    mask |= 1n << BigInt(79 - i);
  }

  return '0x' + mask.toString(16).padStart(20, '0');
}

export function countMaskZeros(mask: string): number {
  let count = 0;
  for (let i = 2; i < mask.length; ++i) {
    let v = parseInt(mask.slice(i, i + 1), 16);
    for (let j = 0; j < 4; ++j) {
      if ((v & 1) === 0) ++count;
      v >>= 1;
    }
  }
  return count; 
}

export function countMaskOnes(mask: string): number {
  let count = 0;
  for (let i = 2; i < mask.length; ++i) {
    let v = parseInt(mask.slice(i, i + 1), 16);
    while (v > 0) {
      if (v & 1) ++count;
      v >>= 1;
    }
  }
  return count;
}

export function maskToBin(mask: string): string {
  let bin = '';
  for (let i = 2; i < mask.length; ++i) {
    const v = parseInt(mask.slice(i, i + 1), 16);
    for (let j = 3; j >= 0; --j) {
      bin += v & (1 << j) ? '1' : '0';
    }
  }
  return bin;
}

export function maskFromBin(bin: string): string {
  let hexMask = '';
  for (let i = 0; i < bin.length; i += 4) {
    const v = parseInt(bin.slice(i, i + 4), 2);
    hexMask += v.toString(16);
  }
  return `0x${hexMask}`;
}
