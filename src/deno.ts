const CHARACTER_VALUES: [number, string][] = [
  [200, "🫂"],
  [50, "💖"],
  [10, "✨"],
  [5, "🥺"],
  [1, ","],
  [0, "❤️"],
];
const SECTION_SEPERATOR = "👉👈";
const FINAL_TERMINATOR = new RegExp(`(${SECTION_SEPERATOR})?$`);

interface TextEncoderType {
  encode: (input?: string) => Uint8Array;
}

function textEncoder(): TextEncoderType {
  return new TextEncoder();
}

function encodeChar(charValue: number): string {
  if (charValue === 0) return "";
  let [val, currentCase]: [number, string] =
    CHARACTER_VALUES.find(([val]) => charValue >= val) || CHARACTER_VALUES[-1];
  return `${currentCase}${encodeChar(charValue - val)}`;
}

export function encode(value: string): string {
  return Array.from(textEncoder().encode(value))
    .map((v: number) => encodeChar(v) + SECTION_SEPERATOR)
    .join("");
}

export function decode(value: string): string {
  return String.fromCodePoint(
    ...value
      .trim()
      .replace(FINAL_TERMINATOR, "")
      .split(SECTION_SEPERATOR)
      .map((letters) => {
        return Array.from(letters)
          .map((character) => {
            let [value, emoji]: [number, string] =
              CHARACTER_VALUES.find(([_, em]) => em == character) ||
              CHARACTER_VALUES[-1];
            if (!emoji) {
              throw new TypeError(`Invalid bottom text: '${value}'`);
            }
            return value;
          })
          .reduce((p, c) => p + c);
      })
  );
}
