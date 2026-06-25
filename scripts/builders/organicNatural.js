// Design: Warm organic natural movement aesthetic for Kinky Curly Natural Hair Salon
export function generateOrganicNatural(lead) {
  const stars = Math.round(lead.rating);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${lead.name} | Natural Hair Mount Pleasant</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#FEF6E4;--dark:#2D1810;--terra:#C4622D;--sage:#6B8F71;
  --amber:#D4933A;--mid:#5A3020;--text:#4A2E1E;--muted:#8B6555;--white:#FFFDF7;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;font-weight:300;overflow-x:hidden}

/* Banner */
.banner{background:var(--terra);color:var(--bg);text-align:center;padding:10px 20px;
  font-family:'DM Serif Display',serif;font-style:italic;font-size:.92rem;letter-spacing:.05em}

/* Blob backgrounds */
@keyframes blobPulse{
  0%,100%{border-radius:60% 40% 30% 70% / 60% 30% 70% 40%}
  50%{border-radius:30% 60% 70% 40% / 50% 60% 30% 60%}
}
.blob{position:absolute;pointer-events:none;border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;
  animation:blobPulse 12s ease infinite;opacity:.08}

/* Hero */
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;
  justify-content:center;padding:100px 8vw;overflow:hidden;
  background:linear-gradient(160deg,#FEF6E4 0%,#F5E8C8 60%,#EEDDB0 100%)}
.hero-blob1{width:600px;height:600px;background:var(--terra);top:-100px;right:-150px}
.hero-blob2{width:400px;height:400px;background:var(--sage);bottom:-80px;left:-100px;animation-delay:6s}

.hero-content{position:relative;z-index:2;max-width:680px}
@keyframes riseIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}

.eyebrow{font-size:.75rem;letter-spacing:.3em;text-transform:uppercase;color:var(--terra);
  margin-bottom:20px;display:flex;align-items:center;gap:12px;animation:riseIn .7s ease forwards}
.eyebrow::after{content:'';flex:0 0 40px;height:1px;background:var(--terra);opacity:.4}

.hero-name{font-family:'DM Serif Display',serif;font-size:clamp(2.8rem,7vw,5.5rem);
  color:var(--dark);line-height:1.05;margin-bottom:8px;animation:riseIn .7s ease .1s both}
.hero-name em{font-style:italic;color:var(--terra)}

.hero-tagline{font-family:'DM Serif Display',serif;font-style:italic;
  font-size:clamp(1.1rem,2.5vw,1.5rem);color:var(--muted);margin-bottom:32px;
  animation:riseIn .7s ease .2s both}

.hero-rating{display:flex;align-items:center;gap:12px;margin-bottom:10px;animation:riseIn .7s ease .3s both}
.stars{color:var(--amber);font-size:1.3rem;letter-spacing:3px}
.rating-num{font-family:'DM Serif Display',serif;font-size:2rem;color:var(--dark)}
.rating-count{font-size:.85rem;color:var(--muted)}
.hero-addr{font-size:.9rem;color:var(--muted);margin-bottom:40px;animation:riseIn .7s ease .35s both}

.btn-terra{display:inline-flex;align-items:center;gap:10px;padding:16px 40px;
  background:var(--terra);color:var(--white);border-radius:50px;
  font-family:'DM Sans',sans-serif;font-weight:500;font-size:.95rem;text-decoration:none;
  box-shadow:0 6px 30px rgba(196,98,45,.3);transition:all .25s;
  animation:riseIn .7s ease .45s both}
.btn-terra:hover{background:#D4722D;transform:translateY(-2px);box-shadow:0 10px 40px rgba(196,98,45,.4)}
.btn-sage{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;
  border:2px solid var(--sage);color:var(--sage);border-radius:50px;
  font-size:.92rem;text-decoration:none;margin-left:12px;transition:all .2s;
  animation:riseIn .7s ease .55s both}
.btn-sage:hover{background:rgba(107,143,113,.1)}

/* Wavy divider */
.wave{line-height:0;overflow:hidden}
.wave svg{display:block;width:100%;height:80px}

/* Section */
.section{padding:80px 8vw;max-width:1100px;margin:0 auto}
.s-tag{font-size:.72rem;letter-spacing:.3em;text-transform:uppercase;color:var(--terra);margin-bottom:12px}
.s-title{font-family:'DM Serif Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);
  color:var(--dark);margin-bottom:40px;line-height:1.2}
.s-title em{font-style:italic;color:var(--muted)}

/* Services */
.organic-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
.organic-card{background:var(--white);border-radius:24px;padding:32px 24px;
  box-shadow:0 4px 30px rgba(45,24,16,.06);transition:transform .25s,box-shadow .25s;
  position:relative;overflow:hidden}
.organic-card::before{content:'';position:absolute;bottom:0;left:0;right:0;height:4px;
  background:var(--terra);transform:scaleX(0);transition:transform .3s;transform-origin:left}
.organic-card:hover{transform:translateY(-6px);box-shadow:0 12px 50px rgba(45,24,16,.1)}
.organic-card:hover::before{transform:scaleX(1)}
.card-leaf{position:absolute;top:-10px;right:-10px;font-size:3rem;opacity:.07;transform:rotate(20deg)}
.card-icon{font-size:2.2rem;margin-bottom:18px}
.card-name{font-family:'DM Serif Display',serif;font-size:1.2rem;color:var(--dark);margin-bottom:8px}
.card-desc{font-size:.88rem;line-height:1.6;color:var(--muted)}

/* Highlights */
.highlight-wrap{background:var(--dark);padding:80px 8vw}
.highlight-inner{max-width:1100px;margin:0 auto}
.highlight-wrap .s-tag{color:var(--amber)}
.highlight-wrap .s-title{color:var(--bg)}
.highlights{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
.hl-card{background:rgba(255,255,255,.05);border-radius:16px;padding:28px;
  border:1px solid rgba(255,255,255,.08);transition:background .2s}
.hl-card:hover{background:rgba(255,255,255,.08)}
.hl-bar{width:36px;height:3px;background:var(--terra);margin-bottom:16px;border-radius:2px}
.hl-text{font-family:'DM Serif Display',serif;font-style:italic;font-size:1.05rem;
  line-height:1.6;color:rgba(254,246,228,.8)}

/* Values strip */
.values{background:var(--sage);padding:48px 8vw}
.values-inner{max-width:1100px;margin:0 auto;display:flex;gap:48px;align-items:center;flex-wrap:wrap;justify-content:center}
.value{text-align:center;color:var(--white)}
.value-icon{font-size:2rem;margin-bottom:8px}
.value-label{font-family:'DM Serif Display',serif;font-size:1rem;color:rgba(255,253,247,.9)}

/* Hours */
.hours-section{padding:80px 8vw}
.hours-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
@media(max-width:700px){.hours-inner{grid-template-columns:1fr}}
.hours-list{display:grid;gap:8px}
.hour{display:flex;justify-content:space-between;align-items:center;
  padding:12px 20px;border-radius:12px;background:var(--white);
  box-shadow:0 2px 12px rgba(45,24,16,.05);font-size:.9rem}
.hour-day{color:var(--terra);font-weight:500}
.hour-time{color:var(--muted)}
.map-placeholder{background:var(--white);border-radius:24px;padding:40px;
  text-align:center;box-shadow:0 4px 30px rgba(45,24,16,.06)}
.map-icon{font-size:3rem;margin-bottom:16px}
.map-addr{font-family:'DM Serif Display',serif;font-size:1.1rem;color:var(--dark);margin-bottom:8px}
.map-sub{font-size:.88rem;color:var(--muted);line-height:1.5}
.map-link{display:inline-block;margin-top:16px;padding:10px 24px;
  border-radius:50px;background:var(--terra);color:var(--white);
  text-decoration:none;font-size:.85rem;transition:background .2s}
.map-link:hover{background:#D4722D}

/* CTA */
.cta{background:linear-gradient(135deg,var(--terra),#A04022);text-align:center;padding:100px 8vw}
.cta .s-title{color:var(--white);max-width:560px;margin:0 auto 12px}
.cta-sub{color:rgba(255,253,247,.75);margin-bottom:40px;font-size:1rem;
  max-width:460px;margin-left:auto;margin-right:auto;margin-bottom:40px}
.btn-cta{display:inline-flex;align-items:center;gap:10px;padding:18px 48px;
  background:var(--white);color:var(--terra);border-radius:50px;
  font-weight:500;font-size:1rem;text-decoration:none;
  box-shadow:0 6px 30px rgba(0,0,0,.2);transition:all .2s}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.3)}
.cta-note{font-size:.78rem;color:rgba(255,253,247,.55);margin-top:16px}

footer{text-align:center;padding:28px;font-size:.78rem;color:var(--muted);
  border-top:1px solid rgba(45,24,16,.1)}

@media(max-width:600px){
  .btn-sage{margin-left:0;margin-top:12px;display:block;text-align:center}
  .values-inner{gap:28px}
}
</style>
</head>
<body>

<div class="banner">✿ Free Concept Demo — See what your natural hair salon could look like online ✿</div>

<div class="hero">
  <div class="blob hero-blob1"></div>
  <div class="blob hero-blob2"></div>
  <div class="hero-content">
    <p class="eyebrow">Natural Hair Salon · Mount Pleasant, Harare</p>
    <h1 class="hero-name">Kinky Curly<br><em>Natural Hair</em></h1>
    <p class="hero-tagline">Where your natural texture is celebrated, not tamed.</p>
    <div class="hero-rating">
      <span class="stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</span>
      <span class="rating-num">${lead.rating}</span>
      <span class="rating-count">&nbsp;· ${lead.review_count} reviews</span>
    </div>
    <p class="hero-addr">📍 ${lead.address} &nbsp;·&nbsp; ${lead.phone_raw}</p>
    <div>
      <a href="${lead.wa_link}" class="btn-terra" target="_blank">💬 Book via WhatsApp</a>
      <a href="tel:${lead.phone_raw}" class="btn-sage">📞 Call</a>
    </div>
  </div>
</div>

<div class="wave">
  <svg viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,80 L0,80 Z" fill="#2D1810"/>
  </svg>
</div>

<div style="background:var(--dark);padding-bottom:0">
  <div class="highlight-wrap" style="padding-top:0">
    <div class="highlight-inner">
      <p class="s-tag">What clients say</p>
      <h2 class="s-title">Loved by naturals <em style="color:rgba(254,246,228,.4)">across Harare</em></h2>
      <div class="highlights">
        <div class="hl-card">
          <div class="hl-bar"></div>
          <p class="hl-text">"Finally a place that truly understands natural hair. The stylists are knowledgeable, patient and passionate — my curls have never looked this good."</p>
        </div>
        <div class="hl-card">
          <div class="hl-bar" style="background:var(--sage)"></div>
          <p class="hl-text">"The consultation alone was worth it. They took the time to understand my hair type and recommended exactly what I needed. Brilliant results."</p>
        </div>
        <div class="hl-card">
          <div class="hl-bar" style="background:var(--amber)"></div>
          <p class="hl-text">"Warm, welcoming and wonderfully skilled. A salon that genuinely cares about the health of your hair, not just how it looks when you leave."</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="wave" style="transform:rotate(180deg);background:var(--dark)">
  <svg viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,80 L0,80 Z" fill="#FEF6E4"/>
  </svg>
</div>

<div class="section">
  <p class="s-tag">Services</p>
  <h2 class="s-title">Every curl, coil and <em>kink</em> welcome</h2>
  <div class="organic-grid">
    <div class="organic-card">
      <div class="card-leaf">🌿</div>
      <div class="card-icon">🌀</div>
      <div class="card-name">Curl Definition</div>
      <p class="card-desc">Wash-and-go, twist-outs and braid-outs crafted to show off your natural pattern.</p>
    </div>
    <div class="organic-card">
      <div class="card-leaf">🍃</div>
      <div class="card-icon">💧</div>
      <div class="card-name">Moisture Treatments</div>
      <p class="card-desc">Deep conditioning and moisture-sealing treatments to restore softness and shine.</p>
    </div>
    <div class="organic-card">
      <div class="card-leaf">🌱</div>
      <div class="card-icon">🪢</div>
      <div class="card-name">Protective Styling</div>
      <p class="card-desc">Box braids, faux locs, Senegalese twists and more — styling that protects as it shines.</p>
    </div>
    <div class="organic-card">
      <div class="card-leaf">✿</div>
      <div class="card-icon">✂️</div>
      <div class="card-name">Natural Cuts</div>
      <p class="card-desc">Shape and define your natural hair with precision cuts that honour your texture.</p>
    </div>
  </div>
</div>

<div class="values">
  <div class="values-inner">
    <div class="value"><div class="value-icon">🌿</div><div class="value-label">Natural Products</div></div>
    <div class="value"><div class="value-icon">💚</div><div class="value-label">Hair Health First</div></div>
    <div class="value"><div class="value-icon">✨</div><div class="value-label">Every Texture</div></div>
    <div class="value"><div class="value-icon">🤝</div><div class="value-label">Warm Community</div></div>
  </div>
</div>

<div class="hours-section">
  <div class="hours-inner">
    <div>
      <p class="s-tag">Opening Hours</p>
      <h2 class="s-title" style="font-size:2rem">Come visit <em>us</em></h2>
      <div class="hours-list">
        ${lead.hours && lead.hours.length > 0
          ? lead.hours.map(h => {
              const p = h.split(': ');
              return `<div class="hour"><span class="hour-day">${p[0]||h}</span><span class="hour-time">${p[1]||''}</span></div>`;
            }).join('')
          : `<div class="hour"><span class="hour-day">Monday – Friday</span><span class="hour-time">8:00am – 6:00pm</span></div>
             <div class="hour"><span class="hour-day">Saturday</span><span class="hour-time">8:00am – 5:00pm</span></div>
             <div class="hour"><span class="hour-day">Sunday</span><span class="hour-time">By Appointment</span></div>`
        }
      </div>
    </div>
    <div>
      <p class="s-tag">Find Us</p>
      <h2 class="s-title" style="font-size:2rem">Our <em>location</em></h2>
      <div class="map-placeholder">
        <div class="map-icon">📍</div>
        <div class="map-addr">${lead.address}</div>
        <div class="map-sub">Mount Pleasant, Harare, Zimbabwe<br>${lead.phone_raw}</div>
        <a href="${lead.wa_link}" class="map-link" target="_blank">💬 Message Us</a>
      </div>
    </div>
  </div>
</div>

<div class="cta">
  <p class="s-tag" style="color:rgba(255,253,247,.6)">Get Online</p>
  <h2 class="s-title">Your natural hair salon deserves a<br><em>beautiful</em> online home</h2>
  <p class="cta-sub">This concept was built free. A real, live website for your salon — just $50, ready in 24 hours.</p>
  <a href="${lead.wa_link}" class="btn-cta" target="_blank">💬 Chat on WhatsApp</a>
  <p class="cta-note">⚠️ ${lead.notes}</p>
</div>

<footer>${lead.name} &nbsp;·&nbsp; ${lead.area}, Zimbabwe &nbsp;·&nbsp; Free concept demo</footer>
</body>
</html>`;
}
