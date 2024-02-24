import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AiOutlineMessage } from 'react-icons/ai';

const socket = io();

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  useEffect(() => {
    socket.on('chat message', (message: string) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
    // Clean up event listener on unmount
    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSubmittedMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('chat message', inputMessage);
    setInputMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="py-4 bg-blue-500 text-white text-center">
        <h1 className="text-2xl font-bold">Real-Time Chat App</h1>
      </header>

      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="flex mb-2">
            <div className="flex-shrink-0 w-8 h-8 mr-2">
              <AiOutlineMessage className="w-full h-full text-blue-500" />
            </div>
            <div className="bg-white p-2 rounded-lg shadow">
              <p className="text-gray-800">{message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Write message */}
      <form onSubmit={handleSubmittedMessage} className="p-4 bg-white border-t">
        <input
          type="text"
          name="message"
          value={inputMessage}
          autoComplete="off"
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Write text here..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
