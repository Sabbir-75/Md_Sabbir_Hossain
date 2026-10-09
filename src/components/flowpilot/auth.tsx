import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export function safeRedirect(path?: string) {
  return path && path.startsWith("/") && !path.startsWith("//") ? path : "/dashboard";
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);
  return { user, loading };
}

export function Field({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={props.id ?? props.name}>{label}</Label>
      <Input id={props.id ?? props.name} {...props} />
    </div>
  );
}

export function PasswordField({ label = "Password", ...props }: { label?: string } & React.ComponentProps<typeof Input>) {
  const [show, setShow] = useState(false);
  return (
    <div className="grid gap-2">
      <Label htmlFor={props.name}>{label}</Label>
      <div className="relative">
        <Input id={props.name} type={show ? "text" : "password"} className="pr-10" {...props} />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

export function AuthCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="site-container flex min-h-screen items-center justify-center pb-16 pt-28">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg sm:p-8">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
