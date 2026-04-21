import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to access your salary data monitoring dashboard and alerts.",
};

type SignInPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string;
    error?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const rawCallbackUrl = resolvedSearchParams?.callbackUrl;
  const callbackUrl =
    typeof rawCallbackUrl === "string" && rawCallbackUrl.startsWith("/")
      ? rawCallbackUrl
      : "/dashboard";
  const initialError =
    typeof resolvedSearchParams?.error === "string"
      ? "Sign in failed. Check your credentials."
      : null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-12">
      <div className="mb-8 w-full max-w-md text-center">
        <Link href="/" className="text-sm text-slate-400 hover:text-slate-200">
          Back to landing page
        </Link>
      </div>
      <div className="w-full max-w-md">
        <AuthForm callbackUrl={callbackUrl} initialError={initialError} />
      </div>
    </main>
  );
}
