export interface ZodiacSign {
  name: string;
  symbol: string;
  element: 'Vatra' | 'Zemlja' | 'Vazduh' | 'Voda';
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  rulingPlanet: string;
  quality: 'Kardinalni' | 'Fiksni' | 'Promenljivi';
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    name: 'Ovan',
    symbol: '♈',
    element: 'Vatra',
    startMonth: 3, startDay: 21,
    endMonth: 4, endDay: 19,
    rulingPlanet: 'Mars',
    quality: 'Kardinalni',
    traits: ['Pionirski', 'Energičan', 'Smel', 'Nezavisan', 'Takmičarski'],
    strengths: ['Hrabrost', 'Vođstvo', 'Strast', 'Optimizam', 'Inicijativa'],
    weaknesses: ['Nestrpljivost', 'Impulzivnost', 'Sebičnost', 'Kratko strpljenje'],
  },
  {
    name: 'Bik',
    symbol: '♉',
    element: 'Zemlja',
    startMonth: 4, startDay: 20,
    endMonth: 5, endDay: 20,
    rulingPlanet: 'Venera',
    quality: 'Fiksni',
    traits: ['Stabilan', 'Uporan', 'Lojalan', 'Senzualan', 'Praktičan'],
    strengths: ['Pouzdanost', 'Strpljenje', 'Odgovornost', 'Domaćinstvo', 'Posvećenost'],
    weaknesses: ['Tvrdoglavost', 'Materijalizam', 'Sporost', 'Otpor promenama'],
  },
  {
    name: 'Blizanci',
    symbol: '♊',
    element: 'Vazduh',
    startMonth: 5, startDay: 21,
    endMonth: 6, endDay: 20,
    rulingPlanet: 'Merkur',
    quality: 'Promenljivi',
    traits: ['Komunikativan', 'Radoznao', 'Prilagodljiv', 'Duhovit', 'Intelektualan'],
    strengths: ['Komunikacija', 'Inteligencija', 'Prilagodljivost', 'Duhovitost', 'Radoznalost'],
    weaknesses: ['Nepostojanost', 'Površnost', 'Nemir', 'Indecisivnost'],
  },
  {
    name: 'Rak',
    symbol: '♋',
    element: 'Voda',
    startMonth: 6, startDay: 21,
    endMonth: 7, endDay: 22,
    rulingPlanet: 'Mesec',
    quality: 'Kardinalni',
    traits: ['Emocionalan', 'Negovateljski', 'Intuitivan', 'Zaštitnički', 'Sentimentalan'],
    strengths: ['Empatija', 'Lojalnost', 'Briga', 'Intuicija', 'Kreativnost'],
    weaknesses: ['Preosetljivost', 'Retrogradnost', 'Pasivno-agresivnost', 'Zavisnost'],
  },
  {
    name: 'Lav',
    symbol: '♌',
    element: 'Vatra',
    startMonth: 7, startDay: 23,
    endMonth: 8, endDay: 22,
    rulingPlanet: 'Sunce',
    quality: 'Fiksni',
    traits: ['Karizmatičan', 'Samopouzdan', 'Velikodušan', 'Kreativan', 'Dramatičan'],
    strengths: ['Vođstvo', 'Samopouzdanje', 'Velikodušnost', 'Kreativnost', 'Toplina'],
    weaknesses: ['Taština', 'Dominantnost', 'Ponos', 'Skupocenost'],
  },
  {
    name: 'Devica',
    symbol: '♍',
    element: 'Zemlja',
    startMonth: 8, startDay: 23,
    endMonth: 9, endDay: 22,
    rulingPlanet: 'Merkur',
    quality: 'Promenljivi',
    traits: ['Analitičan', 'Praktičan', 'Pedantan', 'Savesan', 'Skroman'],
    strengths: ['Preciznost', 'Organizacija', 'Pouzdanost', 'Inteligencija', 'Praktičnost'],
    weaknesses: ['Perfekcionizam', 'Kritičnost', 'Briga', 'Rezervisanost'],
  },
  {
    name: 'Vaga',
    symbol: '♎',
    element: 'Vazduh',
    startMonth: 9, startDay: 23,
    endMonth: 10, endDay: 22,
    rulingPlanet: 'Venera',
    quality: 'Kardinalni',
    traits: ['Diplomatski', 'Balansiran', 'Socijalan', 'Estetski', 'Mirotvorni'],
    strengths: ['Diplomatija', 'Pravednost', 'Šarm', 'Saradnja', 'Estetika'],
    weaknesses: ['Indecisivnost', 'Izbegavanje konflikata', 'Površnost', 'Zavisnost od drugih'],
  },
  {
    name: 'Škorpija',
    symbol: '♏',
    element: 'Voda',
    startMonth: 10, startDay: 23,
    endMonth: 11, endDay: 21,
    rulingPlanet: 'Pluton',
    quality: 'Fiksni',
    traits: ['Strastven', 'Intenzivan', 'Mističan', 'Odlučan', 'Tajanstven'],
    strengths: ['Intenzitet', 'Lojalnost', 'Intuicija', 'Hrabrost', 'Transformacija'],
    weaknesses: ['Ljubomora', 'Posesivnost', 'Osvetoljubivost', 'Sumnjičavost'],
  },
  {
    name: 'Strelac',
    symbol: '♐',
    element: 'Vatra',
    startMonth: 11, startDay: 22,
    endMonth: 12, endDay: 21,
    rulingPlanet: 'Jupiter',
    quality: 'Promenljivi',
    traits: ['Optimističan', 'Slobodoljubiv', 'Filozofski', 'Avanturistički', 'Iskren'],
    strengths: ['Optimizam', 'Sloboda', 'Filozofija', 'Avantura', 'Iskrenost'],
    weaknesses: ['Nepromišljenost', 'Nestrpljivost', 'Bezobzirnost', 'Nedoslednost'],
  },
  {
    name: 'Jarac',
    symbol: '♑',
    element: 'Zemlja',
    startMonth: 12, startDay: 22,
    endMonth: 1, endDay: 19,
    rulingPlanet: 'Saturn',
    quality: 'Kardinalni',
    traits: ['Ambiciozan', 'Disciplinovan', 'Odgovoran', 'Strpljiv', 'Praktičan'],
    strengths: ['Disciplina', 'Ambicija', 'Odgovornost', 'Strpljenje', 'Upornost'],
    weaknesses: ['Pesimizam', 'Tvrdoglavost', 'Hladnoća', 'Materijalizam'],
  },
  {
    name: 'Vodolija',
    symbol: '♒',
    element: 'Vazduh',
    startMonth: 1, startDay: 20,
    endMonth: 2, endDay: 18,
    rulingPlanet: 'Uran',
    quality: 'Fiksni',
    traits: ['Nezavisan', 'Inovativan', 'Humanitaran', 'Originalan', 'Buntovan'],
    strengths: ['Originalnost', 'Nezavisnost', 'Humanost', 'Inovativnost', 'Objektivnost'],
    weaknesses: ['Odstupanje', 'Nepredvidivost', 'Emocionalna distanca', 'Tvrdoglavost'],
  },
  {
    name: 'Ribe',
    symbol: '♓',
    element: 'Voda',
    startMonth: 2, startDay: 19,
    endMonth: 3, endDay: 20,
    rulingPlanet: 'Neptun',
    quality: 'Promenljivi',
    traits: ['Saosećajan', 'Mističan', 'Kreativan', 'Intuitivan', 'Sanjiv'],
    strengths: ['Empatija', 'Kreativnost', 'Intuicija', 'Saosećajnost', 'Mističnost'],
    weaknesses: ['Preosetljivost', 'Eskapizam', 'Neodlučnost', 'Žrtvovanje'],
  },
];

