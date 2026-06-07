import { createFileRoute } from "@tanstack/react-router";
import heroInterior from "@/assets/hero-interior.jpg";
import dishGrigliata from "@/assets/dish-grigliata.jpg";
import dishBurger from "@/assets/dish-burger.jpg";
import roomAquarium from "@/assets/room-aquarium.jpg";
import roomCeiling from "@/assets/room-ceiling.jpg";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Route = createFileRoute("/")({
  component: Index,
});

const DISH_IMAGES = [dishGrigliata, dishBurger];

const ROOM_SHOTS = [
  { src: roomAquarium, altKey: "aquarium" },
  { src: roomCeiling, altKey: "ceiling" },
];

const REVIEW_AUTHORS = [
  { name: "Hunor Matyas", when: "5 mo" },
  { name: "Pascal Daum", when: "3 mo" },
  { name: "Rajib Chowdhuri", when: "9 mo" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <Menu />
      <Inside />
      <Reviews />
      <Features />
      <Visit />
      <Footer />
    </div>
  );
}

function Header() {
  const { t } = useI18n();
  const nav = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.menu, href: "#menu" },
    { label: t.nav.reviews, href: "#reviews" },
    { label: t.nav.visit, href: "#visit" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-xl tracking-wide">Konoba <span className="text-accent">Tarsa</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="tel:+385994904583"
            className="hidden sm:inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            {t.reserve}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img
        src={heroInterior}
        alt="Konoba Tarsa"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      <div className="relative z-10 mx-auto max-w-5xl h-full px-6 flex flex-col justify-end pb-20 md:pb-28 text-primary-foreground">
        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-gold mb-6">
          <span>★ 4.7</span>
          <span className="opacity-60">/</span>
          <span className="opacity-80">3,949 {t.hero.reviews}</span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-balance max-w-4xl">
          {t.hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-primary-foreground/85 text-balance">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#menu" className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-7 py-3 font-medium hover:opacity-90 transition">
            {t.hero.cta_menu}
          </a>
          <a href="tel:+385994904583" className="inline-flex items-center rounded-full border border-primary-foreground/40 px-7 py-3 font-medium hover:bg-primary-foreground/10 transition">
            {t.hero.cta_book}
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-5">{t.about.kicker}</p>
          <h2 className="text-4xl md:text-5xl mb-6 text-balance">{t.about.title}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{t.about.p1}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-lg">{t.about.p2}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Stat number="4.7★" label={t.about.stats.rating} />
          <Stat number="3,949" label={t.about.stats.reviews} />
          <Stat number="€20–40" label={t.about.stats.price} />
          <Stat number="24:00" label={t.about.stats.hours} />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="font-display text-3xl text-accent">{number}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Menu() {
  const { t } = useI18n();
  return (
    <section id="menu" className="py-24 md:py-32 bg-secondary/40 border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">{t.menu.kicker}</p>
          <h2 className="text-4xl md:text-5xl text-balance">{t.menu.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.menu.sub}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {t.menu.items.map((h, i) => (
            <article key={h.name} className="group rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl transition-shadow">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={DISH_IMAGES[i]}
                  alt={h.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <span className="inline-block text-xs uppercase tracking-widest text-accent mb-2">{h.tag}</span>
                <h3 className="font-display text-2xl mb-2">{h.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Inside() {
  const { t } = useI18n();
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">{t.inside.kicker}</p>
          <h2 className="text-4xl md:text-5xl text-balance">{t.inside.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.inside.sub}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {ROOM_SHOTS.map((r) => (
            <div key={r.altKey} className="overflow-hidden rounded-xl border border-border aspect-[4/3]">
              <img src={r.src} alt="" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { t } = useI18n();
  return (
    <section id="reviews" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">{t.reviewsSec.kicker}</p>
          <h2 className="text-4xl md:text-5xl text-balance">{t.reviewsSec.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.reviewsSec.quotes.map((quote, i) => (
            <figure key={REVIEW_AUTHORS[i].name} className="rounded-xl border border-border bg-card p-7 flex flex-col">
              <div className="text-gold mb-3">★★★★★</div>
              <blockquote className="text-foreground/90 leading-relaxed flex-1">"{quote}"</blockquote>
              <figcaption className="mt-6 pt-4 border-t border-border">
                <div className="font-medium">{REVIEW_AUTHORS[i].name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{REVIEW_AUTHORS[i].when} · Google</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { t } = useI18n();
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl md:text-4xl text-center mb-12 text-balance">{t.features.title}</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
          {t.features.items.map((f) => (
            <li key={f} className="flex items-start gap-3 text-primary-foreground/90">
              <span className="text-accent mt-1">●</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Visit() {
  const { t } = useI18n();
  return (
    <section id="visit" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-5">{t.visit.kicker}</p>
          <h2 className="text-4xl md:text-5xl mb-8 text-balance">{t.visit.title}</h2>

          <div className="space-y-6 text-lg">
            <InfoRow label={t.visit.address} value={<>J. Kulfaneka, Strmica 10<br />51000 Rijeka, Croatia</>} />
            <InfoRow label={t.visit.phone} value={<a href="tel:+385994904583" className="hover:text-accent transition">099 490 4583</a>} />
            <InfoRow label={t.visit.hours} value={t.visit.hoursValue} />
            <InfoRow label={t.visit.price} value="€20 – €40" />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="tel:+385994904583" className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-7 py-3 font-medium hover:opacity-90 transition">
              {t.visit.cta_call}
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Konoba+Tarsa+Rijeka"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border px-7 py-3 font-medium hover:bg-secondary transition"
            >
              {t.visit.cta_directions}
            </a>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-border min-h-[420px] bg-muted">
          <iframe
            title="Map to Konoba Tarsa"
            className="w-full h-full min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Konoba+Tarsa,+Strmica+10,+Rijeka&output=embed"
          />
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
      <div className="text-foreground">{value}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div className="font-display text-base text-foreground">Konoba Tarsa</div>
        <div>© {new Date().getFullYear()} Konoba Tarsa · Rijeka, Croatia</div>
      </div>
    </footer>
  );
}
