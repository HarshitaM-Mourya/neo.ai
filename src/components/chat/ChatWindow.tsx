"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { Message as MessageComponent } from "./Message"
import { ChatSession } from "@/lib/types"

interface ChatWindowProps {
  currentSession: ChatSession | undefined
  isTyping: boolean
  createNewSession: () => void
}

export function ChatWindow({ currentSession, isTyping, createNewSession }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentSession?.messages, isTyping])

  if (!currentSession) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="h-16 w-16 bg-[var(--accent-soft)] rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-blue-900/20">N</div>
        <h2 className="text-2xl font-bold text-white tracking-tight">How can I help you today?</h2>
        <button onClick={createNewSession} className="px-5 py-2.5 bg-white/10 hover:bg-[var(--hover)] text-white rounded-lg text-sm font-semibold transition-colors mt-2">
          Start a new conversation
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-8 py-10">
      {currentSession.messages.map((message, index) => (
        <MessageComponent key={index} message={message} />
      ))}
      
      {isTyping && (
        <div className="flex w-full justify-start mb-8">
          <div className="flex gap-4 max-w-4xl w-full">
            <div className="h-8 w-8 rounded-full bg-[var(--accent-soft)] text-white font-bold text-[13px] flex items-center justify-center mt-1 shrink-0 shadow-lg shadow-blue-600/20">N</div>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[13px] font-bold text-white">Neo AI</span>
              </div>
              <div className="flex space-x-1.5 mt-2 bg-[var(--panel-light)] border border-[var(--border)] p-4 rounded-xl inline-flex w-fit">
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce [animation-duration:0.8s]"></div>
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></div>
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} className="h-4" />
    </div>
  )
}
