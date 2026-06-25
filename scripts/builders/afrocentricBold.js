// Design: Bold Afrocentric natural hair celebration for Afrokink Hair & Beauty
export function generateAfrocentricBold(lead) {
  const stars = Math.round(lead.rating);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${lead.name} | Natural Hair Harare</title>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Nunito:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#120600;--terracotta:#E8692A;--amber:#F5B942;--cream:#FFF8EE;--brown:#3D1C02;
  --mid:#2A1000;--text:#D4B09A;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'Nunito',sans-serif;font-weight:300;overflow-x:hidden}

/* Banner */
.banner{background:var(--terracotta);color:var(--bg);text-align:center;padding:10px 20px;
  font-family:'Oswald',sans-serif;font-weight:600;font-size:.82rem;letter-spacing:.3em;text-transform:uppercase}

/* Animated border pattern */
@keyframes patternScroll{from{background-position:0 0}to{background-position:60px 60px}}
.kente-border{height:12px;
  background:repeating-linear-gradient(90deg,var(--terracotta) 0px,var(--terracotta) 10px,
    var(--amber) 10px,var(--amber) 20px,var(--bg) 20px,var(--bg) 30px,
    var(--terracotta) 30px,var(--terracotta) 40px,var(--amber) 40px,var(--amber) 50px,
    #2A6049 50px,#2A6049 60px);
  background-size:60px 100%;animation:patternScroll 2s linear infinite}

/* Hero - diagonal split */
.hero{position:relative;min-height:100vh;display:grid;grid-template-columns:1fr 1fr;overflow:hidden}
@media(max-width:768px){.hero{grid-template-columns:1fr;min-height:auto}}

.hero-left{background:linear-gradient(160deg,var(--bg) 0%,var(--mid) 100%);
  padding:80px 48px 80px;display:flex;flex-direction:column;justify-content:center;
  position:relative;z-index:2;clip-path:polygon(0 0,90% 0,100% 100%,0 100%)}
@media(max-width:768px){.hero-left{clip-path:none;padding:60px 28px}}

.hero-right{background:var(--mid);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
.geo-pattern{position:absolute;inset:0;opacity:.2;
  background:repeating-linear-gradient(45deg,var(--terracotta) 0px,var(--terracotta) 2px,transparent 2px,transparent 20px),
             repeating-linear-gradient(-45deg,var(--amber) 0px,var(--amber) 2px,transparent 2px,transparent 20px)}
.afro-graphic{position:relative;z-index:2;text-align:center}
.afro-circle{width:200px;height:200px;border-radius:50%;
  background:radial-gradient(circle at 35% 35%,var(--amber),var(--terracotta));
  margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:5rem;
  box-shadow:0 0 60px rgba(232,105,42,.4),0 0 120px rgba(232,105,42,.15)}
.afro-tagline{color:var(--cream);font-family:'Oswald',sans-serif;font-size:1.1rem;
  letter-spacing:.15em;text-transform:uppercase}

@keyframes slideInLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
.label{font-size:.72rem;letter-spacing:.4em;text-transform:uppercase;color:var(--terracotta);
  margin-bottom:16px;animation:slideInLeft .6s ease forwards}
.hero-name{font-family:'Oswald',sans-serif;font-weight:700;
  font-size:clamp(2rem,5vw,3.8rem);color:var(--cream);line-height:1.05;
  margin-bottom:24px;animation:slideInLeft .7s ease .1s both}
.hero-name span{color:var(--amber)}
.underline-bar{width:80px;height:4px;background:var(--terracotta);margin-bottom:24px;
  animation:slideInLeft .7s ease .2s both}
.hero-rating{display:flex;align-items:center;gap:10px;margin-bottom:8px;animation:slideInLeft .7s ease .3s both}
.stars{color:var(--amber);font-size:1.2rem;letter-spacing:2px}
.rating-num{font-family:'Oswald',sans-serif;font-size:1.8rem;color:var(--cream)}
.rating-count{font-size:.85rem;opacity:.6}
.hero-addr{font-size:.88rem;opacity:.6;margin-bottom:36px;animation:slideInLeft .7s ease .4s both}
.btn-main{display:inline-flex;align-items:center;gap:10px;padding:16px 36px;
  background:var(--terracotta);color:var(--cream);border-radius:4px;
  font-family:'Oswald',sans-serif;font-weight:600;font-size:1rem;text-decoration:none;
  letter-spacing:.08em;text-transform:uppercase;transition:all .2s;
  animation:slideInLeft .7s ease .5s both;box-shadow:0 6px 30px rgba(232,105,42,.4)}
.btn-main:hover{background:#FF7C3A;transform:translateY(-2px);box-shadow:0 10px 40px rgba(232,105,42,.5)}
.btn-ghost{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;
  border:2px solid rgba(245,185,66,.4);color:var(--amber);border-radius:4px;
  font-family:'Oswald',sans-serif;font-size:.95rem;text-decoration:none;margin-left:12px;
  transition:all .2s;animation:slideInLeft .7s ease .6s both;text-transform:uppercase;letter-spacing:.05em}
.btn-ghost:hover{border-color:var(--amber);background:rgba(245,185,66,.08)}

/* Sections */
.section-wrap{max-width:1000px;margin:0 auto;padding:80px 24px}
.s-eyebrow{font-size:.72rem;letter-spacing:.35em;text-transform:uppercase;color:var(--terracotta);margin-bottom:10px}
.s-title{font-family:'Oswald',sans-serif;font-weight:700;font-size:clamp(1.8rem,4vw,2.8rem);
  color:var(--cream);margin-bottom:40px;line-height:1.1}
.s-title span{color:var(--amber)}

/* Service tiles */
.tile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.tile{padding:32px 24px;border-radius:8px;text-align:center;position:relative;overflow:hidden;
  transition:transform .25s,box-shadow .25s;cursor:default}
.tile:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.4)}
.tile-icon{font-size:2.5rem;margin-bottom:16px}
.tile-name{font-family:'Oswald',sans-serif;font-size:1.1rem;color:var(--cream);margin-bottom:8px;letter-spacing:.05em}
.tile-desc{font-size:.84rem;line-height:1.5;opacity:.75}
.t1{background:linear-gradient(135deg,#2D0E00,#4A2010)}
.t2{background:linear-gradient(135deg,#1A0E00,#3A2800)}
.t3{background:linear-gradient(135deg,#0A1A12,#1A3020)}
.t4{background:linear-gradient(135deg,#1A0A20,#2A1030)}
.tile::after{content:'';position:absolute;top:0;left:0;right:0;height:3px}
.t1::after{background:var(--terracotta)}.t2::after{background:var(--amber)}
.t3::after{background:#4AAD7A}.t4::after{background:#8B5CF6}

/* Divider */
.kente-mid{margin:0;height:6px;
  background:repeating-linear-gradient(90deg,var(--terracotta) 0,var(--terracotta) 8px,
    var(--amber) 8px,var(--amber) 16px,var(--bg) 16px,var(--bg) 24px);background-size:24px 100%}

/* Highlights */
.pull-quotes{display:grid;gap:24px}
.pull-quote{display:flex;gap:20px;align-items:flex-start;padding:28px;
  background:var(--mid);border-radius:8px}
.pq-mark{font-family:'Oswald',sans-serif;font-size:4rem;color:var(--terracotta);
  line-height:.8;flex-shrink:0;opacity:.5}
.pq-text{font-size:.95rem;line-height:1.7;font-style:italic}

/* CTA */
.cta-block{background:linear-gradient(135deg,#E8692A,#F5B942);text-align:center;padding:80px 24px}
.cta-block .s-title{color:#100600}
.cta-sub{color:#3D1C02;opacity:.85;margin-bottom:36px;font-size:1rem;max-width:500px;margin-left:auto;margin-right:auto;margin-bottom:36px}
.btn-cta{display:inline-flex;align-items:center;gap:10px;padding:18px 44px;
  background:#100600;color:var(--cream);border-radius:4px;
  font-family:'Oswald',sans-serif;font-weight:700;font-size:1.1rem;text-decoration:none;
  letter-spacing:.1em;text-transform:uppercase;transition:transform .2s,box-shadow .2s}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 10px 40px rgba(0,0,0,.4)}
.cta-note{font-size:.78rem;color:#3D1C02;opacity:.6;margin-top:16px}

footer{text-align:center;padding:28px;font-size:.78rem;opacity:.4;
  border-top:1px solid rgba(255,255,255,.06)}

@media(max-width:600px){
  .btn-ghost{margin-left:0;margin-top:12px;display:block;text-align:center}
}
</style>
</head>
<body>

<div class="banner">✶ Free Concept Demo — Your Website Could Look Like This ✶</div>
<div class="kente-border"></div>

<div class="hero">
  <div class="hero-left">
    <p class="label">Natural Hair · Harare, Zimbabwe</p>
    <h1 class="hero-name">Afrokink<br><span>Hair &amp; Beauty</span><br>Salon</h1>
    <div class="underline-bar"></div>
    <div class="hero-rating">
      <span class="stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</span>
      <span class="rating-num">${lead.rating}</span>
      <span class="rating-count">&nbsp;· ${lead.review_count} reviews</span>
    </div>
    <p class="hero-addr">📍 ${lead.address}</p>
    <div>
      <a href="${lead.wa_link}" class="btn-main" target="_blank">💬 Book Now</a>
      <a href="tel:${lead.phone_raw}" class="btn-ghost">📞 Call</a>
    </div>
  </div>
  <div class="hero-right">
    <div class="geo-pattern"></div>
    <div class="afro-graphic">
      <div class="afro-circle">🌿</div>
      <p class="afro-tagline">Natural · Bold · Beautiful</p>
    </div>
  </div>
</div>

<div class="kente-border"></div>

<div class="section-wrap">
  <p class="s-eyebrow">Services</p>
  <h2 class="s-title">Your hair, <span>your power</span></h2>
  <div class="tile-grid">
    <div class="tile t1">
      <div class="tile-icon">🌀</div>
      <div class="tile-name">Natural Styling</div>
      <p class="tile-desc">Twist-outs, braid-outs, wash-and-go — your natural texture celebrated.</p>
    </div>
    <div class="tile t2">
      <div class="tile-icon">✂️</div>
      <div class="tile-name">Big Chop & Cuts</div>
      <p class="tile-desc">Confident cuts to shape and define your natural crown perfectly.</p>
    </div>
    <div class="tile t3">
      <div class="tile-icon">💧</div>
      <div class="tile-name">Deep Conditioning</div>
      <p class="tile-desc">Intensive moisture treatments to restore life to every curl pattern.</p>
    </div>
    <div class="tile t4">
      <div class="tile-icon">🎀</div>
      <div class="tile-name">Protective Styles</div>
      <p class="tile-desc">Box braids, faux locs, twists — protection with real style impact.</p>
    </div>
  </div>
</div>

<div class="kente-mid"></div>

<div class="section-wrap">
  <p class="s-eyebrow">What People Say</p>
  <h2 class="s-title">Real results, <span>real people</span></h2>
  <div class="pull-quotes">
    <div class="pull-quote">
      <div class="pq-mark">"</div>
      <p class="pq-text">The team here genuinely understands natural hair — the difference shows from the very first appointment. Professional, attentive, and skilled.</p>
    </div>
    <div class="pull-quote">
      <div class="pq-mark">"</div>
      <p class="pq-text">A place that truly celebrates what natural hair can be. The results exceeded everything I expected and the atmosphere is warm and welcoming.</p>
    </div>
  </div>
</div>

<div class="kente-border"></div>

<div class="cta-block">
  <p class="s-eyebrow" style="color:#3D1C02">Get Online</p>
  <h2 class="s-title" style="color:#100600;max-width:560px;margin:0 auto 12px">Claim your space on<br>the internet</h2>
  <p class="cta-sub">This is a free concept. A real, live website for your salon — $50, live in 24 hours.</p>
  <a href="${lead.wa_link}" class="btn-cta" target="_blank">💬 Let's Talk</a>
  <p class="cta-note">⚠️ ${lead.notes}</p>
</div>

<footer>${lead.name} · ${lead.area}, Zimbabwe · Free concept demo</footer>
</body>
</html>`;
}
