import { useEffect, useState } from "react";
import {
  textReadings,
  zodiacLabels,
  normalizeSignKey,
  gumroadBuyLinks,
} from "../../data/textReadings";

interface Props {
  firstName: string;
  zodiacSign: string;
  onContinue: () => void;
}

export default function Step10FreeReading({ firstName, zodiacSign }: Props) {
  const signKey = normalizeSignKey(zodiacSign);
  const reading = textReadings[signKey] || textReadings["bik"];
  const label = zodiacLabels[signKey] || zodiacSign;
  const name = firstName?.trim() || "Prijatelju";
  const buyLink = gumroadBuyLinks[signKey] || gumroadBuyLinks["bik"];

  const [visibleCount, setVisibleCount] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [hasLogged, setHasLogged] = useState(false);

  // Postepeno otkrivanje pasusa da čitanje deluje "uživo", zatim CTA.
  useEffect(() => {
    setVisibleCount(0);
    setShowCTA(false);

    const timers: number[] = [];
    reading.paragraphs.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => setVisibleCount(i + 1), 500 + i * 900)
      );
    });
    timers.push(
      window.setTimeout(
        () => setShowCTA(true),
        500 + reading.paragraphs.length * 900 + 400
      )
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [signKey]);

  useEffect(() => {
    if (showCTA && !hasLogged) {
      setHasLogged(true);
      onContinue();
    }
  }, [showCTA, hasLogged, onContinue]);

  const goToCheckout = () => {
    window.open(buyLink, "_blank", "noopener,noreferrer");
  };

  const injectName = (text: string) => text.replaceAll("{name}", name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6 rounded-full" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {name}, tvoje čitanje je spremno
          </h1>
          <p className="text-white/60 text-sm">
            Besplatno Mesečevo čitanje za {label}
          </p>
        </div>

        {/* Reading card */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0 text-xl">
                {reading.emoji}
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">{label}</div>
                <div className="text-white/50 text-xs">{reading.hook}</div>
              </div>
            </div>

            <div className="space-y-4">
              {reading.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-white/85 text-sm sm:text-base leading-relaxed transition-all duration-700 ${
                    i < visibleCount
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none select-none"
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {injectName(p)}
                </p>
              ))}
            </div>

            {visibleCount >= reading.paragraphs.length && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-700">
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/20 p-3">
                  <p className="text-emerald-300 text-xs font-semibold mb-1">
                    ✓ Tvoja snaga
                  </p>
                  <p className="text-white/80 text-xs">{reading.strength}</p>
                </div>
                <div className="rounded-xl bg-amber-500/10 border border-amber-400/20 p-3">
                  <p className="text-amber-300 text-xs font-semibold mb-1">
                    ⚠ Na šta pripaziti
                  </p>
                  <p className="text-white/80 text-xs">{reading.watch}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA za premium audio */}
        {showCTA && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl animate-in fade-in duration-700">
            <div className="p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs mb-5">
                <span>🎧</span>
                <span>Ovo je bio samo pisani deo</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                Tvoje puno čitanje čeka — u audio formatu
              </h2>
              <p className="text-white/80 text-sm mb-5">
                Tekst ti je otkrio ko si. Premium audio čitanje ti govori{" "}
                <b>šta dalje</b> — izgovoreno naglas, lično za {label}, sa
                detaljima koje ovde nismo ni dotakli.
              </p>

              <ul className="space-y-2 text-left mb-6 text-white/80 text-sm max-w-sm mx-auto">
                <li className="flex gap-2 items-start">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span>
                    <b>Ljubav:</b> ko ti "pali okidače" i zašto
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span>
                    <b>Novac:</b> gde curi energija i kako da presečeš
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-blue-400 flex-shrink-0">✓</span>
                  <span>
                    <b>Sledeći koraci:</b> tačno šta da uradiš dalje
                  </span>
                </li>
              </ul>

              <button
                onClick={goToCheckout}
                className="w-full px-6 py-4 rounded-full font-extrabold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg transition-all active:scale-95 text-base"
              >
                🎧 OTKLJUČAJ AUDIO ČITANJE
              </button>

              <div className="mt-3 text-white/60 text-xs">
                Jednokratna kupovina • Pristup odmah • Digitalni sadržaj
              </div>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
}
