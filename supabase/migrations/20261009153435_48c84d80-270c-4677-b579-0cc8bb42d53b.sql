CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE, title text NOT NULL, subtitle text NOT NULL DEFAULT '', category text NOT NULL DEFAULT '',
  price integer NOT NULL, old_price integer NOT NULL DEFAULT 0, rating numeric NOT NULL DEFAULT 5, sales integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'New', image_url text, description text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '["Ready-to-customize workflow","Error-aware structure","Clear business logic","Reusable building blocks"]'::jsonb,
  includes jsonb NOT NULL DEFAULT '["Workflow files","Step-by-step setup guide","Configuration checklist","Prompt and field templates"]'::jsonb,
  requirements jsonb NOT NULL DEFAULT '["An automation platform account","Required third-party API access","Basic account configuration"]'::jsonb,
  technologies jsonb NOT NULL DEFAULT '["n8n","OpenAI","Webhooks","Google Sheets"]'::jsonb,
  download_url text, is_published boolean NOT NULL DEFAULT true, sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY products_public_read ON public.products FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY products_admin_all ON public.products FOR ALL TO authenticated USING (private.has_role(auth.uid(),'admin')) WITH CHECK (private.has_role(auth.uid(),'admin'));
CREATE TRIGGER products_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), question text NOT NULL, answer text NOT NULL,
  is_published boolean NOT NULL DEFAULT true, sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY faqs_public_read ON public.faqs FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY faqs_admin_all ON public.faqs FOR ALL TO authenticated USING (private.has_role(auth.uid(),'admin')) WITH CHECK (private.has_role(auth.uid(),'admin'));
CREATE TRIGGER faqs_updated BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL,
  product_slug text NOT NULL, product_title text NOT NULL DEFAULT '', amount integer NOT NULL DEFAULT 0,
  customer_name text NOT NULL, phone text NOT NULL, bkash_number text NOT NULL, trx_id text NOT NULL,
  note text NOT NULL DEFAULT '', status public.order_status NOT NULL DEFAULT 'Pending',
  payment_status public.payment_status NOT NULL DEFAULT 'Submitted',
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE UNIQUE INDEX IF NOT EXISTS orders_trx_unique ON public.orders (upper(trx_id));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY orders_own_read ON public.orders FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY orders_own_insert ON public.orders FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY orders_admin_all ON public.orders FOR ALL TO authenticated USING (private.has_role(auth.uid(),'admin')) WITH CHECK (private.has_role(auth.uid(),'admin'));
CREATE TRIGGER orders_updated BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.prepare_order() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE p record;
BEGIN
  SELECT title, price INTO p FROM public.products WHERE slug = NEW.product_slug AND is_published;
  IF NOT FOUND THEN RAISE EXCEPTION 'Product not found'; END IF;
  NEW.trx_id := upper(trim(NEW.trx_id));
  IF length(NEW.trx_id) < 6 THEN RAISE EXCEPTION 'Invalid transaction ID'; END IF;
  NEW.product_title := p.title; NEW.amount := p.price;
  NEW.status := 'Pending'; NEW.payment_status := 'Submitted';
  RETURN NEW;
END $$;
REVOKE EXECUTE ON FUNCTION public.prepare_order() FROM anon, authenticated, public;
CREATE TRIGGER orders_prepare BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.prepare_order();

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, email text NOT NULL,
  phone text NOT NULL DEFAULT '', subject text NOT NULL DEFAULT '', message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now());
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY contact_public_insert ON public.contact_messages FOR INSERT TO anon, authenticated
  WITH CHECK (is_read = false AND length(name) BETWEEN 1 AND 100 AND length(email) BETWEEN 3 AND 255 AND length(message) BETWEEN 1 AND 3000);
CREATE POLICY contact_admin_all ON public.contact_messages FOR ALL TO authenticated USING (private.has_role(auth.uid(),'admin')) WITH CHECK (private.has_role(auth.uid(),'admin'));

INSERT INTO public.products (slug,title,subtitle,category,price,old_price,rating,sales,status,image_url,description,sort_order) VALUES
('ai-lead-generator','AI Lead Generator Machine','Capture, qualify and route leads automatically.','AI Agent',2990,4490,4.9,184,'Popular','/images/workflow-overview.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',0),
('n8n-starter-pack','n8n Automation Starter Pack','Eight practical workflows to start automating today.','n8n',1290,1990,4.8,132,'Popular','/images/messenger-workflow.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',1),
('messenger-template','AI Messenger Automation Template','Turn Messenger chats into organized sales opportunities.','Messenger',1890,2790,4.8,96,'New','/images/business-workflow.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',2),
('customer-support-agent','AI Customer Support Agent','Launch a helpful, brand-aware support assistant.','AI Agent',3490,4990,4.6,190,'Popular','/images/automation-workflow.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',3),
('ai-content-machine','AI Content Machine','Plan and draft consistent content from one workflow.','Content',990,1490,4.9,1840,'Popular','/images/workflow-overview.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',4),
('midjourney-prompt-vault','Midjourney Prompt Vault','Prompt structures for polished visual concepts.','Prompt Pack',590,990,4.6,1670,'Popular','/images/messenger-workflow.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',5),
('ai-agent-blueprint','AI Agent Blueprint','Design reliable AI agents with practical architecture.','AI Agent',2990,4490,4.7,390,'New','/images/business-workflow.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',6),
('whatsapp-auto-reply','WhatsApp Auto-Reply Workflow','Organize fast replies, qualification and follow-up.','WhatsApp',1590,2390,4.8,420,'Popular','/images/automation-workflow.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',7),
('ecommerce-order-automation','E-commerce Order Automation','Connect orders, inventory and customer updates.','E-commerce',2490,3490,4.8,510,'New','/images/workflow-overview.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',8),
('sheets-crm','Google Sheets CRM Automation','Turn a familiar sheet into a responsive lead CRM.','Business',1390,2090,4.7,640,'Popular','/images/messenger-workflow.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',9),
('make-lead-machine','Make.com Lead Machine','A visual lead pipeline built for Make.com.','Make.com',1790,2490,4.7,610,'New','/images/business-workflow.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',10),
('zapier-office-pack','Zapier Office Pack','Automations for everyday office operations.','Zapier',1390,1990,4.5,280,'New','/images/automation-workflow.png','A production-ready automation resource built for practical business use, clear setup and reliable handoff.',11)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.faqs (question,answer,sort_order) VALUES
('What can n8n automate for my business?','Forms, CRMs, spreadsheets, messaging tools, APIs and AI models can work together without repetitive copying.',0),
('Can you automate Facebook Messenger leads?','Yes. The flow can answer, collect details, qualify intent and alert your team.',1),
('Do WhatsApp automations replace my team?','No. Automation handles repeatable steps and hands complex conversations to a person.',2),
('Can Google Sheets work as a lightweight CRM?','Yes. A structured sheet can manage stages, reminders and reporting for smaller teams.',3),
('What is a custom AI agent?','An AI system designed for a specific job, with approved knowledge, tools and clear boundaries.',4),
('How long does a custom automation take?','Focused workflows may take days; larger systems are planned and delivered in stages.',5),
('Can you connect tools with an API?','If a tool offers an API or webhook, it can usually be connected with validation and retries.',6),
('Will I be able to manage it later?','Yes. Workflows are organized and documented for practical ongoing management.',7),
('Do you test before deployment?','Yes. Every workflow is tested with realistic inputs, failure paths and handoffs.',8);