-- SocialXP Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Missions table
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  fase INT NOT NULL CHECK (fase BETWEEN 1 AND 3),
  orden INT NOT NULL,
  es_jefe BOOLEAN DEFAULT false,
  xp INT NOT NULL DEFAULT 0,
  tip_ayuda TEXT NOT NULL,
  categoria_tip TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL DEFAULT 'local_user',
  mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  completado BOOLEAN DEFAULT false,
  fecha TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, mission_id)
);

-- Indexes
CREATE INDEX idx_missions_fase ON missions(fase);
CREATE INDEX idx_progress_user ON user_progress(user_id);
CREATE INDEX idx_progress_mission ON user_progress(mission_id);

-- Row Level Security (for when auth is added later)
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Public read access for missions
CREATE POLICY "Missions are viewable by everyone" ON missions
  FOR SELECT USING (true);

-- Users can manage their own progress
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (true);
