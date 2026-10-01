import { createClient } from '@supabase/supabase-js';

// Palitan ito ng iyong actual Supabase Project URL at Anon Public Key galing sa Supabase Dashboard
const SUPABASE_URL = 'https://tqfbijydrxhvagqfqafv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZmJpanlkcnhodmFncWZxYWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NDQyNDcsImV4cCI6MjEwNjQyMDI0N30.Yr4nVaEuU4sF3PBfBIGhK-Yq9Z8cldIH-P37qBUR0Nc';

export const supabase = createClient('https://tqfbijydrxhvagqfqafv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZmJpanlkcnhodmFncWZxYWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NDQyNDcsImV4cCI6MjEwNjQyMDI0N30.Yr4nVaEuU4sF3PBfBIGhK-Yq9Z8cldIH-P37qBUR0Nc');
