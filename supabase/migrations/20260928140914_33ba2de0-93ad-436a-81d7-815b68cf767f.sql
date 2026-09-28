CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.order_status AS ENUM ('Pending', 'Confirmed', 'Processing', 'Completed', 'Cancelled');
CREATE TYPE public.payment_status AS ENUM ('Submitted', 'Verified', 'Rejected');

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  full_name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  avatar_url text,
  is_blocked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE POLICY "profiles_own_read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "profiles_own_insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_own_update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "roles_own_read" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "roles_admin_all" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, title text NOT NULL, subtitle text NOT NULL,
  description text NOT NULL, category text NOT NULL, image_url text, gallery jsonb NOT NULL DEFAULT '[]',
  price integer NOT NULL, old_price integer, rating numeric(2,1) NOT NULL DEFAULT 4.8, sales_count integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'New', features jsonb NOT NULL DEFAULT '[]', includes jsonb NOT NULL DEFAULT '[]',
  requirements jsonb NOT NULL DEFAULT '[]', technologies jsonb NOT NULL DEFAULT '[]', delivery_url text,
  is_published boolean NOT NULL DEFAULT true, sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON public.products FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "products_admin_all" ON public.products FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, title text NOT NULL, subtitle text NOT NULL,
  overview text NOT NULL, problem text NOT NULL, solution text NOT NULL, category text NOT NULL, image_url text,
  gallery jsonb NOT NULL DEFAULT '[]', technologies jsonb NOT NULL DEFAULT '[]', features jsonb NOT NULL DEFAULT '[]',
  results jsonb NOT NULL DEFAULT '[]', is_published boolean NOT NULL DEFAULT true, sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_public_read" ON public.projects FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "projects_admin_all" ON public.projects FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, title text NOT NULL, short_description text NOT NULL,
  description text NOT NULL, icon text NOT NULL DEFAULT 'Bot', includes jsonb NOT NULL DEFAULT '[]', use_cases jsonb NOT NULL DEFAULT '[]',
  benefits jsonb NOT NULL DEFAULT '[]', is_published boolean NOT NULL DEFAULT true, sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services_public_read" ON public.services FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "services_admin_all" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, company text NOT NULL DEFAULT '', quote text NOT NULL,
  rating integer NOT NULL DEFAULT 5, avatar_url text, is_placeholder boolean NOT NULL DEFAULT true,
  is_published boolean NOT NULL DEFAULT true, sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_public_read" ON public.reviews FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "reviews_admin_all" ON public.reviews FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER reviews_updated BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), question text NOT NULL, answer text NOT NULL, category text NOT NULL DEFAULT 'General',
  is_published boolean NOT NULL DEFAULT true, sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "faqs_public_read" ON public.faqs FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "faqs_admin_all" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER faqs_updated BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, product_id uuid NOT NULL REFERENCES public.products(id),
  customer_name text NOT NULL, customer_phone text NOT NULL, bkash_sender_number text NOT NULL, trx_id text NOT NULL UNIQUE,
  amount integer NOT NULL, note text, status public.order_status NOT NULL DEFAULT 'Pending',
  payment_status public.payment_status NOT NULL DEFAULT 'Submitted', admin_note text,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.orders TO authenticated;
GRANT UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_own_read" ON public.orders FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "orders_own_create" ON public.orders FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() AND status = 'Pending' AND payment_status = 'Submitted');
CREATE POLICY "orders_admin_all" ON public.orders FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER orders_updated BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, email text NOT NULL, phone text, company text,
  service text NOT NULL, budget text, message text NOT NULL, status text NOT NULL DEFAULT 'New', created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contact_public_create" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (status = 'New');
