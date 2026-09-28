import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/flowpilot/site";
import { pageMeta } from "@/lib/meta";
export const Route=createFileRoute("/login")({head:()=>pageMeta("Login","FlowPilot login page."),component:()=> <SiteLayout><PageHeader eyebrow="FlowPilot" title="Login" description="This page is not ready yet."/></SiteLayout>});
