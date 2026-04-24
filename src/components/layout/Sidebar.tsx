"use client"

import * as React from "react"
import { Search, Plus, MessageSquare, Pin, Grid, MoreVertical, LayoutGrid, FileText } from "lucide-react"
import { ChatSession } from "@/lib/types"
import { toast } from "sonner"

interface SidebarProps {
  sessions: ChatSession[]
  currentSessionId: string
  setCurrentSessionId: (id: string) => void
  createNewSession: () => void
  userName: string
}

export function Sidebar({
  sessions,
  currentSessionId,
  setCurrentSessionId,
  createNewSession,
  userName,
}: SidebarProps) {
  return (
    <div className="w-64 h-full bg-[var(--panel)] border-r border-[var(--border)] flex flex-col shrink-0 font-sans">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => toast.info("Neo AI Home")}>
          <div className="h-6 w-6 rounded bg-[var(--accent-soft)] flex items-center justify-center text-white font-bold text-xs">
            N
          </div>
          <span className="font-bold text-white tracking-tight">Neo AI</span>
        </div>
        <button className="text-slate-400 hover:text-white" onClick={() => toast.info("Grid View")}>
          <LayoutGrid className="h-4 w-4" />
        </button>
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={createNewSession}
          className="w-full flex items-center justify-center gap-2 bg-[var(--accent-soft)] hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-900/20"
        >
          <Plus className="h-4 w-4" /> New Chat
          <span className="ml-auto text-[10px] bg-black/20 px-1.5 py-0.5 rounded text-white/70">⌘ K</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-6 pb-4 [scrollbar-width:none]">
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Recent Chats</span>
            <div className="flex gap-2">
              <Search className="h-3 w-3 text-slate-500 cursor-pointer hover:text-white transition-colors" onClick={() => toast.info("Search Chats")} />
              <div className="h-3 w-3 flex flex-col justify-between items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => toast.info("Filter Chats")}>
                <span className="w-3 h-[1.5px] bg-slate-500 rounded-full"></span>
                <span className="w-2 h-[1.5px] bg-slate-500 rounded-full mr-1"></span>
                <span className="w-3 h-[1.5px] bg-slate-500 rounded-full"></span>
              </div>
            </div>
          </div>
          <div className="space-y-0.5">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => {
                  setCurrentSessionId(session.id)
                  toast.success(`Switched to ${session.title}`)
                }}
                className={`w-full flex items-start gap-3 p-2 rounded-lg text-left transition-colors ${
                  currentSessionId === session.id
                    ? "bg-[var(--panel-light)] border border-[var(--border)]"
                    : "hover:bg-[var(--panel-light)] border border-transparent"
                }`}
              >
                <MessageSquare className={`h-4 w-4 mt-0.5 shrink-0 ${currentSessionId === session.id ? "text-[var(--accent-glow)]" : "text-slate-500"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className={`text-[13px] truncate ${currentSessionId === session.id ? "text-white font-medium" : "text-slate-300"}`}>
                      {session.title}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    {session.summary}
                  </div>
                </div>
                <div className="text-[10px] text-slate-600 shrink-0 mt-0.5">
                  {session.timestamp || "4:42 PM"}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="px-2 mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pinned</span>
          </div>
          <div className="space-y-0.5">
            <button onClick={() => toast.info("Opening Pinned Item")} className="w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-[var(--panel-light)] text-slate-300 transition-colors group">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-slate-500 group-hover:text-white" />
                <span className="text-[13px]">Project Phoenix Overview</span>
              </div>
              <Pin className="h-3 w-3 text-slate-500" />
            </button>
            <button onClick={() => toast.info("Opening Pinned Item")} className="w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-[var(--panel-light)] text-slate-300 transition-colors group">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-slate-500 group-hover:text-white" />
                <span className="text-[13px]">System Architecture</span>
              </div>
              <Pin className="h-3 w-3 text-slate-500" />
            </button>
          </div>
        </div>

        <div>
          <div className="px-2 mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Workspaces</span>
          </div>
          <div className="space-y-0.5">
            <button onClick={() => toast.success("Cogneoverse HQ Workspace Active")} className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-[var(--panel-light)] text-slate-300 transition-colors bg-[var(--panel-light)] border border-[var(--border)]">
              <div className="h-6 w-6 rounded-lg bg-[var(--accent-soft)]/20 text-[var(--accent-glow)] flex items-center justify-center text-[10px]">
                <Grid className="h-3 w-3" />
              </div>
              <span className="text-[13px] font-medium text-white">Cogneoverse HQ</span>
            </button>
            <button onClick={() => toast.info("Switching to Engineering Team Workspace")} className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-[var(--panel-light)] text-slate-300 transition-colors group">
              <div className="h-6 w-6 rounded-lg bg-emerald-600/10 text-emerald-400 flex items-center justify-center text-[10px] group-hover:bg-emerald-600/20 transition-colors">
                <Grid className="h-3 w-3" />
              </div>
              <span className="text-[13px]">Engineering Team</span>
            </button>
            <button onClick={() => toast.info("Switching to Product Team Workspace")} className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-[var(--panel-light)] text-slate-300 transition-colors group">
              <div className="h-6 w-6 rounded-lg bg-purple-600/10 text-purple-400 flex items-center justify-center text-[10px] group-hover:bg-purple-600/20 transition-colors">
                <Grid className="h-3 w-3" />
              </div>
              <span className="text-[13px]">Product Team</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[var(--border)] mt-auto bg-[var(--panel)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => toast.info("User Settings")}>
            <img src="https://i.pravatar.cc/150?u=kiran" alt="User" className="h-8 w-8 rounded-full border border-[var(--border-soft)] group-hover:border-[var(--accent)] transition-colors" />
            <div>
              <div className="text-[13px] font-bold text-white leading-none group-hover:text-[var(--accent-glow)] transition-colors">Kiran Patel</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-400">Online</span>
              </div>
            </div>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors" onClick={() => toast.info("Account Actions")}>
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
