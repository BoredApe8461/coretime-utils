import { Instruction } from "./common";

export class InstructionCodec {
  serialize(instruction: Instruction): string {
    switch (instruction.kind) {
        case 'Partition':
            return `PARTITION(${instruction.pivot},${instruction.ownPart})`;
        case 'Interlace':
            return `INTERLACE(${instruction.ownMask})`;
    }
  }

  deserialize(rawInstruction: string): Instruction {
    const parts = rawInstruction.split('(');
    const kind = parts[0].trim();
    const args = parts[1].trim().slice(0, -1); // Remove the closing parenthesis

    switch (kind) {
        case 'PARTITION':
            const [pivot, ownPart] = args.split(',').map(x => parseInt(x.trim()));
            return { kind: 'Partition', pivot, ownPart: ownPart as 0 | 1 };
        case 'INTERLACE':
            const ownMask = args.trim();
            return { kind: 'Interlace', ownMask };
        default:
            throw new Error(`Unknown instruction: ${kind}`);
    }
  }
}
