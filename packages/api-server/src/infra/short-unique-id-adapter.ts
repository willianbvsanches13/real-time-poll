import ShortUniqueID from 'short-unique-id';
import { UniqueIdGenerator } from "@/data/protocols/unique-id-generator";

export class ShortUniqueIdAdapter implements UniqueIdGenerator {
  generate(): string {
    const { randomUUID } = new ShortUniqueID({ length: 10 });
    return randomUUID();
  }
}
