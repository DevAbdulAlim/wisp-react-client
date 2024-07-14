import React, { useState } from "react";
import {
  AiOutlinePaperClip,
  AiOutlineVideoCamera,
  AiOutlineSmile,
  AiOutlineAudio,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { FiMoreVertical, FiPhoneCall } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const MessagesPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    // Handle message sending
    setMessage("");
    setIsTyping(false);
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage(message + emoji.native);
  };

  return (
    <div className="flex flex-col overflow-hidden bg-gray-100 md:flex-grow">
      <header className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-3 md:hidden text-2xl text-gray-600"
          >
            <AiOutlineArrowLeft />
          </button>
          <FaUserCircle className="text-3xl text-gray-400" />
          <div className="ml-3">
            <h2 className="text-lg font-semibold">Chat {chatId}</h2>
            <p className="text-gray-500 text-sm">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FiPhoneCall
            className="text-2xl text-gray-600 cursor-pointer"
            title="Start Audio Call"
          />
          <AiOutlineVideoCamera
            className="text-2xl text-gray-600 cursor-pointer"
            title="Start Video Call"
          />
          <FiMoreVertical className="text-2xl text-gray-600" />
        </div>
      </header>
      <div className="flex-grow overflow-y-auto p-4">
        {/* Message bubbles go here */}
        <div className="flex items-start mb-4">
          <FaUserCircle className="text-3xl text-gray-400" />
          <div className="ml-3">
            <div className="bg-white p-3 rounded-lg shadow-md">
              <p className="text-gray-800">Hello, how are you?</p>
            </div>
            <span className="text-gray-500 text-xs mt-1">2:30 PM</span>
          </div>
        </div>
        <div className="flex items-end justify-end mb-4">
          <div className="mr-3 text-right">
            <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md">
              <p>I am fine, thank you!</p>
            </div>
            <span className="text-gray-500 text-xs mt-1">2:32 PM</span>
          </div>
          <FaUserCircle className="text-3xl text-gray-400" />
        </div>
        {isTyping && <p className="text-gray-500 text-xs mb-4">Typing...</p>}
      </div>
      <footer className="p-4 bg-white border-t border-gray-300 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsTyping(true);
            }}
            className="w-full p-3 pl-10 pr-10 rounded-lg bg-gray-200 focus:outline-none focus:bg-gray-300"
          />
          <button
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <AiOutlineSmile className="text-2xl" title="Insert Emoji" />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-0 z-50">
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
            <AiOutlinePaperClip className="text-2xl" title="Attach File" />
          </button>
        </div>
        <button className="ml-3 text-gray-600 hover:text-gray-800">
          <AiOutlineAudio className="text-2xl" title="Record Voice Message" />
        </button>
      </footer>
    </div>
  );
};

export default MessagesPage;
