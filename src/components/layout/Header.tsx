import * as React from "react"
import { Trash2, Share2, MoreHorizontal, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HeaderProps {
  title: string
  date: string
}

export function Header({ title, date }: HeaderProps) {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-3xl sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-black text-white tracking-tight uppercase">{title}</h1>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
              <ShieldCheck className="h-2.5 w-2.5 text-[var(--accent-glow)]" />
              <span className="text-[8px] font-black text-[var(--accent-glow)] uppercase tracking-tighter">SECURE</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-mono">{date}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-slate-700" />
            <span className="text-[10px] text-slate-500 font-mono">SYNX_v4.0</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-slate-500 hover:text-white hover:bg-[var(--panel-light)] rounded-xl transition-all"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-900 border-[var(--border-soft)] text-white">
              <p className="text-xs">Share Intelligence</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-red-950 border-red-500/20 text-red-200">
              <p className="text-xs">Purge Trace</p>
            </TooltipContent>
          </Tooltip>

          <div className="w-[1px] h-4 bg-white/10 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-slate-500 hover:text-white hover:bg-[var(--panel-light)] rounded-xl transition-all"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </TooltipProvider>
      </div>
    </div>
  )
}
