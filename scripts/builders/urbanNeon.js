// Design: Urban neon cyberpunk energy for X-Faktor Salon
export function generateUrbanNeon(lead) {
  const stars = Math.round(lead.rating);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${lead.name} | Harare's Boldest Salon</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#030303;--bg2:#080808;--cyan:#00E5FF;--pink:#FF0090;--green:#39FF14;
  --gray:#888;--light:#E0E0E0;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--light);font-family:'Space Grotesk',sans-serif;font-weight:300;overflow-x:hidden}

/* Grid background */
body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(0,229,255,.04) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(0,229,255,.04) 1px,transparent 1px);
  background-size:40px 40px}

/* Scanline */
body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.15) 2px,rgba(0,0,0,.15) 4px)}

/* Banner */
.banner{position:relative;z-index:10;background:var(--bg2);
  border-bottom:1px solid rgba(0,229,255,.3);text-align:center;padding:10px 20px;
  font-family:'Barlow Condensed',sans-serif;font-size:.85rem;letter-spacing:.3em;
  text-transform:uppercase;color:var(--cyan);
  text-shadow:0 0 10px rgba(0,229,255,.5)}

/* Hero */
.hero{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;
  justify-content:center;align-items:flex-start;padding:100px 8vw;
  border-bottom:1px solid rgba(0,229,255,.2)}

/* Glitch */
@keyframes glitch1{
  0%,100%{clip-path:inset(0 0 95% 0);transform:translate(-3px,0)}
  20%{clip-path:inset(40% 0 50% 0);transform:translate(3px,0)}
  40%{clip-path:inset(70% 0 20% 0);transform:translate(-2px,0)}
  60%{clip-path:inset(20% 0 65% 0);transform:translate(2px,0)}
  80%{clip-path:inset(55% 0 35% 0);transform:translate(-1px,0)}
}
@keyframes glitch2{
  0%,100%{clip-path:inset(85% 0 5% 0);transform:translate(3px,0)}
  20%{clip-path:inset(15% 0 75% 0);transform:translate(-3px,0)}
  40%{clip-path:inset(60% 0 30% 0);transform:translate(2px,0)}
  60%{clip-path:inset(30% 0 55% 0);transform:translate(-2px,0)}
  80%{clip-path:inset(5% 0 88% 0);transform:translate(1px,0)}
}
.glitch-wrap{position:relative;display:inline-block;margin-bottom:16px}
.glitch-main{font-family:'Barlow Condensed',sans-serif;font-weight:900;
  font-size:clamp(4rem,12vw,9rem);color:var(--light);line-height:.95;
  text-transform:uppercase;letter-spacing:-.02em}
.glitch-wrap::before,.glitch-wrap::after{content:'X-FAKTOR';position:absolute;top:0;left:0;
  font-family:'Barlow Condensed',sans-serif;font-weight:900;
  font-size:clamp(4rem,12vw,9rem);line-height:.95;text-transform:uppercase;letter-spacing:-.02em;
  width:100%;overflow:hidden}
.glitch-wrap::before{color:var(--cyan);animation:glitch1 4s steps(1) infinite;
  text-shadow:none;left:2px}
.glitch-wrap::after{color:var(--pink);animation:glitch2 4s steps(1) infinite 1s;
  text-shadow:none;left:-2px}

.hero-sub{font-family:'Barlow Condensed',sans-serif;font-size:clamp(1.2rem,3vw,2rem);
  text-transform:uppercase;letter-spacing:.2em;color:var(--gray);margin-bottom:32px}
.hero-sub span{color:var(--cyan)}
.neon-line{width:120px;height:2px;margin-bottom:32px;
  background:linear-gradient(90deg,var(--cyan),var(--pink));
  box-shadow:0 0 10px var(--cyan),0 0 20px var(--pink)}
.hero-rating{display:flex;align-items:center;gap:16px;margin-bottom:8px}
.stars{color:var(--cyan);font-size:1.2rem;letter-spacing:3px;
  text-shadow:0 0 8px rgba(0,229,255,.6)}
.rating-num{font-family:'Barlow Condensed',sans-serif;font-size:2.2rem;color:var(--light)}
.rating-count{color:var(--gray);font-size:.85rem}
.hero-addr{font-size:.88rem;color:var(--gray);margin-bottom:40px}

