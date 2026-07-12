import { Shield, ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 relative z-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gold-300 hover:text-gold-100 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Nazad na početnu
      </button>

      <div className="glass-card rounded-2xl p-8 sm:p-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-gold-300/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-gold-300" />
          </div>
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl gold-text">Politika Privatnosti</h1>
            <p className="text-gray-500 text-sm mt-1">Poslednje ažuriranje: jul 2026.</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="font-serif text-xl text-gold-200 mb-3">1. Uvod</h2>
            <p>
              AstroMesec.shop ("mi", "nas", "naš sajt") posvećen je zaštiti vaše privatnosti.
              Ova politika privatnosti objašnjava koje podatke prikupljamo, kako ih koristimo
              i koja prava imate u vezi sa vašim podacima.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-gold-200 mb-3">2. Podaci koje prikupljamo</h2>
            <p>Naš sajt ne zahteva registraciju niti kreiranje naloga. Prikupljamo sledeće podatke:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li><strong className="text-gray-200">Podaci za analizu:</strong> Ime i datum rođenja koji unesete u formu — ovi podaci se ne čuvaju na našim serverima i koriste se isključivo za generisanje astrološke analize tokom vašeg poseta.</li>
              <li><strong className="text-gray-200">Podaci o poseti:</strong> IP adresa, tip pretraživača, stranice koje ste posetili — prikupljaju se automatski radi statističke analize posećenosti.</li>
              <li><strong className="text-gray-200">Kolačići (cookies):</strong> Koristimo kolačiće za oglašavanje i analitiku (vidite odeljak 4).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-gold-200 mb-3">3. Kako koristimo podatke</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Za pružanje astrološke analize kompatibilnosti</li>
              <li>Za poboljšanje funkcionalnosti sajta</li>
              <li>Za prikazivanje relevantnih oglasa putem Google AdSense</li>
              <li>Za statističku analizu posećenosti</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-gold-200 mb-3">4. Google AdSense i kolačići</h2>
            <p>
              Ovaj sajt koristi Google AdSense za prikazivanje oglasa. Google kao treće lice
              koristi kolačiće (uključujući DoubleClick cookie) za prikazivanje oglasa zasnovanih
              na vašim prethodnim posatama ovog i drugih sajtova.
            </p>
            <p className="mt-3">
              Možete isključiti korišćenje DoubleClick kolačića posetom stranice{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-300 hover:text-gold-100 underline"
              >
                Google Ad Settings
              </a>
              . Više informacija o tome kako Google koristi podatke možete pronaći na{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-300 hover:text-gold-100 underline"
              >
                Google Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-gold-200 mb-3">5. Deljenje podataka sa trećim stranama</h2>
            <p>
              Ne prodajemo, ne razmenjujemo niti prenosimo vaše lične podatke trećim stranama,
              osim pouzdanim partnerima koji nam pomažu u radu sajta (npr. Google AdSense, Google Analytics),
              uz obavezu čuvanja poverljivosti podataka.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-gold-200 mb-3">6. Bezbednost podataka</h2>
            <p>
              Primenjujemo odgovarajuće tehničke i organizacione mere zaštite podataka.
              Podaci koje unosite u formu (ime i datum rođenja) se obrađuju isključivo
              na strani klijenta (u vašem pretraživaču) i ne šalju se ni na kakve spoljne servere.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-gold-200 mb-3">7. Vaša prava (GDPR)</h2>
            <p>U skladu sa GDPR regulativom, imate pravo na:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li>Pristup vašim ličnim podacima</li>
              <li>Ispravku netačnih podataka</li>
              <li>Brisanje podataka ("pravo na zaborav")</li>
              <li>Ograničenje obrade podataka</li>
              <li>Prigovor na obradu podataka</li>
            </ul>
            <p className="mt-3">
              Za ostvarivanje ovih prava, kontaktirajte nas na:{' '}
              <a
                href="mailto:astromesec@gmail.com"
                className="text-gold-300 hover:text-gold-100 underline"
              >
                astromesec@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-gold-200 mb-3">8. Kolačići — upravljanje</h2>
            <p>
              Možete upravljati ili onemogućiti kolačiće kroz podešavanja vašeg pretraživača.
              Napominjemo da onemogućavanje kolačića može uticati na funkcionalnost sajta.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-gold-200 mb-3">9. Deca</h2>
            <p>
              Ovaj sajt nije namenjen deci mlađoj od 13 godina i svesno ne prikupljamo
              lične podatke od dece.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-gold-200 mb-3">10. Izmene politike privatnosti</h2>
            <p>
              Zadržavamo pravo izmene ove politike privatnosti. Sve izmene biće objavljene
              na ovoj stranici sa ažuriranim datumom. Preporučujemo da periodično
              proveravate ovu stranicu.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-gold-200 mb-3">11. Kontakt</h2>
            <p>
              Za sva pitanja u vezi sa politikom privatnosti, možete nas kontaktirati:{' '}
              <a
                href="mailto:astromesec@gmail.com"
                className="text-gold-300 hover:text-gold-100 underline"
              >
                astromesec@gmail.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
