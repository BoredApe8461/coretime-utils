import { COMPLETE_MASK, VOID_MASK, completeMask, countMaskOnes, countMaskZeros, maskFromBin, maskFromChunk, maskToBin, voidMask } from '../src';

describe('CoreMask utils work', () => {
  test('fromChunk works', () => {
    expect(maskFromChunk(40, 60)).toEqual('0x0000000000fffff00000');
  });

  test('fromBin works', () => {
    expect(
      maskFromBin(
        '11111111111111111111111111111111111111111111111111111111111111111111111111111111',
      ),
    ).toEqual(COMPLETE_MASK);

    expect(
     maskFromBin(
        '00000000000000000000000000000000000000000000000000000000000000000000000000000000',
      ),
    ).toEqual(VOID_MASK);
  });

  test('countOnes works', () => {
    const _voidMask = voidMask();
    const _completeMask = completeMask();
    const _customMask = maskFromChunk(0, 20);
    expect(countMaskOnes(_voidMask)).toEqual(0);
    expect(countMaskOnes(_completeMask)).toEqual(80);
    expect(countMaskOnes(_customMask)).toEqual(20);
  });

  test('countZeros works', () => {
    const _voidMask = voidMask();
    const _completeMask = completeMask();
    const _customMask = maskFromChunk(0, 20);
    expect(countMaskZeros(_voidMask)).toEqual(80);
    expect(countMaskZeros(_completeMask)).toEqual(0);
    expect(countMaskZeros(_customMask)).toEqual(60);
  });

  test('toBin works', () => {
    const _voidMask = voidMask();
    const _completeMask = completeMask();
    const _customMask = maskFromChunk(0, 5);
    expect(maskToBin(_voidMask)).toEqual(
      '00000000000000000000000000000000000000000000000000000000000000000000000000000000',
    );
    expect(maskToBin(_completeMask)).toEqual(
      '11111111111111111111111111111111111111111111111111111111111111111111111111111111',
    );
    expect(maskToBin(_customMask)).toEqual(
      '11111000000000000000000000000000000000000000000000000000000000000000000000000000',
    );
  });
});
