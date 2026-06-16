import path from "node:path";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import XLSX from "xlsx";

type NormalizedValue = string | null;

interface NormalizedClassRecord {
  cst: NormalizedValue;
  cstDescription: NormalizedValue;
  cClassTrib: NormalizedValue;
  name: NormalizedValue;
  description: NormalizedValue;
  legalBase: NormalizedValue;
  lawReference: NormalizedValue;
  taxRateType: NormalizedValue;
  pRedIBS: NormalizedValue;
  pRedCBS: NormalizedValue;
  documents: string[];
  link: NormalizedValue;
}

interface NormalizedCstRecord {
  cst: NormalizedValue;
  description: NormalizedValue;
  taxRateType: NormalizedValue;
  legalBase: NormalizedValue;
  lawReference: NormalizedValue;
  pRedIBS: NormalizedValue;
  pRedCBS: NormalizedValue;
  documents: string[];
  link: NormalizedValue;
}

const SOURCE_DIR = path.resolve(process.cwd(), "data/sources/ibs-cbs");
const OUTPUT_DIR = path.resolve(process.cwd(), "public/data/ibs-cbs");

const CCLASS_SHEET_CANDIDATES = ["cclass", "cclasstrib", "cclass trib"];
const CST_SHEET_CANDIDATES = ["cst"];

const cClassFieldAliases: Record<string, string[]> = {
  cst: ["cst", "cst ibs cbs", "cst ibs/cbs"],
  cstDescription: ["descricao cst", "descricao do cst", "cst descricao", "cstdescription", "cst description"],
  cClassTrib: ["cclasstrib", "c class trib", "c classtrib"],
  name: ["nome", "name", "denominacao", "denominação", "classificacao", "classificação"],
  description: ["descricao", "description", "descrição", "detalhamento"],
  legalBase: ["base legal", "artigo", "art", "legal base", "legalbase"],
  lawReference: ["referencia legal", "referência legal", "lc 214/25", "lei complementar", "lawreference"],
  taxRateType: ["tipo de aliquota", "tipo de alíquota", "aliquota", "alíquota", "taxratetype", "tax rate type"],
  pRedIBS: ["predibs", "reducao ibs", "redução ibs", "p red ibs", "reduction ibs"],
  pRedCBS: ["predcbs", "reducao cbs", "redução cbs", "p red cbs", "reduction cbs"],
  documents: ["documentos", "documents", "documentos fiscais", "doc fiscal", "documento fiscal"],
  link: ["link", "url", "link oficial", "official link"],
};

const cstFieldAliases: Record<string, string[]> = {
  cst: ["cst", "cst ibs cbs", "cst ibs/cbs"],
  description: ["descricao", "description", "descrição", "descricao cst", "descrição cst"],
  taxRateType: ["tipo de aliquota", "tipo de alíquota", "aliquota", "alíquota", "taxratetype", "tax rate type"],
  legalBase: ["base legal", "artigo", "art", "legal base", "legalbase"],
  lawReference: ["referencia legal", "referência legal", "lc 214/25", "lei complementar", "lawreference"],
  pRedIBS: ["predibs", "reducao ibs", "redução ibs", "p red ibs", "reduction ibs"],
  pRedCBS: ["predcbs", "reducao cbs", "redução cbs", "p red cbs", "reduction cbs"],
  documents: ["documentos", "documents", "documentos fiscais", "doc fiscal", "documento fiscal"],
  link: ["link", "url", "link oficial", "official link"],
};

function normalizeHeader(value: unknown): string {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeText(value: unknown): NormalizedValue {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }
  const trimmed = String(value).trim();
  return trimmed.length ? trimmed : null;
}

function normalizeCode(value: unknown, length: number): NormalizedValue {
  const text = normalizeText(value);
  if (!text) return null;
  const digits = text.replace(/\D/g, "");
  if (digits.length) return digits.padStart(length, "0");
  return text;
}

function normalizePercentage(value: unknown): NormalizedValue {
  const text = normalizeText(value);
  if (!text) return null;

  const stripped = text.replace(/%/g, "").replace(/\s+/g, "");
  let normalized = stripped;

  if (stripped.includes(",") && stripped.includes(".")) {
    normalized = stripped.lastIndexOf(",") > stripped.lastIndexOf(".")
      ? stripped.replace(/\./g, "").replace(",", ".")
      : stripped.replace(/,/g, "");
  } else if (stripped.includes(",")) {
    normalized = stripped.replace(",", ".");
  }

  const numeric = Number(normalized);
  if (!Number.isFinite(numeric)) return text;

  const fixed = numeric.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
  return fixed.length ? fixed : "0";
}

