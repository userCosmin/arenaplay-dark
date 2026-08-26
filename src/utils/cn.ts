type ClassValue = string | number | null | boolean | undefined | ClassValue[];

function flatten(input: ClassValue[], out: string[]): void {
  for (const item of input) {
    if (!item) continue;
    if (Array.isArray(item)) {
      flatten(item, out);
    } else {
      out.push(String(item));
    }
  }
}

/** Lightweight className combiner (no external dependency needed). */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  flatten(inputs, out);
  return out.join(' ');
}
