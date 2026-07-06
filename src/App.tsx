import { useState } from 'react';
import Starfield from './components/Starfield';
import InputForm, { type PersonData } from './components/InputForm';
import LoadingScreen from './components/LoadingScreen';
import ResultsDisplay from './components/ResultsDisplay';
import AstroProfileDisplay from './components/AstroProfileDisplay';
import ToolResult from './components/ToolResult';
import {
  getZodiacSign,
  calculateCompatibility,
  generateAstroProfile,
  type CompatibilityResult,
  type AstroProfile,
} from './lib/zodiac';

type Stage = 'input' | 'loading' | 'results' | 'profile' | 'tool';

export default function App() {
  const [stage, setStage] = useState<Stage>('input');
  const [person1, setPerson1] = useState<PersonData | null>(null);
  const [person2, setPerson2] = useState<PersonData | null>(null);
  const [results, setResults] = useState<CompatibilityResult[]>([]);
  const [profile, setProfile] = useState<AstroProfile | null>(null);
  const [activeTool, setActiveTool] = useState<string>('');

  const handleAnalyze = (p1: PersonData, p2: PersonData) => {
    setPerson1(p1);
    setPerson2(p2);
    setStage('loading');

    setTimeout(() => {
      const sign1 = getZodiacSign(Number(p1.day), Number(p1.month));
      const sign2 = getZodiacSign(Number(p2.day), Number(p2.month));
      const { total, results: res } = calculateCompatibility(sign1, sign2);
      const prof = generateAstroProfile(sign1, sign2, total, p1.name, p2.name);

      setResults(res);
      setProfile(prof);
      setStage('results');
    }, 4000);
  };

  const handleRestart = () => {
    setStage('input');
    setPerson1(null);
    setPerson2(null);
    setResults([]);
    setProfile(null);
    setActiveTool('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToolSelect = (toolId: string) => {
    setActiveTool(toolId);
    setStage('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      <Starfield />

      {stage === 'input' && <InputForm onAnalyze={handleAnalyze} />}

      {stage === 'loading' && <LoadingScreen />}

      {stage === 'results' && person1 && person2 && (
        <ResultsDisplay
          results={results}
          person1={person1}
          person2={person2}
          onComplete={() => {
            setStage('profile');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onRestart={handleRestart}
        />
      )}

      {stage === 'profile' && profile && person1 && person2 && (
        <AstroProfileDisplay
          profile={profile}
          person1={person1}
          person2={person2}
          onRestart={handleRestart}
          onToolSelect={handleToolSelect}
        />
      )}

      {stage === 'tool' && person1 && (
        <ToolResult
          toolId={activeTool}
          person={person1}
          onBack={() => {
            setStage('profile');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onRestart={handleRestart}
        />
      )}

      {/* Footer */}
      {stage !== 'loading' && (
        <footer className="relative z-10 py-8 px-4 text-center border-t border-gold-700/10 mt-12">
          <p className="font-serif text-lg gold-text mb-2">AstroMesec.shop</p>
          <p className="text-gray-600 text-xs max-w-md mx-auto">
            AI astrološka analiza za zabavu i refleksiju. Rezultati su zasnovani na astrološkim tradicijama
            i ne predstavljaju profesionalni savet.
          </p>
          <p className="text-gray-700 text-xs mt-3">© 2026 AstroMesec.shop · Sva prava zadržana</p>
        </footer>
      )}
    </div>
  );
}
