import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://wfabfqlakikosamvnawa.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmYWJmcWxha2lrb3NhbXZuYXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NjM2OTMsImV4cCI6MjA3ODAzOTY5M30.-XADXF6gpNf3t8ORk616SfdINQgzUYPp9RV_fkrN-uw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
