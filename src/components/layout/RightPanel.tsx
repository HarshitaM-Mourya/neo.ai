"use client"

import * as React from "react"
import { FileText, ChevronLeft, ChevronRight, File, List, AlertTriangle, PlayCircle, Calendar as CalendarIcon, MessageSquare } from "lucide-react"
import { toast } from "sonner"

interface RightPanelProps {
  isOpen: boolean
}

export function RightPanel({ isOpen }: RightPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="w-80 h-full bg-[var(--panel)] border-l border-[var(--border)] flex flex-col shrink-0 overflow-y-auto hidden lg:flex">
      <div className="p-5 flex items-center justify-between border-b border-[var(--border)]">
        <h3 className="text-sm font-bold text-white tracking-tight">Context & Insights</h3>
        <div className="flex gap-1">
          <button onClick={() => toast.info("Previous Context")} className="text-slate-500 hover:text-white transition-colors p-1"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => toast.info("Next Context")} className="text-slate-500 hover:text-white transition-colors p-1"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
      
      <div className="p-5 space-y-8">
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Current Context</h4>
          <div 
            onClick={() => toast.info("Viewing PDF Document")}
            className="p-3 bg-[var(--panel-light)] rounded-xl border border-[var(--border)] flex items-center gap-3 relative overflow-hidden group hover:border-[var(--accent)]/50 transition-all cursor-pointer shadow-sm"
          >
            <div className="h-10 w-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">Q2 Product Strategy.pdf</div>
              <div className="text-[10px] text-slate-500">2.4 MB • PDF</div>
            </div>
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] text-slate-400">Active</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Topics</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Product Strategy", color: "blue" },
              { name: "Q2 Planning", color: "purple" },
              { name: "Resource Allocation", color: "emerald" },
              { name: "Risk Management", color: "amber" },
              { name: "Timeline", color: "pink" }
            ].map(topic => (
              <span 
                key={topic.name}
                onClick={() => toast.info(`Filtering by ${topic.name}`)}
                className={`px-2.5 py-1 text-[10px] rounded-full bg-${topic.color}-500/10 text-${topic.color}-400 border border-${topic.color}-500/20 font-medium cursor-pointer hover:bg-${topic.color}-500/20 transition-colors`}
              >
                {topic.name}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h4>
          <div className="space-y-1">
            <button onClick={() => toast.promise(new Promise(resolve => setTimeout(resolve, 1000)), { loading: "Summarizing...", success: "Summary generated!", error: "Failed to summarize" })} className="w-full flex items-center gap-3 px-3 py-2 text-[13px] text-slate-300 hover:text-white hover:bg-[var(--panel-light)] rounded-lg transition-colors text-left group">
              <File className="h-4 w-4 text-slate-500 group-hover:text-slate-400" /> Summarize Document
            </button>
            <button onClick={() => toast.info("Extracting key points...")} className="w-full flex items-center gap-3 px-3 py-2 text-[13px] text-slate-300 hover:text-white hover:bg-[var(--panel-light)] rounded-lg transition-colors text-left group">
              <List className="h-4 w-4 text-slate-500 group-hover:text-slate-400" /> Extract Key Points
            </button>
            <button onClick={() => toast.info("Analyzing risks...")} className="w-full flex items-center gap-3 px-3 py-2 text-[13px] text-slate-300 hover:text-white hover:bg-[var(--panel-light)] rounded-lg transition-colors text-left group">
              <AlertTriangle className="h-4 w-4 text-slate-500 group-hover:text-slate-400" /> Identify Risks
            </button>
            <button onClick={() => toast.info("Generating action items...")} className="w-full flex items-center gap-3 px-3 py-2 text-[13px] text-slate-300 hover:text-white hover:bg-[var(--panel-light)] rounded-lg transition-colors text-left group">
              <PlayCircle className="h-4 w-4 text-slate-500 group-hover:text-slate-400" /> Generate Action Items
            </button>
            <button onClick={() => toast.info("Creating timeline...")} className="w-full flex items-center gap-3 px-3 py-2 text-[13px] text-slate-300 hover:text-white hover:bg-[var(--panel-light)] rounded-lg transition-colors text-left group">
              <CalendarIcon className="h-4 w-4 text-slate-500 group-hover:text-slate-400" /> Create Timeline
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Related Conversations</h4>
          <div className="space-y-2">
            <div onClick={() => toast.info("Switching to Related Conversation")} className="flex items-center justify-between group cursor-pointer px-1">
              <div className="flex items-center gap-2 text-[13px] text-slate-300 group-hover:text-white transition-colors">
                <MessageSquare className="h-3.5 w-3.5 text-slate-500 group-hover:text-[var(--accent-glow)]" /> Q1 Strategy Review
              </div>
              <span className="text-[10px] text-slate-600">2 days ago</span>
            </div>
            <div onClick={() => toast.info("Switching to Related Conversation")} className="flex items-center justify-between group cursor-pointer px-1">
              <div className="flex items-center gap-2 text-[13px] text-slate-300 group-hover:text-white transition-colors">
                <MessageSquare className="h-3.5 w-3.5 text-slate-500 group-hover:text-[var(--accent-glow)]" /> Product Roadmap
              </div>
              <span className="text-[10px] text-slate-600">1 week ago</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Team Activity</h4>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="h-7 w-7 rounded-full border border-[#0A0A0A] bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white z-40">KP</div>
              <div className="h-7 w-7 rounded-full border border-[#0A0A0A] bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white z-30">JD</div>
              <div className="h-7 w-7 rounded-full border border-[#0A0A0A] bg-amber-600 flex items-center justify-center text-[10px] font-bold text-white z-20">AM</div>
              <div className="h-7 w-7 rounded-full border border-[#0A0A0A] bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white z-10">RS</div>
              <div className="h-7 w-7 rounded-full border border-[#0A0A0A] bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white z-0">+3</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">5 team members active in this workspace</p>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span> Last activity: 2 minutes ago
          </div>
        </div>
      </div>
    </div>
  )
}
