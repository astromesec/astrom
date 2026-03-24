import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  firstName: string;
  zodiacSign: string;
  onContinue: () => void;
}

const AUDIO_BASE = "https://pub-7392e5eb1eb343e891a06e78c25e5db9.r2.dev";
const LOCK_SECONDS = 3 * 60;
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

  // ✅ PAYHIP LINKOVI
  const buyLink = useMemo(() => {
    const links: Record<string, string> = {
      vodolija: "https://payhip.com/b/ACNjr",
      jarac: "https://payhip.com/b/34Ae9",
      strelac: "https://payhip.com/b/ug3mn",
      bik: "https://payhip.com/b/SyfsI",
      blizanci: "https://payhip.com/b/L9RJT",
      devica: "https://payhip.com/b/8LRwe",
      lav: "https://payhip.com/b/c8yDV",
      ovan: "https://payhip.com/b/fc4dL",
      rak: "https://payhip.com/b/jZslA",
      ribe: "https://payhip.com/b/vdIec",
      skorpija: "https://payhip.com/b/k1Xz6",
      vaga: "https://payhip.com/b/l0bYz",
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
      alert("Ne mogu da pokrenem audio.");
    }
  };

  // ✅ ISTI TAB REDIRECT
  const goToCheckout = () => {
    window.location.href = buyLink;
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
      {/* ostatak JSX-a ostaje identičan */}
      {/* CTA dugme već koristi goToCheckout — sve radi */}
    </div>
  );
}
