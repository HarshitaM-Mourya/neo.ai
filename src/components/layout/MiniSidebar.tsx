"use client"

import * as React from "react"
import { MessageSquare, Activity, Database, Users, FileText, Calendar, Settings } from "lucide-react"
import { toast } from "sonner"

export function MiniSidebar() {
  const icons = [
    { name: "Messages", icon: MessageSquare, active: true },
    { name: "Activity", icon: Activity },
    { name: "Data", icon: Database },
    { name: "Users", icon: Users },
    { name: "Documents", icon: FileText },
    { name: "Calendar", icon: Calendar },
  ]

  return (
    <div className="w-16 h-full bg-[var(--bg-secondary)] border-r border-[var(--border)] flex flex-col items-center py-6 gap-6 shrink-0">
      <div className="flex flex-col items-center gap-4 w-full">
        {icons.map((item) => (
          <button 
            key={item.name}
            onClick={() => toast.info(`Switching to ${item.name}`)}
            className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              item.active 
                ? "bg-[var(--accent-soft)]/20 text-[var(--accent-glow)] shadow-sm" 
                : "text-slate-500 hover:text-slate-300 hover:bg-[var(--panel-light)]"
            }`}
          >
            <item.icon className="h-5 w-5" />
          </button>
        ))}
      </div>
      <div className="mt-auto">
        <button 
          onClick={() => toast.info("Settings")}
          className="h-10 w-10 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-[var(--panel-light)] flex items-center justify-center transition-all duration-300"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
