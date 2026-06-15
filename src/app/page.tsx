import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  let locale = "en";
  if (acceptLanguage.startsWith("pt")) locale = "pt";
  else if (acceptLanguage.startsWith("es")) locale = "es";
  else if (acceptLanguage.startsWith("fr")) locale = "fr";
  else if (acceptLanguage.startsWith("it")) locale = "it";
  else if (acceptLanguage.startsWith("de")) locale = "de";
  else if (acceptLanguage.startsWith("ru")) locale = "ru";
  else if (acceptLanguage.startsWith("ar")) locale = "ar";
  else if (acceptLanguage.startsWith("zh")) locale = "zh";
  else if (acceptLanguage.startsWith("ja")) locale = "ja";

  redirect(`/${locale}`);
}
