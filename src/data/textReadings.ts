export interface TextReading {
  emoji: string;
  hook: string; // kratak "teaser" ispod naslova
  paragraphs: string[]; // glavni tekst čitanja (koristi {name} placeholder)
  strength: string; // jedna rečenica - najveća snaga znaka
  watch: string; // jedna rečenica - na šta da pripazi
}

export const textReadings: Record<string, TextReading> = {
  ovan: {
    emoji: "🔥",
    hook: "Tvoja energija je motor koji drugi tek pokušavaju da uhvate.",
    paragraphs: [
      "{name}, tvoj Mesec u Ovnu znači da osećanja kod tebe ne dolaze polako — ona eksplodiraju. Kad nešto osetiš, osetiš to celim telom, i zato ti je teško da glumiš da ti nešto ne smeta.",
      "U poslednjih nekoliko meseci verovatno si primetio/la da brže reaguješ nego što razmišljaš — posebno kad se radi o nekome ko ti je bitan. To nije mana, to je signal da tvoja intuicija radi brže od tvoje logike.",
      "Ono što te najviše iscrpljuje nije rad ili obaveze — nego čekanje. Čekanje odgovora, čekanje da neko odluči, čekanje da se nešto pomeri. Tvoja duša je napravljena za akciju, ne za pauzu.",
    ],
    strength: "Hrabrost da prvi/a napraviš korak kad svi ostali oklevaju.",
    watch: "Impulsivne odluke doneti u afektu, koje kasnije moraš da ispravljaš.",
  },
  bik: {
    emoji: "🌿",
    hook: "Tvoj mir nije slabost — to je najjača stvar koju imaš.",
    paragraphs: [
      "{name}, Mesec u Biku ti daje potrebu za stabilnošću koju retko ko oko tebe zaista razume. Ne tražiš uzbuđenje — tražiš sigurnost, dodir, nešto opipljivo na šta možeš da se osloniš.",
      "Poslednjih meseci si verovatno osećao/la da ti je dosta obećanja koja se ne ispunjavaju. Tvoje strpljenje je ogromno, ali kada pukne — ne vraća se lako.",
      "Novac, dom, telo — sve što je fizičko, tebi je emotivno. Kada nešto od toga nije u redu, ni ti nisi u redu, čak i kad se trudiš da to sakriješ.",
    ],
    strength: "Postojanost — ljudi ti veruju jer ne menjaš stav na vetar.",
    watch: "Tvrdoglavost koja te drži u situacijama koje odavno treba da napustiš.",
  },
  blizanci: {
    emoji: "🌬️",
    hook: "Tvoj um nikad ne staje — pitanje je samo da li to znaš da iskoristiš.",
    paragraphs: [
      "{name}, sa Mesecom u Blizancima, osećanja kod tebe prolaze kroz misli pre nego što ih uopšte priznaš. Zato ti drugi ponekad kažu da 'previše analiziraš' — ali to je jednostavno tvoj način da se osećaš sigurno.",
      "Dosada ti je opasnija od bilo kog problema. Kad nešto (ili neko) prestane da te intelektualno drži, tvoja pažnja počinje tiho da beži, čak i pre nego što ti to postane svesno.",
      "Poslednje vreme si verovatno vodio/la unutrašnji dijalog o nečemu što nisi nikome do kraja ispričao/la — dve strane u tebi se svađaju oko iste odluke.",
    ],
    strength: "Sposobnost da vidiš situaciju iz više uglova istovremeno.",
    watch: "Beg u reči i logiku umesto suočavanja sa onim što zaista osećaš.",
  },
  rak: {
    emoji: "🌊",
    hook: "Osećaš više nego što iko zna — i to te i najviše plaši.",
    paragraphs: [
      "{name}, Mesec u Raku znači da je tvoj unutrašnji svet ocean — dubok, promenljiv, i ne uvek vidljiv spolja. Ljudi misle da te poznaju, a zapravo vide samo površinu.",
      "Sećanja ti se vraćaju u talasima. Nešto naizgled sitno — miris, pesma, rečenica — ume da te vrati godinama unazad, tamo gde si i dalje nešto nedovršio/la.",
      "Najviše brineš o ljudima kojima si najbliži/a, a najmanje se pitaš ko brine o tebi. To je obrazac koji se ponavlja otkad znaš za sebe.",
    ],
    strength: "Emotivna dubina koja ljudima daje osećaj da ih neko stvarno vidi.",
    watch: "Povlačenje u sebe umesto da kažeš šta te zapravo boli.",
  },
  lav: {
    emoji: "☀️",
    hook: "Rođen/a si da budeš primećen/a — problem je kad se pretvaraš da ti to nije bitno.",
    paragraphs: [
      "{name}, sa Mesecom u Lavu, tvoje srce treba potvrdu, priznanje, toplinu — i nema ničeg lošeg u tome, iako ti ponekad kažu da si 'previše'.",
      "Kad te neko ignoriše ili ne primeti trud koji ulažeš, to boli dublje nego što pokazuješ. Tvoj ponos je štit koji drugi retko probiju, ali ispod njega — osetljiv si više nego što priznaješ.",
      "U poslednje vreme si verovatno davao/la više nego što si dobijao/la nazad, i pitao/la se da li to iko zaista primećuje.",
    ],
    strength: "Prirodna toplina koja privlači ljude bez ikakvog truda.",
    watch: "Potreba za pažnjom koja te navodi da ostaneš tamo gde te ne cene dovoljno.",
  },
  devica: {
    emoji: "🌾",
    hook: "Brineš o svemu i svakome — a ko brine o tebi?",
    paragraphs: [
      "{name}, Mesec u Devici ti daje potrebu da sve bude 'kako treba' — organizovano, jasno, pod kontrolom. Kad nešto ispadne iz reda, ti to osetiš u telu pre nego u glavi.",
      "Tvoj unutrašnji kritičar je glasniji nego što iko oko tebe zna. Analiziraš svaku rečenicu koju si izgovorio/la, svaku odluku koju si doneo/la — dugo nakon što je razgovor završen.",
      "Ljubav za tebe znači posvećenost kroz male gestove — a najviše te boli kada tvoj trud ostane neprimećen dok se trudiš da budeš savršen/a za nekoga.",
    ],
    strength: "Pouzdanost — kad nešto obećaš, to se dešava, tačka.",
    watch: "Perfekcionizam koji ti ne dozvoljava da uživaš u onome što već imaš.",
  },
  vaga: {
    emoji: "⚖️",
    hook: "Tražiš sklad napolju jer ti je u glavi retko mirno.",
    paragraphs: [
      "{name}, sa Mesecom u Vagi, osećaš se najbolje kada je sve u ravnoteži — u vezama, u prostoru oko sebe, u razgovorima. Konflikt ti fizički smeta, čak i kad nije tvoj.",
      "Problem je što u želji da svima ugodiš, često zaboraviš da pitaš sebe šta ti zapravo želiš. Donošenje odluka ti oduzima više energije nego što iko zna.",
      "U vezama tražiš partnera, ne samo osobu pored sebe — nekoga ko misli s tobom, a ne samo pored tebe.",
    ],
    strength: "Sposobnost da vidiš obe strane i doneseš pravedno rešenje.",
    watch: "Izbegavanje sukoba čak i kad je razgovor jedino što situaciju može da spasi.",
  },
  skorpija: {
    emoji: "🦂",
    hook: "Ono što osećaš, osećaš do kraja — polovične stvari te ne zanimaju.",
    paragraphs: [
      "{name}, Mesec u Škorpiji ti ne dozvoljava površne emocije. Sve što osećaš — osećaš intenzivno, i zato retko dozvoljavaš ljudima da vide koliko duboko zapravo ideš.",
      "Poverenje za tebe nije poklon koji daješ lako. Kad neko to poverenje slomi, ne zaboravljaš — čak i kad kažeš da si preboleo/la.",
      "Poslednje vreme si verovatno osećao/la potrebu da nekoga ili nešto pustiš, ali deo tebe se drži jer znaš koliko si u to uložio/la.",
    ],
    strength: "Sposobnost da vidiš istinu iza maske koju drugi nose.",
    watch: "Kontrola i sumnjičavost koje udaljavaju upravo ljude kojima veruješ.",
  },
  strelac: {
    emoji: "🏹",
    hook: "Sloboda ti je potrebnija od bilo koje sigurnosti.",
    paragraphs: [
      "{name}, sa Mesecom u Strelcu, osećaš se najviše 'svoj/svoja' kada imaš prostor da dišeš — bilo fizički, bilo mentalno. Osećaj zarobljenosti te plaši više od bilo čega drugog.",
      "Optimizam ti je prirodan, ali ispod njega ponekad kriješ stvari koje te zapravo brinu, jer ne želiš da budeš teret nikome.",
      "U vezama i prijateljstvima tražiš nekoga ko te neće ograničavati — nekoga s kim možeš da rasteš, a ne nekoga ko te drži na mestu.",
    ],
    strength: "Sposobnost da u svakoj situaciji nađeš smisao i nastaviš dalje.",
    watch: "Beg od dubine kad stvari postanu previše ozbiljne ili emotivne.",
  },
  jarac: {
    emoji: "🏔️",
    hook: "Nosiš više nego što bilo ko zna — i retko tražiš pomoć.",
    paragraphs: [
      "{name}, Mesec u Jarcu znači da si emocije naučio/la da kontrolišeš rano — možda i prerano. Odgovornost ti je druga priroda, ali to ponekad znači da zaboraviš da i tebi treba neko da se osloni.",
      "Uspeh ti mnogo znači, ne zbog priznanja, već zato što ti daje osećaj sigurnosti koji si možda tražio/la ceo život.",
      "Ono što retko pokazuješ je koliko duboko zapravo osećaš — pod tom smirenom, ozbiljnom spoljašnjošću krije se neko ko samo želi da mu jednom neko kaže 'dosta si uradio/la, sad se odmori'.",
    ],
    strength: "Disciplina i izdržljivost koje te vode do ciljeva koje drugi napuste.",
    watch: "Emotivna distanca koja ljude oko tebe navodi da misle da im nisi potreban/na.",
  },
  vodolija: {
    emoji: "✨",
    hook: "Misliš drugačije od svih — i to je tvoja najveća snaga.",
    paragraphs: [
      "{name}, sa Mesecom u Vodoliji, tvoje emocije prolaze kroz filter logike pre nego što ih pokažeš. Ljudi te ponekad doživljavaju kao 'hladnog/hladnu', a u stvari samo osećaš na svoj, drugačiji način.",
      "Sloboda misli ti je sveta. Kada osetiš da te neko pokušava da ukalupi ili kontroliše, deo tebe se automatski povlači — čak i ako ta osoba to nije nameravala.",
      "U poslednje vreme si verovatno preispitivao/la nešto što svi drugi smatraju 'normalnim' — jer ti jednostavno ne prihvataš stvari samo zato što ih svi tako rade.",
    ],
    strength: "Originalnost — vidiš rešenja koja drugima ni ne padaju na pamet.",
    watch: "Emotivna distanca kojom (nesvesno) držiš ljude na sigurnoj udaljenosti.",
  },
  ribe: {
    emoji: "🌙",
    hook: "Osećaš svet dublje nego što bi iko poverovao.",
    paragraphs: [
      "{name}, Mesec u Ribama ti daje osetljivost koja je i dar i teret. Upijaš tuđe emocije kao sunđer, često ne razlikujući šta je tvoje, a šta si preuzeo/la od nekog drugog.",
      "Mašta ti je bekstvo kad stvarnost postane previše — i to nije slabost, to je način na koji se tvoja duša štiti.",
      "Poslednje vreme si verovatno davao/la nekome mnogo više razumevanja i praštanja nego što je ta osoba zaslužila, jer teško okrećeš leđa onima koje voliš.",
    ],
    strength: "Empatija koja ljudima daje osećaj da su konačno stvarno shvaćeni.",
    watch: "Gubljenje sebe u tuđim potrebama i emocijama.",
  },
};

