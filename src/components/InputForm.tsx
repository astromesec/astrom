import { useState } from 'react';
import { Sparkles, Calendar, User, ChevronRight } from 'lucide-react';

export interface PersonData {
  name: string;
  day: string;
  month: string;
  year: string;
}

interface Props {
  onAnalyze: (p1: PersonData, p2: PersonData) => void;
}

const MONTHS = [
  '1', '2', '3', '4', '5', '6',
  '7', '8', '9', '10', '11', '12',
];

function PersonForm({
  label,
  data,
  onChange,
  accent,
}: {
  label: string;
  data: PersonData;
  onChange: (d: PersonData) => void;
  accent: string;
}) {
  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${accent}`}>
          <User className="w-5 h-5" />
        </div>
        <h3 className="font-serif text-2xl gold-text">{label}</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Ime</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="npr. Marija"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Datum rođenja
          </label>
          <div className="grid grid-cols-3 gap-3">
            <select
              value={data.day}
              onChange={(e) => onChange({ ...data, day: e.target.value })}
              className="input-field"
            >
              <option value="">Dan</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select
              value={data.month}
              onChange={(e) => onChange({ ...data, month: e.target.value })}
              className="input-field"
            >
              <option value="">Mesec</option>
              {MONTHS.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
            <select
              value={data.year}
              onChange={(e) => onChange({ ...data, year: e.target.value })}
              className="input-field"
            >
              <option value="">Godina</option>
              {Array.from({ length: 80 }, (_, i) => {
                const y = 2025 - i;
                return <option key={i} value={y}>{y}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InputForm({ onAnalyze }: Props) {
  const [p1, setP1] = useState<PersonData>({ name: '', day: '', month: '', year: '' });
  const [p2, setP2] = useState<PersonData>({ name: '', day: '', month: '', year: '' });
  const [error, setError] = useState('');

  const isValid = (p: PersonData) =>
    p.name.trim() && p.day && p.month && p.year;

  const handleSubmit = () => {
    if (!isValid(p1) || !isValid(p2)) {
      setError('Molimo popunite sva polja za obe osobe.');
      return;
    }
    setError('');
    onAnalyze(p1, p2);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20 relative z-10">
      <div className="text-center mb-10 animate-fade-in-down">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
          <Sparkles className="w-4 h-4 text-gold-300" />
          <span className="text-sm text-gold-200">AI Astrološka Analiza</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold mb-4">
          <span className="gold-text">AstroMesec</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Otkrijte kompatibilnost dve osobe uz pomoć napredne AI astrološke analize.
          Unesite datume rođenja i pustite da zvezde govore.
        </p>
      </div>

      <div className="space-y-6">
        <PersonForm
          label="Osoba 1"
          data={p1}
          onChange={setP1}
          accent="bg-gold-300/20 text-gold-300"
        />
        <PersonForm
          label="Osoba 2"
          data={p2}
          onChange={setP2}
          accent="bg-gold-500/20 text-gold-400"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-4 text-center animate-fade-in">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        className="btn-gold w-full mt-8 flex items-center justify-center gap-2 text-lg"
      >
        <Sparkles className="w-5 h-5" />
        Pokreni AI analizu
        <ChevronRight className="w-5 h-5" />
      </button>

      <p className="text-center text-gray-500 text-xs mt-6">
        Besplatno · Bez registracije · Rezultati odmah
      </p>
    </div>
  );
}
