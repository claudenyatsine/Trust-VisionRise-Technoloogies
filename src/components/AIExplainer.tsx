"use client";

import * as React from "react";
import { MessageSquare, Send, Bot, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { aiChatbotForServiceExplainer } from "@/ai/flows/ai-chatbot-service-explainer";
import { cn } from "@/lib/utils";

export function AIExplainer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Hello! I am your Security Advisor. How can I help secure your facility today?' }
  ]);
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const result = await aiChatbotForServiceExplainer({ question: userMsg });
      setMessages(prev => [...prev, { role: 'bot', text: result.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Service interrupted. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full shadow-2xl bg-[#01357D] text-white flex items-center justify-center p-0 overflow-hidden relative border-4 border-white"
        >
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
          {!isOpen && <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />}
        </Button>
      </div>

      <div className={cn(
        "fixed bottom-24 right-6 z-50 w-[90vw] md:w-[420px] bg-white border border-border rounded-2xl shadow-2xl transition-all duration-500 origin-bottom-right transform overflow-hidden",
        isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-10"
      )}>
        <div className="p-6 bg-[#01357D] flex items-center gap-4 shadow-lg">
          <div className="p-2 bg-white/10 rounded-xl">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-headline font-bold text-white uppercase tracking-widest text-sm">Security Advisor</h4>
            <p className="text-[10px] text-white/70 uppercase font-bold">24/7 AI Assistance</p>
          </div>
        </div>

        <div ref={scrollRef} className="h-96 overflow-y-auto p-6 space-y-6 bg-white">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex items-start gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-transform hover:scale-105",
                msg.role === 'user' ? "bg-[#01357D] text-white" : "bg-muted text-[#01357D]"
              )}>
                {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className={cn(
                "max-w-[80%] p-4 rounded-2xl text-sm font-medium shadow-sm leading-relaxed",
                msg.role === 'user' ? "bg-[#01357D] text-white rounded-tr-none" : "bg-muted text-[#01357D] border border-border rounded-tl-none"
              )}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="bg-muted w-9 h-9 rounded-xl animate-pulse shadow-sm" />
              <div className="bg-muted p-4 rounded-2xl w-24 animate-pulse shadow-sm" />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 border-t border-border bg-muted/30 flex gap-3">
          <Input
            placeholder="How can we help?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-white border-border text-sm h-12 shadow-inner rounded-xl text-[#01357D] font-bold"
          />
          <Button type="submit" disabled={loading} size="icon" className="shrink-0 h-12 w-12 bg-[#01357D] text-white shadow-xl hover:scale-105 transition-transform">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </>
  );
}