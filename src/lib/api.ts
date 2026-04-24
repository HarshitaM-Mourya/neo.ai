import { Message } from "./types";

export const API_URL = "/api/chat";

export async function sendMessage(messages: { role: string; content: string }[]) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
        throw new Error("Neural link failed.");
    }

    const rawData = await response.json();
    return {
        ...rawData,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
}
