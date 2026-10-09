import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/flowpilot/site";
import { Field, useUser } from "@/components/flowpilot/auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/lib/flowpilot-data";
import { pageMeta } from "@/lib/meta";

export const BKASH_NUMBER = "01756750000";

export const Route = createFileRoute("/checkout/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) =>
    pageMeta(
      loaderData ? `Checkout: ${loaderData.product.title}` : "Checkout",
      "Pay securely with bKash and submit your transaction ID.",
    ),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { product } = Route.useLoaderData();
  const { user, loading } = useUser();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const f = new FormData(e.currentTarget);
    const trx = String(f.get("trx")).trim().toUpperCase();
    if (!/^[A-Z0-9]{6,20}$/.test(trx)) return void toast.error("Enter a valid bKash transaction ID.");
    const phone = String(f.get("phone")).trim();
    const bkash = String(f.get("bkash")).trim();
    if (!/^01\d{9}$/.test(bkash)) return void toast.error("bKash number must be 11 digits starting with 01.");
    setBusy(true);
    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      product_slug: product.slug,
      customer_name: String(f.get("name")).trim().slice(0, 100),
      phone,
      bkash_number: bkash,
      trx_id: trx,
      note: String(f.get("note") ?? "").slice(0, 500),
    });
    setBusy(false);
    if (error) {
      return void toast.error(
        error.code === "23505" ? "This transaction ID has already been used." : error.message,
      );
    }
    setDone(trx);
  };

  return (
    <SiteLayout>
      <section className="site-container grid gap-8 pb-20 pt-32 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-xl border border-border bg-card p-6">
          <img src={product.image} alt={product.title} className="aspect-video w-full rounded-lg object-cover" />
          <p className="eyebrow mt-5">{product.category}</p>
          <h1 className="mt-2 text-3xl font-semibold">{product.title}</h1>
          <p className="mt-2 text-muted-foreground">{product.subtitle}</p>
          <p className="mt-5 text-3xl font-bold text-primary">৳{product.price.toLocaleString()}</p>
          <div className="mt-6 rounded-lg bg-accent p-4 text-sm leading-6">
            <p className="font-semibold">How to pay with bKash</p>
            <ol className="mt-2 list-decimal pl-5">
              <li>Open bKash and choose “Send Money”.</li>
              <li>Send ৳{product.price.toLocaleString()} to <b>{BKASH_NUMBER}</b>.</li>
              <li>Copy the Transaction ID (TrxID) and submit it here.</li>
            </ol>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : !user ? (
            <div className="grid gap-4">
              <h2 className="text-2xl font-semibold">Login required</h2>
              <p className="text-muted-foreground">Please sign in to complete your purchase.</p>
              <Button asChild>
                <Link to="/login" search={{ redirect: `/checkout/${product.slug}` }}>Login to continue</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/signup" search={{ redirect: `/checkout/${product.slug}` }}>Create account</Link>
              </Button>
            </div>
          ) : done ? (
            <div className="grid justify-items-start gap-4">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h2 className="text-2xl font-semibold">Order submitted!</h2>
              <p className="text-muted-foreground">
                TrxID <b>{done}</b> received. We will verify the payment and confirm your order shortly.
              </p>
              <Button asChild><Link to="/dashboard">View my orders</Link></Button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4">
              <h2 className="text-2xl font-semibold">Payment details</h2>
              <Field label="Full name" name="name" required maxLength={100} defaultValue={user.user_metadata?.["full_name"] ?? ""} />
              <Field label="Phone" name="phone" type="tel" required maxLength={20} defaultValue={user.user_metadata?.["phone"] ?? ""} />
              <Field label="bKash number (sent from)" name="bkash" placeholder="01XXXXXXXXX" required maxLength={11} />
              <Field label="Transaction ID (TrxID)" name="trx" placeholder="e.g. 9BG7XK2LQP" required maxLength={20} />
              <div className="grid gap-2">
                <label htmlFor="note" className="text-sm font-medium">Note (optional)</label>
                <Textarea id="note" name="note" maxLength={500} />
              </div>
              <Button type="submit" disabled={busy}>{busy ? "Submitting..." : "Confirm order"}</Button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
