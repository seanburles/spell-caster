import OpenAI from "openai";

// Lazy initialization to avoid build-time errors when env vars aren't available
let openaiInstance: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing credentials. Please pass an `apiKey`, or set the `OPENAI_API_KEY` environment variable.");
    }
    openaiInstance = new OpenAI({
      apiKey,
    });
  }
  return openaiInstance;
}

export async function generateTarotImage(cardName: string): Promise<string> {
  try {
    const openai = getOpenAI();
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A mystical tarot card illustration for "${cardName}". 
            Style: Ethereal, mystical, cosmic, with rich purples, golds, and deep blues. 
            The card should have ornate borders, celestial symbols, and a dreamy, spiritual aesthetic. 
            High quality, detailed artwork in the style of traditional tarot with a modern mystical twist.`,
      n: 1,
      size: "1024x1792", // Portrait orientation like real tarot cards
      quality: "standard",
    });

    return response.data?.[0]?.url || "";
  } catch (error) {
    console.error("Error generating tarot image:", error);
    return "";
  }
}

export async function generateSigil(intention: string, spellType: string): Promise<string> {
  try {
    const openai = getOpenAI();
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a mystical sigil symbol for "${intention}" (${spellType} spell).
            Style: Clean, geometric, sacred geometry, symmetrical design.
            Elements: Circles, triangles, lines, celestial symbols (moon, stars, sun).
            Colors: Gold, silver, deep purple, cosmic blue on dark background.
            Aesthetic: Minimalist but powerful, magical, hand-drawn feel with perfect symmetry.
            No text, just pure symbolic geometry that represents the intention.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data?.[0]?.url || "";
  } catch (error) {
    console.error("Error generating sigil:", error);
    return "";
  }
}

export async function generateRitual(data: any) {
  // Get current date for accurate lunar timing
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Calculate sun sign accurately from birth date
  const { calculateSunSign, getSignElement } = await import("@/lib/utils");
  const birthDate = data.dob ? new Date(data.dob) : null;
  const sunSign = birthDate ? calculateSunSign(birthDate) : "Unknown";
  const signElement = getSignElement(sunSign);

  const prompt = `
    You are a master mystic, astrologer, and ritual designer. Create a PREMIUM, deeply personalized ritual experience worth $30+.
    
    CURRENT DATE: ${currentDate}
    
    User Data: ${JSON.stringify(data)}
    
    CRITICAL: The user's SUN SIGN has been calculated as: ${sunSign} (${signElement} element)
    - You MUST use ${sunSign} consistently throughout the reading
    - DO NOT guess or use a different sign
    - All references to their sun sign, zodiac sign, or astrological sign must be ${sunSign}
    - The elemental reading should reflect ${signElement} energy (Fire=action/passion, Earth=grounding/stability, Air=communication/clarity, Water=emotion/intuition)
    
    IMPORTANT: Generate the nameMeaning FIRST, completely independently from all other fields.
    
    NAME MEANING INSTRUCTIONS (CRITICAL - DO THIS FIRST):
    - Look ONLY at the user's name: "${data.name}"
    - Research the literal/historical meaning of the FIRST NAME and LAST NAME separately
    - Combine these literal meanings into a single poetic phrase (3-8 words)
    - DO NOT consider their spellType, intention, birth date, or any other field
    - DO NOT use words related to prosperity, abundance, love, healing, etc. unless those words are literally part of the name's etymology
    - Examples based purely on name meanings:
      * "Sean" (God is gracious) + "Burles" (witty/joker) = "The gracious, clever one"
      * "Gabriela" (God is my strength) + "Bohorquez" (look up actual meaning) = something based ONLY on those literal meanings
    - The result should feel like a name interpretation, not a spell or intention reading
    
    Based on their birth date, location, sun sign, intention, and spell type, craft a comprehensive mystical reading.
    Use the CURRENT DATE above to calculate accurate lunar phases and astrological transits.
    ALL dates must be in the FUTURE (after ${currentDate}).
    
    Return JSON matching this EXACT schema (all fields required):
    {
      "nameMeaning": {
        "overallVibe": "string (a poetic, mystical interpretation based PURELY on the literal/historical meaning of their first and last name. Blend the etymological meanings into a single evocative phrase like 'The gracious, clever one' or 'The witty one' or 'The jokester/playful poet'. Make it feel personal and meaningful, 3-8 words. MUST be based ONLY on name etymology - ignore spellType, intention, and all other fields completely.)"
      },
      "ritual": { 
        "title": "string (poetic, evocative title, 3-6 words)",
        "paragraph": "string (120-180 words, poetic, symbolic, tailored to their sun sign and intention. Describe the ritual practice in beautiful, flowing language)",
        "mantra": "string (6-12 words, rhythmic, easy to repeat daily, powerful affirmation)",
        "physicalAction": "string (1-2 sentences describing a specific physical gesture or action: light a candle, write on paper, place hand over heart, etc.)",
        "timing": { 
          "lunarPhase": "string (next optimal moon phase for this work)",
          "exactDate": "string (specific date window, e.g., 'February 7-9, 2025')",
          "timeOfDay": "string (best time: dawn, sunset, midnight, etc.)",
          "whatNotToDo": "string (brief guidance on timing to avoid)"
        }, 
        "correspondences": { 
          "color": "string",
          "element": "string (Fire/Water/Air/Earth)",
          "crystal": "string",
          "herb": "string",
          "candle": "string (color)",
          "day": "string (day of week)",
          "direction": "string (North/South/East/West)",
          "planet": "string (Venus, Moon, Mars, etc.)"
        } 
      },
      "tarot": { 
        "card1": {
          "name": "string (specific tarot card name for current energy)",
          "position": "string (Upright or Reversed)",
          "meaning": "string (2-3 sentences: what this card means)",
          "role": "Current Energy (what supports you now)"
        },
        "card2": {
          "name": "string (different tarot card name for future potential)",
          "position": "string (Upright or Reversed)",
          "meaning": "string (2-3 sentences: what this card means)",
          "role": "Future Potential (what to embrace)"
        }
      },
      "astrology": {
        "transitInfluence": "string (2-3 sentences about current ${sunSign} energy, Mercury, or other planetary influence affecting them. Not too technical, poetic. MUST mention ${sunSign} specifically)",
        "elementalReading": "string (2-3 sentences about their ${signElement} energy signature based on their ${sunSign} sun sign + intention. ${signElement === 'Fire' ? 'Fire=action/passion' : signElement === 'Water' ? 'Water=emotion/intuition' : signElement === 'Air' ? 'Air=communication/clarity' : 'Earth=grounding/stability'})"
      },
      "shadowWork": {
        "obstacle": "string (1-2 sentences: what might block their intention, gentle and empathetic)",
        "guidance": "string (1-2 sentences: how to navigate around it)"
      },
      "reflection": {
        "journalPrompt": "string (one introspective question for self-discovery)",
        "cosmicDirection": "string (1 sentence closing affirmation, e.g., 'Your path tilts toward expansion—trust your next bold step.')"
      },
      "horoscope": {
        "daily": "string (personalized daily guidance, 2-3 sentences)",
        "monthly": "string (broader monthly outlook, 2-3 sentences)"
      },
      "soulCity": {
        "city": "string (specific city name)",
        "country": "string (country name)",
        "regionDescription": "string (1-2 lines describing the broader region's energy)",
        "energyType": "love | career | healing | creativity | growth",
        "whyItFits": "string (2-4 sentences explaining alignment with their intention and ${sunSign} sun sign. MUST mention ${sunSign} specifically)",
        "powerDirection": "north | south | east | west",
        "altCities": ["string (2-4 alternative cities with similar energy)"],
        "avoidRegions": ["string (1-3 regions/areas to be cautious about)"],
        "travelTheme": "string (1-2 sentence poetic summary of how travel connects to their destiny)"
      }
    }
    
    CRITICAL INSTRUCTIONS:
    - Make it feel LUXURIOUS and hand-crafted
    - Use their specific birth data and intention throughout
    - Be poetic but not cheesy
    - Keep each section concise but impactful
    - Ensure correspondence table has all 8 fields
    - Make the mantra Instagram-worthy (short, powerful, quotable)
    - Shadow work should be therapeutic, not scary
    - All dates and lunar phases should be realistic for current time period
    
    SOUL CITY INSTRUCTIONS:
    - Choose ONE Soul City (city + country) that symbolically aligns with their sun sign and intention
    - IMPORTANT: The Soul City should be in a DIFFERENT country/continent from their current location to inspire adventure and expansion
    - If they live in South America, suggest cities in Europe, Asia, Africa, North America, or Oceania
    - If they live in Europe, suggest cities in Asia, Americas, Africa, or Oceania
    - Make it feel like a transformative journey, not just a nearby city
    - Map intentions to city archetypes:
      * love/relationships → Venus-style cities (romantic, beautiful, social: Paris, Lisbon, Buenos Aires, Kyoto, Istanbul)
      * career/money/success → Jupiter/Mars/Saturn cities (big, ambitious, structured: NYC, Tokyo, Singapore, Dubai, London)
      * healing/inner work → Moon/Neptune cities (water, quiet, introspective: Bali, Kyoto, Santorini, Reykjavik, Tulum)
      * creativity/ideas → Mercury/Uranus cities (artistic, weird, techy: Berlin, Austin, Barcelona, Seoul, Amsterdam)
    - Use broad archetypes, NOT real astro math - this is symbolic astrocartography-lite
    - regionDescription: 1-2 lines about the region's mystical energy
    - whyItFits: tie directly to their INTENTION and SUN SIGN archetype, emphasize the transformative power of this destination
    - powerDirection: choose north/south/east/west and explain in whyItFits how that direction reflects their current phase
    - altCities: suggest 2-4 cities with similar energy ACROSS DIFFERENT CONTINENTS (make it globally diverse)
    - avoidRegions: list 1-3 regions that might feel heavy or slow for their intention (e.g., "overly industrialized zones", "isolated rural areas")
    - travelTheme: short poetic summary of how travel connects to their destiny, emphasize expansion and adventure
    - Shadow work should be therapeutic, not scary
    - All dates and lunar phases should be realistic for current time period
  `;

  const openai = getOpenAI();
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(completion.choices[0].message.content || "{}");

  // Generate tarot card images for both cards
  if (result.tarot?.card1?.name) {
    console.log(`Generating image for tarot card 1: ${result.tarot.card1.name}`);
    const card1ImageUrl = await generateTarotImage(result.tarot.card1.name);
    result.tarot.card1.imageUrl = card1ImageUrl;
  }

  if (result.tarot?.card2?.name) {
    console.log(`Generating image for tarot card 2: ${result.tarot.card2.name}`);
    const card2ImageUrl = await generateTarotImage(result.tarot.card2.name);
    result.tarot.card2.imageUrl = card2ImageUrl;
  }

  // Generate sigil image
  if (data.intention && data.spellType) {
    console.log(`Generating sigil for: ${data.intention}`);
    const sigilImageUrl = await generateSigil(data.intention, data.spellType);
    result.sigil = { imageUrl: sigilImageUrl };
  }

  return result;
}
