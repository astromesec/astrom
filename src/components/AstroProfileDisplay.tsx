import {
  Sparkles, Star, CheckCircle2, AlertTriangle, Lightbulb,
  Moon, RotateCcw, Heart, MessageCircle, Eye, Zap, Calendar,
  ChevronRight,
} from 'lucide-react';
import type { AstroProfile } from '../lib/zodiac';
import type { PersonData } from './InputForm';

interface Props {
  profile: AstroProfile;
  person1: PersonData;
  person2: PersonData;
  onRestart: () => void;
  onToolSelect: (toolId: string) => void;
}

const TOOLS = [
  { id: 'ex-over', title: 'Da li je bivši preboleo?', icon: Heart, desc: 'Saznaj istinu o njegovim osećanjima' },
  { id: 'ex-return', title: 'Da li će ti se bivši javiti?', icon: MessageCircle, desc: 'Otkrij da li se vraća u tvoj život' },
  { id: 'secret-love', title: 'Ko je tajno zaljubljen u tebe?', icon: Eye, desc: 'Otkrij ko krije osećanja prema tebi' },
  { id: 'attract', title: 'Koliko si privlačan?', icon: Zap, desc: 'Saznaj svoj nivo magnetne privlačnosti' },
  { id: 'daily', title: 'Dnevni horoskop', icon: Calendar, desc: 'Tvoj personalizovani dnevni horoskop' },
];

function ScoreRing({ score, size = 160 }: { score: number; size?: number }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="8" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="url(#goldGrad)" strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1500 ease-out"
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5e6c8" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-5xl font-bold gold-text">{score}%</span>
        <span className="text-gray-500 text-xs mt-1">Kompatibilnost</span>
      </div>
    </div>
  );
}

export default function AstroProfileDisplay({
  profile,
  person1,
  person2,
  onRestart,
  onToolSelect,
}: Props) {
  return (
    <div className="min-h-screen px-4 py-8 sm:py-12 relative z-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-4">
            <Moon className="w-4 h-4 text-gold-300" />
            <span className="text-sm text-gold-200">AI Astro Profil</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl gold-text mb-2">Vaš Astro Profil</h2>
          <p className="text-gray-400">{person1.name} i {person2.name}</p>
        </div>

        {/* Total Score */}
        <div className="glass-card rounded-2xl p-8 text-center mb-8 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <ScoreRing score={profile.totalScore} />
          </div>
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl">{profile.sign1.symbol}</div>
              <p className="font-serif text-lg gold-text mt-1">{profile.sign1.name}</p>
              <p className="text-xs text-gray-500">{profile.sign1.element} · {profile.sign1.rulingPlanet}</p>
            </div>
            <div className="text-2xl text-gold-300">♡</div>
            <div className="text-center">
              <div className="text-3xl">{profile.sign2.symbol}</div>
              <p className="font-serif text-lg gold-text mt-1">{profile.sign2.name}</p>
              <p className="text-xs text-gray-500">{profile.sign2.element} · {profile.sign2.rulingPlanet}</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">{profile.summary}</p>
        </div>

        {/* Destiny */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-gold-300" />
            <h3 className="font-serif text-xl gold-text">Sudbina Veze</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">{profile.destiny}</p>
        </div>

        {/* Strengths */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <h3 className="font-serif text-xl text-gray-100">Snage Vaše Veze</h3>
          </div>
          <ul className="space-y-3">
            {profile.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <Star className="w-4 h-4 text-gold-300 mt-1 flex-shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-xl text-gray-100">Izazovi na koje treba obratiti pažnju</h3>
          </div>
          <ul className="space-y-3">
            {profile.challenges.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Advice */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-gold-300" />
            <h3 className="font-serif text-xl gold-text">AI Saveti za Srećnu Vezu</h3>
          </div>
          <ul className="space-y-3">
            {profile.advice.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <Lightbulb className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Tools */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-serif text-2xl gold-text text-center mb-2">Otkrijte Još Alata</h3>
          <p className="text-gray-500 text-center text-sm mb-6">Saznajte više o svojoj ljubavnoj budućnosti</p>
          <div className="space-y-3">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => onToolSelect(tool.id)}
                  className="glass-card glass-card-hover rounded-xl p-5 w-full flex items-center gap-4 text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-300/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-300/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-100">{tool.title}</h4>
                    <p className="text-sm text-gray-500">{tool.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gold-500 group-hover:text-gold-300 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Ad placeholder */}
        <div className="glass-card rounded-xl p-4 text-center mb-8">
          <p className="text-gray-600 text-xs">Reklama</p>
          <div className="h-24 flex items-center justify-center text-gray-700 text-sm">Google AdSense</div>
        </div>

        {/* Restart */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="btn-gold inline-flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Nova Analiza
          </button>
        </div>
      </div>
    </div>
  );
}
