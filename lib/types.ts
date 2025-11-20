export type SoulCityEnergyType = "love" | "career" | "healing" | "creativity" | "growth";

export type SoulCityResult = {
    city: string;                 // e.g. "Lisbon"
    country: string;              // e.g. "Portugal"
    regionDescription: string;    // 1–2 lines describing the broader region
    energyType: SoulCityEnergyType;
    whyItFits: string;            // 2–4 sentences explaining alignment with intention + sign
    powerDirection: "north" | "south" | "east" | "west";
    altCities: string[];          // 2–4 alternative cities
    avoidRegions: string[];       // 1–3 regions/areas to be cautious about
    travelTheme: string;          // 1–2 sentence "travel destiny" vibe
};
