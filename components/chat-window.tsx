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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 flex flex-col min-w-0">
      
      <ChatHeader contact={contact} isMobile={true} onMenuClick={onMenuClick} />

    
      <ChatHeader contact={contact} isMobile={false} />


      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

       
        <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

     
      <MessageInput onSendMessage={onSendMessage} disabled={isTyping} />
    </div>
  )
}
