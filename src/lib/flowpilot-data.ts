import founder from "@/assets/flowpilot-founder.png.asset.json";
import logo from "@/assets/flowpilot-logo.png.asset.json";
import workflowOverview from "@/assets/workflow-overview.png.asset.json";
import messengerWorkflow from "@/assets/messenger-workflow.png.asset.json";
import businessWorkflow from "@/assets/business-workflow.png.asset.json";
import automationWorkflow from "@/assets/automation-workflow.png.asset.json";

export const assets = {
  founder: founder.url,
  logo: logo.url,
  workflowOverview: workflowOverview.url,
  messengerWorkflow: messengerWorkflow.url,
  businessWorkflow: businessWorkflow.url,
  automationWorkflow: automationWorkflow.url,
};

export type Product = {
  slug: string; title: string; subtitle: string; category: string; price: number; oldPrice: number;
  rating: number; sales: number; status: "New" | "Popular"; image: string; description: string;
  features: string[]; includes: string[]; requirements: string[]; technologies: string[];
};

const covers = [assets.workflowOverview, assets.messengerWorkflow, assets.businessWorkflow, assets.automationWorkflow];
export const products: Product[] = [
  ["ai-lead-generator","AI Lead Generator Machine","Capture, qualify and route leads automatically.","AI Agent",2990,4490,4.9,184,"Popular"],
  ["n8n-starter-pack","n8n Automation Starter Pack","Eight practical workflows to start automating today.","n8n",1290,1990,4.8,132,"Popular"],
  ["messenger-template","AI Messenger Automation Template","Turn Messenger chats into organized sales opportunities.","Messenger",1890,2790,4.8,96,"New"],
  ["customer-support-agent","AI Customer Support Agent","Launch a helpful, brand-aware support assistant.","AI Agent",3490,4990,4.6,190,"Popular"],
  ["ai-content-machine","AI Content Machine","Plan and draft consistent content from one workflow.","Content",990,1490,4.9,1840,"Popular"],
  ["midjourney-prompt-vault","Midjourney Prompt Vault","Prompt structures for polished visual concepts.","Prompt Pack",590,990,4.6,1670,"Popular"],
  ["ai-agent-blueprint","AI Agent Blueprint","Design reliable AI agents with practical architecture.","AI Agent",2990,4490,4.7,390,"New"],
  ["whatsapp-auto-reply","WhatsApp Auto-Reply Workflow","Organize fast replies, qualification and follow-up.","WhatsApp",1590,2390,4.8,420,"Popular"],
  ["ecommerce-order-automation","E-commerce Order Automation","Connect orders, inventory and customer updates.","E-commerce",2490,3490,4.8,510,"New"],
  ["sheets-crm","Google Sheets CRM Automation","Turn a familiar sheet into a responsive lead CRM.","Business",1390,2090,4.7,640,"Popular"],
  ["make-lead-machine","Make.com Lead Machine","A visual lead pipeline built for Make.com.","Make.com",1790,2490,4.7,610,"New"],
  ["zapier-office-pack","Zapier Office Pack","Automations for everyday office operations.","Zapier",1390,1990,4.5,280,"New"],
].map((item, index) => ({
  slug: item[0] as string, title: item[1] as string, subtitle: item[2] as string, category: item[3] as string,
  price: item[4] as number, oldPrice: item[5] as number, rating: item[6] as number, sales: item[7] as number,
  status: item[8] as "New" | "Popular", image: covers[index % covers.length],
  description: "A production-ready automation resource built for practical business use, clear setup and reliable handoff.",
  features: ["Ready-to-customize workflow", "Error-aware structure", "Clear business logic", "Reusable building blocks"],
  includes: ["Workflow files", "Step-by-step setup guide", "Configuration checklist", "Prompt and field templates"],
  requirements: ["An automation platform account", "Required third-party API access", "Basic account configuration"],
  technologies: ["n8n", "OpenAI", "Webhooks", "Google Sheets"],
}));

export type Project = { slug:string; title:string; subtitle:string; category:string; image:string; overview:string; problem:string; solution:string; technologies:string[]; features:string[]; results:string[] };
export const projects: Project[] = [
  ["messenger-ai-automation","Messenger AI Automation","Intelligent capture, qualification and follow-up.","Messenger",assets.messengerWorkflow],
  ["n8n-business-automation","n8n Business Automation","A connected engine across forms, APIs and reports.","n8n",assets.businessWorkflow],
  ["ai-customer-support","AI Customer Support","Accurate answers with safe human escalation.","AI Automation",assets.workflowOverview],
  ["product-order-automation","Product & Order Automation","Orders move without spreadsheet chaos.","Business Automation",assets.automationWorkflow],
  ["whatsapp-automation","WhatsApp Automation","Qualification, reminders and team handoff.","WhatsApp",assets.businessWorkflow],
  ["ai-content-automation","AI Content Automation","A controlled pipeline from brief to approved draft.","AI Automation",assets.automationWorkflow],
].map((item) => ({ slug:item[0], title:item[1], subtitle:item[2], category:item[3], image:item[4], overview:"A production automation that connects AI, business data and people in one maintainable workflow.", problem:"Manual handoffs caused slow responses, fragmented data and repeated work.", solution:"A modular n8n system was designed with validation, clear routing, retries and human checkpoints.", technologies:["n8n","OpenAI","Supabase","Webhooks"], features:["Intent routing","Structured records","Error handling","Human handoff"], results:["Faster response","Cleaner data","Less repetitive work"] } as Project));

export const services = [
 ["Bot","AI Agent Automation","Agents that reason, use tools and complete real tasks."], ["Workflow","n8n Workflow Automation","Reliable workflows connecting your everyday tools."],
 ["MessageCircle","Messenger Automation","Turn conversations into qualified leads."], ["Phone","WhatsApp Automation","Fast, structured customer conversations."],
 ["Users","Lead Automation","Capture, enrich and route every serious lead."], ["Headphones","Customer Support Automation","Resolve common questions and escalate the rest."],
 ["ShoppingCart","Product & Order Automation","Keep product and order operations moving."], ["Braces","API Integration","Connect tools that do not talk yet."],
 ["Sparkles","Content Automation","A repeatable system from idea to publication."],
];
export const faqs = [
 ["What can n8n automate for my business?","Forms, CRMs, spreadsheets, messaging tools, APIs and AI models can work together without repetitive copying."],
 ["Can you automate Facebook Messenger leads?","Yes. The flow can answer, collect details, qualify intent and alert your team."],
 ["Do WhatsApp automations replace my team?","No. Automation handles repeatable steps and hands complex conversations to a person."],
 ["Can Google Sheets work as a lightweight CRM?","Yes. A structured sheet can manage stages, reminders and reporting for smaller teams."],
 ["What is a custom AI agent?","An AI system designed for a specific job, with approved knowledge, tools and clear boundaries."],
 ["How long does a custom automation take?","Focused workflows may take days; larger systems are planned and delivered in stages."],
 ["Can you connect tools with an API?","If a tool offers an API or webhook, it can usually be connected with validation and retries."],
 ["Will I be able to manage it later?","Yes. Workflows are organized and documented for practical ongoing management."],
 ["Do you test before deployment?","Yes. Every workflow is tested with realistic inputs, failure paths and handoffs."],
];
