-- Storage bucket setup commands (run these in Supabase SQL Editor)

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('products', 'products', true),
  ('gallery', 'gallery', true),
  ('projects', 'projects', true),
  ('downloads', 'downloads', true);

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all buckets
CREATE POLICY "Public read access for products bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "Public read access for gallery bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Public read access for projects bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'projects');

CREATE POLICY "Public read access for downloads bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'downloads');

-- Allow authenticated users to upload/update/delete files
CREATE POLICY "Authenticated users can upload to products" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update products files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete products files" ON storage.objects
  FOR DELETE USING (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload to gallery" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update gallery files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery files" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload to projects" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'projects' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'projects' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects files" ON storage.objects
  FOR DELETE USING (bucket_id = 'projects' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload to downloads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'downloads' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update downloads files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'downloads' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete downloads files" ON storage.objects
  FOR DELETE USING (bucket_id = 'downloads' AND auth.role() = 'authenticated');