@keyframes neonPulse{
  0%,100%{box-shadow:0 0 10px var(--cyan),0 0 20px var(--cyan),0 0 40px rgba(0,229,255,.3)}
  50%{box-shadow:0 0 20px var(--cyan),0 0 40px var(--cyan),0 0 80px rgba(0,229,255,.5)}
}
.btn-neon{display:inline-flex;align-items:center;gap:10px;padding:16px 40px;
  border:2px solid var(--cyan);color:var(--cyan);background:rgba(0,229,255,.05);
  font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.1rem;
  text-decoration:none;letter-spacing:.15em;text-transform:uppercase;
  animation:neonPulse 2s ease infinite;transition:background .2s}
.btn-neon:hover{background:rgba(0,229,255,.12)}
.btn-pink{display:inline-flex;align-items:center;gap:10px;padding:16px 32px;
  border:2px solid var(--pink);color:var(--pink);background:rgba(255,0,144,.05);
  font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.1rem;
  text-decoration:none;letter-spacing:.15em;text-transform:uppercase;margin-left:12px;
  transition:all .2s}
.btn-pink:hover{background:rgba(255,0,144,.12)}

/* Stats bar */
.stats-bar{position:relative;z-index:1;background:var(--bg2);
  border-top:1px solid rgba(0,229,255,.15);border-bottom:1px solid rgba(0,229,255,.15);
  display:flex;justify-content:center;gap:0;overflow:hidden}
.stat{flex:1;text-align:center;padding:28px 20px;
  border-right:1px solid rgba(0,229,255,.1);max-width:240px}
.stat:last-child{border-right:none}
.stat-num{font-family:'Barlow Condensed',sans-serif;font-size:2.5rem;font-weight:900;
  color:var(--cyan);text-shadow:0 0 15px rgba(0,229,255,.5)}
.stat-label{font-size:.75rem;text-transform:uppercase;letter-spacing:.2em;color:var(--gray);margin-top:4px}

/* Sections */
.section{position:relative;z-index:1;max-width:1000px;margin:0 auto;padding:80px 24px}
.s-label{font-size:.72rem;letter-spacing:.4em;text-transform:uppercase;color:var(--pink);
  margin-bottom:10px;text-shadow:0 0 8px rgba(255,0,144,.4)}
.s-title{font-family:'Barlow Condensed',sans-serif;font-weight:900;
  font-size:clamp(2rem,5vw,3.5rem);text-transform:uppercase;color:var(--light);margin-bottom:40px}
.s-title span{color:var(--cyan);text-shadow:0 0 15px rgba(0,229,255,.4)}

/* Service cards */
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2px}
.card{padding:36px 24px;background:var(--bg2);border:1px solid rgba(0,229,255,.1);
  transition:border-color .2s,background .2s;position:relative;overflow:hidden}
.card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
  transform:scaleX(0);transition:transform .3s}
