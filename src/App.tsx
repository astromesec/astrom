import { useState } from "react";
import { supabase } from "./lib/supabase";
import { ReadingData } from "./types/reading";
import { trackStandard } from "./pixel";

import Step1ZodiacSign from "./components/steps/Step1ZodiacSign";
import Step2BirthDay from "./components/steps/Step2BirthDay";
import Step3BirthDecade from "./components/steps/Step3BirthDecade";
import Step4BirthYear from "./components/steps/Step4BirthYear";
import Step5BirthtimeQuestion from "./components/steps/Step5BirthtimeQuestion";
import Step6BirthtimeSelect from "./components/steps/Step6BirthtimeSelect";
import Step7BirthCity from "./components/steps/Step7BirthCity";
import Step8FirstName from "./components/steps/Step8FirstName";
import Step9Calculating from "./components/steps/Step9Calculating";
import Step10AudioPresentation from "./components/steps/Step10AudioPresentation";

const TOTAL_STEPS = 8;

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [readingData, setReadingData] = useState<ReadingData>({ zodiacSign: "" });

  const updateData = (updates: Partial<ReadingData>) => {
    setReadingData((prev) => ({ ...prev, ...updates }));
  };

  const goBack = () => {
    if (currentStep === 7 && !readingData.knowsBirthtime) {
      setCurrentStep(5);
    } else if (currentStep > 1 && currentStep <= 8) {
      setCurrentStep((s) => s - 1);
    }
  };

  const saveToDatabase = async (finalData: ReadingData) => {
    try {
      const { error } = await supabase.from("moon_readings").insert({
        zodiac_sign: finalData.zodiacSign,
        birth_day: finalData.birthDay,
        birth_decade: finalData.birthDecade,
        birth_year: finalData.birthYear,
        knows_birthtime: finalData.knowsBirthtime,
        birth_hour: finalData.birthHour,
        birth_minute: finalData.birthMinute,
        birth_country: finalData.birthCountry,
        birth_region: finalData.birthRegion,
        birth_city: finalData.birthCity,
        first_name: finalData.firstName,
        purchased: false,
      });
      if (error) console.error("Error saving to database:", error);
    } catch (err) {
      console.error("Database error:", err);
    }
  };

  const showProgress = currentStep >= 1 && currentStep <= 8;
  const progressPct = Math.round((Math.min(currentStep, TOTAL_STEPS) / TOTAL_STEPS) * 100);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1ZodiacSign onSelect={(sign) => { updateData({ zodiacSign: sign }); setCurrentStep(2); }} />;
      case 2:
        return <Step2BirthDay zodiacSign={readingData.zodiacSign} onSelect={(day) => { updateData({ birthDay: day }); setCurrentStep(3); }} />;
      case 3:
        return <Step3BirthDecade onSelect={(decade) => { updateData({ birthDecade: decade }); setCurrentStep(4); }} />;
      case 4:
        return <Step4BirthYear decade={readingData.birthDecade || "2000–2009"} onSelect={(year) => { updateData({ birthYear: year }); setCurrentStep(5); }} />;
      case 5:
        return <Step5BirthtimeQuestion birthDay={readingData.birthDay || 1} birthYear={readingData.birthYear || 2000} onAnswer={(knows) => { updateData({ knowsBirthtime: knows }); setCurrentStep(knows ? 6 : 7); }} />;
      case 6:
        return <Step6BirthtimeSelect onSubmit={(hour, minute) => { updateData({ birthHour: hour, birthMinute: minute }); setCurrentStep(7); }} />;
      case 7:
        return <Step7BirthCity onSubmit={(country, city) => { updateData({ birthCountry: country, birthCity: city }); setCurrentStep(8); }} />;
      case 8:
        return <Step8FirstName onSubmit={(name) => { updateData({ firstName: name }); trackStandard("Lead"); setCurrentStep(9); }} />;
      case 9:
        return <Step9Calculating firstName={readingData.firstName || ""} onComplete={() => { saveToDatabase({ ...readingData }); setCurrentStep(10); }} />;
      case 10:
        return <Step10AudioPresentation firstName={readingData.firstName || ""} zodiacSign={readingData.zodiacSign} />;
      default:
        return <Step1ZodiacSign onSelect={(sign) => { updateData({ zodiacSign: sign }); setCurrentStep(2); }} />;
    }
  };

  return (
    <div className="min-h-screen transition-all duration-500">
      {showProgress && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="flex items-center gap-3 px-4 pt-3 pb-2 bg-gradient-to-b from-slate-950/95 to-transparent backdrop-blur-sm">
            {currentStep > 1 && (
              <button onClick={goBack} className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200" aria-label="Nazad">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
            )}
            <div className="flex-1">
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
            <span className="flex-shrink-0 text-xs text-white/40 font-medium tabular-nums">{Math.min(currentStep, TOTAL_STEPS)}/{TOTAL_STEPS}</span>
          </div>
        </div>
      )}
      {renderStep()}
    </div>
  );
}

export default App;
