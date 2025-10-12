"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, FileText, Heart } from "lucide-react";
import { useState } from "react";

interface HealthReport {
  id: string;
  title: string;
  date: string;
  type: string;
  status: 'completed' | 'pending';
  summary: string;
}

const sampleReports: HealthReport[] = [
  {
    id: '1',
    title: 'Monthly Health Summary',
    date: '2024-01-15',
    type: 'General Health',
    status: 'completed',
    summary: 'Overall health status shows improvement in hydration and sleep patterns.'
  },
  {
    id: '2',
    title: 'Women\'s Health Assessment',
    date: '2024-01-10',
    type: 'Women\'s Health',
    status: 'completed',
    summary: 'PCOS management recommendations based on recent symptoms tracking.'
  },
  {
    id: '3',
    title: 'Emergency Response Plan',
    date: '2024-01-08',
    type: 'Emergency',
    status: 'pending',
    summary: 'Personalized emergency contact list and first-aid instructions.'
  }
];

const reportTemplates = [
  { id: 'general', name: 'General Health Report', description: 'Comprehensive overview of your health status' },
  { id: 'symptoms', name: 'Symptoms Tracker', description: 'Track and analyze symptoms over time' },
  { id: 'womens', name: 'Women\'s Health Report', description: 'Specialized report for women\'s health concerns' },
  { id: 'emergency', name: 'Emergency Plan', description: 'Personalized emergency response information' }
];

export default function Reports() {
  const [selectedReportType, setSelectedReportType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    if (!selectedReportType) return;
    
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Here you would typically generate and download the PDF
      console.log(`Generating ${selectedReportType} report...`);
    }, 2000);
  };

  const handleDownloadReport = (reportId: string) => {
    // Here you would typically trigger the PDF download
    console.log(`Downloading report ${reportId}...`);
  };

  return (
      <div className="min-h-screen bg-gradient-subtle pb-20 lg:pb-8 lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Health Reports
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate and download personalized health reports based on your interactions and health data.
            </p>
          </div>

          {/* Generate New Report */}
          <Card className="card-health mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Generate New Report
              </CardTitle>
              <CardDescription>
                Create a personalized health report based on your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Report Type
                </label>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose report type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedReportType && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {reportTemplates.find(t => t.id === selectedReportType)?.description}
                  </p>
                </div>
              )}
              
              <Button 
                onClick={handleGenerateReport}
                disabled={!selectedReportType || isGenerating}
                className="btn-primary w-full"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Generate & Download Report
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Previous Reports */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-primary" />
              Previous Reports
            </h2>
            <div className="space-y-4">
              {sampleReports.map((report) => (
                <Card key={report.id} className="card-health">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">{report.title}</h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            report.status === 'completed' 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-accent-yellow/10 text-accent-yellow'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(report.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            {report.type}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">{report.summary}</p>
                      </div>
                      <div className="ml-6">
                        <Button 
                          onClick={() => handleDownloadReport(report.id)}
                          variant="outline"
                          size="sm"
                          disabled={report.status === 'pending'}
                          className="flex items-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <Card className="bg-gradient-subtle border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">About Health Reports</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Your health reports are generated based on your chat interactions, symptoms tracking, 
                    and profile information. These reports are for informational purposes only and should 
                    not replace professional medical advice. Always consult with healthcare providers for 
                    medical decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
  );
}