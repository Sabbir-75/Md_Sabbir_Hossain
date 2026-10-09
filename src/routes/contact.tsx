import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PageHeader, SiteLayout } from "@/components/flowpilot/site";
import { Field } from "@/components/flowpilot/auth";
import { whatsappLink } from "@/components/flowpilot/whatsapp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/contact")({
  head: () => pageMeta("Contact FlowPilot", "Discuss an AI automation project with FlowPilot."),
  component: ContactPage,
});

function ContactPage() {
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setBusy(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: String(f.get("name")).trim().slice(0, 100),
      email: String(f.get("email")).trim().slice(0, 255),
      phone: String(f.get("phone") ?? "").trim().slice(0, 20),
      subject: String(f.get("subject") ?? "").trim().slice(0, 150),
      message: String(f.get("message")).trim().slice(0, 3000),
    });
    setBusy(false);
    if (error) return void toast.error("Message could not be sent. Please try WhatsApp.");
    toast.success("Message sent! I'll reply soon.");
    form.reset();
  };
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Let’s make your workflow work better."
        description="Tell me what is slowing your business down."
      />
      <div className="site-container grid gap-8 pb-20 lg:grid-cols-[1fr_1.4fr]">
        <div className="grid content-start gap-4">
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary">
            <FaWhatsapp className="h-6 w-6 text-primary" /> <span><b>WhatsApp</b><br />+880 1756-750000</span>
          </a>
          <a href="tel:+8801756750000" className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary">
            <Phone className="h-6 w-6 text-primary" /> <span><b>Phone</b><br />+880 1756-750000</span>
          </a>
          <a href="mailto:hello@flowpilot.com" className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary">
            <Mail className="h-6 w-6 text-primary" /> <span><b>Email</b><br />hello@flowpilot.com</span>
          </a>
        </div>
        <form onSubmit={submit} className="grid gap-4 rounded-xl border border-border bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required maxLength={100} />
            <Field label="Email" name="email" type="email" required maxLength={255} />
            <Field label="Phone" name="phone" type="tel" maxLength={20} />
            <Field label="Subject" name="subject" maxLength={150} />
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <Textarea id="message" name="message" required maxLength={3000} rows={6} />
          </div>
          <Button type="submit" disabled={busy}>{busy ? "Sending..." : "Send message"}</Button>
        </form>
      </div>
    </SiteLayout>
  );
}
