import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/flowpilot/site";
import { pageMeta } from "@/lib/meta";
export const Route=createFileRoute("/privacy")({head:()=>pageMeta("Privacy","FlowPilot privacy page."),component:()=> <SiteLayout><PageHeader eyebrow="FlowPilot" title="Privacy" description="This page is not ready yet."/></SiteLayout>});
