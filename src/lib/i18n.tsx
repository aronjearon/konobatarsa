import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "hr" | "en" | "de" | "fr" | "it";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "hr", label: "Hrvatski", flag: "🇭🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

type Dict = {
  nav: { about: string; menu: string; reviews: string; visit: string };
  reserve: string;
  hero: {
    reviews: string;
    title: string;
    subtitle: string;
    cta_menu: string;
    cta_book: string;
  };
  about: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    stats: { rating: string; reviews: string; price: string; hours: string };
  };
  menu: {
    kicker: string;
    title: string;
    sub: string;
    items: { tag: string; name: string; desc: string }[];
  };
  inside: { kicker: string; title: string; sub: string };
  reviewsSec: { kicker: string; title: string; quotes: string[] };
  features: { title: string; items: string[] };
  visit: {
    kicker: string;
    title: string;
    address: string;
    phone: string;
    hours: string;
    price: string;
    hoursValue: string;
    cta_call: string;
    cta_directions: string;
  };
  language: string;
};

const dictionaries: Record<Lang, Dict> = {
  hr: {
    nav: { about: "O nama", menu: "Jelovnik", reviews: "Recenzije", visit: "Posjetite nas" },
    reserve: "Rezerviraj",
    hero: {
      reviews: "recenzija",
      title: "Okus Jadrana, uz vatru.",
      subtitle:
        "Obiteljska konoba s velikodušnom mediteranskom i hrvatskom kuhinjom u srcu Rijeke — oduvijek, polako i s pažnjom.",
      cta_menu: "Pogledaj jelovnik",
      cta_book: "Rezerviraj stol",
    },
    about: {
      kicker: "Naša priča",
      title: "Ugodno, romantično, nepogrešivo mediteransko.",
      p1: "Skrivena u Strmici, Konoba Tarsa je mjesto koje lokalci tiho preporučuju. Kameni zidovi, pucketanje vatre i lagani žamor razgovora — uz ručno pripremljena jela i poštenu vinsku kartu.",
      p2: "Kuhamo onako kako su kuhali naši djedovi i bake: sa strpljenjem, velikodušnim porcijama i namirnicama odabranim istog jutra. Bilo da je riječ o dugom ručku ili sporoj večeri uz svijeće, dobrodošli ste za naš stol.",
      stats: { rating: "Prosječna ocjena", reviews: "Zadovoljnih recenzija", price: "Po osobi", hours: "Otvoreno do ponoći" },
    },
    menu: {
      kicker: "Iz kuhinje",
      title: "Omiljena jela gostiju",
      sub: "Mali djelić ponude. Jelovnik se mijenja sa sezonom.",
      items: [
        { tag: "Popularno", name: "Grigliata Mista", desc: "Mješavina s roštilja — pileće, kobasice i svinjetina, posluženo sa zlatnim domaćim krumpirom." },
        { tag: "Zasitno", name: "Tarsa Burger", desc: "Sočan goveđi burger u brioche pecivu sa svježom rikolom — uz košaru hrskavih krumpira." },
      ],
    },
    inside: {
      kicker: "Unutar Tarse",
      title: "Prostor pun priča.",
      sub: "Kamen, drvo i stotinu malih detalja — blagovaonica koju nećete željeti napustiti.",
    },
    reviewsSec: {
      kicker: "Njihovim riječima",
      title: "Voli nas 3.949 gostiju",
      quotes: [
        "Ovo mjesto je nevjerojatno. Porcije su OGROMNE — naručili smo plate za dvoje i bilo je dovoljno za četvero. Ukusno, velikodušno i divna usluga.",
        "Usluga i hrana bili su izvrsni! Vratili bismo se na još jednu večeru — toliko je dobro. Toplo preporučujem prilikom posjeta Rijeci.",
        "Vrijedi svake zvjezdice visoke ocjene. Porcije su izuzetno velikodušne, a pojeo sam najbolju bruschettu u životu.",
      ],
    },
    features: {
      title: "Sve što biste poželjeli od konobe",
      items: [
        "Ugodna večera uz kamin",
        "Sjajna vinska karta i kokteli",
        "Veganske i vegetarijanske opcije",
        "Dječji jelovnik i dječje stolice",
        "Vanjska terasa",
        "Besplatan parking",
        "Psi dobrodošli",
        "Pristupačno invalidskim kolicima",
      ],
    },
    visit: {
      kicker: "Posjetite nas",
      title: "Pronađite svoj stol u Tarsi.",
      address: "Adresa",
      phone: "Telefon",
      hours: "Radno vrijeme",
      price: "Po osobi",
      hoursValue: "Svaki dan · Otvoreno do ponoći",
      cta_call: "Nazovite za rezervaciju",
      cta_directions: "Upute za dolazak",
    },
    language: "Jezik",
  },
  en: {
    nav: { about: "About", menu: "Menu", reviews: "Reviews", visit: "Visit" },
    reserve: "Reserve",
    hero: {
      reviews: "reviews",
      title: "A taste of the Adriatic, by the fire.",
      subtitle:
        "Family-run konoba serving generous Mediterranean and Croatian cooking in the heart of Rijeka — since forever, slowly and with care.",
      cta_menu: "Explore the Menu",
      cta_book: "Book a Table",
    },
    about: {
      kicker: "Our Story",
      title: "Cosy, romantic, unmistakably Mediterranean.",
      p1: "Tucked away in Strmica, Konoba Tarsa is the kind of place locals quietly recommend. Stone walls, a crackling fireplace, and the easy hum of conversation — paired with hand-prepared dishes and an honest wine list.",
      p2: "We cook the way our grandparents did: with patience, generous portions, and ingredients chosen the same morning. Whether it's a long lunch or a slow, candlelit dinner, you're welcome at our table.",
      stats: { rating: "Average rating", reviews: "Happy reviews", price: "Per person", hours: "Open till midnight" },
    },
    menu: {
      kicker: "From the Kitchen",
      title: "Guest favourites",
      sub: "A small taste of what's on offer. The full menu changes with the season.",
      items: [
        { tag: "Popular", name: "Grigliata Mista", desc: "Mixed grill platter — grilled chicken, sausages and pork, served with golden home-style potatoes." },
        { tag: "Hearty", name: "Tarsa Burger", desc: "Juicy beef burger on a brioche bun with fresh rocket — paired with a basket of crispy potatoes." },
      ],
    },
    inside: {
      kicker: "Inside Tarsa",
      title: "A room full of stories.",
      sub: "Stone, timber and a hundred small details — the kind of dining room you don't want to leave.",
    },
    reviewsSec: {
      kicker: "In Their Words",
      title: "Loved by 3,949 guests",
      quotes: [
        "This place is just amazing. The portions are HUGE — we asked for a 2-person plate and it was enough for 4. Tasty, generous and the service was wonderful.",
        "Service and food were great! Would have gone back for another dinner — it's that good. Highly recommended when visiting Rijeka.",
        "Worth every star of its high rating. The portions are remarkably generous, and honestly, I had the best bruschetta of my life here.",
      ],
    },
    features: {
      title: "Everything you'd hope for in a konoba",
      items: [
        "Cosy fireplace dining",
        "Great wine list & cocktails",
        "Vegan & vegetarian options",
        "Kids' menu & high chairs",
        "Outdoor seating",
        "Free parking",
        "Dogs welcome",
        "Wheelchair accessible",
      ],
    },
    visit: {
      kicker: "Visit Us",
      title: "Find your table at Tarsa.",
      address: "Address",
      phone: "Phone",
      hours: "Hours",
      price: "Per person",
      hoursValue: "Daily · Open until midnight",
      cta_call: "Call to Reserve",
      cta_directions: "Get Directions",
    },
    language: "Language",
  },
  de: {
    nav: { about: "Über uns", menu: "Speisekarte", reviews: "Bewertungen", visit: "Besuchen" },
    reserve: "Reservieren",
    hero: {
      reviews: "Bewertungen",
      title: "Ein Stück Adria, am Feuer.",
      subtitle:
        "Familiengeführte Konoba mit großzügiger mediterraner und kroatischer Küche im Herzen von Rijeka — seit jeher, mit Ruhe und Sorgfalt.",
      cta_menu: "Zur Speisekarte",
      cta_book: "Tisch reservieren",
    },
    about: {
      kicker: "Unsere Geschichte",
      title: "Gemütlich, romantisch, unverkennbar mediterran.",
      p1: "Versteckt in Strmica ist Konoba Tarsa ein Ort, den Einheimische leise empfehlen. Steinwände, ein knisterndes Feuer und entspanntes Gemurmel — dazu handgemachte Gerichte und eine ehrliche Weinkarte.",
      p2: "Wir kochen so wie unsere Großeltern: mit Geduld, großzügigen Portionen und Zutaten, die am selben Morgen ausgewählt wurden. Ob langer Mittagstisch oder gemütliches Abendessen bei Kerzenschein — Sie sind bei uns willkommen.",
      stats: { rating: "Durchschnittliche Bewertung", reviews: "Zufriedene Gäste", price: "Pro Person", hours: "Geöffnet bis Mitternacht" },
    },
    menu: {
      kicker: "Aus der Küche",
      title: "Lieblingsgerichte unserer Gäste",
      sub: "Ein kleiner Vorgeschmack. Die volle Karte wechselt mit der Saison.",
      items: [
        { tag: "Beliebt", name: "Grigliata Mista", desc: "Gemischter Grillteller — Hähnchen, Würste und Schweinefleisch vom Grill, mit goldenen Bratkartoffeln." },
        { tag: "Herzhaft", name: "Tarsa Burger", desc: "Saftiger Rindfleisch-Burger im Brioche-Bun mit frischer Rauke — dazu ein Körbchen knusprige Kartoffeln." },
      ],
    },
    inside: {
      kicker: "Innen bei Tarsa",
      title: "Ein Raum voller Geschichten.",
      sub: "Stein, Holz und hundert kleine Details — ein Speisesaal, den man nicht verlassen möchte.",
    },
    reviewsSec: {
      kicker: "Ihre Stimmen",
      title: "Geliebt von 3.949 Gästen",
      quotes: [
        "Dieser Ort ist einfach fantastisch. Die Portionen sind RIESIG — wir bestellten einen Teller für zwei, er reichte für vier. Lecker, großzügig und toller Service.",
        "Service und Essen waren großartig! Wir wären gerne noch einmal zum Abendessen gekommen — so gut ist es. Sehr empfehlenswert bei einem Besuch in Rijeka.",
        "Jeden Stern dieser hohen Bewertung wert. Die Portionen sind bemerkenswert großzügig, und ich hatte hier die beste Bruschetta meines Lebens.",
      ],
    },
    features: {
      title: "Alles, was man sich von einer Konoba wünscht",
      items: [
        "Gemütliches Essen am Kamin",
        "Tolle Weinkarte & Cocktails",
        "Vegane & vegetarische Optionen",
        "Kindermenü & Hochstühle",
        "Sitzplätze im Freien",
        "Kostenlose Parkplätze",
        "Hunde willkommen",
        "Rollstuhlgerecht",
      ],
    },
    visit: {
      kicker: "Besuchen Sie uns",
      title: "Finden Sie Ihren Tisch im Tarsa.",
      address: "Adresse",
      phone: "Telefon",
      hours: "Öffnungszeiten",
      price: "Pro Person",
      hoursValue: "Täglich · Geöffnet bis Mitternacht",
      cta_call: "Anrufen & reservieren",
      cta_directions: "Route planen",
    },
    language: "Sprache",
  },
  fr: {
    nav: { about: "À propos", menu: "Carte", reviews: "Avis", visit: "Visitez" },
    reserve: "Réserver",
    hero: {
      reviews: "avis",
      title: "Un goût d'Adriatique, au coin du feu.",
      subtitle:
        "Konoba familiale servant une généreuse cuisine méditerranéenne et croate au cœur de Rijeka — depuis toujours, lentement et avec soin.",
      cta_menu: "Voir la carte",
      cta_book: "Réserver une table",
    },
    about: {
      kicker: "Notre histoire",
      title: "Chaleureuse, romantique, résolument méditerranéenne.",
      p1: "Nichée à Strmica, la Konoba Tarsa est l'adresse que les habitants se recommandent à voix basse. Murs de pierre, feu de cheminée et brouhaha tranquille des conversations — avec des plats préparés à la main et une carte des vins honnête.",
      p2: "Nous cuisinons comme nos grands-parents : avec patience, des portions généreuses et des ingrédients choisis le matin même. Que ce soit pour un long déjeuner ou un dîner aux chandelles, vous êtes le bienvenu à notre table.",
      stats: { rating: "Note moyenne", reviews: "Avis positifs", price: "Par personne", hours: "Ouvert jusqu'à minuit" },
    },
    menu: {
      kicker: "De la cuisine",
      title: "Les favoris des clients",
      sub: "Un petit aperçu de ce que nous proposons. La carte change avec les saisons.",
      items: [
        { tag: "Populaire", name: "Grigliata Mista", desc: "Plateau de grillades — poulet, saucisses et porc grillés, accompagnés de pommes de terre dorées maison." },
        { tag: "Copieux", name: "Tarsa Burger", desc: "Burger de bœuf juteux dans un pain brioché avec roquette fraîche — servi avec un panier de pommes de terre croustillantes." },
      ],
    },
    inside: {
      kicker: "À l'intérieur",
      title: "Une salle pleine d'histoires.",
      sub: "Pierre, bois et cent petits détails — une salle dont on ne veut plus partir.",
    },
    reviewsSec: {
      kicker: "Ils en parlent",
      title: "Adoré par 3 949 clients",
      quotes: [
        "Cet endroit est tout simplement incroyable. Les portions sont ÉNORMES — nous avons commandé un plat pour deux et il y avait de quoi nourrir quatre personnes. Savoureux, généreux et un service formidable.",
        "Service et cuisine excellents ! Nous serions revenus pour un autre dîner — c'est aussi bon que ça. Vivement recommandé lors d'un passage à Rijeka.",
        "Mérite chacune de ses étoiles. Les portions sont remarquablement généreuses et, honnêtement, j'ai mangé la meilleure bruschetta de ma vie.",
      ],
    },
    features: {
      title: "Tout ce qu'on attend d'une vraie konoba",
      items: [
        "Dîner près de la cheminée",
        "Belle carte de vins & cocktails",
        "Options végétariennes & végétaliennes",
        "Menu enfant & chaises hautes",
        "Terrasse extérieure",
        "Parking gratuit",
        "Chiens bienvenus",
        "Accessible PMR",
      ],
    },
    visit: {
      kicker: "Nous trouver",
      title: "Trouvez votre table chez Tarsa.",
      address: "Adresse",
      phone: "Téléphone",
      hours: "Horaires",
      price: "Par personne",
      hoursValue: "Tous les jours · Ouvert jusqu'à minuit",
      cta_call: "Appeler pour réserver",
      cta_directions: "Itinéraire",
    },
    language: "Langue",
  },
  it: {
    nav: { about: "Chi siamo", menu: "Menu", reviews: "Recensioni", visit: "Vieni a trovarci" },
    reserve: "Prenota",
    hero: {
      reviews: "recensioni",
      title: "Il sapore dell'Adriatico, vicino al fuoco.",
      subtitle:
        "Konoba a conduzione familiare con generosa cucina mediterranea e croata nel cuore di Rijeka — da sempre, con calma e cura.",
      cta_menu: "Scopri il menu",
      cta_book: "Prenota un tavolo",
    },
    about: {
      kicker: "La nostra storia",
      title: "Accogliente, romantica, inconfondibilmente mediterranea.",
      p1: "Nascosta a Strmica, la Konoba Tarsa è il posto che i locali consigliano sottovoce. Muri in pietra, un camino scoppiettante e il dolce brusio delle conversazioni — accompagnati da piatti preparati a mano e una carta dei vini onesta.",
      p2: "Cuciniamo come i nostri nonni: con pazienza, porzioni generose e ingredienti scelti la mattina stessa. Che si tratti di un lungo pranzo o di una cena lenta a lume di candela, sei il benvenuto al nostro tavolo.",
      stats: { rating: "Valutazione media", reviews: "Recensioni felici", price: "A persona", hours: "Aperto fino a mezzanotte" },
    },
    menu: {
      kicker: "Dalla cucina",
      title: "I preferiti degli ospiti",
      sub: "Un piccolo assaggio della proposta. Il menu completo cambia con la stagione.",
      items: [
        { tag: "Popolare", name: "Grigliata Mista", desc: "Piatto misto alla griglia — pollo, salsicce e maiale grigliati, serviti con patate dorate fatte in casa." },
        { tag: "Sostanzioso", name: "Tarsa Burger", desc: "Succoso burger di manzo nel pane brioche con rucola fresca — accompagnato da un cestino di patate croccanti." },
      ],
    },
    inside: {
      kicker: "Dentro la Tarsa",
      title: "Una sala piena di storie.",
      sub: "Pietra, legno e cento piccoli dettagli — una sala da cui non vorrai più andartene.",
    },
    reviewsSec: {
      kicker: "Le loro parole",
      title: "Amata da 3.949 ospiti",
      quotes: [
        "Questo posto è semplicemente fantastico. Le porzioni sono ENORMI — abbiamo chiesto un piatto per due ed era abbastanza per quattro. Gustoso, generoso e servizio meraviglioso.",
        "Servizio e cibo ottimi! Saremmo tornati per un'altra cena — è proprio così buono. Altamente raccomandato durante una visita a Rijeka.",
        "Vale ogni stella della sua alta valutazione. Le porzioni sono notevolmente generose e, onestamente, ho mangiato la migliore bruschetta della mia vita.",
      ],
    },
    features: {
      title: "Tutto ciò che speri di trovare in una konoba",
      items: [
        "Cena accogliente vicino al camino",
        "Ottima carta dei vini e cocktail",
        "Opzioni vegane e vegetariane",
        "Menu bambini e seggioloni",
        "Posti all'aperto",
        "Parcheggio gratuito",
        "Cani benvenuti",
        "Accessibile in sedia a rotelle",
      ],
    },
    visit: {
      kicker: "Vieni a trovarci",
      title: "Trova il tuo tavolo da Tarsa.",
      address: "Indirizzo",
      phone: "Telefono",
      hours: "Orari",
      price: "A persona",
      hoursValue: "Tutti i giorni · Aperto fino a mezzanotte",
      cta_call: "Chiama per prenotare",
      cta_directions: "Indicazioni stradali",
    },
    language: "Lingua",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hr");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang") as Lang | null;
      if (stored && dictionaries[stored]) setLangState(stored);
    } catch {
      // ignore
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
