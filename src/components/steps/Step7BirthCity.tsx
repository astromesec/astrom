import { useMemo, useState } from "react";

interface Props {
  onSubmit: (country: string, city: string) => void;
}

export default function Step7BirthCity({ onSubmit }: Props) {
  const [country, setCountry] = useState("Srbija");
  const [city, setCity] = useState("");

  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  const canSubmit = useMemo(() => {
    const c = country.trim();
    const ct = city.trim();
    if (!c || !ct) return false;
    return true;
  }, [country, city]);

  const handleSubmit = () => {
    const c = country.trim();
    const ct = city.trim();

    if (!c || !ct) return;

    onSubmit(c, ct);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Grad rođenja</h1>
          <p className="text-white/70 text-sm sm:text-base">
            Za najpreciznije čitanje, izaberite svoj grad.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-3">Država:</label>
            <select
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors text-base"
            >
              <option value="Srbija" className="bg-slate-900">Srbija</option>
              <option value="Hrvatska" className="bg-slate-900">Hrvatska</option>
              <option value="Bosna i Hercegovina" className="bg-slate-900">Bosna i Hercegovina</option>
              <option value="Crna Gora" className="bg-slate-900">Crna Gora</option>
              <option value="Slovenija" className="bg-slate-900">Slovenija</option>
              <option value="Severna Makedonija" className="bg-slate-900">Severna Makedonija</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-3">Grad:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Npr. Beograd"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors text-base"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none"
          >
            Nastavi
          </button>
        </div>
      </div>
    </div>
  );
}
