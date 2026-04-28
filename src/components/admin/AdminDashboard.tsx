"use client";

import React, { useState } from "react";
import { Plus, Trash2, Package, LayoutGrid, LogOut, Check, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdmin } from "@/context/AdminContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminDashboardProps {
  onClose: () => void;
}

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  const { 
    products, projects, 
    addProduct, updateProduct, removeProduct, 
    addProject, updateProject, removeProject, 
    logout 
  } = useAdmin();
  const [activeTab, setActiveTab] = useState("products");
  const [editingId, setEditingId] = useState<string | null>(null);

  // New Product Form State
  const initialProduct = {
    name: "",
    modelNumber: "",
    description: "",
    category: "",
    image: "/images/modern_4k_cctv_camera_1776596648585.png",
    tag: "",
  };
  const [newProduct, setNewProduct] = useState(initialProduct);

  // New Project Form State
  const initialProject = {
    title: "",
    location: "",
    description: "",
    image: "portfolio-warehouse",
  };
  const [newProject, setNewProject] = useState(initialProject);

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct({ ...newProduct, id: editingId });
      setEditingId(null);
    } else {
      addProduct({ ...newProduct, id: Math.random().toString(36).substr(2, 9) });
    }
    setNewProduct(initialProduct);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProject(newProject);
      setEditingId(null);
    } else {
      addProject(newProject);
    }
    setNewProject(initialProject);
  };

  const startEditingProduct = (product: any) => {
    setNewProduct(product);
    setEditingId(product.id);
    setActiveTab("products");
  };

  const startEditingProject = (project: any) => {
    setNewProject(project);
    setEditingId(project.title); // Title is used as ID for projects in context
    setActiveTab("projects");
  };

  const categories = ["CCTV Cameras", "Recording Units", "Smart Home", "Access Control", "Specialized"];

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setEditingId(null);
    setNewProduct(initialProduct);
    setNewProject(initialProject);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-6 border-b flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="bg-[#01357D] text-white p-2 rounded-lg">
            <LayoutGrid size={20} />
          </div>
          <h2 className="text-xl font-headline font-bold text-[#01357D] uppercase tracking-tight">Management Portal</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-500 hover:bg-slate-100 font-bold uppercase tracking-widest text-[10px]">
            Close
          </Button>
          <Button variant="outline" size="sm" onClick={logout} className="gap-2 border-red-200 text-red-600 hover:bg-red-50 font-bold uppercase tracking-widest text-[10px]">
            <LogOut size={14} />
            Logout
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-2 border-b">
          <TabsList className="bg-slate-100 p-1 w-full flex">
            <TabsTrigger value="products" className="flex-1 gap-2 font-bold uppercase tracking-widest text-[10px]">
              <Package size={14} />
              Products ({products.length})
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex-1 gap-2 font-bold uppercase tracking-widest text-[10px]">
              <LayoutGrid size={14} />
              Projects ({projects.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1 p-6">
          <TabsContent value="products" className="m-0 space-y-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
              <h3 className="font-bold text-[#01357D] uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                {editingId ? <Edit2 size={16} /> : <Plus size={16} />} 
                {editingId ? "Update Product" : "Add New Product"}
              </h3>
              <form onSubmit={handleProductSubmit} className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <Select 
                    value={editingId || "new"} 
                    onValueChange={(val) => {
                      if (val === "new") {
                        setEditingId(null);
                        setNewProduct(initialProduct);
                      } else {
                        const prod = products.find(p => p.id === val);
                        if (prod) startEditingProduct(prod);
                      }
                    }}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Product to Edit or Add New" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">-- Add New Product --</SelectItem>
                      {products.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Input 
                  placeholder="Product Name" 
                  value={newProduct.name} 
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
                  required 
                  className="bg-white" 
                />

                <Input placeholder="Model Number" value={newProduct.modelNumber} onChange={e => setNewProduct({...newProduct, modelNumber: e.target.value})} required className="bg-white" />
                
                <Select value={newProduct.category} onValueChange={(val) => setNewProduct({...newProduct, category: val})}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input placeholder="Tag (e.g. New, Best Seller)" value={newProduct.tag} onChange={e => setNewProduct({...newProduct, tag: e.target.value})} className="bg-white" />
                <div className="col-span-2">
                  <Textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} required className="bg-white" />
                </div>
                <Button type="submit" className="col-span-2 bg-primary font-bold uppercase tracking-widest h-12 shadow-lg shadow-primary/20">
                  {editingId ? "Save Changes" : "Deploy to Catalog"}
                </Button>
                {editingId && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => { setEditingId(null); setNewProduct(initialProduct); }}
                    className="col-span-2 text-slate-400 uppercase font-bold text-[10px]"
                  >
                    Cancel Editing
                  </Button>
                )}
              </form>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Active Inventory</h3>
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 relative bg-slate-100 rounded overflow-hidden">
                      <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#01357D] text-sm">{product.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{product.modelNumber}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => startEditingProduct(product)} className="text-slate-300 hover:text-[#01357D] hover:bg-slate-50">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeProduct(product.id)} className="text-slate-300 hover:text-red-500 hover:bg-red-50">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="m-0 space-y-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
              <h3 className="font-bold text-[#01357D] uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                {editingId ? <Edit2 size={16} /> : <Plus size={16} />} 
                {editingId ? "Update Project" : "Register New Project"}
              </h3>
              <form onSubmit={handleProjectSubmit} className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <Select 
                    value={editingId || "new"} 
                    onValueChange={(val) => {
                      if (val === "new") {
                        setEditingId(null);
                        setNewProject(initialProject);
                      } else {
                        const proj = projects.find(p => p.title === val);
                        if (proj) startEditingProject(proj);
                      }
                    }}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Project to Edit or Add New" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">-- Add New Project --</SelectItem>
                      {projects.map(p => (
                        <SelectItem key={p.title} value={p.title}>{p.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Input 
                  placeholder="Project Title" 
                  value={newProject.title} 
                  onChange={e => setNewProject({...newProject, title: e.target.value})} 
                  required 
                  className="bg-white" 
                  disabled={!!editingId} 
                />

                <Input placeholder="Location" value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} required className="bg-white" />
                <div className="col-span-2">
                  <Textarea placeholder="Project Scope/Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required className="bg-white" />
                </div>
                <Button type="submit" className="col-span-2 bg-[#01357D] font-bold uppercase tracking-widest h-12 shadow-lg">
                  {editingId ? "Update Archive" : "Archive in Portfolio"}
                </Button>
                {editingId && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => { setEditingId(null); setNewProject(initialProject); }}
                    className="col-span-2 text-slate-400 uppercase font-bold text-[10px]"
                  >
                    Cancel Editing
                  </Button>
                )}
              </form>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Current Portfolio</h3>
              {projects.map((project, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded text-slate-400">
                      <LayoutGrid size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#01357D] text-sm">{project.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">{project.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => startEditingProject(project)} className="text-slate-300 hover:text-[#01357D] hover:bg-slate-50">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeProject(project.title)} className="text-slate-300 hover:text-red-500 hover:bg-red-50">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
      
      <div className="p-4 border-t bg-slate-50 text-[9px] text-center text-slate-400 uppercase tracking-[0.2em] font-bold">
        Session Status: Authenticated Admin | System Version 1.0.2
      </div>
    </div>
  );
}
