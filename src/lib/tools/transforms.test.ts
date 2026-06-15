import { describe, it, expect } from "vitest";
import {
  toUpperCase,
  toLowerCase,
  capitalize,
  toSentenceCase,
  toTitleCase,
  toAlternatingCase,
  toInverseCase,
  removeExtraSpaces,
  strikethrough,
  toUnderline,
  toBold,
  toItalic,
  toWide,
  toSmallCaps,
  reverse,
  toMirror,
  toUpsideDown,
  toMorse,
  fromMorse,
  toMorseAuto,
  toBinary,
  fromBinary,
  toBinaryAuto,
  toInvisibleText,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toConstantCase,
  toKebabCase,
  toDotCase,
  toPathCase,
  countWords,
  countLines,
} from "./transforms";

describe("toUpperCase", () => {
  it("converts lowercase to uppercase", () => {
    expect(toUpperCase("hello")).toBe("HELLO");
  });

  it("preserves already uppercase text", () => {
    expect(toUpperCase("HELLO")).toBe("HELLO");
  });

  it("handles mixed case", () => {
    expect(toUpperCase("Hello World")).toBe("HELLO WORLD");
  });

  it("handles empty string", () => {
    expect(toUpperCase("")).toBe("");
  });

  it("handles special characters", () => {
    expect(toUpperCase("café 123!")).toBe("CAFÉ 123!");
  });
});

describe("toLowerCase", () => {
  it("converts uppercase to lowercase", () => {
    expect(toLowerCase("HELLO")).toBe("hello");
  });

  it("preserves already lowercase text", () => {
    expect(toLowerCase("hello")).toBe("hello");
  });

  it("handles mixed case", () => {
    expect(toLowerCase("Hello World")).toBe("hello world");
  });

  it("handles empty string", () => {
    expect(toLowerCase("")).toBe("");
  });

  it("handles special characters", () => {
    expect(toLowerCase("CAFÉ 123!")).toBe("café 123!");
  });
});

describe("capitalize", () => {
  it("capitalizes first letter of each word", () => {
    expect(capitalize("hello world")).toBe("Hello World");
  });

  it("lowercases remaining letters", () => {
    expect(capitalize("hELLO wORLD")).toBe("Hello World");
  });

  it("handles single word", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });

  it("handles multiple spaces between words", () => {
    expect(capitalize("hello   world")).toBe("Hello   World");
  });

  it("handles leading and trailing spaces", () => {
    expect(capitalize("  hello world  ")).toBe("  Hello World  ");
  });
});

describe("toSentenceCase", () => {
  it("capitalizes first letter", () => {
    expect(toSentenceCase("hello world")).toBe("Hello world");
  });

  it("lowercases all but the first letter of each sentence", () => {
    expect(toSentenceCase("HELLO WORLD")).toBe("Hello world");
  });

  it("handles single word", () => {
    expect(toSentenceCase("hELLO")).toBe("Hello");
  });

  it("handles empty string", () => {
    expect(toSentenceCase("")).toBe("");
  });

  it("handles already sentence-cased text", () => {
    expect(toSentenceCase("Hello world")).toBe("Hello world");
  });

  it("handles leading spaces", () => {
    expect(toSentenceCase("  hello world")).toBe("  Hello world");
  });
});

describe("toTitleCase", () => {
  it("capitalizes major words in English", () => {
    expect(toTitleCase("the lord of the rings", "en")).toBe("The Lord of the Rings");
  });

  it("capitalizes first and last word even if stop words", () => {
    expect(toTitleCase("the power of the", "en")).toBe("The Power of The");
  });

  it("handles Portuguese stop words", () => {
    expect(toTitleCase("o senhor dos anéis", "pt")).toBe("O Senhor dos Anéis");
  });

  it("handles Spanish stop words", () => {
    expect(toTitleCase("el señor de los anillos", "es")).toBe("El Señor de los Anillos");
  });

  it("handles empty string", () => {
    expect(toTitleCase("")).toBe("");
  });

  it("defaults to English stop words", () => {
    expect(toTitleCase("a tale of two cities")).toBe("A Tale of Two Cities");
  });
});

