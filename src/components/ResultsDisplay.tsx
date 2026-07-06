import { useState } from 'react';
import {
  Heart, Sparkles, MessageCircle, Flame, Shield, Brain,
  Infinity, Zap, HeartHandshake, Target, Swords, Moon,
  ChevronRight, RotateCcw, Star,
} from 'lucide-react';
import type { CompatibilityResult } from '../lib/zodiac';
import { getZodiacSign } from '../lib/zodiac';
import type { PersonData } from './InputForm';

const ICON_MAP: Record<string, typeof Heart> = {
  heart: Heart,
  sparkles: Sparkles,
  'message-circle': MessageCircle,
  flame: Flame,
  shield: Shield,
  brain: Brain,
  infinity: Infinity,
  zap: Zap,
  'heart-handshake': HeartHandshake,
  target: Target,
  swords: Swords,
  moon: Moon,
};

interface Props {
  results: CompatibilityResult[];
  person1: PersonData;
  person2: PersonData;
  onComplete: () => void;
  onRestart: () => void;
}

function ResultCard({ result, index }: { result: CompatibilityResult; index: number }) {
  const Icon = ICON_MAP[result.icon] || Star;
  return (
    <div
      className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gold-300/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-gold-300" />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold text-gray-100 mb-1">{result.title}</h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-midnight-200 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${result.score}%`,
                  background: 'linear-gradient(90deg, #b8860b 0%, #d4af37 50%, #f5e6c8 100%)',
                }}
              />
            </div>
            <span className="text-gold-300 font-semibold text-sm">{result.score}%</span>
          </div>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed mb-4">{result.description}</p>

      <ul className="space-y-2">
        {result.details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
            <Star className="w-3.5 h-3.5 text-gold-500 mt-0.5 flex-shrink-0" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResultsDisplay({
  results,
  person1,
  person2,
  onComplete,
  onRestart,
}: Props) {
  const [step, setStep] = useState(0);
  const totalSteps = Math.ceil(results.length / 2);

  const sign1 = getZodiacSign(Number(person1.day), Number(person1.month));
  const sign2 = getZodiacSign(Number(person2.day), Number(person2.month));

  const currentResults = results.slice(step * 2, step * 2 + 2);
  const isLastStep = step === totalSteps - 1;

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12 relative z-10">
      <div className="max-w-2xl mx-auto">
        {/* Header with signs */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-1">{sign1.symbol}</div>
              <p className="font-serif text-lg gold-text">{person1.name}</p>
              <p className="text-xs text-gray-500">{sign1.name}</p>
            </div>
            <div className="text-2xl text-gold-300">♡</div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-1">{sign2.symbol}</div>
              <p className="font-serif text-lg gold-text">{person2.name}</p>
              <p className="text-xs text-gray-500">{sign2.name}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-48 sm:w-64 progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          <p className="text-gold-300 text-sm">Korak {step + 1} od {totalSteps}</p>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {currentResults.map((result, i) => (
            <ResultCard key={step * 2 + i} result={result} index={i} />
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <button
            onClick={onRestart}
            className="text-gray-400 hover:text-gold-300 transition-colors text-sm flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Nova analiza
          </button>

          {isLastStep ? (
            <button
              onClick={onComplete}
              className="btn-gold flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Pogledaj AI Astro Profil
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                setStep((s) => s + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-gold flex items-center gap-2"
            >
              Dalje
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Ad placeholder */}
        <div className="mt-8 glass-card rounded-xl p-4 text-center">
          <p className="text-gray-600 text-xs">Reklama</p>
          <div className="h-24 flex items-center justify-center text-gray-700 text-sm">
            Google AdSense
          </div>
        </div>
      </div>
    </div>
  );
}
