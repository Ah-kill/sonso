# So N So — Software Builder Skill

## What This Skill Does
Guides Claude to scope, plan, and generate complete software systems for So N So clients. This covers: requirements gathering, tech stack selection, database schema, frontend UI (HTML/CSS/JS), backend logic, admin dashboard, and deployment checklist.

---

## When To Use This Skill
Trigger this skill when the user says things like:
- "Build software for [client name]"
- "Create an order management system"
- "Set up the [product type] for a new client"
- "New client needs [X] system"
- "White-label the [product] for [client]"

---

## So N So Product Library

These are the ready-made products you can deploy. Always start from the closest match and customize.

| Product | Use Case | Key Modules |
|---|---|---|
| **Order Management System** | Restaurants, cloud kitchens, wholesale | Customer portal, order tracking, admin dashboard, status updates |
| **Appointment Booking System** | Salons, spas, clinics, gyms | Online booking, staff calendar, reminders, client history |
| **Inventory & Billing** | Retail, distributors, warehouses | Stock tracking, GST invoicing, low-stock alerts, reports |
| **CRM & Lead Manager** | Real estate, B2B services, agencies | Lead pipeline, follow-up reminders, call logs, deal stages |
| **Student & Fee Manager** | Coaching centers, tutoring | Batch management, attendance, fee tracking, parent portal |
| **Logistics Tracker** | Delivery, courier, transport | Trip management, driver tracking, proof of delivery, billing |

---

## Step-by-Step Build Process

### STEP 1 — Client Discovery (5 Questions)
Always ask these before writing a single line of code:

1. **What is the business?** (Name, type, number of employees, number of locations)
2. **What is the core workflow pain?** (What are they doing on WhatsApp/Excel right now?)
3. **Who are the users?** (Just the owner? Staff too? Customers as well?)
4. **What does "done" look like for them?** (What will they check every morning?)
5. **Any must-have integrations?** (WhatsApp notifications, payment gateway, etc.)

Document the answers in a `client-brief.md` file before proceeding.

### STEP 2 — Product Selection & Customization Plan
Based on discovery, select the closest product from the library above. Then list:
- Logo and brand colors from client
- Modules to INCLUDE from the base product
- Modules to REMOVE (keep it simple for first deploy)
- Any NEW modules not in the base product (flag these as "custom additions" — add time estimate)

### STEP 3 — Generate the Software

When building, always follow this structure:

```
/client-[name]/
  /frontend/
    index.html          ← Customer-facing portal
    dashboard.html      ← Admin/owner dashboard
    style.css
    app.js
  /backend/
    server.js (or app.py)
    routes/
    models/
  /config/
    env.example
    deploy-checklist.md
  README.md             ← How to run + deploy
```

**Frontend rules:**
- Mobile-first. Owner will check on phone.
- Use the client's brand color as primary accent.
- Keep it dead simple — if an untrained staff member can't figure it out in 2 minutes, redesign it.
- Admin dashboard must show the 3 most important numbers at the top (e.g., today's orders, pending, completed).

**Backend rules:**
- Use Node.js (Express) or Python (FastAPI) — whichever is faster for the use case.
- PostgreSQL or SQLite for database depending on scale.
- Always include: auth (owner login), basic CRUD for the core entity, status workflow.
- Add a `/health` endpoint for monitoring.

**Branding rules:**
- Replace logo in navbar with client's logo (use placeholder if not provided yet).
- Apply client's primary color as CSS variable `--brand`.
- Company name in `<title>` tag and footer.
- Remove all "So N So" references from the client-facing UI.

### STEP 4 — Deployment Checklist

Generate a `deploy-checklist.md` for every project:

```markdown
## [Client Name] — Deployment Checklist

### Pre-Deploy
- [ ] All env variables set in .env
- [ ] Database migrations run
- [ ] Logo and brand colors applied
- [ ] Tested on mobile (Chrome on Android)
- [ ] Admin password set and communicated to client

### Deploy
- [ ] VPS provisioned (DigitalOcean / Hetzner / Railway)
- [ ] Domain/subdomain pointed
- [ ] SSL certificate active (Let's Encrypt)
- [ ] App running as systemd service or Docker container

### Post-Deploy
- [ ] Client training session done (30-60 mins)
- [ ] Client WhatsApp number saved for support
- [ ] Monthly infra cost communicated to client
- [ ] Invoice raised for infra (if applicable)
```

### STEP 5 — Handover Document

Generate a 1-page `handover.md` for the client:
- What the software does (in plain language, no jargon)
- How to log in (URL, username)
- 5 things they can do with it today
- Who to contact for issues (So N So WhatsApp number)

---

## Output Format

When building software, always output:
1. `client-brief.md` — filled discovery answers
2. All code files in the structure above
3. `deploy-checklist.md`
4. `handover.md`

---

## Important Principles

- **Speed over perfection.** Deploy a working v1 in 7 days. Improve after feedback.
- **No over-engineering.** The client doesn't need microservices. They need something that works on their phone.
- **Document as you go.** Every file should have a 2-line comment at the top explaining what it does.
- **Infra cost transparency.** Always include estimated monthly infra cost in handover doc.
