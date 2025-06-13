"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Send } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    onSendMessage(message)
    setMessage("")
  }

  return (
    <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0 z-10">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base"
          disabled={disabled}
          autoComplete="off"
          inputMode="text"
        />
        <Button
          type="submit"
          size="sm"
          className="rounded-full bg-blue-600 hover:bg-blue-700 p-2 flex-shrink-0"
          disabled={!message.trim() || disabled}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
