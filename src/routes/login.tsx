import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/flowpilot/site";
import { AuthCard, Field, PasswordField, safeRedirect } from "@/components/flowpilot/auth";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string | undefined } => ({
    redirect: typeof s["redirect"] === "string" ? s["redirect"] : undefined,
  }),
  head: () => pageMeta("Login", "Sign in to your FlowPilot account to buy and download products."),
  component: LoginPage,
});

function LoginPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(f.get("email")).trim(),
      password: String(f.get("password")),
    });
    setBusy(false);
    if (error) return void toast.error(error.message);
    toast.success("Welcome back!");
    navigate({ to: safeRedirect(redirect) });
  };
  return (
    <SiteLayout>
      <AuthCard title="Welcome back" description="Sign in to manage orders and downloads.">
        <form onSubmit={submit} className="grid gap-4">
          <Field label="Email" name="email" type="email" required autoComplete="email" />
          <PasswordField name="password" required autoComplete="current-password" />
          <Link to="/forgot-password" className="justify-self-end text-sm text-primary hover:underline">
            Forgot password?
          </Link>
          <Button type="submit" disabled={busy}>{busy ? "Signing in..." : "Login"}</Button>
          <p className="text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link to="/signup" search={{ redirect }} className="text-primary hover:underline">Sign up</Link>
          </p>
        </form>
      </AuthCard>
    </SiteLayout>
  );
}
