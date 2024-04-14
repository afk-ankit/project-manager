import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://huknwvdupqonvppuupiv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1a253dmR1cHFvbnZwcHV1cGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MTY3NTQsImV4cCI6MjAyNzk5Mjc1NH0.ZZptN6XfOTL2h8ekAGOQFOsvyZhaFuqOqYsEsm9-Thk";
export const supabase = createClient(supabaseUrl, supabaseKey);