export const zodiacLabels: Record<string, string> = {
  ovan: "Ovan",
  bik: "Bik",
  blizanci: "Blizanci",
  rak: "Rak",
  lav: "Lav",
  devica: "Devica",
  vaga: "Vaga",
  skorpija: "Škorpija",
  strelac: "Strelac",
  jarac: "Jarac",
  vodolija: "Vodolija",
  ribe: "Ribe",
};

const enToSr: Record<string, string> = {
  aries: "ovan",
  taurus: "bik",
  gemini: "blizanci",
  cancer: "rak",
  leo: "lav",
  virgo: "devica",
  libra: "vaga",
  scorpio: "skorpija",
  sagittarius: "strelac",
  capricorn: "jarac",
  aquarius: "vodolija",
  pisces: "ribe",
};

export function normalizeSignKey(v: string): string {
  const key = (v || "").toLowerCase().trim();
  return enToSr[key] || key || "bik";
}

export const gumroadBuyLinks: Record<string, string> = {
  bik: "https://astromesecevocitanje.gumroad.com/l/cxwwnf",
  blizanci: "https://astromesecevocitanje.gumroad.com/l/jqgfb",
  devica: "https://astromesecevocitanje.gumroad.com/l/xcrqpd",
  jarac: "https://astromesecevocitanje.gumroad.com/l/uipbwd",
  lav: "https://astromesecevocitanje.gumroad.com/l/psdngf",
  ovan: "https://astromesecevocitanje.gumroad.com/l/oeksh",
  rak: "https://astromesecevocitanje.gumroad.com/l/tqhez",
  ribe: "https://astromesecevocitanje.gumroad.com/l/rmkoa",
  skorpija: "https://astromesecevocitanje.gumroad.com/l/ldvgll",
  strelac: "https://astromesecevocitanje.gumroad.com/l/qhouc",
  vaga: "https://astromesecevocitanje.gumroad.com/l/pzklth",
  vodolija: "https://astromesecevocitanje.gumroad.com/l/mvanxf",
};
