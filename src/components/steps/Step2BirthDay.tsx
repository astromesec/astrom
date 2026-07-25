interface Props {
  zodiacSign: string;
  onSelect: (day: number) => void;
}

export default function Step2BirthDay({ zodiacSign, onSelect }: Props) {
  // ✅ mapiranje: šta god da Step1 šalje, pretvori u ENG key koji koristi zodiacDates
  const normalizeSign = (s: string) => {
    const key = (s || "").trim().toLowerCase();

    const map: Record<string, string> = {
      // SR
      ovan: "aries",
      bik: "taurus",
      blizanci: "gemini",
      rak: "cancer",
      lav: "leo",
      devica: "virgo",
      vaga: "libra",
      skorpija: "scorpio",
      škorpija: "scorpio",
      strelac: "sagittarius",
      jarac: "capricorn",
      vodolija: "aquarius",
      ribe: "pisces",

      // već ENG (ako šalješ eng id)
      aries: "aries",
      taurus: "taurus",
      gemini: "gemini",
      cancer: "cancer",
      leo: "leo",
      virgo: "virgo",
      libra: "libra",
      scorpio: "scorpio",
      sagittarius: "sagittarius",
      capricorn: "capricorn",
      aquarius: "aquarius",
      pisces: "pisces",
    };

    return map[key] || key;
  };

  const zodiacDates: Record<
    string,
    { startDay: number; startMonth: string; endDay: number; endMonth: string }
  > = {
    aries: { startDay: 21, startMonth: "Mart", endDay: 19, endMonth: "April" },
    taurus: { startDay: 20, startMonth: "April", endDay: 20, endMonth: "Maj" },
    gemini: { startDay: 21, startMonth: "Maj", endDay: 20, endMonth: "Jun" },
    cancer: { startDay: 21, startMonth: "Jun", endDay: 22, endMonth: "Jul" },
    leo: { startDay: 23, startMonth: "Jul", endDay: 22, endMonth: "Avgust" },
    virgo: { startDay: 23, startMonth: "Avgust", endDay: 22, endMonth: "Septembar" },
    libra: { startDay: 23, startMonth: "Septembar", endDay: 22, endMonth: "Oktobar" },
    scorpio: { startDay: 23, startMonth: "Oktobar", endDay: 21, endMonth: "Novembar" },
    sagittarius: { startDay: 22, startMonth: "Novembar", endDay: 21, endMonth: "Decembar" },
    capricorn: { startDay: 22, startMonth: "Decembar", endDay: 19, endMonth: "Januar" },
    aquarius: { startDay: 20, startMonth: "Januar", endDay: 18, endMonth: "Februar" },
    pisces: { startDay: 19, startMonth: "Februar", endDay: 20, endMonth: "Mart" },
  };

  const signKey = normalizeSign(zodiacSign);

  const dateRange =
    zodiacDates[signKey] || {
      startDay: 1,
      startMonth: "Januar",
      endDay: 31,
      endMonth: "Januar",
    };

  const daysInMonth: Record<string, number> = {
    Januar: 31,
    Februar: 28,
    Mart: 31,
    April: 30,
    Maj: 31,
    Jun: 30,
    Jul: 31,
    Avgust: 31,
    Septembar: 30,
    Oktobar: 31,
    Novembar: 30,
    Decembar: 31,
  };

  const dayObjects: { day: number; month: string }[] = [];
  const maxDaysInStartMonth = daysInMonth[dateRange.startMonth] || 31;

  for (let i = dateRange.startDay; i <= maxDaysInStartMonth; i++) {
    dayObjects.push({ day: i, month: dateRange.startMonth });
  }
  for (let i = 1; i <= dateRange.endDay; i++) {
    dayObjects.push({ day: i, month: dateRange.endMonth });
  }

  const firstMonth = dayObjects[0]?.month;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dan rođenja</h1>
          <p className="text-white/70 text-sm sm:text-base">
            {dateRange.startMonth} {dateRange.startDay} – {dateRange.endMonth} {dateRange.endDay}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl p-6 sm:p-8">
          <div className="space-y-6">
            {dayObjects.length > 0 && (
              <>
                <div>
                  <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">{firstMonth}</h3>
                  <div className="grid grid-cols-7 gap-1.5">
                    {dayObjects
                      .filter((d) => d.month === firstMonth)
                      .map((dayObj) => (
                        <button
                          key={`${dayObj.day}-${dayObj.month}`}
                          onClick={() => onSelect(dayObj.day)}
                          className="aspect-square bg-white/10 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 rounded-lg flex items-center justify-center text-white/80 hover:text-white text-sm font-medium transition-all duration-300 active:scale-95 border border-white/20 hover:border-blue-400"
                        >
                          {dayObj.day}
                        </button>
                      ))}
                  </div>
                </div>

                {dayObjects.some((d) => d.month !== firstMonth) && (
                  <div>
                    <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                      {dayObjects.find((d) => d.month !== firstMonth)?.month}
                    </h3>
                    <div className="grid grid-cols-7 gap-1.5">
                      {dayObjects
                        .filter((d) => d.month !== firstMonth)
                        .map((dayObj) => (
                          <button
                            key={`${dayObj.day}-${dayObj.month}`}
                            onClick={() => onSelect(dayObj.day)}
                            className="aspect-square bg-white/10 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 rounded-lg flex items-center justify-center text-white/80 hover:text-white text-sm font-medium transition-all duration-300 active:scale-95 border border-white/20 hover:border-blue-400"
                          >
                            {dayObj.day}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