describe("toAlternatingCase", () => {
  it("alternates case starting with uppercase", () => {
    expect(toAlternatingCase("hello")).toBe("HeLlO");
  });

  it("ignores non-letter characters in alternation", () => {
    expect(toAlternatingCase("a b")).toBe("A b");
  });

  it("handles empty string", () => {
    expect(toAlternatingCase("")).toBe("");
  });

  it("full phrase", () => {
    expect(toAlternatingCase("convert text easy")).toBe("CoNvErT tExT eAsY");
  });
});

describe("toInverseCase", () => {
  it("inverts case of each letter", () => {
    expect(toInverseCase("Hello World")).toBe("hELLO wORLD");
  });

  it("handles all uppercase", () => {
    expect(toInverseCase("HELLO")).toBe("hello");
  });

  it("handles all lowercase", () => {
    expect(toInverseCase("hello")).toBe("HELLO");
  });

  it("preserves non-alphabetic characters", () => {
    expect(toInverseCase("AbC 123!")).toBe("aBc 123!");
  });

  it("handles empty string", () => {
    expect(toInverseCase("")).toBe("");
  });
});

describe("removeExtraSpaces", () => {
  it("removes multiple spaces", () => {
    expect(removeExtraSpaces("hello   world")).toBe("hello world");
  });

  it("trims leading and trailing spaces", () => {
    expect(removeExtraSpaces("  hello world  ")).toBe("hello world");
  });

  it("collapses tabs and spaces into single spaces per line", () => {
    expect(removeExtraSpaces("hello\t\tworld\n\nfoo")).toBe("hello world\nfoo");
  });

  it("handles empty string", () => {
    expect(removeExtraSpaces("")).toBe("");
  });

  it("handles whitespace-only string", () => {
    expect(removeExtraSpaces("   ")).toBe("");
  });

  it("preserves single spaces", () => {
    expect(removeExtraSpaces("hello world foo")).toBe("hello world foo");
  });
});

describe("strikethrough", () => {
  it("adds combining character to each visible character", () => {
    const result = strikethrough("AB");
    expect(result).toBe("A\u0336B\u0336");
  });

  it("preserves spaces without overlay", () => {
    const result = strikethrough("A B");
    expect(result).toBe("A\u0336 B\u0336");
  });

  it("handles empty string", () => {
    expect(strikethrough("")).toBe("");
  });
});

describe("toUnderline", () => {
  it("adds combining underline to each visible character", () => {
    const result = toUnderline("AB");
    expect(result).toBe("A\u0332B\u0332");
  });

  it("preserves spaces without overlay", () => {
    const result = toUnderline("A B");
    expect(result).toBe("A\u0332 B\u0332");
  });

  it("handles empty string", () => {
    expect(toUnderline("")).toBe("");
  });
});

describe("toBold", () => {
  it("converts letters to bold Unicode", () => {
    const result = toBold("ABC");
    expect(result).toBe("𝐀𝐁𝐂");
  });

  it("handles mixed characters", () => {
    const result = toBold("Abc");
    expect([...result].length).toBe(3);
  });

  it("handles empty string", () => {
    expect(toBold("")).toBe("");
  });
});

describe("toItalic", () => {
  it("converts letters to italic Unicode", () => {
    const result = toItalic("ABC");
    expect(result).not.toBe("ABC");
  });

  it("handles empty string", () => {
    expect(toItalic("")).toBe("");
  });
});

describe("toWide", () => {
  it("converts ASCII to fullwidth", () => {
    const result = toWide("ABC");
    expect(result).toBe("\uFF21\uFF22\uFF23");
  });

  it("converts space to ideographic space", () => {
    const result = toWide("A B");
    expect(result).toBe("\uFF21\u3000\uFF22");
  });

  it("handles empty string", () => {
    expect(toWide("")).toBe("");
  });

  it("leaves non-ASCII characters unchanged", () => {
    expect(toWide("á")).toBe("á");
  });
});

