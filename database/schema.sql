-- Supabase SQL Schema for Portfolio Admin
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Content table for static text (about bio, etc.)
CREATE TABLE IF NOT EXISTS content (
    id TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roles table (linked to experiences)
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    skills TEXT[] NOT NULL DEFAULT '{}',
    order_index INTEGER NOT NULL DEFAULT 0
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    github_url TEXT NOT NULL,
    live_url TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    colors TEXT[] NOT NULL DEFAULT '{"#3b82f6", "#8b5cf6"}',
    is_featured BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    order_index INTEGER NOT NULL DEFAULT 0
);

-- Cool Stuff table
CREATE TABLE IF NOT EXISTS cool_stuff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    prompt TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_roles_experience_id ON roles(experience_id);
CREATE INDEX IF NOT EXISTS idx_experiences_order ON experiences(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE cool_stuff ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read access" ON roles FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON cool_stuff FOR SELECT USING (true);
CREATE POLICY "Public read access" ON skills FOR SELECT USING (true);

-- Admin write access (using service role key bypasses RLS)
-- For authenticated users, you can add policies like:

-- Allow authenticated users to insert/update content (for the CV URL)
CREATE POLICY "Enable insert for authenticated users only" ON "public"."content"
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON "public"."content"
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Create storage bucket for images and CVs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cool-stuff', 'cool-stuff', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy for public read
CREATE POLICY "Public read" ON storage.objects 
    FOR SELECT USING (bucket_id = 'cool-stuff');

-- Allow authenticated users to upload to storage (for images and CVs)
CREATE POLICY "Enable insert for authenticated users only" ON "storage"."objects"
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cool-stuff');

CREATE POLICY "Enable update for authenticated users only" ON "storage"."objects"
FOR UPDATE TO authenticated USING (bucket_id = 'cool-stuff');
