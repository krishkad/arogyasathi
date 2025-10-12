"use client";

import Timestamp from "@/components/Timestamp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  _id: string;
  response: string;
  prompt: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickReplies = [
  "Headache",
  "Fever",
  "Stomach Pain",
  "Cough",
  "Skin Problem",
  "Women's Health",
];

const initialBotMessage: Message = {
  _id: "1",
  response: "नमस्ते! I'm your ArogyaSathi health assistant. How can I help you today? You can ask me about symptoms, home remedies, or general health questions.",
  prompt: "",
  sender: "bot",
  timestamp: new Date(),
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [inputValue, setInputValue] = useState("");
  // const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      _id: Date.now().toString(),
      response: text.trim(),
      prompt: "",
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    const botResponse = await generateBotResponse(text);
    const botMessage: Message = {
      _id: (Date.now() + 1).toString(),
      response: botResponse,
      prompt: "",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const generateBotResponse = async (userInput: string): Promise<string> => {
    const input = userInput.toLowerCase();
    try {
      const response = await fetch("/api/chats/chat", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ chat: input }),
      });

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        return "";
      }

      return res.response || "";
    } catch (error) {
      console.log("error generating response", error);
      return "";
    }
  };

  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  // const toggleRecording = () => {
  //   setIsRecording(!isRecording);
  //   // Voice recording functionality would be implemented here
  // };

  return (
    <div className="h-[calc(100vh-64px)] bg-gradient-subtle flex flex-col pb-16 lg:pb-0 lg:ml-64">
      {/* Chat Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">ArogyaSathi Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Always here to help with your health questions
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-secondary p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-xs md:max-w-md ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user" ? "bg-primary" : "bg-muted"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div
                  className={
                    message.sender === "user"
                      ? "chat-bubble-user"
                      : "chat-bubble-bot"
                  }
                >
                  <p className="text-sm leading-relaxed">{message.response}</p>
                  {/* <p className="text-xs opacity-70 mt-1"> */}
                  <Timestamp date={message.timestamp} />
                  {/* </p> */}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="chat-bubble-bot">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Replies */}
      <div className="p-4 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply)}
                className="text-xs bg-muted/50 hover:bg-primary/10 hover:border-primary border-muted"
              >
                {reply}
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your health question here..."
                className="pr-12 h-12 bg-background rounded-xl border-2 focus:border-primary"
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage(inputValue)
                }
              />
            </div>

            {/* <Button
              onClick={toggleRecording}
              variant="outline"
              size="icon"
              className={`h-12 w-12 rounded-xl ${
                isRecording ? "bg-destructive text-white" : ""
              }`}
            >
              {isRecording ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </Button> */}

            <Button
              onClick={() => handleSendMessage(inputValue)}
              className="h-12 w-12 rounded-xl bg-gradient-to-r from-green-400 to-green-600"
              disabled={!inputValue.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
