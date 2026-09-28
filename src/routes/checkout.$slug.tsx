import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/flowpilot/site";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/meta";
export const Route=createFileRoute("/checkout/$slug")({head:()=>pageMeta("Checkout","FlowPilot product checkout."),component:()=> <SiteLayout><PageHeader eyebrow="Checkout" title="Checkout is not ready yet." description="Purchases are paused until payment verification is complete."/><div className="site-container pb-20"><Button asChild><Link to="/products">Back to products</Link></Button></div></SiteLayout>});
