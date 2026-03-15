# So N So — Lead Qualifier Skill

## What This Skill Does
Qualifies incoming leads from Facebook ads, WhatsApp, website, or referrals. Determines if a lead is worth pursuing, what product fits them, and what the next action should be. Also drafts the first response message.

## Trigger Phrases
- "New lead came in — [details]"
- "Qualify this lead: [description]"
- "Someone messaged us on WhatsApp: [message]"
- "Facebook lead form filled: [data]"

---

## Qualification Criteria

### QUALIFIED ✅ (pursue immediately)
- Business has 10+ employees OR clear operational pain that software solves
- Decision-maker is the one talking to us
- They have a specific problem (not just "interested")
- Can describe their current process (WhatsApp, Excel, manual, other software)
- Open to a 15-min call or demo

### WARM — NEEDS NURTURING 🟡 (follow up in 3 days)
- Solo operator but growing (5–10 employees)
- Not decision-maker but can make intro
- Vague interest ("looks interesting") — needs more context
- Currently on a SaaS but not actively looking to switch

### NOT QUALIFIED ❌ (politely close)
- Less than 5 employees with no growth intent
- Looking for a job, not software
- Wants free software or maintenance
- Competitor doing research

---

## Lead Scoring (0–10)

| Signal | Points |
|---|---|
| 10+ employees | +3 |
| Clear specific pain described | +2 |
| Currently paying for software (wants to switch) | +2 |
| Is the business owner / decision-maker | +2 |
| Replied quickly / high engagement | +1 |

Score 7–10 = Hot lead (call within 2 hours)
Score 4–6 = Warm lead (respond today, nurture)
Score 0–3 = Cold / unqualified

---

## First Response Templates

### Cold lead (Facebook ad form, no context)
```
Hi [Name]! 👋 Thanks for your interest in So N So.

Quick question — what kind of business do you run and
what's the main thing you're trying to manage better?

Takes 30 seconds and helps me show you exactly what
we can build for you 🙌
```

### Warm lead (already described their problem)
```
Hi [Name]! This is exactly the kind of problem we solve.

We've built a [relevant product] for [similar businesses].
Want to see a 2-minute demo? I can send a video or
we can do a quick screen share this week — your call.
```

### Hot lead (decision-maker, clear pain, ready to talk)
```
Hi [Name]! We can definitely help with this.

We've done similar work for [industry] businesses —
typically deploy in 7 days, one-time fee, no ongoing charges.

Are you free for a 15-min call today or tomorrow?
I'll walk you through exactly what we'd build for you.
```

---

## Lead Card Template
After qualifying, create a lead card and save to clients/leads/:

```markdown
# Lead: [Name] — [Business Name]

Date: [DD-MM-YYYY]
Source: [Facebook Ad / WhatsApp / Referral / Website]
Contact: [WhatsApp number]
Business Type: [Industry]
City: [City]
Team Size: [Approx]
Current System: [WhatsApp / Excel / Zoho / etc]
Pain Point: [In their words]
Score: [X/10]
Status: [Hot / Warm / Cold]
Next Action: [Call / Demo / Nurture / Close]
Follow-up Date: [Date]
Notes: [Any other context]
```
