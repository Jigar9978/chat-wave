"use client"

import { motion } from "framer-motion"

interface Message {
  id: string
  text: string
  timestamp: string
  isSent: boolean
  status: "sent" | "received"
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          message.isSent ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <div className="flex items-center justify-between mt-1">
          <p className={`text-xs ${message.isSent ? "text-blue-100" : "text-gray-500"}`}>{message.timestamp}</p>
          {message.isSent && (
            <span className="text-xs text-blue-100 ml-2">{message.status === "sent" ? "Sent" : "Received"}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