function normalizeDocuments(value: unknown): string[] {
  const items = Array.isArray(value) ? value : [value];
  const parts = items.flatMap((item) => {
    const text = normalizeText(item);
    if (!text) return [] as string[];
    return text
      .split(/\r?\n|\s*;\s*|\s*\|\s*|\s*,\s*|\s+\/\s+/g)
      .map((part) => part.trim())
      .filter(Boolean);
  });
  return Array.from(new Set(parts));
}

function normalizeLink(value: unknown): NormalizedValue {
  const text = normalizeText(value);
  if (!text) return null;
  if (/^https?:\/\//i.test(text)) return text;
  if (/^www\./i.test(text)) return `https://${text}`;
  return text;
}

function findSheetName(sheetNames: string[], candidates: string[]): string | undefined {
  const normalized = sheetNames.map((name) => ({ name, normalized: normalizeHeader(name) }));
  for (const candidate of candidates) {
    const match = normalized.find((entry) => entry.normalized.includes(candidate));
    if (match) return match.name;
  }
  return undefined;
}

function findHeaderRow(rows: unknown[][], aliases: Record<string, string[]>): number {
  let bestIndex = 0;
  let bestScore = -1;

  rows.forEach((row, index) => {
    const normalizedCells = row.map((cell) => normalizeHeader(cell));
    let score = 0;

    for (const fieldAliases of Object.values(aliases)) {
      if (fieldAliases.some((alias) => normalizedCells.some((cell) => cell.includes(alias)))) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function mapRow(row: unknown[], headerRow: unknown[], aliases: Record<string, string[]>) {
  const fieldIndexes = new Map<string, number>();

  headerRow.forEach((cell, index) => {
    const normalized = normalizeHeader(cell);
    if (!normalized) return;

    for (const [field, fieldAliases] of Object.entries(aliases)) {
      if (fieldIndexes.has(field)) continue;
      if (fieldAliases.some((alias) => normalized.includes(alias))) {
        fieldIndexes.set(field, index);
      }
    }
  });

  const values = Object.fromEntries(
    Object.keys(aliases).map((field) => [field, normalizeText(row[fieldIndexes.get(field) ?? -1])]),
  );

  return { values, fieldIndexes };
}

function isEmptyRow(row: unknown[]): boolean {
  return row.every((cell) => normalizeText(cell) === null);
}

function parseClassSheet(rows: unknown[][]) {
  if (!rows.length) return [] as NormalizedClassRecord[];

  const headerIndex = findHeaderRow(rows, cClassFieldAliases);
  const headerRow = rows[headerIndex] ?? [];
  const requiredFields = ["cClassTrib", "cst"];
  const headerNormalized = headerRow.map((cell) => normalizeHeader(cell));

  for (const field of requiredFields) {
    const aliases = cClassFieldAliases[field] ?? [];
    if (!aliases.some((alias) => headerNormalized.some((cell) => cell.includes(alias)))) {
      console.warn(`[ibs-cbs] cClass sheet missing expected column for ${field}`);
    }
  }

  return rows.slice(headerIndex + 1).filter((row) => !isEmptyRow(row)).map((row) => {
    const { values } = mapRow(row, headerRow, cClassFieldAliases);
    return {
      cst: normalizeCode(values.cst, 3),
      cstDescription: normalizeText(values.cstDescription),
      cClassTrib: normalizeCode(values.cClassTrib, 6),
      name: normalizeText(values.name),
      description: normalizeText(values.description),
      legalBase: normalizeText(values.legalBase),
      lawReference: normalizeText(values.lawReference),
      taxRateType: normalizeText(values.taxRateType),
      pRedIBS: normalizePercentage(values.pRedIBS),
      pRedCBS: normalizePercentage(values.pRedCBS),
      documents: normalizeDocuments(values.documents),
      link: normalizeLink(values.link),
    } satisfies NormalizedClassRecord;
  }).filter((record) => record.cClassTrib || record.cst || record.name || record.description);
}

function parseCstSheet(rows: unknown[][]) {
  if (!rows.length) return [] as NormalizedCstRecord[];

  const headerIndex = findHeaderRow(rows, cstFieldAliases);
  const headerRow = rows[headerIndex] ?? [];
  const requiredFields = ["cst", "description"];
  const headerNormalized = headerRow.map((cell) => normalizeHeader(cell));

  for (const field of requiredFields) {
    const aliases = cstFieldAliases[field] ?? [];
    if (!aliases.some((alias) => headerNormalized.some((cell) => cell.includes(alias)))) {
      console.warn(`[ibs-cbs] CST sheet missing expected column for ${field}`);
    }
  }

  return rows.slice(headerIndex + 1).filter((row) => !isEmptyRow(row)).map((row) => {
    const { values } = mapRow(row, headerRow, cstFieldAliases);
    return {
      cst: normalizeCode(values.cst, 3),
      description: normalizeText(values.description),
      taxRateType: normalizeText(values.taxRateType),
      legalBase: normalizeText(values.legalBase),
      lawReference: normalizeText(values.lawReference),
      pRedIBS: normalizePercentage(values.pRedIBS),
      pRedCBS: normalizePercentage(values.pRedCBS),
      documents: normalizeDocuments(values.documents),
      link: normalizeLink(values.link),
    } satisfies NormalizedCstRecord;
  }).filter((record) => record.cst || record.description);
}

function dedupeByKey<T>(records: T[], keySelector: (record: T) => string | null): T[] {
  const map = new Map<string, T>();
  for (const record of records) {
    const key = keySelector(record);
    if (!key) continue;
    map.set(key, record);
  }
  return Array.from(map.values());
}

async function main() {
  const inputArg = process.argv[2];
  const inputPath = inputArg
    ? path.resolve(process.cwd(), inputArg)
    : (await findLatestFileInSource());

  if (!inputPath) {
    console.error(`[ibs-cbs] No XLS/XLSX file found in ${SOURCE_DIR}`);
    process.exit(1);
  }

  const workbook = XLSX.readFile(inputPath, { cellDates: true });
  const sourceFile = path.basename(inputPath);
  const version = sourceFile.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? path.parse(sourceFile).name;
  const generatedAt = new Date().toISOString();

  const cclassSheetName = findSheetName(workbook.SheetNames, CCLASS_SHEET_CANDIDATES);
  const cstSheetName = findSheetName(workbook.SheetNames, CST_SHEET_CANDIDATES);

  if (!cclassSheetName) {
    console.warn("[ibs-cbs] cClass sheet not found");
  }
  if (!cstSheetName) {
    console.warn("[ibs-cbs] CST sheet not found");
  }

  const cclassRows = cclassSheetName
    ? (XLSX.utils.sheet_to_json(workbook.Sheets[cclassSheetName], { header: 1, defval: "", blankrows: false }) as unknown[][])
    : [];
  const cstRows = cstSheetName
    ? (XLSX.utils.sheet_to_json(workbook.Sheets[cstSheetName], { header: 1, defval: "", blankrows: false }) as unknown[][])
    : [];

  const cstRecords = dedupeByKey(parseCstSheet(cstRows), (record) => record.cst);
  const cstMap = new Map(cstRecords.map((record) => [record.cst ?? "", record.description ?? null]));

  const cClassTribRecords = dedupeByKey(
    parseClassSheet(cclassRows).map((record) => ({
      ...record,
      cstDescription: record.cstDescription ?? cstMap.get(record.cst ?? "") ?? null,
    })),
    (record) => record.cClassTrib,
  );

  await mkdir(OUTPUT_DIR, { recursive: true });

  const cclassFileName = `cclass-trib-${version}.json`;
  const cstFileName = `cst-ibs-cbs-${version}.json`;

  const metadata = {
    activeVersion: version,
    sourceFile,
    generatedAt,
    tableDate: version,
    files: {
      cclassTrib: `/data/ibs-cbs/${cclassFileName}`,
      cst: `/data/ibs-cbs/${cstFileName}`,
    },
  };

  const cclassPayload = {
    version,
    tableDate: version,
    source: "Tabela cClassTrib IBS/CBS",
    sourceFile,
    generatedAt,
    records: cClassTribRecords,
  };

  const cstPayload = {
    version,
    tableDate: version,
    source: "Tabela CST IBS/CBS",
    sourceFile,
    generatedAt,
    records: cstRecords,
  };

  await writeFile(path.join(OUTPUT_DIR, cclassFileName), JSON.stringify(cclassPayload, null, 2), "utf8");
  await writeFile(path.join(OUTPUT_DIR, cstFileName), JSON.stringify(cstPayload, null, 2), "utf8");
  await writeFile(path.join(OUTPUT_DIR, "metadata.json"), JSON.stringify(metadata, null, 2), "utf8");

  console.log(`[ibs-cbs] version: ${version}`);
  console.log(`[ibs-cbs] cClassTrib records: ${cClassTribRecords.length}`);
  console.log(`[ibs-cbs] CST records: ${cstRecords.length}`);
  console.log("[ibs-cbs] generated files:");
  console.log(`- ${path.join("/data/ibs-cbs", cclassFileName)}`);
  console.log(`- ${path.join("/data/ibs-cbs", cstFileName)}`);
  console.log(`- /data/ibs-cbs/metadata.json`);
}

async function findLatestFileInSource(): Promise<string | null> {
  const entries = await readdir(SOURCE_DIR).catch(() => [] as string[]);
  const files = entries
    .filter((entry) => /\.(xlsx?|XLSX?)$/.test(entry))
    .sort();
  return files.length ? path.join(SOURCE_DIR, files.at(-1) as string) : null;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
