interface Props {
  birthDay: number;
  birthYear: number;
  onAnswer: (knows: boolean) => void;
}

export default function Step5BirthtimeQuestion({ birthDay, birthYear, onAnswer }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="h-1 w-32 sm:w-40 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Vreme rođenja</h1>
          <p className="text-white/70 mb-2 text-sm">
            {birthDay}. dan, {birthYear}. godine
          </p>
          <p className="text-white/90 font-medium text-base">
            Da li znate vreme rođenja?
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl overflow-hidden shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onAnswer(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Da
            </button>
            <button
              onClick={() => onAnswer(false)}
              className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 active:scale-95"
            >
              Ne
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
