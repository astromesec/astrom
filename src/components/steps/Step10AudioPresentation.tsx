import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
firstName: string;
zodiacSign: string;
onContinue: () => void;
}

const AUDIO_BASE = "https://pub-7392e5eb1eb343e891a06e78c25e5db9.r2.dev";
const LOCK_SECONDS = 3 * 60;
const SEEK_BUFFER = 0.75;

function normalizeKey(v: string) {
return (v || "").toLowerCase().trim();
}

function formatCountdown(seconds: number) {
const s = Math.max(0, Math.floor(seconds));
const m = Math.floor(s / 60);
const r = s % 60;
return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function Step10AudioPresentation({ firstName, zodiacSign }: Props) {
const audioRef = useRef<HTMLAudioElement | null>(null);

const maxListenedRef = useRef<number>(0);
const isProgrammaticSeekRef = useRef<boolean>(false);

const [isReady, setIsReady] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);
const [hasStarted, setHasStarted] = useState(false);

const [duration, setDuration] = useState(0);
const [currentTime, setCurrentTime] = useState(0);

const [isLocked, setIsLocked] = useState(false);
const [ctaPulse, setCtaPulse] = useState(false);

const fileKey = useMemo(() => {
const map: Record<string, string> = {
aries: "ovan",
taurus: "bik",
gemini: "blizanci",
cancer: "rak",
leo: "lav",
virgo: "devica",
libra: "vaga",
scorpio: "skorpija",
sagittarius: "strelac",
capricorn: "jarac",
aquarius: "vodolija",
pisces: "ribe",
ovan: "ovan",
bik: "bik",
blizanci: "blizanci",
rak: "rak",
lav: "lav",
devica: "devica",
vaga: "vaga",
skorpija: "skorpija",
strelac: "strelac",
jarac: "jarac",
vodolija: "vodolija",
ribe: "ribe",
};

```
return map[normalizeKey(zodiacSign)] || "bik";
```

}, [zodiacSign]);

const zodiacLabel = fileKey.charAt(0).toUpperCase() + fileKey.slice(1);

const audioFilename = useMemo(() => {
const files: Record<string, string> = {
ovan: "Ovan%20ceo.mp3",
bik: "Bik%20ceo.mp3",
blizanci: "Blizanci%20ceo.mp3",
rak: "Rak%20ceo.mp3",
lav: "Lav%20ceo.mp3",
devica: "Devica%20ceo.mp3",
vaga: "Vaga%20ceo.mp3",
skorpija: "Skorpija%20ceo.mp3",
strelac: "Strelac%20ceo.mp3",
jarac: "Jarac%20ceo.mp3",
vodolija: "Vodolija%20ceo.mp3",
ribe: "Ribe%20ceo.mp3",
};

```
return files[fileKey] || files.bik;
```

}, [fileKey]);

const audioSrc = `${AUDIO_BASE}/${audioFilename}`;

const buyLink = useMemo(() => {
const base = "https://payhip.com/b";

```
const links: Record<string, string> = {
  strelac: `${base}/ug3mn`,
  bik: `${base}/SyfsI`,
  blizanci: `${base}/L9RJT`,
  devica: `${base}/8LRwe`,
  lav: `${base}/c8yDV`,
  ovan: `${base}/fc4dL`,
  rak: `${base}/jZslA`,
  ribe: `${base}/vdIec`,
  skorpija: `${base}/k1Xz6`,
  vaga: `${base}/l0bYz`,
  jarac: `${base}/34Ae9`,
  vodolija: `${base}/ACNjr`,
};

return links[fileKey] || links.bik;
```

}, [fileKey]);

useEffect(() => {
const a = audioRef.current;
if (!a) return;

```
const onLoadedMetadata = () => {
  setIsReady(true);
  setDuration(a.duration || 0);
};

const onTimeUpdate = () => {
  const t = a.currentTime || 0;
  setCurrentTime(t);

  if (t > maxListenedRef.current) {
    maxListenedRef.current = t;
  }

  if (!isLocked && t >= LOCK_SECONDS) {
    setIsLocked(true);
    a.pause();
  }
};

a.addEventListener("loadedmetadata", onLoadedMetadata);
a.addEventListener("timeupdate", onTimeUpdate);

return () => {
  a.removeEventListener("loadedmetadata", onLoadedMetadata);
  a.removeEventListener("timeupdate", onTimeUpdate);
};
```

}, [isLocked]);

const progress = Math.min(100, (currentTime / LOCK_SECONDS) * 100);

const togglePlay = async () => {
const a = audioRef.current;
if (!a) return;

```
if (a.paused) await a.play();
else a.pause();
```

};

const goToCheckout = () => {
window.open(buyLink, "_blank");
};

return ( <div className="min-h-screen flex items-center justify-center p-4"> <div className="w-full max-w-xl text-center">

```
    <h1 className="text-2xl font-bold mb-4">
      {firstName} – {zodiacLabel}
    </h1>

    <button onClick={togglePlay}>▶</button>

    <div className="w-full h-2 bg-gray-200 my-4">
      <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
    </div>

    {!isLocked ? (
      <p>Preview traje...</p>
    ) : (
      <div className="mt-6 text-left">

        <div className="font-bold text-center mb-4">
          Šta kažu ljudi koji su kupili:
        </div>

        <div className="space-y-3 text-sm">
          <div>“Stalno iste veze, sada razumem obrazac i prekinuo sam to.” — Nikola</div>
          <div>“Prestao sam da overthinkujem jer sam razumeo uzrok.” — Stefan</div>
          <div>“Objasnilo mi je gde grešim u odnosima.” — Milica</div>
          <div>“Dobio sam konkretan smer u životu.” — Marko</div>
          <div>“Razumeo sam svoj način razmišljanja.” — Ana</div>
          <div>“Pogodilo me gde sabotiram sebe.” — Luka</div>
          <div>“Ovo nije horoskop, ovo je analiza.” — Jelena</div>
          <div>“Doneo sam odluku koju sam odlagao 2 godine.” — Marija</div>
        </div>

        <div className="text-center mt-5 mb-4">
          <div>Jednokratno</div>
          <div className="text-2xl font-bold">7€</div>
        </div>

        <button
          onClick={goToCheckout}
          className="w-full py-4 text-lg font-bold bg-blue-600 text-white rounded-full"
        >
          🔓 OTKLJUČAJ CEO AUDIO
        </button>

      </div>
    )}

    <audio ref={audioRef} src={audioSrc} preload="metadata" />
  </div>
</div>
```

);
}
