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
  addNewArrival: (product: Product) => Promise<void>;
  updateNewArrival: (product: Product) => Promise<void>;
  removeNewArrival: (id: string) => Promise<void>;
  moveNewArrivalToProducts: (id: string) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  addGalleryImage: (image: GalleryImage) => Promise<void>;
  removeGalleryImage: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
      setGalleryImages(galleryData || []);
    } catch (error: any) {
      console.error("Error refreshing data from Supabase:", error?.message || error);
      // Fallback to empty arrays or initial state if preferred, 
      // but here we just ensure we don't crash and maybe keep previous state
    }
  };

  useEffect(() => {
    refreshData();
    const adminSession = sessionStorage.getItem("trust_vision_admin");
    if (adminSession === "true") setIsAdmin(true);
  }, []);

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

  const addGalleryImage = async (image: GalleryImage) => {
    const { error } = await supabase
      .from('gallery_images')
      .insert([{ 
        image_url: image.image_url,
        description: image.description,
        category: image.category
      }]);
    
    if (error) {
      console.error("Error adding gallery image:", error);
      throw error;
    }
    await refreshData();
  };

  const removeGalleryImage = async (id: string) => {
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
        addGalleryImage,
        removeGalleryImage,
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
