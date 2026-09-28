import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/flowpilot/site";
import { pageMeta } from "@/lib/meta";
export const Route = createFileRoute("/contact")({
  head: () => pageMeta("Contact FlowPilot", "Discuss an AI automation project with FlowPilot."),
  component: () => (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Let’s make your workflow work better."
        description="Tell me what is slowing your business down."
      />
      <div className="site-container section-band">
        <a className="text-primary underline" href="mailto:hello@flowpilot.com">
          hello@flowpilot.com
        </a>
        <p className="mt-3 text-sm text-muted-foreground">
          Please replace this placeholder email before publishing.
        </p>
      </div>
    </SiteLayout>
  ),
});