export function getZodiacSign(day: number, month: number): ZodiacSign {
  for (const sign of ZODIAC_SIGNS) {
    if (
      (sign.startMonth === month && day >= sign.startDay) ||
      (sign.endMonth === month && day <= sign.endDay)
    ) {
      return sign;
    }
  }
  return ZODIAC_SIGNS[0];
}

const ELEMENT_COMPATIBILITY: Record<string, Record<string, number>> = {
  'Vatra': { 'Vatra': 85, 'Zemlja': 45, 'Vazduh': 80, 'Voda': 40 },
  'Zemlja': { 'Vatra': 45, 'Zemlja': 80, 'Vazduh': 50, 'Voda': 85 },
  'Vazduh': { 'Vatra': 80, 'Zemlja': 50, 'Vazduh': 75, 'Voda': 55 },
  'Voda': { 'Vatra': 40, 'Zemlja': 85, 'Vazduh': 55, 'Voda': 90 },
};

const QUALITY_COMPATIBILITY: Record<string, Record<string, number>> = {
  'Kardinalni': { 'Kardinalni': 60, 'Fiksni': 75, 'Promenljivi': 70 },
  'Fiksni': { 'Kardinalni': 75, 'Fiksni': 65, 'Promenljivi': 72 },
  'Promenljivi': { 'Kardinalni': 70, 'Fiksni': 72, 'Promenljivi': 68 },
};

