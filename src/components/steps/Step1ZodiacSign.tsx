import { zodiacSigns } from '../../types/reading';

interface Props {
  onSelect: (sign: string) => void;
}

export default function Step1ZodiacSign({ onSelect }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6 rounded-full" />
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">🌙</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Mesečevo tumačenje</h1>
          </div>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Na osnovu vašeg datuma rođenja, Mesec otkriva vašu skrivenu životnu svrhu
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {zodiacSigns.map((sign) => (
            <button
              key={sign.id}
              onClick={() => onSelect(sign.id)}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-blue-400/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col items-center gap-2 group"
            >
              <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">
                {sign.icon}
              </span>
              <span className="text-xs sm:text-sm font-medium text-white/80">{sign.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}