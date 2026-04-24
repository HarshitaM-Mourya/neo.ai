"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import { 
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
  User,
  Cpu,
  Trash2,
  FileText,
  Image as ImageIcon,
  Video
} from "lucide-react"

// Simple, clean sidebar component
export function SimpleSidebar({ 
  isOpen, 
  onToggle 
}: { 
  isOpen: boolean; 
  onToggle: () => void; 
}) {
  return (
    <div className={`bg-[var(--panel)] border-r border-[var(--border-soft)] flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[var(--border-soft)]">
        <div className="flex items-center justify-between">
          {isOpen && <h1 className="text-xl font-bold text-white">Neo AI</h1>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Sidebar Content - Only show when open */}
      {isOpen && (
        <div className="flex-1 p-4">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input 
                type="text"
                placeholder="Search..." 
                className="w-full pl-10 bg-[var(--panel-light)] border border-[var(--border-soft)] rounded-lg py-2 px-3 text-sm" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              variant="secondary" 
              className="w-full justify-start gap-2"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
            
            <div className="mt-4 space-y-1">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">Recent Chats</h3>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="truncate">System Optimization</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="truncate">Neural Network Analysis</span>
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Sidebar Footer */}
      <div className="p-4 border-t border-[var(--border-soft)]">
        {isOpen ? (
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="rounded-full mx-auto">
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}