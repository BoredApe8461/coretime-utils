import { FULL_MASK, Instruction } from '../src/common';
import { InstructionCodec } from '../src/instruction';

describe('InstructionCodec works', () => {
  describe("Parsing works", () => {
    test('parses a Partition instruction correctly', () => {
        const codec = new InstructionCodec();
        const result = codec.deserialize('PARTITION(5,1)');
        expect(result).toEqual({ kind: 'Partition', pivot: 5, ownPart: 1 });
    });

    test('parses an Interlace instruction correctly', () => {
        const codec = new InstructionCodec();
        const result = codec.deserialize(`INTERLACE(${FULL_MASK})`);
        expect(result).toEqual({ kind: 'Interlace', ownMask: FULL_MASK });
    });

    test('throws an error for unknown instruction kind', () => {
        const codec = new InstructionCodec();
        expect(() => codec.deserialize('UNKNOWN(1,2)')).toThrow('Unknown instruction');
    });
  });

  describe("Serialization works", () => {
    test('serializes a Partition instruction correctly', () => {
        const codec = new InstructionCodec();
        const instruction: Instruction = { kind: 'Partition', pivot: 5, ownPart: 1 };
        expect(codec.serialize(instruction)).toEqual('PARTITION(5,1)');
      });
    
      test('serializes an Interlace instruction correctly', () => {
        const codec = new InstructionCodec();
        const instruction: Instruction = { kind: 'Interlace', ownMask: FULL_MASK };
        expect(codec.serialize(instruction)).toEqual(`INTERLACE(${FULL_MASK})`);
      });
  });
});
