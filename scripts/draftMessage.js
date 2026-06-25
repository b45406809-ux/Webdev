const templates = [
  (lead) => `Hi! I came across ${lead.name} — ${lead.rating}⭐ and some great reviews about your ${lead.category} service. I built you a free website concept: ${lead.live_url} — take a look! If you'd like it live and fully yours, I can do that for $50. No pressure at all. 🙂`,

  (lead) => `Hello! Noticed ${lead.name} doesn't have a website yet — so I went ahead and built you a free demo: ${lead.live_url}. With ${lead.review_count} happy customers already, a site would help even more people find you. Full launch for just $50 if you're interested!`,

  (lead) => `Hi there! I'm a local web dev and I built a free sample site for ${lead.name}: ${lead.live_url}. Your ${lead.rating}-star reputation deserves to be online. If you want it live, I charge $50 all-in — happy to answer any questions!`,

  (lead) => `Hey! Came across ${lead.name} while searching for great ${lead.category} in ${lead.area}. Built you a complimentary website concept — ${lead.live_url}. Customers love you; a website means more of them can find you. $50 to go fully live. Worth a look!`,

  (lead) => `Hi! I put together a free website demo for ${lead.name}: ${lead.live_url}. Businesses with ${lead.rating}★ ratings grow faster when they're easy to find online. I can have the real thing live within 24hrs for $50. Let me know if you'd like to chat!`,
];

let templateIndex = 0;

export function draftMessage(lead) {
  const template = templates[templateIndex % templates.length];
  templateIndex++;
  return template(lead);
}
