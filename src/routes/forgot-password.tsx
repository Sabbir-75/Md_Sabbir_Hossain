import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/flowpilot/site";
import { AuthCard, Field } from "@/components/flowpilot/auth";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/forgot-password")({
  head: () => pageMeta("Forgot Password", "Reset your FlowPilot account password by email."),
  component: () => {
    const [sent, setSent] = useState(false);
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const email = String(new FormData(e.currentTarget).get("email")).trim();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) return toast.error(error.message);
      setSent(true);
    };
    return (
      <SiteLayout>
        <AuthCard title="Forgot password" description="We will email you a secure reset link.">
          {sent ? (
            <p className="text-sm">Reset link sent. Please check your inbox.</p>
          ) : (
            <form onSubmit={submit} className="grid gap-4">
              <Field label="Email" name="email" type="email" required />
              <Button type="submit">Send reset link</Button>
            </form>
          )}
          <Link to="/login" className="mt-4 block text-center text-sm text-primary hover:underline">Back to login</Link>
        </AuthCard>
      </SiteLayout>
    );
  },
});
