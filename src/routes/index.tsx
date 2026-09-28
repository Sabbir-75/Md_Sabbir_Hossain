import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/flowpilot/home";
import { SiteLayout } from "@/components/flowpilot/site";
import { pageMeta } from "@/lib/meta";
export const Route=createFileRoute("/")({head:()=>pageMeta("AI Automation for Smarter Business","FlowPilot builds AI agents, n8n workflows and practical automation systems for growing businesses."),component:()=> <SiteLayout><HomePage/></SiteLayout>});