function clampScore(n: number): number {
  return Math.max(30, Math.min(98, Math.round(n)));
}

export interface CompatibilityResult {
  title: string;
  icon: string;
  score: number;
  description: string;
  details: string[];
}

export function calculateCompatibility(
  sign1: ZodiacSign,
  sign2: ZodiacSign
): { total: number; results: CompatibilityResult[] } {
  const elementScore = ELEMENT_COMPATIBILITY[sign1.element][sign2.element];
  const qualityScore = QUALITY_COMPATIBILITY[sign1.quality][sign2.quality];

  const sharedTraits = sign1.traits.filter((t) =>
    sign2.traits.some((t2) => t.toLowerCase()[0] === t2.toLowerCase()[0])
  );

  const results: CompatibilityResult[] = [
    {
      title: 'Ljubavna Kompatibilnost',
      icon: 'heart',
      score: clampScore(elementScore + (sign1.element === sign2.element ? 8 : 0)),
      description:
        sign1.element === sign2.element
          ? `I ${sign1.name} i ${sign2.name} pripadaju elementu ${sign1.element}. Ovo stvara duboko razumevanje i prirodnu privlačnost.`
          : `Različiti elementi (${sign1.element} i ${sign2.element}) stvaraju magnetnu privlačnost, ali zahtevaju kompromis.`,
      details: [
        `${sign1.name} je vođen planetom ${sign1.rulingPlanet}, dok ${sign2.name} sledi ${sign2.rulingPlanet}.`,
        sign1.element === sign2.element
          ? 'Ista elementarna priroda donosi lakoću u emotivnoj komunikaciji.'
          : 'Razlika u elementima može stvoriti strast, ali i izazove u razumevanju.',
      ],
    },
    {
      title: 'Emocionalna Povezanost',
      icon: 'sparkles',
      score: clampScore(
        (sign1.element === 'Voda' || sign2.element === 'Voda' ? 85 : 65) +
          (sign1.element === sign2.element ? 5 : 0)
      ),
      description:
        sign1.element === 'Voda' || sign2.element === 'Voda'
          ? 'Duboka emocionalna rezonanca postoji između vas. Vodeni znakovi donose osetljivost i intuiciju.'
          : 'Emocionalna dinamika zahteva svestan napor da se razumeju međusobni osećaji.',
      details: [
        `${sign1.name} ${sign1.element === 'Voda' ? 'prirodno' : 'sa naporom'} izražava emocije.`,
        `${sign2.name} ${sign2.element === 'Voda' ? 'intuitivno' : 'logično'} prima emocionalne signale.`,
      ],
    },
    {
      title: 'Komunikacija',
      icon: 'message-circle',
      score: clampScore(
        (sign1.element === 'Vazduh' || sign2.element === 'Vazduh' ? 88 : 60) +
          qualityScore * 0.1
      ),
      description:
        sign1.element === 'Vazduh' || sign2.element === 'Vazduh'
          ? 'Vazdušasti znakovi donose lakoću u razgovoru. Ideje teku prirodno i bez napetosti.'
          : 'Komunikacija zahteva strpljenje — različiti pristupi izražavanja mogu stvoriti nesporazume.',
      details: [
        `${sign1.name} je ${sign1.quality.toLowerCase()} znak — ${sign1.quality === 'Promenljivi' ? 'prilagodljiv u razgovoru' : sign1.quality === 'Fiksni' ? 'čvrst u stavovima' : 'inicijativan u komunikaciji'}.`,
        `${sign2.name} je ${sign2.quality.toLowerCase()} znak — ${sign2.quality === 'Promenljivi' ? 'fleksibilan u dijalogu' : sign2.quality === 'Fiksni' ? 'dosledan u rečima' : 'otvoren za nove ideje'}.`,
      ],
    },
    {
      title: 'Strast i Intimnost',
      icon: 'flame',
      score: clampScore(
        (sign1.element === 'Vatra' || sign2.element === 'Vatra' ? 90 : 65) +
          (sign1.element === 'Voda' || sign2.element === 'Voda' ? 5 : 0)
      ),
      description:
        sign1.element === 'Vatra' || sign2.element === 'Vatra'
          ? 'Vatreni element donosi goruću strast i intenzitet u odnos. Energija je visoka i magnetna.'
          : 'Strast se gradi polako kroz poverenje i emocionalnu dubinu, a ne kroz impuls.',
      details: [
        `${sign1.rulingPlanet} utiče na ${sign1.name}ovu strastvenu prirodu.`,
        `${sign2.rulingPlanet} oblikuje ${sign2.name}ov intimni izraz.`,
      ],
    },
    {
      title: 'Poverenje i Lojalnost',
      icon: 'shield',
      score: clampScore(
        (sign1.element === 'Zemlja' || sign2.element === 'Zemlja' ? 88 : 62) +
          (sign1.quality === 'Fiksni' && sign2.quality === 'Fiksni' ? 8 : 0)
      ),
      description:
        sign1.element === 'Zemlja' || sign2.element === 'Zemlja'
          ? 'Zemljani znakovi grade poverenje kroz doslednost i odgovornost. Lojalnost je prirodna.'
          : 'Poverenje se mora zaslužiti kroz vreme i dokaze odanosti.',
      details: [
        `${sign1.name} ${sign1.quality === 'Fiksni' ? 'je duboko posvećen' : 'može biti promenljiv'} u odanosti.`,
        `${sign2.name} ${sign2.quality === 'Fiksni' ? 'ceni stabilnost' : 'traži slobodu'} u vezi.`,
      ],
    },
    {
      title: 'Intelektualna Kompatibilnost',
      icon: 'brain',
      score: clampScore(
        (sign1.element === 'Vazduh' && sign2.element === 'Vazduh' ? 92 : 70) +
          sharedTraits.length * 2
      ),
      description:
        sign1.element === 'Vazduh' && sign2.element === 'Vazduh'
          ? 'Dva vazdušasta znaka stvaraju intelektualnu simfoniju. Razgovori su duboki i beskrajni.'
          : 'Intelektualna kompatibilnost zavisi od uzajamnog poštovanja različitih pogleda na svet.',
      details: [
        `${sign1.name} ${sign1.traits.includes('Intelektualan') || sign1.traits.includes('Analitičan') ? 'prirodno' : 'sa naporom'} ceni intelektualne razgovore.`,
        `Zajedničke osobine: ${sharedTraits.length > 0 ? sharedTraits.join(', ') : 'komplementarne prirode'}.`,
      ],
    },
    {
      title: 'Dugoročni Potencijal',
      icon: 'infinity',
      score: clampScore(
        qualityScore * 0.5 + elementScore * 0.3 +
          (sign1.quality === 'Fiksni' || sign2.quality === 'Fiksni' ? 15 : 5)
      ),
      description:
        sign1.quality === 'Fiksni' || sign2.quality === 'Fiksni'
          ? 'Fiksni znakovi donose stabilnost potrebnu za dugoročnu izgradnju odnosa.'
          : 'Dugoročni potencijal zavisi od obostrane posvećenosti rastu i prilagođavanju.',
      details: [
        `${sign1.name} (${sign1.quality}) i ${sign2.name} (${sign2.quality}) — ${sign1.quality === sign2.quality ? 'ista dinamika' : 'komplementarne uloge'}.`,
        `Kombinacija ${sign1.element}/${sign2.element} daje ${elementScore > 75 ? 'odličnu' : elementScore > 55 ? 'umerenu' : 'izazovnu'} osnovu za budućnost.`,
      ],
    },
    {
      title: 'Seksualna Hemija',
      icon: 'zap',
      score: clampScore(
        (sign1.element === 'Vatra' && sign2.element === 'Voda' ? 88 : 0) +
          (sign1.element === 'Zemlja' && sign2.element === 'Voda' ? 85 : 0) +
          (sign1.element === sign2.element ? 80 : 0) +
          (sign1.rulingPlanet === 'Venera' || sign2.rulingPlanet === 'Venera' ? 8 : 0)
      ),
      description:
        sign1.rulingPlanet === 'Venera' || sign2.rulingPlanet === 'Venera'
          ? 'Uticaj Venere pojačava senzualnost i estetsko uživanje u intimnosti.'
          : 'Seksualna hemija se gradi kroz emocionalnu povezanost i uzajamno istraživanje.',
      details: [
        `${sign1.name} pristupa intimnosti kroz ${sign1.element.toLowerCase()} energiju.`,
        `${sign2.name} izražava senzualnost ${sign2.element === 'Zemlja' ? 'fizički' : sign2.element === 'Vatra' ? 'strastveno' : sign2.element === 'Voda' ? 'emotivno' : 'mentalno'}.`,
      ],
    },
    {
      title: 'Razumevanje i Empatija',
      icon: 'heart-handshake',
      score: clampScore(
        (sign1.element === 'Voda' && sign2.element === 'Voda' ? 95 : 0) +
          (sign1.element === 'Voda' || sign2.element === 'Voda' ? 78 : 60) +
          (sign1.element === 'Zemlja' && sign2.element === 'Zemlja' ? 82 : 0)
      ),
      description:
        sign1.element === 'Voda' && sign2.element === 'Voda'
          ? 'Dva vodena znaka stvaraju telepatsku emocionalnu povezanost. Empatija je duboka i prirodna.'
          : 'Razumevanje zahteva aktivno slušanje i poštovanje različitih emocionalnih potreba.',
      details: [
        `${sign1.name} ${sign1.element === 'Voda' ? 'intuitivno' : 'logično'} razume tuđe emocije.`,
        `${sign2.name} ${sign2.element === 'Voda' ? 'prirodno' : 'svesno'} razvija empatiju.`,
      ],
    },
    {
      title: 'Zajednički Ciljevi i Vrednosti',
      icon: 'target',
      score: clampScore(
        (sign1.element === 'Zemlja' && sign2.element === 'Zemlja' ? 90 : 0) +
          (sign1.element === 'Zemlja' || sign2.element === 'Zemlja' ? 78 : 65) +
          (sign1.quality === 'Kardinalni' && sign2.quality === 'Kardinalni' ? 5 : 0)
      ),
      description:
        sign1.element === 'Zemlja' && sign2.element === 'Zemlja'
          ? 'Zemljani znakovi dele praktične vrednosti — stabilnost, sigurnost i izgradnju budućnosti.'
          : 'Zajednički ciljevi zahtevaju otvoreni dijalog o životnim prioritetima i snovima.',
      details: [
        `${sign1.name} ${sign1.element === 'Zemlja' ? 'ceni materijalnu sigurnost' : 'traži slobodu i rast'}.`,
        `${sign2.name} ${sign2.element === 'Zemlja' ? 'gradi temeljnu stabilnost' : 'sledi viziju i inspiraciju'}.`,
      ],
    },
    {
      title: 'Konflikt i Rezolucija',
      icon: 'swords',
      score: clampScore(
        100 -
          (sign1.element === 'Vatra' && sign2.element === 'Voda' ? 25 : 0) -
          (sign1.element === 'Zemlja' && sign2.element === 'Vazduh' ? 20 : 0) +
          (sign1.quality === 'Kardinalni' || sign2.quality === 'Kardinalni' ? 10 : 0)
      ),
      description:
        sign1.element === 'Vatra' && sign2.element === 'Voda'
          ? 'Vatra i voda mogu stvarati intenzivne konflikte, ali i duboke transformacije kroz njih.'
          : 'Konflikti su prirodni — ključ je u brzoj rezoluciji i uzajamnom poštovanju.',
      details: [
        `${sign1.name} ${sign1.element === 'Vatra' ? 'eksplozivno' : sign1.element === 'Zemlja' ? 'tiho ali uporno' : sign1.element === 'Vazduh' ? 'verbalno' : 'pasivno'} izražava bes.`,
        `${sign2.name} ${sign2.quality === 'Promenljivi' ? 'brzo prašta' : sign2.quality === 'Fiksni' ? 'dugo pamti' : 'traži rešenje'} u konfliktima.`,
      ],
    },
    {
      title: 'Duhovna Povezanost',
      icon: 'moon',
      score: clampScore(
        (sign1.element === 'Voda' && sign2.element === 'Voda' ? 92 : 0) +
          (sign1.element === 'Voda' || sign2.element === 'Voda' ? 80 : 65) +
          (sign1.rulingPlanet === 'Neptun' || sign2.rulingPlanet === 'Neptun' ? 8 : 0) +
          (sign1.rulingPlanet === 'Mesec' || sign2.rulingPlanet === 'Mesec' ? 8 : 0)
      ),
      description:
        sign1.rulingPlanet === 'Neptun' || sign2.rulingPlanet === 'Neptun'
          ? 'Uticaj Neptuna donosi mističnu, duhovnu dimenziju odnosu — osećaj sudbinske povezanosti.'
          : 'Duhovna povezanost se razvija kroz zajedničke trenutke tišine, meditacije i unutarnjeg rasta.',
      details: [
        `${sign1.name} ${sign1.rulingPlanet === 'Neptun' || sign1.rulingPlanet === 'Mesec' ? 'prirodno' : 'svesno'} traži duhovnu dubinu.`,
        `${sign2.name} ${sign2.rulingPlanet === 'Neptun' || sign2.rulingPlanet === 'Mesec' ? 'intuitivno' : 'kroz praksu'} razvija duhovnu svest.`,
      ],
    },
  ];

  const total = clampScore(
    results.reduce((sum, r) => sum + r.score, 0) / results.length
  );

  return { total, results };
}

