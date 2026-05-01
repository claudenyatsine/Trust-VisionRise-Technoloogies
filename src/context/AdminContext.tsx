"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS, Product } from "@/lib/products";
import { supabase } from "@/lib/supabase";

export interface Project {
  id?: string;
  title: string;
  location: string;
  description: string;
  image: string;
  images?: string[];
  created_at?: string;
}

export interface GalleryImage {
  id?: string;
  image_url: string;
  description: string;
  category?: string;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface DownloadableFile {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
  category: string;
}

interface AdminContextType {
  products: Product[];
  projects: Project[];
  galleryImages: GalleryImage[];
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  newArrivals: Product[];
<<<<<<< HEAD
  addNewArrival: (product: Product) => Promise<void>;
  updateNewArrival: (product: Product) => Promise<void>;
  removeNewArrival: (id: string) => Promise<void>;
  moveNewArrivalToProducts: (id: string) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  gallery: GalleryItem[];
  addGalleryItem: (item: GalleryItem) => Promise<void>;
  updateGalleryItem: (item: GalleryItem) => Promise<void>;
  removeGalleryItem: (id: string) => Promise<void>;
  downloads: DownloadableFile[];
  addDownload: (file: DownloadableFile) => void;
  updateDownload: (file: DownloadableFile) => void;
  removeDownload: (id: string) => void;
  refreshData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]); // Keep for internal use/legacy if needed
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [downloads, setDownloads] = useState<DownloadableFile[]>([]);

  const refreshData = async () => {
    try {
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_new_arrival', false)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;
      setProducts((productsData || []).map((p: any) => ({
        ...p,
        modelNumber: p.model_number
      })));

      // Fetch new arrivals
      const { data: newArrivalsData, error: newArrivalsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_new_arrival', true)
        .order('created_at', { ascending: false });

      if (newArrivalsError) throw newArrivalsError;
      setNewArrivals((newArrivalsData || []).map((p: any) => ({
        ...p,
        modelNumber: p.model_number
      })));

      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;
      setProjects(projectsData || []);

      // Fetch gallery images
      const { data: galleryData, error: galleryError } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (galleryError) throw galleryError;
      
      const mappedGallery: GalleryItem[] = (galleryData || []).map((img: any) => ({
        id: img.id,
        title: img.description, // Mapping description to title for the new UI
        image: img.image_url,   // Mapping image_url to image for the new UI
        category: img.category || 'Installation'
      }));
      
      setGallery(mappedGallery);
      setGalleryImages(galleryData || []);
    } catch (error: any) {
      console.error("Error refreshing data from Supabase:", error?.message || error);
    }
  };

  useEffect(() => {
    refreshData();
    const adminSession = sessionStorage.getItem("trust_vision_admin");
    const savedDownloads = localStorage.getItem("trust_vision_downloads");
    
    if (savedDownloads) {
      const parsed = JSON.parse(savedDownloads);
      if (parsed.length > 0) setDownloads(parsed);
    }
    
    if (adminSession === "true") setIsAdmin(true);
  }, []);

  // Sync downloads to localStorage (as fallback since we don't have a table yet)
  useEffect(() => {
    localStorage.setItem("trust_vision_downloads", JSON.stringify(downloads));
  }, [downloads]);

  const login = (password: string) => {
    if (password === "12345678") {
      setIsAdmin(true);
      sessionStorage.setItem("trust_vision_admin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("trust_vision_admin");
  };

  const addProduct = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .insert([{ 
        name: product.name,
        model_number: product.modelNumber,
        description: product.description,
        category: product.category,
        image: product.image,
        images: product.images,
        tag: product.tag,
        is_new_arrival: false
      }]);
    
    if (error) {
      console.error("Error adding product:", error);
      throw error;
    }
    await refreshData();
  };

  const updateProduct = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({ 
        name: product.name,
        model_number: product.modelNumber,
        description: product.description,
        category: product.category,
        image: product.image,
        images: product.images,
        tag: product.tag
      })
      .eq('id', product.id);

    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }
    await refreshData();
  };

  const removeProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error removing product:", error);
      throw error;
    }
    await refreshData();
  };

  const addNewArrival = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .insert([{ 
        name: product.name,
        model_number: product.modelNumber,
        description: product.description,
        category: product.category,
        image: product.image,
        images: product.images,
        tag: product.tag,
        is_new_arrival: true
      }]);

    if (error) {
      console.error("Error adding new arrival:", error);
      throw error;
    }
    await refreshData();
  };

  const updateNewArrival = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({ 
        name: product.name,
        model_number: product.modelNumber,
        description: product.description,
        category: product.category,
        image: product.image,
        images: product.images,
        tag: product.tag
      })
      .eq('id', product.id);

    if (error) {
      console.error("Error updating new arrival:", error);
      throw error;
    }
    await refreshData();
  };

  const removeNewArrival = async (id: string) => {
    await removeProduct(id);
  };

  const moveNewArrivalToProducts = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .update({ is_new_arrival: false })
      .eq('id', id);

    if (error) {
      console.error("Error moving new arrival to products:", error);
      throw error;
    }
    await refreshData();
  };

  const addProject = async (project: Project) => {
    const { error } = await supabase
      .from('projects')
      .insert([{ 
        title: project.title,
        location: project.location,
        description: project.description,
        image: project.image,
        images: project.images
      }]);

    if (error) {
      console.error("Error adding project:", error);
      throw error;
    }
    await refreshData();
  };

  const updateProject = async (project: Project) => {
    const { error } = await supabase
      .from('projects')
      .update({ 
        title: project.title,
        location: project.location,
        description: project.description,
        image: project.image,
        images: project.images
      })
      .eq('id', project.id);

    if (error) {
      console.error("Error updating project:", error);
      throw error;
    }
    await refreshData();
  };

  const removeProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error removing project:", error);
      throw error;
    }
    await refreshData();
  };

  // Gallery methods unified to use Supabase
  const addGalleryItem = async (item: GalleryItem) => {
    const { error } = await supabase
      .from('gallery_images')
      .insert([{ 
        image_url: item.image,
        description: item.title,
        category: item.category
      }]);
    
    if (error) {
      console.error("Error adding gallery image:", error);
      throw error;
    }
    await refreshData();
  };

  const updateGalleryItem = async (updatedItem: GalleryItem) => {
    const { error } = await supabase
      .from('gallery_images')
      .update({ 
        image_url: updatedItem.image,
        description: updatedItem.title,
        category: updatedItem.category
      })
      .eq('id', updatedItem.id);

    if (error) {
      console.error("Error updating gallery image:", error);
      throw error;
    }
    await refreshData();
  };

  const removeGalleryItem = async (id: string) => {
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error removing gallery image:", error);
      throw error;
    }
    await refreshData();
  };

  // Downloads methods (using localStorage for now as fallback)
  const addDownload = (file: DownloadableFile) => {
    setDownloads((prev) => [...prev, file]);
  };

  const updateDownload = (updatedFile: DownloadableFile) => {
    setDownloads((prev) => prev.map((file) => (file.id === updatedFile.id ? updatedFile : file)));
  };

  const removeDownload = (id: string) => {
    setDownloads((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        newArrivals,
        addNewArrival,
        updateNewArrival,
        removeNewArrival,
        moveNewArrivalToProducts,
        projects,
        galleryImages,
        isAdmin,
        login,
        logout,
        addProduct,
        updateProduct,
        removeProduct,
        addProject,
        updateProject,
        removeProject,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        removeGalleryItem,
        downloads,
        addDownload,
        updateDownload,
        removeDownload,
        refreshData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
