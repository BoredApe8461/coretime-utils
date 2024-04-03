export const VOID_MASK = '0x00000000000000000000'; // hex encoded 80 bit bitmap.
export const COMPLETE_MASK = '0xffffffffffffffffffff'; // hex encoded 80 bit bitmap.

export class CoreMask {
  private mask: string;

  getRaw(): string {
    return this.mask;
  }

  constructor(mask: string) {
    // 10 hex characters plus the '0x' at the start.
    if (isHex(mask) && mask.length === 22) {
      this.mask = mask;
    } else {
      throw new Error('Invalid mask');
    }
  }

  static completeMask(): CoreMask {
    return new CoreMask(COMPLETE_MASK);
  }

  static voidMask(): CoreMask {
    return new CoreMask(VOID_MASK);
  }

  static fromChunk(from: number, to: number): CoreMask {
    if (from < 0 || to >= 80 || from > to) {
      throw new Error('Invalid bit range');
    }

    let mask = 0n;
    for (let i = from; i < to; i++) {
      mask |= 1n << BigInt(79 - i);
    }

    return new CoreMask('0x' + mask.toString(16).padStart(20, '0'));
  }

  static fromBin(bin: string): CoreMask {
    let hexMask = '';
    for (let i = 0; i < bin.length; i += 4) {
      const v = parseInt(bin.slice(i, i + 4), 2);
      hexMask += v.toString(16);
    }
    return new CoreMask(`0x${hexMask}`);
  }

  public countZeros(): number {
    let count = 0;
    for (let i = 2; i < this.mask.length; ++i) {
      let v = parseInt(this.mask.slice(i, i + 1), 16);
      for (let j = 0; j < 4; ++j) {
        if ((v & 1) === 0) ++count;
        v >>= 1;
      }
    }
    return count;
  }

  public countOnes(): number {
    let count = 0;
    for (let i = 2; i < this.mask.length; ++i) {
      let v = parseInt(this.mask.slice(i, i + 1), 16);
      while (v > 0) {
        if (v & 1) ++count;
        v >>= 1;
      }
    }
    return count;
  }

  public toBin(): string {
    let bin = '';
    for (let i = 2; i < this.mask.length; ++i) {
      const v = parseInt(this.mask.slice(i, i + 1), 16);
      for (let j = 3; j >= 0; --j) {
        bin += v & (1 << j) ? '1' : '0';
      }
    }
    return bin;
  }
}

function isHex(str: string) {
  const regex = /^0x[0-9a-fA-F]+$/;
  return regex.test(str);
}
