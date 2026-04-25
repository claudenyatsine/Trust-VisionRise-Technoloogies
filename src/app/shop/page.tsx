"use client";

import React, { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAdmin } from "@/context/AdminContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Star, Plus, SlidersHorizontal, PackageSearch, Eye } from "lucide-react";
import Image from "next/image";
import { ItemDetailsModal } from "../../components/ItemDetailsModal";

export default function ShopPage() {
  const { products } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetails = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.modelNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, products]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container max-w-7xl mx-auto px-4">
          
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-[#01357D] uppercase tracking-tighter mb-4">
              Our <span className="text-primary">Product</span> Catalog
            </h1>
            <p className="text-slate-600 max-w-2xl text-lg">
              Browse through our full range of industrial surveillance equipment. Professional tools for professional protection.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between sticky top-24 z-30 bg-slate-50/80 backdrop-blur-sm py-4">
            <div className="relative w-full md:max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                type="text"
                placeholder="Search by product name or model number..."
                className="pl-12 h-14 bg-white border-0 shadow-sm focus-visible:ring-primary rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "bg-white text-slate-600 border-0 shadow-sm hover:bg-slate-100"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-8 flex justify-between items-center text-sm font-medium text-slate-500">
            <p>Showing {filteredProducts.length} of {products.length} products</p>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Sort: Featured</span>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div id="products" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden flex flex-col h-full cursor-pointer" onClick={() => openDetails(product)}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.tag && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-white uppercase font-bold tracking-wider px-3 py-1 text-[10px]">
                          {product.tag}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <Button size="icon" className="rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors">
                        <Eye className="h-5 w-5" />
                      </Button>
                      <Button size="icon" className="rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="flex-grow">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">{product.category}</div>
                    <CardTitle className="text-xl font-headline font-bold text-[#01357D] tracking-tight mb-2">
                      {product.name}
                    </CardTitle>
                    <div className="text-xs font-mono text-slate-400 mb-3">{product.modelNumber}</div>
                    <CardDescription className="text-slate-500 line-clamp-3 text-sm leading-relaxed">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex justify-end items-center border-t border-slate-100 mt-auto px-6 py-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <div className="inline-flex items-center justify-center p-6 bg-slate-100 rounded-full mb-6">
                <PackageSearch className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-[#01357D] mb-2 uppercase">No Products Found</h3>
              <p className="text-slate-500">We couldn't find any products matching "{searchQuery}".</p>
              <Button 
                variant="link" 
                className="mt-4 text-primary font-bold uppercase"
                onClick={() => setSearchQuery("")}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {selectedItem && (
        <ItemDetailsModal 
          item={selectedItem} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      <Footer />
    </div>
  );
}
