import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/flowpilot/home";
import { PageHeader, SiteLayout } from "@/components/flowpilot/site";
import { services } from "@/lib/flowpilot-data";
import { serviceIcons } from "@/components/flowpilot/icons";
import { pageMeta } from "@/lib/meta";
export const Route = createFileRoute("/services")({
  head: () =>
    pageMeta(
      "AI Automation Services",
      "Explore FlowPilot services for AI agents, n8n, Messenger, WhatsApp, APIs and business operations.",
    ),
  component: Services,
});
function Services() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Services"
        title="Build the automation your business actually needs."
        description="Focused systems for customer conversations, lead flow, operations, support and content—designed around your tools and constraints."
      />
      <section className="section-band">
        <div className="site-container grid gap-5 lg:grid-cols-2">
          {services.map(([icon, title, desc], i) => {
            const Icon = serviceIcons[icon as keyof typeof serviceIcons];
            return (
              <article
                className="rounded-xl border border-border bg-card p-7 shadow-card"
                key={title}
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-accent text-primary">
                    <Icon />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary">0{i + 1}</span>
                    <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
                    <p className="mt-2 leading-7 text-muted-foreground">{desc}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-2 border-t border-border pt-5 sm:grid-cols-3">
                  {["Workflow mapping", "Secure integration", "Testing & handoff"].map((x) => (
                    <span className="flex items-center gap-2 text-sm" key={x}>
                      <Check className="h-4 w-4 text-primary" />
                      {x}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="section-band bg-muted/50">
        <div className="site-container grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Delivery process</p>
            <h2 className="mt-3 text-4xl font-semibold">
              Start small. Prove value. Expand carefully.
            </h2>
          </div>
          <div className="grid gap-3">
            {[
              "Discovery and process map",
              "Solution design and access plan",
              "Build, test and exception handling",
              "Launch, documentation and support",
            ].map((x, i) => (
              <div className="flex gap-4 rounded-lg border border-border bg-card p-4" key={x}>
                <strong className="text-primary">{i + 1}</strong>
                <span>{x}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </SiteLayout>
  );
}
