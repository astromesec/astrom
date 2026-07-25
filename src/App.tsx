import { useEffect, useMemo, useRef, useState } from 'react';
import { Lock, Check, Moon, Sparkles, Star } from 'lucide-react';
import { getZodiacSign, type ZodiacSign } from '@/lib/zodiac';

type Stage = 'form' | 'generating' | 'reading' | 'revealed';

const REVEAL_DELAYS = [0, 2800, 5600, 8400]; // ms between each reveal (energy, love, money, locked+cta)

function formatReading(text: string, name: string) {
  return text.replace(/\{name\}/g, name);
}

function PexelsImage() {
  return (
    <div className="mt-8 flex justify-center">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
        <img
          src="https://images.pexels.com/photos/73830/lunar-eclipse-moon-astrology-73830.jpeg?auto=compress&cs=tinysrgb&w=900"
          alt="Mesečeva astrološka karta"
          className="h-64 w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 text-cyan-200/80 text-xs">
          <Star className="h-3.5 w-3.5" />
          <span>Tvoja Mesečeva karta se slaže</span>
        </div>
      </div>
    </div>
  );
}

function Generating({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative h-40 w-40">
        <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-blue-500 opacity-30" />
        <div className="absolute inset-2 animate-pulse rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-blue-500 opacity-80 blur-sm" />
        <div className="absolute inset-5 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-blue-600 shadow-[0_0_60px_15px_rgba(34,211,238,0.45)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Moon className="h-12 w-12 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
        </div>
      </div>
      <p className="mt-10 text-lg font-light tracking-wide text-cyan-100">
        Tvoje čitanje se generiše<span className="animate-pulse">...</span>
      </p>
      <p className="mt-2 text-sm text-slate-400">{name}, povezujem tvoj datum sa Mesečevim ciklusom</p>
    </div>
  );
}

