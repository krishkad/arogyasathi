// app/(root)/page.tsx
"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Heart, Shield, FileText, ArrowRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LanguageSelectorModal from "@/components/LanguageSelectorModal";
import HealthTipCard from "@/components/HealthTipCard";
import Image from "next/image";
// import heroImage from "@/assets/hero-healthcare.jpg";
import Link from "next/link";

const Index = () => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [renderModal, setRenderModal] = useState(false);

  useEffect(() => {
    // run only on client
    setRenderModal(true);

    const savedLanguage = localStorage.getItem('arogyasathi-language');
    if (!savedLanguage) {
      setShowLanguageModal(true);
    }
  }, []);

  const handleLanguageSelect = (language: string) => {
    localStorage.setItem('arogyasathi-language', language);
    setShowLanguageModal(false);
  };

  // Prevent rendering until we've mounted (avoids server/client mismatch of client-only bits)
  if (!renderModal) return null;

  const features = [
    { icon: MessageCircle, title: "Health Assistant", description: "Chat with our AI assistant for instant health guidance and support.", href: "/chatbot", color: "primary" },
    { icon: Heart, title: "Women's Health", description: "Specialized support and information for women's health concerns.", href: "/womens-health", color: "secondary" },
    { icon: Shield, title: "Emergency Help", description: "Quick access to emergency contacts and first-aid guidance.", href: "/emergency", color: "destructive" },
    { icon: FileText, title: "Health Reports", description: "Generate and download personalized health reports and recommendations.", href: "/reports", color: "accent-blue" }
  ];

  return (
    <div className="min-h-screen bg-secondary pb-20 lg:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="mb-8">
            <div className="mx-auto max-w-2xl rounded-2xl shadow-card overflow-hidden">
              <Image
                src={"/hero-healthcare.jpg"}
                alt="ArogyaSathi Healthcare Assistant - Trusted medical guidance for rural communities"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Welcome to <span className="text-primary">ArogyaSathi</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Your trusted healthcare companion for reliable health guidance, emergency assistance,
            and wellness tips in your preferred language.
          </p>

          <Link href="/chatbot">
            <Button className="btn-primary text-lg px-8 py-4">
              Start Health Chat
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Daily Health Tip */}
        <div className="mb-8">
          {/* Pass a deterministic icon (Utensils) to avoid any server/client divergence */}
          <HealthTipCard Icon={Utensils} />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} href={feature.href}>
                <Card className="card-health hover:shadow-card transition-all duration-300 hover:scale-102 h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      feature.color === 'primary' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      feature.color === 'secondary' ? 'bg-gradient-secondary' :
                      feature.color === 'destructive' ? 'bg-destructive' :
                      'bg-accent-blue'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Trusted by Rural Communities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div><div className="text-2xl font-bold text-primary">24/7</div><div className="text-sm text-muted-foreground">Available Support</div></div>
            <div><div className="text-2xl font-bold text-primary">3 Languages</div><div className="text-sm text-muted-foreground">Local Language Support</div></div>
            <div><div className="text-2xl font-bold text-primary">Safe & Secure</div><div className="text-sm text-muted-foreground">Privacy Protected</div></div>
          </div>
        </div>
      </div>

      <LanguageSelectorModal isOpen={showLanguageModal} onLanguageSelect={handleLanguageSelect} />
    </div>
  );
};

export default Index;