describe("toSmallCaps", () => {
  it("converts common letters to small caps", () => {
    const result = toSmallCaps("Hello");
    expect(result).not.toBe("Hello");
    expect(result.length).toBe(5);
  });

  it("handles empty string", () => {
    expect(toSmallCaps("")).toBe("");
  });
});

describe("reverse", () => {
  it("reverses string", () => {
    expect(reverse("hello")).toBe("olleh");
  });

  it("handles empty string", () => {
    expect(reverse("")).toBe("");
  });

  it("handles palindrome", () => {
    expect(reverse("radar")).toBe("radar");
  });
});

describe("toMirror", () => {
  it("reverses and mirrors text", () => {
    const result = toMirror("abc");
    expect(result.length).toBe(3);
  });

  it("handles empty string", () => {
    expect(toMirror("")).toBe("");
  });
});

describe("toUpsideDown", () => {
  it("reverses and flips text", () => {
    const result = toUpsideDown("hello");
    expect(result.length).toBe(5);
  });

  it("handles empty string", () => {
    expect(toUpsideDown("")).toBe("");
  });
});

describe("toMorse / fromMorse", () => {
  it("converts text to Morse code", () => {
    expect(toMorse("SOS")).toBe("... --- ...");
  });

  it("converts Morse code to text", () => {
    expect(fromMorse("... --- ...")).toBe("SOS");
  });

  it("handles spaces between words", () => {
    expect(toMorse("HELLO WORLD")).toBe(".... . .-.. .-.. --- / .-- --- .-. .-.. -..");
  });

  it("handles empty string", () => {
    expect(toMorse("")).toBe("");
    expect(fromMorse("")).toBe("");
  });
});

describe("toMorseAuto", () => {
  it("detects text and converts to Morse", () => {
    expect(toMorseAuto("SOS")).toBe("... --- ...");
  });

  it("detects Morse and converts to text", () => {
    expect(toMorseAuto("... --- ...")).toBe("SOS");
  });
});

describe("toBinary / fromBinary", () => {
  it("converts text to binary", () => {
    const result = toBinary("A");
    expect(result).toBe("01000001");
  });

  it("converts binary to text", () => {
    expect(fromBinary("01000001")).toBe("A");
  });

  it("handles multiple characters", () => {
    const result = toBinary("AB");
    expect(result.split(" ")).toHaveLength(2);
  });

  it("handles empty string", () => {
    expect(toBinary("")).toBe("");
    expect(fromBinary("")).toBe("");
  });
});

describe("toBinaryAuto", () => {
  it("detects text and converts to binary", () => {
    const result = toBinaryAuto("AB");
    expect(result).toContain(" ");
  });

  it("detects binary and converts to text", () => {
    expect(toBinaryAuto("01000001 01000010")).toBe("AB");
  });
});

describe("toInvisibleText", () => {
  it("generates invisible characters", () => {
    const result = toInvisibleText("hello");
    expect(result.length).toBe(5);
    expect(result.replace(/\u200B/g, "")).toBe("");
  });

  it("generates at least one char for empty input", () => {
    const result = toInvisibleText("");
    expect(result.length).toBeGreaterThan(0);
  });

  it("preserves spaces", () => {
    const result = toInvisibleText("a b");
    expect(result).toContain(" ");
  });
});

describe("toCamelCase", () => {
  it("converts to camelCase", () => {
    expect(toCamelCase("hello world")).toBe("helloWorld");
  });

  it("handles multiple words", () => {
    expect(toCamelCase("convert text easy")).toBe("convertTextEasy");
  });

  it("strips special characters", () => {
    expect(toCamelCase("hello-world!")).toBe("helloWorld");
  });

  it("handles empty string", () => {
    expect(toCamelCase("")).toBe("");
  });
});

describe("toPascalCase", () => {
  it("converts to PascalCase", () => {
    expect(toPascalCase("hello world")).toBe("HelloWorld");
  });

  it("handles multiple words", () => {
    expect(toPascalCase("convert text easy")).toBe("ConvertTextEasy");
  });

  it("handles empty string", () => {
    expect(toPascalCase("")).toBe("");
  });
});

describe("toSnakeCase", () => {
  it("converts to snake_case", () => {
    expect(toSnakeCase("hello world")).toBe("hello_world");
  });

  it("handles multiple words", () => {
    expect(toSnakeCase("convert text easy")).toBe("convert_text_easy");
  });

  it("handles empty string", () => {
    expect(toSnakeCase("")).toBe("");
  });
});

describe("toConstantCase", () => {
  it("converts to CONSTANT_CASE", () => {
    expect(toConstantCase("hello world")).toBe("HELLO_WORLD");
  });

  it("handles multiple words", () => {
    expect(toConstantCase("convert text easy")).toBe("CONVERT_TEXT_EASY");
  });

  it("handles empty string", () => {
    expect(toConstantCase("")).toBe("");
  });
});

describe("toKebabCase", () => {
  it("converts to kebab-case", () => {
    expect(toKebabCase("hello world")).toBe("hello-world");
  });

  it("removes accents", () => {
    expect(toKebabCase("café au lait")).toBe("cafe-au-lait");
  });

  it("removes special characters", () => {
    expect(toKebabCase("Convert Text Easy!")).toBe("convert-text-easy");
  });

  it("removes duplicate hyphens", () => {
    expect(toKebabCase("hello - world")).toBe("hello-world");
  });

  it("trims hyphens at edges", () => {
    expect(toKebabCase(" hello world ")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(toKebabCase("")).toBe("");
  });
});

describe("toDotCase", () => {
  it("converts to dot.case", () => {
    expect(toDotCase("hello world")).toBe("hello.world");
  });

  it("handles multiple words", () => {
    expect(toDotCase("convert text easy")).toBe("convert.text.easy");
  });

  it("handles empty string", () => {
    expect(toDotCase("")).toBe("");
  });
});

describe("toPathCase", () => {
  it("converts to path/case", () => {
    expect(toPathCase("hello world")).toBe("hello/world");
  });

  it("handles multiple words", () => {
    expect(toPathCase("convert text easy")).toBe("convert/text/easy");
  });

  it("handles empty string", () => {
    expect(toPathCase("")).toBe("");
  });
});

describe("countWords", () => {
  it("counts words in a simple sentence", () => {
    expect(countWords("hello world")).toBe(2);
  });

  it("handles empty string", () => {
    expect(countWords("")).toBe(0);
  });

  it("handles whitespace-only string", () => {
    expect(countWords("   ")).toBe(0);
  });

  it("counts single word", () => {
    expect(countWords("hello")).toBe(1);
  });

  it("handles multiple spaces between words", () => {
    expect(countWords("hello   world   foo")).toBe(3);
  });

  it("handles leading and trailing spaces", () => {
    expect(countWords("  hello world  ")).toBe(2);
  });

  it("handles tabs and newlines", () => {
    expect(countWords("hello\tworld\nfoo")).toBe(3);
  });
});

describe("countLines", () => {
  it("counts lines in a single line", () => {
    expect(countLines("hello world")).toBe(1);
  });

  it("counts lines with newlines", () => {
    expect(countLines("line1\nline2\nline3")).toBe(3);
  });

  it("handles empty string", () => {
    expect(countLines("")).toBe(0);
  });

  it("ignores trailing newline", () => {
    expect(countLines("hello\n")).toBe(1);
  });

  it("handles trailing spaces before newline", () => {
    expect(countLines("hello  \nworld")).toBe(2);
  });
});
