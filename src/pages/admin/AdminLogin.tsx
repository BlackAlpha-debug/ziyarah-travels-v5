// src/pages/admin/AdminLogin.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, User } from "lucide-react";
import { authenticateAdmin, loginAdmin } from "@/lib/adminAuth";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticateAdmin(username, password)) {
      loginAdmin();
      navigate("/zaccessv/dashboard", { replace: true });
    } else {
      setError("Invalid username or password");
      setPassword(""); // Clear password on error for security UX
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-neutral-700 bg-neutral-800/60 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-gold/10 to-transparent p-1">
          <CardHeader className="text-center pt-8 pb-4">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-gold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-4.5 0L12 12m0 0l3 3m-3-3l-3 3"
                />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">
              Admin Portal
            </CardTitle>
            <p className="text-neutral-400 mt-2">
              Ziyarah Travels — Sacred Journey Management
            </p>
          </CardHeader>
        </div>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm text-center animate-fade-in">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-neutral-300">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="pl-10 pr-4 py-3 bg-neutral-900/70 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl transition-all"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-neutral-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-4 py-3 bg-neutral-900/70 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl transition-all"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 mt-2 bg-gradient-to-r from-gold to-gold/90 hover:from-gold-dark hover:to-gold/80 text-white font-semibold rounded-xl shadow-lg hover:shadow-gold/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Sign In to Dashboard
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Ziyarah Travels. All rights reserved.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}