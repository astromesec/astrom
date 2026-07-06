import { useState, useEffect } from 'react';
import { ChevronLeft, Sparkles, RotateCcw } from 'lucide-react';
import { getZodiacSign } from '../lib/zodiac';
import type { PersonData } from './InputForm';

interface Props {
  toolId: string;
  person: PersonData;
  onBack: () => void;
  onRestart: () => void;
}

const TOOL_INFO: Record<string, { title: string; loading: string[] }> = {
  'ex-over': {
    title: 'Da li je bivši preboleo?',
    loading: ['AI analizira bivšu vezu...', 'AI čita energetsku vezu...', 'AI otkriva njegova osećanja...'],
  },
  'ex-return': {
    title: 'Da li će ti se bivši javiti?',
    loading: ['AI proučava energetske linije...', 'AI analizira vremenske linije...', 'AI predviđa kretanje...'],
  },
  'secret-love': {
    title: 'Ko je tajno zaljubljen u tebe?',
    loading: ['AI skenira tvoju auru...', 'AI otkriva tajne obožavaoce...', 'AI analizira signale...'],
  },
  'attract': {
    title: 'Koliko si privlačan?',
    loading: ['AI meri tvoju magnetnu energiju...', 'AI analizira privlačnost...', 'AI izračunava nivo...'],
  },
  'daily': {
    title: 'Dnevni Horoskop',
    loading: ['AI čita zvezde za danas...', 'AI analizira planetarne položaje...', 'AI generiše horoskop...'],
  },
};

function generateResult(toolId: string, person: PersonData): { score?: number; text: string; details: string[] } {
  const sign = getZodiacSign(Number(person.day), Number(person.month));
  const name = person.name || 'Ti';

  switch (toolId) {
    case 'ex-over': {
      const score = 30 + ((Number(person.day) * 3) % 50);
      return {
        score,
        text: score > 55
          ? `Na osnovu tvojih zvezda (${sign.name}), tvoj bivši još uvek nije preboleo vezu. Energetska veza između vas je i dalje jaka, a njegova ${sign.element === 'Voda' ? 'emocionalna priroda' : 'unutarnja borba'} ga drži vezanog za sećanja.`
          : `Tvoj bivši je u procesu prelaska. Zvezde pokazuju da ${sign.name} energija postepeno pronalazi ravnotežu, ali sećanja još uvek tinjaju ispod površine.`,
        details: [
          `${sign.rulingPlanet} utiče na njegovu sposobnost da pusti prošlost.`,
          score > 60 ? 'Njegove emocije su još uvek aktivne — javljanje nije isključeno.' : 'Polako se pomera napred, ali tišina je njegov način zaštite.',
        ],
      };
    }
    case 'ex-return': {
      const score = 25 + ((Number(person.day) * 7) % 55);
      return {
        score,
        text: score > 55
          ? `Zvezde ukazuju na veliku verovatnoću da će se javiti. Kao ${sign.name}, privlačiš ljude svojom ${sign.strengths[0].toLowerCase()}, a energetska nit između vas nije prekinuta.`
          : `Šanse su umerene. ${sign.name} energija ti daje snagu da nastaviš, ali ako se ne javi u skorije vreme, zvezde savetuju da fokus preusmeriš na sebe.`,
        details: [
          `Verovatnoća javljanja u narednih 30 dana: ${score > 60 ? 'visoka' : score > 40 ? 'umerena' : 'niska'}.`,
          `${sign.element} element u tvom znaku ${score > 50 ? 'drži vrata otvorena' : 'podstiče te da pustiš'}.`,
        ],
      };
    }
    case 'secret-love': {
      return {
        text: `Tvoj ${sign.name} znak zrači ${sign.strengths[0].toLowerCase()} koja privlači ljude oko tebe, ${name}. Neko u tvojoj blizini — verovatno iz tvojih svakodnevnih krugova — krije duboka osećanja prema tebi.`,
        details: [
          `Osoba koja tajno misli na tebe deli komplementarnu energiju sa tvojim ${sign.element} elementom.`,
          `Obrati pažnju na nekoga ko je nedavno postao posebno pažljiv prema tebi — znakovi su suptilni ali prisutni.`,
          `${sign.rulingPlanet} pojačava tvoju magnetnu privlačnost ovog meseca.`,
        ],
      };
    }
    case 'attract': {
      const score = 60 + ((Number(person.day) * 13) % 38);
      return {
        score,
        text: `${name}, tvoj nivo privlačnosti je ${score}%! Kao ${sign.name}, tvoja ${sign.strengths[0].toLowerCase()} je glavni izvor magnetne energije. Ljudi te primećuju čak i kad ti to ne želiš.`,
        details: [
          `Fizička privlačnost: ${Math.min(score + 5, 98)}%`,
          `Karizma: ${Math.min(score - 3, 95)}%`,
          `Energetski magnetizam: ${score}%`,
          `Tvoj ${sign.element} element ti daje prirodnu ${sign.element === 'Vatra' ? 'vatru' : sign.element === 'Voda' ? 'dubinu' : sign.element === 'Zemlja' ? 'stabilnost' : 'lakoću'}.`,
        ],
      };
    }
    case 'daily': {
      const today = new Date();
      const dayNum = today.getDate();
      const mood = dayNum % 3 === 0 ? 'odličan' : dayNum % 3 === 1 ? 'uravnotežen' : 'izazovan';
      return {
        text: `${name}, današnji dan za ${sign.name} je ${mood}. ${sign.element} energija u tvem znaku ${dayNum % 2 === 0 ? 'donosi prilike za ljubav i kreativnost' : 'zahteva strpljenje i refleksiju'}.`,
        details: [
          `Ljubav: ${dayNum % 2 === 0 ? 'Nova romansa na horizontu' : 'Neguj postojeću vezu'}`,
          `Karijera: ${dayNum % 3 === 0 ? 'Pronađi priliku za rast' : 'Fokusiraj se na detalje'}`,
          `Zdravlje: ${dayNum % 2 === 0 ? 'Energija je visoka' : 'Odmor je potreban'}`,
          `Srećan broj: ${(dayNum * 3) % 99 + 1}`,
          `Srećna boja: ${['zlatna', 'plava', 'zelena', 'crvena', 'ljubičasta'][dayNum % 5]}`,
        ],
      };
    }
    default:
      return { text: 'Rezultat nije dostupan.', details: [] };
  }
}

