const CHARACTER_VALUES = {
  200: "🫂",
  50: "💖",
  10: "✨",
  5: "🥺",
  1: ",",
  0: "❤️",
};
const CHARACTER_VALUES_MAP = Object.entries(CHARACTER_VALUES).reverse();
const VALUES_CHARACTER = CHARACTER_VALUES_MAP.reduce(
  (obj, item) => (obj[item[1]] = item[0]) && obj,
  {}
);
const SECTION_SEPERATOR = "👉👈";
const FINAL_TERMINATOR = new RegExp(`(${SECTION_SEPERATOR})?$`);

export function encode(value: string): string {
  let input = Array.from(value).map((v) => v.codePointAt(0));
  let output = [];

  for (let char of input) {
    while (char !== 0) {
      for (let [value, emoji] of CHARACTER_VALUES_MAP) {
        let parsedValue = parseInt(value);
        if (char >= parsedValue) {
          char -= parsedValue;
          output.push(emoji);
          break;
        }
      }
    }
    output.push(SECTION_SEPERATOR);
  }

  return output.join("");
}

export function decode(value: string): string {
  let input: string[] = value
    .trim()
    .replace(FINAL_TERMINATOR, "")
    .split(SECTION_SEPERATOR);
  let output = [];

  if (
    Array.from(value).some(
      (v) =>
        !(
          Object.keys(VALUES_CHARACTER).includes(v) ||
          SECTION_SEPERATOR.includes(v)
        )
    )
  ) {
    throw TypeError(`Invalid bottom text: '${value}'`);
  }

  input.forEach((word) => {
    let codepoint = 0;
    Array.from(word).forEach((char) => {
      codepoint += parseInt(VALUES_CHARACTER[char]);
    });
    output.push(codepoint);
  });

  return String.fromCodePoint(...output);
}
