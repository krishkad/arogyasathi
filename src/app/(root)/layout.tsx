"use client";

import { ReactNode, useState } from "react";
import {
  Home,
  MessageCircle,
  User,
  Heart,
  AlertTriangle,
  FileText,
  Menu,
  X,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

interface NavigationLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Chat", href: "/chatbot", icon: MessageCircle },
  { name: "Women's Health", href: "/womens-health", icon: Heart },
  { name: "Emergency", href: "/emergency", icon: AlertTriangle },
  { name: "Profile", href: "/user-profile", icon: User },
];

export default function NavigationLayout({ children }: NavigationLayoutProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = pathname === "/";

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Header */}
      <header className="bg-card h-16 border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">
                ArogyaSathi
              </span>
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
                <SheetContent side="left" className="w-80 p-8">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
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
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-muted hover:text-foreground",
                            pathname === item.href &&
                              "bg-gradient-to-r from-green-400 to-green-600 text-white"
                          )}
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
      <main className="flex-1">{children}</main>

      {/* Bottom Navigation - Mobile - Hidden on Home Page */}
      {!isHomePage && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg lg:hidden">
          <div className="flex items-center justify-around h-16 px-4">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-muted hover:text-foreground",
                    pathname === item.href &&
                      "bg-gradient-to-r from-green-400 to-green-600 text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {/* <span className="font-medium">{item.name}</span> */}
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
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-muted hover:text-foreground",
                      pathname === item.href &&
                        "bg-gradient-to-r from-green-400 to-green-600 text-white hover:text-white"
                    )}
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
