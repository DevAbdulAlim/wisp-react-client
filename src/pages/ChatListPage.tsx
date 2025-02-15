import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import SideNavbar from "../SideNavbar";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  isGroup: boolean;
  avatar?: string;
  unreadCount?: number;
}

const chats: Chat[] = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: "2:30 PM",
    isGroup: false,
    avatar: "",
    unreadCount: 3,
  },
  {
    id: 2,
    name: "Group Chat",
    lastMessage: "Let's meet tomorrow",
    timestamp: "1:15 PM",
    isGroup: true,
    avatar: "",
    unreadCount: 1,
  },
  // Add more chat items as needed
];

const ChatListPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col h-full w-full md:w-96 bg-gray-50 shadow-lg overflow-hidden">
      <header className="flex items-center justify-between p-4 bg-teal-500  text-white shadow-md">
        <div className="relative">
          <button onClick={toggleSidebar} className="text-2xl">
            <AiOutlineMenu />
          </button>
          <div ref={sidebarRef}>
            <SideNavbar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              closeSidebar={closeSidebar}
            />
          </div>
        </div>
        <div className="relative w-64">
          <AiOutlineSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-200 text-lg" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded bg-white text-gray-800 focus:outline-none shadow-inner"
          />
        </div>
      </header>
      <div className="flex-grow overflow-y-auto">
        {chats.map((chat) => (
          <Link to={`/chats/${chat.id}`} key={chat.id}>
            <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer relative">
              <FaUserCircle className="text-3xl text-gray-400" />
              <div className="ml-3 flex-grow">
                <h2 className="text-lg font-semibold text-gray-800">
                  {chat.name}
                </h2>
                <p className="text-gray-500 text-sm truncate">
                  {chat.lastMessage}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-gray-500 text-sm">{chat.timestamp}</div>
                {chat.unreadCount && (
                  <span className="mt-1 bg-teal-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button
        className="absolute bottom-6 right-6 bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-full shadow-lg hover:from-teal-600 hover:to-teal-700 focus:outline-none"
        title="Add New Chat or Group"
      >
        <AiOutlinePlus className="text-2xl text-white" />
      </button>
    </div>
  );
};

export default ChatListPage;
