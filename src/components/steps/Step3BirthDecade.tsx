interface Props {
  onSelect: (decade: string) => void;
}

export default function Step3BirthDecade({ onSelect }: Props) {
  const decades = [
    "1900–1909",
    "1910–1919",
    "1920–1929",
    "1930–1939",
    "1940–1949",
    "1950–1959",
    "1960–1969",
    "1970–1979",
    "1980–1989",
    "1990–1999",
    "2000–2009",
    "2010–2019",
    "2020–2029",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dekada rođenja</h1>
          <p className="text-white/70 text-sm sm:text-base">
            U kojoj dekadi ste rođeni?
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-3">
            {decades.map((decade) => (
              <button
                key={decade}
                onClick={() => onSelect(decade)}
                className="bg-white/10 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 rounded-xl p-4 sm:p-5 flex items-center justify-center text-sm sm:text-base font-semibold text-white/80 hover:text-white transition-all duration-300 active:scale-95 border border-white/20 hover:border-blue-400"
              >
                {decade}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

