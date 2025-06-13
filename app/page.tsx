"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { ChatWindow } from "@/components/chat-window"

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

const contacts: Contact[] = [
  {
    id: "1",
    name: "Emma Thompson",
    initials: "EM",
    lastMessage: "I've sent you the latest project f...",
    timestamp: "12:45 PM",
    isOnline: true,
    color: "bg-blue-100",
  },
  {
    id: "2",
    name: "Michael Johnson",
    initials: "MJ",
    lastMessage: "Are we still meeting for coffee to...",
    timestamp: "Yesterday",
    isOnline: true,
    color: "bg-green-100",
  },
  {
    id: "3",
    name: "Sophia Lee",
    initials: "SL",
    lastMessage: "The design team loved your pre...",
    timestamp: "Yesterday",
    isOnline: true,
    color: "bg-purple-100",
  },
  {
    id: "4",
    name: "Robert Brown",
    initials: "RB",
    lastMessage: "Can you review the budget prop...",
    timestamp: "Tuesday",
    isOnline: false,
    color: "bg-orange-100",
  },
  {
    id: "5",
    name: "Amelia Wilson",
    initials: "AW",
    lastMessage: "Thanks for your help with the ca...",
    timestamp: "Monday",
    isOnline: false,
    color: "bg-pink-100",
  },
  {
    id: "6",
    name: "Daniel Martinez",
    initials: "DM",
    lastMessage: "Let's schedule a call to discuss t...",
    timestamp: "May 25",
    isOnline: false,
    color: "bg-indigo-100",
  },
]

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Sounds great! I've heard good things about their pasta. Looking forward to it!",
    timestamp: "12:00 PM",
    isSent: false,
    status: "received",
  },
  {
    id: "2",
    text: "Oh, I almost forgot - do you have the latest version of the client presentation? I want to make sure we're all on the same page for tomorrow.",
    timestamp: "12:05 PM",
    isSent: false,
    status: "received",
  },
  {
    id: "3",
    text: "I've just sent it to your email. It includes all the updates we discussed in the last meeting. Let me know if you need anything else!",
    timestamp: "12:15 PM",
    isSent: true,
    status: "sent",
  },
  {
    id: "4",
    text: "Got it, thanks! I'll review it before our lunch. See you soon!",
    timestamp: "12:20 PM",
    isSent: false,
    status: "received",
  },
  {
    id: "5",
    text: "Looking forward to it! 👋",
    timestamp: "12:25 PM",
    isSent: true,
    status: "sent",
  },
]

const botResponses = [
  "That sounds great! I'm looking forward to it.",
  "Thanks for sharing that with me.",
  "I completely agree with your point.",
  "Let me think about that for a moment...",
  "That's a really interesting perspective!",
  "I appreciate you taking the time to explain.",
  "Could you tell me more about that?",
  "That makes perfect sense to me.",
  "I'm glad we're on the same page!",
  "Thanks for the update!",
]

export default function ChatApp() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0])
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSent: true,
      status: "sent",
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate typing
    setIsTyping(true)

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isSent: false,
        status: "received",
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    setIsSidebarOpen(false)
    // Reset messages for demo purposes
    setMessages(initialMessages)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
     
      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <Sidebar
          contacts={contacts}
          selectedContact={selectedContact}
          onContactSelect={handleContactSelect}
          isMobile={false}
        />

        {/* Mobile Sidebar */}
        <Sidebar
          contacts={contacts}
          selectedContact={selectedContact}
          onContactSelect={handleContactSelect}
          isMobile={true}
          isOpen={isSidebarOpen}
        />

       
        <ChatWindow
          contact={selectedContact}
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
      </div>
    </div>
  )
}
