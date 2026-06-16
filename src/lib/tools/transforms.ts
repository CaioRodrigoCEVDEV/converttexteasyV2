export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function capitalize(text: string): string {
  return text
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function toSentenceCase(text: string): string {
  if (text.length === 0) return text;
  const lower = text.toLowerCase();
  let result = "";
  let capitalizeNext = true;
  for (let i = 0; i < lower.length; i++) {
    const ch = lower[i];
    if (capitalizeNext && /[a-z]/.test(ch)) {
      result += ch.toUpperCase();
      capitalizeNext = false;
    } else {
      result += ch;
      if (ch === "." || ch === "!" || ch === "?") {
        capitalizeNext = true;
      }
    }
  }
  return result;
}

export function toTitleCase(text: string, locale?: string): string {
  if (text.length === 0) return text;

  const stopWords: Record<string, string[]> = {
    pt: ["de", "da", "do", "das", "dos", "e", "em", "no", "na", "nos", "nas", "para", "por", "com", "a", "o", "as", "os", "um", "uma", "uns", "umas", "à", "ao", "às", "aos", "pelo", "pela", "pelos", "pelas"],
    en: ["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "from", "by", "of", "in", "with"],
    es: ["de", "del", "la", "el", "los", "las", "y", "e", "o", "u", "en", "por", "para", "con", "a", "un", "una", "unos", "unas"],
  };

  const stops = stopWords[locale || "en"] || stopWords.en;

  const words = text.split(/(\s+)/);
  const result = words.map((part, i) => {
    if (/^\s+$/.test(part)) return part;
    if (part.length === 0) return part;
    const lower = part.toLowerCase();
    const isStopWord = stops.includes(lower);
    const isFirstOrLast = i === 0 || i === words.length - 1 || (i > 0 && /^\s+$/.test(words[i - 1]) && i === 1) ||
      (i < words.length - 1 && /^\s+$/.test(words[i + 1]) && i === words.length - 2);

    if (isFirstOrLast || !isStopWord) {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }
    return lower;
  });

  return result.join("");
}

export function toAlternatingCase(text: string): string {
  let upper = true;
  return text
    .split("")
    .map((c) => {
      if (/[a-zA-Z]/.test(c)) {
        const r = upper ? c.toUpperCase() : c.toLowerCase();
        upper = !upper;
        return r;
      }
      return c;
    })
    .join("");
}

export function toInverseCase(text: string): string {
  return text
    .split("")
    .map((c) => {
      if (c === c.toUpperCase()) return c.toLowerCase();
      return c.toUpperCase();
    })
    .join("");
}

export function removeExtraSpaces(text: string): string {
  return text
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export function strikethrough(text: string): string {
  return text
    .split("")
    .map((c) => (c === " " || c === "\n" || c === "\t" ? c : c + "\u0336"))
    .join("");
}

export function toUnderline(text: string): string {
  return text
    .split("")
    .map((c) => (c === " " || c === "\n" || c === "\t" ? c : c + "\u0332"))
    .join("");
}

export function toBold(text: string): string {
  const map: Record<string, string> = {
    A: "\uD835\uDC00", B: "\uD835\uDC01", C: "\uD835\uDC02", D: "\uD835\uDC03",
    E: "\uD835\uDC04", F: "\uD835\uDC05", G: "\uD835\uDC06", H: "\uD835\uDC07",
    I: "\uD835\uDC08", J: "\uD835\uDC09", K: "\uD835\uDC0A", L: "\uD835\uDC0B",
    M: "\uD835\uDC0C", N: "\uD835\uDC0D", O: "\uD835\uDC0E", P: "\uD835\uDC0F",
    Q: "\uD835\uDC10", R: "\uD835\uDC11", S: "\uD835\uDC12", T: "\uD835\uDC13",
    U: "\uD835\uDC14", V: "\uD835\uDC15", W: "\uD835\uDC16", X: "\uD835\uDC17",
    Y: "\uD835\uDC18", Z: "\uD835\uDC19",
    a: "\uD835\uDC1A", b: "\uD835\uDC1B", c: "\uD835\uDC1C", d: "\uD835\uDC1D",
    e: "\uD835\uDC1E", f: "\uD835\uDC1F", g: "\uD835\uDC20", h: "\uD835\uDC21",
    i: "\uD835\uDC22", j: "\uD835\uDC23", k: "\uD835\uDC24", l: "\uD835\uDC25",
    m: "\uD835\uDC26", n: "\uD835\uDC27", o: "\uD835\uDC28", p: "\uD835\uDC29",
    q: "\uD835\uDC2A", r: "\uD835\uDC2B", s: "\uD835\uDC2C", t: "\uD835\uDC2D",
    u: "\uD835\uDC2E", v: "\uD835\uDC2F", w: "\uD835\uDC30", x: "\uD835\uDC31",
    y: "\uD835\uDC32", z: "\uD835\uDC33",
    "0": "\uD835\uDFCE", "1": "\uD835\uDFCF", "2": "\uD835\uDFD0",
    "3": "\uD835\uDFD1", "4": "\uD835\uDFD2", "5": "\uD835\uDFD3",
    "6": "\uD835\uDFD4", "7": "\uD835\uDFD5", "8": "\uD835\uDFD6",
    "9": "\uD835\uDFD7",
  };
  return text
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}

export function toItalic(text: string): string {
  const normal =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const italic =
    "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789";
  const map: Record<string, string> = {};
  for (let i = 0; i < normal.length; i++) {
    map[normal[i]] = italic[i];
  }
  return text
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}

export function toWide(text: string): string {
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code === 0x20) return "\u3000";
      if (code >= 0x21 && code <= 0x7e) {
        return String.fromCharCode(code - 0x20 + 0xff00);
      }
      return c;
    })
    .join("");
}

