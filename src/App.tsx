import { useState } from "react";
import { supabase } from "./lib/supabase";
import { ReadingData } from "./types/reading";

import Step1ZodiacSign from "./components/steps/Step1ZodiacSign";
import Step2BirthDay from "./components/steps/Step2BirthDay";
import Step3BirthDecade from "./components/steps/Step3BirthDecade";
import Step4BirthYear from "./components/steps/Step4BirthYear";
import Step5BirthtimeQuestion from "./components/steps/Step5BirthtimeQuestion";
import Step6BirthtimeSelect from "./components/steps/Step6BirthtimeSelect";
import Step7BirthCity from "./components/steps/Step7BirthCity";
import Step8Calculating from "./components/steps/Step8Calculating";
import Step9FirstName from "./components/steps/Step9FirstName";
import Step10AudioPresentation from "./components/steps/Step10AudioPresentation";
import Step11Checkout from "./components/steps/Step11Checkout";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [readingData, setReadingData] = useState<ReadingData>({
    zodiacSign: "",
  });

  const updateData = (updates: Partial<ReadingData>) => {
    setReadingData((prev) => ({ ...prev, ...updates }));
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
        email: finalData.email,
        purchased: false,
      });

      if (error) console.error("Error saving to database:", error);
    } catch (err) {
      console.error("Database error:", err);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1ZodiacSign
            onSelect={(sign) => {
              updateData({ zodiacSign: sign });
              setCurrentStep(2);
            }}
          />
        );

      case 2:
        return (
          <Step2BirthDay
            zodiacSign={readingData.zodiacSign}
            onSelect={(day) => {
              updateData({ birthDay: day });
              setCurrentStep(3);
            }}
          />
        );

      case 3:
        return (
          <Step3BirthDecade
            onSelect={(decade) => {
              updateData({ birthDecade: decade });
              setCurrentStep(4);
            }}
          />
        );

      case 4:
        return (
          <Step4BirthYear
            decade={readingData.birthDecade || "2000–2009"}
            onSelect={(year) => {
              updateData({ birthYear: year });
              setCurrentStep(5);
            }}
          />
        );

      case 5:
        return (
          <Step5BirthtimeQuestion
            birthDay={readingData.birthDay || 1}
            birthYear={readingData.birthYear || 2000}
            onAnswer={(knows) => {
              updateData({ knowsBirthtime: knows });
              setCurrentStep(knows ? 6 : 7);
            }}
          />
        );

      case 6:
        return (
          <Step6BirthtimeSelect
            onSubmit={(hour, minute) => {
              updateData({ birthHour: hour, birthMinute: minute });
              setCurrentStep(7);
            }}
          />
        );

      case 7:
        return (
          <Step7BirthCity
            onSubmit={(country, city) => {
              updateData({ birthCountry: country, birthCity: city });
              setCurrentStep(8);
            }}
          />
        );

      case 8:
        return <Step8Calculating onComplete={() => setCurrentStep(9)} />;

      case 9:
        return (
          <Step9FirstName
            onSubmit={(name) => {
              updateData({ firstName: name });
              setCurrentStep(10);
            }}
          />
        );

      case 10:
        return (
          <Step10AudioPresentation
            firstName={readingData.firstName || ""}
            zodiacSign={readingData.zodiacSign}
            onContinue={() => setCurrentStep(11)}
          />
        );

      case 11:
        return (
          <Step11Checkout
            firstName={readingData.firstName || ""}
            onComplete={(email) => {
              const finalData = { ...readingData, email };
              updateData({ email });
              saveToDatabase(finalData);
              alert("Hvala! Dobićete email sa vašim Moon Reading-om.");
            }}
          />
        );

      default:
        return (
          <Step1ZodiacSign
            onSelect={(sign) => {
              updateData({ zodiacSign: sign });
              setCurrentStep(2);
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen transition-all duration-500">
      {renderStep()}
    </div>
  );
}

export default App;

