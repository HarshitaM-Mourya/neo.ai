"use client"

import * as React from "react"
import { Send, Mic, Paperclip, Globe, AtSign } from "lucide-react"

interface InputBoxProps {
  input: string
  setInput: (value: string) => void
  handleSend: () => void
  isTyping: boolean
}

export function InputBox({ input, setInput, handleSend, isTyping }: InputBoxProps) {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="relative flex items-center bg-[var(--panel)] border border-[var(--border-soft)] rounded-[24px] transition-all duration-300 focus-within:border-[var(--accent)]/30 focus-within:bg-[var(--panel-light)] shadow-2xl">
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Message Neo AI..."
          className="w-full min-h-[50px] max-h-[200px] pt-4 pb-12 px-5 bg-transparent border-none text-white placeholder:text-slate-500 focus:ring-0 resize-none font-sans text-[15px] leading-relaxed"
          rows={1}
        />

        <div className="flex items-center gap-3 px-2 absolute bottom-4 left-4">
          <button className="text-slate-500 hover:text-slate-300 transition-colors">
            <Paperclip className="h-4 w-4" />
          </button>
          <button className="text-slate-500 hover:text-slate-300 transition-colors">
            <Globe className="h-4 w-4" />
          </button>
          <button className="text-slate-500 hover:text-slate-300 transition-colors">
            <AtSign className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button className="text-slate-500 hover:text-slate-300 transition-colors mr-1">
            <Mic className="h-5 w-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`h-9 w-9 rounded-[10px] flex items-center justify-center transition-all duration-300 ${
              input.trim() 
                ? "bg-[var(--accent-soft)] text-white shadow-lg shadow-blue-600/30 hover:bg-[var(--accent)] hover:-translate-y-0.5" 
                : "bg-[var(--panel-light)] text-slate-500"
            }`}
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </div>
      </div>
      <div className="text-center mt-3 mb-1">
        <span className="text-[11px] text-slate-500">Neo AI can make mistakes. Consider checking important information.</span>
      </div>
    </div>
  )
}
