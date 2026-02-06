import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  firstName: string;
  zodiacSign: string;
  onContinue: () => void; // ostavljam u props, ali se ne koristi
}

const AUDIO_BASE =
  "https://skenrw92ri82hzwy.public.blob.vercel-storage.com";

const CTA_REVEAL_SECONDS = 13 * 60;
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

  const [showCTA, setShowCTA] = useState(false);
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

  const audioSrc = useMemo(() => `${AUDIO_BASE}/${fileKey}.mp3.mp3`, [fileKey]);

  const buyLink = useMemo(() => {
    const base = "https://astromesecevocitanje.gumroad.com/l";
    const links: Record<string, string> = {
      bik: `${base}/cxwwnf`,
      blizanci: `${base}/jqgfb`,
      devica: `${base}/xcrqpd`,
      jarac: `${base}/uipbwd`,
      lav: `${base}/psdngf`,
      ovan: `${base}/oeksh`,
      rak: `${base}/tqhez`,
      ribe: `${base}/rmkoa`,
      skorpija: `${base}/ldvgll`,
      strelac: `${base}/qhouc`,
      vaga: `${base}/pzklth`,
      vodolija: `${base}/mvanxf`,
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
      if (t > maxListenedRef.current) maxListenedRef.current = t;
    };

    const onPlay = () => {
      setIsPlaying(true);
      setHasStarted(true);
    };

    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    const onSeeking = () => {
      if (isProgrammaticSeekRef.current) return;
      const t = a.currentTime || 0;
      const allowed = maxListenedRef.current + SEEK_BUFFER;

      // zabranjen skip unapred
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
  }, []);

  useEffect(() => {
    if (showCTA) return;
    if (currentTime >= CTA_REVEAL_SECONDS) {
      setShowCTA(true);
      setTimeout(() => setCtaPulse(true), 150);
      setTimeout(() => setCtaPulse(false), 2200);
    }
  }, [currentTime, showCTA]);

  const progress = useMemo(() => {
    if (!duration || duration <= 0) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  const remainingToCTA = Math.max(0, CTA_REVEAL_SECONDS - currentTime);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;

    try {
      if (a.paused) await a.play();
      else a.pause();
    } catch (e) {
      console.error("Audio play error:", e);
      alert("Ne mogu da pokrenem audio. Proveri link.");
    }
  };

  const goToCheckout = () => {
    window.open(buyLink, "_blank", "noopener,noreferrer");
  };

  const helperText = !isReady
    ? "Učitavanje audio..."
    : !hasStarted
      ? "Klikni ▶ da pokreneš audio."
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
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Progress bar only */}
              <div className="w-full max-w-xs sm:max-w-sm mb-5">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-3 text-white/60 text-xs text-center">
                  {helperText}
                </div>
              </div>

              {/* Countdown / unlocked */}
              {!showCTA ? (
                <div className="text-center px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-400/20">
                  <p className="text-white/80 text-xs">
                    Premium se otključava za{" "}
                    <span className="font-semibold text-white">
                      {formatCountdown(remainingToCTA)}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="text-center px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                  <p className="text-emerald-300 text-xs font-semibold">Premium otključan ✓</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ CTA odmah ispod audija */}
        {showCTA && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl animate-in fade-in duration-700">
            <div className="p-6 sm:p-8">
              <div className="text-center">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                  Ne ostavljaj ovo nedovršeno.
                </h2>
                <p className="text-white/80 text-sm mb-3">
                  Ovo je deo koji free čitanje ne otkriva: tvoje okidače, gde ti energija
                  curi i tačan sledeći korak u ovom ciklusu.
                </p>

                <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs mb-5">
                  <span className={ctaPulse ? "animate-pulse" : ""}>✨</span>
                  <span>🌙 4.500+ otključanih premium čitanja</span>
                </div>

                <ul className="space-y-2 text-left mb-6 text-white/80 text-sm">
                  <li className="flex gap-2 items-start">
                    <span className="text-blue-400 flex-shrink-0">✓</span>
                    <span><b>Ljubav:</b> ko ti "pali okidače" i zašto</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-blue-400 flex-shrink-0">✓</span>
                    <span><b>Novac:</b> gde curi energija i kako da presečeš</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-blue-400 flex-shrink-0">✓</span>
                    <span><b>Sledeći koraci:</b> tačno šta da uradiš dalje</span>
                  </li>
                </ul>

                <button
                  onClick={goToCheckout}
                  className={`w-full px-6 py-3 rounded-full font-extrabold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg transition-all active:scale-95 ${
                    ctaPulse ? "ring-2 ring-cyan-300/60" : ""
                  }`}
                >
                  🔓 OTKLJUČAJ PREMIUM SADA
                </button>

                <div className="mt-3 text-white/60 text-xs">
                  Jednokratna kupovina • Pristup odmah • Digitalni sadržaj
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Slika se prikazuje samo dok CTA NIJE aktivan (kad CTA izađe, slika nestaje) */}
        {!showCTA && (
          <div className="mt-6 rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-gradient-to-br from-white/5 to-white/0 p-2">
            <img
              src="/img.png"
              alt="Astrology Chart"
              className="w-full h-auto rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        )}

        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onError={() => {
            console.log("Audio failed to load:", audioSrc);
            alert("Audio ne može da se učita. Proveri link: " + audioSrc);
          }}
        />
      </div>
    </div>
  );
}