function RevealBlock({
  title,
  body,
  icon,
  show,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
  show: boolean;
}) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${
        show
          ? 'translate-y-0 opacity-100 blur-0'
          : 'translate-y-6 opacity-0 blur-[2px]'
      }`}
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-2 text-cyan-300">
          {icon}
          <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
        </div>
        <p className="text-[15px] leading-relaxed text-slate-200/90">{body}</p>
      </div>
    </div>
  );
}

function LockedSection({ show }: { show: boolean }) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-amber-950/10 p-6">
        <div className="mb-3 flex items-center gap-2 text-amber-300">
          <Sparkles className="h-4 w-4" />
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Tvoj sledeći korak (naredna 3 meseca)
          </h3>
        </div>
        <div className="relative">
          <p className="select-none text-[15px] leading-relaxed text-slate-300/90 blur-[4px]">
            Ovaj deo otkriva tvoje tačne okidače u naredna tri meseca — šta će te
            povući nazad, gde će ti energija najviše curi, i koji potez treba da
            uradiš tačno sada da preokreneš ciklus. Bez ovog dela, čitanje ostaje
            napolju — ovo je deo koji stvarno menja stvari.
          </p>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/20 ring-1 ring-amber-400/40">
              <Lock className="h-6 w-6 text-amber-300" />
            </div>
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200">
              Zaključano
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CtaCard({ sign, name }: { sign: ZodiacSign; name: string }) {
  const [ringPulse, setRingPulse] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setRingPulse(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const openPayhip = () => {
    window.open(sign.payhip, '_blank');
  };

  const features = [
    'Ljubav — ko ti pali okidače i zašto',
    'Novac — gde curi energija i kako da presečeš',
    'Sledeći koraci — tačno šta da uradiš dalje',
  ];

  return (
    <div
      className={`mt-6 transition-all duration-700 ease-out ${
        ringPulse ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-7 shadow-[0_0_50px_-10px_rgba(34,211,238,0.35)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">
          <h2 className="text-2xl font-bold text-white">Ne ostavljaj ovo nedovršeno.</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300/90">
            Ovo je deo koji besplatno čitanje ne otkriva: tvoje tačne okidače, gde
            ti energija curi i tačan sledeći korak u ovom ciklusu.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-200 ring-1 ring-cyan-400/30">
            🌙 4.500+ otključanih premium čitanja
          </div>

          <ul className="mt-5 space-y-2.5">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-slate-200">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cyan-500/20 ring-1 ring-cyan-400/40">
                  <Check className="h-3 w-3 text-cyan-300" />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-lg text-slate-500 line-through">€22.00</span>
            <span className="text-4xl font-extrabold text-white">€9.00</span>
            <span className="mb-1 rounded-md bg-rose-500/90 px-2 py-0.5 text-xs font-bold text-white">
              -59%
            </span>
          </div>

          <div className="mt-5">
            <button
              onClick={openPayhip}
              className={`group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-cyan-500/30 transition-transform hover:scale-[1.01] active:scale-[0.99] ${
                ringPulse ? 'ring-4 ring-cyan-300/60' : ''
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>🔓 OTKLJUČAJ PREMIUM SADA</span>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-slate-500">
            Jednokratna kupovina • Pristup odmah • Digitalni sadržaj
          </p>
        </div>
      </div>
    </div>
  );
}

function Form({
  onSubmit,
}: {
  onSubmit: (name: string, day: number, month: number) => void;
}) {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    if (!name.trim()) return setError('Unesi svoje ime.');
    if (!d || d < 1 || d > 31) return setError('Unesi validan dan (1–31).');
    if (!m || m < 1 || m > 12) return setError('Unesi validan mesec (1–12).');
    setError('');
    onSubmit(name.trim(), d, m);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-lg shadow-cyan-500/30">
            <Moon className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Astromesec</h1>
          <p className="text-sm text-cyan-200/80">Mesečevo tumačenje</p>
          <p className="mt-3 text-sm text-slate-400">
            Otkrij šta Mesečeva energija kaže o tebi — na osnovu datuma rođenja.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
              Tvoje ime
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="npr. Marija"
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
                Dan rođenja
              </label>
              <input
                value={day}
                onChange={(e) => setDay(e.target.value)}
                inputMode="numeric"
                placeholder="15"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">
                Mesec rođenja
              </label>
              <input
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                inputMode="numeric"
                placeholder="6"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-cyan-500/30 transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Generiši moje čitanje
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-500">
          Besplatno • Bez registracije • Rezultat za nekoliko sekundi
        </p>
      </div>
    </div>
  );
}

function App() {
  const [stage, setStage] = useState<Stage>('form');
  const [name, setName] = useState('');
  const [sign, setSign] = useState<ZodiacSign | null>(null);
  const [revealed, setRevealed] = useState([false, false, false, false]);
  const timers = useRef<number[]>([]);

  const sign_ = sign;

  useEffect(() => {
    return () => timers.current.forEach((t) => clearTimeout(t));
  }, []);

  const startReading = (n: string, d: number, m: number) => {
    const s = getZodiacSign(d, m);
    setName(n);
    setSign(s);
    setStage('generating');
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    const t1 = window.setTimeout(() => setStage('reading'), 1400);
    timers.current.push(t1);
  };

  useEffect(() => {
    if (stage !== 'reading') return;
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    REVEAL_DELAYS.forEach((delay, i) => {
      const t = window.setTimeout(() => {
        setRevealed((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        if (i === 3) setStage('revealed');
      }, delay);
    });
    return () => timers.current.forEach((t) => clearTimeout(t));
  }, [stage]);

  const reading = useMemo(() => {
    if (!sign_) return null;
    return {
      energy: formatReading(sign_.energy, name),
      love: formatReading(sign_.love, name),
      money: formatReading(sign_.money, name),
    };
  }, [sign_, name]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-blue-700/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute left-0 top-1/3 h-[24rem] w-[24rem] rounded-full bg-indigo-700/10 blur-[120px]" />
      </div>

      {/* stars */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute left-[10%] top-[15%] h-1 w-1 rounded-full bg-white" />
        <div className="absolute left-[25%] top-[40%] h-0.5 w-0.5 rounded-full bg-white" />
        <div className="absolute left-[70%] top-[20%] h-1 w-1 rounded-full bg-cyan-200" />
        <div className="absolute left-[85%] top-[60%] h-0.5 w-0.5 rounded-full bg-white" />
        <div className="absolute left-[45%] top-[75%] h-1 w-1 rounded-full bg-white" />
        <div className="absolute left-[15%] top-[80%] h-0.5 w-0.5 rounded-full bg-cyan-200" />
      </div>

      <main className="relative mx-auto max-w-2xl px-5 py-10">
        {stage === 'form' && <Form onSubmit={startReading} />}

        {stage === 'generating' && <Generating name={name} />}

        {(stage === 'reading' || stage === 'revealed') && sign_ && reading && (
          <div className="space-y-5">
            {/* header */}
            <div className="mb-2 text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 text-3xl shadow-lg shadow-cyan-500/30">
                {sign_.symbol}
              </div>
              <h2 className="text-xl font-bold text-white">
                {name}, ti si {sign_.name}
              </h2>
              <p className="text-xs text-slate-400">
                Element: {sign_.element} • Vladajuća planeta: {sign_.planet}
              </p>
            </div>

            <RevealBlock
              title="Tvoja Mesečeva energija upravo sada"
              body={reading.energy}
              icon={<Moon className="h-4 w-4" />}
              show={revealed[0]}
            />
            <RevealBlock
              title="Ljubav i veze"
              body={reading.love}
              icon={<Sparkles className="h-4 w-4" />}
              show={revealed[1]}
            />
            <RevealBlock
              title="Novac i prilike"
              body={reading.money}
              icon={<Star className="h-4 w-4" />}
              show={revealed[2]}
            />

            <LockedSection show={revealed[3]} />

            {stage === 'revealed' && sign_ && (
              <CtaCard sign={sign_} name={name} />
            )}

            {stage === 'reading' && !revealed[3] && <PexelsImage />}
          </div>
        )}

        <footer className="mt-16 text-center text-xs text-slate-600">
          Astromesec • Zabavni i edukativni sadržaj • {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}

export default App;
