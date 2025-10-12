import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
];

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onLanguageSelect: (language: string) => void;
}

export default function LanguageSelectorModal({ isOpen, onLanguageSelect }: LanguageSelectorModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('arogyasathi-language', languageCode);
    onLanguageSelect(languageCode);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl border-0 bg-gradient-subtle">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Welcome to ArogyaSathi
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Choose your preferred language to continue
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-3 py-4">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant="outline"
              className="h-16 bg-card hover:bg-primary/5 border-2 hover:border-primary transition-all duration-300 rounded-xl"
              onClick={() => handleLanguageSelect(language.code)}
            >
              <div className="text-center">
                <div className="font-semibold text-lg">{language.nativeName}</div>
                <div className="text-sm text-muted-foreground">{language.name}</div>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          You can change this later in settings
        </div>
      </DialogContent>
    </Dialog>
  );
}