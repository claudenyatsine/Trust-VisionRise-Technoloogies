"use client";

import React, { useState } from "react";
import { Plus, Trash2, Package, LayoutGrid, LogOut, Check, Edit2, Sparkles, ArrowRight, Image as ImageIcon, Star } from "lucide-react";
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
    products, projects, newArrivals,
    addProduct, updateProduct, removeProduct, 
    addProject, updateProject, removeProject, 
    addNewArrival, updateNewArrival, removeNewArrival, moveNewArrivalToProducts,
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
    images: [] as string[],
    tag: "",
  };
  const [newProduct, setNewProduct] = useState(initialProduct);
  const [newNewArrival, setNewNewArrival] = useState(initialProduct);

  // New Project Form State
  const initialProject = {
    title: "",
    location: "",
    description: "",
    image: "portfolio-warehouse",
    images: [] as string[],
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'project' | 'new-arrival') => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === 'product') {
          setNewProduct(prev => ({ 
            ...prev, 
            images: [...(prev.images || []), base64String],
            image: prev.image && !prev.image.startsWith('/images') ? prev.image : base64String 
          }));
        } else if (type === 'project') {
          setNewProject(prev => ({ 
            ...prev, 
            images: [...(prev.images || []), base64String],
            image: prev.image && prev.image !== "portfolio-warehouse" ? prev.image : base64String
          }));
        } else if (type === 'new-arrival') {
          setNewNewArrival(prev => ({ 
            ...prev, 
            images: [...(prev.images || []), base64String],
            image: prev.image && !prev.image.startsWith('/images') ? prev.image : base64String
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number, type: 'product' | 'project' | 'new-arrival') => {
    if (type === 'product') {
      const updatedImages = [...(newProduct.images || [])];
      updatedImages.splice(index, 1);
      setNewProduct({ ...newProduct, images: updatedImages });
    } else if (type === 'project') {
      const updatedImages = [...(newProject.images || [])];
      updatedImages.splice(index, 1);
      setNewProject({ ...newProject, images: updatedImages });
    } else if (type === 'new-arrival') {
      const updatedImages = [...(newNewArrival.images || [])];
      updatedImages.splice(index, 1);
      setNewNewArrival({ ...newNewArrival, images: updatedImages });
    }
  };

  const setMainImage = (url: string, type: 'product' | 'project' | 'new-arrival') => {
    if (type === 'product') setNewProduct({ ...newProduct, image: url });
    else if (type === 'project') setNewProject({ ...newProject, image: url });
    else if (type === 'new-arrival') setNewNewArrival({ ...newNewArrival, image: url });
  };

  const handleNewArrivalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateNewArrival({ ...newNewArrival, id: editingId });
      setEditingId(null);
    } else {
      addNewArrival({ ...newNewArrival, id: Math.random().toString(36).substr(2, 9) });
    }
    setNewNewArrival(initialProduct);
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

  const startEditingNewArrival = (item: any) => {
    setNewNewArrival(item);
    setEditingId(item.id);
    setActiveTab("new-arrivals");
  };

  const categories = ["CCTV Cameras", "Recording Units", "Smart Home", "Access Control", "Specialized"];

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setEditingId(null);
    setNewProduct(initialProduct);
    setNewProject(initialProject);
    setNewNewArrival(initialProduct);
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
            <TabsTrigger value="new-arrivals" className="flex-1 gap-2 font-bold uppercase tracking-widest text-[10px]">
              <Sparkles size={14} />
              New Arrivals ({newArrivals.length})
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
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#01357D] mb-2">Product Images (First one selected will be profile unless changed)</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
                    {newProduct.images?.map((img, idx) => (
                      <div key={idx} className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${newProduct.image === img ? 'border-[#01357D] scale-105 shadow-md' : 'border-slate-200'}`}>
                        <img src={img} alt="Product" className="w-full h-full object-cover" />
                        <div className="absolute top-0.5 right-0.5 flex gap-0.5">
                          <button 
                            type="button"
                            onClick={() => setMainImage(img, 'product')}
                            className={`p-1 rounded-full ${newProduct.image === img ? 'bg-[#01357D] text-white' : 'bg-white/80 text-slate-400 hover:text-[#01357D]'}`}
                            title="Set as Main"
                          >
                            <Star size={10} fill={newProduct.image === img ? "currentColor" : "none"} />
                          </button>
                          <button 
                            type="button"
                            onClick={() => removeImage(idx, 'product')}
                            className="p-1 rounded-full bg-white/80 text-red-500 hover:text-red-700"
                            title="Remove"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <label className="aspect-square rounded-md border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                      <Plus size={16} className="text-slate-400" />
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">Add</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'product')} 
                        className="hidden" 
                      />
                    </label>
                  </div>
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

          <TabsContent value="new-arrivals" className="m-0 space-y-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
              <h3 className="font-bold text-[#01357D] uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                {editingId ? <Edit2 size={16} /> : <Plus size={16} />} 
                {editingId ? "Update New Arrival" : "Add New Arrival"}
              </h3>
              <form onSubmit={handleNewArrivalSubmit} className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <Select 
                    value={editingId || "new"} 
                    onValueChange={(val) => {
                      if (val === "new") {
                        setEditingId(null);
                        setNewNewArrival(initialProduct);
                      } else {
                        const item = newArrivals.find(p => p.id === val);
                        if (item) startEditingNewArrival(item);
                      }
                    }}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Item to Edit or Add New" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">-- Add New Arrival --</SelectItem>
                      {newArrivals.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Input 
                  placeholder="Service/Product Name" 
                  value={newNewArrival.name} 
                  onChange={e => setNewNewArrival({...newNewArrival, name: e.target.value})} 
                  required 
                  className="bg-white" 
                />

                <Input placeholder="Model/Ref Number" value={newNewArrival.modelNumber} onChange={e => setNewNewArrival({...newNewArrival, modelNumber: e.target.value})} required className="bg-white" />
                
                <Select value={newNewArrival.category} onValueChange={(val) => setNewNewArrival({...newNewArrival, category: val})}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input placeholder="Tag (e.g. Just In, Limited)" value={newNewArrival.tag} onChange={e => setNewNewArrival({...newNewArrival, tag: e.target.value})} className="bg-white" />
                <div className="col-span-2">
                  <Textarea placeholder="Detailed Description" value={newNewArrival.description} onChange={e => setNewNewArrival({...newNewArrival, description: e.target.value})} required className="bg-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#01357D] mb-2">New Arrival Images</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
                    {newNewArrival.images?.map((img, idx) => (
                      <div key={idx} className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${newNewArrival.image === img ? 'border-[#01357D] scale-105 shadow-md' : 'border-slate-200'}`}>
                        <img src={img} alt="Arrival" className="w-full h-full object-cover" />
                        <div className="absolute top-0.5 right-0.5 flex gap-0.5">
                          <button 
                            type="button"
                            onClick={() => setMainImage(img, 'new-arrival')}
                            className={`p-1 rounded-full ${newNewArrival.image === img ? 'bg-[#01357D] text-white' : 'bg-white/80 text-slate-400 hover:text-[#01357D]'}`}
                            title="Set as Main"
                          >
                            <Star size={10} fill={newNewArrival.image === img ? "currentColor" : "none"} />
                          </button>
                          <button 
                            type="button"
                            onClick={() => removeImage(idx, 'new-arrival')}
                            className="p-1 rounded-full bg-white/80 text-red-500 hover:text-red-700"
                            title="Remove"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <label className="aspect-square rounded-md border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                      <Plus size={16} className="text-slate-400" />
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">Add</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'new-arrival')} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>
                <Button type="submit" className="col-span-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold uppercase tracking-widest h-12 shadow-lg">
                  {editingId ? "Update Entry" : "Launch as New Arrival"}
                </Button>
                {editingId && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => { setEditingId(null); setNewNewArrival(initialProduct); }}
                    className="col-span-2 text-slate-400 uppercase font-bold text-[10px]"
                  >
                    Cancel Editing
                  </Button>
                )}
              </form>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Latest Arrivals</h3>
              {newArrivals.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs border border-dashed rounded-lg">
                  No new arrivals registered yet.
                </div>
              )}
              {newArrivals.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 relative bg-slate-100 rounded overflow-hidden flex items-center justify-center text-slate-400">
                      {item.image ? <img src={item.image} alt={item.name} className="object-cover w-full h-full" /> : <Sparkles size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#01357D] text-sm">{item.name}</h4>
                        <span className="bg-green-100 text-green-700 text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase">New</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono">{item.modelNumber}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => moveNewArrivalToProducts(item.id)}
                      className="text-[#01357D] hover:bg-slate-50 gap-1 font-bold uppercase tracking-widest text-[9px]"
                      title="Move to Products"
                    >
                      <ArrowRight size={14} />
                      Catalog
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => startEditingNewArrival(item)} className="text-slate-300 hover:text-[#01357D] hover:bg-slate-50">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeNewArrival(item.id)} className="text-slate-300 hover:text-red-500 hover:bg-red-50">
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
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#01357D] mb-2">Project Portfolio Gallery</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
                    {newProject.images?.map((img, idx) => (
                      <div key={idx} className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${newProject.image === img ? 'border-[#01357D] scale-105 shadow-md' : 'border-slate-200'}`}>
                        <img src={img} alt="Project" className="w-full h-full object-cover" />
                        <div className="absolute top-0.5 right-0.5 flex gap-0.5">
                          <button 
                            type="button"
                            onClick={() => setMainImage(img, 'project')}
                            className={`p-1 rounded-full ${newProject.image === img ? 'bg-[#01357D] text-white' : 'bg-white/80 text-slate-400 hover:text-[#01357D]'}`}
                            title="Set as Main"
                          >
                            <Star size={10} fill={newProject.image === img ? "currentColor" : "none"} />
                          </button>
                          <button 
                            type="button"
                            onClick={() => removeImage(idx, 'project')}
                            className="p-1 rounded-full bg-white/80 text-red-500 hover:text-red-700"
                            title="Remove"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <label className="aspect-square rounded-md border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                      <Plus size={16} className="text-slate-400" />
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">Add</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'project')} 
                        className="hidden" 
                      />
                    </label>
                  </div>
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
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded text-slate-400 overflow-hidden">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <LayoutGrid size={20} />
                      )}
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
