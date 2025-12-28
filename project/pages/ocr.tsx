import React, { useState, useRef } from "react";
import { AppSidebar } from "../components/AppSidebar";
import { ProtectedRoute } from "../components/ProtectedRoute";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Separator } from "../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Upload, FileText, Download, Save, Edit } from "lucide-react";

interface OCRResult {
  document_code: string | null;
  invoice_date_time: string | null;
  supplier_name: string | null;
  supplier_tin: string | null;
  supplier_address: string | null;
  buyer_name: string | null;
  buyer_tin: string | null;
  buyer_address: string | null;
  raw_text: string;
}

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<OCRResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const processFile = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Note: You'll need to update this URL to point to your FastAPI backend
      const response = await fetch("http://localhost:8000/process-invoice/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        console.error("Error processing file");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = async () => {
    if (!result) return;

    try {
      const response = await fetch("http://localhost:8000/export-excel/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ocr_results.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting:", error);
    }
  };

  const saveTrainingExample = async () => {
    if (!result || !file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("entities", JSON.stringify(result));

      const response = await fetch("http://localhost:8000/save-training-example/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Training example saved successfully!");
      }
    } catch (error) {
      console.error("Error saving training example:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="relative flex min-h-screen overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>OCR Processing</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">OCR Document Processing</h1>
                  <p className="text-muted-foreground">
                    Upload documents to extract text and classify entities using OCR
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* File Upload Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Document</CardTitle>
                    <CardDescription>
                      Upload an image or PDF file to process with OCR
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag and drop a file here, or click to select
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supports: JPG, PNG, PDF
                      </p>
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {file && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Selected file: {file.name}</p>
                        <Button 
                          onClick={processFile} 
                          disabled={loading}
                          className="w-full"
                        >
                          {loading ? "Processing..." : "Process Document"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Preview Section */}
                {preview && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Document Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="max-h-96 overflow-auto">
                        <img 
                          src={preview} 
                          alt="Document preview" 
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Results Section */}
              {result && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Extracted Information</CardTitle>
                        <CardDescription>
                          Results from OCR and NER processing
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditing(!editing)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {editing ? "Save" : "Edit"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={exportToExcel}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={saveTrainingExample}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Training
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Document Information</h3>
                        <div className="space-y-2">
                          <div>
                            <Label>Document Code</Label>
                            <Input 
                              value={result.document_code || ""} 
                              readOnly={!editing}
                              onChange={(e) => setResult({...result, document_code: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Invoice Date/Time</Label>
                            <Input 
                              value={result.invoice_date_time || ""} 
                              readOnly={!editing}
                              onChange={(e) => setResult({...result, invoice_date_time: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold">Supplier Information</h3>
                        <div className="space-y-2">
                          <div>
                            <Label>Supplier Name</Label>
                            <Input 
                              value={result.supplier_name || ""} 
                              readOnly={!editing}
                              onChange={(e) => setResult({...result, supplier_name: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Supplier TIN</Label>
                            <Input 
                              value={result.supplier_tin || ""} 
                              readOnly={!editing}
                              onChange={(e) => setResult({...result, supplier_tin: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Supplier Address</Label>
                            <Textarea 
                              value={result.supplier_address || ""} 
                              readOnly={!editing}
                              onChange={(e) => setResult({...result, supplier_address: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold">Buyer Information</h3>
                        <div className="space-y-2">
                          <div>
                            <Label>Buyer Name</Label>
                            <Input 
                              value={result.buyer_name || ""} 
                              readOnly={!editing}
                              onChange={(e) => setResult({...result, buyer_name: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Buyer TIN</Label>
                            <Input 
                              value={result.buyer_tin || ""} 
                              readOnly={!editing}
                              onChange={(e) => setResult({...result, buyer_tin: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Buyer Address</Label>
                            <Textarea 
                              value={result.buyer_address || ""} 
                              readOnly={!editing}
                              onChange={(e) => setResult({...result, buyer_address: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold">Raw Text</h3>
                        <Textarea 
                          value={result.raw_text || ""} 
                          readOnly
                          className="h-32"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
} 