CREATE POLICY "contact_admin_all" ON public.contact_messages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.site_settings (
  id integer PRIMARY KEY DEFAULT 1, bkash_number text NOT NULL DEFAULT '01XXXXXXXXX', whatsapp_number text NOT NULL DEFAULT '8801XXXXXXXXX',
  contact_email text NOT NULL DEFAULT 'hello@flowpilot.com', social_links jsonb NOT NULL DEFAULT '{}', site_texts jsonb NOT NULL DEFAULT '{}',
  is_public boolean NOT NULL DEFAULT true, updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_read" ON public.site_settings FOR SELECT TO anon, authenticated USING (is_public = true);
CREATE POLICY "settings_admin_all" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.services (slug,title,short_description,description,icon,includes,use_cases,benefits,sort_order) VALUES
('ai-agent-automation','AI Agent Automation','Intelligent agents that handle real business tasks.','Custom AI agents that reason, use your tools and complete repeatable work safely.','Bot','["Custom agent design","Knowledge connection","Human handoff"]','["Lead qualification","Support triage","Internal assistants"]','["Faster response","Consistent execution","Lower workload"]',1),
('n8n-workflow-automation','n8n Workflow Automation','Reliable workflows connecting your everyday tools.','Designed, tested and monitored n8n systems for dependable operations.','Workflow','["Workflow mapping","API connections","Error handling"]','["CRM sync","Order routing","Reporting"]','["Less manual work","Fewer errors","Clear visibility"]',2),
('messenger-automation','Messenger Automation','Turn Facebook conversations into qualified leads.','Automated Messenger journeys with smart replies, routing and follow-up.','MessageCircle','["Conversation flow","Lead capture","Team alerts"]','["FAQ replies","Campaign leads","Appointment intake"]','["24/7 response","More conversions","Clean lead data"]',3),
('whatsapp-automation','WhatsApp Automation','Fast, structured customer conversations on WhatsApp.','Automate updates, qualification and support while keeping human control.','Phone','["Reply flows","Status updates","Agent handoff"]','["Order updates","Lead follow-up","Support"]','["Faster service","Better retention","Reduced repetition"]',4),
('lead-automation','Lead Automation','Capture, enrich and route every serious lead.','A complete lead system from first form submission to sales handoff.','Users','["Capture forms","Enrichment","Lead scoring"]','["Ads leads","Website inquiries","Outbound lists"]','["No missed leads","Better prioritization","Faster follow-up"]',5),
('customer-support','Customer Support Automation','Resolve common questions and escalate the rest.','AI-assisted support connected to your policies, products and team.','Headphones','["Knowledge setup","Ticket routing","Escalation"]','["Product questions","Order support","Policy answers"]','["Shorter wait times","Consistent answers","Lower ticket volume"]',6),
('product-order','Product & Order Automation','Keep product and order operations moving automatically.','Connect storefronts, sheets, notifications and fulfillment steps.','ShoppingCart','["Order intake","Inventory sync","Notifications"]','["E-commerce","Digital delivery","COD verification"]','["Fewer mistakes","Instant updates","Scalable operations"]',7),
('api-integration','API Integration','Connect tools that do not talk to each other yet.','Secure custom integrations with validation, retries and clear logs.','Braces','["API mapping","Authentication","Webhooks"]','["Custom CRM","Payment events","Data sync"]','["One source of truth","Stable connections","Less copy-paste"]',8),
('content-automation','Content Automation','A repeatable system from idea to publication.','AI content pipelines built around your brand voice and approval process.','Sparkles','["Idea pipeline","Draft generation","Approval flow"]','["Social posts","Product copy","Content calendars"]','["Consistent output","Faster production","Brand control"]',9);

INSERT INTO public.projects (slug,title,subtitle,overview,problem,solution,category,technologies,features,results,sort_order) VALUES
('messenger-ai-automation','Messenger AI Automation','One intelligent inbox flow for capture, qualification and follow-up.','A production Messenger automation coordinating AI, customer data and team handoff.','Leads were lost across long chats and manual follow-up.','Built a multi-branch n8n workflow that understands intent, stores context and routes qualified leads.','Messenger','["n8n","Facebook","OpenAI","Google Sheets"]','["Intent routing","Lead scoring","Human handoff","Follow-up"]','["Faster first response","Structured lead records","Reduced manual routing"]',1),
('n8n-business-automation','n8n Business Automation','A connected operations engine across forms, APIs and reporting.','A modular workflow system for handling multiple business processes.','Teams repeatedly moved the same data between disconnected tools.','Connected data intake, validation, processing and reporting in one observable workflow.','n8n','["n8n","APIs","Webhooks","Google Sheets"]','["Validation","Retries","Branch logic","Audit trail"]','["Less repetitive work","Fewer data errors","Faster reporting"]',2),
('ai-customer-support','AI Customer Support','Accurate answers with safe escalation to a human.','A support assistant grounded in approved business information.','Customers waited for answers to common, repeatable questions.','Created a knowledge-assisted agent with confidence checks and human escalation.','AI Automation','["OpenAI","n8n","Supabase","Webhooks"]','["Knowledge search","Context memory","Escalation","Logging"]','["24/7 basic support","Consistent replies","Cleaner handoff"]',3),
('product-order-automation','Product & Order Automation','Orders move from purchase to delivery without spreadsheet chaos.','An order operations workflow linking payment, inventory and delivery steps.','Manual order updates caused delays and inconsistent customer communication.','Built automated status transitions, notifications and structured records.','Business Automation','["n8n","Supabase","Google Sheets","WhatsApp"]','["Order routing","Payment logging","Status alerts","Delivery records"]','["Faster processing","Clear status visibility","Fewer missed updates"]',4),
('whatsapp-automation','WhatsApp Automation','Lead follow-up and service updates in one connected flow.','A WhatsApp workflow for qualification, reminders and team handoff.','High-volume inquiries made fast, consistent follow-up difficult.','Designed a rules-plus-AI flow that keeps context and alerts staff when needed.','WhatsApp','["WhatsApp","n8n","OpenAI","Webhooks"]','["Auto reply","Qualification","Reminder","Handoff"]','["Shorter response time","More complete lead data","Better continuity"]',5),
('ai-content-automation','AI Content Automation','A controlled content pipeline from brief to approved draft.','A brand-aware content engine with review checkpoints.','Content production was inconsistent and time-consuming.','Connected idea intake, research, generation, review and publishing preparation.','AI Automation','["OpenAI","n8n","Google Sheets","APIs"]','["Brief intake","Brand rules","Approval stages","Content log"]','["Higher consistency","Faster drafting","Clear approvals"]',6);

INSERT INTO public.products (slug,title,subtitle,description,category,price,old_price,rating,sales_count,status,features,includes,requirements,technologies,sort_order) VALUES
('ai-lead-generator','AI Lead Generator Machine','Capture, qualify and route leads automatically.','A complete lead automation blueprint for service businesses that need faster follow-up and cleaner data.','AI Agent',2990,4490,4.9,184,'Popular','["AI qualification","Lead scoring","Instant routing","Follow-up prompts"]','["Workflow JSON","Setup guide","Prompt pack","Field map"]','["n8n account","OpenAI API key","Google account"]','["n8n","OpenAI","Google Sheets"]',1),
('n8n-starter-pack','n8n Automation Starter Pack','Eight practical workflows to start automating today.','A beginner-friendly bundle of reusable n8n workflows for common business operations.','n8n',1290,1990,4.8,132,'Popular','["8 ready workflows","Error handling","Editable nodes","Video walkthrough"]','["JSON files","Quick-start guide","Checklist"]','["n8n account"]','["n8n","Webhooks","Google Sheets"]',2),
('messenger-template','AI Messenger Automation Template','Turn Messenger chats into organized sales opportunities.','A structured Messenger system for replies, lead capture and team notifications.','Messenger',1890,2790,4.8,96,'New','["Smart replies","Lead capture","Team alerts","Handoff"]','["Workflow JSON","Message scripts","Setup guide"]','["Facebook page","n8n account","API access"]','["Messenger","n8n","OpenAI"]',3),
('customer-support-agent','AI Customer Support Agent','Launch a helpful, brand-aware support assistant.','A customizable support agent template with knowledge grounding and escalation.','AI Agent',3490,4990,4.6,190,'Popular','["Knowledge answers","Conversation memory","Safe escalation","Support logs"]','["Agent blueprint","Prompts","Workflow","Setup guide"]','["OpenAI API key","n8n account"]','["OpenAI","n8n","Supabase"]',4),
('ai-content-machine','AI Content Machine','Plan and draft consistent content from one workflow.','A controlled AI content system for social and business content production.','Content',990,1490,4.9,1840,'Popular','["Idea generation","Brand voice","Multi-format drafts","Content log"]','["Workflow","Prompt library","Calendar template"]','["OpenAI API key","Google account"]','["OpenAI","n8n","Google Sheets"]',5),
('midjourney-prompt-vault','Midjourney Prompt Vault','Proven prompt structures for polished visual concepts.','A categorized prompt library for product, brand and campaign imagery.','Prompt Pack',590,990,4.6,1670,'Popular','["400+ prompts","Style formulas","Negative prompts","Commercial themes"]','["Prompt database","Usage guide","Update notes"]','["Midjourney account"]','["Midjourney","Notion"]',6),
('ai-agent-blueprint','AI Agent Blueprint','Design reliable AI agents with a practical architecture.','A field-tested planning kit for tools, memory, guardrails and evaluation.','AI Agent',2990,4490,4.7,390,'New','["Agent canvas","Tool patterns","Guardrails","Evaluation rubric"]','["Blueprint","Prompt templates","Architecture examples"]','["Basic AI knowledge"]','["OpenAI","n8n","APIs"]',7),
('whatsapp-auto-reply','WhatsApp Auto-Reply Workflow','Organize fast replies, qualification and follow-up.','A practical WhatsApp automation template for small business conversations.','WhatsApp',1590,2390,4.8,420,'Popular','["FAQ flow","Lead questions","Team handoff","Follow-up timer"]','["Workflow JSON","Message pack","Setup notes"]','["WhatsApp API access","n8n account"]','["WhatsApp","n8n","Webhooks"]',8),
('ecommerce-order-automation','E-commerce Order Automation','Connect orders, inventory and customer updates.','A ready-to-customize workflow for reliable order operations.','E-commerce',2490,3490,4.8,510,'New','["Order intake","Inventory update","Status alerts","Error log"]','["Workflow JSON","Data schema","Setup guide"]','["n8n account","Store API access"]','["n8n","Webhooks","Google Sheets"]',9),
('sheets-crm','Google Sheets CRM Automation','Turn a familiar sheet into a responsive lead CRM.','An automated CRM workflow for teams that want simplicity without missed follow-ups.','Business',1390,2090,4.7,640,'Popular','["Lead intake","Stage tracking","Reminders","Daily summary"]','["Sheet template","Workflow JSON","Setup guide"]','["Google account","n8n account"]','["Google Sheets","n8n","Gmail"]',10),
('make-lead-machine','Make.com Lead Machine','A visual lead pipeline built for Make.com.','Capture, clean, enrich and route campaign leads with reusable scenarios.','Make.com',1790,2490,4.7,610,'New','["Lead capture","Deduplication","Enrichment","Notifications"]','["Scenario blueprint","Field map","Setup guide"]','["Make.com account"]','["Make.com","Webhooks","Google Sheets"]',11),
('zapier-office-pack','Zapier Office Pack','Simple automations for everyday office operations.','A focused pack connecting forms, documents, calendars and team notifications.','Zapier',1390,1990,4.5,280,'New','["Form routing","Document filing","Calendar sync","Team alerts"]','["Zap templates","Setup checklist","Field guide"]','["Zapier account"]','["Zapier","Google Drive","Slack"]',12);

INSERT INTO public.reviews (name,company,quote,rating,sort_order) VALUES
('Arif Rahman','E-commerce founder','FlowPilot turned our scattered order updates into one clear process. The team now handles exceptions instead of copy-paste work.',5,1),
('Nusrat Jahan','Marketing consultant','The lead workflow is practical, easy to follow and built around how our team actually works.',5,2),
('Tanvir Ahmed','Service business owner','Customers get faster answers and we still keep control when a conversation needs a person.',5,3),
('Sadia Karim','Operations manager','The automation removed daily reporting work and gave us a much cleaner view of every request.',5,4),
('Mehedi Hasan','Agency founder','Clear communication, careful testing and a workflow our own team can understand.',5,5),
('Raisa Noor','Online educator','The content system helped us create consistently without losing our tone or approval process.',5,6);

INSERT INTO public.faqs (question,answer,category,sort_order) VALUES
('What can n8n automate for my business?','n8n can connect forms, CRMs, spreadsheets, messaging tools, APIs and AI models so repetitive work moves automatically between them.','n8n',1),
('Can you automate Facebook Messenger leads?','Yes. A Messenger flow can answer common questions, collect lead details, qualify intent and alert your team for a human follow-up.','Messenger',2),
('Do WhatsApp automations replace my team?','No. The best setup handles repeatable steps and hands complex or sensitive conversations to a person with context.','WhatsApp',3),
('Can Google Sheets be used as a lightweight CRM?','Yes. For smaller teams, a well-structured sheet connected to automation can manage stages, reminders and reporting effectively.','Google Sheets',4),
('What is a custom AI agent?','It is an AI system designed for a specific job, connected to approved knowledge and tools, with clear boundaries and human escalation.','AI Agents',5),
('How long does a custom automation take?','A focused workflow may take several days, while larger multi-system automations are planned and delivered in stages.','Process',6),
('Can you connect tools with an API?','Yes. If a tool offers a usable API or webhook, it can usually be connected securely with validation and error handling.','API',7),
('Will I be able to manage the workflow later?','Yes. Workflows are organized and documented so your team can understand common updates and operating steps.','Support',8),
('Do you test before deployment?','Yes. Each workflow is tested with realistic inputs, failure paths and handoff conditions before release.','Process',9);

INSERT INTO public.site_settings (id,bkash_number,whatsapp_number,contact_email,social_links,site_texts) VALUES
(1,'01XXXXXXXXX','8801XXXXXXXXX','hello@flowpilot.com','{"facebook":"https://www.facebook.com/share/1Du1jHzEft/","linkedin":"https://www.linkedin.com/in/mdsabbirhossain-main/","instagram":"https://www.instagram.com/mdsabbirhossain_main","pinterest":"https://www.pinterest.com/mdsabbirhossain_main/"}','{"trust_line":"50+ workflows delivered","availability":"Available for selected automation projects"}');