export function toSmallCaps(text: string): string {
  const smallCapMap: Record<string, string> = {
    A: "\u1D00", B: "\u0299", C: "\u1D04", D: "\u1D05", E: "\u1D07",
    F: "\uA730", G: "\u0262", H: "\u029C", I: "\u026A", J: "\u1D0A",
    K: "\u1D0B", L: "\u029F", M: "\u1D0D", N: "\u0274", O: "\u1D0F",
    P: "\u1D18", R: "\u0280", T: "\u1D1B", U: "\u1D1C", V: "\u1D20",
    W: "\u1D21", Y: "\u028F", Z: "\u1D22",
    a: "\u1D00", b: "\u0299", c: "\u1D04", d: "\u1D05", e: "\u1D07",
    f: "\uA730", g: "\u0262", h: "\u029C", i: "\u026A", j: "\u1D0A",
    k: "\u1D0B", l: "\u029F", m: "\u1D0D", n: "\u0274", o: "\u1D0F",
    p: "\u1D18", r: "\u0280", t: "\u1D1B", u: "\u1D1C", v: "\u1D20",
    w: "\u1D21", y: "\u028F", z: "\u1D22",
  };
  return text
    .split("")
    .map((c) => smallCapMap[c] ?? c)
    .join("");
}

export function reverse(text: string): string {
  return text.split("").reverse().join("");
}

