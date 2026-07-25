import { useState } from "react";

interface Props {
  onSubmit: (name: string) => void;
}

export default function Step9FirstName({ onSubmit }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = name.trim();
    if (clean) onSubmit(clean);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Kako se zovete?</h1>
          <p className="text-white/70 text-sm sm:text-base">
            Ovo čitanje će zvučati lično i prirodnije za vas.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">Ime:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Unesite svoje ime"
                className="w-full px-4 py-3 text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none"
            >
              Nastavi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