.card:hover{border-color:rgba(0,229,255,.4);background:rgba(0,229,255,.03)}
.card:hover::after{transform:scaleX(1)}
.c1::after{background:var(--cyan)}.c2::after{background:var(--pink)}
.c3::after{background:var(--green)}.c4::after{background:#FF6B00}
.card-num{font-family:'Barlow Condensed',sans-serif;font-size:3rem;font-weight:900;
  opacity:.12;color:var(--cyan);line-height:1;margin-bottom:12px}
.card-name{font-family:'Barlow Condensed',sans-serif;font-size:1.4rem;font-weight:700;
  text-transform:uppercase;letter-spacing:.05em;color:var(--light);margin-bottom:8px}
.card-desc{font-size:.85rem;line-height:1.6;color:var(--gray)}

/* Testimonials */
.reviews{display:grid;gap:16px}
.review{border:1px solid rgba(0,229,255,.12);padding:24px;background:var(--bg2)}
.review-text{font-style:italic;font-size:.93rem;line-height:1.7;margin-bottom:12px}
.review-meta{font-size:.78rem;color:var(--cyan);font-family:'Barlow Condensed',sans-serif;
  letter-spacing:.1em;text-transform:uppercase;text-shadow:0 0 6px rgba(0,229,255,.4)}

/* CTA */
.cta{position:relative;z-index:1;text-align:center;padding:80px 24px;
  border-top:1px solid rgba(0,229,255,.2)}
.cta-title{font-family:'Barlow Condensed',sans-serif;font-weight:900;
  font-size:clamp(2.5rem,7vw,5rem);text-transform:uppercase;color:var(--light);margin-bottom:12px}
.cta-title span{color:var(--pink);text-shadow:0 0 20px rgba(255,0,144,.5)}
.cta-sub{color:var(--gray);margin-bottom:40px;font-size:1rem;max-width:500px;margin-left:auto;margin-right:auto;margin-bottom:40px}
.cta-note{font-size:.78rem;color:var(--gray);opacity:.6;margin-top:16px}

footer{position:relative;z-index:1;text-align:center;padding:28px;
  font-size:.75rem;color:var(--gray);opacity:.5;
  border-top:1px solid rgba(0,229,255,.1)}

@media(max-width:600px){
  .btn-pink{margin-left:0;margin-top:12px;display:block;text-align:center}
  .stats-bar{flex-wrap:wrap}
  .stat{max-width:50%;border-bottom:1px solid rgba(0,229,255,.1)}
}
</style>
</head>
<body>

<div class="banner">⚡ Free Concept Demo — X-Faktor Salon Website Preview ⚡</div>

<div class="hero">
  <p class="hero-sub">Harare's <span>boldest</span> salon</p>
  <div class="glitch-wrap"><div class="glitch-main">X-Faktor</div></div>
  <div class="neon-line"></div>
  <div class="hero-rating">
    <span class="stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</span>
    <span class="rating-num">${lead.rating}</span>
    <span class="rating-count">&nbsp;· ${lead.review_count} reviews</span>
  </div>
  <p class="hero-addr">📍 ${lead.address} &nbsp;|&nbsp; ${lead.phone_raw}</p>
  <br>
  <div>
    <a href="${lead.wa_link}" class="btn-neon" target="_blank">💬 Book Now</a>
    <a href="tel:${lead.phone_raw}" class="btn-pink">📞 Call</a>
  </div>
</div>

<div class="stats-bar">
  <div class="stat"><div class="stat-num">${lead.rating}</div><div class="stat-label">Star Rating</div></div>
  <div class="stat"><div class="stat-num">${lead.review_count}+</div><div class="stat-label">Happy Clients</div></div>
  <div class="stat"><div class="stat-num">3</div><div class="stat-label">Locations</div></div>
  <div class="stat"><div class="stat-num">$50</div><div class="stat-label">Get This Site Live</div></div>
</div>

<div class="section">
  <p class="s-label">What We Do</p>
  <h2 class="s-title">Next level <span>every time</span></h2>
  <div class="cards">
    <div class="card c1">
      <div class="card-num">01</div>
      <div class="card-name">Precision Cuts</div>
      <p class="card-desc">Sharp, intentional, flawless. Every cut tailored to your face and style identity.</p>
    </div>
    <div class="card c2">
      <div class="card-num">02</div>
      <div class="card-name">Colour Work</div>
      <p class="card-desc">Vivid colour, balayage, highlights — transformations that actually turn heads.</p>
    </div>
    <div class="card c3">
      <div class="card-num">03</div>
      <div class="card-name">Styling</div>
      <p class="card-desc">Blow-dries, silk press, braids and upstyles for any occasion.</p>
    </div>
    <div class="card c4">
      <div class="card-num">04</div>
      <div class="card-name">Treatments</div>
      <p class="card-desc">Hair repair, strengthening and scalp treatments that actually work.</p>
    </div>
  </div>
</div>

<div class="section" style="padding-top:0">
  <p class="s-label">Reviews</p>
  <h2 class="s-title">Clients <span>don't lie</span></h2>
  <div class="reviews">
    <div class="review">
      <p class="review-text">"The skill level here is genuinely impressive — walked in not knowing what I wanted, walked out with exactly what I needed. Consistent quality every single visit."</p>
      <div class="review-meta">⭐ Verified Client · ${lead.rating}/5</div>
    </div>
    <div class="review">
      <p class="review-text">"Fast, professional, and the results are sharp. This is the kind of salon that actually delivers on the hype. Multiple locations means I can always get in."</p>
      <div class="review-meta">⭐ Verified Client · Harare</div>
    </div>
  </div>
</div>

<div class="cta">
  <h2 class="cta-title">Get your<br><span>site live</span></h2>
  <p class="cta-sub">This free concept took hours to build. Your real site — same quality, fully live and yours — for $50.</p>
  <a href="${lead.wa_link}" class="btn-neon" target="_blank" style="font-size:1.2rem;padding:18px 48px">💬 Message Us</a>
  <p class="cta-note">⚠️ ${lead.notes}</p>
</div>

<footer>${lead.name} &nbsp;·&nbsp; ${lead.area}, Zimbabwe &nbsp;·&nbsp; Free concept demo</footer>
</body>
</html>`;
}
