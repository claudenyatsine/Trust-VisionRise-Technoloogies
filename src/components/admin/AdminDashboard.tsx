"use client";

import React, { useState } from "react";
import { Plus, Trash2, Package, LayoutGrid, LogOut, Check, X, Edit2, Sparkles, ArrowRight, Image as ImageIcon, Star, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdmin } from "@/context/AdminContext";
import { supabase } from "@/lib/supabase";
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
    gallery, addGalleryItem, updateGalleryItem, removeGalleryItem,
    downloads, addDownload, updateDownload, removeDownload,
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

  // New Gallery Image State
  const initialGalleryImage = {
    image_url: "",
    description: "",
    category: "CCTV",
  };
  const [newGalleryImage, setNewGalleryImage] = useState(initialGalleryImage);

  const [showNewCategoryInput, setShowNewCategoryInput] = useState<'product' | 'new-arrival' | null>(null);
  const [customCategory, setCustomCategory] = useState("");
  
  // New Gallery Form State
  const initialGalleryItem = {
    title: "",
    image: "",
    category: "Installation",
  };
  const [newGalleryItem, setNewGalleryItem] = useState(initialGalleryItem);

  // New Download Form State
  const initialDownload = {
    title: "",
    description: "",
    fileSize: "",
    fileType: "PDF",
    downloadUrl: "",
    category: "Manual",
  };
  const [newDownload, setNewDownload] = useState(initialDownload);

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    try {
      if (editingId) {
        await updateProduct({ ...newProduct, id: editingId });
        setEditingId(null);
      } else {
        await addProduct(newProduct);
      }
      setNewProduct(initialProduct);
    } catch (error) {
      console.error("Error submitting product:", error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    try {
      if (editingId) {
        await updateProject({ ...newProject, id: editingId });
        setEditingId(null);
      } else {
        await addProject(newProject);
      }
      setNewProject(initialProject);
    } catch (error) {
      console.error("Error submitting project:", error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    try {
      if (editingId) {
        await updateGalleryItem({ ...newGalleryItem, id: editingId });
        setEditingId(null);
      } else {
        await addGalleryItem({ ...newGalleryItem, id: Math.random().toString(36).substr(2, 9) });
      }
      setNewGalleryItem(initialGalleryItem);
    } catch (error) {
      console.error("Error submitting gallery item:", error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateDownload({ ...newDownload, id: editingId });
      setEditingId(null);
    } else {
      addDownload({ ...newDownload, id: Math.random().toString(36).substr(2, 9) });
    }
    setNewDownload(initialDownload);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'project' | 'new-arrival' | 'gallery') => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    const bucket = type === 'project' ? 'projects' : (type === 'gallery' ? 'gallery' : 'products');

    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        if (type === 'product') {
          setNewProduct(prev => ({ 
            ...prev, 
            images: [...(prev.images || []), publicUrl],
            image: prev.image && !prev.image.startsWith('/images') ? prev.image : publicUrl 
          }));
        } else if (type === 'project') {
          setNewProject(prev => ({ 
            ...prev, 
            images: [...(prev.images || []), publicUrl],
            image: prev.image && prev.image !== "portfolio-warehouse" ? prev.image : publicUrl
          }));
        } else if (type === 'new-arrival') {
          setNewNewArrival(prev => ({ 
            ...prev, 
            images: [...(prev.images || []), publicUrl],
            image: prev.image && !prev.image.startsWith('/images') ? prev.image : publicUrl
          }));
        } else if (type === 'gallery') {
          setNewGalleryItem(prev => ({ ...prev, image: publicUrl }));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    setIsUploading(false);
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

  const handleNewArrivalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    try {
      if (editingId) {
        await updateNewArrival({ ...newNewArrival, id: editingId });
        setEditingId(null);
      } else {
        await addNewArrival(newNewArrival);
      }
      setNewNewArrival(initialProduct);
    } catch (error) {
      console.error("Error submitting new arrival:", error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const startEditingProduct = (product: any) => {
    setNewProduct(product);
    setEditingId(product.id);
    setActiveTab("products");
  };

  const startEditingProject = (project: any) => {
    setNewProject(project);
    setEditingId(project.id);
    setActiveTab("projects");
  };

  const startEditingNewArrival = (item: any) => {
    setNewNewArrival(item);
    setEditingId(item.id);
    setActiveTab("new-arrivals");
  };

  const startEditingGalleryItem = (item: any) => {
    setNewGalleryItem(item);
    setEditingId(item.id);
    setActiveTab("gallery");
  };

  const startEditingDownload = (item: any) => {
    setNewDownload(item);
    setEditingId(item.id);
    setActiveTab("downloads");
  };

  const categories = Array.from(new Set([
    "CCTV Cameras", "Recording Units", "Smart Home", "Access Control", "Specialized",
    ...products.map(p => p.category),
    ...newArrivals.map(p => p.category)
  ])).filter(Boolean).sort();

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setEditingId(null);
    setNewProduct(initialProduct);
    setNewProject(initialProject);
    setNewNewArrival(initialProduct);
    setNewGalleryItem(initialGalleryItem);
    setNewDownload(initialDownload);
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
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

      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="px-6 py-2 border-b overflow-hidden">
          <TabsList className="bg-slate-100 p-1 w-full flex overflow-x-auto scrollbar-hide justify-start min-w-max md:min-w-0">
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
            <TabsTrigger value="gallery" className="flex-1 gap-2 font-bold uppercase tracking-widest text-[10px]">
              <ImageIcon size={14} />
              Gallery ({gallery.length})
            </TabsTrigger>
            <TabsTrigger value="downloads" className="flex-1 gap-2 font-bold uppercase tracking-widest text-[10px]">
              <Download size={14} />
              Downloads ({downloads.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 w-full overflow-y-auto custom-scrollbar bg-white">
          <div className="p-6">
            <TabsContent value="products" className="m-0 space-y-8 focus-visible:ring-0 focus-visible:ring-offset-0">
            <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
              <h3 className="font-bold text-[#01357D] uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                {editingId ? <Edit2 size={16} /> : <Plus size={16} />} 
                {editingId ? "Update Product" : "Add New Product"}
              </h3>
              <form onSubmit={handleProductSubmit} className="grid grid-cols-2 gap-4">
                
                <Input 
                  placeholder="Product Name" 
                  value={newProduct.name} 
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
                  required 
                  className="bg-white" 
                />

                <Input placeholder="Model Number" value={newProduct.modelNumber} onChange={e => setNewProduct({...newProduct, modelNumber: e.target.value})} required className="bg-white" />
                
                <div className="flex gap-2">
                  {showNewCategoryInput === 'product' ? (
                    <div className="flex gap-2 flex-1">
                      <Input 
                        placeholder="Type new category..." 
                        value={customCategory} 
                        onChange={e => setCustomCategory(e.target.value)}
                        className="bg-white"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (customCategory.trim()) {
                              setNewProduct({...newProduct, category: customCategory.trim()});
                              setShowNewCategoryInput(null);
                              setCustomCategory("");
                            }
                          }
                        }}
                      />
                      <div className="flex gap-1">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 text-green-600 border-green-200 bg-green-50"
                          onClick={() => {
                            if (customCategory.trim()) {
                              setNewProduct({...newProduct, category: customCategory.trim()});
                              setShowNewCategoryInput(null);
                              setCustomCategory("");
                            }
                          }}
                        >
                          <Check size={16} />
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 text-slate-400 border-slate-200 bg-slate-50"
                          onClick={() => setShowNewCategoryInput(null)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Select value={newProduct.category} onValueChange={(val) => {
                      if (val === "add_new") {
                        setShowNewCategoryInput('product');
                      } else {
                        setNewProduct({...newProduct, category: val});
                      }
                    }}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                        <div className="border-t mt-1 pt-1">
                          <SelectItem value="add_new" className="text-[#01357D] font-bold">
                            + Add Category
                          </SelectItem>
                        </div>
                      </SelectContent>
                    </Select>
                  )}
                </div>

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
                    <label className={`aspect-square rounded-md border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {isUploading ? <Sparkles size={16} className="animate-spin text-[#01357D]" /> : <Plus size={16} className="text-slate-400" />}
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">{isUploading ? 'Uploading...' : 'Add'}</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'product')} 
                        className="hidden" 
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
                <Button type="submit" disabled={isSubmittingForm || isUploading} className="col-span-2 bg-primary font-bold uppercase tracking-widest h-12 shadow-lg shadow-primary/20">
                  {isSubmittingForm ? "Processing..." : (editingId ? "Save Changes" : "Deploy to Catalog")}
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
                    <Button variant="ghost" size="icon" onClick={() => removeProduct(product.id!)} className="text-slate-300 hover:text-red-500 hover:bg-red-50">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new-arrivals" className="m-0 space-y-8 focus-visible:ring-0 focus-visible:ring-offset-0">
            <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
              <h3 className="font-bold text-[#01357D] uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                {editingId ? <Edit2 size={16} /> : <Plus size={16} />} 
                {editingId ? "Update New Arrival" : "Add New Arrival"}
              </h3>
              <form onSubmit={handleNewArrivalSubmit} className="grid grid-cols-2 gap-4">
                
                <Input 
                  placeholder="Service/Product Name" 
                  value={newNewArrival.name} 
                  onChange={e => setNewNewArrival({...newNewArrival, name: e.target.value})} 
                  required 
                  className="bg-white" 
                />

                <Input placeholder="Model/Ref Number" value={newNewArrival.modelNumber} onChange={e => setNewNewArrival({...newNewArrival, modelNumber: e.target.value})} required className="bg-white" />
                
                <div className="flex gap-2">
                  {showNewCategoryInput === 'new-arrival' ? (
                    <div className="flex gap-2 flex-1">
                      <Input 
                        placeholder="Type new category..." 
                        value={customCategory} 
                        onChange={e => setCustomCategory(e.target.value)}
                        className="bg-white"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (customCategory.trim()) {
                              setNewNewArrival({...newNewArrival, category: customCategory.trim()});
                              setShowNewCategoryInput(null);
                              setCustomCategory("");
                            }
                          }
                        }}
                      />
                      <div className="flex gap-1">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 text-green-600 border-green-200 bg-green-50"
                          onClick={() => {
                            if (customCategory.trim()) {
                              setNewNewArrival({...newNewArrival, category: customCategory.trim()});
                              setShowNewCategoryInput(null);
                              setCustomCategory("");
                            }
                          }}
                        >
                          <Check size={16} />
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 text-slate-400 border-slate-200 bg-slate-50"
                          onClick={() => setShowNewCategoryInput(null)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Select value={newNewArrival.category} onValueChange={(val) => {
                      if (val === "add_new") {
                        setShowNewCategoryInput('new-arrival');
                      } else {
                        setNewNewArrival({...newNewArrival, category: val});
                      }
                    }}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                        <div className="border-t mt-1 pt-1">
                          <SelectItem value="add_new" className="text-[#01357D] font-bold">
                            + Add Category
                          </SelectItem>
                        </div>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <Input placeholder="Tag (e.g. Just In, Limited)" value={newNewArrival.tag} onChange={e => setNewNewArrival({...newNewArrival, tag: e.target.value})} className="bg-white" />
                <div className="col-span-2">
                  <Textarea placeholder="Detailed Description" value={newNewArrival.description} onChange={e => setNewNewArrival({...newNewArrival, description: e.target.value})} required className="bg-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#01357D] mb-2">New Arrival Images (First one selected will be profile unless changed)</label>
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
                    <label className={`aspect-square rounded-md border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {isUploading ? <Sparkles size={16} className="animate-spin text-[#01357D]" /> : <Plus size={16} className="text-slate-400" />}
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">{isUploading ? 'Uploading...' : 'Add'}</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'new-arrival')} 
                        className="hidden" 
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
                <Button type="submit" disabled={isSubmittingForm || isUploading} className="col-span-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold uppercase tracking-widest h-12 shadow-lg">
                  {isSubmittingForm ? "Processing..." : (editingId ? "Update Entry" : "Launch as New Arrival")}
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
                      onClick={() => moveNewArrivalToProducts(item.id!)}
                      className="text-[#01357D] hover:bg-slate-50 gap-1 font-bold uppercase tracking-widest text-[9px]"
                      title="Move to Products"
                    >
                      <ArrowRight size={14} />
                      Catalog
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => startEditingNewArrival(item)} className="text-slate-300 hover:text-[#01357D] hover:bg-slate-50">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeNewArrival(item.id!)} className="text-slate-300 hover:text-red-500 hover:bg-red-50">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="m-0 space-y-8 focus-visible:ring-0 focus-visible:ring-offset-0">
            <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
              <h3 className="font-bold text-[#01357D] uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                {editingId ? <Edit2 size={16} /> : <Plus size={16} />} 
                {editingId ? "Update Project" : "Register New Project"}
              </h3>
              <form onSubmit={handleProjectSubmit} className="grid grid-cols-2 gap-4">

                <Input 
                  placeholder="Project Title" 
                  value={newProject.title} 
                  onChange={e => setNewProject({...newProject, title: e.target.value})} 
                  required 
                  className="bg-white" 
                />

                <Input placeholder="Location" value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} required className="bg-white" />
                <div className="col-span-2">
                  <Textarea placeholder="Project Scope/Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required className="bg-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#01357D] mb-2">Project Portfolio Gallery (First one selected will be profile unless changed)</label>
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
                    <label className={`aspect-square rounded-md border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {isUploading ? <Sparkles size={16} className="animate-spin text-[#01357D]" /> : <Plus size={16} className="text-slate-400" />}
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">{isUploading ? 'Uploading...' : 'Add'}</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'project')} 
                        className="hidden" 
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
                <Button type="submit" disabled={isSubmittingForm || isUploading} className="col-span-2 bg-[#01357D] font-bold uppercase tracking-widest h-12 shadow-lg">
                  {isSubmittingForm ? "Processing..." : (editingId ? "Update Archive" : "Archive in Portfolio")}
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
                    <Button variant="ghost" size="icon" onClick={() => removeProject(project.id!)} className="text-slate-300 hover:text-red-500 hover:bg-red-50">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="m-0 space-y-8 focus-visible:ring-0 focus-visible:ring-offset-0">
            <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
              <h3 className="font-bold text-[#01357D] uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                {editingId ? <Edit2 size={16} /> : <Plus size={16} />} 
                {editingId ? "Update Gallery Image" : "Add Image to Gallery (Syncing to Cloud)"}
              </h3>
              <form onSubmit={handleGallerySubmit} className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="Image Title" 
                  value={newGalleryItem.title} 
                  onChange={e => setNewGalleryItem({...newGalleryItem, title: e.target.value})} 
                  required 
                  className="bg-white" 
                />
                <Select value={newGalleryItem.category} onValueChange={(val) => setNewGalleryItem({...newGalleryItem, category: val})}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Installation">Installation</SelectItem>
                    <SelectItem value="Products">Products</SelectItem>
                    <SelectItem value="Team">Our Team</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                  </SelectContent>
                </Select>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#01357D] mb-2">Gallery Image</label>
                  <div className="flex gap-4 items-center">
                    {newGalleryItem.image && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden border">
                        <img src={newGalleryItem.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className={`flex-1 h-24 rounded-md border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors ${isUploading ? 'opacity-50' : ''}`}>
                      {isUploading ? <Sparkles size={16} className="animate-spin text-[#01357D]" /> : <Plus size={16} className="text-slate-400" />}
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'gallery')} 
                        className="hidden" 
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
                <Button type="submit" disabled={isSubmittingForm || isUploading || !newGalleryItem.image} className="col-span-2 bg-[#01357D] font-bold uppercase tracking-widest h-12 shadow-lg">
                  {isSubmittingForm ? "Saving..." : (editingId ? "Update Image" : "Publish to Gallery")}
                </Button>
              </form>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden border bg-white">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <p className="text-white font-bold text-[10px] uppercase text-center px-2">{item.title}</p>
                    <div className="flex gap-2">
                      <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => startEditingGalleryItem(item)}>
                        <Edit2 size={14} />
                      </Button>
                      <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => removeGalleryItem(item.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="downloads" className="m-0 space-y-8 focus-visible:ring-0 focus-visible:ring-offset-0">
            <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
              <h3 className="font-bold text-[#01357D] uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                {editingId ? <Edit2 size={16} /> : <Plus size={16} />} 
                {editingId ? "Update Resource" : "Add Downloadable Resource"}
              </h3>
              <form onSubmit={handleDownloadSubmit} className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="Resource Title" 
                  value={newDownload.title} 
                  onChange={e => setNewDownload({...newDownload, title: e.target.value})} 
                  required 
                  className="bg-white" 
                />
                <Select value={newDownload.category} onValueChange={(val) => setNewDownload({...newDownload, category: val})}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">User Manual</SelectItem>
                    <SelectItem value="Software">Software/Firmware</SelectItem>
                    <SelectItem value="Catalog">Catalog/Brochure</SelectItem>
                    <SelectItem value="Certificate">Certifications</SelectItem>
                  </SelectContent>
                </Select>
                <div className="col-span-2">
                  <Input 
                    placeholder="Brief Description" 
                    value={newDownload.description} 
                    onChange={e => setNewDownload({...newDownload, description: e.target.value})} 
                    className="bg-white" 
                  />
                </div>
                <Input 
                  placeholder="File Size (e.g. 2.4 MB)" 
                  value={newDownload.fileSize} 
                  onChange={e => setNewDownload({...newDownload, fileSize: e.target.value})} 
                  className="bg-white" 
                />
                <Input 
                  placeholder="Download URL" 
                  value={newDownload.downloadUrl} 
                  onChange={e => setNewDownload({...newDownload, downloadUrl: e.target.value})} 
                  required 
                  className="bg-white" 
                />
                <Button type="submit" className="col-span-2 bg-[#01357D] font-bold uppercase tracking-widest h-12 shadow-lg">
                  {editingId ? "Update Resource" : "Add to Downloads"}
                </Button>
              </form>
            </div>

            <div className="space-y-3">
              {downloads.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-[#01357D]">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#01357D] text-sm">{file.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{file.category} • {file.fileSize}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => startEditingDownload(file)} className="text-slate-300 hover:text-[#01357D] hover:bg-slate-50">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeDownload(file.id)} className="text-slate-300 hover:text-red-500 hover:bg-red-50">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          </div>
        </div>
      </Tabs>
      
      <div className="p-4 border-t bg-slate-50 text-[9px] text-center text-slate-400 uppercase tracking-[0.2em] font-bold">
        Session Status: Authenticated Admin | System Version 1.0.2
      </div>
    </div>
  );
}
