"use client";



import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickReplies = [
  "Headache", "Fever", "Stomach Pain", "Cough", "Skin Problem", "Women's Health"
];

const initialBotMessage: Message = {
  id: '1',
  text: "नमस्ते! I'm your ArogyaSathi health assistant. How can I help you today? You can ask me about symptoms, home remedies, or general health questions.",
  sender: 'bot',
  timestamp: new Date()
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('headache')) {
      return "For headaches, try these safe remedies: 1) Rest in a quiet, dark room 2) Apply a cold compress to your forehead 3) Stay hydrated 4) Gently massage your temples. If headache persists or is severe, please consult a healthcare provider.";
    }
    
    if (input.includes('fever')) {
      return "For fever management: 1) Drink plenty of fluids 2) Rest 3) Use cool, damp cloths on forehead 4) Wear light clothing. Monitor temperature regularly. Seek medical help if fever is high (above 103°F) or persistent.";
    }
    
    if (input.includes('cough')) {
      return "For cough relief: 1) Drink warm water with honey 2) Steam inhalation 3) Stay hydrated 4) Rest your voice. If cough persists for more than a week or includes blood, please see a doctor.";
    }
    
    return "Thank you for your question. For personalized medical advice, I recommend consulting with a healthcare professional. In the meantime, ensure you're staying hydrated, getting adequate rest, and maintaining good hygiene. Is there anything specific you'd like to know about general wellness?";
  };

  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording functionality would be implemented here
  };

  return (
      <div className="h-screen bg-gradient-subtle flex flex-col pb-16 lg:pb-0 lg:ml-64">
        {/* Chat Header */}
        <div className="bg-card border-b border-border p-4">
          <div className="max-w-4xl mx-auto flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">ArogyaSathi Assistant</h1>
              <p className="text-sm text-muted-foreground">Always here to help with your health questions</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs md:max-w-md ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' ? 'bg-primary' : 'bg-muted'
                  }`}>
                    {message.sender === 'user' ? 
                      <User className="w-4 h-4 text-white" /> : 
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    }
                  </div>
                  <div className={message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
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
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                />
              </div>
              
              <Button
                onClick={toggleRecording}
                variant="outline"
                size="icon"
                className={`h-12 w-12 rounded-xl ${isRecording ? 'bg-destructive text-white' : ''}`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              
              <Button
                onClick={() => handleSendMessage(inputValue)}
                className="h-12 w-12 rounded-xl bg-gradient-primary"
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