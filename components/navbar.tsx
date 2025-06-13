import { Avatar, AvatarFallback } from "./ui/avatar"

export function Navbar() {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-[64px]">
      <h1 className="text-xl font-bold text-blue-600">logo</h1>
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-purple-600 text-white">CL</AvatarFallback>
      </Avatar>
    </div>
  )
}
