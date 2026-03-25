import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  firstName: string;
  zodiacSign: string;
  onContinue: () => void; // ostavljam u props, ali se ne koristi
}

// ✅ Cloudflare R2 public dev URL (tvoj)
const AUDIO_BASE = "https://pub-7392e5eb1eb343e891a06e78c25e5db9.r2.dev";

// ✅ LOCK posle 3 minuta
const LOCK_SECONDS = 3 * 60;

// ✅ Anti-skip buffer (da ne mogu unapred)
const SEEK_BUFFER = 0.75;

function normalizeKey(v: string) {
  return (v || "").toLowerCase().trim();
}

function formatCountdown(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function Step10AudioPresentation({ firstName, zodiacSign }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const maxListenedRef = useRef<number>(0);
  const isProgrammaticSeekRef = useRef<boolean>(false);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // ✅ lock state + CTA pulse
  const [isLocked, setIsLocked] = useState(false);
  const [ctaPulse, setCtaPulse] = useState(false);

  const fileKey = useMemo(() => {
    const map: Record<string, string> = {
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

      ovan: "ovan",
      bik: "bik",
      blizanci: "blizanci",
      rak: "rak",
      lav: "lav",
      devica: "devica",
      vaga: "vaga",
      skorpija: "skorpija",
      strelac: "strelac",
      jarac: "jarac",
      vodolija: "vodolija",
      ribe: "ribe",
    };

    const key = normalizeKey(zodiacSign);
    return map[key] || key || "bik";
  }, [zodiacSign]);

  const zodiacLabel = useMemo(() => {
    const labels: Record<string, string> = {
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
    return labels[fileKey] || zodiacSign || "Bik";
  }, [fileKey, zodiacSign]);

  const audioFilename = useMemo(() => {
    const files: Record<string, string> = {
      ovan: "Ovan%20ceo.mp3",
      bik: "Bik%20ceo.mp3",
      blizanci: "Blizanci%20ceo.mp3",
      rak: "Rak%20ceo.mp3",
      lav: "Lav%20ceo.mp3",
      devica: "Devica%20ceo.mp3",
      vaga: "Vaga%20ceo.mp3",
      skorpija: "Skorpija%20ceo.mp3",
      strelac: "Strelac%20ceo.mp3",
      jarac: "Jarac%20ceo.mp3",
      vodolija: "Vodolija%20ceo.mp3",
      ribe: "Ribe%20ceo.mp3",
    };

    return files[fileKey] || files.bik;
  }, [fileKey]);

  const audioSrc = useMemo(() => `${AUDIO_BASE}/${audioFilename}`, [audioFilename]);

  const buyLink = useMemo(() => {
    const base = "https://payhip.com/b";
    const links: Record<string, string> = {
      vodolija: `${base}/ACNjr`,
      jarac: `${base}/34Ae9`,
      strelac: `${base}/ug3mn`,
      bik: `${base}/SyfsI`,
      blizanci: `${base}/L9RJT`,
      devica: `${base}/8LRwe`,
      lav: `${base}/c8yDV`,
      ovan: `${base}/fc4dL`,
      rak: `${base}/jZslA`,
      ribe: `${base}/vdIec`,
      skorpija: `${base}/k1Xz6`,
      vaga: `${base}/l0bYz`,
    };
    return links[fileKey] || links.bik;
  }, [fileKey]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onLoadedMetadata = () => {
      setIsReady(true);
      const d = Number.isFinite(a.duration) ? a.duration : 0;
      setDuration(d);
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
      }
    };

    const onPlay = () => {
      if (isLocked) {
        a.pause();
        return;
      }
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
  }, [isLocked]);

  const progress = useMemo(() => {
    const max = Math.min(duration || 0, LOCK_SECONDS);
    if (!max || max <= 0) return 0;
    return Math.min(100, Math.max(0, (Math.min(currentTime, LOCK_SECONDS) / max) * 100));
  }, [currentTime, duration]);

  const remainingToLock = Math.max(0, LOCK_SECONDS - currentTime);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (isLocked) {
      setTimeout(() => setCtaPulse(true), 50);
      setTimeout(() => setCtaPulse(false), 1200);
      return;
    }

    try {
      if (a.paused) await a.play();
      else a.pause();
    } catch (e) {
      console.error("Audio play error:", e);
      alert("Ne mogu da pokrenem audio. Proveri link.");
    }
  };

  const goToCheckout = () => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout");
  }

  window.open(buyLink, "_blank", "noopener,noreferrer");
  };

  const helperText = !isReady
    ? "Učitavanje audio..."
    : !hasStarted
      ? "Klikni ▶ da pokreneš audio."
      : isLocked
        ? "Preview je završen. Otključaj premium da nastaviš."
        : "Pojačaj ton. Slušaj pažljivo.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
                {/* Header */}
        <div className="text-center mb-6">
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6 rounded-full" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {firstName || "Vaše čitanje"}
          </h1>
          <p className="text-white/60 text-sm">Vaše Mesečevo čitanje je spremno</p>
        </div>

        {/* Player card */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🌙</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">{zodiacLabel}</div>
                <div className="text-white/50 text-xs">Mesečevo čitanje</div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              {/* Play button */}
              <div className="relative group mb-7">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <button
                  onClick={togglePlay}
                  className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-2xl hover:shadow-[0_20px_60px_rgba(34,211,238,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center"
                  aria-label={isPlaying ? "Pauziraj" : "Pusti"}
                >
                  {isPlaying ? (
                    <div className="flex gap-2">
                      <span className="block w-2 h-8 bg-white rounded-sm animate-pulse" />
                      <span className="block w-2 h-8 bg-white rounded-sm animate-pulse" style={{ animationDelay: "0.2s" }} />
                      <span className="block w-2 h-8 bg-white rounded-sm animate-pulse" style={{ animationDelay: "0.4s" }} />
                    </div>
                  ) : (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Progress */}
              <div className="w-full max-w-xs sm:max-w-sm mb-5">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-3 text-white/60 text-xs text-center">{helperText}</div>
              </div>

              {/* Countdown / Locked */}
              {!isLocked ? (
                <div className="text-center px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-400/20">
                  <p className="text-white/80 text-xs">
                    Preview traje još{" "}
                    <span className="font-semibold text-white">{formatCountdown(remainingToLock)}</span>
                  </p>
                </div>
              ) : (
                <div className="text-center px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
                  <p className="text-amber-200 text-xs font-semibold">
                    🔒 Preview završen — otključaj premium da nastaviš
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ SOCIAL PROOF + 1 CTA */}
        {isLocked && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl animate-in fade-in duration-700">
            <div className="p-6 sm:p-8">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
                  Stao si tačno pre najbitnijeg dela.
                </h2>

                <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-6">
                  Ako si se prepoznao — nastavak je ono gde sve postaje jasno.
                </p>

                {/* SOCIAL PROOF (bez scroll-a) */}
                <div className="mb-6">
                  <div className="text-yellow-400 text-lg mb-1">⭐⭐⭐⭐⭐</div>
                  <div className="text-white text-sm font-semibold mb-4">
                    4.6 / 5 prosečna ocena
                  </div>

                  <div className="space-y-3 text-left">
                    {[
                      { name: "Marija P.", sign: "Devica", text: "Kliknuo mi je deo za ljubav — shvatila sam svoj obrazac." },
                      { name: "Nikola S.", sign: "Jarac", text: "Brutalno tačno za novac i sigurnost. Pogodilo me." },
                      { name: "Jelena M.", sign: "Rak", text: "Najrealnije objašnjenje mojih odnosa do sada." },
                      { name: "Marko D.", sign: "Škorpija", text: "100% moj život. Nisam očekivao ovu preciznost." },
                      { name: "Ana K.", sign: "Vaga", text: "Sad razumem zašto me određeni ljudi izbace iz balansa." },
                      { name: "Stefan R.", sign: "Ovan", text: "Konačno ima smisla zašto radim kako radim." }
                    ].map((t, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white text-sm font-semibold">{t.name}</span>
                          <span className="text-cyan-300 text-xs">{t.sign}</span>
                        </div>
                        <p className="text-white/80 text-xs leading-relaxed">“{t.text}”</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 1 CTA */}
                <button
                  onClick={goToCheckout}
                  className={`w-full px-6 py-4 rounded-full font-extrabold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-[0_25px_70px_rgba(34,211,238,0.35)] transition-all active:scale-95 ${
                    ctaPulse ? "ring-2 ring-cyan-300/60" : ""
                  }`}
                >
                  🔓 OTKLJUČAJ PREMIUM — 7€ JEDNOKRATNO
                </button>

                <div className="mt-2 text-white/60 text-xs">
                  Pristup odmah • Nema pretplate
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slika */}
        {!isLocked && (
          <div className="mt-6 rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-gradient-to-br from-white/5 to-white/0 p-2">
            <img src="/img.png" alt="Astrology Chart" className="w-full h-auto rounded-2xl object-cover" />
          </div>
        )}

        <audio ref={audioRef} src={audioSrc} preload="metadata" />
      </div>
    </div>
  );
}
