import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu,
  Moon,
  Sun,
  User,
  X,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { FaPinterestP } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { assets } from "@/lib/flowpilot-data";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/projects", "Projects"],
  ["/products", "Products"],
  ["/contact", "Contact"],
] as const;

export function ThemeButton() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("flowpilot-theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle color theme"
      title="Toggle theme"
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("flowpilot-theme", next ? "dark" : "light");
      }}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const navigate = useNavigate();
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) {
        setUser(session?.user ?? null);
        router.invalidate();
      }
    });
    return () => data.subscription.unsubscribe();
  }, [router]);
  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-xl border border-border bg-nav/95 px-4 shadow-nav backdrop-blur-lg">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={assets.logo} className="h-9 w-9 rounded-lg object-cover" alt="FlowPilot logo" />
          <span className="text-xl font-bold text-foreground">
            Flow<span className="text-primary">Pilot</span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="nav-link"
              activeProps={{ className: "nav-link nav-active" }}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeButton />
          {user ? (
            <>
              <Button variant="outline" asChild>
                <Link to="/dashboard">
                  <User /> Account
                </Link>
              </Button>
              <Button onClick={logout}>
                <LogOut /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">
                  <User /> Login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeButton />
          <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-7xl animate-scale-in rounded-xl border border-border bg-background p-3 shadow-lg lg:hidden">
          {links.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="block rounded-lg px-3 py-3 font-medium hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
            <Button variant="outline" asChild>
              <Link to={user ? "/dashboard" : "/login"}>{user ? "Dashboard" : "Login"}</Link>
            </Button>
            {user ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-footer py-14 text-footer-foreground">
      <div className="site-container grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} className="h-10 w-10 rounded-lg" alt="FlowPilot" />
            <span className="text-xl font-bold">FlowPilot</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-footer-muted">
            Practical AI automation, connected workflows and digital systems built for real business
            operations.
          </p>
          <div className="mt-5 flex gap-2">
            <Social href="https://www.facebook.com/share/1Du1jHzEft/" label="Facebook">
              <Facebook />
            </Social>
            <Social href="https://www.linkedin.com/in/mdsabbirhossain-main/" label="LinkedIn">
              <Linkedin />
            </Social>
            <Social href="https://www.instagram.com/mdsabbirhossain_main" label="Instagram">
              <Instagram />
            </Social>
            <Social href="https://www.pinterest.com/mdsabbirhossain_main/" label="Pinterest">
              <FaPinterestP />
            </Social>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Explore</h3>
          <div className="mt-4 grid gap-3 text-sm text-footer-muted">
            {links.slice(1).map(([to, l]) => (
              <Link key={to} to={to} className="hover:text-primary">
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Legal</h3>
          <div className="mt-4 grid gap-3 text-sm text-footer-muted">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
            <a href="mailto:hello@flowpilot.com">hello@flowpilot.com</a>
          </div>
        </div>
      </div>
      <div className="site-container mt-10 border-t border-footer-border pt-6 text-sm text-footer-muted">
        © 2026 FlowPilot. Built by Md. Sabbir Hossain.
      </div>
    </footer>
  );
}
function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-[4px] border border-footer-border transition-colors hover:border-primary hover:text-primary [&_svg]:h-4 [&_svg]:w-4"
    >
      {children}
    </a>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-header">
      <div className="site-container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">{title}</h2>
        {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function ArrowLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Button variant="outline" asChild>
      <Link to={to}>
        <span>{children}</span>
        <ChevronRight className="transition-transform group-hover:translate-x-1" />
      </Link>
    </Button>
  );
}
export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
