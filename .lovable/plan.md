# FlowPilot পূর্ণ ওয়েবসাইট নির্মাণ পরিকল্পনা

## লক্ষ্য
FlowPilot-এর জন্য একটি পূর্ণাঙ্গ AI automation business ও digital-product website তৈরি করা হবে। দেওয়া হিরো/কার্ড রেফারেন্স, FlowPilot logo, কালো শার্টের profile image এবং n8n workflow screenshots ব্যবহার করা হবে।

## কাজের ধাপ

### 1. ডিজাইন সিস্টেম ও শেয়ার্ড কাঠামো
- Jost font, purple/near-black/white ভিত্তিক accessible palette, light/dark theme এবং localStorage persistence।
- সর্বত্র সর্বোচ্চ 12px radius; button 4px, input 8px, card 12px।
- Floating responsive navbar, mobile menu, profile/login state, footer এবং page-transition/scroll-reveal motion।
- দেওয়া FlowPilot logo থেকে favicon তৈরি।

### 2. পাবলিক পেজ
- আলাদা route ও metadata সহ Home, About, Services, Projects, Project Detail, Products, Product Detail, Contact, Privacy, Terms এবং 404।
- Home-এ reference অনুযায়ী split hero, কালো শার্টের ছবি, floating automation chips, technology strip, 9 services, 5-step process, featured projects/products, দুই-row review marquee, 9 FAQ এবং final CTA।
- Projects-এ category filter; detail page-এ workflow screenshot, problem/solution, technology, features ও result।
- Products-এ search/filter/sort; screenshot অনুযায়ী ecommerce card এবং full product detail।

### 3. Supabase data ও নিরাপত্তা
- profiles, separate user_roles, products, projects, services, reviews, faqs, orders, contact_messages এবং site_settings tables।
- প্রত্যেক নতুন table-এর grants, RLS policies, admin role helper এবং initial seed data একই migration-এ।
- Published content public-read; admin-only content management; user-owned orders/profile access।
- Uploaded images CDN assets হিসেবে যুক্ত করে seed records-এ ব্যবহার।

### 4. Sign in ও কেনাকাটা
- Login, signup, password visibility, forgot-password flow এবং redirect-after-login।
- Buy Now-তে login বাধ্যতামূলক; bKash checkout form, duplicate TrxID prevention, validation ও confirmation state।
- Admin account source code/migration-এ password দিয়ে seed করা হবে না; নিরাপদভাবে account তৈরি ও role দেওয়ার নির্দেশনা দেওয়া হবে।

### 5. User ও Admin dashboard
- User: overview, orders, owned products/downloads, profile, settings, password এবং logout।
- Admin: overview, orders/status updates, WhatsApp prefilled action, users/roles এবং products/projects/services/reviews/FAQ/contact/settings management।
- Desktop sidebar ও mobile drawer; tables mobile-এ usable card/scroll layout।

### 6. যাচাই
- Desktop ও mobile visual checks, navigation, filters/search, theme, auth redirect, checkout, order update, role protection, WhatsApp link, forms, marquee ও accordion।
- Build/runtime errors পরিষ্কার করে প্রতিটি route-এর unique title, description, Open Graph এবং Twitter metadata নিশ্চিত করা।

## Technical details
- বর্তমান TanStack Start routing বজায় রেখে React 19, Tailwind CSS v4 এবং Lucide icons ব্যবহার করা হবে।
- Supabase reads/writes TanStack server functions ও authenticated browser client দিয়ে হবে; কোনো নতুন Edge Function নয়।
- Protected pages integration-managed authenticated route group-এর নিচে থাকবে; public pages SSR-friendly থাকবে।
- User role কেবল আলাদা `user_roles` table-এ থাকবে; browser storage বা profile row দিয়ে admin access নির্ধারণ করা হবে না।
- Uploaded images Lovable Assets-এ থাকবে; favicon ছাড়া binary source repository-তে রাখা হবে না।
