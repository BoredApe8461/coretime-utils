import { CoreMask, COMPLETE_MASK, VOID_MASK } from '../src';

describe('CoreMask utils work', () => {
  test('constructor works', () => {
    expect(() => new CoreMask(COMPLETE_MASK)).not.toThrow();
    expect(() => new CoreMask(VOID_MASK)).not.toThrow();
    expect(() => new CoreMask('foo')).toThrow();
    expect(() => new CoreMask(VOID_MASK + '0')).toThrow();
  });

  test('fromChunk works', () => {
    expect(CoreMask.fromChunk(40, 60).getRaw()).toEqual('0x0000000000fffff00000');
  });

  test('fromBin works', () => {
    expect(
      CoreMask.fromBin(
        '11111111111111111111111111111111111111111111111111111111111111111111111111111111',
      ).getRaw(),
    ).toEqual(COMPLETE_MASK);

    expect(
      CoreMask.fromBin(
        '00000000000000000000000000000000000000000000000000000000000000000000000000000000',
      ).getRaw(),
    ).toEqual(VOID_MASK);
  });

  test('countOnes works', () => {
    expect(CoreMask.voidMask().countOnes()).toEqual(0);
    expect(CoreMask.completeMask().countOnes()).toEqual(80);
    expect(CoreMask.fromChunk(0, 20).countOnes()).toEqual(20);
  });

  test('countZeros works', () => {
    expect(CoreMask.voidMask().countZeros()).toEqual(80);
    expect(CoreMask.completeMask().countZeros()).toEqual(0);
    expect(CoreMask.fromChunk(0, 20).countZeros()).toEqual(60);
  });

  test('toBin works', () => {
    expect(CoreMask.voidMask().toBin()).toEqual(
      '00000000000000000000000000000000000000000000000000000000000000000000000000000000',
    );
    expect(CoreMask.completeMask().toBin()).toEqual(
      '11111111111111111111111111111111111111111111111111111111111111111111111111111111',
    );
    expect(CoreMask.fromChunk(0, 5).toBin()).toEqual(
      '11111000000000000000000000000000000000000000000000000000000000000000000000000000',
    );
  });
});
