import { useEffect, useMemo, useRef, useState } from "react";
import { trackStandard } from "../../pixel";

interface Props {
  firstName: string;
  zodiacSign: string;
}

const AUDIO_BASE = "https://pub-7392e5eb1eb343e891a06e78c25e5db9.r2.dev";
const LOCK_SECONDS = 3 * 60;
const SEEK_BUFFER = 0.75;

// Countdown timer duration (minutes) - urgency
const OFFER_MINUTES = 15;

function normalizeKey(v: string) {
  return (v || "").toLowerCase().trim();
}

function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

function formatCountdown(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`;
}

const ZODIAC_MAP: Record<string, string> = {
  aries: "ovan", taurus: "bik", gemini: "blizanci", cancer: "rak",
  leo: "lav", virgo: "devica", libra: "vaga", scorpio: "skorpija",
  sagittarius: "strelac", capricorn: "jarac", aquarius: "vodolija", pisces: "ribe",
  ovan: "ovan", bik: "bik", blizanci: "blizanci", rak: "rak",
  lav: "lav", devica: "devica", vaga: "vaga", skorpija: "skorpija",
  strelac: "strelac", jarac: "jarac", vodolija: "vodolija", ribe: "ribe",
};

const ZODIAC_LABELS: Record<string, string> = {
  ovan: "Ovan", bik: "Bik", blizanci: "Blizanci", rak: "Rak",
  lav: "Lav", devica: "Devica", vaga: "Vaga", skorpija: "Škorpija",
  strelac: "Strelac", jarac: "Jarac", vodolija: "Vodolija", ribe: "Ribe",
};

const AUDIO_FILES: Record<string, string> = {
  ovan: "Ovan%20ceo.mp3", bik: "Bik%20ceo.mp3", blizanci: "Blizanci%20ceo.mp3",
  rak: "Rak%20ceo.mp3", lav: "Lav%20ceo.mp3", devica: "Devica%20ceo.mp3",
  vaga: "Vaga%20ceo.mp3", skorpija: "Skorpija%20ceo.mp3", strelac: "Strelac%20ceo.mp3",
  jarac: "Jarac%20ceo.mp3", vodolija: "Vodolija%20ceo.mp3", ribe: "Ribe%20ceo.mp3",
};

const BUY_LINKS: Record<string, string> = {
  vodolija: "https://payhip.com/b/ACNjr", jarac: "https://payhip.com/b/34Ae9",
  strelac: "https://payhip.com/b/ug3mn", bik: "https://payhip.com/b/SyfsI",
  blizanci: "https://payhip.com/b/L9RJT", devica: "https://payhip.com/b/8LRwe",
  lav: "https://payhip.com/b/c8yDV", ovan: "https://payhip.com/b/fc4dL",
  rak: "https://payhip.com/b/jZslA", ribe: "https://payhip.com/b/vdIec",
  skorpija: "https://payhip.com/b/k1Xz6", vaga: "https://payhip.com/b/l0bYz",
};

// Social proof per sign — personalized
const TESTIMONIALS: Record<string, { name: string; text: string }[]> = {
  devica: [
    { name: "Marija P.", text: "Shvatila sam svoj obrazac u vezama — jasno i precizno." },
    { name: "Jovana L.", text: "Nikad nisam mislila da će astrologija ovako pogoditi suštinu." },
  ],
  jarac: [
    { name: "Nikola S.", text: "Brutalno tačno za novac i sigurnost. Pogodilo me." },
    { name: "Dragan M.", text: "Objašnjenje mog odnosa prema radu je savršeno." },
  ],
  rak: [
    { name: "Jelena M.", text: "Najrealnije objašnjenje mojih odnosa do sada." },
    { name: "Milica B.", text: "Konačno razumem zašto me tako lako povrede tuđe reči." },
  ],
  skorpija: [
    { name: "Marko D.", text: "100% moj život. Nisam očekivao ovu preciznost." },
    { name: "Igor T.", text: "Čitanje mi je pomoglo da razumem zašto guram ljude od sebe." },
  ],
  vaga: [
    { name: "Ana K.", text: "Sad razumem zašto me određeni ljudi izbace iz balansa." },
    { name: "Maja R.", text: "Prepoznala sam se u svakoj rečenici." },
  ],
  ovan: [
    { name: "Stefan R.", text: "Konačno ima smisla zašto radim kako radim." },
    { name: "Aleksandar V.", text: "Čitanje je opisalo moj energetski obrazac savršeno." },
  ],
};

const DEFAULT_TESTIMONIALS = [
  { name: "Marija P.", text: "Kliknuo mi je deo za ljubav — shvatila sam svoj obrazac." },
  { name: "Nikola S.", text: "Brutalno tačno za novac i sigurnost. Pogodilo me." },
  { name: "Jelena M.", text: "Najrealnije objašnjenje mojih odnosa do sada." },
  { name: "Marko D.", text: "100% moj život. Nisam očekivao ovu preciznost." },
  { name: "Ana K.", text: "Sad razumem zašto me određeni ljudi izbace iz balansa." },
  { name: "Stefan R.", text: "Konačno ima smisla zašto radim kako radim." },
];

export default function Step10AudioPresentation({ firstName, zodiacSign }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const maxListenedRef = useRef<number>(0);
  const isProgrammaticSeekRef = useRef<boolean>(false);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [ctaPulse, setCtaPulse] = useState(false);
  // Urgency countdown
  const [offerSeconds, setOfferSeconds] = useState(OFFER_MINUTES * 60);

  const fileKey = useMemo(() => {
    const key = normalizeKey(zodiacSign);
    return ZODIAC_MAP[key] || key || "bik";
  }, [zodiacSign]);

  const zodiacLabel = ZODIAC_LABELS[fileKey] || zodiacSign || "Bik";
  const audioSrc = `${AUDIO_BASE}/${AUDIO_FILES[fileKey] || AUDIO_FILES.bik}`;
  const buyLink = BUY_LINKS[fileKey] || BUY_LINKS.bik;
  const testimonials = TESTIMONIALS[fileKey] || DEFAULT_TESTIMONIALS;

  // Offer countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setOfferSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onLoadedMetadata = () => {
      setIsReady(true);
      setDuration(Number.isFinite(a.duration) ? a.duration : 0);
    };

    const onTimeUpdate = () => {
      const t = a.currentTime || 0;
      setCurrentTime(t);
      const capped = Math.min(t, LOCK_SECONDS);
      if (capped > maxListenedRef.current) maxListenedRef.current = capped;

      if (!isLocked && t >= LOCK_SECONDS) {
        setIsLocked(true);
        isProgrammaticSeekRef.current = true;
        a.currentTime = LOCK_SECONDS;
        a.pause();
        setTimeout(() => (isProgrammaticSeekRef.current = false), 0);
        setTimeout(() => setCtaPulse(true), 120);
        setTimeout(() => setCtaPulse(false), 2200);
        // Scroll to CTA
        setTimeout(() => ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 400);
        // Track FB event
        trackStandard("ViewContent", { content_name: zodiacLabel });
      }
    };

    const onPlay = () => {
      if (isLocked) { a.pause(); return; }
      setIsPlaying(true);
      setHasStarted(true);
    };

    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    const onSeeking = () => {
      if (isProgrammaticSeekRef.current) return;
      const t = a.currentTime || 0;
      if (t > LOCK_SECONDS) {
        isProgrammaticSeekRef.current = true;
        a.currentTime = LOCK_SECONDS;
        a.pause();
        setTimeout(() => (isProgrammaticSeekRef.current = false), 0);
        return;
      }
      const allowed = Math.min(maxListenedRef.current + SEEK_BUFFER, LOCK_SECONDS);
      if (t > allowed) {
        isProgrammaticSeekRef.current = true;
        a.currentTime = maxListenedRef.current;
        setTimeout(() => (isProgrammaticSeekRef.current = false), 0);
      }
    };

    a.addEventListener("loadedmetadata", onLoadedMetadata);
    a.addEventListener("timeupdate", onTimeUpdate);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    a.addEventListener("seeking", onSeeking);

    return () => {
      a.removeEventListener("loadedmetadata", onLoadedMetadata);
      a.removeEventListener("timeupdate", onTimeUpdate);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
      a.removeEventListener("seeking", onSeeking);
    };
  }, [isLocked, zodiacLabel]);

  const progress = useMemo(() => {
    const max = Math.min(duration || 0, LOCK_SECONDS);
    if (!max) return 0;
    return Math.min(100, (Math.min(currentTime, LOCK_SECONDS) / max) * 100);
  }, [currentTime, duration]);

  const remainingToLock = Math.max(0, LOCK_SECONDS - currentTime);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (isLocked) {
      setTimeout(() => setCtaPulse(true), 50);
      setTimeout(() => setCtaPulse(false), 1200);
      ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    try {
      if (a.paused) await a.play();
      else a.pause();
    } catch (e) {
      console.error("Audio play error:", e);
    }
  };

  const goToCheckout = () => {
    trackStandard("InitiateCheckout", { value: 22, currency: "EUR", content_name: zodiacLabel });
    window.location.href = buyLink;
  };

  const helperText = !isReady
    ? "Učitavanje audio..."
    : !hasStarted
    ? "Pritisni ▶ da pokreneš preview"
    : isLocked
    ? "Preview završen — otključaj nastavak ispod"
    : "Pojačaj ton. Slušaj pažljivo.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-4 py-8">
      <div className="w-full max-w-xl mx-auto space-y-5">

        {/* Header */}
        <div className="text-center pt-2">
          <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-5 rounded-full" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {firstName ? `${firstName}, vaše čitanje je spremno` : "Vaše čitanje je spremno"}
          </h1>
          <p className="text-white/50 text-sm">{zodiacLabel} · Mesečevo tumačenje</p>
        </div>

        {/* Audio Player Card */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8">

            {/* Sign header */}
            <div className="flex items-center gap-3 mb-7 pb-5 border-b border-white/10">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🌙</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{zodiacLabel} · Mesečevo čitanje</div>
                <div className="text-white/40 text-xs">Audio · Kompletan profil</div>
              </div>
              {/* Live listener count — social proof during listening */}
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/40 text-xs">
                  {Math.floor(Math.random() * 30) + 15} sluša
                </span>
              </div>
            </div>

            {/* Play button */}
            <div className="flex flex-col items-center">
              <div className="relative group mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <button
                  onClick={togglePlay}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-2xl hover:shadow-[0_20px_60px_rgba(34,211,238,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center"
                  aria-label={isPlaying ? "Pauziraj" : "Pusti"}
                >
                  {isPlaying ? (
                    <div className="flex gap-1.5">
                      {[0, 0.15, 0.3].map((delay, i) => (
                        <span key={i} className="block w-1.5 h-7 bg-white rounded-sm animate-pulse" style={{ animationDelay: `${delay}s` }} />
                      ))}
                    </div>
                  ) : (
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-xs mb-4">
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-white/30 text-xs">{formatTime(currentTime)}</span>
                  <span className="text-white/30 text-xs">{formatTime(Math.min(duration, LOCK_SECONDS))}</span>
                </div>
              </div>

              <p className="text-white/50 text-xs text-center mb-4">{helperText}</p>

              {/* Countdown to lock OR locked badge */}
              {!isLocked ? (
                <div className="text-center px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-400/20">
                  <p className="text-white/70 text-xs">
                    Preview ističe za{" "}
                    <span className="font-semibold text-white tabular-nums">{formatTime(remainingToLock)}</span>
                  </p>
                </div>
              ) : (
                <div className="text-center px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30">
                  <p className="text-amber-200 text-xs font-semibold">
                    🔒 Preview završen · Otključaj nastavak ispod
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inline social proof — visible WHILE listening, not just after lock */}
        {hasStarted && !isLocked && (
          <div className="rounded-2xl border border-white/8 bg-white/4 px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="text-yellow-400 text-sm mt-0.5">⭐⭐⭐⭐⭐</div>
              <p className="text-white/60 text-xs leading-relaxed italic">
                "{testimonials[0].text}"
                <span className="text-white/30 not-italic"> — {testimonials[0].name}</span>
              </p>
            </div>
          </div>
        )}

        {/* Image — visible while listening */}
        {!isLocked && (
          <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-gradient-to-br from-white/5 to-white/0 p-2">
            <img src="/img.png" alt="Astrološka karta" className="w-full h-auto rounded-2xl object-cover" />
          </div>
        )}

        {/* ============ SALES SECTION — after lock ============ */}
        {isLocked && (
          <div ref={ctaRef} className="space-y-4">

            {/* Urgency banner */}
            <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-amber-300 text-sm">⏳</span>
                <span className="text-amber-200 text-xs font-medium">Ova cena ističe za</span>
              </div>
              <span className="text-amber-100 font-bold text-lg tabular-nums tracking-tight">
                {formatCountdown(offerSeconds)}
              </span>
            </div>

            {/* Main CTA card */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="p-6 sm:p-8">
                <div className="text-center">

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                    Stao si tačno pre najbitnijeg dela.
                  </h2>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    Ako si se prepoznao u ovom previewu — nastavak je gde sve postaje jasno. Tvoji obrasci u ljubavi, novcu i odlukama su detaljno objašnjeni.
                  </p>

                  {/* Price block */}
                  <div className="mb-6 flex items-center justify-center gap-3">
                    <span className="text-white/30 text-base line-through">44€</span>
                    <span className="text-3xl font-extrabold text-white">22€</span>
                    <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2.5 py-1 rounded-full border border-green-400/30">
                      -50%
                    </span>
                  </div>

                  {/* Primary CTA */}
                  <button
                    onClick={goToCheckout}
                    className={`w-full px-6 py-4 rounded-full font-extrabold text-white text-base bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 shadow-[0_10px_40px_rgba(34,211,238,0.3)] hover:shadow-[0_20px_60px_rgba(34,211,238,0.5)] transition-all duration-300 active:scale-95 ${ctaPulse ? "ring-2 ring-cyan-300/60 scale-105" : ""}`}
                  >
                    Da, želim nastavak → 22€
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-4 text-white/40 text-xs">
                    <span>✓ Pristup odmah</span>
                    <span>✓ Nema pretplate</span>
                    <span>✓ Sigurna naplata</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social proof — full list */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/6 to-white/2 backdrop-blur-xl overflow-hidden shadow-xl">
              <div className="p-6 sm:p-8">
                <div className="text-center mb-4">
                  <div className="text-yellow-400 text-xl mb-1">⭐⭐⭐⭐⭐</div>
                  <div className="text-white text-sm font-semibold">4.7 / 5 prosečna ocena</div>
                  <div className="text-white/40 text-xs mt-1">Više od 1.200 zadovoljnih čitalaca</div>
                </div>

                <div className="space-y-3">
                  {[...testimonials, ...DEFAULT_TESTIMONIALS.filter(t =>
                    !testimonials.find(x => x.name === t.name)
                  )].slice(0, 6).map((t, i) => (
                    <div key={i} className="bg-white/5 border border-white/8 rounded-2xl p-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white text-sm font-semibold">{t.name}</span>
                        <span className="text-yellow-400 text-xs">⭐⭐⭐⭐⭐</span>
                      </div>
                      <p className="text-white/70 text-xs leading-relaxed">"{t.text}"</p>
                    </div>
                  ))}
                </div>

                {/* Repeat CTA at bottom */}
                <button
                  onClick={goToCheckout}
                  className="mt-6 w-full px-6 py-3.5 rounded-full font-bold text-white text-sm bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-[0_15px_40px_rgba(34,211,238,0.3)] transition-all active:scale-95"
                >
                  Otključaj celo čitanje → 22€
                </button>
              </div>
            </div>

          </div>
        )}

        <audio ref={audioRef} src={audioSrc} preload="metadata" />
      </div>
    </div>
  );
}
