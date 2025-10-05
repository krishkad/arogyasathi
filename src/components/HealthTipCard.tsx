// src/components/HealthTipCard.tsx
"use client";

import React from "react";
import { Icon as LucideIcon } from "lucide-react"; // type helper
import { Utensils } from "lucide-react";

type Props = {
  Icon?: React.ComponentType<any>;
  tip?: string;
};

export default function HealthTipCard({ Icon = Utensils, tip = "Eat a balanced breakfast and drink plenty of water." }: Props) {
  return (
    <div className="card-health p-4 rounded-2xl bg-card border border-border shadow-sm">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-lg font-semibold">Daily Health Tip</h4>
          </div>
          <p className="text-sm text-muted-foreground">{tip}</p>
        </div>
      </div>
    </div>
  );
}
