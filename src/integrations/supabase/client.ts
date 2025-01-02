import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kyqcgtbjoehyeieulrtg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5cWNndGJqb2VoeWVpZXVscnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2MDU2MDAsImV4cCI6MjAxOTE4MTYwMH0.aNFNdqEHzQiQVyMQHN6fhDgz0wZbZzHxDODY8fZJ9Oc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});