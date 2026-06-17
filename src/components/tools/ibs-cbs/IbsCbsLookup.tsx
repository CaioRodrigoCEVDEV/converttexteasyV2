"use client";

import { useState } from "react";
import Link from "next/link";
import type { IbsCbsClassRecord, IbsCbsCstRecord, IbsCbsMetadata } from "@/lib/ibs-cbs";

type FilterValue = "all" | string;

interface IbsCbsLookupProps {
  metadata: IbsCbsMetadata | null;
  cClassTribRecords: IbsCbsClassRecord[];
  cstRecords: IbsCbsCstRecord[];
}

function cleanText(value: string | null | undefined): string {
  return (value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function normalizeQuery(value: string): string {
  return cleanText(value).replace(/[^a-z0-9]+/g, " ").trim();
}

function joinVisible(values: Array<string | null | undefined>, separator = " • "): string {
  return values.filter(Boolean).join(separator);
}

function formatDocuments(documents: string[]): string {
  return documents.length ? documents.join(", ") : "—";
}

function toSearchIndex(record: IbsCbsClassRecord): string {
  return normalizeQuery(
    [
      record.cClassTrib,
      record.cst,
      record.cstDescription,
      record.name,
      record.description,
      record.legalBase,
      record.lawReference,
      record.taxRateType,
      record.pRedIBS,
      record.pRedCBS,
      ...(record.documents ?? []),
      record.link,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function copyableText(record: IbsCbsClassRecord): string {
  return [
    `cClassTrib: ${record.cClassTrib ?? "—"}`,
    `Nome: ${record.name ?? "—"}`,
    `Descrição: ${record.description ?? "—"}`,
    `CST IBS/CBS: ${record.cst ?? "—"}`,
    `Descrição do CST: ${record.cstDescription ?? "—"}`,
    `Tipo de alíquota: ${record.taxRateType ?? "—"}`,
    `pRedIBS: ${record.pRedIBS ?? "—"}`,
    `pRedCBS: ${record.pRedCBS ?? "—"}`,
    `Documentos fiscais: ${formatDocuments(record.documents)}`,
    `Base legal: ${record.legalBase ?? "—"}`,
    `Referência legal: ${record.lawReference ?? "—"}`,
    record.link ? `Link oficial: ${record.link}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function distinct(values: Array<string | null | undefined>): string[] {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value))))
    .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));
}

function fieldBadge({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-slate-50/80 dark:bg-slate-800/50 px-3 py-2">
      <p className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-200">{value ?? "—"}</p>
    </div>
  );
}

export default function IbsCbsLookup({ metadata, cClassTribRecords, cstRecords }: IbsCbsLookupProps) {
  const [query, setQuery] = useState("");
  const [cstFilter, setCstFilter] = useState<FilterValue>("all");
  const [taxRateTypeFilter, setTaxRateTypeFilter] = useState<FilterValue>("all");
  const [redIbsFilter, setRedIbsFilter] = useState<FilterValue>("all");
  const [redCbsFilter, setRedCbsFilter] = useState<FilterValue>("all");
  const [documentFilter, setDocumentFilter] = useState<FilterValue>("all");
  const [toast, setToast] = useState<string | null>(null);

  const cstMap = new Map(cstRecords.map((record) => [record.cst ?? "", record.description ?? null]));

  const records = cClassTribRecords.map((record) => ({
    ...record,
    cstDescription: record.cstDescription ?? cstMap.get(record.cst ?? "") ?? null,
  }));

  const cstOptions = distinct([
    ...cstRecords.map((record) => record.cst),
    ...records.map((record) => record.cst),
  ]);
  const taxRateTypeOptions = distinct(records.map((record) => record.taxRateType));
  const redIbsOptions = distinct(records.map((record) => record.pRedIBS));
  const redCbsOptions = distinct(records.map((record) => record.pRedCBS));
  const documentOptions = distinct(records.flatMap((record) => record.documents));
  const sourceFile = metadata?.sourceFile ?? "—";

  const hasActiveFilters =
    query.trim().length > 0 ||
    cstFilter !== "all" ||
    taxRateTypeFilter !== "all" ||
    redIbsFilter !== "all" ||
    redCbsFilter !== "all" ||
    documentFilter !== "all";

  const filteredRecords = hasActiveFilters
    ? records.filter((record) => {
        const queryText = normalizeQuery(query);
        const searchIndex = toSearchIndex(record);

        if (queryText) {
          const tokens = queryText.split(/\s+/).filter(Boolean);
          if (!tokens.every((token) => searchIndex.includes(token))) {
            return false;
          }
        }

        if (cstFilter !== "all" && record.cst !== cstFilter) return false;
        if (taxRateTypeFilter !== "all" && record.taxRateType !== taxRateTypeFilter) return false;
        if (redIbsFilter !== "all" && record.pRedIBS !== redIbsFilter) return false;
        if (redCbsFilter !== "all" && record.pRedCBS !== redCbsFilter) return false;
        if (documentFilter !== "all" && !(record.documents ?? []).includes(documentFilter)) return false;

        return true;
      })
    : [];

  const hasData = metadata !== null && records.length > 0;

  async function copyText(value: string, message: string) {
    try {
      await navigator.clipboard.writeText(value);
      setToast(message);
      window.setTimeout(() => setToast(null), 2000);
    } catch {
      setToast("Falha ao copiar o conteúdo.");
      window.setTimeout(() => setToast(null), 2000);
    }
  }

  function resetFilters() {
    setQuery("");
    setCstFilter("all");
    setTaxRateTypeFilter("all");
    setRedIbsFilter("all");
    setRedCbsFilter("all");
    setDocumentFilter("all");
  }

  const showEmptyState = !hasActiveFilters;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      {toast && (
        <div className="fixed right-4 top-4 z-50 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300 shadow-lg">
          {toast}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950 px-3 py-1 text-xs font-semibold text-orange-700 dark:text-orange-300">
              Ferramenta Fiscal
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Consulta Classificação Tributária IBS/CBS
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Consulte dados oficiais de cClassTrib, CST IBS/CBS, reduções, base legal e documentos fiscais aplicáveis.
            </p>
          </div>

          <div className="grid gap-2 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-2 lg:text-right">
            <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 px-3 py-2">
              <span className="block text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">Versão</span>
              <span className="font-medium text-slate-700 dark:text-slate-200">{metadata?.activeVersion ?? "sem versão"}</span>
            </div>
            <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 px-3 py-2">
              <span className="block text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">Registros</span>
              <span className="font-medium text-slate-700 dark:text-slate-200">{records.length.toLocaleString("pt-BR")} cClassTrib</span>
            </div>
            <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 px-3 py-2">
              <span className="block text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">CSTs</span>
              <span className="font-medium text-slate-700 dark:text-slate-200">{cstRecords.length.toLocaleString("pt-BR")}</span>
            </div>
            <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 px-3 py-2">
              <span className="block text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">Gerado em</span>
              <span className="font-medium text-slate-700 dark:text-slate-200">{metadata?.generatedAt ? new Date(metadata.generatedAt).toLocaleString("pt-BR") : "—"}</span>
            </div>
          </div>
        </div>

        <p className="mt-4 rounded-xl border border-amber-200/70 dark:border-amber-800/60 bg-amber-50/90 dark:bg-amber-950/40 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
          Esta ferramenta organiza dados de Classificação Tributária IBS/CBS para consulta. As informações devem ser conferidas com a legislação vigente e com o responsável fiscal da operação.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-slate-50/80 dark:bg-slate-800/40 px-4 py-3">
            <span className="block text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">Fonte</span>
            <span className="mt-1 block truncate text-sm font-medium text-slate-700 dark:text-slate-200">{sourceFile}</span>
          </div>
          <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-slate-50/80 dark:bg-slate-800/40 px-4 py-3">
            <span className="block text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">Classificações</span>
            <span className="mt-1 block text-sm font-medium text-slate-700 dark:text-slate-200">{records.length.toLocaleString("pt-BR")}</span>
          </div>
          <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-slate-50/80 dark:bg-slate-800/40 px-4 py-3">
            <span className="block text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">CSTs</span>
            <span className="mt-1 block text-sm font-medium text-slate-700 dark:text-slate-200">{cstRecords.length.toLocaleString("pt-BR")}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-4 sm:p-5 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-5">
          <label className="lg:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Busca</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busque por cClassTrib, CST, base legal ou NFSe"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-950/60 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-300 dark:focus:border-indigo-700 focus:outline-none"
            />
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">CST IBS/CBS</span>
            <select value={cstFilter} onChange={(event) => setCstFilter(event.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-950/60 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-300 dark:focus:border-indigo-700 focus:outline-none">
              <option value="all">Todos</option>
              {cstOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Tipo de alíquota</span>
            <select value={taxRateTypeFilter} onChange={(event) => setTaxRateTypeFilter(event.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-950/60 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-300 dark:focus:border-indigo-700 focus:outline-none">
              <option value="all">Todos</option>
              {taxRateTypeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Redução IBS</span>
            <select value={redIbsFilter} onChange={(event) => setRedIbsFilter(event.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-950/60 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-300 dark:focus:border-indigo-700 focus:outline-none">
              <option value="all">Todos</option>
              {redIbsOptions.map((option) => (
                <option key={option} value={option}>{option}%</option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Redução CBS</span>
            <select value={redCbsFilter} onChange={(event) => setRedCbsFilter(event.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-950/60 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-300 dark:focus:border-indigo-700 focus:outline-none">
              <option value="all">Todos</option>
              {redCbsOptions.map((option) => (
                <option key={option} value={option}>{option}%</option>
              ))}
            </select>
          </label>

          <label className="lg:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Documento fiscal aplicável</span>
            <select value={documentFilter} onChange={(event) => setDocumentFilter(event.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-950/60 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-300 dark:focus:border-indigo-700 focus:outline-none">
              <option value="all">Todos</option>
              {documentOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={resetFilters}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-950/60 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors hover:border-indigo-200 dark:hover:border-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Limpar busca
          </button>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {hasActiveFilters ? `${filteredRecords.length.toLocaleString("pt-BR")} resultado(s)` : "Digite um termo ou aplique filtros para consultar a tabela."}
          </p>
        </div>
      </div>

      {showEmptyState ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/40 p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Comece por uma busca rápida</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Exemplos: cClassTrib, CST, base legal ou documento fiscal.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">011002</span>
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">Art. 237</span>
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">NFSe</span>
          </div>
          {!hasData && (
            <p className="mt-4 text-sm text-amber-700 dark:text-amber-300">Nenhuma planilha oficial foi importada ainda.</p>
          )}
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/40 p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Nenhum resultado encontrado</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Tente ajustar a busca ou os filtros.</p>
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">Sugestões: 011002, Art. 237, NFSe</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Resultados</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{filteredRecords.length.toLocaleString("pt-BR")} registro(s)</p>
          </div>
          {filteredRecords.map((record) => (
            <article key={record.cClassTrib ?? `${record.cst}-${record.name}`} className="rounded-2xl border border-slate-200/60 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl p-5 shadow-sm">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-indigo-50 dark:bg-indigo-950 px-3 py-1 text-sm font-bold text-indigo-700 dark:text-indigo-300">{record.cClassTrib ?? "—"}</span>
                    <span className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">CST {record.cst ?? "—"}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{record.name ?? "Sem nome informado"}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{record.description ?? "—"}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button onClick={() => copyText(record.cClassTrib ?? "", "cClassTrib copiado.")} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors hover:border-indigo-200 dark:hover:border-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-400">Copiar cClassTrib</button>
                  <button onClick={() => copyText(record.cst ?? "", "CST copiado.")} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors hover:border-indigo-200 dark:hover:border-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-400">Copiar CST</button>
                  <button onClick={() => copyText(copyableText(record), "Resultado copiado para a área de transferência.")} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors hover:border-indigo-200 dark:hover:border-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-400">Copiar resultado completo</button>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {fieldBadge({ label: "Descrição do CST", value: record.cstDescription })}
                {fieldBadge({ label: "Tipo de alíquota", value: record.taxRateType })}
                {fieldBadge({ label: "Base legal", value: record.legalBase })}
                {fieldBadge({ label: "Referência legal", value: record.lawReference })}
                {fieldBadge({ label: "Redução IBS / CBS", value: joinVisible([record.pRedIBS ? `${record.pRedIBS}%` : null, record.pRedCBS ? `${record.pRedCBS}%` : null]) || "—" })}
                {fieldBadge({ label: "Documentos fiscais", value: formatDocuments(record.documents) })}
              </div>

              {record.link && (
                <div className="mt-4">
                  <Link href={record.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 px-3 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300 transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-900">
                    Link oficial
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H19.5M19.5 6V12M19.5 6L10.5 15" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6H6.75A2.25 2.25 0 004.5 8.25v9A2.25 2.25 0 006.75 19.5h9A2.25 2.25 0 0018 17.25V13.5" />
                    </svg>
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
