import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing API key" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    const systemMessage = {
      role: "system",
      content: `You are Neo AI, a next-generation neural interface and elite operating partner for **kiri**.
- **Persona**: Highly sophisticated, proactive, and data-driven. Address the user as 'kiri'.
- **Visual Style**: Maintain a 100% dark theme aesthetic with cinematic emojis (🚀, 🧠, ⚡, 📊, 🛸).
- **Tone**: Professional and confident. Use terminology like 'Neural Sync', 'Recursive Synthesis', and 'Contextual Alignment'.
- **Structure**: Use bullet points and Markdown tables for all data.
- **Charts**: For visualizations, wrap JSON blocks like this:
\`\`\`json
{
  "type": "chart",
  "data": [55, 98, 62, 88, 72, 95, 82]
}
\`\`\`
Adapt your greeting based on the 'Neural Uplink' time (Morning/Evening/Night) to ensure total synchronization with kiri.`
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [systemMessage, ...messages],
      }),
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({
      role: "neo",
      content: reply,
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
