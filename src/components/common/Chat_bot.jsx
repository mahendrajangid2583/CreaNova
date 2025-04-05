import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { RiRobot2Line } from "react-icons/ri";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const EduChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Reset input
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await axios.post("http://localhost:4000/chat", {
        message: currentInput,
      });

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      // Add error message
      const errorMessage = {
        id: Date.now() + 2,
        text: "Sorry, something went wrong. Please try again.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const chatref = useRef(null);
  useOnClickOutside(chatref,()=>setChatOpen(false));

  return (
    <div className="relative z-50">
      {chatOpen ? (
        <div className={`max-w-md fixed right-4 bottom-4 mx-auto bg-richblack-600 p-4  shadow-lg rounded-lg ${chatOpen ? " h-[470px]":"h-0"} transition-all w-[407px] duration-200`}>
          <div ref={chatref} className="h-96 overflow-y-auto mb-4 border p-3 rounded">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 p-2 rounded max-w-[80%] ${
                  message.sender === "user"
                    ? "bg-blue-100 ml-auto text-right"
                    : "bg-green-100 mr-auto text-left"
                }`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow p-2 bg-richblack-500 border rounded-l"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      ) : (
        <div onClick={()=>setChatOpen(true)}
        className=" fixed right-4 bottom-4 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white">
          <RiRobot2Line />
        </div>
      )}
    </div>
  );
};

export default EduChatbot;
