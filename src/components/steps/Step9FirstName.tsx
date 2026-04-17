import { useEffect, useState } from "react";

interface Props {
  firstName: string;
  onComplete: () => void;
}

const MESSAGES = [
  "Analiziramo vaš astrološki profil...",
  "Računamo poziciju Meseca...",
  "Pronalazimo vaše skrivene obrasce...",
  "Personalizujemo čitanje za vas...",
  "Još trenutak — skoro gotovo...",
];

export default function Step9Calculating({ firstName, onComplete }: Props) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalMs = 4500 + Math.floor(Math.random() * 1500);
    const start = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(98, (elapsed / totalMs) * 100);
      setProgress(pct);
    }, 50);

    const msgInterval = setInterval(() => {
      setMsgIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, totalMs / MESSAGES.length);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(onComplete, 300);
    }, totalMs);

    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Animated moon orb */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 animate-pulse flex items-center justify-center">
              <span className="text-5xl">🌙</span>
            </div>
            <div className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 animate-ping opacity-30" />
          </div>
        </div>

        {/* Name personalization */}
        {firstName && (
          <p className="text-cyan-300/80 text-sm font-medium mb-2 tracking-wide">
            {firstName},
          </p>
        )}

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Vaše čitanje se priprema...
        </h2>

        <p className="text-white/60 text-sm mb-10 h-5 transition-all duration-500">
          {MESSAGES[msgIndex]}
        </p>

        {/* Progress bar */}
        <div className="px-8">
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/30 text-xs mt-3">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}
