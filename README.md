# So N So — Workspace Guide

Welcome to the So N So operational workspace. This folder is your command center for running
the business using Claude and Cowork.

---

## What's In This Workspace

```
sonoso-workspace/
  skills/
    sonoso-software/   ← Build software for clients
    sonoso-campaign/   ← Create ad campaigns & outreach
    sonoso-client/     ← Manage clients from lead to live
  clients/             ← One folder per client (create as needed)
  leads/               ← Lead cards for incoming enquiries
  proposals/           ← Proposals sent to clients
  campaigns/           ← Campaign assets (ad copy, briefs)
  README.md            ← This file
```

---

## How To Use Claude For Your Business

### 1. Getting a New Client Lead
Say to Claude:
> "New lead — restaurant owner in Mumbai, managing orders on WhatsApp, interested in order management system"

Claude will use the **sonoso-client** skill to create a lead card and draft a WhatsApp response.

### 2. Running Ads / Creating Campaigns
Say to Claude:
> "Create a Facebook ad campaign targeting salon owners in Delhi"

Claude will use the **sonoso-campaign** skill to generate:
- 3 ad copy variations
- Creative brief for the designer
- WhatsApp cold outreach messages
- Campaign structure for Ads Manager

### 3. Building Software for a Client
Say to Claude:
> "Build an order management system for [Client Name], a cloud kitchen in Pune"

Claude will use the **sonoso-software** skill to:
- Run through discovery questions
- Select the right base product
- Generate all code files
- Create deployment checklist and client handover doc

### 4. Creating Proposals
Say to Claude:
> "Create a proposal for [Client Name] — they need a booking system for their salon chain (3 branches)"

Claude generates a ready-to-send proposal document.

### 5. Tracking All Clients
Say to Claude:
> "Update the client tracker — [Client Name] just went live"

---

## Pricing Model Reference

So N So charges like this:

| What | Cost |
|------|------|
| Building the software | ✅ We charge for development + customization |
| Deploying & setting up | Included in build fee |
| Monthly maintenance | ❌ We don't charge |
| Infrastructure (hosting) | Client pays directly (₹500–2,000/month) |
| Adding new features later | ✅ We charge per feature |
| Bug fixes | ❌ Included for 30 days post-launch |

**Key message to clients:**
*"Once your software is built and live, there's no monthly maintenance fee from us.
You only pay your infrastructure cost. If you ever want a new feature, we quote you
for that feature specifically."*

---

## Quick Reference — Product to Industry Map

| Client Says | Product To Use |
|---|---|
| "Manage orders / deliveries" | Order Management System |
| "Book appointments / slots" | Appointment Booking System |
| "Track stock / billing / invoices" | Inventory & Billing System |
| "Track leads / follow up on clients" | CRM & Lead Manager |
| "Manage students / fees / attendance" | Student & Fee Manager |
| "Manage drivers / trips / logistics" | Logistics Tracker |

---

## Claude Tips

- Start every session by telling Claude which client or task you're working on
- Say "use the software skill" or "use the campaign skill" to invoke the right workflow
- Ask Claude to "save this to clients/[name]/notes.md" to keep records
- Claude can draft WhatsApp messages, proposals, ad copy, and full code — just ask
