export interface ZodiacSign {
  name: string;
  element: string;
  planet: string;
  symbol: string;
  start: [number, number]; // [month, day]
  end: [number, number];
  payhip: string;
  energy: string;
  love: string;
  money: string;
}

const SIGNS: ZodiacSign[] = [
  {
    name: "Ovan",
    element: "Vatra",
    planet: "Mars",
    symbol: "♈",
    start: [3, 21],
    end: [4, 19],
    payhip: "https://payhip.com/b/fc4dL",
    energy:
      "{name}, osećaš da ti se energija skuplja u grudima — kao da te nešto pritišće, a ne znaš tačno šta. Mars, tvoj vladar, trenutno gura tvoju vatru na visokoj temperaturi, pa ti je teško da mirno sediš. Imaš utisak da gubiš kontrolu nad tempom svog života, kao da te vreme vuče brže nego što stigneš da doneseš odluke. Okolina te vidi kao sigurnog, ali ti znaš da ispod te vatrene ljušture tajiš tišinu koju nikome ne pokazuješ.",
    love:
      "U vezi, {name}, postoji jedna stvar koju već mesecima izgovaraš u sebi, a nikada je ne izgovaraš naglas. Mars te tera da deluješ direktno, ali kad je reč o srcu — oklevaš. Bojiš se da ćeš, ako pokažeš koliko ti je stalo, izgubiti onaj deo sebe koji uvek mora da bude jak. Neko blizu tebe čeka da mu dopustiš da bude slabiji — a ti to ne znaš kako da uradiš bez osećaja da gubiš kontrolu.",
    money:
      "Novac ti curi na brze, impulsivne poteze — kupuješ rešavanje problema umesto da ga rešiš, {name}. Vatra znaka troši energiju brže nego što je stvaraš, pa ti se često čini da radiš više nego što imaš da pokažeš za to. Postoji jedan trošak koji već duže opravdavaš sebi kao 'neophodan', a duboko znaš da je to mesto gde ti energija najviše curi. Ovaj ciklus ti donosi priliku da presečeš taj kanal — ali samo ako prestaneš da se pretvaraš da ga ne vidiš.",
  },
  {
    name: "Bik",
    element: "Zemlja",
    planet: "Venera",
    symbol: "♉",
    start: [4, 20],
    end: [5, 20],
    payhip: "https://payhip.com/b/SyfsI",
    energy:
      "{name}, tvoja Mesečeva energija se trenutno nalazi u polju mirnoće koje te istovremeno smiruje i nemiri. Venera, tvoj vladar, vuče te ka stabilnosti, ali osećaš da te nešto lagano vuče da izađeš iz zone koju si pažljivo izgradio. Imaš utisak da držiš sve pod kontrolom — a ipak, u jednom delu dana, uhvatiš sebe kako gledaš u prazno i pitaš se: 'Je l' ovo baš ono što sam želeo?' To pitanje ne dolazi slučajno.",
    love:
      "U vezi, {name}, ti si onaj koji gradi i čuva — ali postoji osećaj koji tajiš da daješ više nego što primaš. Venera te uči da voliš kroz postojanost, pa ti je teško da priznaš kad ti nedostaje nežnost koju ne tražiš naglas. Neko ti je blizu i čeka da mu kažeš šta ti zapravo treba — ali ti se plašiš da ćeš, ako zatražiš, zvučiti kao da se žališ. Ta tišina između vas dvoje nije mir. To je nerečeno.",
    money:
      "Novac ti je važan na način koji drugi ne razumeju, {name} — nije pohlepa, to je tvoja sigurnost. Ali postoji jedan izvor prihoda koji ti već duže drži iluziju stabilnosti, a zapravo te drži u mestu. Zemlja tvog znaka voli da se drži poznatog, pa ti je teško da otpustiš nešto što 'radi', makar slabo. Energija ti curi kroz taj prozor koji ne želiš da zatvoriš jer ti deluje bezbedno — a zapravo te koči.",
  },
  {
    name: "Blizanci",
    element: "Vazduh",
    planet: "Merkur",
    symbol: "♊",
    start: [5, 21],
    end: [6, 20],
    payhip: "https://payhip.com/b/L9RJT",
    energy:
      "{name}, tvoja Mesečeva energija je trenutno rasejana na sto strana — glava ti radi brže nego što stigneš da misliš. Merkur, tvoj vladar, hrani te informacijama, pa ti se čini da sve znaš, a opet ne uspevaš da uhvatiš onaj jedan osećaj koji ti se mota po ivici svesti. Imaš utisak da si stalno u pokretu, ali da nigde ne stižeš. To nije umor — to je tvoj um koji traži jednu stvar da se fokusira na nju, a ti to bežiš.",
    love:
      "U vezi, {name}, ti si majstor reči — ali reči koje najviše izbegavaš su one koje ti treba da izgovoriš. Merkur ti daje dar da sve objasniš, pa zato lako objasniš i zašto ti je 'sve u redu', čak i kad nije. Postoji jedna stvar koju bi htela/hteo da partner tiše razume bez da moraš da objašnjavaš — a ti nikada nisi dao/dala dovoljno prostora da se to desi. Bojiš se da će ti, ako ćutiš, nedostajati reči koje te štite od ranjivosti.",
    money:
      "Novac ti dolazi kroz ideje, {name}, ali i curi kroz njih — započneš pet stvari, završiš dve, i pitaš se gde ode energija. Vazduh tvog znaka voli nove prilike, pa ti je teško da se držiš jedne dok ne rodi. Postoji jedan projekat ili izvor koji si već 'skoro' završio/la — a on ti drži više potencijala nego sve nove ideje zajedno. Tvoja samosumnja ti šapuće da nije dovoljno dobro, pa ga ostavljaš u fazi 'skoro'. Tu ti energija curi najviše.",
  },
  {
    name: "Rak",
    element: "Voda",
    planet: "Mesec",
    symbol: "♋",
    start: [6, 21],
    end: [7, 22],
    payhip: "https://payhip.com/b/jZslA",
    energy:
      "{name}, tvoja Mesečeva energija je trenutno dublja nego što pokazuješ — Mesec je tvoj vladar, pa osećaš svaku promenu pre nego što se desi. Imaš utisak da nosiš tuđa osećanja kao svoja, pa ti se često čini da si umoran/umorna bez razloga. Postoji jedan osećaj koji si potisnuo/potisnula jer si mislio/la da je 'trenutan' — a on već mesecima živi ispod površine. Nije prošao. Samo si ga naučio/naučila da bude tih.",
    love:
      "U vezi, {name}, ti daješ iz dubine — ali postoji strah koji tajiš: da ćeš, ako pokažeš koliko ti stvarno stalo, postati previše za drugu osobu. Voda tvog znaka se plaši da će se razliti i da je niko neće pokupiti. Zato se povlačiš u ljušturu kad god ti se učini da te neko nije dovoljno video. Ali ta tvoja tišina nije zaštita — to je poziv koji niko ne čuje jer ga izgovaraš bez reči. Neko bi želeo da uđe, ali čeka dozvolu koju ti ne daješ.",
    money:
      "Novac te nervira kad je nestalan, {name} — voda tvog znaka traži emocionalnu sigurnost, a novac je deo te priče. Ali postoji jedan izvor prihoda koji držiš iz obaveze, ne iz radosti, jer ti daje osećaj 'barem ovo imam'. Energija ti curi kroz taj kompromis koji ti prodaješ kao odgovornost. Dokle god se držiš njega, nemaš prostora za ono što bi te zapravo napunilo. Ovaj ciklus ti nudi da preispitaš šta 'sigurnost' za tebe zaista znači.",
  },
  {
    name: "Lav",
    element: "Vatra",
    planet: "Sunce",
    symbol: "♌",
    start: [7, 23],
    end: [8, 22],
    payhip: "https://payhip.com/b/c8yDV",
    energy:
      "{name}, tvoja Mesečeva energija trenutno traži pozornicu — ali ti osećaš da negde iznutra nešto fali. Sunce, tvoj vladar, te uči da sijaš, pa ti je teško da priznaš kad ti je tama. Imaš utisak da svi misle da si nepobediv, a ti znaš da imaš jedan trenutak dnevno kad upitaš sebe: 'Da li me zaista vide, ili vide samo ono što pokazujem?' To pitanje je važnije nego što misliš.",
    love:
      "U vezi, {name}, ti si onaj koji daje sjaj — ali postoji deo tebe koji se plaši da, ako prestaneš da budeš veličanstven, prestaneš da budeš voljen. Vatra tvog znaka pali sobu, ali ti se plašiš šta bi bilo da uđeš u nju bez te vatre. Zato retko pokazuješ onaj tihi deo koji ne nastupa. Neko blizu tebe čeka da te vedi bez krune — ali ti misliš da bi to značilo da si slab/a. To je tvoj najveći strah, i niko ga ne zna.",
    money:
      "Novac ti je način da dokažeš vrednost, {name} — ali to te čini ranjivim/om na jedan trošak koji ne priznaješ: kupuješ status da ne bi osetio/la da gubiš teren. Vatra znaka troši brzo, pa ti se čini da moraš stalno da dodaješ, makar prazno. Postoji jedan trošak koji opravdavaš kao 'ulog u sebe', a duboko znaš da je ulog u sliku sebe. Energija ti curi kroz njega, a ovaj ciklus ti daje šansu da uložiš u pravu stvar — sebe, ne svoju predstavu.",
  },
  {
    name: "Devica",
    element: "Zemlja",
    planet: "Merkur",
    symbol: "♍",
    start: [8, 23],
    end: [9, 22],
    payhip: "https://payhip.com/b/8LRwe",
    energy:
      "{name}, tvoja Mesečeva energija je trenutno napeta od detalja — sve mora da bude na svom mestu, a ti osećaš da jedno mesto nikad nije dovoljno dobro. Merkur, tvoj vladar, analizira sve, pa ti je glava puna 'šta ako'. Imaš utisak da kontrolom stišavaš nemir, ali kontrola te zapravo izjeda. Postoji jedna stvar koju si 'skoro' doterao/la — a već tri puta. To nije savršenstvo. To je strah od toga da pustiš.",
    love:
      "U vezi, {name}, ti voliš kroz servis — ali se plašiš da, ako prestaneš da 'pomažeš', prestaneš da si potreban/na. Zemlja tvog znaka meri vrednost kroz korisnost, pa ti je teško da pokažeš onaj deo koji nije 'od koristi'. Postoji jedna stvar koju bi želeo/la da partner uradi bez da tražiš — a ti nikada ne tražiš jer misliš da bi to značilo da nisi dovoljno jak/a. Neko bi hteo da te rastereti, ali ti mu ne daješ prostor jer misliš da moraš sve sam/a.",
    money:
      "Novac ti je polje gde se najviše vidi tvoj unutrašnji kritičar, {name} — uvek misliš da može više, da nije dovoljno, da si morao/la ranije. Zemlja znaka voli red, pa ti je teško da prihvatiš da neki prihodi ne moraju da budu 'zarađeni' kroz patnju. Postoji jedan izvor koji držiš jer 'radi', a zapravo te drži u manjem kapacitetu nego što zaslužuješ. Energija ti curi kroz samosumnju koja ti kaže da ne smeš da tražiš više. Ovaj ciklus ti kaže: smeš.",
  },
  {
    name: "Vaga",
    element: "Vazduh",
    planet: "Venera",
    symbol: "♎",
    start: [9, 23],
    end: [10, 22],
    payhip: "https://payhip.com/b/l0bYz",
    energy:
      "{name}, tvoja Mesečeva energija je trenutno u polju ravnoteže koju održavaš cenujući sebe. Venera, tvoj vladar, te uči da uvek staviš drugog prvog — pa ti je teško da osetiš gde ti počinješ, a gde drugi. Imaš utisak da si 'u redu', ali zapravo si na ivici da izgubiš sebe u tuđim potrebama. To nije mir. To je tišina koju plaćaš svojom energijom.",
    love:
      "U vezi, {name}, ti si majstor kompromisa — ali postoji jedna stvar koju si već odavno progutao/la da bi sačuvao/la mir. Vazduh tvog znaka teži harmoniji, pa ti je teško da kažeš 'ne' bez osećaja da rušiš nešto lepo. Ali to 'da' koje daješ iz navika te polako prazni. Neko bi želeo da čuje tvoje pravo mišljenje — a ti misliš da bi ga, ako ga izgovoriš, izgubio/la. To je tvoja najveća iluzija u ljubavi.",
    money:
      "Novac ti je polje gde najviše oklevaš, {name} — plašiš se da tražiš više jer misliš da ćeš zvučati sebično. Venera te uči da ugodno, ali to te koči kad treba da staneš za sebe. Postoji jedna situacija u kojoj stalno daješ više vrednosti nego što naplaćuješ — i već ti je postalo normalno. Energija ti curi kroz taj 'dobar dogovor' koji zapravo nije dogovor, nego tvoja ustupka. Ovaj ciklus ti nudi da preispitaš tu jednačinu.",
  },
  {
    name: "Skorpija",
    element: "Voda",
    planet: "Pluton",
    symbol: "♏",
    start: [10, 23],
    end: [11, 21],
    payhip: "https://payhip.com/b/k1Xz6",
    energy:
      "{name}, tvoja Mesečeva energija je trenutno duboka i tamna — osećaš nešto što ne možeš da imenuješ, a što te ne pušta. Pluton, tvoj vladar, vuče te u podzemlje da oslobodiš ono što si zakopao/la. Imaš utisak da si sve preradio/la, ali postoji jedna stvar koju si 'zatvorio/la', a nisi — samo si je zaključao/la. Sad kuca. I to je dobro, iako ne osećaš tako.",
    love:
      "U vezi, {name}, ti voliš iz dubine — ali se plašiš da će te ta dubina izdati. Voda tvog znaka se ne otvara lako, pa tajiš jednu stvar koju nikada nisi rekao/la, a koja bi sve promenila. Misliš da je štitiš time što ćutiš — a zapravo je držiš u sebi kao otrov. Neko bi želeo da uđe u tvoju tamu s tobom, ali ti misliš da bi pobegao. To je tvoj najstariji strah: da te, ako te neko zaista vidi, više ne voli.",
    money:
      "Novac ti je polje kontrole, {name} — Pluton te uči da držiš konce, pa ti je teško da poveruješ da ti može doći bez da sve sam/a kontrolišeš. Postoji jedan izvor koji držiš iz straha od gubitka, a on te drži u stanju napetosti. Energija ti curi kroz taj nadzor koji ti više ne služi. Dokle god sve držiš sam/a, nemaš prostora za ono što bi ti došlo kad bi pustio/la. Ovaj ciklus ti nudi transformaciju — ali moraš da prestaneš da se držiš.",
  },
  {
    name: "Strelac",
    element: "Vatra",
    planet: "Jupiter",
    symbol: "♐",
    start: [11, 22],
    end: [12, 21],
    payhip: "https://payhip.com/b/ug3mn",
    energy:
      "{name}, tvoja Mesečeva energija trenutno traži horizont — osećaš da te nešto zove dalje od ovog trenutka. Jupiter, tvoj vladar, te širi, pa ti je teško da mirno sediš u sadašnjosti. Imaš utisak da si uvek 'skoro negde drugde', a ovde nisi došao/la. To nije nemir — to je znak da si počeo/la da bežiš od jednog pitanja koje ne želiš da postaviš sebi. Horizont je lepa destinacija, ali i dobra isprika.",
    love:
      "U vezi, {name}, ti si optimista — ali ispod tog osmeha postoji strah da će te, ako usporiš, neko zadržati. Vatra tvog znaka voli slobodu, pa tajiš da se plašiš da će ti obaveza oduzeti dah. Zato stalno dodaješ 'sledeću avanturu' da ne bi morao/la da se zaustaviš. Ali postoji jedna osoba kojoj bi voleo/la da priđeš bez bekstva — a ti misliš da bi to značilo da gubiš sebe. To je tvoj najveći strah u ljubavi, i ne govoriš ga nikome.",
    money:
      "Novac ti dolazi kroz širenje, {name}, ali i curi kroz nerealna obećanja koja sam sebi daješ. Jupiter te uči da veruješ u obilje, pa ti je lako da kažeš 'biće' — a teško da prebrojiš 'ima'. Postoji jedna prilika koju držiš jer ti zvuči kao avantura, a zapravo te drži u mestu dok misliš da napreduješ. Energija ti curi kroz tu priču o 'sledećem velikom potezu' koji nikad ne dolazi. Ovaj ciklus ti nudi fokus — ali moraš da prestaneš da bežiš u 'još'.",
  },
  {
    name: "Jarac",
    element: "Zemlja",
    planet: "Saturn",
    symbol: "♑",
    start: [12, 22],
    end: [1, 19],
    payhip: "https://payhip.com/b/34Ae9",
    energy:
      "{name}, tvoja Mesečeva energija je trenutno napeta od odgovornosti — nosiš na sebi više nego što bi iko znao. Saturn, tvoj vladar, te uči da izdržiš, pa ti je teško da priznaš kad ti je teško. Imaš utisak da moraš sve sam/a, a da pomoć znači poraz. Postoji jedan teret koji već dugo nosiš iz obaveze, ne iz ljubavi — i misliš da je to 'zrelost'. To nije zrelost. To je navika da se ne pitaš šta ti zapravo treba.",
    love:
      "U vezi, {name}, ti si onaj koji drži krov — ali se plašiš da, ako pokažeš da si umoran/umorna, sve pada. Zemlja tvog znaka voli strukturu, pa ti je teško da uđeš u nežnost bez osećaja da gubiš autoritet. Postoji jedna stvar koju bi želeo/la da ti partner kaže: 'Ja mogu da nosim ovo s tobom.' A ti mu ne daješ šansu jer misliš da moraš sam/a. Neko čeka da uđe, ali ti ga držiš na vratima.",
    money:
      "Novac ti je merilo vrednosti, {name} — ali te to čini okrutnim/om prema sebi. Saturn te uči da radiš, pa ti je teško da prihvatiš da neki prihodi ne moraju da budu plaćeni kroz patnju. Postoji jedan izvor koji držiš jer 'mora', a zapravo te drži u manjem kapacitetu. Energija ti curi kroz tu priču da ti više ne možeš. Možeš — ali ne ovako. Ovaj ciklus ti nudi da preispitaš šta 'uspeh' za tebe zaista košta.",
  },
  {
    name: "Vodolija",
    element: "Vazduh",
    planet: "Uran",
    symbol: "♒",
    start: [1, 20],
    end: [2, 18],
    payhip: "https://payhip.com/b/ACNjr",
    energy:
      "{name}, tvoja Mesečeva energija je trenutno u polju između — ni ovde ni tamo, ni u vezi ni van nje. Uran, tvoj vladar, te vuče ka promeni, pa osećaš da te nešto budi, a ne znaš šta. Imaš utisak da si drugačiji/a, da te niko potpuno ne razume — i to ti je i ponos i teret. Postoji jedna stvar koju si 'prevazišao/la', a zapravo si je samo intelektualizovao/la. Glava razume, srce još uvek čeka.",
    love:
      "U vezi, {name}, ti voliš iz slobode — ali se plašiš da će te blizina ugušiti. Vazduh tvog znaka voli prostor, pa tajiš da ti je zapravo potrebna duboka veza, a ne samo 'lepo druženje'. Postoji jedna stvar koju bi želeo/la da podeliš, ali misliš da bi te učinila 'običnim/om' — a ti se plašiš da budeš običan/na. Neko bi želeo da te vidi bez te tvog vizura neobičnosti. To je tvoj najveći strah: da si, ispod svega, samo čovek koji želi da bude voljen.",
    money:
      "Novac ti je polje gde voliš da budeš ispred vremena, {name} — ali te to čini nestrpljivim/om prema onim što 'sporo'. Uran te gura ka novom, pa ti je teško da se držiš jednog izvora dok ne rodi. Postoji jedna ideja koju si odbacio/odbacila kao 'prekasno', a zapravo je bila preuranjena — sad je njeno vreme. Energija ti curi kroz tu potrebu da stalno budeš negde drugde. Ovaj ciklus ti nudi da se zaustaviš — i ubereš šta si posejao/la.",
  },
  {
    name: "Ribe",
    element: "Voda",
    planet: "Neptun",
    symbol: "♓",
    start: [2, 19],
    end: [3, 20],
    payhip: "https://payhip.com/b/vdIec",
    energy:
      "{name}, tvoja Mesečeva energija je trenutno maglovita — osećaš stvari pre nego što se dese, a ne znaš odakle dolaze. Neptun, tvoj vladar, ti briše ivice, pa ti je teško da razdvojiš svoje od tuđeg. Imaš utisak da si 'u svetu', a zapravo si se povukao/la u sebe više nego što misliš. Postoji jedan osećaj koji si pomešao/la sa tuđim — a on je tvoj. I čeka te da ga prepoznaš.",
    love:
      "U vezi, {name}, ti voliš iz sve duše — ali se plašiš da će te ta ljubav rastopiti. Voda tvog znaka se stapa sa sve, pa ti je teško da kažeš gde ti počinješ, a gde drugi. Postoji jedna stvar koju osećaš, a ne govoriš jer misliš da je 'previše' — da bi te druga osoba morala da nosi. Ali tišina te ne štiti — te prazni. Neko bi želeo da te čuje bez da moraš da budeš jasan/na. Ti se plašiš da te ne razumeju, a ne daješ im šansu da pokušaju.",
    money:
      "Novac ti je polje gde najviše bežiš, {name} — Neptun te vuče ka idealima, pa ti je teško da se suočiš sa surovim brojevima. Postoji jedan izvor koji držiš jer ti daje 'mira', a zapravo te drži u magli oko prave vrednosti svog rada. Energija ti curi kroz to što daješ više nego što tražiš, jer ti je nelagodno da staneš za sebe. Ovaj ciklus ti nudi da vratiš ivice — da prestaneš da se topiš u tuđim potrebama i da počneš da gradiš svoje.",
  },
];

export function getZodiacSign(day: number, month: number): ZodiacSign {
  for (const sign of SIGNS) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if (sign.start[0] > sign.end[0]) {
      // wraps year-end (Jarac)
      if (
        (month === sm && day >= sd) ||
        month > sm ||
        month === em && day <= ed ||
        month < em
      ) {
        // need careful logic
      }
    }
  }
  // simpler: iterate and check ranges
  for (const sign of SIGNS) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if (sm <= em) {
      if (
        (month === sm && day >= sd) ||
        (month === em && day <= ed) ||
        (month > sm && month < em)
      ) {
        return sign;
      }
    } else {
      // wraps around year (Jarac: Dec 22 - Jan 19)
      if (
        (month === sm && day >= sd) ||
        month > sm ||
        (month === em && day <= ed) ||
        month < em
      ) {
        return sign;
      }
    }
  }
  return SIGNS[0];
}

export { SIGNS };
