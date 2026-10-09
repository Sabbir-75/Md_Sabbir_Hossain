import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteLayout } from "@/components/flowpilot/site";
import { AuthCard, PasswordField } from "@/components/flowpilot/auth";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/reset-password")({
  head: () => pageMeta("Reset Password", "Choose a new password for your FlowPilot account."),
  component: () => {
    const navigate = useNavigate();
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const password = String(new FormData(e.currentTarget).get("password"));
      if (password.length < 8) return toast.error("Password must be at least 8 characters.");
      const { error } = await supabase.auth.updateUser({ password });
      if (error) return toast.error(error.message);
      toast.success("Password updated.");
      navigate({ to: "/dashboard" });
    };
    return (
      <SiteLayout>
        <AuthCard title="Set new password" description="Enter a new password of at least 8 characters.">
          <form onSubmit={submit} className="grid gap-4">
            <PasswordField label="New password" name="password" required />
            <Button type="submit">Update password</Button>
          </form>
        </AuthCard>
      </SiteLayout>
    );
  },
});
