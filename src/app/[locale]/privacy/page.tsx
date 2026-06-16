import { redirect } from "next/navigation";

export default async function PrivacyRedirect() {
  redirect("privacy-policy");
}
