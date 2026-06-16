import { cache } from "react";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export interface IbsCbsMetadata {
  activeVersion: string;
  sourceFile: string;
  generatedAt: string;
  tableDate?: string;
  files: {
    cclassTrib: string;
    cst: string;
  };
}

export interface IbsCbsClassRecord {
  cst: string | null;
  cstDescription: string | null;
  cClassTrib: string | null;
  name: string | null;
  description: string | null;
  legalBase: string | null;
  lawReference: string | null;
  taxRateType: string | null;
  pRedIBS: string | null;
  pRedCBS: string | null;
  documents: string[];
  link: string | null;
}

export interface IbsCbsCstRecord {
  cst: string | null;
  description: string | null;
  taxRateType: string | null;
  legalBase: string | null;
  lawReference: string | null;
  pRedIBS: string | null;
  pRedCBS: string | null;
  documents: string[];
  link: string | null;
}

export interface IbsCbsDataset {
  metadata: IbsCbsMetadata | null;
  cClassTribRecords: IbsCbsClassRecord[];
  cstRecords: IbsCbsCstRecord[];
}

interface VersionedPayload<T> {
  version?: string;
  sourceFile?: string;
  generatedAt?: string;
  tableDate?: string;
  records?: T[];
}

const DATA_DIR = path.join(process.cwd(), "public", "data", "ibs-cbs");

function basenameFromPublicPath(filePath: string): string {
  return path.basename(filePath);
}

function extractVersion(fileName: string): string | null {
  const match = fileName.match(/(\d{4}-\d{2}-\d{2})/);
  return match?.[1] ?? null;
}

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function findLatestFile(pattern: RegExp) {
  const entries = await readdir(DATA_DIR).catch(() => [] as string[]);
  return entries
    .filter((entry) => pattern.test(entry))
    .sort()
    .at(-1) ?? null;
}

function toPublicPath(fileName: string | null, fallback: string): string {
  return `/data/ibs-cbs/${fileName ?? fallback}`;
}

export const loadIbsCbsDataset = cache(async (): Promise<IbsCbsDataset> => {
  const metadataPath = path.join(DATA_DIR, "metadata.json");
  const metadataRaw = await readJson<IbsCbsMetadata>(metadataPath);

  let cclassFile = metadataRaw ? basenameFromPublicPath(metadataRaw.files.cclassTrib) : null;
  let cstFile = metadataRaw ? basenameFromPublicPath(metadataRaw.files.cst) : null;

  if (!cclassFile) {
    cclassFile = await findLatestFile(/^cclass-trib-.*\.json$/i);
  }
  if (!cstFile) {
    cstFile = await findLatestFile(/^cst-ibs-cbs-.*\.json$/i);
  }

  if (!cclassFile && !cstFile) {
    return { metadata: metadataRaw ?? null, cClassTribRecords: [], cstRecords: [] };
  }

  const cclassPayload = cclassFile
    ? await readJson<VersionedPayload<IbsCbsClassRecord>>(path.join(DATA_DIR, cclassFile))
    : null;
  const cstPayload = cstFile
    ? await readJson<VersionedPayload<IbsCbsCstRecord>>(path.join(DATA_DIR, cstFile))
    : null;

  const version =
    metadataRaw?.activeVersion ??
    cclassPayload?.version ??
    cstPayload?.version ??
    extractVersion(cclassFile ?? cstFile ?? "") ??
    "unknown";

  const metadata: IbsCbsMetadata = metadataRaw ?? {
    activeVersion: version,
    sourceFile: cclassPayload?.sourceFile ?? cstPayload?.sourceFile ?? cclassFile ?? cstFile ?? "",
    generatedAt: cclassPayload?.generatedAt ?? cstPayload?.generatedAt ?? new Date().toISOString(),
    tableDate: cclassPayload?.tableDate ?? cclassPayload?.version ?? cstPayload?.tableDate ?? cstPayload?.version ?? version,
    files: {
      cclassTrib: toPublicPath(cclassFile, `cclass-trib-${version}.json`),
      cst: toPublicPath(cstFile, `cst-ibs-cbs-${version}.json`),
    },
  };

  return {
    metadata,
    cClassTribRecords: cclassPayload?.records ?? [],
    cstRecords: cstPayload?.records ?? [],
  };
});
