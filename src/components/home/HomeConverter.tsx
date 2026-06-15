"use client";

import ToolEditor from "@/components/tools/ToolEditor";
import type { TransformAction } from "@/components/tools/ToolEditor";
import { useTranslation } from "@/i18n/I18nProvider";
import {
  toUpperCase,
  toLowerCase,
  capitalize,
  toSentenceCase,
  removeExtraSpaces,
} from "@/lib/tools/transforms";

export default function HomeConverter() {
  const { t } = useTranslation();

  const transforms: TransformAction[] = [
    { label: t("tools.transforms.sentenceCase"), fn: toSentenceCase, available: true },
    { label: t("tools.transforms.lowercase"), fn: toLowerCase, available: true },
    { label: t("tools.transforms.uppercase"), fn: toUpperCase, available: true },
    { label: t("tools.transforms.capitalizeEachWord"), fn: capitalize, available: true },
    { label: t("tools.transforms.removeExtraSpaces"), fn: removeExtraSpaces, available: true },
    { label: t("tools.transforms.titleCase"), fn: capitalize, available: false },
    { label: t("tools.transforms.wordCounter"), fn: (s: string) => s, available: false },
  ];

  return (
    <ToolEditor
      compact
      title=""
      description=""
      placeholder={t("common.placeholder")}
      transforms={transforms}
    />
  );
}
