import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/flowpilot/cards";
import { PageHeader, SiteLayout } from "@/components/flowpilot/site";
import { projects } from "@/lib/flowpilot-data";
import { pageMeta } from "@/lib/meta";
export const Route=createFileRoute("/projects")({head:()=>pageMeta("Automation Projects","Explore FlowPilot n8n, AI, Messenger, WhatsApp and business automation projects."),component:Projects});
function Projects(){const [filter,setFilter]=useState("All");const cats=["All","AI Automation","n8n","Messenger","WhatsApp","Business Automation"];const shown=filter==="All"?projects:projects.filter(p=>p.category===filter);return <SiteLayout><PageHeader eyebrow="Projects" title="Automation systems behind better operations." description="Explore complete workflows for customer conversations, business processes, support and content."/><section className="section-band"><div className="site-container"><div className="mb-8 flex flex-wrap gap-2">{cats.map(c=><Button key={c} size="sm" variant={c===filter?"default":"outline"} onClick={()=>setFilter(c)}>{c}</Button>)}</div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{shown.map(p=><ProjectCard key={p.slug} project={p}/>)}</div></div></section></SiteLayout>}
