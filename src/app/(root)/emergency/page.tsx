"use client";


import { useState } from "react";
import { AlertTriangle, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const emergencyContacts = [
  { name: "National Emergency", number: "112", description: "Police, Fire, Medical Emergency" },
  { name: "Medical Emergency", number: "102", description: "Ambulance Services" },
  { name: "Women Helpline", number: "1091", description: "24x7 Women Emergency" },
  { name: "Child Helpline", number: "1098", description: "Child Emergency Services" }
];

const firstAidTips = [
  {
    title: "Cuts & Wounds",
    steps: ["Clean hands before helping", "Stop bleeding with clean cloth", "Clean wound with clean water", "Apply bandage", "Seek medical help if deep"]
  },
  {
    title: "Burns",
    steps: ["Cool burn with cold water for 20 minutes", "Remove jewelry near burn", "Do not use ice or butter", "Cover with clean cloth", "Seek medical attention"]
  },
  {
    title: "Choking",
    steps: ["Ask 'Are you choking?'", "Give 5 back blows between shoulder blades", "If unsuccessful, perform abdominal thrusts", "Call for emergency help", "Continue until help arrives"]
  }
];

export default function Emergency() {
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setShowLocationDialog(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  const sendLocationSMS = () => {
    if (currentLocation) {
      const message = `Emergency! I need help. My location: https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`;
      window.open(`sms:?body=${encodeURIComponent(message)}`, '_self');
    }
  };

  return (
      <div className="min-h-screen bg-gradient-subtle pb-20 lg:pb-8 lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Emergency Assistance
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick access to emergency contacts, first aid guidance, and location sharing for urgent situations.
            </p>
          </div>

          {/* Emergency Actions */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Button 
              onClick={() => handleEmergencyCall('112')}
              className="btn-emergency h-20 text-lg flex-col space-y-2"
            >
              <Phone className="w-8 h-8" />
              <span>Call Emergency (112)</span>
            </Button>
            
            <Button 
              onClick={handleGetLocation}
              variant="outline"
              className="h-20 text-lg flex-col space-y-2 border-2 border-destructive text-destructive hover:bg-destructive hover:text-white"
            >
              <MapPin className="w-8 h-8" />
              <span>Share Location</span>
            </Button>
          </div>

          {/* Emergency Contacts */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Phone className="w-6 h-6 mr-2 text-destructive" />
              Emergency Contacts
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className="card-health hover:shadow-emergency transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                        <p className="text-2xl font-bold text-destructive">{contact.number}</p>
                        <p className="text-sm text-muted-foreground">{contact.description}</p>
                      </div>
                      <Button 
                        onClick={() => handleEmergencyCall(contact.number)}
                        size="icon"
                        className="bg-destructive hover:bg-destructive/90 h-12 w-12 rounded-full"
                      >
                        <Phone className="w-6 h-6" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* First Aid Tips */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-primary" />
              Basic First Aid
            </h2>
            <div className="grid gap-6">
              {firstAidTips.map((tip, index) => (
                <Card key={index} className="card-health">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-primary" />
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {tip.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start space-x-3">
                          <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {stepIndex + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Important Notice</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    This app provides basic emergency information and first aid guidance. 
                    In case of serious medical emergencies, always call professional medical 
                    services immediately. The information provided here is for general guidance 
                    only and should not replace professional medical advice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Location Share Dialog */}
        <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-destructive" />
                Share Your Location
              </DialogTitle>
              <DialogDescription>
                Your current location has been detected. You can now share it via SMS or other messaging apps.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {currentLocation && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Current Location:</p>
                  <p className="font-mono text-sm">
                    {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                  </p>
                </div>
              )}
              <div className="flex space-x-2">
                <Button onClick={sendLocationSMS} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send SMS
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowLocationDialog(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
}