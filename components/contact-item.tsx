"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "./ui/avatar"

interface Contact {
  id: string
  name: string
  initials: string
  lastMessage: string
  timestamp: string
  isOnline: boolean
  color: string
}

interface ContactItemProps {
  contact: Contact
  isSelected: boolean
  onClick: (contact: Contact) => void
}

export function ContactItem({ contact, isSelected, onClick }: ContactItemProps) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "#f9fafb" }}
      className={`flex items-center p-4 cursor-pointer border-b border-gray-100 ${isSelected ? "bg-blue-50" : ""}`}
      onClick={() => onClick(contact)}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarFallback className={`${contact.color} text-gray-700 font-medium`}>{contact.initials}</AvatarFallback>
        </Avatar>
        {contact.isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
          <p className="text-xs text-gray-500">{contact.timestamp}</p>
        </div>
        <p className="text-sm text-gray-500 truncate mt-1">{contact.lastMessage}</p>
      </div>
    </motion.div>
  )
}
