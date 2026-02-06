import { useEffect } from "react";

interface Props {
  onComplete: () => void;
}

export default function Step8Calculating({ onComplete }: Props) {
  useEffect(() => {
    // ✅ deluje realnije nego fiksnih 3s
    const ms = 4000 + Math.floor(Math.random() * 2000); // 4–6s

    const timer = setTimeout(() => {
      onComplete();
    }, ms);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-12">
          <div className="inline-block relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 animate-pulse"></div>
            <div className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 animate-ping opacity-75"></div>
          </div>
        </div>

        <div className="mb-8 px-4">
          <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden border border-white/20">
            <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Pripremamo vaše čitanje...
        </h2>
        <p className="text-white/70 text-sm sm:text-base">
          Analiziramo vaše podatke i jedinstveni astrološki profil.
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

