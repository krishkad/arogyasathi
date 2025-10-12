"use client";

import { Heart, Info, BookOpen, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const educationTopics = [
  {
    title: "Understanding PCOS/PCOD",
    description:
      "Learn about symptoms, causes, and lifestyle management of Polycystic Ovary Syndrome.",
    category: "Education",
    readTime: "5 min read",
  },
  {
    title: "Menstrual Health",
    description:
      "Important information about menstrual hygiene and managing menstrual problems.",
    category: "Wellness",
    readTime: "4 min read",
  },
  {
    title: "Pregnancy Care",
    description:
      "Essential tips for prenatal care and healthy pregnancy practices.",
    category: "Pregnancy",
    readTime: "7 min read",
  },
  {
    title: "Nutrition for Women",
    description:
      "Dietary guidelines and nutritional needs specific to Women&apos;s health.",
    category: "Nutrition",
    readTime: "6 min read",
  },
];

const quickTips = [
  "Maintain regular menstrual cycle tracking",
  "Stay hydrated and eat iron-rich foods",
  "Practice stress management techniques",
  "Get regular health check-ups",
];

export default function WomensHealth() {
  return (
    <div className="min-h-screen bg-gradient-subtle pb-20 lg:pb-8 lg:ml-64">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-women rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Women&apos;s Health Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive health information and support designed specifically
            for women&apos;s unique health needs.
          </p>
        </div>

        {/* Quick Health Chat */}
        <Card className="card-women mb-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Have a Women&apos;s Health Question?
            </h3>
            <p className="text-muted-foreground mb-4">
              Get personalized guidance from our specialized Women&apos;s health
              assistant
            </p>
            <Link href={"/chatbot"}>
              <Button className="btn-secondary">
                <Heart className="w-4 h-4 mr-2" />
                Start Women&apos;s Health Chat
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Educational Topics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-primary" />
            Health Education
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {educationTopics.map((topic, index) => (
              <Card
                key={index}
                className="card-health hover:shadow-card transition-all duration-300 hover:scale-102"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-xs font-medium text-accent-purple bg-accent-purple/10 px-2 py-1 rounded-full mb-2 inline-block">
                        {topic.category}
                      </span>
                      <CardTitle className="text-lg font-semibold">
                        {topic.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    {topic.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {topic.readTime}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:bg-primary/10"
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Info className="w-6 h-6 mr-2 text-primary" />
            Daily Wellness Tips
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickTips.map((tip, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-card p-4 rounded-xl border border-border"
              >
                <div className="w-2 h-2 bg-gradient-women rounded-full"></div>
                <span className="text-muted-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <Card className="bg-gradient-women border-0 text-white">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-xl font-semibold mb-2">Need Support?</h3>
            <p className="mb-4 opacity-90">
              Connect with our Women&apos;s health specialists for personalized
              guidance and support.
            </p>
            <Button
              variant="secondary"
              className="bg-white text-accent-purple hover:bg-gray-100"
            >
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