const mirrorMap: Record<string, string> = {
  "a": "ɒ", "b": "d", "c": "ɔ", "d": "b", "e": "ɘ", "f": "Ꮈ", "g": "ǫ", "h": "ʜ",
  "i": "i", "j": "Ⴑ", "k": "ʞ", "l": "l", "m": "m", "n": "n", "o": "o",
  "p": "q", "q": "p", "r": "ɿ", "s": "ƨ", "t": "ƚ", "u": "u", "v": "v",
  "w": "w", "x": "x", "y": "y", "z": "ƹ",
  "A": "A", "B": "ᙠ", "C": "Ɔ", "D": "ᗡ", "E": "Ǝ", "F": "ꟻ", "G": "Ꭾ",
  "H": "H", "I": "I", "J": "Ⴑ", "K": "ꓘ", "L": "⅃", "M": "M", "N": "N",
  "O": "O", "P": "ꟼ", "Q": "Ọ", "R": "Я", "S": "Ꙅ", "T": "T", "U": "U",
  "V": "V", "W": "W", "X": "X", "Y": "Y", "Z": "Ƹ",
  "0": "0", "1": "1", "2": "ᘔ", "3": "Ɛ", "4": "ᒋ", "5": "Ϭ",
  "6": "9", "7": "Ɫ", "8": "8", "9": "6",
  ".": ".", ",": ",", "?": "⸮", "!": "¡",
  "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{",
  "<": ">", ">": "<",
};

export function toMirror(text: string): string {
  return text
    .split("")
    .reverse()
    .map((c) => mirrorMap[c] ?? c)
    .join("");
}

const upsideDownMap: Record<string, string> = {
  "a": "ɐ", "b": "q", "c": "ɔ", "d": "p", "e": "ǝ", "f": "ɟ", "g": "ƃ",
  "h": "ɥ", "i": "ᴉ", "j": "ɾ", "k": "ʞ", "l": "l", "m": "ɯ", "n": "u",
  "o": "o", "p": "d", "q": "b", "r": "ɹ", "s": "s", "t": "ʇ", "u": "n",
  "v": "ʌ", "w": "ʍ", "x": "x", "y": "ʎ", "z": "z",
  "A": "∀", "B": "ᗺ", "C": "Ɔ", "D": "ᗡ", "E": "Ǝ", "F": "Ⅎ", "G": "⅁",
  "H": "H", "I": "I", "J": "ſ", "K": "⋊", "L": "˥", "M": "W", "N": "N",
  "O": "O", "P": "Ԁ", "Q": "Ό", "R": "ᴚ", "S": "S", "T": "⊥", "U": "∩",
  "V": "Λ", "W": "M", "X": "X", "Y": "⅄", "Z": "Z",
  "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ",
  "6": "9", "7": "ㄥ", "8": "8", "9": "6",
  ".": "˙", ",": "'", "?": "¿", "!": "¡",
  "\"": "„", "'": ",", "`": ",",
  "&": "⅋", "_": "‾",
  "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{",
  "<": ">", ">": "<",
};

export function toUpsideDown(text: string): string {
  return text
    .split("")
    .reverse()
    .map((c) => upsideDownMap[c] ?? c)
    .join("");
}

const morseMap: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  " ": "/",
};

const morseReverse: Record<string, string> = {};
for (const [k, v] of Object.entries(morseMap)) {
  morseReverse[v] = k;
}

export function toMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((c) => morseMap[c] ?? c)
    .join(" ");
}

export function fromMorse(text: string): string {
  return text
    .split(" ")
    .map((code) => morseReverse[code] ?? code)
    .join("");
}

export function toMorseAuto(text: string): string {
  const trimmed = text.trim();
  if (/^[.\-/\s]+$/.test(trimmed)) {
    return fromMorse(text);
  }
  return toMorse(text);
}

export function toBinary(text: string): string {
  return text
    .split("")
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

export function fromBinary(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!/^[01\s]+$/.test(cleaned)) return text;
  return cleaned
    .split(" ")
    .filter((b) => b.length > 0)
    .map((b) => String.fromCharCode(parseInt(b, 2)))
    .join("");
}

export function toBinaryAuto(text: string): string {
  const trimmed = text.trim();
  if (/^[01\s]+$/.test(trimmed) && trimmed.replace(/\s/g, "").length >= 8) {
    return fromBinary(text);
  }
  return toBinary(text);
}

export function toInvisibleText(text: string): string {
  if (text.length === 0) return "\u200B";
  return text
    .split("")
    .map((c) => (c === " " || c === "\n" ? c : "\u200B"))
    .join("");
}

