"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Message as MessageType } from "@/lib/types"
import { ThumbsUp, ThumbsDown, Copy, Check, Download } from "lucide-react"
import { useState } from "react"

interface MessageProps {
  message: MessageType
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user"
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-8`}>
      <div className={`flex gap-4 max-w-4xl w-full`}>
        {/* Avatar */}
        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-1 overflow-hidden ${
          isUser 
            ? "border border-[var(--border-soft)]" 
            : "bg-[var(--accent-soft)] shadow-lg shadow-blue-600/20 text-white font-bold text-[13px]"
        }`}>
          {isUser ? (
            <img src="https://i.pravatar.cc/150?u=kiran" alt="User" className="h-full w-full object-cover" />
          ) : (
            "N"
          )}
        </div>

        {/* Bubble & Details */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[13px] font-bold text-white">
              {isUser ? "Kiran Patel" : "Neo AI"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">{message.timestamp || "4:42 PM"}</span>
          </div>

          <div
            className={`text-[14px] leading-relaxed text-slate-300 w-full`}
          >
            {isUser ? (
               <div className="bg-[var(--panel-light)] p-4 rounded-xl border border-[var(--border)] inline-block text-slate-200">
                  {message.content}
               </div>
            ) : (
              <div className="bg-[var(--panel-light)] border border-[var(--border)] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-end gap-0.5">
                       <div className="h-4 w-1 bg-blue-500 rounded-sm"></div>
                       <div className="h-3 w-1 bg-blue-400 rounded-sm"></div>
                       <div className="h-2 w-1 bg-blue-300 rounded-sm"></div>
                    </div>
                    <span className="text-sm font-bold text-white">Q2 Product Strategy Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="h-8 w-8 rounded-lg border border-[var(--border-soft)] hover:bg-[var(--panel-light)] flex items-center justify-center text-slate-400 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button onClick={copyToClipboard} className="h-8 w-8 rounded-lg border border-[var(--border-soft)] hover:bg-[var(--panel-light)] flex items-center justify-center text-slate-400 transition-colors">
                      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-headings:text-white prose-headings:font-bold prose-strong:text-white prose-li:marker:text-slate-500 prose-ul:my-2 prose-li:my-1 text-[13px]">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar for AI */}
          {!isUser && (
            <div className="flex items-center gap-3 mt-3 text-slate-500 ml-1">
              <button className="hover:text-white transition-colors"><ThumbsUp className="h-3.5 w-3.5" /></button>
              <button className="hover:text-white transition-colors"><ThumbsDown className="h-3.5 w-3.5" /></button>
              <button onClick={copyToClipboard} className="hover:text-white transition-colors">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
