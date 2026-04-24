"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS, Product } from "@/lib/products";

export interface Project {
  title: string;
  location: string;
  description: string;
  image: string;
  images?: string[];
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
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  newArrivals: Product[];
  addNewArrival: (product: Product) => void;
  updateNewArrival: (product: Product) => void;
  removeNewArrival: (id: string) => void;
  moveNewArrivalToProducts: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  removeProject: (title: string) => void;
  gallery: GalleryItem[];
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  removeGalleryItem: (id: string) => void;
  downloads: DownloadableFile[];
  addDownload: (file: DownloadableFile) => void;
  updateDownload: (file: DownloadableFile) => void;
  removeDownload: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Initial projects from Portfolio.tsx
const initialProjects: Project[] = [
  {
    title: "Global Logistics Hub",
    location: "Chicago, IL",
    description: "Full-scale 4K IP surveillance for a 200,000 sq ft warehouse facility.",
    image: "portfolio-warehouse",
  },
  {
    title: "Metro Shopping Plaza",
    location: "Austin, TX",
    description: "Integrated AI loss prevention and perimeter monitoring for 40+ retail units.",
    image: "portfolio-retail",
  },
  {
    title: "The Summit Estates",
    location: "Aspen, CO",
    description: "Private thermal imaging and laser-tripwire security for a premier residential community.",
    image: "portfolio-estate",
  },
  {
    title: "Downtown Financial District",
    location: "New York, NY",
    description: "Advanced facial recognition and access control for high-rise office complex.",
    image: "portfolio-office",
  },
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [newArrivals, setNewArrivals] = useState<Product[]>(PRODUCTS.slice(0, 4));
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAdmin, setIsAdmin] = useState(false);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [downloads, setDownloads] = useState<DownloadableFile[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("trust_vision_products");
    const savedNewArrivals = localStorage.getItem("trust_vision_new_arrivals");
    const savedProjects = localStorage.getItem("trust_vision_projects");
    const savedGallery = localStorage.getItem("trust_vision_gallery");
    const savedDownloads = localStorage.getItem("trust_vision_downloads");
    const adminSession = sessionStorage.getItem("trust_vision_admin");

    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      if (parsed.length > 0) setProducts(parsed);
    }
    if (savedNewArrivals) {
      const parsed = JSON.parse(savedNewArrivals);
      if (parsed.length > 0) setNewArrivals(parsed);
    }
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      if (parsed.length > 0) setProjects(parsed);
    }
    if (savedGallery) {
      const parsed = JSON.parse(savedGallery);
      if (parsed.length > 0) setGallery(parsed);
    }
    if (savedDownloads) {
      const parsed = JSON.parse(savedDownloads);
      if (parsed.length > 0) setDownloads(parsed);
    }
    if (adminSession === "true") setIsAdmin(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("trust_vision_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("trust_vision_new_arrivals", JSON.stringify(newArrivals));
  }, [newArrivals]);

  useEffect(() => {
    localStorage.setItem("trust_vision_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("trust_vision_gallery", JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem("trust_vision_downloads", JSON.stringify(downloads));
  }, [downloads]);

  const login = (password: string) => {
    // Simple hardcoded password for the "backdoor"
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

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addNewArrival = (product: Product) => {
    setNewArrivals((prev) => [...prev, product]);
  };

  const updateNewArrival = (updatedProduct: Product) => {
    setNewArrivals((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const removeNewArrival = (id: string) => {
    setNewArrivals((prev) => prev.filter((p) => p.id !== id));
  };

  const moveNewArrivalToProducts = (id: string) => {
    const itemToMove = newArrivals.find((p) => p.id === id);
    if (itemToMove) {
      setProducts((prev) => [...prev, itemToMove]);
      setNewArrivals((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects((prev) => prev.map((p) => (p.title === updatedProject.title ? updatedProject : p)));
  };

  const removeProject = (title: string) => {
    setProjects((prev) => prev.filter((p) => p.title !== title));
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => [...prev, item]);
  };

  const updateGalleryItem = (updatedItem: GalleryItem) => {
    setGallery((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const removeGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

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
