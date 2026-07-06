import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const MESSAGES = [
  'AI analizira podatke...',
  'AI upoređuje horoskopske znakove...',
  'AI proučava elemente i kvalitete...',
  'AI izračunava ljubavnu kompatibilnost...',
  'AI generiše astro profil...',
  'AI finalizira rezultate...',
];

export default function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100));
    }, 60);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="text-center max-w-md w-full">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-gold-300/20"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-gold-300 animate-spin-slow"></div>
          <div className="absolute inset-3 rounded-full border-2 border-gold-500/20"></div>
          <div className="absolute inset-3 rounded-full border-b-2 border-gold-400 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-gold-300 animate-pulse-gold" />
          </div>
        </div>

        <h2 className="font-serif text-3xl gold-text mb-3">AI Analiza u Toku</h2>

        <p className="text-gray-300 text-lg mb-8 h-7 transition-all duration-500 animate-fade-in" key={msgIndex}>
          {MESSAGES[msgIndex]}
        </p>

        <div className="progress-bar max-w-xs mx-auto">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-gold-300 text-sm mt-2">{progress}%</p>
      </div>
    </div>
  );
}