export function toCamelCase(text: string): string {
  const words = text
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/);
  if (words.length === 0) return "";
  return words
    .map((w, i) =>
      i === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
    )
    .join("");
}

export function toPascalCase(text: string): string {
  const words = text
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/);
  if (words.length === 0) return "";
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

export function toSnakeCase(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.toLowerCase())
    .join("_");
}

export function toConstantCase(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.toUpperCase())
    .join("_");
}

export function toKebabCase(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .map((w) => w.toLowerCase())
    .join("-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toDotCase(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.toLowerCase())
    .join(".");
}

export function toPathCase(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.toLowerCase())
    .join("/");
}

export function toggleCase(text: string): string {
  return toInverseCase(text);
}

// ── Text Cleaning Tools ─────────────────────────────────────────────

export function removeDuplicateLines(text: string): string {
  const lines = text.split("\n");
  const seen = new Set<string>();
  const result: string[] = [];
  for (const line of lines) {
    if (!seen.has(line)) {
      seen.add(line);
      result.push(line);
    }
  }
  return result.join("\n");
}

export function removeEmptyLines(text: string): string {
  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
}

export function removeLineBreaks(text: string): string {
  return text.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
}

export function trimText(text: string): string {
  return text.trim();
}

export function sortLines(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trimRight())
    .sort((a, b) => a.localeCompare(b))
    .join("\n");
}

// ── Generators ──────────────────────────────────────────────────────

export function generateUUID(_text?: string): string {
  void _text;
  return crypto.randomUUID();
}

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing",
  "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore",
  "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam",
  "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut",
  "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure",
  "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse",
  "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur",
  "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa",
  "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum",
];

export function generateLoremIpsum(_text?: string, _locale?: string): string {
  void _text; void _locale;
  const paragraphs = 3;
  const result: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const wordCount = 30 + Math.floor(Math.random() * 40);
    const words: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    const sentence = words.join(" ") + ".";
    result.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
  }
  return result.join("\n\n");
}

export function generatePassword(
  length: number = 16,
  options: { numbers?: boolean; symbols?: boolean; uppercase?: boolean; lowercase?: boolean } = {},
): string {
  if (typeof length === "string") length = 16;
  const nums = "0123456789";
  const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";

  let chars = "";
  if (options.lowercase !== false) chars += lower;
  if (options.uppercase !== false) chars += upper;
  if (options.numbers !== false) chars += nums;
  if (options.symbols) chars += syms;

  if (chars.length === 0) chars = lower + upper + nums;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
}

// ── Code Formatters ─────────────────────────────────────────────────

export function formatHTML(text: string): string {
  const cleaned = text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/>\s+</g, ">\n<")
    .replace(/(\s*\n\s*){2,}/g, "\n")
    .trim();

  const lines = cleaned.split("\n");
  const result: string[] = [];
  let indent = 0;
  const selfClosing = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const closing = /^<\//.test(trimmed);
    const opening = /^<[^/][^>]*[^/]>$/.test(trimmed) && !selfClosing.test(trimmed.replace(/<([^\s>/]+).*/, "$1"));

    if (closing) indent--;

    result.push("  ".repeat(Math.max(0, indent)) + trimmed);

    if (opening) indent++;
  }

  return result.join("\n");
}

export function formatCSS(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const result: string[] = [];
  let i = 0;
  while (i < cleaned.length) {
    const braceOpen = cleaned.indexOf("{", i);
    if (braceOpen === -1) {
      result.push(cleaned.slice(i).trim());
      break;
    }
    const selector = cleaned.slice(i, braceOpen).trim();
    const braceClose = cleaned.indexOf("}", braceOpen);
    const body = cleaned.slice(braceOpen + 1, braceClose).trim();

    const props = body
      .split(";")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `  ${p};`);

    result.push(selector + " {");
    result.push(...props);
    result.push("}");

    i = braceClose + 1;
  }
  return result.join("\n");
}