export default function ToolResult({ toolId, person, onBack, onRestart }: Props) {
  const [loading, setLoading] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);
  const [result, setResult] = useState<{ score?: number; text: string; details: string[] } | null>(null);

  const info = TOOL_INFO[toolId] || TOOL_INFO['daily'];

  useEffect(() => {
    setLoading(true);
    setResult(null);
    setMsgIndex(0);

    const msgInt = setInterval(() => {
      setMsgIndex((i) => (i + 1) % info.loading.length);
    }, 1100);

    const timeout = setTimeout(() => {
      setResult(generateResult(toolId, person));
      setLoading(false);
    }, 3500);

    return () => {
      clearInterval(msgInt);
      clearTimeout(timeout);
    };
  }, [toolId]);

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12 relative z-10">
      <div className="max-w-xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-gold-300 transition-colors mb-6 text-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Nazad
        </button>

        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl gold-text mb-2">{info.title}</h2>
          <p className="text-gray-500">Za {person.name || 'tebe'}</p>
        </div>

        {loading ? (
          <div className="glass-card rounded-2xl p-10 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-gold-300/20"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-gold-300 animate-spin-slow"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-gold-300 animate-pulse-gold" />
              </div>
            </div>
            <p className="text-gray-300 h-6 animate-fade-in" key={msgIndex}>{info.loading[msgIndex]}</p>
          </div>
        ) : result ? (
          <div className="animate-fade-in-up">
            <div className="glass-card rounded-2xl p-6 sm:p-8 mb-6">
              {result.score !== undefined && (
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-gold-300/30 mb-4">
                    <span className="font-serif text-4xl gold-text">{result.score}%</span>
                  </div>
                </div>
              )}
              <p className="text-gray-200 leading-relaxed text-lg mb-6">{result.text}</p>
              <ul className="space-y-3">
                {result.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                    <Sparkles className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-xl p-4 text-center mb-6">
              <p className="text-gray-600 text-xs">Reklama</p>
              <div className="h-24 flex items-center justify-center text-gray-700 text-sm">Google AdSense</div>
            </div>

            <div className="flex gap-3">
              <button onClick={onBack} className="btn-gold flex-1 flex items-center justify-center gap-2">
                <ChevronLeft className="w-5 h-5" /> Nazad na profil
              </button>
              <button
                onClick={onRestart}
                className="px-6 py-4 rounded-xl glass-card glass-card-hover text-gray-300 flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
