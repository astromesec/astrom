export interface ReadingData {
  zodiacSign: string;
  birthDay?: number;
  birthDecade?: string;
  birthYear?: number;
  knowsBirthtime?: boolean;
  birthHour?: number;
  birthMinute?: number;
  birthCountry?: string;
  birthRegion?: string;
  birthCity?: string;
  firstName?: string;
  email?: string;
}

export const zodiacSigns = [
  { id: 'aries', name: 'Ovan', icon: '♈' },
  { id: 'taurus', name: 'Bik', icon: '♉' },
  { id: 'gemini', name: 'Blizanci', icon: '♊' },
  { id: 'cancer', name: 'Rak', icon: '♋' },
  { id: 'leo', name: 'Lav', icon: '♌' },
  { id: 'virgo', name: 'Devica', icon: '♍' },
  { id: 'libra', name: 'Vaga', icon: '♎' },
  { id: 'scorpio', name: 'Škorpija', icon: '♏' },
  { id: 'sagittarius', name: 'Strelac', icon: '♐' },
  { id: 'capricorn', name: 'Jarac', icon: '♑' },
  { id: 'aquarius', name: 'Vodolija', icon: '♒' },
  { id: 'pisces', name: 'Ribe', icon: '♓' }
];

export const audioUrls: Record<string, string> = {
  aquarius: 'https://jumpshare.com/s/I15DoBVdU765qBFvM9kt',
  aries: 'https://jumpshare.com/s/0l4v5Dp9uzBkXCpkFrDI',
  cancer: 'https://jumpshare.com/s/0l4v5Dp9uzBkXCpkFrDI'
};
