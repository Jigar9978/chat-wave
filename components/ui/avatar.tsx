"use client"

import type React from "react"
import { forwardRef } from "react"

const Avatar = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props} />
))
Avatar.displayName = "Avatar"

const AvatarFallback = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 ${className}`}
      {...props}
    />
  ),
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarFallback }
