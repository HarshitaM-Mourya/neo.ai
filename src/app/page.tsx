"use client"

import { useState, useEffect } from "react"
import { ChatSession, Message } from "@/lib/types"
import { sendMessage } from "@/lib/api"
import { toast } from "sonner"
import { Sidebar } from "@/components/layout/Sidebar"
import { MiniSidebar } from "@/components/layout/MiniSidebar"
import { RightPanel } from "@/components/layout/RightPanel"
import { Header } from "@/components/chat/Header"
import { ChatWindow } from "@/components/chat/ChatWindow"
import { InputBox } from "@/components/chat/InputBox"

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>("")
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showRightPanel, setShowRightPanel] = useState(true)

  const [userName, setUserName] = useState("Kiran Patel")
  const [activeTab, setActiveTab] = useState("Chat")

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("neo_sessions_v6")
    let baseSessions: ChatSession[] = []

    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          baseSessions = parsed
        }
      } catch (e) {
        console.error("Recovery failed", e)
      }
    }

    if (baseSessions.length === 0) {
      const defaultSession: ChatSession = {
        id: "default-1",
        title: "Q2 Product Strategy",
        date: new Date().toISOString().split("T")[0],
        timestamp: "4:42 PM",
        isMeeting: false,
        summary: "Analyze Q2 strategy and provide key...",
        messages: [
          {
            role: "user",
            content: "Analyze our Q2 product strategy document and provide key insights, risks, and recommended actions.",
            timestamp: "4:42 PM",
          },
          {
            role: "neo",
            content: "I'll analyze the Q2 product strategy document and provide comprehensive insights.\n\n### 📊 Q2 Product Strategy Analysis\n\n**📈 Key Insights**\n- Strong focus on user acquisition and retention aligns with growth objectives\n- Technology modernization is on track with the architecture roadmap\n- Resource allocation appears optimal across all product initiatives\n\n**⚠️ Potential Risks**\n- Mobile app development timeline is aggressive (12 weeks)\n- Third-party dependencies could impact feature delivery\n- Team bandwidth may be constrained for analytics implementation\n\n**✅ Recommended Actions**\n1. Consider extending mobile app timeline by 2 weeks for quality\n2. Implement dependency monitoring and backup plans\n3. Prioritize analytics MVP for faster time-to-insight\n4. Add 1 additional developer to mobile team if possible",
            timestamp: "4:42 PM",
          },
        ],
      }
      baseSessions = [defaultSession]
    }

    setSessions(baseSessions)
    setCurrentSessionId(baseSessions[0].id)
  }, [])

  useEffect(() => {
    if (mounted && sessions.length > 0) {
      localStorage.setItem("neo_sessions_v6", JSON.stringify(sessions))
    }
  }, [sessions, mounted])

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      date: new Date().toISOString().split("T")[0],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: [
        {
          role: "neo",
          content: "Neural uplink established. How can I assist you today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
      summary: "New conversation started...",
      isMeeting: false,
    }
    setSessions([newSession, ...sessions])
    setCurrentSessionId(newSession.id)
  }

  const handleSend = async () => {
    if (!input.trim() || !currentSessionId || isTyping) return

    const userMsg: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setInput("")
    
    const currentSession = sessions.find((s) => s.id === currentSessionId)
    const updatedHistory = currentSession?.messages.concat(userMsg) || [userMsg]

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === currentSessionId) {
          return { ...s, messages: updatedHistory }
        }
        return s
      })
    )

    setIsTyping(true)

    try {
      const messagesForApi = updatedHistory.map((m) => ({
        role: m.role === "neo" ? "assistant" : m.role,
        content: m.content,
      }))

      const responseMessage = await sendMessage(messagesForApi)

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentSessionId) {
            return {
              ...s,
              messages: [...s.messages, { ...responseMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } as Message],
            }
          }
          return s
        })
      )
    } catch (error) {
      toast.error("Network synchronization failed.")
      console.error(error)
      // Mock fallback
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentSessionId) {
            return {
              ...s,
              messages: [...s.messages, { role: "neo", content: "I am unable to reach the neural core at the moment. Please check your connection.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } as Message],
            }
          }
          return s
        })
      )
    } finally {
      setIsTyping(false)
    }
  }

  if (!mounted) return <div className="h-screen w-full bg-[var(--bg-primary)]" />

  const currentSession = sessions.find((s) => s.id === currentSessionId)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--bg-primary)] text-slate-300 font-sans selection:bg-[var(--accent-soft)]/30">
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        setCurrentSessionId={setCurrentSessionId}
        createNewSession={createNewSession}
        userName={userName}
      />
      
      <MiniSidebar />

      <main className="flex-1 flex flex-col min-w-0 h-full bg-[var(--bg-primary)] relative">
        {currentSession ? (
          <>
            <Header 
              title={currentSession.title} 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              toggleRightPanel={() => setShowRightPanel(!showRightPanel)} 
            />
            <div className="flex-1 min-h-0 overflow-y-auto">
              <ChatWindow
                currentSession={currentSession}
                isTyping={isTyping}
                createNewSession={createNewSession}
              />
            </div>
            <div className="shrink-0 pb-6 px-4">
              <InputBox
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                isTyping={isTyping}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
             <ChatWindow
                currentSession={undefined}
                isTyping={false}
                createNewSession={createNewSession}
              />
          </div>
        )}
      </main>

      <RightPanel isOpen={showRightPanel} />
    </div>
  )
}