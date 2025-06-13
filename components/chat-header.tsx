"use client"

import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Menu } from "lucide-react"

interface Contact {
  id: string
  name: string
  initials: string
  lastMessage: string
  timestamp: string
  isOnline: boolean
  color: string
}

interface ChatHeaderProps {
  contact: Contact
  isMobile?: boolean
  onMenuClick?: () => void
}

export function ChatHeader({ contact, isMobile = false, onMenuClick }: ChatHeaderProps) {
  if (isMobile) {
    return (
      <div className="md:hidden flex items-center p-4 bg-white border-b border-gray-200">
        <Button variant="ghost" size="sm" className="mr-2" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <div className="relative">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className={`${contact.color} text-gray-700 text-sm`}>{contact.initials}</AvatarFallback>
            </Avatar>
            {contact.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <span className="font-medium text-gray-900">{contact.name}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="hidden md:flex items-center p-4 bg-white border-b border-gray-200">
      <div className="relative">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarFallback className={`${contact.color} text-gray-700`}>{contact.initials}</AvatarFallback>
        </Avatar>
        {contact.isOnline && (
          <div className="absolute -bottom-0.5 left-7 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{contact.name}</h3>
        <p className="text-sm text-green-600">{contact.isOnline ? "Online" : "Offline"}</p>
      </div>
    </div>
  )
}
