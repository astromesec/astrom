import { useState } from "react";

interface Props {
  onSubmit: (hour: number, minute: number) => void;
}

export default function Step6BirthtimeSelect({ onSubmit }: Props) {
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Vreme rođenja</h1>
          <p className="text-white/70 text-sm sm:text-base">
            Ako ne znate tačno, približan iznos je dovoljan.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-end gap-3 justify-center">
            <div className="flex-1">
              <label className="block text-xs font-medium text-white/70 uppercase tracking-wider mb-3 text-center">Sat</label>
              <select
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                className="w-full px-3 py-3 text-center text-xl sm:text-2xl font-bold bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                {hours.map((h) => (
                  <option key={h} value={h} className="bg-slate-900">
                    {h.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-2xl font-bold text-white/40 mb-1">:</div>

            <div className="flex-1">
              <label className="block text-xs font-medium text-white/70 uppercase tracking-wider mb-3 text-center">Minut</label>
              <select
                value={minute}
                onChange={(e) => setMinute(Number(e.target.value))}
                className="w-full px-3 py-3 text-center text-xl sm:text-2xl font-bold bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 transition-colors"
              >
                {minutes.map((m) => (
                  <option key={m} value={m} className="bg-slate-900">
                    {m.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => onSubmit(hour, minute)}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none"
          >
            Nastavi
          </button>
        </div>
      </div>
    </div>
  );
}
