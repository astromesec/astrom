import { useState } from "react";
import { Lock, Shield } from "lucide-react";

interface Props {
  firstName: string;
  onComplete: (email: string) => void;
}

export default function Step11Checkout({ firstName, onComplete }: Props) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onComplete(email);
  };

  const name = firstName?.trim() ? firstName.trim() : "Vaše";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-8 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🌙</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">Mesečevo tumačenje</h1>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Lock className="w-4 h-4" />
                  <span>Siguran checkout</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {name}, još samo malo
            </h2>
            <p className="text-white/70 mb-6 text-sm">
              Email se koristi samo za pristup i isporuku.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-3">
                  Email adresa
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vas@email.com"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors text-base"
                />
              </div>

              <button
                type="submit"
                disabled={!email}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 sm:py-4 px-8 rounded-full transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 text-base sm:text-lg"
              >
                <Lock className="w-5 h-5" />
                Nastavi na plaćanje
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-white/60 pt-2">
                <Shield className="w-4 h-4" />
                <span>Siguran proces — kartice se ne unose ovde</span>
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Šta dobijate</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">🌙</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Premium Moon Reading</h3>
                  <p className="text-white/70 text-sm">Personalizovano čitanje sa dubljim uvidima</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-xl">✓</div>
                <div>
                  <p className="text-white/90 text-sm"><b>Ljubav:</b> ko ti pali okidače i kako prepoznaš pravu osobu</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-xl">✓</div>
                <div>
                  <p className="text-white/90 text-sm"><b>Novac:</b> gde curi energija i kako da presečeš</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-xl">✓</div>
                <div>
                  <p className="text-white/90 text-sm"><b>Praktični koraci:</b> šta da uradiš dalje</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between mb-3">
                <span className="text-white/70">Cena</span>
                <span className="text-white font-semibold">$11.00</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-white">
                <span>UKUPNO</span>
                <span>$11.00</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
              <p className="text-emerald-300 text-sm font-medium">✓ Garancija od 30 dana - 100% vraćanja novca</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/50">
          <p>
            Pitanja? Piši nam na{" "}
            <a href="mailto:support@moonreading.com" className="text-blue-400 hover:text-blue-300">
              support@moonreading.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
