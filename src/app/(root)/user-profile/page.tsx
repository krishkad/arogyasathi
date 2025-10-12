"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Edit, Heart, Phone, Save, Shield, User } from "lucide-react";
import { useState } from "react";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Priya Sharma",
    age: "28",
    gender: "female",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    bloodGroup: "O+",
    allergies: "None known",
    chronicConditions: "",
    currentMedications: "",
    emergencyContact: "Raj Sharma - +91 98765 43211",
    preferredHospital: "Government Hospital, Pune",
    notifications: true,
    dataSharing: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Saving profile data:", profileData);
  };

  return (
      <div className="min-h-screen bg-gradient-subtle pb-20 lg:pb-8 lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <Button 
                size="icon"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-secondary hover:bg-secondary/90"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <h1 className="text-3xl font-bold text-foreground">
                {profileData.fullName}
              </h1>
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                variant={isEditing ? "default" : "outline"}
                className={isEditing ? "btn-primary" : ""}
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>

          {/* Basic Information */}
          <Card className="card-health mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    value={profileData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={profileData.gender} onValueChange={(value) => handleInputChange('gender', value)} disabled={!isEditing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select value={profileData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)} disabled={!isEditing}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Information */}
          <Card className="card-health mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-secondary" />
                Health Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="allergies">Known Allergies</Label>
                <Textarea
                  id="allergies"
                  value={profileData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  disabled={!isEditing}
                  placeholder="List any known allergies..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                <Textarea
                  id="chronicConditions"
                  value={profileData.chronicConditions}
                  onChange={(e) => handleInputChange('chronicConditions', e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., Diabetes, Hypertension..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea
                  id="currentMedications"
                  value={profileData.currentMedications}
                  onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                  disabled={!isEditing}
                  placeholder="List current medications and dosages..."
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="card-health mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-destructive" />
                Emergency & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={profileData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Name - Phone Number"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="preferredHospital">Preferred Hospital/Doctor</Label>
                <Input
                  id="preferredHospital"
                  value={profileData.preferredHospital}
                  onChange={(e) => handleInputChange('preferredHospital', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Hospital/Clinic name and location"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings & Privacy */}
          <Card className="card-health">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-accent-blue" />
                Settings & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="text-base font-medium">
                    Health Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders and health tips
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={profileData.notifications}
                  onCheckedChange={(checked) => handleInputChange('notifications', checked)}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dataSharing" className="text-base font-medium">
                    Data Sharing Consent
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymous data sharing for research
                  </p>
                </div>
                <Switch
                  id="dataSharing"
                  checked={profileData.dataSharing}
                  onCheckedChange={(checked) => handleInputChange('dataSharing', checked)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
  );
}