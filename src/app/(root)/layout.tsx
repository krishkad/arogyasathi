"use client"

import { ReactNode, useState } from "react";
import { Home, MessageCircle, User, Heart, AlertTriangle, FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavigationLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Chat', href: '/chat', icon: MessageCircle },
  { name: 'Women\'s Health', href: '/womens-health', icon: Heart },
  { name: 'Emergency', href: '/emergency', icon: AlertTriangle },
  { name: 'Profile', href: '/profile', icon: User }
];

export default function NavigationLayout({ children }: NavigationLayoutProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">ArogyaSathi</span>
            </Link>
            
            {/* Hamburger Menu - Only on Home Page */}
            {isHomePage && (
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <span>ArogyaSathi</span>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-8 space-y-2">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Navigation - Mobile - Hidden on Home Page */}
      {!isHomePage && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg lg:hidden">
          <div className="flex items-center justify-around h-16 px-4">
            {navigation.map((item) => {
              const isActive =pathname === item.href;
              const Icon = item.icon;
              
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Desktop Sidebar - Hidden on Home Page */}
      {!isHomePage && (
        <aside className="hidden lg:fixed lg:top-16 lg:left-0 lg:w-64 lg:h-full lg:bg-card lg:border-r lg:border-border lg:flex lg:flex-col">
          <div className="p-6">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-primary text-white shadow-soft'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}