export interface AstroProfile {
  sign1: ZodiacSign;
  sign2: ZodiacSign;
  totalScore: number;
  summary: string;
  strengths: string[];
  challenges: string[];
  advice: string[];
  destiny: string;
}

export function generateAstroProfile(
  sign1: ZodiacSign,
  sign2: ZodiacSign,
  totalScore: number,
  name1: string,
  name2: string
): AstroProfile {
  const elementMatch = sign1.element === sign2.element;
  const qualityMatch = sign1.quality === sign2.quality;

  const strengths: string[] = [
    elementMatch
      ? `Oboje delite ${sign1.element} element — prirodno razumevanje bez mnogo reči.`
      : `Komplementarni elementi (${sign1.element} + ${sign2.element}) — učite jedno od drugog.`,
    `${sign1.name} i ${sign2.name} ${qualityMatch ? 'dele istu dinamiku' : 'imaju različite ali komplementarne uloge'} u odnosu.`,
  ];

  const challenges: string[] = [
    sign1.element === 'Vatra' && sign2.element === 'Voda'
      ? 'Vatrena strast može ugasiti vodenu osetljivost — potrebno je strpljenje.'
      : `${sign1.weaknesses[0]} (${sign1.name}) može iritirati ${sign2.weaknesses[0].toLowerCase()} (${sign2.name}).`,
    `Različiti ritmovi života zahtevaju svestan kompromis i komunikaciju.`,
  ];

  const advice: string[] = [
    `${name1}, tvoja ${sign1.strengths[0].toLowerCase()} je ključ za ${name2}ovo srce.`,
    `${name2}, tvoja ${sign2.strengths[0].toLowerCase()} balansira ${name1}ovu prirodu.`,
    'Negujte zajedničke trenutke tišine i dubokog razgovora.',
  ];

  const destiny =
    totalScore >= 85
      ? `Ovo je retka i duboka veza. ${name1} i ${name2} imaju sudbinski potencijal — zvezde su naklonjene vašoj ljubavi.`
      : totalScore >= 70
      ? `Vaša veza ima snažan potencijal za rast i sreću. ${name1} i ${name2} mogu izgraditi trajnu i smislenu zajednicu.`
      : totalScore >= 55
      ? `Odnos zahteva rad i kompromis, ali ${name1} i ${name2} mogu prevazići razlike kroz svestan napor.`
      : `Izazovi su veliki, ali ${name1} i ${name2} mogu učiti jedno od drugog i rasti kroz ovu vezu.`;

  return {
    sign1,
    sign2,
    totalScore,
    summary: `${name1} (${sign1.name}) i ${name2} (${sign2.name}) — ukupna kompatibilnost ${totalScore}%. ${
      totalScore >= 75 ? 'Izuzetna kombinacija!' : totalScore >= 60 ? 'Obećavajuća veza.' : 'Zahteva rad.'
    }`,
    strengths,
    challenges,
    advice,
    destiny,
  };
}
