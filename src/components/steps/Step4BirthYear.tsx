import { useMemo } from "react";

interface Props {
  decade: string; // očekujemo format "YYYY–YYYY"
  onSelect: (year: number) => void;
}

export default function Step4BirthYear({ decade, onSelect }: Props) {
  const years = useMemo(() => {
    const start = Number(String(decade).slice(0, 4));
    const startYear = Number.isFinite(start) ? start : 2000; // fallback da ne puca UI

    return Array.from({ length: 10 }, (_, i) => startYear + i);
  }, [decade]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Godina rođenja</h1>
          <p className="text-white/70 text-sm sm:text-base">
            Koju godinu ste rođeni?
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl p-6 sm:p-8">
          <div className="grid grid-cols-3 gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => onSelect(year)}
                className="bg-white/10 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 rounded-lg p-4 sm:p-5 flex items-center justify-center text-base sm:text-lg font-bold text-white/80 hover:text-white transition-all duration-300 active:scale-95 border border-white/20 hover:border-blue-400"
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
