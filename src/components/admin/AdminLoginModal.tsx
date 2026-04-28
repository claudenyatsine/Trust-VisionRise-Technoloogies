"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Lock, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdmin } from "@/context/AdminContext";
import { cn } from "@/lib/utils";
import { AdminDashboard } from "./AdminDashboard";

interface AdminLoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminLoginModal({ isOpen, onOpenChange }: AdminLoginModalProps) {
  const { login, isAdmin, logout } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError(false);
      setPassword("");
    } else {
      setError(true);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content 
          className={cn(
            "fixed z-[101] border bg-white shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 overflow-hidden",
            isAdmin 
              ? "inset-0 w-screen h-screen" 
              : "left-[50%] top-[50%] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] sm:rounded-2xl"
          )}
        >
          
          {isAdmin ? (
            <>
              <Dialog.Title className="sr-only">Management Portal</Dialog.Title>
              <Dialog.Description className="sr-only">Admin management dashboard for products and projects.</Dialog.Description>
              <AdminDashboard onClose={() => onOpenChange(false)} />
            </>
          ) : (
            <div className="p-8">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <ShieldCheck size={32} />
                </div>
                <Dialog.Title className="text-2xl font-headline font-bold text-[#01357D] uppercase tracking-tight">
                  Admin Access
                </Dialog.Title>
                <Dialog.Description className="text-slate-500 text-sm mt-2">
                  Enter the management credentials to access the secure backdoor.
                </Dialog.Description>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="password"
                      placeholder="Admin Password"
                      className={`pl-10 h-12 ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoFocus
                    />
                  </div>
                  {error && (
                    <p className="text-xs font-bold text-red-500 uppercase tracking-wider animate-pulse">
                      Access Denied. Incorrect Credential.
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full h-12 uppercase font-bold tracking-widest bg-[#01357D] hover:bg-primary transition-all">
                  Authorize
                </Button>
              </form>
            </div>
          )}

          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