export function formatJavaScript(text: string): string {
  let result = "";
  let indent = 0;
  const lines = text.split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const dedent = /^[}\]],?/.test(line) ? -1 : 0;
    indent = Math.max(0, indent + dedent);

    if (line.endsWith("{") || line.endsWith("(")) {
      result += "  ".repeat(indent) + line + "\n";
      indent++;
    } else if (/^[}\]]/.test(line)) {
      result += "  ".repeat(indent) + line + "\n";
    } else {
      result += "  ".repeat(indent) + line + "\n";
    }
  }

  return result.trimEnd();
}

export function formatYAML(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line, _i, arr) => !(line.trim() === "" && _i === arr.length - 1))
    .join("\n");
}

export function formatJSON(text: string): string {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, 2);
  } catch {
    throw new Error("Invalid JSON: unable to parse. Please check your syntax.");
  }
}

export function formatMarkdown(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }

    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    const trimmed = line.trimEnd();

    if (/^#{1,6}\s/.test(trimmed)) {
      const match = trimmed.match(/^(#+)\s+(.*)/);
      if (match) {
        const hashes = match[1];
        const content = match[2].trim();
        const formatted =
          content.charAt(0).toUpperCase() + content.slice(1);
        result.push(`${hashes} ${formatted}`);
        continue;
      }
    }

    if (/^[-*+]\s/.test(trimmed)) {
      result.push(trimmed.replace(/\s{2,}/g, " "));
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      result.push(trimmed.replace(/\s{2,}/g, " "));
      continue;
    }

    if (trimmed === "" && i > 0 && lines[i - 1].trim() === "") {
      continue;
    }

    result.push(trimmed);
  }

  return result.join("\n");
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\s+/).length;
}

export function countLines(text: string): number {
  const trimmed = text.trimEnd();
  if (trimmed === "") return 0;
  return (trimmed.match(/\n/g) || []).length + 1;
}

export const transformMap: Record<string, (text: string, locale?: string) => string> = {
  uppercase: toUpperCase,
  lowercase: toLowerCase,
  capitalize: capitalize,
  "sentence-case": toSentenceCase,
  "title-case": toTitleCase as (t: string, l?: string) => string,
  "alternating-case": toAlternatingCase,
  "inverse-case": toInverseCase,
  "toggle-case": toggleCase,
  "remove-extra-spaces": removeExtraSpaces,
  strikethrough: strikethrough,
  underline: toUnderline,
  bold: toBold,
  italic: toItalic,
  wide: toWide,
  "small-caps": toSmallCaps,
  reverse: reverse,
  mirror: toMirror,
  "upside-down": toUpsideDown,
  "to-morse": toMorse,
  "from-morse": fromMorse,
  "morse-auto": toMorseAuto,
  "to-binary": toBinary,
  "from-binary": fromBinary,
  "binary-auto": toBinaryAuto,
  invisible: toInvisibleText,
  camelcase: toCamelCase,
  pascalcase: toPascalCase,
  snakecase: toSnakeCase,
  constantcase: toConstantCase,
  kebabcase: toKebabCase,
  dotcase: toDotCase,
  pathcase: toPathCase,
  "json-formatter": formatJSON,
  // Text Cleaning
  "remove-duplicate-lines": removeDuplicateLines,
  "remove-empty-lines": removeEmptyLines,
  "remove-line-breaks": removeLineBreaks,
  "trim-text": trimText,
  "sort-lines": sortLines,
  // Generators
  "uuid-generator": generateUUID as unknown as (t: string, l?: string) => string,
  "password-generator": generatePassword as unknown as (t: string, l?: string) => string,
  "lorem-ipsum-generator": generateLoremIpsum as unknown as (t: string, l?: string) => string,
  // Formatters
  "html-formatter": formatHTML,
  "css-formatter": formatCSS,
  "javascript-formatter": formatJavaScript,
  "yaml-formatter": formatYAML,
  "markdown-formatter": formatMarkdown,
};
