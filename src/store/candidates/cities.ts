export type CityValue = 'dnipro' | 'kyiv' | 'kharkiv' | 'lviv' | 'odessa' | 'remote' | 'other';

export interface City {
  value: CityValue;
  label: string;
}

export const citiesOptions: City[] = [
  { value: "dnipro", label: "Днепр" },
  { value: "kyiv", label: "Киев" },
  { value: "kharkiv", label: "Харьков" },
  { value: "lviv", label: "Львов" },
  { value: "odessa", label: "Одесса" },
  { value: "remote", label: "Remote" },
  { value: "other", label: "Other" },
];
