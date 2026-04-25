-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  model_number TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image TEXT,
  images TEXT[],
  tag TEXT,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT,
  description TEXT,
  image TEXT,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create gallery_images table
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'Installation',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create downloads table
CREATE TABLE downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  fileSize TEXT,
  fileType TEXT,
  downloadUrl TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery_images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access on downloads" ON downloads FOR SELECT USING (true);

-- Create policies for authenticated users to insert/update/delete (for admin functionality)
CREATE POLICY "Allow authenticated insert on products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on products" ON products FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on gallery_images" ON gallery_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on gallery_images" ON gallery_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on gallery_images" ON gallery_images FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on downloads" ON downloads FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on downloads" ON downloads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete on downloads" ON downloads FOR DELETE USING (auth.role() = 'authenticated');