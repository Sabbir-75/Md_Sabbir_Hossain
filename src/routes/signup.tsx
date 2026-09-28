import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/flowpilot/site";
import { pageMeta } from "@/lib/meta";
export const Route=createFileRoute("/signup")({head:()=>pageMeta("Signup","FlowPilot signup page."),component:()=> <SiteLayout><PageHeader eyebrow="FlowPilot" title="Signup" description="This page is not ready yet."/></SiteLayout>});
