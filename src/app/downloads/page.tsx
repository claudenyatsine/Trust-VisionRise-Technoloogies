"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAdmin } from "@/context/AdminContext";
import { Download, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadsPage() {
  const { downloads } = useAdmin();

  const defaultDownloads = [
    {
      id: "1",
      title: "Corporate Profile 2024",
      description: "Comprehensive overview of our services, experience, and safety protocols.",
      fileSize: "4.2 MB",
      fileType: "PDF",
      downloadUrl: "#",
      category: "Catalog"
    },
    {
      id: "2",
      title: "SmartGuard Pro User Manual",
      description: "Technical guide for operating the SmartGuard Pro surveillance system.",
      fileSize: "8.5 MB",
      fileType: "PDF",
      downloadUrl: "#",
      category: "Manual"
    }
  ];

  const activeDownloads = downloads.length > 0 ? downloads : defaultDownloads;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#01357D]/5 text-[#01357D] font-bold text-xs uppercase tracking-widest mb-4">
              <ShieldCheck size={14} />
              Secure Technical Resources
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-[#01357D] uppercase tracking-tighter mb-6">
              Resource <span className="text-primary">Center</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Access the latest technical documentation, user manuals, and corporate resources for our security solutions.
            </p>
          </div>

          <div className="grid gap-6">
            {activeDownloads.map((file) => (
              <div 
                key={file.id} 
                className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-[#01357D] hover:shadow-xl hover:shadow-[#01357D]/5 transition-all duration-300"
              >
                <div className="flex items-start gap-6 mb-4 md:mb-0">
                  <div className="w-14 h-14 bg-[#01357D]/5 rounded-xl flex items-center justify-center text-[#01357D] group-hover:bg-[#01357D] group-hover:text-white transition-colors duration-300">
                    <FileText size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-[#01357D] text-xl tracking-tight">{file.title}</h3>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wider">
                        {file.fileType}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm max-w-md mb-2">{file.description}</p>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <span>Category: {file.category}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span>Size: {file.fileSize}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex w-full md:w-auto gap-3">
                  <a href={file.downloadUrl} className="flex-1 md:flex-none" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full md:w-auto gap-2 bg-[#01357D] hover:bg-primary font-bold uppercase tracking-widest text-[10px] h-12 px-8 shadow-lg shadow-[#01357D]/20">
                      <Download size={16} />
                      Download
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {activeDownloads.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No resources available for download at this time.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
