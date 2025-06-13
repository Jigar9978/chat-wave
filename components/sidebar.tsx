"use client"

import { motion } from "framer-motion"
import { ContactItem } from "./contact-item"

interface Contact {
  id: string
  name: string
  initials: string
  lastMessage: string
  timestamp: string
  isOnline: boolean
  color: string
}

interface SidebarProps {
  contacts: Contact[]
  selectedContact: Contact
  onContactSelect: (contact: Contact) => void
  isMobile?: boolean
  isOpen?: boolean
}

export function Sidebar({
  contacts,
  selectedContact,
  onContactSelect,
  isMobile = false,
  isOpen = false,
}: SidebarProps) {
  const sidebarClasses = isMobile
    ? "fixed md:hidden w-80 h-[calc(100vh-64px)] bg-white border-r border-gray-200 z-50 overflow-hidden"
    : "hidden md:flex md:w-80 md:flex-col md:border-r md:border-gray-200"

  const content = (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            isSelected={selectedContact.id === contact.id}
            onClick={onContactSelect}
          />
        ))}
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={sidebarClasses}
      >
        {content}
      </motion.div>
    )
  }

  return <div className={sidebarClasses}>{content}</div>
}
