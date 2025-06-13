"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { MessageInput } from "./message-input"
import { ChatHeader } from "./chat-header"

interface Contact {
  id: string
  name: string
  initials: string
  lastMessage: string
  timestamp: string
  isOnline: boolean
  color: string
}

interface Message {
  id: string
  text: string
  timestamp: string
  isSent: boolean
  status: "sent" | "received"
}

interface ChatWindowProps {
  contact: Contact
  messages: Message[]
  isTyping: boolean
  onSendMessage: (message: string) => void
  onMenuClick?: () => void
}

export function ChatWindow({ contact, messages, isTyping, onSendMessage, onMenuClick }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 flex flex-col min-w-0 relative h-full">
      {/* Fixed Headers - Both Mobile and Desktop */}
      <div className="fixed top-[64px] left-0 right-0 z-40 bg-white md:left-80">
        {/* Mobile Header */}
        <ChatHeader contact={contact} isMobile={true} onMenuClick={onMenuClick} />

        {/* Desktop Header */}
        <ChatHeader contact={contact} isMobile={false} />
      </div>

      {/* Messages Area - With top padding to account for fixed header */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 pt-[120px] md:pt-[72px]">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white md:left-80">
        <MessageInput onSendMessage={onSendMessage} disabled={isTyping} />
      </div>
    </div>
  )
}
