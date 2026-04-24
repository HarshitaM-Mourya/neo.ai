export interface Message {
    role: "neo" | "user" | "assistant";
    content: string;
    type?: "text" | "table" | "chart" | "image" | "skeleton";
    data?: any;
    bookmarked?: boolean;
    timestamp?: string;
}

export interface ChatSession {
    id: string;
    title: string;
    date: string;
    messages: Message[];
    summary: string;
    isMeeting: boolean;
    attendees?: string[];
}
