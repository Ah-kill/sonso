# So N So — Client Onboarding Skill

## What This Skill Does
Guides Claude through the complete client lifecycle for So N So — from first contact to go-live. Covers intake, proposals, deployment, training, and follow-up. Keeps every client experience fast, professional, and low-friction.

---

## When To Use This Skill
Trigger this skill when:
- "New client interested / got a lead"
- "Onboard [client name]"
- "Create a proposal for [client]"
- "Client agreed, what next?"
- "Write a follow-up for [client]"
- "Client is going live today"

---

## Client Lifecycle Overview

```
LEAD → DISCOVERY CALL → PROPOSAL → BUILD → DEPLOY → TRAIN → LIVE → FOLLOW-UP
  1d       1-2d             1d        5-7d     1d       1d      →     30d
```

---

## Stage 1 — Lead Intake

When a new lead comes in (from Facebook ad, WhatsApp, referral), immediately capture:

**Lead Card Template** (save as `leads/[client-name]-lead.md`):
```markdown
# Lead: [Business Name]

**Date:** [DD-MM-YYYY]
**Source:** Facebook Ad / WhatsApp / Referral / Walk-in
**Contact Name:**
**WhatsApp Number:**
**Business Type:**
**City:**
**Current System:** WhatsApp / Excel / Nothing / Other software
**Pain Point (in their words):**

**Status:** New Lead
**Next Action:** Schedule discovery call
**Follow-up Date:**
```

**Response within 2 hours** (WhatsApp message):
```
Hi [Name]! Thanks for reaching out to So N So 🙌

We'd love to understand your business a bit better and show you
what we can build for you.

Can we jump on a quick 15-min call this week?
Here are some slots: [list 2-3 options]

Or if you prefer, just tell me a bit about your business here
and I'll put together something specific for you.
```

---

## Stage 2 — Discovery Call

Run a 15–20 minute call. Use this as your script:

**Opening (2 min):**
> "Tell me about the business — what do you do, how many people work with you, how long have you been running?"

**Pain discovery (5 min):**
> "Walk me through a typical day — how do you handle [orders/bookings/inventory] right now?"
> "What's the most frustrating part of that process?"
> "Has this ever cost you a customer or caused a problem?"

**Solution fit (5 min):**
> "We've built a [product type] for businesses like yours. Let me show you a quick demo..."
> [Screen share the closest product demo]
> "Does this look like what you'd need, or is there something specific that's missing?"

**Pricing (3 min):**
> "The way we work is different from most companies. We don't charge a development fee.
> You only pay the infrastructure cost — that's the server that runs your software.
> For a business your size, that's typically ₹[500–2000]/month. That's it."

**Close (2 min):**
> "If this makes sense to you, we can have something live within a week.
> Want to move forward?"

**Post-call:** Update the lead card with call notes and move status to `DISCOVERY DONE`.

---

## Stage 3 — Proposal

Generate a one-page proposal document (`proposals/[client-name]-proposal.md`):

```markdown
# Software Proposal for [Business Name]

**Prepared by:** So N So
**Date:** [DD-MM-YYYY]
**Valid for:** 7 days

---

## What We'll Build For You

Based on our conversation, here's what we'll create:

### [Product Name] — [Business Name] Edition

**Customer-facing:**
- [Feature 1 — e.g., Online order placement]
- [Feature 2]
- [Feature 3]

**Your admin dashboard:**
- [Feature 1 — e.g., Live order tracking]
- [Feature 2]
- [Feature 3]

**Branding:**
- Your logo and colors
- Your domain (e.g., orders.yourbusiness.com)
- No So N So branding visible to your customers

---

## Timeline

| Day | What Happens |
|-----|---|
| Day 1 | We start building |
| Day 3 | You see first version for feedback |
| Day 5 | Changes incorporated |
| Day 7 | Live and deployed |

---

## What You Pay

**Development cost: ₹0**
We don't charge to build your software.

**Infrastructure cost: ₹[X]/month**
This covers the server that runs your software. We'll set it up for you.
You can pay us or pay the provider directly — your choice.

**No contracts. No lock-ins.** If you ever want to stop, just tell us.

---

## What We Need From You

- [ ] Your business logo (PNG or SVG)
- [ ] Brand color (or we'll pick one that matches)
- [ ] 30-min session to review Day 3 version
- [ ] 1 hour for go-live training

---

Ready to go? Reply "YES" on WhatsApp and we'll kick off immediately.
```

---

## Stage 4 — Build

Refer to the **sonoso-software** skill for the complete build process.

During the build, send these check-ins to the client:

**Day 1 (Build start):**
```
Hi [Name]! We've kicked off your [product name] today 🚀
We'll share a first version with you by Day 3 for your feedback.
Meanwhile, could you send us your business logo if you have one?
```

**Day 3 (First version):**
```
Hi [Name]! Your first version is ready for a look 👀
Here's the link: [staging URL]

Login: [username]
Password: [temp password]

Let us know what you'd like to change — anything at all.
We'll have the final version ready by Day 5.
```

**Day 5 (Final version):**
```
Hi [Name]! All changes incorporated. Here's the updated version:
[staging URL]

If this looks good, we'll deploy it live tomorrow.
Let us know! ✅
```

---

## Stage 5 — Deployment

**Deployment day checklist** (generate from sonoso-software skill):
- Domain pointed
- SSL active
- All data cleared from testing
- Admin password changed to client's preferred password
- Mobile tested

**Go-live message:**
```
🎉 [Business Name] is LIVE!

Your software is now at: [live URL]

Login:
URL: [url]
Email: [email]
Password: [password]

We'll do a quick training session now — are you free for 30-45 mins?
```

---

## Stage 6 — Training Session (30–45 min)

Run via WhatsApp video call or Zoom. Cover:

1. How to log in (5 min)
2. Core daily workflow — placing/receiving/managing [orders/bookings] (15 min)
3. Admin dashboard — reading the numbers (10 min)
4. Common questions (10 min)

**Send after training:**
```
Quick reference guide for [Business Name]:

🔗 Login: [url]
📧 Email: [email]
🔑 Password: [password]

5 things you can do right now:
1. [Action 1]
2. [Action 2]
3. [Action 3]
4. [Action 4]
5. [Action 5]

Any questions, just WhatsApp us anytime. We're here 🙌
```

---

## Stage 7 — 30-Day Follow-Up

Schedule these check-ins:

**Day 7 post-live:**
```
Hi [Name]! It's been a week since you went live 🎉
How's it going? Any questions or things you'd like to tweak?
```

**Day 30 post-live:**
```
Hi [Name]! A full month on [product name] — how's it been?

We'd love to hear:
- Is there anything you wish the software did differently?
- Any features that would make your life easier?

We're always improving. Your feedback goes directly into our next update.
```

---

## Client Status Tracker

Maintain a `clients/tracker.md` with all clients:

```markdown
# So N So — Client Tracker

| Client | Business Type | City | Product | Status | Monthly Infra | Contact |
|--------|--------------|------|---------|--------|---------------|---------|
| [Name] | Restaurant | Mumbai | Order Mgmt | LIVE | ₹800 | +91... |
```

---

## Output Format

For each client engagement, maintain in `clients/[client-name]/`:
- `lead.md` — initial lead details
- `proposal.md` — sent proposal
- `brief.md` — discovery call notes
- `handover.md` — training reference guide
- `notes.md` — ongoing notes and requests
