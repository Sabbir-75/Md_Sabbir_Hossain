import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/flowpilot/site";
import { ProductCard } from "@/components/flowpilot/cards";
import { products } from "@/lib/flowpilot-data";
import { pageMeta } from "@/lib/meta";
export const Route = createFileRoute("/products")({head:()=>pageMeta("AI Digital Products","Browse practical FlowPilot automation templates, workflows and AI products."),component:()=> <SiteLayout><PageHeader eyebrow="Digital products" title="Ready-made systems for real work." description="Explore automation templates and AI resources."/><section className="site-container section-band grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(p=><ProductCard key={p.slug} product={p}/>)}</section></SiteLayout>});
