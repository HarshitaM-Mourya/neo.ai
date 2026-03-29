import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // TO THE USER: This is a robust mock response system.
    // Replace this with real OpenAI SDK call once you add your API key.
    
    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    let responseText = "Neo Core is processing your request. Intelligence applied. 🛸";

    if (lastMessage.includes("hello") || lastMessage.includes("hi")) {
      responseText = "Greetings operator. Neo AI is online and ready for neural synchronization. How can I assist your project cycle today? 🚀";
    } else if (lastMessage.includes("help")) {
      responseText = "I can assist with UI refinement, code optimization, and architectural scaling. Specify the vector you wish to explore.";
    } else if (lastMessage.includes("status")) {
      responseText = "All systems operational. Neural clusters at 99.9% stability. Deep dark aesthetics holding at peak performance.";
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      role: "neo",
      content: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: "Failed to process neural cycle." }, { status: 500 });
  }
}
