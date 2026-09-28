import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/flowpilot/site";
import { pageMeta } from "@/lib/meta";
export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => pageMeta("Dashboard", "FlowPilot customer account dashboard."),
  component: () => (
    <SiteLayout>
      <PageHeader
        eyebrow="Account"
        title="Dashboard"
        description="Your account area is not ready yet."
      />
    </SiteLayout>
  ),
});
