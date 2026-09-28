import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/flowpilot/site";
import { pageMeta } from "@/lib/meta";
export const Route=createFileRoute("/terms")({head:()=>pageMeta("Terms","FlowPilot terms page."),component:()=> <SiteLayout><PageHeader eyebrow="FlowPilot" title="Terms" description="This page is not ready yet."/></SiteLayout>});
