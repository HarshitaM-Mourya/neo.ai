"use client"

import * as React from "react"
import { Share2, MoreHorizontal, Moon, MessageSquare, ListTree, Folder, CheckSquare, FileText, ChevronDown } from "lucide-react"

interface HeaderProps {
  title: string
  activeTab: string
  setActiveTab: (tab: string) => void
  toggleRightPanel: () => void
}

export function Header({ title, activeTab, setActiveTab, toggleRightPanel }: HeaderProps) {
  const tabs = [
    { name: "Chat", icon: MessageSquare },
    { name: "Conversations", icon: ListTree },
    { name: "Files", icon: Folder },
    { name: "Tasks", icon: CheckSquare },
    { name: "Notes", icon: FileText },
  ]

  return (
    <div className="flex flex-col border-b border-[var(--border)] bg-[var(--bg-primary)] shrink-0 pt-4 px-6 gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-white tracking-tight">{title}</h1>
          <ChevronDown className="h-4 w-4 text-slate-500 cursor-pointer hover:text-white transition-colors" />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--panel-light)] hover:bg-[var(--active)] text-[var(--accent-glow)] text-xs font-semibold transition-colors border border-[var(--accent)]/10">
            <Moon className="h-3.5 w-3.5" /> Dark Mode
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--panel-light)] hover:bg-[var(--active)] text-slate-300 text-xs font-semibold transition-colors border border-[var(--border)]">
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
          <button 
            onClick={toggleRightPanel}
            className="flex items-center justify-center h-8 w-8 rounded-lg bg-[var(--panel-light)] hover:bg-[var(--active)] text-slate-300 transition-colors border border-[var(--border)]"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-6 mt-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 pb-3 border-b-[3px] text-sm font-semibold tracking-wide transition-all ${
              activeTab === tab.name
                ? "border-[var(--accent)] text-white"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            <tab.icon className={`h-4 w-4 ${activeTab === tab.name ? "text-[var(--accent-glow)]" : ""}`} /> 
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  )
}
