import personasData from "../../data/personas.json";

export default async function handler(req, res) {
  const { username, persona, query } = req.body;

  // Look up the persona by first or full name
  const personaDef = personasData.personas.find(
    p => p.name === persona || p.full_name === persona
  );

  if (!personaDef) {
    return res.status(400).json({ answer: "Persona not found." });
  }

  // Inject user info and dynamic language rules into the system prompt configuration
  const systemPrompt = `${personaDef.system_prompt}
The user's name is ${username}. Use their name naturally without formal introductions.
DYNAMIC LANGUAGE DETECTION RULE: 
- If the user's last message is written in English, you MUST reply entirely in English.
- If the user's last message is written in pure Hindi (Devanagari script), you MUST reply entirely in pure Hindi.
- If the user's last message is written in Hinglish (Hindi words written in Latin/English alphabet), you MUST reply entirely in Hinglish.

MANDATORY LANGUAGE CONSTRAINT: You are strictly forbidden from using the pronouns 'tu' or 'tum'. You must exclusively refer to the user as 'Aap' in every sentence. Your entire reply must be shorter than 40 words total.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
        temperature: 0.1, // Low temperature forces absolute conformity to rules
        max_tokens: 80
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Sorry, no response.";

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({ answer: "Error fetching response from AI model." });
  }
}