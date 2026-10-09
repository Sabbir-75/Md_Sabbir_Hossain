import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/flowpilot/site";
import { AuthCard, Field, PasswordField, safeRedirect } from "@/components/flowpilot/auth";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/signup")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string | undefined } => ({
    redirect: typeof s["redirect"] === "string" ? s["redirect"] : undefined,
  }),
  head: () => pageMeta("Create Account", "Create a FlowPilot account to purchase AI automation products."),
  component: SignupPage,
});

function SignupPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password"));
    if (password.length < 8) return void toast.error("Password must be at least 8 characters.");
    if (password !== String(f.get("confirm"))) return void toast.error("Passwords do not match.");
    setBusy(true);
    const full_name = String(f.get("name")).trim();
    const phone = String(f.get("phone")).trim();
    const { data, error } = await supabase.auth.signUp({
      email: String(f.get("email")).trim(),
      password,
      options: { data: { full_name, phone }, emailRedirectTo: `${window.location.origin}/login` },
    });
    setBusy(false);
    if (error) return void toast.error(error.message);
    if (data.session && data.user) {
      await supabase.from("profiles").upsert({ id: data.user.id, full_name, phone });
      toast.success("Account created!");
      navigate({ to: safeRedirect(redirect) });
    } else {
      toast.success("Check your email to confirm your account.");
      navigate({ to: "/login", search: { redirect } });
    }
  };
  return (
    <SiteLayout>
      <AuthCard title="Create account" description="Join FlowPilot to buy templates and track orders.">
        <form onSubmit={submit} className="grid gap-4">
          <Field label="Full name" name="name" required maxLength={100} />
          <Field label="Phone" name="phone" type="tel" required maxLength={20} />
          <Field label="Email" name="email" type="email" required autoComplete="email" />
          <PasswordField name="password" required autoComplete="new-password" />
          <PasswordField label="Confirm password" name="confirm" required autoComplete="new-password" />
          <Button type="submit" disabled={busy}>{busy ? "Creating..." : "Sign up"}</Button>
          <p className="text-center text-sm text-muted-foreground">
            Already registered?{" "}
            <Link to="/login" search={{ redirect }} className="text-primary hover:underline">Login</Link>
          </p>
        </form>
      </AuthCard>
    </SiteLayout>
  );
}
