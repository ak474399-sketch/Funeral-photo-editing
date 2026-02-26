-- Funeral Photo Editing — new tables (shared Supabase instance)
-- Uses existing `users` and `accounts` tables from the main project.

CREATE TABLE IF NOT EXISTS funeral_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tier text NOT NULL CHECK (tier IN ('basic', 'standard', 'premium')),
  polar_order_id text NOT NULL,
  paid_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_funeral_orders_user_id ON funeral_orders(user_id);

CREATE TABLE IF NOT EXISTS funeral_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id uuid REFERENCES funeral_orders(id) ON DELETE SET NULL,
  gen_type text NOT NULL CHECK (gen_type IN ('portrait', 'colorize', 'attire', 'background', 'composite', 'poster')),
  original_url text,
  result_url text,
  settings jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_funeral_generations_user_id ON funeral_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_funeral_generations_order_id ON funeral_generations(order_id);
